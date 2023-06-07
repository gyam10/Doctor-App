import Layout from "../../components/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Table, message } from "antd";
import { BASE_URL } from "../../data/constant";

const DoctorAppointment = () => {
  const [appointment, setAppointment] = useState([]);

  const getAppointment = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}doctor/doctor-appointments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data.success) {
        setAppointment(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAppointment();
  }, []);

  const handeleStatus = async (record, status) => {
    try {
      const response = await axios.post(
        `${BASE_URL}doctor/updateStatus`,
        {
          appointmentId: record._id,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      window.location.reload();
      if (response.date.success) {
        message.success(response.data.msg);
        getAppointment();
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong.");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success"
                onClick={() => handeleStatus(record, "approved")}
              >
                Approve
              </button>

              <button
                className="btn btn-danger ms-2"
                onClick={() => handeleStatus(record, "rejected")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Layout>
        <h1>List</h1>
        <Table columns={columns} dataSource={appointment} />
      </Layout>
    </>
  );
};

export default DoctorAppointment;
