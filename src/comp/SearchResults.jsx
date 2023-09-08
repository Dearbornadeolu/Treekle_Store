import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css'; // Import your CSS file

function SearchResults() {
  const { q } = useParams();
  const [searchQuery, setSearchQuery] = useState(q || '');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    async function fetchAndFilterProducts(query) {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        const filtered = filterProductsBySearch(query, data.products);
        setFilteredProducts(filtered);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchAndFilterProducts(searchQuery);
  }, [searchQuery]);

  const filterProductsBySearch = (query, products) => {
    return products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div className="search-results-container">
      <h1 className="search-results-title">Search Results for `{searchQuery}`</h1>
      <ul className="product-list">
        {filteredProducts.map(product => (
          <li key={product.id} className="product-item">
            {product.images && product.images[0] && (
              <img src={product.images[0]} alt={product.title} className="product-image" />
            )}
            <div className="product-details">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-description">Description: {product.description}</p>
              <div className="product-price">Price: N {product.price}</div>
              <div className="product-discount">Discount: {product.discountPercentage}%</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
