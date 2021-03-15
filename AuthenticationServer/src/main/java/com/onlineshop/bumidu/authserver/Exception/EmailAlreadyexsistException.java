package com.onlineshop.bumidu.authserver.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class EmailAlreadyexsistException extends RuntimeException{

    public EmailAlreadyexsistException(String message) {
        super(message);
    }
}
