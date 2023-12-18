import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import Sections from '../sections/Sections';
import Classes from '../sections/Class';
import Teachers from '../sections/Teacher';
import Students from '../sections/Student';
import SchoolAdmin from '../sections/SchoolAdmin';
import Attendance from '../sections/Attendance';

export const IndexPage = lazy(() => import('../pages/app'));
export const BlogPage = lazy(() => import('../pages/blog'));
export const UserPage = lazy(() => import('../pages/user'));
export const LoginPage = lazy(() => import('../pages/login'));
export const ProductsPage = lazy(() => import('../pages/products'));
export const Page404 = lazy(() => import('../pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router({role}) {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout role={role}>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: '/dash', element: <IndexPage /> },
        { path: '/user', element: <UserPage /> },
        { path: '/products', element: <ProductsPage /> },
        { path: '/schools', element: <BlogPage /> },
        { path: '/sections', element: <Sections canedit={role=='school_admin'} /> },
        { path: '/school-admin', element: <SchoolAdmin/> },
        { path: '/classes', element: <Classes canedit={role=='school_admin'} /> },
        { path: '/teachers', element: <Teachers /> },
        { path: '/enrollments', element: <Students canedit={role=='school_admin'}  /> },
        { path: '/attendance', element: <Attendance canedit={role=='school_admin'}  /> },
      ],
    },
    // {
    //   path: 'login',
    //   element: <LoginPage />,
    // },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
