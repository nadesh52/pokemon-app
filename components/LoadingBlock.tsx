import React from "react";

const LoadingBlock = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <span className="font-josefin font-medium text-2xl text-secondary">
        ...fetching pokemon
      </span>
    </div>
  );
};

export default LoadingBlock;
