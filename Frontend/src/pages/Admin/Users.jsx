import React, { useState, useEffect } from "react";
import { Container } from "../../components/index.js";
import { message, Table } from "antd";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]); // Store all user data
  const [loading, setLoading] = useState(false); // Loading state for Table
  const [pagination, setPagination] = useState({
    current: 1, // Current page
    pageSize: 5, // Page size (number of rows per page)
    total: 0, // Total number of users
  });

  // Fetch all users data from backend
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/v1/admin/getAllUsers`, {
        withCredentials: true,
      });

      if (res.data.success) {
        // Store all user data in state
        setUsers(res.data.data);
        setPagination({
          ...pagination,
          total: res.data.data.length, // Total users count
        });
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to load users");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(); // Fetch all users on component mount
  }, []);

  // Handle table pagination change
  const handleTableChange = (pagination) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "IsAdmin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (text, record) => (record.isAdmin ? "Yes" : "No"),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => {
        const date = new Date(record.createdAt);
        return date.toUTCString();
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex ">
          <button className="btn btn-danger mx-2">Block</button>
        </div>
      ),
    },
  ];

  // Paginated data for current page
  const paginatedData = users.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  return (
    <Container>
      <Table
        columns={columns}
        dataSource={paginatedData} // Only show the current page's data
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showTotal: (total) => `Total ${total} users`,
        }}
        loading={loading}
        onChange={handleTableChange} // Handle pagination changes
        rowKey={(record) => record._id} // Unique key for each row
      />
    </Container>
  );
}

export default Users;

export const usersLoader = async () => {
  const res = await axios.get("/api/v1/admin/getAllUsers", {
    withCredentials: true,
  });
  message.success(res.data.message);
  return res.data?.data;
};
