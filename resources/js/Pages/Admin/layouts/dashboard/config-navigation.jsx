import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: 'dash',
    icon: icon('ic_analytics'),
    role:['admin']
  },
  {
    title: 'user',
    path: 'user',
    icon: icon('ic_user'),
    role:['admin']

  },
  {
    title: 'Class',
    path: 'classes',
    icon: icon('ic_cart'),
    role:['school_admin','teacher']
  },
  {
    title: 'Sections',
    path: 'sections',
    icon: icon('ic_cart'),
    role:['school_admin']

  },
  {
    title: 'School Admin',
    path: 'school-admin',
    icon: icon('ic_cart'),
    role:['admin']

  },
  {
    title: 'Students',
    path: 'students',
    icon: icon('ic_cart'),
    role:['admin','school_admin','teacher']

  },
  {
    title: 'Teachers',
    path: 'teachers',
    icon: icon('ic_cart'),
    role:['admin']

  },
  {
    title: 'Schools',
    path: 'schools',
    icon: icon('ic_blog'),
    role:['admin']

  },
  {
    title: 'Attendance',
    path: 'attendance',
    icon: icon('ic_blog'),
    role:['teacher']

  },
  {
    title: 'Logout',
    path: 'http://127.0.0.1:8000/logout',
    icon: icon('ic_lock'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
