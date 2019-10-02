import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Main = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <video
        data-v-0362bbb6=""
        id="hero-video"
        alt="Ethereum.org - Light"
        width="380"
        height="380"
        src="https://ucarecdn.com/b33f5c86-2d0b-4063-99e1-0acfc6d15a00/ethwhiteoptimized2.mp4"
        playsinline=""
        autoplay="autoplay"
        loop="loop"
        muted="muted"
        class="mx-auto inline-block"
      ></video>
      <div>
        <a href="https://github.com/LikeRaichu">현우</a>
      </div>
      <div>
        <a href="https://github.com/yeeun0855">예은</a>
      </div>
      <div>
        <a href="https://github.com/ganzik">기홍</a>
      </div>
      <div>
        <a href="https://github.com/rajy5851">지용</a>
      </div>
    </div>
  );
};

export default Main;
