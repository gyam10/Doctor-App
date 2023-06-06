import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import axios from "axios";
import { Table, message } from "antd";
import { BASE_URL } from "../../data/constant";

const Doctors = () => {
  const [doctor, setDoctor] = useState([]);
  const getDoctor = async () => {
    try {
      const response = await axios.get(`${BASE_URL}admin/getAllDoctors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (err) {
      console.log(err);
      message.error("Something went wrong.");
    }
  };

  // handle account
  const handleAccountStatus = async (record, status) => {
    try {
      const response = await axios.post(
        `${BASE_URL}admin/changeAccountStatus`,
        {
          doctorId: record._id,
          userId: record.userId,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.data.success) {
        message.success(response.data.msg);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong.");
    }
  };

  useEffect(() => {
    getDoctor();
  }, []);

  // table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone No",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              <i class="fa-solid fa-thumbs-up" /> Approve
            </button>
          ) : (
            <button className="btn btn-danger">
              {" "}
              <i class="fa-solid fa-thumbs-down" />
              Reject
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Layout>
        <h1>Doctors List</h1>
        <Table columns={columns} dataSource={doctor} />
      </Layout>
    </>
  );
};

export default Doctors;
