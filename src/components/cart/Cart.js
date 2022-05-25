import React, { useState } from "react";

import Modal from "../ui/modal/Modal";

import styles from "./Cart.module.css";
import { useCart } from '../../store/CartProvider';
import CartItem from "./cartItem/CartItem";
import Checkout from "./checkout/Checkout";

function Cart(props) {

  const [isCheckout, setIsCheckout] = useState(false);

  const cart = useCart();

  const itemAddHandler = item => {
    cart.addItem({
      ...item,
      amount:1
    })
  }

  const itemRemoveHandler = item => {
    cart.removeItem(item)
  }

  const orderHandler = () => {
    setIsCheckout(true);
  }

  const onOrderConfirmed = userData => {
  
    fetch('https://foodordering-5830f-default-rtdb.firebaseio.com/orders.json',{
      method:'POST',
      body: JSON.stringify({
          user:userData,
          order:cart.items
        })
    }).then(() => {
      cart.resetCart();
      alert('ORDER PLACED!');
      props.onClose(false)
    }).catch(err => {
      console.log('ERROR',err)
    })
  }

  const totalAmount = cart.totalAmount.toFixed(2);

  const hasItems = cart.items.length>0;

  const cartItems = (
    <ul className={styles.items}>
      {cart.items.map((data) => (
        <CartItem
          key={data.id}
          item={data}
          handleAdd={()=>itemAddHandler(data)}
          handleRemove={()=>itemRemoveHandler(data)}
        />
      ))}
    </ul>
  );

  const orderBtns = <div className={styles.actions}>
  <button onClick={()=>props.onClose(false)} className={styles.btnCancel}>Cancel</button>
 {hasItems && <button onClick={orderHandler} className={styles.btnOrder}>Order</button> }
</div>

  return (
    <Modal onClose={()=>props.onClose(false)} >
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
     {isCheckout ? 
      <Checkout onSubmit={onOrderConfirmed} onClose={()=>props.onClose(false)} />:
     orderBtns}
      
    </Modal>
  );
}

export default Cart;
