import React from "react";

import "./contact.scss";

import { blueIcons, originalIcons } from "../../constants";
import { Form, Button, Container } from "react-bootstrap";

const contact = () => {
    return (
        <div id="contact">
            <div className="edge">
                <h1>Get in touch</h1>
                <div className="images">
                    <div className="contact-computer">
                        <img src={originalIcons.computer} alt="" />
                    </div>
                    <div className="media">
                        <div className="email">
                            <img src={blueIcons.email} alt="" />
                        </div>
                        <div className="facebook">
                            <img src={blueIcons.facebook} alt="" />
                        </div>
                        <div className="instagram">
                            <img src={blueIcons.instagram} alt="" />
                        </div>
                        <div className="wechat">
                            <img src={blueIcons.wechat} alt="" />
                        </div>
                        <div className="linkedin2">
                            <img src={blueIcons.linkedin2} alt="" />
                        </div>
                        <div className="github2">
                            <img src={blueIcons.github2} alt="" />
                        </div>
                    </div>
                </div>

                <div className="contact-form">
                    <Form>
                        <Container>
                            <Form.Group
                                className="email-field mb-4 col-6"
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
                                className="name-field col-5 offset-1"
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
