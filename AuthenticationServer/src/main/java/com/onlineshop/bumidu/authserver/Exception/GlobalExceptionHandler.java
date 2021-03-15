package com.onlineshop.bumidu.authserver.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@ControllerAdvice
public class GlobalExceptionHandler {



    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalExceptions(Exception exception, WebRequest webRequest){

        ErrorDetails errorDetails = new ErrorDetails(new Date(),exception.getMessage(),webRequest.getDescription(false));

        return new ResponseEntity(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);



    }

    @ExceptionHandler(EmailAlreadyexsistException.class)
    public ResponseEntity<?> handleApiException(EmailAlreadyexsistException exception, WebRequest webRequest){

        ErrorDetails errorDetails = new ErrorDetails(new Date(),exception.getMessage(),webRequest.getDescription(false));

        return new ResponseEntity(errorDetails, HttpStatus.CONFLICT);



    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValideException(MethodArgumentNotValidException exception){

        ErrorDetails errorDetails = new ErrorDetails(new Date(),"valid exceptions",exception.getBindingResult().getFieldError().getDefaultMessage());

        return new ResponseEntity(errorDetails, HttpStatus.BAD_REQUEST);



    }
}
