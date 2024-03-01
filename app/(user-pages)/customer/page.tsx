
import { getServerSession } from 'next-auth';
import Image from 'next/image'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

async function customer() {

    const session = await getServerSession();

    if (!session) {
        redirect("/signin")
    }
    return (
        <div className="max-w-screen-xl mx-auto px-6 gap-10 py-4">
            <header className="relative flex justify-between h-[60px] text-[16px] bg-neutral-800
            p-5 m-5">
                <div className="cs-title">
                    <a href="/hz/contact-us/foresight/hubgateway">Customer Service</a>
                </div><div className="text-primary">
                    <a href="/hz/contact-us/foresight/hubgateway">Home</a>
                </div>
                <div className="nav-item">
                    <a href="/gp/help/customer/display.html?nodeId=200127470" target="__blank">
                        Digital Services and Device Support</a>
                </div>
            </header>
            <div className="page-wrapper hero-banner">
                <div className="px-10">
                    <h1 className="text-2xl font-bold"  >
                        Welcome to Amazon Customer Service, {session?.user?.name || ""}</h1>
                    <p className="header-subtext subtext-container">
                        What would you like help with today?
                        You can quickly take care of most things here,
                        or connect with us when needed.
                        <a className="hidden-link"  >
                        </a>
                    </p>
                    <div className="grid md:grid-cols-3 md:gap-5 m-5">
                        <div className="flex  p-[12px] rounded-md bg-neutral-800">
                            <div className="flex mx-2 my-auto" role="button" >
                                <div className="flex mx-2 my-auto-icon">
                                    <Image width={120} height={120} src="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_order_v2.png" alt="" />
                                </div>
                                <div className="center flex mx-2 my-auto-detail">
                                    <div className="flex mx-2 my-auto-title full">A delivery, order or return
                                    </div></div></div></div>
                        <div className="flex  p-[12px] rounded-md bg-neutral-800">
                            <div className="flex mx-2 my-auto" role="button" >
                                <div className="flex mx-2 my-auto-icon">
                                    <Image width={120} height={120} src="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_device_v2.png" alt="" />
                                </div>
                                <div className="center flex mx-2 my-auto-detail"><div className="flex mx-2 my-auto-title full">
                                    Kindle, Fire, Alexa or other Amazon devices
                                </div></div></div></div>
                        <div className="flex  p-[12px] rounded-md bg-neutral-800">
                            <div className="flex mx-2 my-auto" role="button" >
                                <div className="flex mx-2 my-auto-icon">
                                    <Image width={120} height={120} src="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_dcontent_v3.png" alt="" />
                                </div>
                                <div className="center flex mx-2 my-auto-detail"><div className="flex mx-2 my-auto-title full">
                                    eBooks, Prime Videos, Music or Games
                                </div></div></div></div>
                        <div className="flex  p-[12px] rounded-md bg-neutral-800">
                            <div className="flex mx-2 my-auto" role="button" >
                                <div className="flex mx-2 my-auto-icon">
                                    <Image width={120} height={120} src="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_prime_v2.png" alt="" />
                                </div>
                                <div className="center flex mx-2 my-auto-detail"><div className="flex mx-2 my-auto-title full">
                                    Prime membership &amp; subscriptions
                                </div></div></div></div>
                        <div className="flex  p-[12px] rounded-md bg-neutral-800">
                            <div className="flex mx-2 my-auto" role="button" >
                                <div className="flex mx-2 my-auto-icon">
                                    <Image width={120} height={120} src="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_paymentgc_v2.png" alt="" />
                                </div>
                                <div className="center flex mx-2 my-auto-detail"><div className="flex mx-2 my-auto-title full">
                                    Payments, charges, or gift cards</div>
                                </div></div></div>
                        <div className="flex  p-[12px] rounded-md bg-neutral-800">
                            <div className="flex mx-2 my-auto" role="button" >
                                <div className="flex mx-2 my-auto-icon">
                                    <Image width={120} height={120} src="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_login_security_v2.png" alt="" />
                                </div>
                                <div className="center flex mx-2 my-auto-detail">
                                    <div className="flex mx-2 my-auto-title full">
                                        Login &amp; security, addresses, and data privacy
                                    </div></div></div></div>
                        <div className="flex  p-[12px] rounded-md bg-neutral-800">
                            <div className="flex mx-2 my-auto" role="button" >
                                <div className="flex mx-2 my-auto-icon">
                                    <Image width={120} height={120} src="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_account_v2.png" alt="" />
                                </div>
                                <div className="center flex mx-2 my-auto-detail">
                                    <div className="flex mx-2 my-auto-title full">
                                        Memberships, subscriptions, or communications
                                    </div></div></div></div>
                        <div className="flex  p-[12px] rounded-md bg-neutral-800">
                            <div className="flex mx-2 my-auto" role="button" >
                                <div className="flex mx-2 my-auto-icon">
                                    <Image width={120} height={120} src="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/accessibility.png" alt="" />
                                </div>
                                <div className="center flex mx-2 my-auto-detail">
                                    <div className="flex mx-2 my-auto-title full">
                                        Accessibility
                                    </div></div></div></div>
                        <div className="flex  p-[12px] rounded-md bg-neutral-800">
                            <div className="flex mx-2 my-auto" role="button" >
                                <div className="flex mx-2 my-auto-icon">
                                    <Image width={120} height={120} src="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_somethingelse_v3.png" alt="" />
                                </div>
                                <div className="center flex mx-2 my-auto-detail">
                                    <div className="flex mx-2 my-auto-title full">
                                        Something else
                                    </div></div></div></div>
                        <div className="flex  p-[12px] rounded-md bg-neutral-800">
                            <div className="flex mx-2 my-auto" role="button" >
                                <div className="flex mx-2 my-auto-icon">
                                    <Image width={120} height={120} src="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/suspicious-emails.png" alt="" />
                                </div>
                                <div className="center flex mx-2 my-auto-detail">
                                    <div className="flex mx-2 my-auto-title full">
                                        Report something suspicious
                                    </div></div></div></div></div></div></div>
            <div className="float-right hover:opacity-40 my-5" role="button" >
                <Link href="/chats">
                    <Image width={120} height={120}
                        className="continue-chat-img"
                        alt="Back to chat" src="https://m.media-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/fshub_continue_chat_icon.png" />
                </Link>


                <div className="continue-chat-text">Back to chat</div></div>
            <div className="max-w-screen-xl mx-auto px-6 gap-10 py-4 border-t">
                <div className="page-container">
                    <h2 className="m-10 text-xl font-bold">All help topics</h2>
                    <div className="flex ">
                        <div className="float-left mr-[45px]">
                            <ul className="block list-none mx-10">
                                <li className="min-h-[40px]  min-w-[227px] rounded-md flex relative">

                                    <label >Take Quick Actions</label>
                                </li>
                                <li className="min-h-[40px]  min-w-[227px] rounded-md flex relative">

                                    <label > Where s my stuff</label>
                                </li>
                                <li className="min-h-[40px]  min-w-[227px] rounded-md flex relative">

                                    <label >Shipping and Delivery</label>
                                </li>
                                <li className="min-h-[40px]  min-w-[227px] rounded-md flex relative">

                                    <label >Returns, Refunds and Product Support</label>
                                </li>
                                <li className="min-h-[40px]  min-w-[227px] rounded-md flex relative">

                                    <label >Managing Your Account</label>
                                </li>
                                <li className="min-h-[40px]  min-w-[227px] rounded-md flex relative">

                                    <label >Security &amp; Privacy</label>
                                </li>
                                <li className="min-h-[40px]  min-w-[227px] rounded-md flex relative">

                                    <label>Payment, Pricing and Promotions</label>
                                </li>
                                <li className="min-h-[40px]  min-w-[227px] rounded-md flex relative">

                                    <label >Devices &amp; Digital Solutions</label>
                                </li>
                                <li className="min-h-[40px]  min-w-[227px] rounded-md flex relative">

                                    <label >Amazon Business Accounts </label>
                                </li>
                                <li className="min-h-[40px]  min-w-[227px] rounded-md flex relative">

                                    <label >Large Items and Heavy-Bulky Services</label>
                                </li>
                                <li className="min-h-[40px]  min-w-[227px] rounded-md flex relative">

                                    <label >Other topics &amp; Help sites</label>
                                </li>
                            </ul>
                        </div>
                        <div className="grid md:grid-cols-2">
                            <div className="h-[94px] p-2 rounded-md bg-neutral-800  m-5">
                                <div className="flex mx-2 my-auto" role="button" >
                                    <div className="">
                                        <div className="font-bold text-lg">
                                            Track your package
                                        </div>
                                        <div className="text-[14px]">Track your packages in <b>Your Orders</b>.
                                        </div></div></div></div>
                            <div className="h-[94px] p-2 rounded-md bg-neutral-800  m-5">
                                <div className="" role="button" >
                                    <div className="">
                                        <div className="font-bold text-lg">
                                            Return Items You Ordered
                                        </div>
                                        <div className="text-[14px]">
                                            Return your orders using our <b>Online Return Center</b>.
                                        </div></div></div></div>
                            <div className="h-[94px] p-2 rounded-md bg-neutral-800  m-5">
                                <div className="" role="button" >
                                    <div className="">
                                        <div className="font-bold text-lg">
                                            Check status of a refund
                                        </div>
                                        <div className="text-[14px]">
                                            Track your return and refunds in <b>Your Orders</b>.
                                        </div></div></div></div>
                            <div className="h-[94px] p-2 rounded-md bg-neutral-800  m-5">
                                <div className="" role="button" >
                                    <div className="">
                                        <div className="font-bold text-lg">
                                            Update Your Password
                                        </div>
                                        <div className="text-[14px]">Update your password in <b>Your account</b>.
                                        </div></div></div></div>
                            <div className="h-[94px] p-2 rounded-md bg-neutral-800  m-5">
                                <div className="" role="button" >
                                    <div className="">
                                        <div className="font-bold text-lg">
                                            Amazon Prime
                                        </div>
                                        <div className="text-[14px]">
                                            Get detailed information on all Prime benefits.
                                        </div></div></div></div>
                            <div className="h-[94px] p-2 rounded-md bg-neutral-800  m-5">
                                <div className="" role="button" >
                                    <div className="">
                                        <div className="font-bold text-lg">
                                            End Your Amazon Prime Membership
                                        </div>
                                        <div className="text-[14px]">
                                            Cancel your membership easily via this page.
                                        </div></div></div></div>
                            <div className="new-row-break">
                            </div></div></div></div></div>
        </div>
    )
}

export default customer
