import logo from './logo.svg';
import './App.css';

import AuthPage from './components/AuthPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ProductList from './components/products/ProductList';
import AddProductForm from './components/products/AddProductForm';
import Navbar from './components/layout/Navbar';

function App() {

  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/add" element={<AddProductForm />} />
      </Routes>
    </Router>
  );
}

export default App;
