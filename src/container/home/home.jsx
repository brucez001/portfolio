import React from 'react';

import './home.scss';
import { Button } from 'react-bootstrap';
import { blueIcons } from '../../constants';


const home = () => {
  return (
    <div id="home">
      <div className="home-container" style={{maxWidth: '1920px', margin: 'auto'}}>
        <div className="content left">
          <div className="hello">
            <p className="hello-text">Hello, I'm</p>

            <img className="line" src={blueIcons.line} alt="------" />
          </div>

          <h1 className="name">Bruce Zhu</h1>
          <p className="intro-text">Software Engineering Student</p>

          <div className="home-media">
            <a href="https://github.com/Bruce-zzhu" target="_blank">
              <img className="github" src={blueIcons.github} alt="" />
            </a>

            <a href="https://www.linkedin.com/in/bruce-zhu-01/" target="_blank">
              <img className="linkedin" src={blueIcons.linkedin} alt="" />
            </a>
          </div>
          <div className="button">
            {/* <Button href={cv} target="_blank"> */}
            <Button>
              Download CV
            </Button>
          </div>
        </div>
        <div className="content right">
          <div className="hero-card">
            <div className="text">
              <pre>
                1 class <b>Person</b> {'{'}
              </pre>
              <pre>2 &nbsp;&nbsp;constructor() {'{'}</pre>

              <pre>
                3 &nbsp;&nbsp;&nbsp;&nbsp;this.preferredName = "<b>Bruce Zhu</b>";
              </pre>
              <pre>
                4 &nbsp;&nbsp;&nbsp;&nbsp;this.officialName = “<b>Yicong Zhu</b>”;
              </pre>
              <pre>
                5 &nbsp;&nbsp;&nbsp;&nbsp;this.traits = ["
                <b>Dev</b>", “<b>Programming</b>”];
              </pre>
              <pre>6 &nbsp;&nbsp;{'}'}</pre>
              <pre>7 {'}'}</pre>
            </div>
          </div>
        </div>
      </div>
      <img className="waves" src={blueIcons.waves} alt="waves" />
    </div>
  );
};

export default home;
