import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={438}
    height={400}
    viewBox="0 0 438 400"
    backgroundColor="#4d4c4c"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="2" y="4" rx="0" ry="0" width="438" height="396" />
  </ContentLoader>
);

export default Skeleton;
