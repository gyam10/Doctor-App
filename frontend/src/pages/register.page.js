import { Form, Input, message } from "antd";
import "../styles/register.styles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { BASE_URL } from "../data/constant";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(`${BASE_URL}user/register`, values);
      dispatch(hideLoading());
      if (response.data.success) {
        message.success("Register Successfull.");
        navigate("/login");
      } else {
        message.error(response.data.msg);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Register Page</h3>
          <Form.Item label="Name" name={"name"}>
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name={"email"}>
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name={"password"}>
            <Input type="password" required />
          </Form.Item>
          <div>
            <p>
              <Link to="/login">Already have an Account? </Link>
            </p>
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};
export default RegisterPage;
