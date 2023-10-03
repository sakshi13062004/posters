import React, { useEffect, useState } from 'react'
import Product from '../../components/product/Product'
import { axiosClient } from '../../utils/axiosClient'
import './Categories.scss'
import { useSelector } from 'react-redux'
import {useNavigate,useParams} from 'react-router'
function Categories() {
    const navigate= useNavigate();
    const params = useParams();

    const [categoryId,setCategoryId] = useState('');
    const categories = useSelector((state) => state.categoryReducer.categories);
    const [products, setProducts] = useState([]);
   

    const sortOptions = [
        {
            
            value: "Price - Low To High",
            sort: "price",
        },
        {
            
            value: "Newest First",
            sort: "createdAt",
        },
    ];
    const [sortBy,setSortBy] = useState(sortOptions[0].sort);
//     const categoryList = [{
//         id: "comics",
//         value:"Comics",
//     },
//     {
//         id: "tv-shows",
//         value:"TV Shows",  
//     },
//     {
//         id: "sports",
//         value:"Sports",  
//     },

// ];
async function fetchProducts() {
    const url = params.categoryId
            ? `/products?populate=image&filters[category][key][$eq]=${params.categoryId}&sort=${sortBy}`
            : `/products?populate=image&sort=${sortBy}`;
        const response = await axiosClient.get(url);
    setProducts(response.data.data);
}
useEffect(()=>{
setCategoryId(params.categoryId);

//api call
fetchProducts();
},[params,sortBy])

function updateCategory(e){
// console.log('checked',e.target.value);
navigate(`/category/${e.target.value}`);
}

function handleSortChange(e){
    const sortKey = e.target.value;
   setSortBy(sortKey)

}
  return (
    <div className="Categories">
        <div className="container">
        <div className="header">
            <div className="info">
                <h2>Explore All Print and Artwork</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi reprehenderit ex aliquid libero!</p>

            </div>
            <div className="sort-by">
                <div className="sort-by-container">
                  <p className="sort-by-text">Sort By </p> 
               <select className="select-sort-by" 
               name="sort-by" 
               id="sort-by"
onChange={handleSortChange}
               >
               {sortOptions.map((item) => (
                                    <option key={item.sort} value={item.sort}>
                                        {item.value}
                                    </option>
                                ))}
              
              
                {/* <option value="relevance">Relevance</option>
                <option value="newest-first">Newest First</option>
                <option value="price-lth">Price - Low To High</option> */}
               </select>
               
                </div>
            </div>
        </div>

<div className="content">
    <div className="filter-box">
      <div className="category-filter">
        <h3>Category</h3>
        {categories.map(item =>(
             <div key={item.id} className="filter-radio">
             <input 
             type="radio" 
             name="category"
             id={item.id}
             value={item.attributes.key}
             checked={item.attributes.key=== categoryId}
             onChange={updateCategory} />
             <label htmlFor={item.id} >{item.attributes.title}</label>
         </div>
        ) )}
       

        {/* <div className="filter-radio">
            <input type="radio" 
            name="category"
             id="tv-shows" />
            <label htmlFor="tv-shows">Tv Shows</label>
        </div>

        <div className="filter-radio">
            <input type="radio"
             name="category"
              id="sports" />
            <label htmlFor="sports">Sports</label>
        </div> */}
      </div>
    </div>
    <div className="products-box">
     {products.map(product => <Product key={product.id} product={product}/>)}   
{/* <Product />
<Product />
<Product />
<Product /> */}
    </div>
</div>

        </div>
      
      
    </div>
  )
}

export default Categories
