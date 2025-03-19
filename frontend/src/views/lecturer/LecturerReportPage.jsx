import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { AlertCircle, CheckCircle, Clock, FileText, Users, Award, TrendingUp } from 'lucide-react';

const LecturerReportPage = () => {
  const [selectedReport, setSelectedReport] = useState('report-1');
  const sampleData = [
    {
      "commonProblems": [
        {
          "problemName": "Missing or Incomplete Reflection Components",
          "description": "Some submissions did not provide a detailed reflection on the mock-up and sustainability measures, omitting key insights required by the assignment.",
          "occurrences": 1,
          "recommendedActions": [
            "Ensure all reflection sections are fully completed, including explanations on challenges, sustainability efforts, and self-assessment of the mock-up."
          ]
        },
        {
          "problemName": "Lack of Responsive Design Implementation",
          "description": "At least one submission failed to implement media queries to differentiate between mobile and desktop layouts.",
          "occurrences": 1,
          "recommendedActions": [
            "Reinforce the use of media queries in CSS and conduct testing on multiple devices to ensure responsiveness."
          ]
        },
        {
          "problemName": "Absence of Pseudo-classes and Custom Emoticons",
          "description": "Some projects did not use pseudo-classes/elements or include custom CSS emoticons for list items, missing part of the styling requirements.",
          "occurrences": 1,
          "recommendedActions": [
            "Include pseudo-classes and pseudo-elements as required and utilize CSS to add custom emoticons for the designated prize categories."
          ]
        },
        {
          "problemName": "Inadequate SEO Implementation",
          "description": "Multiple submissions lacked meaningful meta tags and detailed SEO elements, affecting overall page optimization.",
          "occurrences": 2,
          "recommendedActions": [
            "Integrate meaningful title tags, meta descriptions, and properly name files to enhance SEO."
          ]
        },
        {
          "problemName": "Use of Disallowed CSS Techniques",
          "description": "Some submissions used disallowed techniques such as flexbox, which violates the assignment guidelines.",
          "occurrences": 1,
          "recommendedActions": [
            "Emphasize strict adherence to assignment guidelines by avoiding disallowed CSS methods like flexbox."
          ]
        }
      ],
      "strongAreas": [
        {
          "areaName": "Detailed Sustainability Measures",
          "description": "Several groups provided comprehensive sustainability reflections, detailing measures like image optimization and file size reduction."
        },
        {
          "areaName": "Effective Use of CSS Properties",
          "description": "Projects demonstrated successful implementation of fixed background images, linear gradients, and varied font sizes to enhance visual design."
        },
        {
          "areaName": "Clean Code and Semantic HTML",
          "description": "Strong submissions featured well-structured code with externalized CSS, proper semantic HTML tags, and a clear project structure."
        }
      ],
      "overallLecturerSuggestions": [
        "Emphasize the importance of completing all reflection sections with detailed self-assessment.",
        "Encourage adherence to the technical guidelines, particularly regarding responsive design and allowed CSS techniques.",
        "Provide additional instruction on SEO best practices to ensure students include comprehensive meta tag implementations."
      ],
      "additionalNotes": "While the submissions showed strengths in design and sustainability considerations, instructors should address common oversights in technical compliance and comprehensive reflection details."
    },
    {
      "passRate": 2,
      "failRate": 1,
      "totalFeedback": 3,
      "uniqueStudents": 3
    }
  ] 

  const reports = [
    { id: 'report-1', name: 'Report 1' },
    { id: 'report-2', name: 'Report 2' },
    { id: 'report-3', name: 'Report 3' }
  ];
  
  const passFailData = [
    { name: 'Passed', value: sampleData[1].passRate, color: '#4ade80' },
    { name: 'Failed', value: sampleData[1].failRate, color: '#f87171' }
  ];
  
  const scoreDistributionData = [
    { score: '0-50', count: 8, color: '#f87171' },
    { score: '51-60', count: 12, color: '#fb923c' },
    { score: '61-70', count: 14, color: '#facc15' },
    { score: '71-80', count: 22, color: '#a3e635' },
    { score: '81-90', count: 28, color: '#4ade80' },
    { score: '91-100', count: 16, color: '#2dd4bf' }
  ];
  
  const feedbackMetrics = {
    totalFeedback: sampleData[1].totalFeedback,
    uniqueStudents: sampleData[1].uniqueStudents,
  };

  const commonProblemsData = sampleData[0].commonProblems.map((problem) => {
    return {
      problemName: problem.problemName,
      description: problem.description,
      occurrences: problem.occurrences,
      recommendedActions: problem.recommendedActions
    };
  });
  
  const strongAreasData = sampleData[0].strongAreas.map((area) => {
    return {
      areaName: area.areaName,
      description: area.description,
    };
  });

  const overallLecturerSuggestions = sampleData[0].overallLecturerSuggestions.map((suggestion) => {
    return {
      suggestion: suggestion
    };
  });

  const additionalNotes = sampleData[0].additionalNotes;

  console.log(overallLecturerSuggestions)

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">Assignment (NAME)</h1>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <Select 
              value={selectedReport}
              onValueChange={setSelectedReport}
            >
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Select an assignment" />
              </SelectTrigger>
              <SelectContent>
                {reports.map((report) => (
                  <SelectItem key={report.id} value={report.id}>
                    {report.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} />
              <span>Last updated: March 17, 2025, 10:42 AM</span>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pass Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{(passFailData[0].value / (passFailData[1].value + passFailData[0].value) * 100).toFixed(2)}%</p>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Feedback</p>
                  <p className="text-2xl font-bold text-gray-900">{feedbackMetrics.totalFeedback}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Students with Feedback</p>
                  <p className="text-2xl font-bold text-gray-900">{feedbackMetrics.uniqueStudents}</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-full">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="mb-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="strong">Strong Areas</TabsTrigger>
            <TabsTrigger value="problems">Common Problems</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Pass/Fail Count</CardTitle>
                  <CardDescription>Number of passed and failed students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={passFailData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({name, value}) => `${name}: ${value}`}
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
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Score Distribution</CardTitle>
                  <CardDescription>Breakdown of scores by range</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={scoreDistributionData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="score" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" name="Number of Students">
                          {scoreDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
          <Card className="shadow-md mt-[20px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {/* <CheckCircle className="w-5 h-5 text-green-500" /> */}
                Overall lecturer suggestions
              </CardTitle>
              <CardDescription>Subheading...?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {overallLecturerSuggestions.map((data, index) => (
                  <div key={index} className="pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold">{data.areaName}</h3>
                    </div>
                    <p className="mb-3 text-muted-foreground">{data.suggestion}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </TabsContent>
          

          <TabsContent value="overview" className="space-y-6">
          <Card className="shadow-md mt-[20px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {/* <CheckCircle className="w-5 h-5 text-green-500" /> */}
                Additional notes
              </CardTitle>
              <CardDescription>Subheading..?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className='mb-3 text-muted-foreground'>{additionalNotes}</p>
              </div>
            </CardContent>
          </Card>
          </TabsContent>
          

          <TabsContent value="strong" className="space-y-6">
           <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Strong areas
              </CardTitle>
              <CardDescription>Where students performed well</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {strongAreasData.map((data, index) => (
                  <div key={index} className="pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold">{data.areaName}</h3>
                    </div>
                    <p className="mb-3 text-muted-foreground">{data.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </TabsContent>
 
          <TabsContent value="problems" className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                Common Problems
              </CardTitle>
              <CardDescription>Issues identified across student submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {commonProblemsData.map((problem, index) => (
                  <div key={index} className="pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold">{problem.problemName}</h3>
                      <Badge variant="outline" className="bg-amber-50">
                        {problem.occurrences} occurrences
                      </Badge>
                    </div>
                    <p className="mb-3 text-muted-foreground">{problem.description}</p>
                    <div>
                      <h4 className="mb-2 text-sm font-medium">Recommended Actions:</h4>
                      <ul className="pl-5 space-y-1 text-sm list-disc">
                        {problem.recommendedActions.map((action, actionIndex) => (
                          <li key={actionIndex}>{action}</li>
                        ))}
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