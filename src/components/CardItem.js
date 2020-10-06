import React from "react";
import { Link } from "react-router-dom";

function CardItem(props) {
  return (
    <>
      <div className="cards__item">
        <div className="cards__item__info">
          <h5 className="cards__item__text">{props.text}</h5>
        </div>
      </div>
    </>
  );
}

export default CardItem;
