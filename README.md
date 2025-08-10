# ClearCart

ClearCart is a web application for renting, buying, and selling products across categories like Electronics, Furniture, Home Appliances, Sporting Goods, Outdoor, and Toys.

The solution is built with:

- **Frontend:** React, Apollo Client, Mantine UI  
- **Backend:** Spring Boot (v3.4+), GraphQL  
- **Database:** PostgreSQL  

---

## Setup & Run Instructions

### Prerequisites

- Java 17 or higher  
- Maven  
- PostgreSQL  
- Node.js and npm  

### Backend

Create a PostgreSQL database named `clearcart` and update the database credentials in `src/main/resources/application.properties` to match your local setup.

The backend GraphQL API will be available at [http://localhost:8089/graphiql?path=/graphql](http://localhost:8089/graphql).

To run the backend server, execute:

mvn spring-boot:run


### Frontend

The frontend app will run at [http://localhost:3000](http://localhost:3000).

To get started, navigate to the frontend directory:
cd clear-cart-app

Install the required dependencies:
npm install

Then start the development server:
npm start
