import { HTMLProps } from "react";

interface ISpeakerMuteProps extends HTMLProps<SVGSVGElement> {}

const SpeakerMute: React.FC<ISpeakerMuteProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#fff"
      viewBox="0 0 200 250"
      {...props}
    >
      <path d="M184,152V104a8,8,0,0,1,16,0v48a8,8,0,0,1-16,0Zm40-72a8,8,0,0,0-8,8v80a8,8,0,0,0,16,0V88A8,8,0,0,0,224,80ZM213.92,210.62a8,8,0,1,1-11.84,10.76L160,175.09V224a8,8,0,0,1-12.91,6.31L77.25,176H32a16,16,0,0,1-16-16V96A16,16,0,0,1,32,80H73.55L42.08,45.38A8,8,0,1,1,53.92,34.62ZM144,157.49,88.1,96H32v64H80a7.94,7.94,0,0,1,4.91,1.69L144,207.64ZM117.06,69.31l26.94-21v58.47a8,8,0,0,0,16,0V32a8,8,0,0,0-12.91-6.31l-39.85,31a8,8,0,0,0,9.82,12.63Z" />
    </svg>
  );
};

export default SpeakerMute
