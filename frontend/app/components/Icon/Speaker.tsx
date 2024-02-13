import { HTMLProps } from "react";

interface ISpeakerProps extends HTMLProps<SVGSVGElement> {}

const Speaker: React.FC<ISpeakerProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      {...props}
    >
      <path
        d="M26.7283 4.26443C26.4971 4.15176 26.2389 4.1062 25.983 4.13294C25.7272 4.15967 25.484 4.25763 25.2811 4.41568L13.2773 13.7502H5.5C4.77065 13.7502 4.07118 14.0399 3.55546 14.5557C3.03973 15.0714 2.75 15.7709 2.75 16.5002V27.5002C2.75 28.2296 3.03973 28.929 3.55546 29.4448C4.07118 29.9605 4.77065 30.2502 5.5 30.2502H13.2773L25.2811 39.5847C25.4842 39.7427 25.7276 39.8404 25.9835 39.8669C26.2394 39.8934 26.4976 39.8475 26.7288 39.7345C26.9599 39.6215 27.1548 39.446 27.2911 39.2278C27.4274 39.0096 27.4998 38.7575 27.5 38.5002V5.50021C27.5 5.24262 27.4277 4.99019 27.2913 4.77171C27.1548 4.55322 26.9598 4.37745 26.7283 4.26443ZM24.75 35.6883L14.5939 27.7907C14.3531 27.602 14.0559 27.4997 13.75 27.5002H5.5V16.5002H13.75C14.0559 16.5007 14.3531 16.3984 14.5939 16.2097L24.75 8.31209V35.6883ZM34.375 17.8752V26.1252C34.375 26.4899 34.2301 26.8396 33.9723 27.0975C33.7144 27.3553 33.3647 27.5002 33 27.5002C32.6353 27.5002 32.2856 27.3553 32.0277 27.0975C31.7699 26.8396 31.625 26.4899 31.625 26.1252V17.8752C31.625 17.5105 31.7699 17.1608 32.0277 16.9029C32.2856 16.6451 32.6353 16.5002 33 16.5002C33.3647 16.5002 33.7144 16.6451 33.9723 16.9029C34.2301 17.1608 34.375 17.5105 34.375 17.8752ZM39.875 15.1252V28.8752C39.875 29.2399 39.7301 29.5896 39.4723 29.8475C39.2144 30.1053 38.8647 30.2502 38.5 30.2502C38.1353 30.2502 37.7856 30.1053 37.5277 29.8475C37.2699 29.5896 37.125 29.2399 37.125 28.8752V15.1252C37.125 14.7605 37.2699 14.4108 37.5277 14.1529C37.7856 13.8951 38.1353 13.7502 38.5 13.7502C38.8647 13.7502 39.2144 13.8951 39.4723 14.1529C39.7301 14.4108 39.875 14.7605 39.875 15.1252Z"
        fill="#F9FAFB"
      />
    </svg>
  );
};

export default Speaker;
