import React from "react";

type SpacerProps = {
  size: number; // The size of the spacer in pixels
};

const HorizontalSpacer: React.FC<SpacerProps> = ({size}) => <div style={{width: size}} />;

export default HorizontalSpacer;
