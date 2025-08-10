package com.buy.clear_cart.repository;

import com.buy.clear_cart.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByOwnerId(Long ownerId);
}
