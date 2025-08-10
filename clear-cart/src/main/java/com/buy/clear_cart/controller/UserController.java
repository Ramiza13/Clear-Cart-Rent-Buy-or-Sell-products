package com.buy.clear_cart.controller;

import com.buy.clear_cart.entity.Users;
import com.buy.clear_cart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @QueryMapping
    public Users login(@Argument String username, @Argument String password) {
        return userService.login(username, password);
    }

    @MutationMapping
    public Users registerUser(@Argument String username, @Argument String password, @Argument String email, @Argument String fullName, @Argument String phone) {
        return userService.registerUser(username, password, email, fullName, phone);
    }

    @QueryMapping
    public List<Users> getAllUsers(){
        return userService.getAllUsers();
    }

    @QueryMapping
    public Users getUserById(@Argument Long userId){
        return userService.getUserById(userId);
    }
}
