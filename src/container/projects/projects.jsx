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
    const diabetes = [
        originalIcons.mongodb2,
        originalIcons.nodejs,
        originalIcons.express,
        originalIcons.css3,
    ];
    const candy = [
        originalIcons.figma,
        originalIcons.html5,
        originalIcons.css3,
        originalIcons.javascript,
    ];
    const nutrition = [
        originalIcons.python
    ];
    const loan = [
        originalIcons.react,
        originalIcons.bootstrap,
        originalIcons.express,
        originalIcons.mongodb
    ]

    const forest = [
        originalIcons.csharp,
        originalIcons.unity
    ]

    return (
        <div id="projects">
            <h1>Side Projects</h1>

            <img className="bg e1" src={images.ellipse1} alt="" />
            <img className="bg e2" src={images.ellipse2} alt="" />
            <img className="bg e3" src={images.ellipse2} alt="" />

            <div className="projects-container">
                <div className="project-card">
                    <ProjectCard
                        title="Personal Loan Register"
                        imageUrl={images.loan_register}
                        body="Loan Register is an app that is designed to improve people's loaning experience, making the process of loaning out and borrowing items simpler and easier than ever before."
                        demoUrl="/"
                        githubUrl="https://github.com/Bruce-zzhu/Loan-Register"
                        icons={loan}
                    />
                </div>
                <div className="project-card">
                    <ProjectCard
                        title="Diabetes at Home"
                        imageUrl={images.diabetes}
                        body="The app endeavours to simplify and habituate the oftentimes tedious task of keeping track of one's own health data, while also offering client-patient communication features for people with Diabetes."
                        demoUrl="https://diabetes-at-home-xd.herokuapp.com/"
                        githubUrl="https://github.com/Bruce-zzhu/Diabetes-at-Home"
                        icons={diabetes}
                    />
                </div>
                <div className="project-card">
                    <ProjectCard
                        title="Save: The Forest"
                        imageUrl={images.forest}
                        body="The game Save: The Forest is a 2.5D Adventure game made in Unity. The player would need to control the warrior, Fox, to take on a journey of reviving the forest by crossing through obstacles, defeating enemies and finally collecting the elements including Wood, Water and Soil at the end of each level."
                        demoUrl="https://www.youtube.com/watch?v=wKx-X8AGKSk&t=5s&ab_channel=YuArthur"
                        githubUrl="https://github.com/Bruce-zzhu/Save-The-Forest"
                        icons={forest}
                    />
                </div>
                <div className="project-card">
                    <ProjectCard
                        title="Nutrition Expert"
                        imageUrl={images.nutrition}
                        body="Nutrition Expert is an interactive 2-d game, aimming to provide an opportunity for people to learn the knowledge about food & nutrition while playing a FUN game"
                        demoUrl="https://www.youtube.com/watch?v=1K1vJ4ttd60&ab_channel=BruceZhu"
                        githubUrl="https://github.com/Bruce-zzhu/Nutrition-Expert"
                        icons={nutrition}
                    />
                </div>
            </div>
        </div>
    );
};

export default projects;
