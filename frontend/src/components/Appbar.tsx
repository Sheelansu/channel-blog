import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"
import logo from "../assets/logo.svg";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

interface AppbarProps{
    userName: string;
}

export const Appbar = ({userName}: AppbarProps) => {
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
                <img
                    src={logo}
                    alt="My Blog Logo"
                    className="h-10 w-auto"
                />
        </Link>
        <div className="flex">
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>

            {/* <Avatar size={"big"} name={userName} /> */}
            <div>
                <Menu as="div" className="relative ml-3">
                            <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <Avatar size={"big"} name={userName} />
                            </MenuButton>
                
                            <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                            >
                            <MenuItem>
                                <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                                >
                                Your profile
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                                >
                                Settings
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                href="/signup"
                                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                                onClick={ClearData}
                                >
                                Sign out
                                </a>
                            </MenuItem>
                            </MenuItems>
                        </Menu>
            </div>
            
        </div>
    </div>
}

function ClearData(){
    localStorage.removeItem('token');
    localStorage.removeItem('refresht');
}