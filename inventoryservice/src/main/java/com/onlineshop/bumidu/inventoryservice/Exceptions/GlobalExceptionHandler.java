package com.onlineshop.bumidu.inventoryservice.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import javax.xml.ws.Response;
import java.util.Date;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException resourceNotFoundException, WebRequest webRequest){

        ErrorDetails errorDetails = new ErrorDetails(new Date(),resourceNotFoundException.getLocalizedMessage(),webRequest.getDescription(false));

        return new ResponseEntity(errorDetails, HttpStatus.NOT_FOUND);



    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalExceptions(Exception exception, WebRequest webRequest){

        ErrorDetails errorDetails = new ErrorDetails(new Date(),exception.getMessage(),webRequest.getDescription(false));

        return new ResponseEntity(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);



    }

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<?> handleApiException(ApiException exception, WebRequest webRequest){

        ErrorDetails errorDetails = new ErrorDetails(new Date(),exception.getMessage(),webRequest.getDescription(false));

        return new ResponseEntity(errorDetails, HttpStatus.BAD_REQUEST);



    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValideException(MethodArgumentNotValidException exception){

        ErrorDetails errorDetails = new ErrorDetails(new Date(),"valid exceptions",exception.getBindingResult().getFieldError().getDefaultMessage());

        return new ResponseEntity(errorDetails, HttpStatus.BAD_REQUEST);



    }
}
