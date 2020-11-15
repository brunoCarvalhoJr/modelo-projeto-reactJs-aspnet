import React, { useState } from "react";
import { Button } from "antd";
import { Context } from "../../Context";

export const ToolBar = () => {
  const mapContext = React.useContext(Context);
  const [text] = useState("Teste");

  const alertTeste = () => {
    mapContext.map.setZoom(20);
  };

  const alertTeste2 = () => {
    mapContext.map.setZoom(2);
  };

  return (
    <div className="buttons-group buttons-right">
      <Button
        type="default"
        icon={<i class="fas fa-draw-polygon"></i>}
        size={"large"}
        onClick={alertTeste} />
      <Button
        type="default"
        icon={<i class="fas fa-pastafarianism"></i>}
        size={"large"}
        onClick={alertTeste2} />
      <Button
        type="default"
        icon={<i class="fas fa-comment-alt"></i>}
        size={"large"}
        onClick={alertTeste2} />
    </div>
  );
};
