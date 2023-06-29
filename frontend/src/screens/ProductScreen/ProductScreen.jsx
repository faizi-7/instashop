import { Link, useNavigate, useParams } from "react-router-dom";
import "./ProductScreen.scss";
import Rating from "../../components/Rating/Rating";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../../slices/productsApiSlice.js";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { useState } from "react";
import { addToCart } from "../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler= async(e)=> {
    e.preventDefault()
    try {
      await createReview({
        productId,
        rating,
        comment
      }).unwrap()
      refetch()
      toast.success('Review Submitted!')
      setRating(0)
      setComment("")
    } catch (error) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="product">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="back">Go Back</div>
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="failure">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <div className="productDetail">
            <div className="left">
              <img src={product.image} />
            </div>
            <div className="right">
              <div className="itemUp">
                <div className="itemTitle">{product.name}</div>
                <div className="itemRating">
                  <Rating
                    value={product.rating}
                    numReview={product.numReviews}
                  />
                </div>
                <div className="itemDesc">{product.description}</div>
              </div>
              <div className="itemDown">
                <div className="leftD">
                  <div className="price">
                    <span>Price:</span> $ {product.price}
                  </div>
                  <span
                    className={`status ${
                      product.countInStock > 0 ? "green" : "red"
                    }`}
                  >
                    <span>Status:</span>{" "}
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <div className="rightD">
                  {product.countInStock > 0 && (
                    <select
                      id="quantity"
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  )}

                  <button onClick={addToCartHandler}>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
          <div className="productReview">
            <h1>Reviews</h1>
            {product.reviews.length === 0 && <Message variant="failure">No Reviews</Message>}
            <div className="reviewContent">
              {product.reviews.map((review) => (
                <div key={review._id} className="singleReview">
                  <strong>{review.name}</strong>
                  <Rating
                    value={product.rating}
                    numReview={product.numReviews}
                  />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </div>
              ))}
              <div className="reviewForm">
                <h2>Write a Customer Review</h2>

                {loadingProductReview && <Loader />}

                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <select
                      required
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                    <textarea value={comment} onChange={(e) =>setComment(e.target.value)} required></textarea>
                    <button type="submit">Submit</button>
                  </form>
                ) : (
                  <Message>
                    Please <Link to="/login">sign in</Link> to write a review
                  </Message>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
