// Cart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BooksCart from "./BookUser/BooksCart";
import Cookies from 'js-cookie';
import './cart.css';

const Cart = () => {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchBooks();
    fetchUserId();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`https://diary-be-5suy.onrender.com/books`);
      const booksWithQuantity = response.data.books.map((book) => ({
        ...book,
        quantity: 1,
        totalPrice: book.price, // Initialize totalPrice with the original price
      }));
      setBooks(booksWithQuantity);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchUserId = async () => {
    try {
      const response = await axios.get(`https://diary-be-5suy.onrender.com/users`);
      const userData = response.data;

      const filteredUser = userData.find((profile) => profile.email === Cookies.get("email"));

      if (filteredUser) {
        setUser(filteredUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const updateBookQuantity = (bookId, newQuantity) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book._id === bookId
          ? {
              ...book,
              quantity: newQuantity,
              totalPrice: book.price * newQuantity,
            }
          : book
      )
    );
  };

  const filteredBooks = books.filter((book) => book.cart === true);

  const subtotal = filteredBooks.reduce((acc, book) => acc + book.totalPrice, 0);

  const clearCartOrders = async () => {
    try {
      const putRequests = filteredBooks.map(async (book) => {
        const { _id, name, idno, description, price, stock, image, quantity } = book;

        await axios.put(`https://diary-be-5suy.onrender.com/books/${_id}`, {
          name: name,
          idno: idno,
          description: description,
          price: price,
          image: image,
          cart: false,
          stock: stock,
          available: false,
          quantity: quantity,
        });
      });

      await Promise.all(putRequests);

      console.log("Cart updated successfully!");
    } catch (error) {
      console.error("Error sending PUT requests to update cart:", error);
    }
  };

  const sendOrders = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const pastOrders = [];
    try {
      for (const book of filteredBooks) {
        const order = {
          Bookname: book.name,
          image: book.image,
          price: book.price,
          date: formattedDate,
          quantity: book.quantity,
        };

        pastOrders.push(order);
      }

      await axios.put(`https://diary-be-5suy.onrender.com/users/${user._id}`, {
        pastOrders: pastOrders,
      });

      console.log("Orders sent successfully!");
    } catch (error) {
      console.error("Error sending orders:", error);
    }
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post("https://diary-be-5suy.onrender.com/checkout", {
        items: filteredBooks,
        subtotal: subtotal.toFixed(2),
      });

      const url = response.data.url;

      window.location = url;

      sendOrders();

      clearCartOrders();
    } catch (error) {
      console.error("Error sending request to checkout:", error);
    }
  };

  const handleCheckout = () => {
    sendRequest();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <ul>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, i) => (
            <li key={i}>
              <BooksCart book={book} updateBookQuantity={updateBookQuantity} />
            </li>
          ))
        ) : (
          <p style={{ fontSize: '40px', marginTop: '10px' }}>Shop to get Products added here</p>
        )}
      </ul>
      <div>
        <p style={{ marginTop: "50px", fontSize: '1.2rem', color: 'black' }}>
          Subtotal: Rs {subtotal.toFixed(2)}
        </p>
        <button
          onClick={handleCheckout}
          style={{
            backgroundColor: '#000000',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
            fontSize: '1.2rem',
            marginTop: '10px',
          }}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
