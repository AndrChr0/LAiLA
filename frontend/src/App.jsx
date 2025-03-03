import HeroPage from "./views/shared/HeroPage";
import StudentAssignmentAssessmentPage from "./views/student/StudentAssignmentAssessmentPage";
import Nav from "./shared/Nav";
import Footer from "./shared/Footer";
import NotFoundPage from "./views/shared/NotFoundPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      {/* <Nav /> */} {/* Nav will only be viewed when a user is logged in */}
      <div className='md:w-10/12 md:mx-auto md:my-0'>
        <Routes>
          <Route path='/' element={<HeroPage />} />

          <Route
            path='/assignment-assessment'
            element={<StudentAssignmentAssessmentPage />}
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
