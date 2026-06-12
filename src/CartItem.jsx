import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {

 // Calculate total by summing up each item's total price
 const total = cart.reduce((sum, item) => {
    // Extract numeric value from item.totalPrice (e.g., "$15.00" -> 15)
    const itemTotal = parseFloat(item.totalPrice.replace('$', ''));
    return sum + itemTotal;
  }, 0);
  
  return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
   // Call the onContinueShopping function passed from parent component (ProductList)
  onContinueShopping(e);
  };



  const handleIncrement = (item) => {
   // Calculate new quantity (current + 1)
  const newQuantity = item.quantity + 1;
  
  // Dispatch updateQuantity action to Redux
  dispatch(updateQuantity({
    name: item.name,
    amount: newQuantity
  })); 
  };

  const handleDecrement = (item) => {
   // Check if current quantity is greater than 1
  if (item.quantity > 1) {
    // Decrease quantity by 1
    const newQuantity = item.quantity - 1;
    dispatch(updateQuantity({
      name: item.name,
      amount: newQuantity
    }));
  } else {
    // If quantity would become 0, remove item from cart entirely
    dispatch(removeItem(item.name));
  }
  };

  const handleRemove = (item) => {
    // Dispatch removeItem action with the plant name
  dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
     // Extract numeric value from item.cost (e.g., "$15" -> 15)
  const unitPrice = parseFloat(item.cost.replace('$', ''));
  // Multiply by quantity
  const total = unitPrice * item.quantity;
  // Return formatted to 2 decimal places
  return total.toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


