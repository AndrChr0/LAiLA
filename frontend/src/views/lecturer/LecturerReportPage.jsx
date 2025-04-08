import React, { useState, useEffect } from "react";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
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
import { AlertCircle, CheckCircle, Clock, FileText, Users } from "lucide-react";
import instance from "../../utils/axiosInstance";
import { GetConfig } from "../../utils/GetConfig";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import BackComponent from "../../components/BackComponent";
import Loading from "../../components/Loading";

const LecturerReportPage = () => {
  const [reportData, setReportData] = useState([]);
  const [selectedReport, setSelectedReport] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const { id: pathId } = useParams();

  useEffect(() => {
    instance
      .get(`api/reports/${pathId}`, GetConfig(token))
      .then((response) => {
        setReportData(response.data || []);
      })
      .catch((error) => {
        console.error("Failed to fetch report data:", error);
      });
  }, [pathId, token]);

  const handleNewAssignmentReport = (id) => {
    setIsLoading(true);
    setErrorMsg("");

    instance
      .post(
        `/api/reports/${id}`,
        {
          isManuallyCreated: true,
          date: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        GetConfig(token)
      )
      .then((res) => {
        setReportData((prevReports) => [res.data[0], ...prevReports]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMsg(error.response?.data?.error || "Something went wrong.");
        console.error(
          "API request failed:",
          error.response?.data || error.message
        );
      });
  };

  if (reportData.length === 0) {
    return (
      <div>
        No reports yet.
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
        {isLoading && <Loading />}
      </div>
    );
  }

  const currentReport = reportData[selectedReport];
  if (!currentReport) {
    return <Loading />;
  }

  const passFailData = [
    {
      name: "Passed",
      value: currentReport.students_passed,
      color: "#4ade80",
    },
    {
      name: "Failed",
      value: currentReport.students_failed,
      color: "#f87171",
    },
  ];

  const feedbackMetrics = {
    totalFeedback: currentReport.total_feedback,
    uniqueStudents: currentReport.students_evaluated,
  };

  const {
    strongAreas = [],
    commonProblems = [],
    additionalNotes = "",
    overallLecturerSuggestions = [],
  } = currentReport.report_contents || {};

  const date = new Date(currentReport.date_created);
  date.setHours(date.getHours() + 4);
  const formattedDate =
    date.toISOString().split("T")[0] +
    " " +
    date.toISOString().split("T")[1].split(".")[0];

  const reports = reportData.map((report, index) => ({
    id: index,
    name: "Report " + report.report_nr,
  }));

  return (
    <main>
      <BackComponent destination='/home' />
      <div className='min-h-screen p-6 bg-gray-50'>
        <div className='mx-auto max-w-7xl'>
          <header className='mb-8'>
            <h1 className='flex flex-col mb-4 text-3xl text-gray-800'>
              <span className='text-[15px] text-gray-500'>
                {currentReport.course_name}
              </span>
              <span className='font-bold'>
                {currentReport.assignment_title}
              </span>
            </h1>
            <div className='flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center'>
              <Select
                value={String(selectedReport)}
                onValueChange={(val) => setSelectedReport(Number(val))}
              >
                <SelectTrigger className='w-full sm:w-64'>
                  <SelectValue placeholder='Select a report' />
                </SelectTrigger>
                <SelectContent>
                  {reports.map((report) => (
                    <SelectItem key={report.id} value={String(report.id)}>
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

              {isLoading && <Loading />}
              {errorMsg && <div className='text-red-700'>{errorMsg}</div>}

              <div className='flex items-center gap-2 text-sm text-gray-600'>
                <Clock size={16} />
                <span>{formattedDate}</span>
              </div>
            </div>
          </header>

          {/* Cards */}
          <div className='grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3'>
            <Card>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-500'>
                      Pass Rate
                    </p>
                    <p className='text-2xl font-bold text-gray-900'>
                      {(
                        (passFailData[0].value /
                          (passFailData[0].value + passFailData[1].value)) *
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

          {/* Tabs */}
          <Tabs defaultValue='overview' className='mb-6'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='strong'>Strong Areas</TabsTrigger>
              <TabsTrigger value='problems'>Common Problems</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value='overview' className='space-y-6'>
              <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                {/* Pie Chart */}
                <Card className='lg:col-span-1'>
                  <CardHeader>
                    <CardTitle>Suggested Pass/Fail Rate</CardTitle>
                    <CardDescription>
                      Number of passed and failed students (suggestion based on
                      AI feedback)
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
                              <Cell key={index} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Overall course suggestions */}
                <Card className='lg:col-span-2'>
                  <CardHeader>
                    <CardTitle>Overall Course Proposals</CardTitle>
                    <CardDescription>
                      Suggestions for improvement across all assignment
                      submissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-6'>
                      {overallLecturerSuggestions.map((item, index) => (
                        <div
                          key={index}
                          className='pb-4 border-b last:border-0 last:pb-0'
                        >
                          <p className='mb-3 text-muted-foreground'>{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Additional Notes in the same "Overview" */}
            <TabsContent value='overview' className='space-y-6'>
              <Card className='shadow-md mt-[20px]'>
                <CardHeader>
                  <CardTitle>Additional notes</CardTitle>
                  <CardDescription>
                    Additional notes for the lecturer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground'>{additionalNotes}</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Strong Areas Tab */}
            <TabsContent value='strong' className='space-y-6'>
              <Card className='shadow-md'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <CheckCircle className='w-5 h-5 text-green-500' />
                    Strong areas
                  </CardTitle>
                  <CardDescription>
                    Where students performed well
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-6'>
                    {strongAreas.map((data, index) => (
                      <div
                        key={index}
                        className='pb-4 border-b last:border-0 last:pb-0'
                      >
                        <h3 className='mb-2 text-lg font-semibold'>
                          {data.areaName}
                        </h3>
                        <p className='mb-3 text-muted-foreground'>
                          {data.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Common Problems Tab */}
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
                    {commonProblems.map((problem, index) => (
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
    </main>
  );
};

export default LecturerReportPage;
