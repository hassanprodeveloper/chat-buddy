import React from "react";

function Card(props) {
  const { item, key } = props;
  return <div>{item ? item.title : ""}</div>;
}

export default Card;
