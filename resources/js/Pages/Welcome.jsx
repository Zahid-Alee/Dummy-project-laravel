import Navbar from '../Components/Navbar';
import Testimonial from '../Components/Testimonial';
import TopBar from '../Components/TopBar';
import { Link, Head } from '@inertiajs/react';
import { Carousel, IconButton } from "@material-tailwind/react";
import '../../css/app.css'
// import Modal from '@/Components/Modal';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { BlogView } from './Admin/sections/blog/view';
import UsersBlogView from './Admin/sections/blog/view/user-blog-view';
import UserPage from './Admin/pages/user';
import UserBlogView from './Admin/sections/blog/view/user-blog-view';
// import AuthenticatedLayout from '@/User/Layouts/AuthenticatedLayout';

// import '../../img/'

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <Navbar auth={auth} />
        </>
    );
}
