import React from 'react'
import './Product.scss'
import { Link } from 'react-router-dom'
import Rating from '../Rating/Rating'

const Product = ({product}) => {
  return (
    <div className="card">
        <Link to={`/product/${product._id}`} className="img">
            <img src={product.image}/>
        </Link>
        <div className="body">
            <Link style={{ textDecoration: 'none' }} to={`/product/${product._id}`}><div className="title">{product.name}</div></Link> 
            <div className="homeRating"><Rating value={product.rating} numReview= {product.numReviews} className="homeRating"/></div>
            <div className="price">$ {product.price}</div>
        </div>
    </div>
  )
}

export default Product