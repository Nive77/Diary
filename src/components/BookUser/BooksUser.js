import React, { useEffect, useState } from 'react';

import axios from 'axios';
import BookUser from "./BookUser";
import "./book.css";

const URL = "https://diary-be-5suy.onrender.com/books";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
}

const BooksUser = (props) => {
    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetchHandler().then((data) => setBooks(data.books));
    }, []);

    // Filter books based on selectedCategory (idno)
    const filteredBooks = selectedCategory
        ? books.filter((book) => book.idno === selectedCategory)
        : books;

    // Function to change the selected category
    const changeCategory = (idno) => {
        setSelectedCategory(idno);
    };

    return (
        <div>
            <div className="category-buttons">
                <button onClick={() => changeCategory(null)}>All</button>
                <button onClick={() => changeCategory(1)}>Milk</button>
                <button onClick={() => changeCategory(2)}>Curd</button>
                <button onClick={() => changeCategory(3)}>Paneer</button>
                <button onClick={() => changeCategory(4)}>Ghee</button>
                {/* Add more buttons for other categories if needed */}
            </div>
            <ul>
                {filteredBooks.map((book, i) => (
                    <li key={i}>
                        <BookUser book={book} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BooksUser;
