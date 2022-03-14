import React from 'react'

import './Footer.scss'
import { images } from "../../constants";

const Footer = () => {
  return (
    <div id="footer">
        <div className="footer-container">
            <img src={images.logo} alt="" />
            <p>Made with love by Bruce</p>
        </div>
    </div>
  )
}

export default Footer