import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
    // action.payload contains the plant object from ProductList
  const plant = action.payload;
  
  // Check if this plant already exists in cart
  const existingItem = state.items.find(item => item.name === plant.name);
  
  if (existingItem) {
    // If plant already in cart, increase quantity by 1
    existingItem.quantity += 1;
    // Update total price for this item
    // Remove $ sign, convert to number, multiply by quantity
    const price = parseFloat(plant.cost.replace('$', ''));
    existingItem.totalPrice = `$${(price * existingItem.quantity).toFixed(2)}`;
  } else {
    // If new plant, add to cart with quantity 1
    const price = parseFloat(plant.cost.replace('$', ''));
    state.items.push({
      ...plant,           // Copy all plant properties
      quantity: 1,        // Add quantity property
      totalPrice: plant.cost  // Total price for this item (same as cost for quantity 1)
    });
  }
    },
    removeItem: (state, action) => {
        // action.payload should contain the plant name to remove
      const plantName = action.payload;
  
     // Filter out the item that matches the name
     state.items = state.items.filter(item => item.name !== plantName);
    },
    updateQuantity: (state, action) => {
    // Extract name and amount from the action payload
  const { name, amount } = action.payload;
  
  // Find the item in the cart that matches the name
  const item = state.items.find(item => item.name === name);
  
  // If item is found, update its quantity
  if (item) {
    // Update quantity to the new amount
    item.quantity = amount;
    
    // Recalculate total price for this item
    const price = parseFloat(item.cost.replace('$', ''));
    item.totalPrice = `$${(price * amount).toFixed(2)}`;
  }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
