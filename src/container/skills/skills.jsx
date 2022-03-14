import React from "react";

import "./skills.scss";
import { blueIcons, originalIcons } from "../../constants";
import HoverImage from "react-hover-image";

const skills = () => {
    return (
        <div id="skills">
            <h1 id="skillset">My Skillsets</h1>
            <div className="skills-container">
                <div className="box languages-box">
                    <div className="java">
                        <HoverImage
                            src={blueIcons.java}
                            hoverSrc={originalIcons.java}
                        />
                    </div>
                    <div className="c">
                        <HoverImage
                            src={blueIcons.c}
                            hoverSrc={originalIcons.c}
                        />
                    </div>

                    <h2 className="skill-text languages-text">LANGUAGES</h2>
                    <div className="python">
                        <HoverImage
                            src={blueIcons.python}
                            hoverSrc={originalIcons.python}
                        />
                    </div>
                    <div className="matlab">
                    <HoverImage
                            src={blueIcons.matlab}
                            hoverSrc={originalIcons.matlab}
                        />
                    </div>
                    <div className="javascript">
                    <HoverImage
                            src={blueIcons.javascript}
                            hoverSrc={originalIcons.javascript}
                        />
                    </div>
                </div>
                <div className="box development-box">
                    <div className="flutter">
                    <HoverImage
                            src={blueIcons.flutter}
                            hoverSrc={originalIcons.flutter}
                        />
                    </div>
                    <div className="html5">
                    <HoverImage
                            src={blueIcons.html5}
                            hoverSrc={originalIcons.html5}
                        />
                    </div>
                    <div className="react">
                    <HoverImage
                            src={blueIcons.react}
                            hoverSrc={originalIcons.react}
                        />
                    </div>

                    <h2 className="skill-text development-text">DEVELOPMENT</h2>
                    <div className="nodejs">
                    <HoverImage
                            src={blueIcons.nodejs}
                            hoverSrc={originalIcons.nodejs}
                        />
                    </div>
                    <div className="css3">
                    <HoverImage
                            src={blueIcons.css3}
                            hoverSrc={originalIcons.css3}
                        />
                    </div>
                    <div className="express">
                    <HoverImage
                            src={blueIcons.expressjs}
                            hoverSrc={originalIcons.express}
                        />
                    </div>
                    <div className="mongodb">
                    <HoverImage
                            src={blueIcons.mongodb}
                            hoverSrc={originalIcons.mongodb}
                        />
                    </div>
                    <div className="mysql">
                    <HoverImage
                            src={blueIcons.mysql}
                            hoverSrc={originalIcons.mysql}
                        />
                    </div>

                    <div className="postgresql">
                    <HoverImage
                            src={blueIcons.postgresql}
                            hoverSrc={originalIcons.postgresql}
                        />
                    </div>

                    <div className="bootstrap">
                    <HoverImage
                            src={blueIcons.bootstrap}
                            hoverSrc={originalIcons.bootstrap}
                        />
                    </div>
                </div>

                <div className="box tools-box">
                    <div className="jupyter">
                    <HoverImage
                            src={blueIcons.jupyter}
                            hoverSrc={originalIcons.jupyter}
                        />                    </div>
                    <div className="figma">
                    <HoverImage
                            src={blueIcons.figma}
                            hoverSrc={originalIcons.figma}
                        />                    </div>

                    <h2 className="skill-text tools-text">TOOLS</h2>
                    <div className="vs">

                    <HoverImage
                            src={blueIcons.visualstudio}
                            hoverSrc={originalIcons.visualstudio}
                        />                    </div>
                    <div className="intellij">
                    <HoverImage
                            src={blueIcons.intellij}
                            hoverSrc={originalIcons.intellij}
                        />
                    </div>
                    <div className="xd">
                    <HoverImage
                            src={blueIcons.xd}
                            hoverSrc={originalIcons.xd}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default skills;
