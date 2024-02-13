import { HTMLProps } from "react";

interface IClockProps extends HTMLProps<SVGSVGElement> {
  fill?: string;
}

const Clock: React.FC<IClockProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <g id="Timer">
        <path
          id="Vector"
          d="M8 2.5C6.81331 2.5 5.65328 2.85189 4.66658 3.51118C3.67989 4.17047 2.91085 5.10754 2.45673 6.2039C2.0026 7.30026 1.88378 8.50666 2.11529 9.67054C2.3468 10.8344 2.91825 11.9035 3.75736 12.7426C4.59648 13.5818 5.66558 14.1532 6.82946 14.3847C7.99335 14.6162 9.19975 14.4974 10.2961 14.0433C11.3925 13.5892 12.3295 12.8201 12.9888 11.8334C13.6481 10.8467 14 9.68669 14 8.5C13.9982 6.90926 13.3655 5.38419 12.2406 4.25937C11.1158 3.13454 9.59074 2.50182 8 2.5ZM8 13.5C7.0111 13.5 6.0444 13.2068 5.22215 12.6573C4.39991 12.1079 3.75904 11.327 3.38061 10.4134C3.00217 9.49979 2.90315 8.49445 3.09608 7.52455C3.289 6.55464 3.76521 5.66373 4.46447 4.96447C5.16373 4.2652 6.05465 3.789 7.02455 3.59607C7.99446 3.40315 8.99979 3.50216 9.91342 3.8806C10.8271 4.25904 11.6079 4.8999 12.1574 5.72215C12.7068 6.54439 13 7.51109 13 8.5C12.9985 9.82563 12.4713 11.0965 11.5339 12.0339C10.5965 12.9712 9.32563 13.4985 8 13.5ZM10.8538 5.64625C10.9002 5.69269 10.9371 5.74783 10.9623 5.80853C10.9874 5.86923 11.0004 5.93429 11.0004 6C11.0004 6.06571 10.9874 6.13077 10.9623 6.19147C10.9371 6.25217 10.9002 6.30731 10.8538 6.35375L8.35375 8.85375C8.3073 8.90021 8.25215 8.93705 8.19145 8.9622C8.13075 8.98734 8.0657 9.00028 8 9.00028C7.93431 9.00028 7.86925 8.98734 7.80855 8.9622C7.74786 8.93705 7.69271 8.90021 7.64625 8.85375C7.5998 8.80729 7.56295 8.75214 7.53781 8.69145C7.51266 8.63075 7.49972 8.5657 7.49972 8.5C7.49972 8.4343 7.51266 8.36925 7.53781 8.30855C7.56295 8.24786 7.5998 8.1927 7.64625 8.14625L10.1463 5.64625C10.1927 5.59976 10.2478 5.56288 10.3085 5.53772C10.3692 5.51256 10.4343 5.49961 10.5 5.49961C10.5657 5.49961 10.6308 5.51256 10.6915 5.53772C10.7522 5.56288 10.8073 5.59976 10.8538 5.64625ZM6 1C6 0.867392 6.05268 0.740215 6.14645 0.646447C6.24022 0.552678 6.36739 0.5 6.5 0.5H9.5C9.63261 0.5 9.75979 0.552678 9.85356 0.646447C9.94732 0.740215 10 0.867392 10 1C10 1.13261 9.94732 1.25979 9.85356 1.35355C9.75979 1.44732 9.63261 1.5 9.5 1.5H6.5C6.36739 1.5 6.24022 1.44732 6.14645 1.35355C6.05268 1.25979 6 1.13261 6 1Z"
          fill={props.fill || "#F9FAFB"}
        />
      </g>
    </svg>
  );
};

export default Clock;
