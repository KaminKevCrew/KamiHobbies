import React from 'react';
import Link from 'next/link';
import {AiFillGithub} from "rocketicons/ai";

export default function TeensyHomeTheaterControl() {

    return(
        <div>
            <p>Hi there, you're in the Teensy Home Theater Control Page.</p>
            <Link href="https://github.com/KaminKevCrew" passHref legacyBehavior>
                <a target="_blank">
                    <AiFillGithub className="icon-accent icon-lg"/> <button className="btn btn-primary">Github</button>
                </a>
            </Link>
        </div>
    )
}