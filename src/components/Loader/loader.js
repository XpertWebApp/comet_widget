import React from "react";
import { ColorRing } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="button-loder-box">
      <div className="loader-wrap">
        <ColorRing
          visible={true}
          height="30"
          width="30"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      </div>
    </div>
  );
};

export default Loader;
