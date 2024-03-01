import Image from "next/image";
import styles from "./rightbar.module.css";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";

const Rightbar = () => {
  return (
    <div className="border-l-2 border-neutral-500">
      <div className="p-5 border-md mb-5 relative">
        <div className="absolute right-0 bottom-0 w-[50%] h-[100%]">
        
        </div>
        <div className="flex flex-col gap-6">
          <span className="font-bold"> Available Now</span>
          <h3 >
            How to use the new version of the admin dashboard?
          </h3>
          <span className="text-[12px]">Takes 4 minutes to learn</span>
          <p className="text-[14px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
          <button className="btn btn-primary btn-outline">
            <MdPlayCircleFilled />
            Watch
          </button>
        </div>
      </div>
      <div className="p-5 border-md mb-5 relative">
        <div className="flex flex-col gap-6">
          <span className="font-bold">Coming Soon</span>
          <h3 >
            New server actions are available, partial pre-rendering is coming
            up!
          </h3>
          <span className="text-[12px]" >Boost your productivity</span>
          <p className="text-[14px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
          <button className="btn btn-primary btn-outline">
            <MdReadMore />
            Learn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
