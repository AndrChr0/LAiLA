import { createContext, useState, useContext } from "react";

const UserContext = createContext();
export const useUserData = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);

  return (
    <UserContext.Provider
      value={{ assignments, setAssignments, courses, setCourses }}
    >
      {children}
    </UserContext.Provider>
  );
};
