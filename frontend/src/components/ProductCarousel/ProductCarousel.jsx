import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCarousel.scss";
import { useGetTopProductsQuery } from "../../slices/productsApiSlice";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? products.length - 1 : prevSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === products.length - 1 ? 0 : prevSlide + 1
    );
  };

  return isLoading ? null : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <div className="product-carousel">
      {products.map((product, index) => (
        <div
          key={product._id}
          className={`carousel-item ${index === currentSlide ? "active" : ""}`}
        >
          <Link to={`/product/${product._id}`} className="carousel-link">
            <img
              src={product.image}
              alt={product.name}
              className="carousel-image"
            />
            <div className="carousel-caption">
              <h2 className="carousel-title">
                {product.name} (${product.price})
              </h2>
            </div>
          </Link>
        </div>
      ))}

      <button className="carousel-control prev" onClick={goToPrevSlide}>
        <FaAngleLeft />
      </button>
      <button className="carousel-control next" onClick={goToNextSlide}>
        <FaAngleRight />
      </button>

      <div className="carousel-dots">
        {products.map((_, index) => (
          <div
            key={index}
            className={`carousel-dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
