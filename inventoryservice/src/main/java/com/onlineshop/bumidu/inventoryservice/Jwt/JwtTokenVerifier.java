package com.onlineshop.bumidu.inventoryservice.Jwt;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import com.google.common.base.Strings;

public class JwtTokenVerifier extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization");

        if(Strings.isNullOrEmpty(authorizationHeader) || !authorizationHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
        }

        else{
            try{
                String token = authorizationHeader.replace("Bearer ","");
                String skey = "securesecuresecuresecuresecuresecure";

//            Jws<Claims> claimsJws =  Jwts.parser()
//                    .setSigningKey(Keys.hmacShaKeyFor(skey.getBytes()))
//                    .parseClaimsJws(token);

                Jws<Claims> claimsJws =  Jwts.parserBuilder()
                        .setSigningKey(Keys.hmacShaKeyFor(skey.getBytes()))
                        .build().parseClaimsJws(token);

                Claims body =  claimsJws.getBody();

                String username = body.getSubject();

                List<Map<String, String>> authorities = (List<Map<String, String>>) body.get("authorities");


                List<SimpleGrantedAuthority> simpleGrantedAuthorities = authorities.stream()
                        .map(m -> new SimpleGrantedAuthority(m.get("authority")))
                        .collect(Collectors.toList());


                Authentication authentication = new UsernamePasswordAuthenticationToken(
                        username,
                        null,
                        simpleGrantedAuthorities

                );

                SecurityContextHolder.getContext().setAuthentication(authentication);



            }catch (JwtException ex){
                throw  new IllegalStateException("token cannot be trusted");
            }

            filterChain.doFilter(request,response);
        }




    }
}
