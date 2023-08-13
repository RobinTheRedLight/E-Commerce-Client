import React from "react";

const Card = (ph) => {
  const photo = ph.photo.photo;
  const title = ph.photo.title;
  const price = ph.photo.price;
  return (
    <div className="p-5">
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={photo} alt="" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            <div className="badge badge-outline p-3">Price: {price}$</div>
          </h2>
          <p>This is an authentic product.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-outline btn-primary">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
