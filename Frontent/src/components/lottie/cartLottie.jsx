
import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../../assets/lottie/animationCart.json"; 
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

  return <div ref={containerRef} style={{ width: 300, height: 300 }} />;
};

export default MyLottieAnimation;