import Product from "../components/Product/Product";
import "./HomeScreen.scss";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate/Paginate";
import ProductCarousel from "../components/ProductCarousel/ProductCarousel";

const HomeScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

  return (
    <>
    <ProductCarousel/>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="failure">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="home">
          <div className="heading">Latest Products</div>
          <div className="products">
            {data.products.map((product) => {
              return <Product key={product._id} product={product} />;
            })}
          </div>
          <Paginate pages={data.pages} page={data.page} />
        </div>
      )}
    </>
  );
};

export default HomeScreen;
