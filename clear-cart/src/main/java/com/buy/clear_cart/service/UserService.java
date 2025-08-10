package com.buy.clear_cart.service;

import com.buy.clear_cart.entity.Users;
import com.buy.clear_cart.helper.ExceptionHelper;
import com.buy.clear_cart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    public Users getUserById(Long userid) {

        Users user = userRepository.findById(userid).orElseThrow(ExceptionHelper::throwUserNotFoundException);

        return user;
    }

    public Users registerUser(String username, String password, String email, String fullName, String phone) {

//        return userRepository.save(user);
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }

        System.out.println("Registering user: " + username);
        Users user = new Users();
        user.setUsername(username);
        user.setPassword(password); // again: hash it in real use
        user.setEmail(email);
        user.setFullName(fullName);
        user.setPhone(phone);
        System.out.println("Saved user ID: " + user.getId());
        /*user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());*/

        return userRepository.save(user);
    }

    public Users updateUser(Users user) {
        return null;
    }

    /*@Override
    public User deleteUser(User user) {
        return null;
    }*/

    public boolean deleteUser(Long id) {
        Users user = userRepository.findById(id).orElseThrow(ExceptionHelper::throwUserNotFoundException);

        userRepository.delete(user);
        return true;
    }

    public Users login(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password)
                .orElseThrow(ExceptionHelper::throwInvalidCredentialsException);
    }
}
