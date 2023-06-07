import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout";
import { BASE_URL } from "../data/constant";
import { Row } from "antd";
import DoctorList from "../components/doctor.component";

const HomePage = () => {
  const [doctor, setDoctor] = useState([]);

  const getUserData = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}user/getAllDoctors`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      if (response.data.success) {
        setDoctor(response.data.data);
      }
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
        <h1 className="text-center">Home Page</h1>
        <Row>
          {doctor &&
            doctor.map((doctor, index) => (
              <DoctorList doctor={doctor} key={index} />
            ))}
        </Row>
      </Layout>
    </>
  );
};
export default HomePage;
