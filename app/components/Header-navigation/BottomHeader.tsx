
import Link from "next/link";
import SideNavigation from "./SideNavigation";
import All from "./All";
import SearchInput from "./SearchInput";

const BottomHeader = ({product}:any) => {

  return (
    <div className="w-full h-10 bg-black text-sm text-neutral-content px-4 flex items-center">
      <SideNavigation />
      <p className=" text-white hidden md:inline-flex items-center h-8 px-2 border border-transparent
       hover:border-white cursor-pointer duration-300 ">
      <Link href={`/search?discount>`} >
       Ofertas
      </Link>
      </p>
      <p className="text-white hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        <Link href="/customer">
          Servicio al Cliente
        </Link>
      </p>
      <p className="text-white hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
      <Link href={`/products/557`} >
        Socio Milproveedores
      </Link>
      </p>
     
    </div>
  );
};

export default BottomHeader;
