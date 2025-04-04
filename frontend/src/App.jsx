import HeroPage from "./views/shared/HeroPage";
import StudentAssignmentAssessmentPage from "./views/student/StudentAssignmentAssessmentPage";
import Nav from "./shared/Nav";
import Footer from "./shared/Footer";
import NotFoundPage from "./views/shared/NotFoundPage";
import RegisterPage from "./views/shared/RegisterPage";
import LoginPage from "./views/shared/LoginPage";
import StudentHomePage from "./views/student/StudentHomePage";
import LecturerHomePage from "./views/lecturer/LecturerHomePage";
import NewAssignmentPage from "./views/lecturer/NewAssignmentPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedroute/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import StudentCoursePage from "./views/student/StudentCoursePage";
import LecturerCoursePage from "./views/lecturer/LecturerCoursePage";
import LecturerReportPage from "./views/lecturer/LecturerReportPage";
import LecturerEditAssignmentPage from "./views/lecturer/LecturerEditAssignmentPage";
import GradeAssessmentPage from "./views/lecturer/GradeAssessmentPage";
import FinalAssessmentsPage from "./views/lecturer/FinalAssessmentsPage";
import StudentFinalAssessment from "./views/student/StudentFinalAssessment";

function App() {
  const { userRole } = useAuth();

  return (
    <div className='App'>
      {userRole ? <Nav role={userRole} /> : null}
      <div className='md:w-[98%] md:mx-auto md:my-0'>
        <Routes>
          {!userRole ? <Route path='/' element={<HeroPage />} /> : null}

          {userRole === "lecturer" ? (
            <Route
              path='/home'
              element={
                <ProtectedRoute roles={["lecturer"]}>
                  <LecturerHomePage />
                </ProtectedRoute>
              }
            />
          ) : null}

          {userRole === "student" ? (
            <Route
              path='/home'
              element={
                <ProtectedRoute roles={["student"]}>
                  <StudentHomePage />
                </ProtectedRoute>
              }
            />
          ) : null}

          <Route path='/' element={<HeroPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />

          <Route
            path='/courses/:id'
            element={
              <ProtectedRoute roles={["student", "lecturer"]}>
                {userRole === "student" ? (
                  <StudentCoursePage />
                ) : (
                  <LecturerCoursePage />
                )}
              </ProtectedRoute>
            }
          />

          <Route
            path='/assignment-assessment/:id'
            element={
              <ProtectedRoute roles={["student"]}>
                <StudentAssignmentAssessmentPage />
              </ProtectedRoute>
            }
          />

          <Route
            path='/new-assignment'
            element={
              <ProtectedRoute roles={["lecturer"]}>
                <NewAssignmentPage />
              </ProtectedRoute>
            }
          />

          <Route
            path='/edit-assignment/:id'
            element={
              <ProtectedRoute roles={["lecturer"]}>
                <LecturerEditAssignmentPage />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFoundPage />} />

          <Route
            path='/assignment-report/:id'
            element={
              <ProtectedRoute roles={["lecturer"]}>
                <LecturerReportPage />
              </ProtectedRoute>
            }
          />

          <Route
            path='/final-assessment/:id'
            element={
              <ProtectedRoute roles={["lecturer"]}>
                <FinalAssessmentsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path='/student/final-assessment/:id'
            element={
              <ProtectedRoute roles={["student"]}>
                <StudentFinalAssessment />
              </ProtectedRoute>
            }
          />

          <Route
            path='/grade-assessment/:id'
            element={
              <ProtectedRoute roles={["lecturer"]}>
                <GradeAssessmentPage />
              </ProtectedRoute>
            }
          />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
