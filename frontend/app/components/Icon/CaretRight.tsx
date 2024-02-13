import { HTMLProps } from "react";

interface ICaretRightProps extends HTMLProps<SVGSVGElement> {}

const CaretRight: React.FC<ICaretRightProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M14.1925 10.442L7.94254 16.692C7.88447 16.7501 7.81553 16.7962 7.73966 16.8276C7.66379 16.859 7.58247 16.8752 7.50035 16.8752C7.41823 16.8752 7.33691 16.859 7.26104 16.8276C7.18517 16.7962 7.11623 16.7501 7.05816 16.692C7.00009 16.634 6.95403 16.565 6.9226 16.4892C6.89117 16.4133 6.875 16.332 6.875 16.2499C6.875 16.1677 6.89117 16.0864 6.9226 16.0105C6.95403 15.9347 7.00009 15.8657 7.05816 15.8077L12.8668 9.99986L7.05816 4.19205C6.94088 4.07477 6.875 3.91571 6.875 3.74986C6.875 3.58401 6.94088 3.42495 7.05816 3.30767C7.17544 3.1904 7.3345 3.12451 7.50035 3.12451C7.6662 3.12451 7.82526 3.1904 7.94254 3.30767L14.1925 9.55767C14.2506 9.61571 14.2967 9.68465 14.3282 9.76052C14.3597 9.83639 14.3758 9.91772 14.3758 9.99986C14.3758 10.082 14.3597 10.1633 14.3282 10.2392C14.2967 10.3151 14.2506 10.384 14.1925 10.442Z"
        fill="#F9FAFB"
      />
    </svg>
  );
};

export default CaretRight;
