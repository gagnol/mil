
import Link from "next/link";
import SideNavigation from "./SideNavigation";
import All from "./All";
import SearchInput from "./SearchInput";

const BottomHeader = ({product}:any) => {

  return (
    <div className="w-full h-10 bg-base-100 text-sm text-neutral-content px-4 flex items-center">
      <SideNavigation />
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
      <Link href={`/search?discount>`} >
       Today Deals
        </Link>
      </p>
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        <Link href="/customer">
          Customer Service
        </Link>
      </p>
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        <Link href="/register">
          Registry
        </Link>
      </p>
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
      <Link href={`/products/557`} >
        Gift Cards
        </Link>
      </p>
     
    </div>
  );
};

export default BottomHeader;
