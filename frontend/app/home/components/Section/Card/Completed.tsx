"use client";

import Image from "next/image";
import { ILessonCardProps } from ".";
import Link from "next/link";

const Completed: React.FC<ILessonCardProps> = (props) => {
  return (
    <div
      key={props.index}
      className="rounded-xl text-independence border border-bright-gray p-6 bg-ghost-white"
    >
      <div className="flex">
        <div className="flex-2 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-bold">{props.section.title}</p>
            </div>
            <p className="bg-primary-gradient bg-clip-text text-transparent flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M14.0259 8.03546L5.62593 16.2855C5.48565 16.4234 5.29676 16.5008 5.09999 16.5008C4.90322 16.5008 4.71433 16.4234 4.57405 16.2855L0.974053 12.7501C0.903816 12.6811 0.847871 12.5989 0.809411 12.5082C0.770952 12.4175 0.750731 12.3201 0.749904 12.2216C0.749077 12.1231 0.76766 12.0254 0.804591 11.9341C0.841522 11.8428 0.896079 11.7596 0.965146 11.6894C1.03421 11.6191 1.11644 11.5632 1.20713 11.5247C1.29781 11.4863 1.39519 11.466 1.49369 11.4652C1.5922 11.4644 1.6899 11.483 1.78122 11.5199C1.87254 11.5568 1.95569 11.6114 2.02593 11.6805L5.09999 14.6992L12.975 6.96483C13.117 6.82534 13.3085 6.74797 13.5076 6.74973C13.6061 6.7506 13.7035 6.77087 13.7942 6.80938C13.8849 6.8479 13.9672 6.90391 14.0362 6.97421C14.1053 7.0445 14.1599 7.12772 14.1968 7.2191C14.2337 7.31047 14.2522 7.40823 14.2513 7.50677C14.2505 7.60532 14.2302 7.70273 14.1917 7.79344C14.1532 7.88415 14.0972 7.96639 14.0269 8.03546H14.0259ZM23.0353 6.97421C22.9663 6.90385 22.884 6.8478 22.7933 6.80925C22.7026 6.7707 22.6052 6.75041 22.5066 6.74954C22.4081 6.74867 22.3103 6.76724 22.2189 6.80418C22.1275 6.84112 22.0443 6.89571 21.9741 6.96483L14.0991 14.6992L12.3337 12.9648C12.1918 12.8255 12.0002 12.7482 11.8013 12.7501C11.6024 12.7519 11.4123 12.8327 11.273 12.9747C11.1336 13.1166 11.0563 13.3082 11.0582 13.5071C11.06 13.706 11.1408 13.8961 11.2828 14.0355L13.5731 16.2855C13.7134 16.4234 13.9023 16.5008 14.0991 16.5008C14.2958 16.5008 14.4847 16.4234 14.625 16.2855L23.025 8.03546C23.0954 7.96648 23.1515 7.8843 23.1902 7.79362C23.2288 7.70294 23.2492 7.60553 23.2501 7.50697C23.2511 7.40841 23.2326 7.31062 23.1958 7.2192C23.1589 7.12779 23.1044 7.04454 23.0353 6.97421Z"
                  fill="#0E9F6E"
                />
              </svg>
              Đã hoàn thành
            </p>
          </div>
          <div>
            <Link
              href={`/lesson/${props.section._id}`}
              className="border border-primary-green rounded-full py-2 px-6 font-bold text-independence"
            >
              Chơi lại
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Image
            src={props.section.logo?.fileName as string}
            alt={props.section.logo?.fileName as string}
            width={124}
            height={124}
          />
        </div>
      </div>
    </div>
  );
};

export default Completed;
