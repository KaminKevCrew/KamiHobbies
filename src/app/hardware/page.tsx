import React from 'react';
import Link from 'next/link';
import ProjectCard from "~/app/_components/ProjectCard";
import ProjectCardWithImage from "~/app/_components/ProjectCardWithImage";
import PCBScreenshot from '../../../public/hardwarePhotos/PCB Screenshot Example.png'
import LEDControllerScreenshot from '../../../public/hardwarePhotos/LEDControllerScreenshot.png'
import {CardBadges} from "~/app/_components/CardBadges";

export default function Hardware() {

    return(
        <div className="z-0 flex flex-wrap justify-center">
            <Link href="/hardware/ledLightGuide" className="m-10">
                <ProjectCardWithImage
                    cardImage={ PCBScreenshot }
                    cardImageAlt="Screenshot of LED PCB"
                    cardTitle="LED Light Guides"
                    cardText="Series of projects dedicated to creating sharp, LED based custom displays."
                    cardBadges={[CardBadges.pcbDesign, CardBadges.printing, CardBadges.hardware]}
                />
            </Link>
            <Link href="/hardware/ledController" className="m-10">
                <ProjectCardWithImage
                    cardImage={ LEDControllerScreenshot }
                    cardImageAlt="Screenshot of LED Controller PCB"
                    cardTitle="LED Controller"
                    cardText="Custom PCB designed to control ARGB LEDs."
                    cardBadges={[CardBadges.arduino, CardBadges.pcbDesign, CardBadges.hardware]}
                />
            </Link>
        </div>
    )
}