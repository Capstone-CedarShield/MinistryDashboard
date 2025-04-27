import apiClient from "../config/axiosInstance";

//get all organizations
const getOrganization = async () => {
  try {
    const response = await apiClient.get("/api/organizations");
    console.log("Fetched Organizations:");
    return response.data;
  } catch (error) {
    throw error;
  }
};

//get a single organization
const getOrganizationByID = async (id) => {
  try {
    console.log(id);
    const response = await apiClient.get(`/api/organizations/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getOrganization, getOrganizationByID };
