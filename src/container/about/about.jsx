import React from "react";

import "./about.scss";

import { blueIcons, images } from "../../constants";


const about = () => {
    return (
        <div id="about" >

            <img className="about-left" src={blueIcons.about_left} alt="" />
            <img className="about-right" src={blueIcons.about_right} alt="" />

            <h1>About me</h1>
            <div className="about-container" style={{maxWidth: '1920px', margin: 'auto'}}>
                <div className="about-images">
                    <div className="headshot">
                        <img src={images.photo} alt="" />
                    </div>
                    <div className="about-btns">
                        <img src={images.about_btn1} alt="" />
                        <img src={images.about_btn2} alt="" />
                        <img src={images.about_btn3} alt="" />
                        <img src={images.about_btn4} alt="" />
                    </div>
                </div>
                <div className="bio">
                    <div className="bio-card">
                        <p>
                            <strong>
                                Hi 👋, my name is Bruce Zhu, a passionate software
                                engineering student at the University of
                                Melbourne, pursuing to become a &nbsp;
                                <span>software developer</span> in the future.
                            </strong>
                            <br />
                            <br />I fell in love with development when I built
                            my first website in a coding competition. I
                            believe&nbsp;
                            <strong>
                                creation is the beauty of programming&nbsp;
                            </strong>
                            and I enjoy building projects and creating awesome
                            products with my own hand. <br />
                            <br />
                            As a proactive student, apart from interacting with the computer, I also like socialising with people by participating in club activities, community volunteering activities, student programs, etc. <br/>
                            <br />
                            In my leisure time, I like playing badminton and
                            guitar as my hobbies, or implementing my project
                            ideas for fun.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default about;
