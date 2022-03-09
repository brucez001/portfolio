import React from "react";

import "./skills.scss";
import { blueIcons } from "../../constants";

const skills = () => {
    return (
        <div id="skill">
            <h1 id="skillset">My Skillsets</h1>
            <div className="row">
                <div className="col languages-box">
                    <div className="java">
                        <img src={blueIcons.java} alt="" />
                    </div>
                    <div className="c">
                        <img src={blueIcons.c} alt="" />
                    </div>

                    <h2 className="skill-text languages-text">LANGUAGES</h2>
                    <div className="python">
                        <img src={blueIcons.python} alt="" />
                    </div>
                    <div className="matlab">
                        <img src={blueIcons.matlab} alt="" />
                    </div>
                    <div className="javascript">
                        <img src={blueIcons.javascript} alt="" />
                    </div>
                </div>
                <div className="col development-box">
                    <div className="flutter">
                        <img src={blueIcons.flutter} alt="" />
                    </div>
                    <div className="html5">
                        <img src={blueIcons.html5} alt="" />
                    </div>
                    <div className="react">
                        <img src={blueIcons.react} alt="" />
                    </div>

                    <h2 className="skill-text development-text">DEVELOPMENT</h2>
                    <div className="nodejs">
                        <img src={blueIcons.nodejs} alt="" />
                    </div>
                    <div className="css3">
                        <img src={blueIcons.css3} alt="" />
                    </div>
                    <div className="express">
                        <img src={blueIcons.expressjs} alt="" />
                    </div>
                    <div className="mongodb">
                        <img src={blueIcons.mongodb} alt="" />
                    </div>
                    <div className="mysql">
                        <img src={blueIcons.mysql} alt="" />
                    </div>

                    <div className="postgresql">
                        <img src={blueIcons.postgresql} alt="" />
                    </div>

                    <div className="bootstrap">
                        <img src={blueIcons.bootstrap} alt="" />
                    </div>
                </div>

                <div className="col tools-box">
                    <div className="jupyter">
                        <img src={blueIcons.jupyter} alt="" />
                    </div>
                    <div className="figma">
                        <img src={blueIcons.figma} alt="" />
                    </div>

                    <h2 className="skill-text tools-text">TOOLS</h2>
                    <div className="vs">
                        <img src={blueIcons.visualstudio} alt="" />
                    </div>
                    <div className="intellij">
                        <img src={blueIcons.intellij} alt="" />
                    </div>
                    <div className="xd">
                        <img src={blueIcons.xd} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default skills;
