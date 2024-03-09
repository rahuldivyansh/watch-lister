import React from "react";
const Button = (props) => {
    return (
        <button className="p-2 bg-white hover:bg-white/95 rounded-md text-gray-800 hover:text-black">
            {props.children}
        </button>
    );
}

export default Button;