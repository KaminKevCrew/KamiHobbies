import React from 'react';
import Image from 'next/image';
import Link from "next/link";

export default function NavBar() {

    return(
        <div className="navbar bg-base-100 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <Link href="/"><div className="btn btn-ghost text-xl">KamiHobbies</div></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <details>
                            <summary tabIndex={0} role="button" className="dropdown">Software</summary>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>Home Theater Control</a></li>
                                <li><a>Irrational Art</a></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary  tabIndex={1} role="button" className="dropdown">Hardware</summary>
                            <ul tabIndex={1} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>LED Boards</a></li>
                                <li><a>Teensy Breakout</a></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary  tabIndex={2} role="button" className="dropdown">3D Modeling</summary>
                            <ul tabIndex={2} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>Speaker and Ceiling Mount</a></li>
                                <li><a>Cinema Quad Frame</a></li>
                                <li><a>Cycling Computer Mount</a></li>
                                <li><a>Modified Dactyl</a></li>
                                <li><a>Crystal Thing</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="avatar">
                        <div className="rounded w-16">
                            <Image src="/Profile Photo.jpg"
                                   width={100}
                                   height={100}
                                   alt="Kevin Kaminski Profile Picture"/>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="menu dropdown-content card card-compact bg-primary text-primary-content z-[1] w-64 p-2 shadow">
                        <div className="card-body">
                            <h3 className="card-title">Kevin Kaminski</h3>
                            <Link href="/about">
                                    About Me
                            </Link>
                            <Link href="https://www.linkedin.com/in/kaminskikeving/" passHref legacyBehavior>
                                <a target="_blank">
                                    LinkedIn
                                </a>
                            </Link>
                            <Link href="https://github.com/KaminKevCrew" passHref legacyBehavior>
                                <a target="_blank">
                                    Github
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}