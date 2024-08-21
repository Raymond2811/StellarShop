import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_USER, ADD_TO_CART } from "../../utils/mutations";
import { useSelector } from "react-redux";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateUser() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const navigate = useNavigate();
  const [addUser] = useMutation(ADD_USER);
  const [addToCartMutation] = useMutation(ADD_TO_CART);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
    const { data: { addUser: { token } }} = await addUser({
      variables: {...formData},
    });

    Auth.login(token);
    
    await Promise.all(cartItems.map((item) =>{
      addToCartMutation({
        variables: {
          productId: item._id,
          purchaseQuantity: item.purchaseQuantity,
        },
      })
    }));

    navigate('/profile');
    
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });

    } catch (error) {
     console.error('Error creating user:', error.message);
    }
  }
  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit">Create Account</button>
      </form>
    </div>

  );
};