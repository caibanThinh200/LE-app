import Lottie from "lottie-react";
import Image from "next/image";
import loading from "../../public/lottie/loading-3.json";

interface ILoadingOverlayProps {}

const LoadingOverlay: React.FC<ILoadingOverlayProps> = (props) => {
  return (
    <div className="w-screen h-screen fixed bg-white/80 z-70 flex flex-col justify-center items-center inset-0">
      <Lottie animationData={loading} loop className="stroke-primary-green" />
    </div>
  );
};

export default LoadingOverlay;
