import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/layout";
import { Tabs, message } from "antd";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { BASE_URL } from "../data/constant";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // mark read
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${BASE_URL}user/get-all-notification`,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      dispatch(hideLoading());

      if (response.data.success) {
        message.success(response.data.msg);
      } else {
        message.error(response.data.msg);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
      message.error("Something went wrong");
    }
  };
  //   delete notification
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${BASE_URL}user/delete-all-notification`,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.msg);
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
        <h4 className="p-4 text-center">Notification Page</h4>
        <Tabs>
          <Tabs.TabPane tab="UnRead" key={0}>
            <div className="d-flex justify-content-end">
              <h5
                className="p-2"
                onClick={handleMarkAllRead}
                style={{ cursor: "pointer" }}
              >
                Mark All Read
              </h5>
            </div>
            {user?.notification.map((notificationMsg) => (
              <div className="card" style={{ cursor: "pointer" }}>
                <div
                  className="class-text"
                  onClick={() => navigate(notificationMsg.data.onClickPath)}
                >
                  {notificationMsg.msg}
                </div>
              </div>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Read" key={1}>
            <div className="d-flex justify-content-end">
              <h5
                className="p-2 text-primary"
                onClick={handleDeleteAllRead}
                style={{ cursor: "pointer" }}
              >
                Delete All Read
              </h5>
            </div>
            {user?.seeNotification.map((notificationMsg) => (
              <div className="card" style={{ cursor: "pointer" }}>
                <div
                  className="class-text"
                  onClick={() => navigate(notificationMsg.data.onClickPath)}
                >
                  {notificationMsg.msg}
                </div>
              </div>
            ))}
          </Tabs.TabPane>
        </Tabs>
      </Layout>
    </>
  );
};
export default NotificationPage;
