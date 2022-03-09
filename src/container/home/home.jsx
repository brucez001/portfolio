import React from "react";

import "./home.scss";
import { Button, Card } from "react-bootstrap";
import { blueIcons } from "../../constants";

const home = () => {
    return (
        <div id="home">
            <div className="content left">
                <div className="intro">
                    <div className="hello">
                        <p className="hello-text">
                            Hello, I'm
                            <div className="line">
                                <img src={blueIcons.line} alt="------" />
                            </div>
                        </p>
                    </div>

                    <h1 className="name">Bruce Zhu</h1>
                    <p className="intro-text">Software Engineering Student</p>
                    <div className="media">
                        <a href="">
                            <img src={blueIcons.github} alt="github_link" />
                        </a>
                        <a href="">
                            <img src={blueIcons.linkedin} alt="linkedin_link" />
                        </a>
                    </div>
                </div>
                <div className="button">
                    <Button variant="primary">Download CV</Button>
                </div>
            </div>

            <div className="content right">
                <div className="hero-card">
                    <div className="text">
                        <pre>
                            1 class <b>Person</b> {"{"}
                        </pre>
                        <pre>2 &nbsp;&nbsp;constructor() {"{"}</pre>

                        <pre>
                            3 &nbsp;&nbsp;&nbsp;&nbsp;this.preferredName = "
                            <b>Bruce Zhu</b>";
                        </pre>
                        <pre>
                            4 &nbsp;&nbsp;&nbsp;&nbsp;this.officialName = “
                            <b>Yicong Zhu</b>”;
                        </pre>
                        <pre>
                            5 &nbsp;&nbsp;&nbsp;&nbsp;this.traits = ["
                            <b>Dev</b>", “<b>Programming</b>”];
                        </pre>
                        <pre>6 &nbsp;&nbsp;{"}"}</pre>
                        <pre>7 {"}"}</pre>
                    </div>
                </div>
            </div>

            <img className="waves" src={blueIcons.waves} alt="waves" />
        </div>
    );
};

export default home;
