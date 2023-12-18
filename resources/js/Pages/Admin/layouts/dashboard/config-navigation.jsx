import { FaChalkboardTeacher, FaSchool, FaUser, FaUserShield } from 'react-icons/fa';
import SvgColor from '../../components/svg-color';
import { MdDashboard , MdClass ,MdOutlineChairAlt } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { BsPencilSquare } from "react-icons/bs";


// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: 'dash',
    icon: <MdDashboard size={20} />,
    role:['admin']
  },
  {
    title: 'Users',
    path: 'user',
    icon: <FaUser size={20}/>,
    role:['admin']

  },
  {
    title: 'Class',
    path: 'classes',
    icon: <FaChalkboardTeacher size={20}/>,
    role:['school_admin','teacher']
  },
  {
    title: 'Sections',
    path: 'sections',
    icon: <MdOutlineChairAlt size={20}/>,
    role:['school_admin']

  },
  {
    title: 'School Admin',
    path: 'school-admin',
    icon: <FaUserShield size={20}/>,
    role:['admin']

  },
  {
    title: 'Enrollments',
    path: 'enrollments',
    icon: <PiStudentBold size={20}/>
    ,
    role:['admin','school_admin','teacher']

  },
  {
    title: 'Teachers',
    path: 'teachers',
    icon: <GiTeacher size={20}/>,
    role:['admin']

  },
  {
    title: 'Schools',
    path: 'schools',
    icon: <FaSchool size={20}/>,
    role:['admin']

  },
  {
    title: 'Attendance',
    path: 'attendance',
    icon: <BsPencilSquare size={20}/>,
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
