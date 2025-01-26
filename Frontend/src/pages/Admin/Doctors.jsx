import React, { useState, useEffect } from "react";
import { Container } from "../../components/index.js";
import { message, Table } from "antd";
import axios from "axios";

function Doctors() {
  const [doctors, setDoctors] = useState([]); // Store all doctor data
  const [loading, setLoading] = useState(false); // Loading state for Table
  const [pagination, setPagination] = useState({
    current: 1, // Current page
    pageSize: 5, // Page size (number of rows per page)
    total: 0, // Total number of doctors
  });

  // Fetch all doctors data from backend
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/v1/admin/getAllDoctors`, {
        withCredentials: true,
      });

      if (res.data.success) {
        // Store all doctor data in state
        setDoctors(res.data.data);
        setPagination({
          ...pagination,
          total: res.data.data.length, // Total doctors count
        });
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to load doctors");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDoctors(); // Fetch all doctors on component mount
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
      dataIndex: "Name",
      render: (text, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Specialized On",
      dataIndex: "specializationOn",
      key: "specializationOn",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
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
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleChangeAccount(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button
              className="btn btn-danger"
              onClick={() => handleChangeAccount(record, "pending")}
            >
              Reject
            </button>
          )}
        </div>
      ),
    },
  ];

  const handleChangeAccount = async (record, status) => {
    const res = await axios.post(
      "/api/v1/admin/changeAccountStatus",
      {
        doctorId: record._id,
        status: status,
      },
      {
        withCredentials: true,
      }
    );

    if (res.data.success) {
      message.success(res.data.message);
      fetchDoctors(); // Refresh data after status change
    } else {
      message.error(res.response.data.message);
    }
  };

  // Paginated data for current page
  const paginatedData = doctors.slice(
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
          showTotal: (total) => `Total ${total} doctors`,
        }}
        loading={loading}
        onChange={handleTableChange} // Handle pagination changes
        rowKey={(record) => record._id} // Unique key for each row
      />
    </Container>
  );
}

export default Doctors;

export const doctorsLoader = async () => {
  const res = await axios.get("/api/v1/admin/getAllDoctors", {
    withCredentials: true,
  });
  message.success(res.data.message);
  return res.data?.data;
};
