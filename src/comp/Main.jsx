import React, { useState, useEffect } from 'react';
import "../App.css"
import { useNavigate } from 'react-router-dom';

function Main() {

    const nav = useNavigate()

    const [productsData, setProductsData] = useState({
        products: [
            {
                id: 1,
                title: 'iPhone 9',
                description: 'An apple mobile which is nothing like apple',
                price: 549,
                discountPercentage: 12.96,
                images: [
                    "https://i.dummyjson.com/data/products/2/1.jpg",
                    "https://i.dummyjson.com/data/products/2/2.jpg",
                    "https://i.dummyjson.com/data/products/2/3.jpg",
                    "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
                ]
            },
        ],
        total: 0,
        skip: 0,
        limit: 0
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


    console.log(productsData)
    const viewCart = (productId) => {
        alert(`Viewing product with ID: ${productId}`);
        nav(`/product/${productId}`)
    };


    return (
        <div>
            <h1>Products</h1>
            <ul id='cardTrey'>
                {productsData.products.map(product => (
                    <li key={product.id} className='content'>
                        <img src={product.images[0]} alt={product.title} className='imgDisplay' />
                        <div className='text'>
                            <h1> {product.title}</h1>
                            <div>
                                <p>{product.description}</p>
                                <div>{product.price}</div>
                                <div>{product.discountPercentage}</div>
                            </div>
                        </div>
                        <button onClick={() => viewCart(product.id)}>View Product</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Main;
