import React from "react";

const LoadingBlock = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100dvh-183px)] w-full">
      <span className="font-josefin font-medium text-2xl text-secondary">
        ...fetching pokemon
      </span>
    </div>
  );
};

export default LoadingBlock;
