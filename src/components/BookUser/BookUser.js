import React, { useState } from 'react';
import { Button, Card, CardContent, CardMedia, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './BookUser.css';

const BookUser = (props) => {
  const { _id, name, idno, description, price, stock, available, image } = props.book;
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity >= 1 && newQuantity <= stock ? newQuantity : 1);
  };

  // Function to add to cart button click event
  const handleButtonClick = async () => {
    if (Cookies.get('isLoggedIn') === 'true') {
      await sendRequest();
      window.location.reload();
    } else {
      navigate('/login');
    }
  };

  const sendRequest = async () => {
    await axios
      .put(`https://diary-be-5suy.onrender.com/books/${_id}`, {
        name: String(name),
        idno: Number(idno),
        description: String(description),
        price: Number(price),
        image: String(image),
        cart: true,
        stock: Number(stock),
        available: Boolean(false),
        quantity: quantity,
      })
      .then((res) => res.data);
  };

  // Calculate total price based on quantity
  const totalPrice = price * quantity;

  return (
    <Card className="book-user-card">
      <CardMedia component="img" alt={name} height="200" image={image} />
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body2">{description}</Typography>
        <Typography variant="h6">Rs {totalPrice}</Typography>
        
        
        
      </CardContent>
      <Button
        className="book-user-button"
        disabled={!available}
        variant="contained"
        color="success"
        onClick={handleButtonClick}
      >
        Add to cart
      </Button>
    </Card>
  );
};

export default BookUser;
