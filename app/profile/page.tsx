
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import dbConnect from "@/lib/db-connect";
import OrderModel from "@/lib/order-model"
import UserModel from "@/lib/user-model"
import UserUpdate from "../components/User-navigation/update-user"
import Uploadfile from "../components/User-navigation/uploadfile"
import Link from 'next/link';
import { MdAttachMoney, MdFavorite, MdOutlineChat } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";

const menuItems = [
    {
        title: "Páginas",
        list: [
            {
                title: "Servicio al cliente",
                path: "/customer",
                icon: <RiCustomerService2Line />,
            },
            {
                title: "Favoritos",
                path: "/favorite",
                icon: <MdFavorite />,
            },
           
            {
                title: "Compras",
                path: "/orders",
                icon: <MdAttachMoney />,
            },
        ],
    },
];


export default async function ProfileScreen() {

    const session = await getServerSession();

    if (!session?.user) {
        redirect("/signin")
    }

    await dbConnect();

    const orderDocs = (await OrderModel.find({ userId: session.user.name }).sort({
        _id: -1,
    }))
    const orders = JSON.parse(JSON.stringify(orderDocs));

    const userDocs = (await UserModel.findOne({ email: session.user.email }))
    const users = JSON.parse(JSON.stringify(userDocs));


    return (
        <div className="grid md:grid-cols-4 md:gap-5 text-white">
            <div className='mx-4 my-5 border-r-[1px] '>
                <h1 className=" text-xl font-bold text-center">Tu cuenta</h1>
                <h2 className="font-semibold text-center">&nbsp;{session?.user?.name}</h2>
                <h2 className=" xl:block text-center font-semibold md:hidden  ">&nbsp;{session?.user?.email} </h2>

                <Image className="mx-auto" src={users.image || "/noavatar.png"} alt=''
                    width={100} height={100} priority style={{ width: 100, height: "auto" }} />
                <Uploadfile users={users} />
                <ul className="list-none">
                    {menuItems.map((item) => (
                        <li key={item.title}>
                            <span className="font-bold mx-5 text-[13px]">{item.title}</span>
                            {item.list.map((item) => (
                                <div key={item.title}>
                                    <Link href={item.path} >
                                        <div className=" flex gap-2 my-5 hover:text-primary">
                                            <span className="text-primary text-[22px]">{item.icon}</span>
                                            {item.title}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="md:col-span-3">
                <UserUpdate session={session} />
                <div className="my-5 rounded-md text-white">
                    <h2 className=" text-xl">Últimas Transacciones</h2>
                    <table className="table text-center">
                        <thead>
                            <tr className="bg-black text-white">
                                <th>Producto</th>
                                <th>Comprador</th>
                                <th>Precio</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={5}>No se encontraron órdenes</td>
                                </tr>
                            ) : (
                                orders.map((item: any) => (
                                    <tr key={item._id}>
                                        <td>
                                            <Image
                                                src={item.productImage[0]}
                                                alt=""
                                                width={50}
                                                height={50}
                                                className="rounded-lg max-w-[50px] max-h-[50px] min-h-[50px]"
                                            />
                                        </td>
                                        <td className='text-white'>{item.userId}</td>
                                        <td className='text-bold'>€{item.totalAmount}</td>
                                        <td>
                                            {new Date(item.createdAt.substring(0, 10)).toLocaleDateString(
                                                'es-ES',
                                                {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                }
                                            )}
                                        </td>
                                        <td>
                                            {item.orderStatus}
                                        </td>
                                    </tr>
                                ))
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}


