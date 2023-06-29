import React from 'react'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import './Rating.scss'

const Rating = ({value, numReview}) => {
  return (
    <div className="rating">
        <div className='stars'>
            {value>=1 ? <FaStar/> 
            : value>=0.5 ? <FaStarHalfAlt/> 
            : <FaRegStar/>}
            {value>=2 ? <FaStar/> 
            : value>=1.5 ? <FaStarHalfAlt/> 
            : <FaRegStar/>}
            {value>=3 ? <FaStar/> 
            : value>=2.5 ? <FaStarHalfAlt/> 
            : <FaRegStar/>}
            {value>=4 ? <FaStar/> 
            : value>=3.5 ? <FaStarHalfAlt/> 
            : <FaRegStar/>}
            {value>=5 ? <FaStar/> 
            : value>=4.5 ? <FaStarHalfAlt/> 
            : <FaRegStar/>}

        </div>
        <span className="numrating">{numReview} Reviews</span>
    </div>
  )
}

export default Rating