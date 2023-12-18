import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Requests',
    path: '/request',
    icon: icon('ic_cart'),
  },
  {
    title: 'Washing Points',
    path: '/points',
    icon: icon('ic_cart'),
  },
  {
    title: 'Plans',
    path: '/plans',
    icon: icon('ic_blog'),
  },
  {
    title: 'User Feedback',
    path: '/feedbacks',
    icon: icon('ic_blog'),
  },
  {
    title: 'Logout',
    path: 'http://127.0.0.1:8000/logout',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
