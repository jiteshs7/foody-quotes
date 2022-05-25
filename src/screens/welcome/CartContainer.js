import React, { useState } from "react";

import Cart from "../../components/cart/Cart";
import CartProvider from "../../store/CartProvider";
import Meals from "../../components/meals/Meals";
import Header from "../../layout/header/Header";

function CartContainer() {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleCartVisibility = (status) => {
    setIsCartVisible(status);
  };

  return (
    <CartProvider>
      <Header onShowCart={handleCartVisibility} />
      <main>
        <Meals />
      </main>
      {isCartVisible && <Cart onClose={handleCartVisibility} />}
    </CartProvider>
  );
}

export default CartContainer;
