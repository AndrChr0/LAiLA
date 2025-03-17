import instance from "../axiosInstance";
// UNFINISHED
function getOneAssignment(id) {
  instance
    .get(`api/assignments/${id}`)
    .then((response) => {
      console.log("Assignment API Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching assignment:", error);
    });
}

export default getOneAssignment;
