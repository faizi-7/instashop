import React, { useEffect, useState } from "react";
import "./ProductEditScreen.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../../slices/productsApiSlice";
import Loader from "../../../components/Loader/Loader";
import Message from "../../../components/Message/Message";
import { toast } from "react-toastify";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUplaod }] =
    useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);
  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      brand,
      image,
      category,
      countInStock,
      description,
    };
    const result = await updateProduct(updatedProduct);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product updated successfully!");
      navigate("/");
    }
  };
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    console.log(formData);
    try {
      const res = await uploadProductImage(formData).unwrap();
      console.log(res);
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div className="productEditContainer">
      <button>
        <Link to="/admin/productlist" style={{textDecoration: 'none', color: "#222222"}}>Back </Link>
      </button>

      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message varinat="failure">{error}</Message>
      ) : (
        <div className="productEditForm">
          <div className="loginForm">
            <div className="loginHeading">Edit Product</div>
            <form action="" onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <input
                type="number"
                placeholder="Enter Price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
              <input
                type="text"
                placeholder="Enter Brand"
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
              />
              <input
                type="text"
                placeholder="Enter Image Url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <input
                type="file"
                placeholder="Choose image file"
                onChange={uploadFileHandler}
              />
              <input
                type="text"
                placeholder="Enter Category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              />
              <input
                type="number"
                placeholder="Enter Stock"
                onChange={(e) => setCountInStock(e.target.value)}
                value={countInStock}
              />
              <input
                type="text"
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <button type="submit" disabled={isLoading}>
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductEditScreen;
