import { Form, Input, message } from "antd";
import "../styles/register.styles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { BASE_URL } from "../data/constant";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      console.log("here");
      const response = await axios.post(`${BASE_URL}user/login`, values);
      window.location.reload();
      dispatch(hideLoading());
      if (response.data.success) {
        message.success("Login Success");
        localStorage.setItem("access_token", response.data.token);
        navigate("/");
      } else {
        message.error(response.data.msg);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong.");
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
          <h3 className="text-center">Login Page</h3>

          <Form.Item label="Email" name={"email"}>
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name={"password"}>
            <Input type="password" required />
          </Form.Item>
          <div>
            <p>
              <Link to="/register">Don't have an Account? </Link>
            </p>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};
export default LoginPage;
