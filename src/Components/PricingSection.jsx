import React, { useState } from "react";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="pricing_section">
      <div className="heading_pricing2">Simple Pricing</div>
      <div className="radio_section">
        <button
          className={toggleState === 1 ? "statebtn1" : "statebtn"}
          onClick={() => toggleTab(1)}
        >
          Monthly
        </button>
        <button
          className={toggleState === 2 ? "statebtn1" : "statebtn"}
          onClick={() => toggleTab(2)}
        >
          Yearly
        </button>
      </div>
      <p className="pricing_content">
        We can't explain ourselves like our customers and their numbers can.
      </p>
      <div className="crd_flex">
        {/* <div className="crd1">
          <div className="crd_title">Free</div>
          <div className="content_5">
            The Free Plan is perfect for those who are just starting their
            journey with Reawaken. It provides essential features to help you
            reorganize and rejuvenate your tasks. With the Free Plan, you can:
          </div>
          <div className="title_4">Get It</div>
          <div className="title_1">$0</div>
          <div className="title_4">yearly</div>
          <div className="child_flex">
            <img className="tik" src="/images/icon.svg" alt="" />
            <div>Create Unlimited Tasks</div>
          </div>
          <div className="child_flex">
            <img className="tik" src="/images/icon.svg" alt="" />
            <div>Basic Visualizations</div>
          </div>
          <div className="child_flex">
            <img className="tik" src="/images/icon.svg" alt="" />
            <div>Standard Collaboration Features</div>
          </div>
          <div className="child_flex">
            <img className="tik" src="/images/icon.svg" alt="" />
            <div>Limited Workspaces</div>
          </div>
          <div className="child_flex">
            <img className="tik" src="/images/icon.svg" alt="" />
            <div>Basic Progress Tracking</div>
          </div>
          <Link to="/register">
            <button className="get_btn btn1">Get Started for Free</button>
          </Link>
        </div> */}

        <div className="crd1">
          <div className="crd_title">Premium</div>
          <div className="content_5">
            Our Premium Plan offers a comprehensive suite of features designed
            to unleash your full potential. With the Premium Plan, you'll enjoy
            all the benefits of the Free Plan, plus::
          </div>
          <div className="title_4">Starts at</div>
          <div className="title_1">{toggleState === 1 ? "$10" : "$100"}</div>
          <div className="title_4">yearly</div>
          <div className="child_flex">
            <img className="tik" src="/images/icon.svg" alt="" />
            <div>Inspiration-Driven Workspaces</div>
          </div>
          <div className="child_flex">
            <img className="tik" src="/images/icon.svg" alt="" />
            <div>Advanced Visualizations</div>
          </div>
          <div className="child_flex">
            <img className="tik" src="/images/icon.svg" alt="" />
            <div>Enhanced Collaboration Tools</div>
          </div>
          <div className="child_flex">
            <img className="tik" src="/images/icon.svg" alt="" />
            <div>Unlimited Workspaces</div>
          </div>
          <div className="child_flex">
            <img className="tik" src="/images/icon.svg" alt="" />
            <div>Detailed Progress Tracking</div>
          </div>
          <div className="child_flex">
            <img className="tik" src="/images/icon.svg" alt="" />
            <div>Priority Customer Support</div>
          </div>
          <Link to="/register">
            <button className="get_btn">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
