import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Avatar,
  Statistic,
  Descriptions,
  Menu,
  Layout,
} from "antd";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import smitlogo from './smitlogo.png'; // Assuming you have your logo image imported correctly

// Mock student data
const studentsData = [
  {
    name: "Tayyab Yaqoob",
    rollNumber: "WMA-132511",
    batch: "Batch 10",
    assignments: [
      { title: "Assignment 1", points: 80, status: "submitted" },
      { title: "Assignment 2", points: 70, status: "not_submitted" },
      { title: "Assignment 3", points: 90, status: "submitted" },
      { title: "Assignment 4", points: 85, status: "submitted" },
      { title: "Assignment 5", points: 60, status: "not_submitted" },
    ],
  },
  {
    name: "Huzaifa Khan",
    rollNumber: "WMA-132611",
    batch: "Batch 10",
    assignments: [
      { title: "Assignment 1", points: 75, status: "submitted" },
      { title: "Assignment 2", points: 65, status: "pending" },
      { title: "Assignment 3", points: 85, status: "submitted" },
      { title: "Assignment 4", points: 80, status: "submitted" },
      { title: "Assignment 5", points: 55, status: "submitted" },
    ],
  },
  {
    name: "Muhammad Noman",
    rollNumber: "WMA-132531",
    batch: "Batch 10",
    assignments: [
      { title: "Assignment 1", points: 70, status: "submitted" },
      { title: "Assignment 2", points: 60, status: "pending" },
      { title: "Assignment 3", points: 80, status: "submitted" },
      { title: "Assignment 4", points: 75, status: "not_submitted" },
      { title: "Assignment 5", points: 50, status: "not_submitted" },
    ],
  },
  {
    name: "Jamsheed khan",
    rollNumber: "WMA-131181",
    batch: "Batch 10",
    assignments: [
      { title: "Assignment 1", points: 70, status: "submitted" },
      { title: "Assignment 2", points: 60, status: "pending" },
      { title: "Assignment 3", points: 80, status: "pending" },
      { title: "Assignment 4", points: 75, status: "submitted" },
      { title: "Assignment 5", points: 50, status: "not_submitted" },
    ],
  },
];

const { Title } = Typography;
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const StudentReportGenerate = () => {
  // State to manage selected student index
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(0);

  // Function to calculate and set chart data
  const calculateChartData = (studentIndex) => {
    const student = studentsData[studentIndex];
    const submitted = student.assignments.filter((a) => a.status === "submitted").length;
    const pending = student.assignments.filter((a) => a.status === "pending").length;
    const notSubmitted = student.assignments.filter((a) => a.status === "not_submitted").length;

    return [
      { name: "Submitted", value: submitted },
      { name: "Pending", value: pending },
      { name: "Not Submitted", value: notSubmitted },
    ];
  };

  // Calculate chart data on component mount or student change
  useEffect(() => {
    calculateChartData(selectedStudentIndex);
  }, [selectedStudentIndex]);

  // Function to calculate average grade
  const calculateAverageGrade = (studentIndex) => {
    const student = studentsData[studentIndex];
    const totalPoints = student.assignments.reduce((total, a) => total + a.points, 0);
    const earnedPoints = student.assignments.reduce(
      (total, a) =>
        a.status === "submitted" || a.status === "pending" ? total + a.points : total,
      0
    );
    return ((earnedPoints / totalPoints) * 100 || 0).toFixed(2);
  };

  // Function to handle student selection
  const handleStudentSelect = (studentIndex) => {
    setSelectedStudentIndex(studentIndex);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={200}
        className="site-layout-background"
        style={{ backgroundColor: "#001529", position: "fixed", height: "100vh" }}
      >
        <div className="logo" style={{ height: "64px", margin: "16px" }}>
          <img
            src={smitlogo} // Replace with your logo image URL
            alt="Logo"
            style={{ width: "100%", maxHeight: "100%", objectFit: "contain" }}
          />
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["0"]}
          style={{ height: "calc(100% - 48px)", borderRight: 0 }}
          theme="dark"
        >
          {studentsData.map((student, index) => (
            <Menu.Item key={index} onClick={() => handleStudentSelect(index)}>
              {student.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div className="site-layout-background" style={{ padding: 24 }}>
            <Title level={2}>Student Report</Title>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card>
                  <Row gutter={[16, 16]}>
                    <Col span={6}>
                      <Avatar
                        size={64}
                        src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                      />
                    </Col>
                    <Col span={18}>
                      <Descriptions title="Student Information" column={1}>
                        <Descriptions.Item label="Name">
                          {studentsData[selectedStudentIndex].name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Roll Number">
                          {studentsData[selectedStudentIndex].rollNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="Batch">
                          {studentsData[selectedStudentIndex].batch}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Assignment Status">
                  <PieChart width={400} height={300}>
                    <Pie
                      data={calculateChartData(selectedStudentIndex)}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {calculateChartData(selectedStudentIndex).map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              index === 0
                                ? "#82ca9d"
                                : index === 1
                                ? "#ffc658"
                                : "#ff7300"
                            }
                          />
                        )
                      )}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Assignment Grades">
                  <BarChart
                    width={400}
                    height={300}
                    data={studentsData[selectedStudentIndex].assignments}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="title" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="points" fill="#8884d8" />
                  </BarChart>
                </Card>
              </Col>
              <Col span={24}>
                <Card>
                  <Row gutter={[16, 16]}>
                    <Col span={6}>
                      <Statistic
                        title="Submitted"
                        value={
                          calculateChartData(selectedStudentIndex)[0].value
                        }
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic
                        title="Pending"
                        value={
                          calculateChartData(selectedStudentIndex)[1].value
                        }
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic
                        title="Not Submitted"
                        value={
                          calculateChartData(selectedStudentIndex)[2].value
                        }
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic
                        title="Average Grade"
                        value={calculateAverageGrade(selectedStudentIndex)}
                        suffix="%"
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default StudentReportGenerate;
