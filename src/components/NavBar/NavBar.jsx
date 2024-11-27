'use client'
import { SlMenu } from "react-icons/sl";
import { AiOutlineClose } from 'react-icons/ai';
import { LiaTimesSolid } from 'react-icons/lia';
import { MdLogout } from "react-icons/md"; 
import Avatar from 'react-avatar';
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const NavBar = () => {

    const [profile, setProfile] = useState(false);
    const [user] = useState(true)
    const [click, setClick] = useState(false);
    const currentPath = usePathname()


    const handleClick = () => setClick(!click);
    const closeMenu = () => {
        setClick(false);
        setProfile(false);
    };



    const routes = <>
        <li><Link href='/' className={`${currentPath === '/' ? 'text-sky-500 px-2 py-1 border-b-2 border-sky-400 rounded-md' : ''} font-bold`}>Home</Link></li>


    </>;



    return (
        <div className="shadow-md border-b fixed z-10 w-full top-0">
            <nav className="container mx-auto bg-background">
                <div className='container mx-auto flex justify-between items-center'>

                    {/* Left Section - Logo */}
                    <div className="flex items-center p-2">
                        <div className="flex gap-5 lg:gap-10 justify-start items-center">
                            {/* Burger Icon: visible only on mobile and medium screens */}
                            <div className="lg:hidden mt-1" onClick={handleClick}>
                                {click ? (
                                    <AiOutlineClose className="text-2xl lg:text-3xl cursor-pointer" />
                                ) : (
                                    <SlMenu className="text-2xl lg:text-3xl cursor-pointer" />
                                )}
                            </div>
                            <Link href='/'>
                                <p title="Home" className="text-3xl font-bold">
                                    <span className="text-sky-500">Create</span><span
                                        className="">Task</span></p>
                            </Link>
                        </div>
                    </div>

                    {/* Center Menu Items (visible only on large screens) */}
                    <ul className="hidden lg:flex space-x-8 items-center justify-center w-full mx-auto font-medium">
                        {routes}
                    </ul>

                    {/* Right Section - User Info */}
                    <div className="flex items-center">
                        {/* user image & button  */}
                        {
                            user ?
                                <div className="mr-2 lg:mr-6">
                                    <div className="relative">


                                        <div className="flex justify-center items-center border-black rounded-full mt-1">
                                            {/* <img src={photo} alt="user image" onClick={() => setProfile(!profile)} /> */}
                                            <Avatar
                                                // name={name?.charAt(0)}
                                                src={'photo'} alt='img' className="rounded-full" size="45" onClick={() => setProfile(!profile)}></Avatar>
                                        </div>

                                        <ul className={`absolute  space-y-5  ${profile ? 'bg-background  shadow-lg border md:min-w-32 px-3 py-2 z-[99]  rounded-md right-1  md:right-0' : 'hidden'}`}>
                                            <div className="space-y-1 py-4">
                                                <p className="text-sm font-medium">{name}</p>
                                                <div className="divider"></div>
                                                {/* <Link to='/profile' onClick={() => window.scrollTo({
                                                    top: 0,
                                                    behavior: "smooth", // Smooth scroll animation
                                                })}> <li onClick={() => setProfile(!profile)} className="flex gap-1 items-center text-sm hover:bg-background px-1  py-1 rounded-md"><span><PiUserCircleThin></PiUserCircleThin></span>Profile</li></Link> */}
                                                <button
                                                    // onClick={() => logOut()}
                                                    className="text-sm w-full flex gap-1 items-center text-red-400 hover:bg-background px-1 py-1 rounded-md">LogOut <MdLogout></MdLogout></button>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                : <div className="px-5">
                                    <Link href='/loginRegister/login' className="px-3 py-1 rounded-md font-bold max-sm:btn-sm text-orange-500 border border-orange-500 hover:shadow-md">Login</Link>
                                </div>
                        }
                    </div>
                </div>
            </nav>

            {/* Burger Menu Items (visible only on smaller screens) */}
            <div
                className={`fixed top-0 left-0 w-[250px] h-full bg-background transition-transform duration-500 ease-in-out z-50 ${click ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}
            >
                <div className="sticky top-0 bg-background px-4 py-2 md:py-[11px] border-b border-gray-700">
                    <div className="flex justify-between items-center">
                    <p title="Home" className="text-3xl font-bold mb-0">
                                    <span className="text-sky-500">Create</span><span
                                        className="">Task</span></p>
                        <a onClick={closeMenu} className="hover:text-pink-500 cursor-pointer border-2">
                            <LiaTimesSolid className="text-xl lg:text-2xl cursor-pointer" />
                        </a>
                    </div>
                </div>

                {/* Scrollable Content with Hidden Scrollbar */}
                <ul className="overflow-y-scroll px-4 space-y-4 font-medium" style={{ maxHeight: 'calc(100vh - 64px)' }}>
                    <style >{`ul::-webkit-scrollbar { display: none; }`}</style>
                    {routes}
                </ul>
            </div>

            {/* Overlay when burger menu is open */}
            {click && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={closeMenu}></div>
            )}
        </div>
    );
};

export default NavBar;