import React from "react";

import "./contact.scss";

import { blueIcons, originalIcons } from "../../constants";
import { Form, Button, Container } from "react-bootstrap";
import HoverImage from "react-hover-image";

const contact = () => {
    // When the user clicks on div, open the popup
    function myFunction() {
        const popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    }
    return (
        <div id="contact">
            <h1>Get in touch</h1>
            <div className="contact-container" style={{maxWidth: '1920px', margin: 'auto'}}>
                <div className="images">
                    <div className="contact-computer">
                        <img src={originalIcons.computer} alt="" />
                    </div>
                    <div className="contact-media">
                        <div className="email">
                            <a href="mailto: brucezzhu@gmail.com">
                                <HoverImage
                                    src={blueIcons.email}
                                    hoverSrc={originalIcons.email}
                                />
                            </a>
                        </div>
                        <div className="facebook">
                            <a
                                href="https://www.facebook.com/profile.php?id=100028236881261"
                                target="_blank"
                            >
                                <HoverImage
                                    src={blueIcons.facebook}
                                    hoverSrc={originalIcons.facebook}
                                />
                            </a>
                        </div>
                        <div className="instagram">
                            <a
                                href="https://www.instagram.com/bruce_yc/"
                                target="_blank"
                            >
                                <HoverImage
                                    src={blueIcons.instagram}
                                    hoverSrc={originalIcons.instagram}
                                />
                            </a>
                        </div>
                        <div className="wechat">
                            <div class="popup" onclick={myFunction}>
                                <HoverImage
                                    src={blueIcons.wechat}
                                    hoverSrc={originalIcons.wechat}
                                />
                                <span class="popuptext" id="myPopup">
                                    A Simple Popup!
                                </span>
                            </div>
                        </div>
                        <div className="linkedin2">
                            <a
                                href="https://www.linkedin.com/in/bruce-zhu-01/"
                                target="_blank"
                            >
                                <HoverImage
                                    src={blueIcons.linkedin}
                                    hoverSrc={originalIcons.linkedin}
                                />
                            </a>
                        </div>
                        <div className="github2">
                            <a
                                href="https://github.com/Bruce-zzhu"
                                target="_blank"
                            >
                                <HoverImage
                                    src={blueIcons.github}
                                    hoverSrc={originalIcons.github}
                                />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="contact-form">
                    <Form>
                        <Container>
                            <Form.Group
                                className="email-field mb-4"
                                controlId="form.Email"
                            >
                                <Form.Label>
                                    <h4>Email</h4>
                                </Form.Label>
                                <Form.Control
                                    className=""
                                    type="email"
                                    placeholder="name@example.com"
                                    size="lg"
                                />
                            </Form.Group>

                            <Form.Group
                                className="name-field mb-4"
                                controlId="form.Name"
                            >
                                <Form.Label>
                                    <h4>Name</h4>
                                </Form.Label>
                                <Form.Control
                                    className=""
                                    type="text"
                                    placeholder="Enter name"
                                    size="lg"
                                />
                            </Form.Group>

                            <Form.Group controlId="form.Textarea">
                                <Form.Label>
                                    <h4>Message</h4>
                                </Form.Label>
                                <Form.Control as="textarea" rows={8} />
                            </Form.Group>
                            <Button
                                className="mt-5 col-3 offset-9"
                                variant="primary"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Container>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default contact;
