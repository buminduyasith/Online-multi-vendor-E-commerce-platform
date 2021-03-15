import React, { useState,useEffect } from "react";
// import * as mui from '@material-ui/core';
import {
  Container,
  Col,
  Row,
  FormControl,
  Form,
  Button,
} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { EditorState , convertToRaw  , ContentState,convertFromRaw ,convertFromHTML} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link,useHistory } from "react-router-dom";
import { useAuth } from "../../../states/UserProvider";


function UpdateProductForm(productItem) {
  const { currentUser } = useAuth();
   const [isloading,setisloading] = useState(false);
    const history = useHistory();

  const [product, setproduct] = useState({
    sellerid: currentUser.data.seller_id,
    categoryid: "1",
    pname: "",
    pdiscription: "",
    pthumbnail: "",
    pphotos: "",
    qty: "",
    sku: "",
    price: "",
    brand: "",
    title: "",
    availability: "",
  });

    useEffect(() => {

        setproduct({...productItem.value});

     
    }, [])
  
    const [contentState, setContentState] = useState("");

    const sampleMarkup = productItem.value.pdiscription;
    const blocksFromHTML = convertFromHTML(sampleMarkup);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );


  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(state)
  );


  const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
     
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());

    setConvertedContent(currentContentAsHTML);
  };

  const handleinputs = (event) => {
    setproduct({ ...product, [event.target.name]: event.target.value });
  };

  const handlesubmit = () => {

    setisloading(true);
    product.availability = true;

    product.pdiscription = convertedContent;

    fetch("http://localhost:8082/api/v1/products", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
         Swal.fire({
                    icon: 'success',
                    title: 'Product Details update successfully!',
                    allowOutsideClick:false
                   
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                    
                      
                      history.push('/seller/dashboard')
                    } 
                  })
        console.log("Success:", data);
      })
      .catch((error) => {
        setisloading(true);
        console.error("Error:", error);
         Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                   
                  });
      });

  

   
   
    
  };

  return (
    <div>
      <Container className="mx-auto mt-3">
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="form-group-product-Ttile">
                <Form.Label>Product Title</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="title"
                  value={product.title}
                  onChange={handleinputs}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="form-group-product-pthumbnail">
                <Form.Label>Product Thumbnail Link</Form.Label>
                <Form.Control
                  type="text"
                  name="pthumbnail"
                  value={product.pthumbnail}
                  onChange={handleinputs}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="form-group-product-pphotos">
                <Form.Label>Product Photo Link</Form.Label>
                <Form.Control
                  type="text"
                  name="pphotos"
                  value={product.pphotos}
                  onChange={handleinputs}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="form-group-product-qty">
                <Form.Label>Product QTY</Form.Label>
                <Form.Control
                  type="number"
                  name="qty"
                  value={product.qty}
                  onChange={handleinputs}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="form-group-product-sku">
                <Form.Label>Product SKU</Form.Label>
                <Form.Control
                  type="text"
                  name="sku"
                  value={product.sku}
                  onChange={handleinputs}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="form-group-product-price">
                <Form.Label>Product price</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={product.price}
                  onChange={handleinputs}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="form-group-product-brand">
                <Form.Label>Product Brand</Form.Label>
                <Form.Control
                  type="text"
                  name="brand"
                  value={product.brand}
                  onChange={handleinputs}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Product Category</Form.Label>
                <Form.Control
                  as="select"
                  name="categoryid"
                  value={product.categoryid}
                  onChange={handleinputs}
                >
                  <option value="1">Laptop</option>
                  <option value="2">Desktop Workstation</option>
                  <option value="3">GAMING Workstation</option>
                  <option value="4">GRAPHIC CARDS</option>
                  <option value="5">Processors</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              {/* <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div> */}
            </Col>
          </Row>

          <Row className="mt-5 mb-5">
            <Col>
              <Button
                type="button"
                variant="primary"
                className="btncus"
                onClick={handlesubmit}
                disabled={isloading}
              >
                Add Product
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default UpdateProductForm;
