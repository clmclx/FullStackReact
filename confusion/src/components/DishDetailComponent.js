import React from 'react';
import {
    Card,
    CardImg,
    CardBody,
    CardText,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Modal,
    Row,
    Label, Col, ModalHeader, ModalBody
} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, Errors, LocalForm} from "react-redux-form";
import {Loading} from "./LoadingComponent";

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

    handleSubmitComment(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.lastname, values.message);
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggleModal}>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen}>
                    <ModalHeader>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={4}>Rating</Label>
                                <Col md={8}>
                                    <Control.select
                                        model=".rating"
                                        id="rating"
                                        className="form-control"
                                        name="rating"
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={4}>Your Name</Label>
                                <Col md={8}>
                                    <Control.text
                                        model=".lastname"
                                        id="lastname"
                                        className="form-control"
                                        name="lastname"
                                        placeholder="Last Name"
                                        validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}
                                    />
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
                                    <Button type="submit" color="primary">
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

function RenderDish( {dish} ) {
  return (
    <Card>
      <CardImg top src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments( {comments, addComment, dishId} ) {

  if (comments == null || comments.length === 0) {
    return (
      <div></div>
    );
  }

  const renderedComments = comments.map((comment) => {
    return (
      <li key={comment.id}>
        <p>{comment.comment}</p>
        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
      </li>
    );
  });

  return (
    <div>
      <h4>Comments</h4>
      <ul className="list-unstyled">
        { renderedComments }
      </ul>
      <CommentForm
          dishId={dishId}
          addComment={addComment}
      />
    </div>
  );

}

const DishDetail = (props) => {

    if (props.isLoading) {
        return (
            <div className = 'container'>
                <div className = 'row'>
                    <Loading/>
                </div>
            </div>
        )
    }

    if (props.errMess) {
        return(
            <div className = 'container'>
                <div className = 'row'>
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }

    if (props.dish != null) {
    return (
      <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
              <RenderComments
                  comments={props.comments}
                  addComment={props.addComment}
                  dishId={props.dish.id}
              />
            </div>
          </div>
      </div>
    );
  }
    else {
    return (
      <div></div>
    );
  }

}

export default DishDetail;
