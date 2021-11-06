import React, { SyntheticEvent, useEffect, useState } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import ImageUpload from "../../components/ImageUpload";
import Wrapper from "../../components/Wrapper";

const ProductEdit = ({
  match: {
    params: { id: productId },
  },
}: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    effect();
  }, []);

  const effect = async () => {
    try {
        const { data }: any = await axios.get(`products/${productId}`)

        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
        setPrice(data.price);
    } catch (err) {
        console.log('err: ', err)
    }
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.put(`products/${productId}`, {
        title,
        description,
        image,
        price,
      });

      setRedirect(true);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const onOpenFolder = () => {
    document.getElementById("image")?.click();
  };

  return redirect ? (
    <Redirect to="/products" />
  ) : (
    <Wrapper>
      <form className="mt-3" onSubmit={onSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            value={title}
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            value={description}
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3" onClick={onOpenFolder}>
          <label>Image</label>
          <div className="input-group">
            <input
              disabled
              value={image}
              className="form-control"
              onChange={(e) => setImage(e.target.value)}
            />
            <ImageUpload setImage={setImage} />
          </div>
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            value={price}
            className="form-control"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default ProductEdit;
