import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext(); // Create the context

export function useProductContext() {
  return useContext(ProductContext); // Custom hook to use the context
}

export function ProductProvider({ children }) {
  const [productsData, setProductsData] = useState({
    // Your initial productsData state
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProductsData(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={productsData}>
      {children}
    </ProductContext.Provider>
  );
}
