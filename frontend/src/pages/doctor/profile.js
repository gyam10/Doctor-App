import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../data/constant";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import Layout from "../../components/layout";
import moment from "moment";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle finish
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${BASE_URL}doctor/updateProfile`,
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.msg);
        navigate("/");
      } else {
        dispatch(hideLoading());
        message.error(response.data.msg);
      }
    } catch (err) {
      console.log(err);
      message.error("Something went wrong");
    }
  };

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
        {doctor && (
          <Form
            layout="vertical"
            onFinish={handleFinish}
            className="m-3"
            initialValues={{
              ...doctor,
              timings: [
                moment(doctor?.timings[0], "HH:mm"),
                moment(doctor?.timings[1], "HH:mm"),
              ],
            }}
          >
            <h4 className=""> Personal Details :</h4>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input placeholder="First Name" type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Last Name" type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Phone No"
                  name="phone"
                  required
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Phone Number" type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Email"
                  name="email"
                  required
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Email" type="email" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Website" name="website">
                  <Input placeholder="Website" type="link" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Address"
                  name="address"
                  required
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Address" type="text" />
                </Form.Item>
              </Col>
            </Row>
            <hr className="m-4" />
            <h4>Professional Details</h4>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Specialization"
                  name="specialization"
                  required
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Specialization" type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Experience"
                  name="experience"
                  required
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Experience" type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Fee Per Consultantion"
                  name="feesPerConsultation"
                  required
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Fee Per Consultantion" type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Time" name="timings" required>
                  <TimePicker.RangePicker format="HH:mm" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}></Col>
              <Col xs={24} md={24} lg={8}>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary form-btn" type="submit">
                    Update
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </Layout>
    </>
  );
};

export default Profile;
