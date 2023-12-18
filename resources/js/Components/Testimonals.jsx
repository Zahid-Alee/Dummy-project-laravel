import React, { useEffect, useState } from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import axios from "axios";




export default function UsersFeedback() {


  const [feedbacks, setFeedbacks] = useState([]);


  useEffect(() => {
    loadData()

  }, [])

  const loadData = () => {

    axios.get('/feedbacks')
      .then((res) => setFeedbacks(res.data))
      .catch(e => console.log(e))
  }
  return (
    <section>
      <div class="row d-flex justify-content-center">
        <div class="section-header text-center">
          <p>User Review</p>
          <h2> Feedbacks From Customers</h2>
        </div>
      </div>

      <div style={{ backgroundColor: "black" }} class="row text-center">
        <Carousel style={{width:"80%",margin:"auto"}} className="rounded-xl"
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
          transition={{ type: "tween", duration: 0.5 }}

        >
          {feedbacks?.map((feed, i) => {
            return <div key={i} style={{ margin: "30px auto" }} class="col-md-4 mb-0">
              <div class="d-flex justify-content-center p-4 mb-4">
                <img src="https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?w=740&t=st=1702837752~exp=1702838352~hmac=2c067bae9dd29c4d8c51d274d86114a9a7dc9391655f6a1776a70eea28356480"
                  class="rounded-circle shadow-1-strong" width="150" height="150" />
              </div>
              <h5 style={{color:'white'}} class="mb-3">{feed?.user?.name}</h5>
              <h6 class="text-primary mb-3">Customer</h6>
              <p class="px-xl-3" style={{ color: "white", marginBottom: "40px" }}>
                <i class="fas fa-quote-left pe-2"></i>{feed?.message}
              </p>
            </div>
          })}
        </Carousel>
      </div>
    </section>

  );
}