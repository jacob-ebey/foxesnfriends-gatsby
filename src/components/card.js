import React from "react";

import "./card.scss";

const Card = ({ title, className, children, ...rest }) => (
  <div className={"card " + (className || "")} {...rest}>
    <h3>{title}</h3>
    {children}
  </div>
);

export default Card;
