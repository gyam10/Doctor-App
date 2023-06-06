import { useEffect } from "react";
import axios from "axios";
import Layout from "../components/layout";

const HomePage = () => {
  const getUserData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Layout>
        <h1>Home Page</h1>
      </Layout>
    </>
  );
};
export default HomePage;
