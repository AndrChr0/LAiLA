import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function HeroPage() {
  const { userRole } = useAuth();

  const navigate = useNavigate();

  return (
    <>
        <div className='flex flex-col md:flex-row justify-between items-center w-[90vw] pb-8'>
          <div className='flex items-center gap-2 p-4'>
            <img
              src='/athea_logo_svg.svg'
              alt='athea logo of a flower'
              className='h-12'
            />
            <h1 className='text-5xl'>LɅiLɅ</h1>
          </div>
          {!userRole && (
            <button
              onClick={() => navigate("/login")}
              className='h-10 px-5 m-2 text-white transition-colors duration-150 bg-[#2b6cb0] rounded-lg focus:shadow-outline hover:bg-[#2c5282]'
            >
              Log In
            </button>
          )}
        </div>
      
      <div className='max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg'>
        <div className='space-y-6'>
          <h2 className='text-3xl font-bold bg-clip-text text-black'>
            The AI-Powered Assessor
          </h2>

          <div className='bg-white p-6 rounded-lg shadow-md'>
            <p className='text-gray-700 leading-relaxed'>
            LAiLA is an AI-driven system designed to transform feedback in
              programming courses with high student enrollment. By automating parts of
              the grading process, LAiLA enables lecturers to dedicate more time
              to direct student interaction instead of assessment tasks.
            </p>

            <div className='grid md:grid-cols-2 gap-4 mt-6'>
              <div className='bg-blue-50 p-4 rounded-lg border border-blue-100'>
                <h3 className='font-semibold text-black mb-2 flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 mr-2'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                      clipRule='evenodd'
                    />
                  </svg>
                  For Students
                </h3>
                <p className='text-gray-600 text-sm'>
                  Students benefit from LAiLA's personalized feedback and
                  preliminary results before submission deadlines, helping them
                  identify their programming strengths and weaknesses early on.
                </p>
              </div>

              <div className='bg-indigo-50 p-4 rounded-lg border border-indigo-100'>
                <h3 className='font-semibold text-black mb-2 flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 mr-2'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z' />
                  </svg>
                  For Lecturers
                </h3>
                <p className='text-gray-600 text-sm'>
                LAiLA provides lecturers with valuable insights into both
                  individual student progression and overall class performance,
                  creating a more responsive and effective learning environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroPage;
