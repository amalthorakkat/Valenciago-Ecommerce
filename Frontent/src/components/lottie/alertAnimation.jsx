import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../../assets/lottie/alertAnimation.json"
const MyLottieAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => {
      lottie.destroy();
    };
  }, []);

  return <div ref={containerRef} style={{ width: 50, height: 50 }} />;
};

export default MyLottieAnimation;