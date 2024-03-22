import React from "react";
import { Link } from "react-router-dom";
const Whyme = () => {
  return (
    <>
      <div className="why_me">
        <div className="h2_1">Why Us</div>
        <div className="flex_cardss">
          <div className="why_card">
            <img src="/images/Group 00.svg" alt="" />
            <div className="h2_2">Task Management Reimagined</div>
            <div className="h2_3">
              Reawaken goes beyond traditional task management, offering a
              transformative approach that aligns with your vision.
            </div>
          </div>
          <div className="why_card">
            <img src="/images/Group 00.svg" alt="" />
            <div className="h2_2">Unleash Creativity</div>
            <div className="h2_3">
              Break free from the ordinary and infuse creativity into your tasks
              and projects with Reawaken's vibrant and inspiring features.
            </div>
          </div>
          <div className="why_card">
            <img src="/images/Group 00.svg" alt="" />
            <div className="h2_2">Community of Visionaries</div>
            <div className="h2_3">
              Join a community of like-minded individuals who believe in turning
              tasks into opportunities for growth.
            </div>
          </div>
        </div>
        <Link to="/register">
          <div className="get_start_div">
            <button className="get_btn btn_w">Get Started</button>
            <img className="arrow" src="/images/icon1.svg" alt="" />
          </div>
        </Link>
      </div>
    </>
  );
};

export default Whyme;
