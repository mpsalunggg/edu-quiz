/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  HiOutlineChartSquareBar,
  HiOutlineHome,
  HiOutlineLogout,
  HiOutlineMail,
  HiOutlineUsers,
} from 'react-icons/hi'
import React, { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout, Menu, Button, Dropdown, Avatar, Modal, message } from 'antd'
import Logo from '../../assets/images/logo.svg'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import {
  getSessionData,
  removeSessionData,
  setSessionData,
} from '../../utils/sessionStorage'
import PrivateRoute from '../../PrivateRoute'
const { confirm } = Modal

const { Sider, Content } = Layout

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [keyMenu, setKeyMenu] = useState(['1'])
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = async () => {
    setIsModalOpen(false)
    message.open({
      content: 'Berhasil Logout, mohon tunggu!',
      type: 'success',
      duration: 2,
      onClose: () => {
        navigate('/login')
        removeSessionData('token')
        removeSessionData('user')
      },
      className: 'mt-20',
    })
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const showConfirm = () => {
    setIsModalOpen(true)
  }

  const handleClick = ({ key }) => {
    if (key === '1') {
      setKeyMenu(['1'])
      setSessionData('active', ['1'])
      navigate('/dashboard')
    }
    if (key === '2') {
      setKeyMenu(['2'])
      setSessionData('active', ['2'])
      navigate('/quiz')
    }
    if (key === '3') {
      setKeyMenu(['3'])
      setSessionData('active', ['3'])
      navigate('/student-quiz')
    }
    if (key === '4') {
      setKeyMenu(['4'])
      setSessionData('active', ['4'])
      navigate('/result-quiz')
    }
    if (key === '5') {
      setKeyMenu(keyMenu)
      setSessionData('active', keyMenu)
      showConfirm()
    }
    if (key === '6') {
      setKeyMenu(['6'])
      setSessionData('active', ['6'])
      navigate('/result-quiz-teacher')
    }
    if (key === '7') {
      setKeyMenu(['7'])
      setSessionData('active', ['7'])
      navigate('/teacher')
    }
    if (key === '8') {
      setKeyMenu(['8'])
      setSessionData('active', ['8'])
      navigate('/student-list')
    }
  }
  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }
  const items = [
    {
      key: '1',
      label: <Link to={`/profile`}>Profile</Link>,
    },
  ]

  const itemsSide = [
    {
      label: 'Dashboard',
      key: '1',
      icon: <HiOutlineHome />,
    },
    {
      label: 'Teacher',
      key: '7',
      icon: <HiOutlineMail />,
    },
    {
      label: 'Quiz',
      key: '3',
      icon: <HiOutlineMail />,
    },
    {
      label: 'Result',
      key: '4',
      icon: <HiOutlineChartSquareBar />,
    },
  ]

  const itemTeacher = [
    {
      label: 'Dashboard',
      key: '1',
      icon: <HiOutlineHome />,
    },
    {
      label: 'Quiz',
      key: '2',
      icon: <HiOutlineMail />,
    },
    {
      label: 'List Student',
      key: '8',
      icon: <HiOutlineUsers />,
    },
    {
      label: 'Result',
      key: '6',
      icon: <HiOutlineChartSquareBar />,
    },
  ]

  return (
    <Layout className="h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        className={`m-4 rounded-xl ${
          collapsed ? 'overflow-hidden lg:inline hidden' : ''
        }`}
      >
        <div className="sticky top-0 z-50 h-full flex flex-col justify-between">
          <div>
            <div
              className={`h-16 flex items-center ${
                collapsed ? 'justify-center' : 'justify-start px-4'
              }`}
            >
              <img
                src={Logo}
                className={!collapsed ? 'w-20' : 'w-12'}
                alt="Logo"
              />
            </div>
            <Menu
              mode="vertical"
              defaultSelectedKeys={['1']}
              selectedKeys={getSessionData('active')}
              theme="light"
              items={
                getSessionData('user').role === 'teacher'
                  ? itemTeacher
                  : itemsSide
              }
              onClick={handleClick}
            />
          </div>
          <div className="mb-4">
            <Menu
              mode="vertical"
              theme="light"
              selectedKeys={getSessionData('active')}
              items={[
                {
                  label: 'Logout',
                  key: '5',
                  icon: <HiOutlineLogout />,
                },
              ]}
              onClick={handleClick}
            />
          </div>
        </div>
      </Sider>
      <Layout>
        <div
          className={`px-4 my-4 mr-4 sticky top-0 z-50 ${
            collapsed ? 'lg:ml-0 ml-4' : ''
          } bg-white rounded-xl flex items-center justify-between ${
            collapsed ? 'w-300' : 'w-300'
          } transition-all duration-300`}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className="font-bold lg:text-[20px]">
            <span className="text-tema-green">Edu</span>{' '}
            <span className="text-yellow-400">Quiz</span>
          </div>
          <div className="flex items-center gap-4">
            <p className="lg:inline hidden">
              {getSessionData('user')?.username}
            </p>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
              arrow
            >
              <Avatar
                className="bg-cover bg-center w-10 h-10 rounded-full cursor-pointer"
                style={{
                  backgroundImage: `url('https://www.kindpng.com/picc/m/171-1712282_profile-icon-png-profile-icon-vector-png-transparent.png')`,
                }}
              />
            </Dropdown>
          </div>
        </div>
        <Content
          className={`p-4 mb-4 mr-4 rounded-xl overflow-y-auto bg-white ${
            collapsed ? 'lg:ml-0 ml-4' : ''
          }`}
        >
          <Outlet />
        </Content>
      </Layout>
      <Modal
        title={
          <div className="flex gap-2">
            <HiOutlineLogout className="text-3xl" />
            Yakin ingin Logout!
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={[
          <Button
            key="cancel"
            onClick={handleCancel}
            className="bg-white"
            style={{
              color: 'gray',
              border: 'lightgray 1px solid',
            }}
            ghost={false}
          >
            Batal
          </Button>,
          <Button
            key="create"
            onClick={handleOk}
            className="bg-tema-green border-none hover:bg-yellow-400"
            style={{
              color: 'white',
            }}
          >
            <div className="flex items-center">Logout</div>
          </Button>,
        ]}
      ></Modal>
    </Layout>
  )
}

export default DashboardLayout
