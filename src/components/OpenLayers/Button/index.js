import React from "react";
import "./index.css";

function Button({ icon, tooltip, onClick, active }) {
  return (
    <button
      type="button"
      title={tooltip}
      onClick={onClick}
      className={active ? "ol-on" : "ol-off"}
    >
      {icon}
    </button>
  );
}

export default Button;
