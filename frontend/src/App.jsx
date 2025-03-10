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
import { UserProvider } from "./context/UserContext";
function App() {
  const { userRole } = useAuth();

  return (
    <div className='App'>
      {userRole ? <Nav role={userRole} /> : null}
      <div className='md:w-10/12 md:mx-auto md:my-0'>
        <Routes>
          {!userRole ? <Route path='/' element={<HeroPage />} /> : null}

          {userRole === "lecturer" ? (
            <Route
              path='/home'
              element={
                <ProtectedRoute roles={["lecturer"]}>
                  <UserProvider>
                    <LecturerHomePage />
                  </UserProvider>
                </ProtectedRoute>
              }
            />
          ) : null}

          {userRole === "student" ? (
            <Route
              path='/home'
              element={
                <ProtectedRoute roles={["student"]}>
                  <UserProvider>
                    <StudentHomePage />
                  </UserProvider>
                </ProtectedRoute>
              }
            />
          ) : null}

          <Route path='/' element={<HeroPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />

          <Route path='/courses/:id'></Route>

          {/* <Route path='/student-homepage-placeholder' element={ <ProtectedRoute roles={["student"]}><StudentHomePage /></ProtectedRoute> }/> */}
          <Route
            path='/assignment-assessment'
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
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
