import React, {
  useEffect,
  useRef
} from "react";

export const MapContainer = ({ container, children }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (container.current) {
      container.current._container.appendChild(ref.current);
    }
  }, [container, ref]);

  return (
    <>{container && container.current && <div ref={ref}>{children}</div>}</>
  );
};
