import UserBlogView from '@/Pages/Admin/sections/blog/view/user-blog-view';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaMapMarker } from 'react-icons/fa';

const ChoosePlan = () => {


    const [points, setPoints] = useState();
    const [selectedPoint, setselectedPoint] = useState();

    useEffect(() => {
        loadPoints();
    }, [])

    const loadPoints = async () => {

        await axios.get('/points').then(function (res) {
            setPoints(res.data);
        })
            .catch(e => console.log(e))
    }

    return (
        <div class="price">
            <div class="container">
                <div class="section-header text-center">
                    <p>Washing Plan</p>
                    <h2>Choose Washing Point For Plans</h2>
                </div>
                <div className="points-container">
                    {
                        points?.map((point, i) => {
                            return <div onClick={() => setselectedPoint(point)} key={i} class={`point ${selectedPoint?.id === point?.id ? 'active' : ''}`}>
                                <h3 className="name">
                                    <FaMapMarker /> {point.name}
                                </h3>
                                <div class="location-text">
                                    <h3><strong>City: </strong>{point.city}</h3>
                                    <p><strong>Address: </strong>{point.location}</p>
                                    <p><strong>Call: </strong>{ point.contact}</p>
                                </div>  
                            </div>
                        })
                    }
                </div>
                <div className="plan-view">
                    {selectedPoint?.plans?.length > 0 ?
                        <div className="plan-view p-5 px-0">
                            <UserBlogView plans={selectedPoint?.plans} view={true} />
                        </div>
                        :
                        <div style={{ margin: '20px', textAlign: 'center' }}>
                            There are no plans for this washing point
                        </div>
                    }
                </div>
            </div>
        </div>

    );
}

export default ChoosePlan;
