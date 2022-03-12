import React from "react";

import "./ProjectCard.scss";
import { Button } from "react-bootstrap";
import { originalIcons } from "../../constants";



const ProjectCard = ({ title, imageUrl, body, demoUrl, githubUrl, icons }) => {
    return (
        <div className="card-container">
            <div className="text-container">
                <div className="content">
                    <div className="text">
                        <h4>{title}</h4>
                        <p>{body}</p>
                    </div>

                    <div className="bottom">
                        <div className="links">
                        <Button onClick={() => window.open(demoUrl)}>Demo</Button>
                        <div className="github">
                            <a href={githubUrl} target="_blank">
                                <img src={originalIcons.github} alt="" />
                            </a>
                        </div>
                        </div>
                        
                        <div className="icons">
                            {icons.map(icon => (
                                <img src={icon} alt="" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="image-container">
                <img src={imageUrl} alt="" />
            </div>
        </div>
    );
};

export default ProjectCard;
