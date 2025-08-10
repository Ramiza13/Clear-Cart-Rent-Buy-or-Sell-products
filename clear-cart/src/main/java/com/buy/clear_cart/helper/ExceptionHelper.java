package com.buy.clear_cart.helper;

public class ExceptionHelper {
    public static RuntimeException throwUserNotFoundException(){
        return new RuntimeException("User not found !");
    }

    public static RuntimeException throwInvalidCredentialsException(){
        return new RuntimeException("Invalid credentials !");
    }
}
