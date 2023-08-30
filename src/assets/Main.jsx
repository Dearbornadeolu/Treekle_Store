import React, { useState, useEffect } from 'react';

function YourComponent() {
    const [productsData, setProductsData] = useState({
         products: [
        { id: 1, title: 'iPhone 9', description: 'An apple mobile which is nothing like apple', price: 549, discountPercentage: 12.96 },
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

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {productsData.products.map(product => (
                    <li key={product.id}>
                        {product.title}
                        <br />
                        {product.description} <br />
                        {product.price} <br />
                        {product.discountPercentage}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default YourComponent;
