import React from "react";

type SpacerProps = {
  size: number; // The size of the spacer in pixels
};

const VerticalSpacer: React.FC<SpacerProps> = ({size}) => <div style={{height: size}} />;

export default VerticalSpacer;
