import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import LayoutClient from './components/client/layout.client';
import NotFound from './components/share/not.found';
import DashboardPage from './pages/admin/dashboard';
import RegisterPage from './pages/auth/register';
import LoginPage from './pages/auth/login';
import LayoutAdmin from './components/admin/layout.admin';
import { fetchAccount } from './redux/slice/accountSlide';
import ProtectedAdminRoute from './components/share/protected-route';
import ProtectedStaffRoute from './components/share/protected-route/staff-protected';
import VaccinePage from './pages/admin/vaccine';
import CenterPage from './pages/admin/center';
import UserPage from './pages/admin/user';
import ProfilePage from './pages/auth/_profile';
import ProtectedUserRoute from './components/share/protected-route/user-protected';
import PermissionPage from './pages/admin/permission';
import RolePage from './pages/admin/role';
import AppointmentManagementPage from './pages/admin/appointment';

import SuccessPage from './pages/client/_success';
import { useAccount } from 'wagmi';
import HomePage from './pages/client/_home';
import MarketPage from './pages/client/_market';
import BookingPage from './pages/client/_booking';
import CertificatePage from './pages/auth/certificate/[id]';

// Staff pages
import LayoutStaff from './components/staff/layout.staff';
import StaffDashboard from './pages/staff/dashboard';
import StaffVaccinePage from './pages/staff/vaccines';
import StaffCenterPage from './pages/staff/centers';
import MySchedulePage from './pages/staff/my-schedule';
import AppointmentPage from './pages/staff/appointment';

const App = () => {
  const dispatch = useDispatch();
  const { address } = useAccount();
  useEffect(() => {
    if (
      window.location.pathname === '/login' ||
      window.location.pathname === '/register'
    )
      return;
    dispatch(fetchAccount(address));
  }, [address, dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <LayoutClient />
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'market', element: <MarketPage /> },
        { path: 'booking', element: <BookingPage /> },
        { path: 'success', element: <SuccessPage /> },
        {
          path: 'profile', element:
            <ProtectedUserRoute>
              <ProfilePage />
            </ProtectedUserRoute>
        },
      ],
    },

    {
      path: '/admin',
      element: (
        <ProtectedAdminRoute>
          <LayoutAdmin />
        </ProtectedAdminRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          path: 'dashboard',
          element: <DashboardPage />,
        },
        {
          path: 'vaccines',
          element: <VaccinePage />,
        },
        {
          path: 'users',
          element: <UserPage />,
        },
        {
          path: 'centers',
          element: <CenterPage />,
        },
        {
          path: 'permissions',
          element: <PermissionPage />,
        },
        {
          path: 'roles',
          element: <RolePage />,
        },
        {
          path: 'appointments',
          element: <AppointmentManagementPage />,
        },
      ],
    },
    
    // Staff route - only accessible by DOCTOR and CASHIER roles
    {
      path: '/staff',
      element: (
        <ProtectedStaffRoute>
          <LayoutStaff />
        </ProtectedStaffRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          path: 'dashboard',
          element: <StaffDashboard />,
        },
        {
          path: 'vaccines',
          element: <StaffVaccinePage />,
        },
        {
          path: 'centers',
          element: <StaffCenterPage />,
        },
        {
          path: 'appointments',
          element: <AppointmentPage />,
        },
        {
          path: 'my-schedule',
          element: <MySchedulePage />,
        },
        
      ],
    },

    {
      path: '/auth/certificate/:id',
      element: <CertificatePage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },

    {
      path: '/register',
      element: <RegisterPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
