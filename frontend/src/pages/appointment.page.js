import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { BASE_URL } from "../data/constant";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";
const Appointment = () => {
  const [appointment, setAppointment] = useState([]);

  const getAppointment = async () => {
    try {
      const response = await axios.get(`${BASE_URL}user/user-appointment`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
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

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => <span>{record.doctorInfo.phone}</span>,
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

export default Appointment;
