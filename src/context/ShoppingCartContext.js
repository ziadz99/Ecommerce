import { createContext, useState } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState([]);

  // Function to add items to the cart
  // const addCartItem = (itemId) => {
  //   const existingItem = shoppingCart.find((item) => item.id === itemId);

  //   if (existingItem) {
  //     setShoppingCart((prevCart) =>
  //       prevCart.map((item) =>
  //         item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
  //       )
  //     );
  //   } else {
  //     setShoppingCart((prevCart) => [...prevCart, { id: itemId, quantity: 1 }]);
  //   }
  // };

  const addCartItem = (product) => {
    setShoppingCart((currItems) => {
      // console.log(
      //   currItems.find((item) => item.ProductID === product.ProductID)
      // );
      if (!currItems.find((item) => item.ProductID === product.ProductID)) {
        return [...currItems, { ...product, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.ProductID === product.ProductID) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
    // console.log(product, shoppingCart);
  };

  const decItemQuantitiy = (product) => {
    setShoppingCart((currItems) => {
      // console.log(
      //   currItems.find((item) => item.ProductID === product.ProductID)
      // );
      if (!currItems.find((item) => item.ProductID === product.ProductID)) {
        return [...currItems, { ...product, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.ProductID === product.ProductID) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
    // console.log(product, shoppingCart);
  };

  const removeCartItem = (product) => {
    setShoppingCart((currItems) => {
      return currItems.filter((item) => item.ProductID !== product.ProductID);
    });
  };

  // const calcSum = (cart) =>
  //   cart.reduce((acc, { price, quantity }) => acc + price * quantity, 0);

  const calcSum = (cart) => {
    let acc = 0;
    let quantity = 0;
    let price = 0;
    for (let i = 0; i < cart.length; i++) {
      quantity = cart[i].quantity;
      price = cart[i].Price;
      acc += quantity * price;
    }
    return acc;
  };

  const getCartItemQuantity = () => {
    let quantity = 0;

    shoppingCart.map((item, index) => {
      quantity += item.quantity;
      return quantity;
    });

    return quantity;
  };

  const value = {
    addCartItem,
    shoppingCart,
    setShoppingCart,
    decItemQuantitiy,
    removeCartItem,
    calcSum,
    getCartItemQuantity,
  };

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
