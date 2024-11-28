'use client' 
import Link from "next/link"; 
import { usePathname } from "next/navigation";

const NavBar = () => { 

    const currentPath = usePathname() 

    const routes = <>
        <li><Link href='/' className={`${currentPath === '/' ? 'text-sky-500 border-b-2 border-sky-400 rounded-md' : ''} font-bold px-2 py-1`}>Home</Link></li>
        <li><Link href='/manage-task' className={`${currentPath === '/manage-task' ? 'text-sky-500  border-b-2 border-sky-400 rounded-md' : ''} font-bold px-2 py-1`}>Manage Task</Link></li> 
    </>;



    return (
        <div className="shadow-md border-b fixed z-10 w-full top-0">
            <nav className="container mx-auto bg-background px-3 py-4">
                 <ul className="flex justify-center items-center gap-6">
                    {routes}
                 </ul>
            </nav> 
        </div>
    );
};

export default NavBar;