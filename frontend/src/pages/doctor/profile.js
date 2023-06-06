import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../data/constant";
import { message } from "antd";
const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState([]);
  const params = useParams();
  // getDoctorinfo
  const getDoctorInfo = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}doctor/getDoctorInfo`,
        {
          userId: params.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (err) {
      message.error("Something went wrong.");
    }
  };

  useEffect(() => {
    getDoctorInfo();
  }, []);

  return (
    <>
      <Layout>
        <h1>Profile</h1>
      </Layout>
    </>
  );
};

export default Profile;
