import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Drawer, Dropdown, Avatar, message, Layout, Badge } from 'antd';
import {
    UserOutlined,
    LogoutOutlined,
    DashboardOutlined,
    HomeOutlined,
    ShoppingOutlined,
    CalendarOutlined,
    MenuOutlined,
    SafetyCertificateOutlined,
} from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { callLogout } from '../../config/api.auth';
import { setLogoutAction } from '../../redux/slice/accountSlide';
import { useDisconnect } from 'wagmi';

const { Header } = Layout;

const Navbar = () => {
    const dispatch = useDispatch();
    const { disconnect } = useDisconnect();
    const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
    const user = useSelector((state) => state.account.user);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res && +res.statusCode === 200) {
            disconnect();
            dispatch(setLogoutAction({}));
            message.success('Đăng xuất thành công');
            navigate('/');
        }
    };

    const getRole = (role) => {
        switch (role) {
            case "ADMIN":
                return 'Quản trị viên';
            case "PATIENT":
                return 'Người dùng';
            case "DOCTOR":
                return 'Bác sĩ';
            case "CASHIER":
                return 'Nhân viên thu ngân';
        }
    };

    const menuItems = [
        {
            key: '/',
            icon: <HomeOutlined />,
            label: 'Trang chủ',
        },
        {
            key: 'market-menu',
            icon: <ShoppingOutlined />,
            label: 'Vaccine',
            children: [
                {
                    key: '/market',
                    label: 'Danh sách vaccine',
                },
            ]
        },
        {
            key: 'booking-menu',
            icon: <CalendarOutlined />,
            label: 'Đặt lịch',
            children: [
                {
                    key: '/booking',
                    label: 'Đặt lịch mới',
                },
                {
                    key: '/profile',
                    label: 'Lịch sử đặt',
                },
            ]
        },
   
    ];

    const userMenuItems = [
        {
            key: 'profile',
            label: 'Thông tin cá nhân',
            icon: <UserOutlined />,
            onClick: () => navigate('/profile'),
        },
        ...(user?.roleName === 'ADMIN' ? [{
            key: 'system',
            label: 'Trang quản trị',
            icon: <DashboardOutlined />,
            onClick: () => navigate('/admin/dashboard'),
        }] : []),
        ...(user?.roleName === 'DOCTOR' || user?.roleName === 'CASHIER' ? [{
            key: 'system',
            label: 'Trang nhân viên',
            icon: <DashboardOutlined />,
            onClick: () => navigate('/staff/dashboard'),
        }] : []),
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: 'Đăng xuất',
            icon: <LogoutOutlined />,
            onClick: handleLogout,
            danger: true
        },
    ];

    const renderUserMenu = () => {
        if (isAuthenticated) {
            return (

                <Dropdown
                    menu={{ items: userMenuItems }}
                    placement="bottomRight"
                    arrow
                    trigger={['click']}
                >
                    <div className="cursor-pointer flex items-center gap-2">
                        <Badge dot={user?.isVerified}>
                            <Avatar src={user?.avatar} className="bg-brand-primary">
                                {user?.name?.charAt(0) || <UserOutlined />}
                            </Avatar>
                        </Badge>
                        <div className="hidden md:block">
                            <div className="text-sm font-medium">{user?.fullname}</div>
                            <div className="text-xs text-gray-500">{getRole(user?.roleName)}</div>
                        </div>
                    </div>
                </Dropdown>
            );
        }

        return (
            <>
                {/* <Button onClick={() => disconnect()}>Haha</Button> */}
                <Link to="/login" className="ant-btn ant-btn-primary text-sm">
                    <UserOutlined /> Đăng nhập
                </Link>
            </>


        );
    };

    return (
        <Header className="bg-white px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between fixed w-full z-50 shadow-sm">
            <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2">
                    <SafetyCertificateOutlined className="text-2xl text-brand-primary" />
                    <span className="text-xl font-bold text-gray-900">VaxChain</span>
                </Link>

                <div className="hidden md:block">
                    <Menu
                        mode="horizontal"
                        selectedKeys={[location.pathname]}
                        items={menuItems}
                        onClick={({ key }) => navigate(key)}
                        className="border-0"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:block">
                    {renderUserMenu()}
                </div>

                <div className="md:hidden">
                    <MenuOutlined onClick={() => setOpen(true)} className="text-lg" />
                </div>
            </div>

            <Drawer
                title={
                    <div className="flex items-center gap-2">
                        <SafetyCertificateOutlined className="text-xl text-brand-primary" />
                        <span className="font-bold">VaxChain</span>
                    </div>
                }
                placement="right"
                onClose={() => setOpen(false)}
                open={open}
                width={280}
                className="md:hidden"
            >
                <Menu
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={({ key }) => {
                        navigate(key);
                        setOpen(false);
                    }}
                    className="border-0"
                />
                <div className="mt-4 px-4">
                    {renderUserMenu()}
                </div>
            </Drawer>
        </Header>
    );
};

export default Navbar;