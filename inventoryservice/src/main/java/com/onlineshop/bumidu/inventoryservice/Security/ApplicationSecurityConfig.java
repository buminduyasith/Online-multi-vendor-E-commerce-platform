package com.onlineshop.bumidu.inventoryservice.Security;

import com.onlineshop.bumidu.inventoryservice.Jwt.JwtTokenVerifier;
import com.onlineshop.bumidu.inventoryservice.Jwt.JwtUsernameandPasswordAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;



@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {


    @Override
    protected void configure(HttpSecurity http) throws Exception {

      /*  http
                .authorizeRequests()
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();*/

        http
                .csrf().disable()
              .cors().configurationSource(corsConfigurationSource()).and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .addFilter(new JwtUsernameandPasswordAuthenticationFilter(authenticationManager()))
                .addFilterAfter(new JwtTokenVerifier(), JwtUsernameandPasswordAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers(HttpMethod.POST,"/api/v1/products").hasAuthority("SELLER")
                .antMatchers(HttpMethod.DELETE,"/api/v1/products/**").hasAuthority("SELLER")
                .antMatchers(HttpMethod.POST,"/api/v1/test").hasAuthority("SELLER")
                .antMatchers("/","/api/v1/products/**","/api/v1/category/**").permitAll()
                .anyRequest()
                .authenticated();


    }




    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // configuration.addAllowedOriginPattern("http://localhost:8080/");
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET,POST,DELETE,PUT,OPTIONS"));
        //  configuration.setAllowCredentials(true);

        //the below three lines will add the relevant CORS response headers
        configuration.addAllowedOrigin("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");


        // configuration.setAllowedOrigins("*");

        configuration.addExposedHeader("Authorization");




        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
