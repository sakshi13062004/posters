import React, { useEffect, useState } from 'react'
import './ProductDetail.scss'
import {AiTwotoneStar} from 'react-icons/ai'
import {useParams} from 'react-router'
import {useDispatch, useSelector} from 'react-redux';
import { axiosClient } from '../../utils/axiosClient';
import { addToCart,removeFromCart } from '../../redux/cartSlice';

function ProductDetail() {
  const params = useParams();

  console.log('params',params);
 const [product,setProduct] = useState(null);
 const dispatch=useDispatch();
const cart = useSelector(state => state.cartReducer.cart);
const quantity = cart.find(item => item.key=== params.productId)?.quantity || 0;

  async function fetchData(){
    const productResponse = await axiosClient.get(`/products?filters[key][$eq]=${params.productId}&populate=*`);
    console.log('product',productResponse);
    if(productResponse.data.data.length>0){
    setProduct(productResponse.data.data[0]);
    }
  }
useEffect(()=>{
  setProduct(null);
fetchData();
},[params])

if(!product){
return <div><h1>Loading...</h1></div>
}
  return (
    <div className="ProductDetail">
    <div className="container">
      <div className="product-layout">
        <div className="product-img center">
          <img src={product?.attributes.image.data.attributes.url} alt="" />
        </div>
        <div className="product-info">
          <h1 className="heading">
            {product?.attributes.title}
          </h1>
          <h3 className="price">₹ {product?.attributes.price}</h3>
          <p className="description">
          300 GSM Fine Art Matte Paper
Elegant Black Frame made up of Premium Quality Synthetic Wood
Industry-Recognized High-Quality Print
Protective Matte Coating provides a Vivid, Sharp and Non-Reflective Appearance
          </p>

          <div className="cart-options">
            <div className="quantity-selector">
              <span className="btn decrement" onClick={() => dispatch(removeFromCart(product))}>-</span>
              <span className="quantity">{quantity}</span>
              <span className="btn increment" onClick={() => dispatch(addToCart(product))}>+</span>
            </div>
           
            <button className="btn-primary add-to-cart" onClick={() => dispatch(addToCart(product))}>Add To Cart</button><br/>
            <strong className='review '> <AiTwotoneStar /> <AiTwotoneStar /> <AiTwotoneStar /> <AiTwotoneStar /> <AiTwotoneStar /></strong>
          </div>
          

          <div className="return-policy">
            <ul>
              <li>In rare case of lost shipments, we will offer full refund irrespective of the delivery location or framing state.</li>
              <li> In rare case of delivery of damaged artwork or frames, we will offer refund amounts based on the condition of the same.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ProductDetail
