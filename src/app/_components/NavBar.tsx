import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import { AiFillBook, AiFillLinkedin, AiFillGithub } from "rocketicons/ai";
import ProfilePic from '../../../public/Profile Photo.jpg'

export default function NavBar() {

    return(
        <div className="navbar bg-neutral z-50">
            <div className="navbar-start">
                <Link href="/"><div className="btn btn-ghost text-xl">KamiHobbies</div></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link href="/software" className="btn btn-ghost">Software</Link>
                    </li>
                    <li>
                        <Link href="/hardware" className="btn btn-ghost">Hardware</Link>
                    </li>
                    <li>
                        <Link href="/3dModeling" className="btn btn-ghost">3D Modeling</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="avatar">
                        <div className="rounded w-16">
                            <Image src={ ProfilePic }
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
                                <AiFillBook className="icon-accent icon-lg"/> About Me
                            </Link>
                            <Link href="https://www.linkedin.com/in/kaminskikeving/" passHref legacyBehavior>
                                <a target="_blank">
                                    <AiFillLinkedin className="icon-accent icon-lg"/> LinkedIn
                                </a>
                            </Link>
                            <Link href="https://github.com/KaminKevCrew" passHref legacyBehavior>
                                <a target="_blank">
                                    <AiFillGithub className="icon-accent icon-lg"/> Github
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}