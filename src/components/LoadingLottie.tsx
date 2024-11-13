import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../public/CoSide_loading.json';

export default function LoadingLottie() {
  return <Lottie animationData={animationData} loop={true} speed={1000} />;
};

