import Navbar from '../Components/Navbar';
import Testimonial from '../Components/Testimonial';
import TopBar from '../Components/TopBar';
import { Link, Head } from '@inertiajs/react';
import { Carousel, IconButton } from "@material-tailwind/react";
import '../../css/app.css'

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import UserBlogView from './Admin/sections/blog/view/user-blog-view';
import UsersFeedback from '@/Components/Testimonals';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Services from '@/Components/Services';
import ChoosePlan from '@/Components/ChoosePlan';
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
    const [serviceData, setServiceData] = React.useState('');


    React.useEffect(() => {

        axios.get(`/get-all-data`).
            then((re) => { setServiceData(re.data) }
            )
            .catch((e) => console.log(e))
    }, [])

    const handleBookPlan = (plan) => {
        handleOpen();
        setSelectedPlan(plan.id);
    }


    const handleReq = (e) => {

        e.preventDefault();
        const formData = new FormData(e.target);
        axios.post(`/feedbacks`, formData).

            then((re) => { 
                toast.success('Feedback Submitted') ;
                window.location.reload();
            
            }
            )
            .catch((e) => console.log(e))
    }




    return (
        <>

            <Toaster />
            <Head title="Welcome" />
            <div className="">
                <>
                    <TopBar />
                    <div style={{ backgroundColor: 'black' }} class="nav-bar">
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
                                src="https://img.freepik.com/free-photo/beautiful-car-washing-service_23-2149212191.jpg?w=826&t=st=1702579503~exp=1702580103~hmac=7c5f9481b15253adf1bc04a6e412258fce84dbab5753e71ad1eeb839b46cd791"
                                alt="image 1"
                                className="h-full w-full object-cover"
                            />
                            <img style={{ objectFit: 'cover', width: '100%' }}
                                src="https://img.freepik.com/free-photo/man-washing-his-car-garage_1157-26046.jpg?w=826&t=st=1702579345~exp=1702579945~hmac=b2cd0a2652b6c68631a529d3d02bc32ffb8430021b8422f2e9508766571cb2a8"
                                alt="image 2"
                                className="h-full w-full object-cover"
                            />
                            <img
                                src="https://img.freepik.com/free-photo/car-wash-detailing-station_1303-22319.jpg?w=826&t=st=1702579416~exp=1702580016~hmac=acdbf51fd247ecb2a046a0ddd62f5d6e0d6362ca7dabdfbf03bedd88a93fad00"
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
                                            <source src="./car_wash_-_3555 (360p).mp4" type="video/mp4" />
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
                    <Services />
                    <ChoosePlan />

                    <div class="facts" data-parallax="scroll" data-image-src="../../img/facts.jpg">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-3 col-md-6">
                                    <div class="facts-item">
                                        <i class="fa fa-map-marker-alt"></i>
                                        <div class="facts-text">
                                            <h3 data-toggle="counter-up">{serviceData?.washing_points_count ?? 0}</h3>
                                            <p>Service Points</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <div class="facts-item">
                                        <i class="fa fa-user"></i>
                                        <div class="facts-text">
                                            <h3 data-toggle="counter-up">{serviceData?.users_count ?? 0}</h3>
                                            <p>Trusted Users</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <div class="facts-item">
                                        <i class="fa fa-users"></i>
                                        <div class="facts-text">
                                            <h3 data-toggle="counter-up">{serviceData?.plans_count ?? 0}</h3>
                                            <p>Pricing  Plans</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <div class="facts-item">
                                        <i class="fa fa-check"></i>
                                        <div class="facts-text">
                                            <h3 data-toggle="counter-up">{serviceData?.sold_plans_count ?? 0}</h3>
                                            <p>Washing Completed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                    <UsersFeedback />

                    <div class="location">
                        <div class="container">
                            <div class="row">

                            </div>
                        </div>
                    </div>

                    <div class="footer">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-3 col-md-6">
                                    <div class="footer-contact">
                                        <h2>Get In Touch</h2>
                                        <p><i class="fa fa-map-marker-alt"></i>COMSATS</p>
                                        <p><i class="fa fa-phone-alt"></i>+92 123456789</p>
                                        <p><i class="fa fa-envelope"></i>fyp123.com</p>
                                        <div class="footer-social">
                                            <a class="btn" href=""><i class="fab fa-twitter"></i></a>
                                            <a class="btn" href=""><i class="fab fa-facebook-f"></i></a>
                                            <a class="btn" href=""><i class="fab fa-youtube"></i></a>
                                            <a class="btn" href=""><i class="fab fa-instagram"></i></a>
                                            <a class="btn" href=""><i class="fab fa-linkedin-in"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <div class="footer-link">
                                        <h2>Popular Links</h2>
                                        <a href="">About Us</a>
                                        <a href="">Contact Us</a>
                                        <a href="">Our Service</a>
                                        <a href="">Service Points</a>
                                        <a href="">Pricing Plan</a>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <div class="footer-link">
                                        <h2>Useful Links</h2>
                                        <a href="">Terms of use</a>
                                        <a href="">Privacy policy</a>
                                        <a href="">Cookies</a>
                                        <a href="">Help</a>
                                        <a href="">FQAs</a>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <div class="footer-newsletter">
                                        <h2>Submit Feedback</h2>
                                        <form onSubmit={handleReq}>
                                            <div>
                                                <strong>Message</strong>

                                            </div>
                                            <input type='text' name='message'
                                                required />
                                            <button class="btn btn-custom">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
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
