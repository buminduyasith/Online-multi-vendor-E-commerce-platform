import React, { useState } from "react";
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
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../../states/UserProvider";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import Swal from 'sweetalert2'

const schema = yup.object().shape({
  title: yup.string().required("title required").min(10),
  qty: yup.number().required("Qty is required").min(1),
  pthumbnail:yup.string().required("Thumbnail link is required"),
  pphotos:yup.string().required("Photo link is required"),
  price:yup.number().required("Price is required").min(100),
  brand:yup.string().required("Brand is required"),
  categoryid:yup.string().required("Categoryid is required"),
  sku:yup.string().required("SKU is required")
  

});



function AddProductFrom() {
  const { currentUser } = useAuth();
  const[isloading,setIsloading] =useState(false);
  const {register,handleSubmit,errors,reset} = useForm({
    mode:"onBlur",
    resolver: yupResolver(schema),
  })
  alertify.set('notifier','position', 'top-center');
  
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
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

  

 // const handlesubmit = () => {
   // product.availability = true;

    //product.pdiscription = convertedContent;

   // var categoryWithIdName = product.categoryid;

    //var both = categoryWithIdName.split("-");

     

    //product.categoryid = both[0];
    //product.categoryname = both[1];

    /*fetch("http://localhost:8082/api/v1/products", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    //
    
  };*/

  const formSubmit =  (e) => {
    e.preventDefault();
    

    if(!editorState.getCurrentContent().hasText()){
      alertify.notify( "Product Discription is Required", 'error', 1);
      return;
    }
  
    handleSubmit((data) => {
      
      data ={...data,
        sellerid: currentUser.data.seller_id,
        availability:true,
        pdiscription:convertedContent
      }

      console.log(data);
     setIsloading(true);
       if(errors){

        fetch("http://localhost:8082/api/v1/products", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${currentUser?.authorizationjwtket}` 
          },
          body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
          setIsloading(false);
          console.log("Success:", data);
          Swal.fire({
            icon: 'success',
            title: 'Product added to the list!',
            allowOutsideClick:false
           
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
            
              reset();
              setEditorState(EditorState.createEmpty());
             
              
            } 
          })
        })
        .catch((error) => {
          setIsloading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
           
          })
          console.error("Error:", {error});
        });

        
        
        
      } 

      else{
          
        setIsloading(false);
      }  
      
    })(e)
  }

  return (
    <div>
      <Container className="mx-auto mt-3">
        <Form noValidate  onSubmit={formSubmit} >
          <Row>
            <Col>
              <Form.Group controlId="form-group-product-Ttile">
                <Form.Label>Product Title</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="title"
                  ref={register}
                  isInvalid={!!errors.title}
                 
                 
                />
                 <Form.Control.Feedback type="invalid">
                {errors?.title?.message}
              </Form.Control.Feedback>
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
                  ref={register}
                  isInvalid={!!errors.pthumbnail}
                />
                <Form.Control.Feedback type="invalid">
                {errors?.pthumbnail?.message}
              </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="form-group-product-pphotos">
                <Form.Label>Product Photo Link</Form.Label>
                <Form.Control
                  type="text"
                  name="pphotos"
                  ref={register}
                  isInvalid={!!errors.pphotos}
                />
                <Form.Control.Feedback type="invalid">
                {errors?.pphotos?.message}
              </Form.Control.Feedback>
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
                  ref={register}
                  isInvalid={!!errors.qty}
                />
               <Form.Control.Feedback type="invalid">
                {errors?.qty?.message}
              </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="form-group-product-sku">
                <Form.Label>Product SKU</Form.Label>
                <Form.Control
                  type="text"
                  name="sku"
                  ref={register}
                  isInvalid={!!errors.sku}
                />
                  <Form.Control.Feedback type="invalid">
                {errors?.sku?.message}
              </Form.Control.Feedback>
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
                  ref={register}
                  isInvalid={!!errors.price}
                  />
                    <Form.Control.Feedback type="invalid">
                  {errors?.price?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="form-group-product-brand">
                <Form.Label>Product Brand</Form.Label>
                <Form.Control
                  type="text"
                  name="brand"
                  ref={register}
                  isInvalid={!!errors.brand}
                  />
                    <Form.Control.Feedback type="invalid">
                  {errors?.brand?.message}
                </Form.Control.Feedback>
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
                  ref={register}
                  isInvalid={!!errors.categoryid}
                >
                  <option value="1">Laptop</option>
                  <option value="2">Desktop Workstation</option>
                  <option value="3">GAMING Workstation</option>
                  <option value="4">GRAPHIC CARDS</option>
                  <option value="5">Processors</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors?.categoryid?.message}
                </Form.Control.Feedback>
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
                type="submit"
                variant="primary"
                className="btncus"
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

export default AddProductFrom;
