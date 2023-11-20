import React, { useState } from 'react'
import { TextField, FormLabel, Button,  Checkbox, FormControlLabel, } from '@mui/material'; 
import { Box } from "@mui/system";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const history = useNavigate();
    const[input,setInput] = useState({
        name:"",
        idno:"",
        description:"",
        price:"",
        image:"",
        stock:""
    });
    const [checked, setChecked] = useState(false);
    const handleChange = (e) => {
        setInput((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
      const sendRequest = async () => {
        await axios
          .post("https://diary-be-5suy.onrender.com/books", {
            name: String(input.name),
            idno: Number(input.idno),
            description: String(input.description),
            price: Number(input.price),
            image: String(input.image),
            cart: false,
            stock:Number(input.stock),
            available: Boolean(checked),
          })
          .then((res) => res.data);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input, checked);
        sendRequest().then(() => history("/books"));
      };

  return (
    <form onSubmit={handleSubmit}>
          <Box
        display="flex"
        flexDirection="column"
        justifyContent={"center"}
        maxWidth={700}
        alignContent={"center"}
        alignSelf="center"
        marginLeft={"auto"}
        marginRight="auto"
        marginTop={10}          
                              >
              <FormLabel>Product Name</FormLabel>
              <TextField value={input.name} onChange={handleChange} margin="normal" fullWidth variant='outlined' name="name" />

              <FormLabel>Id</FormLabel>
              <TextField value={input.idno} onChange={handleChange} margin="normal" fullWidth variant='outlined' name="idno" />

              <FormLabel>Description</FormLabel>
              <TextField value={input.description} onChange={handleChange} margin="normal" fullWidth variant='outlined' name="description" />

              <FormLabel>Price</FormLabel>
              <TextField value={input.price} onChange={handleChange} type="number" margin="normal" fullWidth variant='outlined' name="price" />
          
              <FormLabel>Stock</FormLabel>
              <TextField value={input.stock} onChange={handleChange} type="number" margin="normal" fullWidth variant='outlined' name="stock" />
              <FormLabel>Image</FormLabel>
              <TextField value={input.image} onChange={handleChange} margin="normal" fullWidth variant='outlined' name="image" />
            
              <FormControlLabel
                  control={
                      <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
                  }
                  label="Available"
              />
          <Button type="submit"
          variant='contained'
          style={{ backgroundColor: 'black', color: 'white' }}
          >Add Product</Button>
          </Box>
    </form>
  )
}

export default AddBook;
