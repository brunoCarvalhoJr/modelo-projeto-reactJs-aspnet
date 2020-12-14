import React from "react";

import "./index.css";

function Toolbar({ children }) {
  return (
    <div id="toolbar">
      <div className="ol-selectable ol-control">{children}</div>
    </div>
  );
}

export default Toolbar;
