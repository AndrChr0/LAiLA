import React, { useState, useEffect } from "react";
import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Users,
} from "lucide-react";
import instance from "../../utils/axiosInstance";
import { GetConfig } from "../../utils/GetConfig";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

const LecturerReportPage = () => {
  const [selectedReport, setSelectedReport] = useState(0);
  const [reportData, setReportData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const path = useParams();
  const pathId = path.id;
  console.log(reportData);

  if (!reportData) return <div>No reports yet.</div>;

  useEffect(() => {
    instance
      .get(`api/reports/${pathId}`, GetConfig(token))
      .then((response) => {
        setReportData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch report data:", error);
      });
  }, []);

  function handleNewAssignmentReport(id) {
    setIsLoading(true);

    instance
      .post(`/api/reports/${id}`, { isManuallyCreated: true }, GetConfig(token))
      .then(() => {
        console.log("Report generated");
        setIsLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMsg(error.response.data.error);
        console.error(
          "API request failed:",
          error.response ? error.response.data : error.message
        );
      });
  }

  if (!reportData) return;

  const reports = reportData.map((report, index) => {
    return {
      id: index,
      name: "Report " + report.report_nr,
    };
  });

  const passFailData = [
    {
      name: "Passed",
      value: reportData[selectedReport].students_passed,
      color: "#4ade80",
    },
    {
      name: "Failed",
      value: reportData[selectedReport].students_failed,
      color: "#f87171",
    },
  ];

  const feedbackMetrics = {
    totalFeedback: reportData[selectedReport].total_feedback,
    uniqueStudents: reportData[selectedReport].students_evaluated,
  };

  const commonProblemsData = reportData[
    selectedReport
  ].report_contents.commonProblems.map((problem) => {
    return {
      problemName: problem.problemName,
      description: problem.description,
      occurrences: problem.occurrences,
      recommendedActions: problem.recommendedActions,
    };
  });

  const strongAreasData = reportData[
    selectedReport
  ].report_contents.strongAreas.map((area) => {
    return {
      areaName: area.areaName,
      description: area.description,
    };
  });

  const overallLecturerSuggestions = reportData[
    selectedReport
  ].report_contents.overallLecturerSuggestions.map((suggestion) => {
    return {
      suggestion: suggestion,
    };
  });

  const additionalNotes =
    reportData[selectedReport].report_contents.additionalNotes;

  return !reportData && !reportData[selectedReport] ? (
    <div>Loading...</div>
  ) : (
    <div className='min-h-screen p-6 bg-gray-50'>
      <div className='mx-auto max-w-7xl'>
        <header className='mb-8'>
          <h1 className='flex flex-col mb-4 text-3xl text-gray-800'>
            <span className="text-[15px] text-gray-500  ">{reportData[selectedReport].course_name}</span>
            <span className="font-bold">{reportData[selectedReport].assignment_title}</span>
          </h1>
          <div className='flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center'>
            <Select value={selectedReport} onValueChange={setSelectedReport}>
              <SelectTrigger className='w-full sm:w-64'>
                <SelectValue placeholder='Select an assignment' />
              </SelectTrigger>
              <SelectContent>
                {reports.map((report) => (
                  <SelectItem key={report.id} value={report.id}>
                    {report.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <button
              disabled={isLoading}
              onClick={() => handleNewAssignmentReport(pathId)}
              type='button'
              className={`h-auto min-h-10 px-5 m-2 duration-150 rounded-lg focus:shadow-outline bg-white hover:bg-neutral-200 border border-neutral-300 hover:border-neutral-400 text-neutral-700 hover:text-neutral-800 ${
                isLoading ? "hidden" : ""
              }`}
            >
              Generate New Report
            </button>
            {isLoading && <div>Loading...</div>}
            {errorMsg && <div className='text-red-700'>{errorMsg}</div>}
            <div className='flex items-center gap-2 text-sm text-gray-600'>
              <Clock size={16} />
              <span>Last updated: March 17, 2025, 10:42 AM</span>
            </div>
          </div>
        </header>

        <div className='grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3'>
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-500'>Pass Rate</p>
                  <p className='text-2xl font-bold text-gray-900'>
                    {(
                      (passFailData[0].value /
                        (passFailData[1].value + passFailData[0].value)) *
                      100
                    ).toFixed(2)}
                    %
                  </p>
                </div>
                <div className='p-2 bg-green-100 rounded-full'>
                  <CheckCircle className='w-6 h-6 text-green-600' />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-500'>
                    Total Feedback
                  </p>
                  <p className='text-2xl font-bold text-gray-900'>
                    {feedbackMetrics.totalFeedback}
                  </p>
                </div>
                <div className='p-2 bg-blue-100 rounded-full'>
                  <FileText className='w-6 h-6 text-blue-600' />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-500'>
                    Students with Feedback
                  </p>
                  <p className='text-2xl font-bold text-gray-900'>
                    {feedbackMetrics.uniqueStudents}
                  </p>
                </div>
                <div className='p-2 bg-purple-100 rounded-full'>
                  <Users className='w-6 h-6 text-purple-600' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue='overview' className='mb-6'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='strong'>Strong Areas</TabsTrigger>
            <TabsTrigger value='problems'>Common Problems</TabsTrigger>
          </TabsList>

          <TabsContent value='overview' className='space-y-6'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
              <Card className='lg:col-span-1'>
                <CardHeader>
                  <CardTitle>Pass/Fail Count</CardTitle>
                  <CardDescription>
                    Number of passed and failed students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='h-64'>
                    <ResponsiveContainer width='100%' height='100%'>
                      <PieChart>
                        <Pie
                          data={passFailData}
                          cx='50%'
                          cy='50%'
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey='value'
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {passFailData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className='lg:col-span-2'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    {/* <CheckCircle className="w-5 h-5 text-green-500" /> */}
                    Overall lecturer suggestions
                  </CardTitle>
                  <CardDescription>Subheading...?</CardDescription>
                </CardHeader>
              <CardContent>
                <div className='space-y-6'>
                  {overallLecturerSuggestions.map((data, index) => (
                    <div
                      key={index}
                      className='pb-4 border-b last:border-0 last:pb-0'
                    >
                      <div className='flex items-start justify-between mb-2'>
                        <h3 className='text-lg font-semibold'>
                          {data.areaName}
                        </h3>
                      </div>
                      <p className='mb-3 text-muted-foreground'>
                        {data.suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='overview' className='space-y-6'>
            <Card className='shadow-md mt-[20px]'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  {/* <CheckCircle className="w-5 h-5 text-green-500" /> */}
                  Additional notes
                </CardTitle>
                <CardDescription>Subheading..?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-6'>
                  <p className='mb-3 text-muted-foreground'>
                    {additionalNotes}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='strong' className='space-y-6'>
            <Card className='shadow-md'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <CheckCircle className='w-5 h-5 text-green-500' />
                  Strong areas
                </CardTitle>
                <CardDescription>Where students performed well</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-6'>
                  {strongAreasData.map((data, index) => (
                    <div
                      key={index}
                      className='pb-4 border-b last:border-0 last:pb-0'
                    >
                      <div className='flex items-start justify-between mb-2'>
                        <h3 className='text-lg font-semibold'>
                          {data.areaName}
                        </h3>
                      </div>
                      <p className='mb-3 text-muted-foreground'>
                        {data.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='problems' className='space-y-6'>
            <Card className='shadow-md'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <AlertCircle className='w-5 h-5 text-amber-500' />
                  Common Problems
                </CardTitle>
                <CardDescription>
                  Issues identified across student submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-6'>
                  {commonProblemsData.map((problem, index) => (
                    <div
                      key={index}
                      className='pb-4 border-b last:border-0 last:pb-0'
                    >
                      <div className='flex items-start justify-between mb-2'>
                        <h3 className='text-lg font-semibold'>
                          {problem.problemName}
                        </h3>
                        <Badge variant='outline' className='bg-amber-50'>
                          {problem.occurrences} occurrences
                        </Badge>
                      </div>
                      <p className='mb-3 text-muted-foreground'>
                        {problem.description}
                      </p>
                      <div>
                        <h4 className='mb-2 text-sm font-medium'>
                          Recommended Actions:
                        </h4>
                        <ul className='pl-5 space-y-1 text-sm list-disc'>
                          {problem.recommendedActions.map(
                            (action, actionIndex) => (
                              <li key={actionIndex}>{action}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LecturerReportPage;
