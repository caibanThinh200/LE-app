import RsIcon from "@/app/components/Icon";

interface ICorrectTickProps {}

const CorrectTick: React.FC<ICorrectTickProps> = (props) => {
  return (
    <div className="relative cursor-pointer bg-white w-[154px] h-[154px] rounded-xl p-1 bg- ">
      <div className="bg-primary-gradient flex justify-center items-center w-full h-full rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
        >
          <path
            d="M53.8266 18.2016L23.8266 48.2016C23.6525 48.376 23.4457 48.5143 23.2181 48.6086C22.9905 48.703 22.7465 48.7515 22.5001 48.7515C22.2537 48.7515 22.0097 48.703 21.7821 48.6086C21.5544 48.5143 21.3476 48.376 21.1735 48.2016L8.0485 35.0766C7.69668 34.7248 7.49902 34.2476 7.49902 33.7501C7.49902 33.2525 7.69668 32.7753 8.0485 32.4235C8.40033 32.0717 8.87751 31.874 9.37507 31.874C9.87262 31.874 10.3498 32.0717 10.7016 32.4235L22.5001 44.2243L51.1735 15.5485C51.5253 15.1967 52.0025 14.999 52.5001 14.999C52.9976 14.999 53.4748 15.1967 53.8266 15.5485C54.1785 15.9003 54.3761 16.3775 54.3761 16.8751C54.3761 17.3726 54.1785 17.8498 53.8266 18.2016Z"
            fill="#F9FAFB"
          />
        </svg>
      </div>
    </div>
  );
};

export default CorrectTick;
