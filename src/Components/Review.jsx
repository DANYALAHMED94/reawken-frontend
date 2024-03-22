import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Review = () => {
  const data = [
    {
      image: "/images/company1.svg",
      text: "Company",
      image0: "/images/Star.svg",
      text2:
        "Lorem Ipsum has been the industry's standard from dummy text ever since the unknown printer to galley of type and make a type specimen book. ",
      image3: "/images/smiles.svg",
      clientimage: "/images/client1.svg",
      clientname: "John Carter",
      clientbio: "Marketing Lead at Google",
    },
    {
      image: "/images/company2.svg",
      text: "Company",
      image0: "/images/Star.svg",
      text2:
        "Lorem Ipsum has been the industry's standard from dummy text ever since the unknown printer to galley of type and make a type specimen book. ",
      image3: "/images/smiles.svg",
      clientimage: "/images/client2.svg",
      clientname: "Peeter pawl",
      clientbio: "Developer",
    },
    {
      image: "/images/company2.svg",
      text: "Company",
      image0: "/images/Star.svg",
      text2:
        "Lorem Ipsum has been the industry's standard from dummy text ever since the unknown printer to galley of type and make a type specimen book. ",
      image3: "/images/smiles.svg",
      clientimage: "/images/client2.svg",
      clientname: "Philip Ajanaku",
      clientbio: "Designer",
    },
    {
      image: "/images/company2.svg",
      text: "Company",
      image0: "/images/Star.svg",
      text2:
        "Lorem Ipsum has been the industry's standard from dummy text ever since the unknown printer to galley of type and make a type specimen book. ",
      image3: "/images/smiles.svg",
      clientimage: "/images/client2.svg",
      clientname: "Michael Tucker",
    },
  ];
  // responseive config
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },

    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div>
      <div className="review_section">
        <h2 className="h2_1">Reviews</h2>

        <Carousel
          // swipeable={false}
          // draggable={false}
          // showDots={true}
          // responsive={responsive}
          // infinite={true}
          showDots={false}
          responsive={responsive}
          // infinite={false}
          autoPlay={false}
          autoPlaySpeed={99999500}
          // keyBoardControl={true}
          // customTransition="all .5"
          draggable={true}
          transitionDuration={700}
          containerClass="carouselContainer"
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          //   customDot={<CustomDot />}
          // removeArrowOnDeviceType={["tablet", "mobile", "desktop,"]}
          // deviceType={props.deviceType}
          // renderDotsOutside={true}
          // dotListClass="custom-dot-list-style"
          // itemClass="carousel-item-padding-40-px"
        >
          {data.map((el) => {
            return (
              <>
                <div className="card_bg">
                  <div className="orignal_card">
                    <div className="review_flex">
                      <div className="third_f">
                        <img src={el.image} alt="" />
                        <img src={el.image2} alt="" />
                        <div className="card_title1">{el.text}</div>
                      </div>
                      <img src={el.image0} alt="" />
                    </div>
                    <div className="card_title2">{el.text2}</div>
                    <div className="client_section">
                      <img src={el.clientimage} alt="" />
                      <div className="client_bio">
                        <div className="client_name">{el.clientname}</div>
                        <div className="bio_data">{el.clientbio}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};
const CustomLeftArrow = ({ onClick }) => {
  return (
    <div onClick={onClick} className="customArrowLeft pointer">
      <img className="dddd" src="/images/right-arrow.png" alt="Left"></img>
    </div>
  );
};

const CustomRightArrow = ({ onClick }) => {
  return (
    <div onClick={onClick} className="customArrowRight pointer">
      <img className="dddd" src="/images/left-arrow (2).png" alt="right"></img>
    </div>
  );
};

export default Review;
