import React, { useState } from 'react'
import './Navbar.scss'
import {Link} from 'react-router-dom'
import Cart from '../cart/Cart'
import {BsCart3} from 'react-icons/bs'
import { useSelector } from 'react-redux'
function Navbar() {
  const [openCart,setOpencart] = useState(false);
  const categories = useSelector(state => state.categoryReducer.categories)
  const cart = useSelector(state => state.cartReducer.cart);
  let totalItems=0;
  cart.forEach(item => totalItems+= item.quantity);

  return (
    <>
    <div className="Navbar">
      <div className="container nav-container">
        <div className="nav-left">
          <ul className="link-group">
            {categories?.map(category => {
               <li className="hover-link" key={category.id}>
               <Link className="link"
                to={`/category/${category.attributes.key}`}>{category.attributes.title}</Link>
             </li>
 } )}


            {/* <li className="hover-link">
              <Link className="link" to="/products?category=comic">Comic</Link>
            </li>
            <li className="hover-link"> 
            <Link className="link" to="/products?category=shows">Tv Shows</Link>
            </li>
            <li className="hover-link">
            <Link className="link" to="/products?category=sports">Sports</Link>
            </li> */}
          </ul>
        </div>
        <div className="nav-center">
        <Link className="link" to="/">
          <h1 className="banner">Posterz.</h1>
        </Link>
        </div>
        <div className="nav-right">
          <div className="nav-cart hover-link" onClick={()=> setOpencart(!openCart)}>
            <BsCart3 className="icon"/>
            {totalItems >0 && <span className="cart-count center">{totalItems}</span>}
            
          </div>
        </div>
      </div>

                  
    </div>
    {openCart && <Cart onClose={() => setOpencart(false)}/>}
    </>
  )
}

export default Navbar;
