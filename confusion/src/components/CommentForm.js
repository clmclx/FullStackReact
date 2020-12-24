import React, { Component } from 'react';
import {Button, Col, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import {Control, Errors, LocalForm} from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.state= {
            isModalOpen: false
        }
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmitComment() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggleModal}>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen}>
                    <ModalHeader>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="Rating" md={4}>Rating</Label>
                                <Col md={8}>
                                    <Control.select model=".rating" id="rating" className="form-control"
                                                    name="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourName" md={4}>Your Name</Label>
                                <Col md={8}>
                                    <Control.text model=".lastname" id="lastname" className="form-control" name="lastname" placeholder="Last Name"
                                                  validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}/>
                                    <Errors className="text-danger" model=".lastname" show="touched"
                                            messages={{
                                                required: 'Required. ',
                                                minLength: 'Must be greater than 2 characters. ',
                                                maxLength: 'Must be 15 characters or less. '
                                            }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={4}>Comment</Label>
                                <Col md={8}>
                                    <Control.textarea model=".message" id="message" rows="12" className="form-control" name="message" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 0}}>
                                    <Button type="submit" color="primary" onClick={this.handleSubmitComment}>
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default CommentForm;