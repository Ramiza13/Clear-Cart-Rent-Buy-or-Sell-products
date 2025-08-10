package com.buy.clear_cart.service;

import com.buy.clear_cart.entity.Product;
import com.buy.clear_cart.entity.Users;
import com.buy.clear_cart.repository.ProductRepository;
import com.buy.clear_cart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsByOwner(Long ownerId) {
        return productRepository.findByOwnerId(ownerId);
    }

    public Product addProduct(String name, String description, List<String> categories,
                              BigDecimal price, boolean availableForRent,
                              boolean availableForSale, Long ownerId) {

        Users owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        Product p = new Product();
        p.setName(name);
        p.setDescription(description);
        p.setCategories(categories);
        p.setPrice(price);
        p.setAvailableForRent(availableForRent);
        p.setAvailableForSale(availableForSale);
        p.setOwner(owner);

        return productRepository.save(p);
    }

    public Product updateProduct(Long id, String name, String description, List<String> categories,
                                 BigDecimal price, Boolean availableForRent, Boolean availableForSale) {

        Product p = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (name != null) p.setName(name);
        if (description != null) p.setDescription(description);
        if (categories != null) p.setCategories(categories);
        if (price != null) p.setPrice(price);
        if (availableForRent != null) p.setAvailableForRent(availableForRent);
        if (availableForSale != null) p.setAvailableForSale(availableForSale);

        return productRepository.save(p);
    }

    public boolean deleteProduct(Long id) {
        if (!productRepository.existsById(id)) return false;
        productRepository.deleteById(id);
        return true;
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }
}
