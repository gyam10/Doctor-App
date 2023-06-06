import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import axios from "axios";
import { BASE_URL } from "../../data/constant";
import { Table } from "antd";

const Users = () => {
  const [user, setUser] = useState([]);
  // getting users
  const getUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}admin/getAllUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (response.data.success) {
        setUser(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  // Tables
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">
            <i class="fa-solid fa-trash" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Layout>
        <h1 className="text-center p-2">Users List</h1>
        <Table columns={columns} dataSource={user} />
      </Layout>
    </>
  );
};

export default Users;
