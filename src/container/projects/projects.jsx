import React from "react";

import "./projects.scss";
import { ProjectCard } from "../../components";
import { originalIcons, images } from "../../constants";

const projects = () => {
    const yelpCamp = [
        originalIcons.mongodb2,
        originalIcons.nodejs,
        originalIcons.express,
        originalIcons.bootstrap,
    ];
    const planner = [
        originalIcons.figma,
        originalIcons.react,
        originalIcons.html5,
        originalIcons.css3,
    ];
    const candy = [
        originalIcons.figma,
        originalIcons.html5,
        originalIcons.css3,
        originalIcons.javascript,
    ];

    return (
        <div id="projects">
            <h1>Side Projects</h1>

            <img className="bg e1" src={images.ellipse1} alt="" />
            <img className="bg e2" src={images.ellipse2} alt="" />
            <img className="bg e3" src={images.ellipse2} alt="" />

            <div className="projects-container">
                <div className="project-card">
                    <ProjectCard
                        title="Yelp Camp"
                        imageUrl={images.yelpcamp}
                        body="YelpCamp is a website where users can create and review campgrounds. In order to review or create a campground, you must have an account. This project was part of Colt Steele's web dev course on udemy."
                        demoUrl="https://yelpcamp-zyc.herokuapp.com/"
                        githubUrl="https://github.com/Bruce-zzhu/YelpCamp"
                        icons={yelpCamp}
                    />
                </div>
                <div className="project-card">
                    <ProjectCard
                        title="MindTask Planner"
                        imageUrl={images.planner}
                        body="A Planner web web app aiming to help people improve the efficiency of managing a project by implementing a task-hierarchy(mind map) system and a progress overview function based on ETC(Estimated Time to Complete)."
                        demoUrl="https://mind-task-planner.herokuapp.com/"
                        githubUrl="https://github.com/Bruce-zzhu/MindTask-Planner"
                        icons={planner}
                    />
                </div>
                <div className="project-card">
                    <ProjectCard
                        title="Candy Challenge"
                        imageUrl={images.candy}
                        body="A web app aiming to help people improve social interactions through completing interesting group activities to earn “Candies” which can be used for exchanging commercial products in real life."
                        demoUrl="https://candy-challenge.web.app/landing.html"
                        githubUrl="https://github.com/Bruce-zzhu/Candy-Challenge"
                        icons={candy}
                    />
                </div>
            </div>
        </div>
    );
};

export default projects;
