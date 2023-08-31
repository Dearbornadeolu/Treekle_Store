import React from 'react'
import { useParams } from 'react-router-dom';
import { useProductContext } from './ProductContext';

function ProductDetail() {
   const { productId } = useParams()
   const productData = useProductContext()

   const selectedProduct = productData.products.find(product => product.id === parseInt(productId));

    return (
        <div>
            <div className='prodDisTrey'>
            <h1>Product Details - {productId}</h1>
            {selectedProduct && (
                    <div className='proddescription'>
                    <img src={selectedProduct.images[0]} alt="" className='imgprod'/>
                        <h2>{selectedProduct.title}</h2>
                        <p>{selectedProduct.description}</p>
                        <p>Price: {selectedProduct.price}</p>
                        <p>Discount: {selectedProduct.discountPercentage}%</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;
