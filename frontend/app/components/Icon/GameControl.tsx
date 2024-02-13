import { HTMLProps } from "react";

interface IGameControlProps extends HTMLProps<SVGSVGElement> {
  fill?: string
}

const GameControl: React.FC<IGameControlProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        opacity="0.2"
        d="M20.3306 19.4597C19.9151 19.533 19.488 19.5051 19.0856 19.3783C18.6831 19.2515 18.3172 19.0295 18.0187 18.7312L14.0709 14.25H16.125C16.8368 14.2508 17.5401 14.0955 18.1854 13.795C18.8308 13.4946 19.4023 13.0564 19.86 12.5111C20.3176 11.9659 20.6501 11.327 20.8341 10.6394C21.0181 9.95176 21.0492 9.23215 20.925 8.53125L22.4587 16.4222C22.5786 17.1071 22.4219 17.8116 22.0229 18.3811C21.6239 18.9506 21.0153 19.3385 20.3306 19.4597Z"
        fill={props.fill || "#54AB72"}
      />
      <path
        d="M16.5 10.5H14.25C14.0511 10.5 13.8603 10.421 13.7196 10.2803C13.579 10.1397 13.5 9.94891 13.5 9.75C13.5 9.55109 13.579 9.36032 13.7196 9.21967C13.8603 9.07902 14.0511 9 14.25 9H16.5C16.6989 9 16.8897 9.07902 17.0303 9.21967C17.171 9.36032 17.25 9.55109 17.25 9.75C17.25 9.94891 17.171 10.1397 17.0303 10.2803C16.8897 10.421 16.6989 10.5 16.5 10.5ZM9.74998 9H8.99998V8.25C8.99998 8.05109 8.92096 7.86032 8.78031 7.71967C8.63965 7.57902 8.44889 7.5 8.24998 7.5C8.05106 7.5 7.8603 7.57902 7.71965 7.71967C7.57899 7.86032 7.49998 8.05109 7.49998 8.25V9H6.74997C6.55106 9 6.3603 9.07902 6.21965 9.21967C6.07899 9.36032 5.99997 9.55109 5.99997 9.75C5.99997 9.94891 6.07899 10.1397 6.21965 10.2803C6.3603 10.421 6.55106 10.5 6.74997 10.5H7.49998V11.25C7.49998 11.4489 7.57899 11.6397 7.71965 11.7803C7.8603 11.921 8.05106 12 8.24998 12C8.44889 12 8.63965 11.921 8.78031 11.7803C8.92096 11.6397 8.99998 11.4489 8.99998 11.25V10.5H9.74998C9.94889 10.5 10.1397 10.421 10.2803 10.2803C10.421 10.1397 10.5 9.94891 10.5 9.75C10.5 9.55109 10.421 9.36032 10.2803 9.21967C10.1397 9.07902 9.94889 9 9.74998 9ZM22.6387 18.8109C22.3561 19.2146 21.9885 19.5514 21.5617 19.7978C21.135 20.0442 20.6594 20.1941 20.1685 20.2371C19.6777 20.2801 19.1833 20.2151 18.7202 20.0466C18.2572 19.8781 17.8366 19.6103 17.4881 19.2619C17.4769 19.2506 17.4656 19.2394 17.4553 19.2272L13.7325 15H10.2637L6.54466 19.2272L6.51185 19.2619C5.87829 19.8941 5.02 20.2494 4.12497 20.25C3.63226 20.2498 3.14556 20.1418 2.69907 19.9334C2.25257 19.7251 1.85711 19.4215 1.54046 19.044C1.22381 18.6665 0.993658 18.2242 0.866165 17.7483C0.738672 17.2724 0.716932 16.7743 0.802473 16.2891C0.802021 16.2847 0.802021 16.2803 0.802473 16.2759L2.33716 8.3925C2.56556 7.09225 3.2449 5.91409 4.25581 5.06504C5.26671 4.21599 6.54451 3.75037 7.86466 3.75H16.125C17.4412 3.7521 18.715 4.21506 19.7254 5.05849C20.7358 5.90193 21.419 7.07258 21.6562 8.36719C21.6562 8.37281 21.6562 8.37844 21.6562 8.38406L23.1909 16.275C23.1914 16.2794 23.1914 16.2838 23.1909 16.2881C23.2703 16.7243 23.2624 17.1718 23.1677 17.6049C23.0729 18.0379 22.8931 18.4479 22.6387 18.8109ZM16.125 13.5C17.219 13.5 18.2682 13.0654 19.0418 12.2918C19.8154 11.5182 20.25 10.469 20.25 9.375C20.25 8.28098 19.8154 7.23177 19.0418 6.45818C18.2682 5.6846 17.219 5.25 16.125 5.25H7.86466C6.89618 5.25087 5.95902 5.59325 5.21807 6.21691C4.47712 6.84057 3.97984 7.70556 3.81372 8.65969V8.67188L2.2781 16.5553C2.21022 16.9461 2.26805 17.3484 2.44327 17.7043C2.61848 18.0602 2.90206 18.3514 3.25321 18.5359C3.60436 18.7204 4.00499 18.7889 4.39747 18.7313C4.78996 18.6738 5.15409 18.4932 5.43747 18.2156L9.36748 13.7541C9.43784 13.6742 9.5244 13.6103 9.62138 13.5665C9.71836 13.5227 9.82356 13.5 9.92998 13.5H16.125ZM21.7219 16.5553L20.9025 12.3366C20.3985 13.1503 19.6953 13.822 18.8593 14.2881C18.0233 14.7542 17.0821 14.9992 16.125 15H15.7312L18.5625 18.2166C18.7759 18.4242 19.0356 18.5783 19.3201 18.6661C19.6047 18.7539 19.906 18.773 20.1994 18.7219C20.6881 18.6356 21.1226 18.3591 21.4079 17.953C21.6931 17.5469 21.8056 17.0443 21.7209 16.5553H21.7219Z"
        fill={props.fill || "#54AB72"}
      />
    </svg>
  );
};

export default GameControl;
