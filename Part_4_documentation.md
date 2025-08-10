# Part 4 Documentation

## 1. Project Summary

ClearCart is a web application for renting, buying, and selling products across categories like Electronics, Furniture, Home Appliances, Sporting Goods, Outdoor, and Toys.

The solution is built with:

- **Frontend:** React, Apollo Client, Mantine UI  
- **Backend:** Spring Boot (v3.4+), GraphQL  
- **Database:** PostgreSQL

This documentation describes the features implemented, the technical approach, and the remaining work required to complete the challenge.

## 2. Implemented Features

### Part 1 – Preliminary Features

- **User Registration**  
  Implemented with Mantine forms in the frontend, capturing basic user details.  
  Data sent to backend via GraphQL mutation and stored in PostgreSQL.

- **Login**  
  Implemented with simple string matching for authentication (no hashing or security layer, per challenge instructions).

### Part 2 – Product CRUD

- **Add Product**  
  Multi-page form matching wireframe requirement (user can navigate back and forth before submission).  
  Product stored in DB via GraphQL mutation.

- **Edit Product**  
  Allows updating existing product details.

- **Delete Product**  
  Removes product from database and updates Apollo cache to maintain UI consistency.

- **Categories**  
  Category model implemented (ELECTRONICS, FURNITURE, HOME APPLIANCES, SPORTING GOODS, OUTDOOR, TOYS).  
  Products can be assigned one or more categories (many-to-many relationship in DB).

## 3. Technical Implementation

### Frontend

- Framework: React with Apollo Client.  
- State & Cache: Apollo InMemoryCache for data persistence and UI sync.  
- Forms: Mantine forms for registration, login, and product creation/editing.  
- Routing: React Router for page navigation.  
- UI: Mantine components (styling partially incomplete due to time constraints).  
- Cache Updates: Products removed from DB are also removed from Apollo cache.

### Backend

- Framework: Spring Boot 3.4+.  
- API: GraphQL with schema definition for User, Product, and Category types.  
- Persistence: JPA for database mapping, PostgreSQL for storage.  
- Resolvers:  
  - Query resolvers for fetching products and categories.  
  - Mutation resolvers for adding, editing, and deleting products, as well as registering and logging in users.  
- Database Relationships:  
  - User ↔ Product: One-to-many (user can have multiple products).  
  - Product ↔ Category: Many-to-many (product can belong to multiple categories).

## 4. Remaining Features (Parts 3 & UI Improvements)

### Part 3 – Rent & Buy/Sell

- List all products from all users.  
- Implement product purchase flow:  
  - Status change from "Available" to "Sold".  
- Implement product rental flow:  
  - Status change from "Available" to "Rented".  
  - Handle rental time overlaps.  
- Display dashboard for user’s bought, sold, borrowed, and lent products.

### UI & Styling

- Improve form alignment and spacing for a polished UI.  
- Add proper navigation and visual feedback for actions (success/failure notifications).  
- Responsive design for mobile/tablet screens.

## 5. Corner Cases & Future Enhancements

- **Rent Time Overlap:** Implement validation to prevent double-booking.  
- **Authentication & Security:** Use hashed passwords and JWT tokens for secure login.  
- **Error Handling:** Provide user-friendly messages for failed network calls or validation errors.  
- **Testing:** Add unit tests for services, integration tests for GraphQL resolvers, and Cypress tests for frontend flows.