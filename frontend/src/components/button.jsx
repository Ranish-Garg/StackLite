
import React from 'react';
import './Button.css';  

const Button = (props) => {
  return (
    <div className="button-wrapper">
      <button type="button" className="button" 
       style={{ '--btn-color': props.color }} >
        {props.text}
      </button>
    </div>
  );
};

export default Button;
