import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link, Route, Routes } from 'react-router-dom';
import "../App.css";
import SearchResults from './SearchResults'; // Import the SearchResults component

function Main() {
    const nav = useNavigate();
    const { q } = useParams(); // Get the search query from the URL

    const [searchQuery, setSearchQuery] = useState(q || ''); // Initialize searchQuery from URL or empty string
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productsData, setProductsData] = useState({
        products: [],
        total: 0,
        skip: 0,
        limit: 0
    });
    const [availableCategories, setAvailableCategories] = useState([]); // Store available categories
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false); // To track the category menu visibility

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();
                setProductsData(data);
                // Initially, display all products if the search query is not provided in the URL
                setFilteredProducts(q ? filterProductsBySearch(q, data.products) : data.products);

                // Extract available categories from products
                const categories = [...new Set(data.products.map(product => product.category))];
                setAvailableCategories(categories);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    }, [q]);

    // Filter products by search query
    const filterProductsBySearch = (query, products) => {
        return products.filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );
    };

    // Handle changes in the search query
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    };

    // Handle the search button click
    const handleSearchButtonClick = () => {
        // const filtered = filterProductsBySearch(searchQuery, productsData.products);
        // setFilteredProducts(filtered);
        // Update the URL to reflect the search query
        nav(`/products/search?q=${encodeURIComponent(searchQuery)}`);

    };

    // Filter products by category
    const filterProductsByCategory = (category) => {
        if (category === 'All') {
            // If 'All' is selected, show all products
            setFilteredProducts(productsData.products);
        } else {
            // Filter products by the selected category
            const filtered = productsData.products.filter(product =>
                product.category.toLowerCase() === category.toLowerCase()
            );
            setFilteredProducts(filtered);
        }
    };

    // Handle changes in the selected category
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        filterProductsByCategory(category);
    };

    // Toggle the category menu visibility
    const toggleCategoryMenu = () => {
        setIsCategoryMenuOpen(!isCategoryMenuOpen);
    };

    // Handle viewing a product's details
    const viewProduct = (productId) => {
        console.log(productId);
        nav(`/products/${productId}`);
    };

    return (
        <div>
            <div className='prodHeader'>
                <h1>Products</h1>
                <div className='input-area'>
                    <input
                        type="text"
                        name=""
                        id="filter-product"
                        placeholder="Search by product title"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className='search-btn' onClick={handleSearchButtonClick}>Search</button>
                </div>
                {/* Category selector */}
                <div className='category-dropdown'>
                    <button className='category-btn' onMouseEnter={toggleCategoryMenu}>Categories</button>
                    {/* Toggle the category menu based on isCategoryMenuOpen */}
                    {isCategoryMenuOpen && (
                        <div className='category-menu'>
                            <ul>
                                <li onClick={() => handleCategoryChange('All')}>All</li>
                                {availableCategories.map(category => (
                                    <li key={category} onClick={() => handleCategoryChange(category)}>{category}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <ul id='cardTrey'>
                {filteredProducts.map(product => (
                    <li key={product.id} className='content'>
                        {product.images && product.images[0] && (
                            <img src={product.images[0]} alt={product.title} className='imgDisplay' />
                        )}
                        <div className='text'>
                            <h1> {product.title}</h1>
                            <div>
                                <p>{product.description}</p>
                                <div>N {product.price}</div>
                                <div>{product.discountPercentage}</div>
                            </div>
                        </div>
                        <button onClick={() => viewProduct(product.id)}>View Product</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Main;
