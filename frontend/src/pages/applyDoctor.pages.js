import { Col, Form, Input, Row, TimePicker, message } from "antd";
import Layout from "../components/layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { BASE_URL } from "../data/constant";

const ApplyDoctor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${BASE_URL}user/apply-doctor`,
        { ...values, userId: user._id },
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
        message.error(response.data.msg);
      }
    } catch (err) {
      console.log(err);
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <Layout>
        <h1 className="text-center">Apply Doctor</h1>
        <Form layout="vertical" onFinish={handleFinish} className="m-3">
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
                  Submit
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </Layout>
    </>
  );
};
export default ApplyDoctor;
