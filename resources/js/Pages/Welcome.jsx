import Navbar from '../Components/Navbar';
import Testimonial from '../Components/Testimonial';
import TopBar from '../Components/TopBar';
import { Link, Head } from '@inertiajs/react';
import { Carousel, IconButton } from "@material-tailwind/react";
import '../../css/app.css'
import * as React from 'react';


export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <Navbar auth={auth} />
            <div className="bg-img">
                <img style={{margin:'auto'}} src='https://img.freepik.com/free-vector/high-school-concept-illustration_114360-8329.jpg?w=826&t=st=1702728224~exp=1702728824~hmac=14a7fc40b16515d042862e34363f1c2c9e37ed2cf3fdc606f5104d206acb8aad' />
            </div>
        </>
    );
}
