import Image from "next/image";
import { ILessonCardProps } from ".";
import Link from "next/link";

const Pending: React.FC<ILessonCardProps> = (props) => {
  return (
    <div
      key={props.index}
      className="rounded-xl text-independence border border-bright-gray p-6 bg-light-silver"
    >
      <div className="flex">
        <div className="flex-2 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-bold">
                Bài tập {props.index + 1}: {props.section.title}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19.5 7.5H16.5V5.25C16.5 4.05653 16.0259 2.91193 15.182 2.06802C14.3381 1.22411 13.1935 0.75 12 0.75C10.8065 0.75 9.66194 1.22411 8.81802 2.06802C7.97411 2.91193 7.5 4.05653 7.5 5.25V7.5H4.5C4.10218 7.5 3.72064 7.65804 3.43934 7.93934C3.15804 8.22064 3 8.60218 3 9V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V9C21 8.60218 20.842 8.22064 20.5607 7.93934C20.2794 7.65804 19.8978 7.5 19.5 7.5ZM9 5.25C9 4.45435 9.31607 3.69129 9.87868 3.12868C10.4413 2.56607 11.2044 2.25 12 2.25C12.7957 2.25 13.5587 2.56607 14.1213 3.12868C14.6839 3.69129 15 4.45435 15 5.25V7.5H9V5.25ZM19.5 19.5H4.5V9H19.5V19.5ZM13.125 14.25C13.125 14.4725 13.059 14.69 12.9354 14.875C12.8118 15.06 12.6361 15.2042 12.4305 15.2894C12.225 15.3745 11.9988 15.3968 11.7805 15.3534C11.5623 15.31 11.3618 15.2028 11.2045 15.0455C11.0472 14.8882 10.94 14.6877 10.8966 14.4695C10.8532 14.2512 10.8755 14.025 10.9606 13.8195C11.0458 13.6139 11.19 13.4382 11.375 13.3146C11.56 13.191 11.7775 13.125 12 13.125C12.2984 13.125 12.5845 13.2435 12.7955 13.4545C13.0065 13.6655 13.125 13.9516 13.125 14.25Z"
                    fill="#374151"
                  />
                </svg>
              </div>
              <p>20 bài</p>
            </div>
          </div>
          <div>
            <Link href={"/lesson/123"} className="border border-primary-green rounded-full py-2 px-6 font-bold text-independence bg-white">
              Tiếp tục
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Image
            src={props.section.image}
            alt={props.section.image}
            width={124}
            height={124}
          />
        </div>
      </div>
    </div>
  );
};

export default Pending;
