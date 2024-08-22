"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { Bell, LogOut, Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Navbar = () => {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector(
        (state) => state.global.isSidebarCollapsed
    );
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleSidebar = () => {
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    };

    const toggleDarkMode = () => {
        dispatch(setIsDarkMode(!isDarkMode));
    };

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsClicked(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);


    return (
        <div className="flex justify-between items-center w-full mb-7">
            {/* LEFT SIDE */}
            <div className="flex justify-between items-center gap-5">
                <button
                    className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
                    onClick={toggleSidebar}
                >
                    <Menu className="w-4 h-4" />
                </button>

                <div className="relative">
                    <input
                        type="search"
                        placeholder="Start typing to search groups & products"
                        className="pl-10 pr-4 py-2 w-60 md:w-[290px] border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="text-gray-500" size={20} />
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex justify-between items-center gap-5">
                <div className="hidden md:flex justify-between items-center gap-5">
                    <button onClick={toggleDarkMode}>
                        {isDarkMode ? (
                            <Sun className="cursor-pointer text-gray-500" size={24} />
                        ) : (
                            <Moon className="cursor-pointer text-gray-500" size={24} />
                        )}
                    </button>
                    <div className="relative">
                        <Bell className="cursor-pointer text-gray-500" size={24} />
                        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
                            3
                        </span>
                    </div>
                    <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
                    <div
                        className="flex items-center gap-3 cursor-pointer relative"
                        onClick={() => setIsClicked(!isClicked)}
                        ref={dropdownRef}
                    >
                        <Image
                            src="https://s3-inv-management.s3.ap-south-1.amazonaws.com/profile.jpg"
                            alt="Profile"
                            width={40}
                            height={40}
                            className="rounded-full h-full object-cover"
                        />
                        <span className="font-semibold ">Shahrier</span>
                        {isClicked && (
                            <div
                                className={`absolute top-14 right-0 w-52 z-10 bg-white shadow-lg p-4 rounded-md flex flex-col gap-3 transition-all duration-300 ease-in ${isClicked ? "opacity-100" : "opacity-0"
                                    }`}
                                role="menu"
                                aria-labelledby="profile-menu"
                            >
                                <Link
                                    href={"/account"}
                                    className=" text-sm font-medium cursor-pointer text-gray-500 hover:text-blue-500 transition-colors duration-200 ease-in"
                                    role="menuitem"
                                >
                                    Account
                                </Link>
                                <hr />
                                <Link
                                    href={"/store"}
                                    className="text-sm font-medium cursor-pointer text-gray-500 hover:text-blue-500 transition-colors duration-200 ease-in"
                                    role="menuitem"
                                >
                                    Store
                                </Link>
                                <hr />
                                <Link
                                    href={"/faq"}
                                    className="text-sm font-medium cursor-pointer text-gray-500 hover:text-blue-500 transition-colors duration-200 ease-in"
                                    role="menuitem"
                                >
                                    FAQ
                                </Link>
                                <hr />
                                <Link
                                    href={"/policy"}
                                    className="text-sm font-medium cursor-pointer text-gray-500 hover:text-blue-500 transition-colors duration-200 ease-in"
                                    role="menuitem"
                                >
                                    Privacy & Policies
                                </Link>
                                <hr />
                                <Link
                                    href={"/help"}
                                    className="text-sm font-medium cursor-pointer text-gray-500 hover:text-blue-500 transition-colors duration-200 ease-in"
                                    role="menuitem"
                                >
                                    Helpline
                                </Link>
                                <hr />
                                <button
                                    className="text-sm font-medium text-blue-500 cursor-pointer"
                                    role="menuitem"
                                    onClick={() => { }}
                                >
                                    <div className="flex items-center gap-2">
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <Link href="/settings">
                    <Settings className="cursor-pointer text-gray-500" size={24} />
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
