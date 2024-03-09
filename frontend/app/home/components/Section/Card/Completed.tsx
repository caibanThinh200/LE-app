"use client";

import Image from "next/image";
import { ILessonCardProps } from ".";
import Link from "next/link";

const Completed: React.FC<ILessonCardProps> = (props) => {
  return (
    <div
      key={props.index}
      className="rounded-xl text-independence border border-bright-gray p-6 relative overflow-hidden"
    >
      <div className="flex relative z-30">
        <div className="flex-2 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-bold text-independence">
                {props.section.title}
              </p>
            </div>
            <p className="bg-primary-gradient bg-clip-text text-transparent flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M14.2806 7.21937C14.3504 7.28903 14.4057 7.37175 14.4434 7.46279C14.4812 7.55384 14.5006 7.65144 14.5006 7.75C14.5006 7.84856 14.4812 7.94616 14.4434 8.03721C14.4057 8.12825 14.3504 8.21097 14.2806 8.28063L9.03063 13.5306C8.96098 13.6004 8.87826 13.6557 8.78721 13.6934C8.69616 13.7312 8.59857 13.7506 8.50001 13.7506C8.40145 13.7506 8.30385 13.7312 8.2128 13.6934C8.12175 13.6557 8.03904 13.6004 7.96938 13.5306L5.71938 11.2806C5.57865 11.1399 5.49959 10.949 5.49959 10.75C5.49959 10.551 5.57865 10.3601 5.71938 10.2194C5.86011 10.0786 6.05098 9.99958 6.25001 9.99958C6.44903 9.99958 6.6399 10.0786 6.78063 10.2194L8.50001 11.9397L13.2194 7.21937C13.289 7.14964 13.3718 7.09432 13.4628 7.05658C13.5539 7.01884 13.6514 6.99941 13.75 6.99941C13.8486 6.99941 13.9462 7.01884 14.0372 7.05658C14.1283 7.09432 14.211 7.14964 14.2806 7.21937ZM19.75 10C19.75 11.9284 19.1782 13.8134 18.1068 15.4168C17.0355 17.0202 15.5128 18.2699 13.7312 19.0078C11.9496 19.7458 9.98919 19.9389 8.09788 19.5627C6.20656 19.1865 4.46928 18.2579 3.10571 16.8943C1.74215 15.5307 0.813554 13.7934 0.437348 11.9021C0.0611419 10.0108 0.254225 8.05042 0.992179 6.26884C1.73013 4.48726 2.97982 2.96451 4.5832 1.89317C6.18658 0.821828 8.07164 0.25 10 0.25C12.585 0.25273 15.0634 1.28084 16.8913 3.10872C18.7192 4.93661 19.7473 7.41498 19.75 10ZM18.25 10C18.25 8.3683 17.7662 6.77325 16.8596 5.41655C15.9531 4.05984 14.6646 3.00242 13.1571 2.37799C11.6497 1.75357 9.99086 1.59019 8.39051 1.90852C6.79017 2.22685 5.32016 3.01259 4.16638 4.16637C3.01259 5.32015 2.22685 6.79016 1.90853 8.3905C1.5902 9.99085 1.75358 11.6496 2.378 13.1571C3.00242 14.6646 4.05985 15.9531 5.41655 16.8596C6.77326 17.7661 8.36831 18.25 10 18.25C12.1873 18.2475 14.2843 17.3775 15.8309 15.8309C17.3775 14.2843 18.2475 12.1873 18.25 10Z"
                  fill="url(#paint0_linear_963_659)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_963_659"
                    x1="10"
                    y1="0.25"
                    x2="10"
                    y2="19.75"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#2AB032" />
                    <stop offset="1" stop-color="#109C59" />
                  </linearGradient>
                </defs>
              </svg>
              Đã hoàn thành
            </p>
          </div>
          <div>
            <Link
              href={`/lesson/${props.section._id}`}
              className="border border-primary-green rounded-full py-3 px-6 font-bold text-primary-green"
            >
              Chơi lại
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 w-[70%] h-full z-10 from-white from-[70%] bg-gradient-to-r"></div>
      <div className="absolute inset-0 w-full h-full">
        <Image
          className="w-1/2 ml-auto lg:h-[250px] object-cover object-left"
          src={props.section.logo?.fileName as string}
          alt={props.section.logo?.fileName as string}
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default Completed;
