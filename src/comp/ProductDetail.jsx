import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../App.css"

function ProductDetail() {
  // Use the useParams hook to get the productId from the URL
  const { productId } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-image">
        {product.images && product.images[0] && ( // Check if images is defined
          <img src={product.images[0]} alt={product.title} />
        )}
      </div>
      <div className="product-info">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <div className="product-price">
          <span>Price: N {product.price}</span>
          <span>Discount: {product.discountPercentage}%</span>
        </div>
        <button className="buy-button">Buy Now</button>
      </div>
    </div>
  );
}

export default ProductDetail;
