import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import './BookCart.css';

const BooksCart = (props) => {
  const { _id, name, idno, description, stock, price, image, cart, quantity, totalPrice } = props.book;

  const [isInCart, setIsInCart] = useState(cart);
  const [updatedQuantity, setUpdatedQuantity] = useState(quantity);
  const [updatedTotalPrice, setUpdatedTotalPrice] = useState(totalPrice);

  const handleButtonClick = () => {
    setIsInCart(false);
    sendRequest();
  };

  const sendRequest = async () => {
    await axios.put(`https://diary-be-5suy.onrender.com/books/${_id}`, {
      name: String(name),
      id: String(idno),
      description: String(description),
      price: Number(price),
      image: String(image),
      cart: false,
      stock: Number(stock),
      available: true,
      quantity: updatedQuantity,
    });

    // Update the book quantity in the parent component
    props.updateBookQuantity(_id, updatedQuantity);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setUpdatedQuantity(newQuantity >= 1 && newQuantity <= stock ? newQuantity : 1);

    // Calculate the updated total price based on the new quantity
    setUpdatedTotalPrice(newQuantity * price);

    // Update the book quantity in the parent component immediately
    props.updateBookQuantity(_id, newQuantity);
  };

  const incrementQuantity = () => {
    setUpdatedQuantity((prevQuantity) => (prevQuantity < stock ? prevQuantity + 1 : prevQuantity));
  };

  const decrementQuantity = () => {
    setUpdatedQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
  };

  return (
    <div className={`cart-card ${isInCart ? 'in-cart' : 'not-in-cart'}`}>
      <img src={image} alt={name} />

      <h3>{name}</h3>
      <p>{description}</p>
      <h4 style={{ color:'red' }} >Rs {updatedTotalPrice}</h4>
      <br></br>

      <TextField
        type="number"
        label="Quantity"
        value={updatedQuantity}
        onChange={handleQuantityChange}
        inputProps={{ min: 1, max: stock }}
        style={{ marginRight: '5px' }}
      />
     <br></br>
      <Button
        variant="contained"
        style={{ backgroundColor: 'black', color: 'white', marginBottom: '4px' ,marginRight: '10px'  }}
        onClick={handleButtonClick}
        disabled={!isInCart}
      >
        {isInCart ? 'Remove' : 'Added'}
      </Button>
    </div>
  );
};

export default BooksCart;
