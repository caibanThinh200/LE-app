import { HTMLProps } from "react";

interface ICheckedProps extends HTMLProps<SVGSVGElement> {}

const Checked: React.FC<ICheckedProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M21.5306 7.28104L9.53055 19.281C9.4609 19.3508 9.37818 19.4061 9.28713 19.4438C9.19609 19.4816 9.09849 19.501 8.99993 19.501C8.90137 19.501 8.80377 19.4816 8.71272 19.4438C8.62168 19.4061 8.53896 19.3508 8.4693 19.281L3.2193 14.031C3.07857 13.8903 2.99951 13.6994 2.99951 13.5004C2.99951 13.3014 3.07857 13.1105 3.2193 12.9698C3.36003 12.8291 3.55091 12.75 3.74993 12.75C3.94895 12.75 4.13982 12.8291 4.28055 12.9698L8.99993 17.6901L20.4693 6.21979C20.61 6.07906 20.8009 6 20.9999 6C21.199 6 21.3898 6.07906 21.5306 6.21979C21.6713 6.36052 21.7503 6.55139 21.7503 6.75042C21.7503 6.94944 21.6713 7.14031 21.5306 7.28104Z"
        fill="url(#paint0_linear_646_1383)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_646_1383"
          x1="12.3749"
          y1="6"
          x2="12.3749"
          y2="19.501"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#2AB032" />
          <stop offset="1" stop-color="#109C59" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Checked