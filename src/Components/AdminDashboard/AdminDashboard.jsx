import React, { useState } from 'react';
import smitlogo from './smitlogo.png'
import {
  Layout,
  Menu,
  Breadcrumb,
  Row,
  Col,
  Button,
  Input,
  Form,
  Modal,
  Space,
  Typography,
  Table,
  Popconfirm,
  message,
  Select
} from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  FileOutlined,
  TeamOutlined,
  SettingOutlined,
  PlusOutlined,
  BookOutlined
} from '@ant-design/icons';
import { useLocalStorage } from 'usehooks-ts';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { Option } = Select;

const AdminDashboard = () => {
  const [courses, setCourses] = useLocalStorage('courses', []);
  const [teachers, setTeachers] = useLocalStorage('teachers', []);
  const [isAddCourseModalVisible, setIsAddCourseModalVisible] = useState(false);
  const [isAddTeacherModalVisible, setIsAddTeacherModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const handleAddCourse = () => {
    setIsAddCourseModalVisible(true);
  };

  const handleAddTeacher = () => {
    setIsAddTeacherModalVisible(true);
  };

  const handleEdit = (record) => {
    if (record.teachers) {
      setSelectedCourse(record);
    } else {
      setSelectedTeacher(record);
    }
    setIsEditModalVisible(true);
  };

  const handleAddCourseSubmit = (values) => {
    const newCourse = {
      id: Math.random().toString(36).substring(2, 15),
     ...values,
      teachers: [],
    };
    setCourses([...courses, newCourse]);
    setIsAddCourseModalVisible(false);
    message.success('Course added successfully!');
  };

  const handleAddTeacherSubmit = (values) => {
    const newTeacher = {
      id: Math.random().toString(36).substring(2, 15),
     ...values,
      courses: [],
    };
    setTeachers([...teachers, newTeacher]);
    setIsAddTeacherModalVisible(false);
    message.success('Teacher added successfully!');
  };

  const handleEditSubmit = () => {
    if (selectedCourse) {
      const updatedCourses = courses.map(course =>
        course.id === selectedCourse.id? {...course,...selectedCourse } : course
      );
      setCourses(updatedCourses);
      message.success('Course updated successfully!');
    }

    if (selectedTeacher) {
      const updatedTeachers = teachers.map(teacher =>
        teacher.id === selectedTeacher.id? {...teacher,...selectedTeacher } : teacher
      );
      setTeachers(updatedTeachers);
      message.success('Teacher updated successfully!');
    }

    setSelectedCourse(null);
    setSelectedTeacher(null);
    setIsEditModalVisible(false);
  };

  const handleDeleteCourse = (record) => {
    const updatedCourses = courses.filter((course) => course.id!== record.id);
    setCourses(updatedCourses);
    message.success('Course deleted successfully!');
  };

  const handleDeleteTeacher = (record) => {
    const updatedTeachers = teachers.filter((teacher) => teacher.id!== record.id);
    setTeachers(updatedTeachers);
    message.success('Teacher deleted successfully!');
  };

  const handleCourseChange = (value) => {
    setSelectedCourse({
     ...selectedCourse,
      teachers: value,
    });
  };

  const handleTeacherChange = (value) => {
    setSelectedTeacher({
     ...selectedTeacher,
      courses: value,
    });
  };

  const courseColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Teachers',
      dataIndex: 'teachers',
      key: 'teachers',
      render: (teachers) => (
        <div>
          {teachers && teachers.map((teacher) => (
            <span key={teacher}>{teacher}</span>
          ))}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)} type="primary">
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this course?"
            onConfirm={() => handleDeleteCourse(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const teacherColumns = [
    {
      title:'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Courses',
      dataIndex: 'courses',
      key: 'courses',
      render: (courses) => (
        <div>
          {courses && courses.map((course) => (
            <span key={course}>{course}</span>
          ))}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)} type="primary">
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this teacher?"
            onConfirm={() => handleDeleteTeacher(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Layout className='h-screen'>
      <Sider
        breakpoint='lg'
        collapsedWidth='0'
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        theme='dark'
      >
        <div className='flex justify-center p-4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src={smitlogo}
            alt='SMIT Logo'
            style={{ width: 90, height: 90, borderRadius: '50%' }}
          />
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['3']}
          className='mt-8'
        >
          <Menu.Item key='1' icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key='2' icon={<BookOutlined />}>
            Courses
          </Menu.Item>
          <Menu.Item key='3' icon={<UserOutlined />}>
            Teachers
          </Menu.Item>
          <Menu.Item key='4' icon={<TeamOutlined />}>
            Student
          </Menu.Item>
          <Menu.Item key='5' icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content>
          <h1>Admin Dashboard</h1>
         
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Title level={3} style={{ marginBottom: '16px' }}>
                    Courses
                  </Title>
                </Col>
                <Col>
                  <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCourse}>
                    Add New Course
                  </Button>
                </Col>
              </Row>
              <Table
                columns={courseColumns}
                dataSource={courses}
                pagination={false}
              />
            </Col>
            <Col xs={24} sm={12}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Title level={3} style={{ marginBottom: '16px' }}>
                    Teachers
                  </Title>
                </Col>
                <Col>
                  <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTeacher}>
                    Add New Teacher
                  </Button>
                </Col>
              </Row>
              <Table
                columns={teacherColumns}
                dataSource={teachers}
                pagination={false}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
      <Modal
        title={selectedCourse? 'Edit Course' : 'Edit Teacher'}
        visible={isEditModalVisible}
        onCancel={() => {
          setSelectedCourse(null);
          setSelectedTeacher(null);
          setIsEditModalVisible(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setSelectedCourse(null);
              setSelectedTeacher(null);
              setIsEditModalVisible(false);
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleEditSubmit}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={() => {}} // No need to specify onFinish here, it will be handled by handleEditSubmit
        >
          <Form.Item
            name="name"
            label={`${selectedCourse? 'Course' : 'Teacher'} Name`}
            initialValue={selectedCourse? selectedCourse.name : (selectedTeacher? selectedTeacher.name : '')}
            rules={[{ required: true, message: `Please input the ${selectedCourse? 'course' : 'teacher'} name!` }]}
          >
            <Input
              onChange={(e) => {
                if (selectedCourse) {
                  setSelectedCourse({...selectedCourse, name: e.target.value });
                } else if (selectedTeacher) {
                  setSelectedTeacher({...selectedTeacher, name: e.target.value });
                }
              }}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label={`${selectedCourse? 'Course' : 'Teacher'} Description`}
            initialValue={selectedCourse? selectedCourse.description : (selectedTeacher? selectedTeacher.description : '')}
            rules={[{ required: true, message: `Please input the ${selectedCourse? 'course' : 'teacher'} description!` }]}
          >
            <Input.TextArea
              onChange={(e) => {
                if (selectedCourse) {
                  setSelectedCourse({...selectedCourse, description: e.target.value });
                } else if (selectedTeacher) {
                  setSelectedTeacher({...selectedTeacher, description: e.target.value });
                }
              }}
            />
          </Form.Item>
          {selectedCourse && (
            <Form.Item name="teachers" label="Teachers">
              <Select
                mode="multiple"
                placeholder="Select Teachers"
                onChange={handleCourseChange}
                value={selectedCourse.teachers || []}
              >
                {teachers.map((teacher) => (
                  <Option key={teacher.id} value={teacher.name}>
                    {teacher.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {selectedTeacher && (
            <Form.Item name="courses" label="Courses">
              <Select
                mode="multiple"
                placeholder="Select Courses"
                onChange={handleTeacherChange}
                value={selectedTeacher.courses || []}
              >
                {courses.map((course) => (
                  <Option key={course.id} value={course.name}>
                    {course.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>
      <Modal
        title="Add New Course"
        visible={isAddCourseModalVisible}
        onCancel={() => setIsAddCourseModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsAddCourseModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {}} // No need to specify onClick here, it will be handled by form submission
            form="add-course-form"
            htmlType="submit"
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          name="add-course-form"
          layout="vertical"
          onFinish={handleAddCourseSubmit}
        >
          <Form.Item
            name="name"
            label="Course Name"
            rules={[{ required: true, message: 'Please input the course name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Course Description"
            rules={[{ required: true, message: 'Please input the course description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add New Teacher"
        visible={isAddTeacherModalVisible}
        onCancel={() => setIsAddTeacherModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsAddTeacherModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {}} // No need to specify onClick here, it will be handled by form submission
            form="add-teacher-form"
            htmlType="submit"
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          name="add-teacher-form"
          layout="vertical"
          onFinish={handleAddTeacherSubmit}
        >
          <Form.Item
            name="name"
            label="Teacher Name"
            rules={[{ required: true, message: 'Please input the teacher name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Teacher Description"
            rules={[{ required: true, message: 'Please input the teacher description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default AdminDashboard;