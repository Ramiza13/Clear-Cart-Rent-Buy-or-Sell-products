package com.buy.clear_cart.controller;

import com.buy.clear_cart.entity.Product;
import com.buy.clear_cart.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.math.BigDecimal;
import java.util.List;

@Controller
public class ProductController {
    @Autowired
    private ProductService productService;

    @QueryMapping
    public List<Product> allProducts() {
        return productService.getAllProducts();
    }

    @QueryMapping
    public List<Product> myProducts(@Argument Long ownerId) {
        return productService.getProductsByOwner(ownerId);
    }

    @MutationMapping
    public Product addProduct(@Argument String name, @Argument String description,
                              @Argument List<String> categories, @Argument BigDecimal price,
                              @Argument boolean availableForRent, @Argument boolean availableForSale,
                              @Argument Long ownerId) {
        return productService.addProduct(name, description, categories, price, availableForRent, availableForSale, ownerId);
    }

    @MutationMapping
    public Product updateProduct(@Argument Long id, @Argument String name, @Argument String description,
                                 @Argument List<String> categories, @Argument BigDecimal price,
                                 @Argument Boolean availableForRent, @Argument Boolean availableForSale) {
        return productService.updateProduct(id, name, description, categories, price, availableForRent, availableForSale);
    }

    @MutationMapping
    public boolean deleteProduct(@Argument Long id) {
        return productService.deleteProduct(id);
    }

    @QueryMapping
    public Product getProductById(@Argument Long id) {
        return productService.getProductById(id);
    }
}
