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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedPlan, setSelectedPlan] = React.useState(null);
    const handleBookPlan = (plan) => {
        handleOpen();
        setSelectedPlan(plan.id);
    }
    return (
        <>
            <Head title="Welcome" />
            <div className="">
                <>
                    <TopBar />
                    <div class="nav-bar">
                        <div class="container">
                            <Navbar auth={auth} />
                        </div>
                    </div>
                    <div className="carousel-container">

                        <Carousel
                            className="rounded-xl"
                            prevArrow={({ handlePrev }) => (
                                <IconButton
                                    variant="text"
                                    color="white"
                                    size="lg"
                                    onClick={handlePrev}
                                    className="!absolute top-2/4 left-4 -translate-y-2/4"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                        />
                                    </svg>
                                </IconButton>
                            )}
                            nextArrow={({ handleNext }) => (
                                <IconButton
                                    variant="text"
                                    color="white"
                                    size="lg"
                                    onClick={handleNext}
                                    className="!absolute top-2/4 !right-4 -translate-y-2/4"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                        />
                                    </svg>
                                </IconButton>
                            )}
                            autoplay={true}
                            autoplayDelay={5000}
                            transition={{ type: "tween", duration: 0.5 }}
                            loop

                        >
                            <img
                                src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                                alt="image 1"
                                className="h-full w-full object-cover"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                                alt="image 2"
                                className="h-full w-full object-cover"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                                alt="image 3"
                                className="h-full w-full object-cover"
                            />
                        </Carousel>
                    </div>

                    <div class="about">
                        <div class="container">
                            <div class="row align-items-center">
                                <div class="col-lg-6">
                                    <div class="about-img">
                                        <video controls loop autoplay height="280" width="550" >
                                            <source src="video/Introcar_wash.mp4" type="video/mp4" />
                                        </video>

                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="section-header text-left">
                                        <p>About Us</p>
                                        <h2>car washing and detailing</h2>
                                    </div>
                                    <div class="about-content">
                                        <p>
                                            Carwashing is simpler . It includes washing the outside of the vehicle to remove dirt and other debris.<br />
                                            Detailing is most often referred to as an in-depth, thorough cleaning and/or restoration of a car, truck, van or SUV
                                            to achieve a high-quality cleanliness and protection.”
                                        </p>
                                        <ul>
                                            <li><i class="far fa-check-circle"></i>Seats washing</li>
                                            <li><i class="far fa-check-circle"></i>Vacuum cleaning</li>
                                            <li><i class="far fa-check-circle"></i>Interior wet cleaning</li>
                                            <li><i class="far fa-check-circle"></i>Window wiping</li>
                                        </ul>
                                        <a class="btn btn-custom" href="">Learn More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="service">
                        <div class="container">
                            <div class="section-header text-center">
                                <p>What We Do?</p>
                                <h2>Premium Washing Services</h2>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-6">
                                    <div class="service-item">
                                        <i class="flaticon-car-wash-1"></i>
                                        <h3>Exterior Washing</h3>
                                        <p>A car wash, carwash, or auto wash is a facility used to clean the exterior, and in some cases the interior of motor vehicles.</p>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <div class="service-item">
                                        <i class="flaticon-car-wash"></i>
                                        <h3>Interior Washing</h3>
                                        <p>The Car interior detailing, as the name implies, is the cleaning of vehicle interiors</p>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <div class="service-item">
                                        <i class="flaticon-vacuum-cleaner"></i>
                                        <h3>Vacuum Cleaning</h3>
                                        <p>Industrial vacuum cleaners for vehicle cleaning must therefore give consistent performance,<br />
                                            good filtering capacity, and ensure there is enough airflow for it</p>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <div class="service-item">
                                        <i class="flaticon-seat"></i>
                                        <h3>Seats Washing</h3>
                                        <p>Cloth car seats are relatively easy to clean without damaging the material like vaccum,baking soda etc.</p>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <div class="service-item">
                                        <i class="flaticon-car-service"></i>
                                        <h3>Window Wiping</h3>
                                        <p>A windscreen wiper, windshield wiper, wiper blade , or simply wiper, is a device used to<br />
                                            remove rain, snow, ice from a vehicle's front window.</p>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <div class="service-item">
                                        <i class="flaticon-car-service-2"></i>
                                        <h3>Wet Cleaning</h3>
                                        <p>Wet cleaning machines have controls that allow them to safely and efficiently clean a wide variety of garments in water.</p>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <div class="service-item">
                                        <i class="flaticon-car-wash"></i>
                                        <h3>Oil Changing</h3>
                                        <p>the process of removing old, dirty oil in a vehicle and replacing it with clean oil The car needs an oil change</p>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <div class="service-item">
                                        <i class="flaticon-brush-1"></i>
                                        <h3>Brake Reparing</h3>
                                        <p>The one important job that your automobile’s brake system has is to help stop your vehicle. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="facts" data-parallax="scroll" data-image-src="../../img/facts.jpg">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-3 col-md-6">
                                    <div class="facts-item">
                                        <i class="fa fa-map-marker-alt"></i>
                                        <div class="facts-text">
                                            <h3 data-toggle="counter-up">25</h3>
                                            <p>Service Points</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <div class="facts-item">
                                        <i class="fa fa-user"></i>
                                        <div class="facts-text">
                                            <h3 data-toggle="counter-up">350</h3>
                                            <p>Engineers & Workers</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <div class="facts-item">
                                        <i class="fa fa-users"></i>
                                        <div class="facts-text">
                                            <h3 data-toggle="counter-up">1500</h3>
                                            <p>Happy Clients</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <div class="facts-item">
                                        <i class="fa fa-check"></i>
                                        <div class="facts-text">
                                            <h3 data-toggle="counter-up">5000</h3>
                                            <p>Projects Completed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="price">
                        <div class="container">
                            <div class="section-header text-center">
                                <p>Washing Plan</p>
                                <h2>Choose Your Plan</h2>
                            </div>
                            <UserBlogView view={true} />
                        </div>
                    </div>

                    <div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Text in a modal
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                </Typography>
                            </Box>
                        </Modal>
                    </div>
                    <Testimonial />
                </>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
