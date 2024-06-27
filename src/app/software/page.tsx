import React from 'react';
import Link from 'next/link';
import ProjectCard from "~/app/_components/ProjectCard";
import {CardBadges} from "~/app/_components/cardBadges";

export default function Software() {

    return(
        <div className="z-0 flex flex-wrap">
            <Link href="/software/irrationalArt" className="m-10">
                <ProjectCard
                    cardImageUrl="/softwarePhotos/IrrationalArt500DigitsOfE.png"
                    cardImageAlt="500 Digits of E"
                    cardTitle="Irrational Art"
                    cardText="A 2D mapper of decimal digits, mapped to a unit circle."
                    cardBadges={[CardBadges.javascript, CardBadges.software]}
                />
            </Link>
            <Link href="/software/teensyHomeTheaterControl" className="m-10">
                <ProjectCard
                    cardImageUrl=""
                    cardImageAlt="Teensy hardware implementation"
                    cardTitle="Teensy Home Theater Control"
                    cardText="A custom project that uses a Teensy to control my home theater via serial commands and
                        http requests."
                    cardBadges={[CardBadges.arduino, CardBadges.serial, CardBadges.python, CardBadges.software]}
                />
            </Link>
            <Link href="/software/customFIController" className="m-10">
                <ProjectCard
                    cardImageUrl=""
                    cardImageAlt="Focus Iris controller hardware implementation"
                    cardTitle="Remote Control Focus Iris Lens Controller"
                    cardText="Remote Controllable focus and iris for any lens. Utilizes Maxon motors, MP6550 DC Motor
                    Controllers, Teensy 4.0 for hardware, and Arduino Encoder and PID libraries."
                    cardBadges={[CardBadges.arduino, CardBadges.closedLoop, CardBadges.printing, CardBadges.software]}
                />
            </Link>
        </div>
    )
}