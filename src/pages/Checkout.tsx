import React, { useState, useEffect } from "react";
import CartList from "../components/Cart/CartList";
import ProductList from "../components/Product/ProductList";
import { Product } from "../types";
import { getProducts } from "../services/productService";

const Checkout: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {payload, error} = await getProducts();
        if (payload) {
          setProducts(payload.data);
        } else {
          window.alert(error);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchData();
  }, []);

  const addProductToCart = (productId: number) => {
    const productToAdd: Product | undefined = products.find(
      (product) => product.id === productId
    );
    if (productToAdd) {
      const existingProduct: Product | undefined = cart.find(
        (product) => product.id === productId
      );
      if (existingProduct) {
        const updatedCart: Product[] = cart.map((product) =>
          product.id === productId
            ? { ...product, quantity: Math.min(product.quantity + 1, productToAdd.quantity) }
            : product
        );
        setCart(updatedCart);
      } else {
        setCart([...cart, { ...productToAdd, quantity: 1 }]);
      }
    }
  };

  const removeProductFromCart = (productId: number) => {
    const existingProduct: Product | undefined = cart.find(
      (product) => product.id === productId
    );
    if (existingProduct) {
      const updatedCart: Product[] = cart.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(product.quantity - 1, 0) }
          : product
      );
      const filteredCart: Product[] = updatedCart.filter(
        (product) => product.quantity > 0
      );
      setCart(filteredCart);
    }
  };

  return (
    <>
      <div className="product-grid">
        <ProductList
          products={products}
          addProductToCart={addProductToCart}
          removeProductFromCart={removeProductFromCart}
        />
      </div>
      <CartList
        products={cart}
        decrementQuantity={(productId: number) => {
          removeProductFromCart(productId);
        }}
        incrementQuantity={(productId: number) => {
          addProductToCart(productId);
        }}
      />
    </>
  );
};

export default Checkout;
