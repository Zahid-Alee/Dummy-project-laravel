import React from 'react';

const Testimonial = () => {
    return (
        <div>
            <div class="testimonial">
                <div class="container">
                    <div class="section-header text-center">
                        <p>Testimonial</p>
                        <h2>What our clients say</h2>
                    </div>
                    <div class="owl-carousel testimonials-carousel">
                        <div class="testimonial-item">
                            <img src="../../img/testimonial-1.jpg" alt="Image" />
                            <div class="testimonial-text">
                                <h3>Client Name</h3>
                                <h4>Profession</h4>
                                <p>
                                    “Car Wash Advisory sold my wash for more than expected and faster than expected. Simply great.”
                                </p>
                            </div>
                        </div>
                        <div class="testimonial-item">
                            <img src="../../img/testimonial-2.jpg" alt="Image" />
                            <div class="testimonial-text">
                                <h3>Client Name</h3>
                                <h4>Profession</h4>
                                <p>
                                    "The car wash industry is changing. You need someone that can get it done at a level of service and professionalism that matches."
                                </p>
                            </div>
                        </div>
                        <div class="testimonial-item">
                            <img src="../../img/testimonial-3.jpg" alt="Image" />
                            <div class="testimonial-text">
                                <h3>Client Name</h3>
                                <h4>Profession</h4>
                                <p>
                                    "It was a pleasure working with CWA. I look forward to working on more transactions in the future"
                                </p>
                            </div>
                        </div>
                        <div class="testimonial-item">
                            <img src="../../img/testimonial-4.jpg" alt="Image" />
                            <div class="testimonial-text">
                                <h3>Client Name</h3>
                                <h4>Profession</h4>
                                <p>
                                    "Fantastic people to work with. They set reasonable expectations and clear goals that they were engaged with their clients."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Testimonial;
