import React from 'react';
import Link from 'next/link';
import CADProjectCard from "~/app/_components/CADProjectCard";
import { CardBadges } from "~/app/_components/CardBadges";

// const Projects: React.FC = () => {
export default function Page() {
    return(
        <div className="z-0 flex flex-wrap">
            <Link href="/3dModeling/speakerCeilingMount" className="m-10">
                <CADProjectCard
                    stlFileLocation={"./stlModels/B&WFPM5CenterSpeakerCeilingMount.stl"}
                    cameraFoV={90}
                    cardTitle={"Speaker and Ceiling Mount"}
                    cardText={"This is a custom designed ceiling mount for the center B&W FPM5 speaker in my home theater."}
                    cardBadges={[CardBadges.sheetMetal, CardBadges.modeling]}
                />
            </Link>
            <Link href="/3dModeling/cinemaQuadFrame" className="m-10">
                <CADProjectCard
                    stlFileLocation={"./stlModels/CinemaQuadFrame.stl"}
                    cameraFoV={90}
                    cardTitle={"Concept Cinema Quad Frame"}
                    cardText={"This is a concept for a 7\" quad which is intended to have a tilting control for the camera on the front of the frame, to allow for shooting videos which would otherwise not be possible."}
                    cardBadges={[CardBadges.modeling, CardBadges.fpv]}
                />
            </Link>
            <Link href="/3dModeling/BikeComputerMount" className="m-10">
                <CADProjectCard
                    stlFileLocation={"./stlModels/BikeComputerMount.stl"}
                    cameraFoV={90}
                    cardTitle={"Custom Cycling Computer Mount"}
                    cardText={"This is a custom cycling computer mount that mounts on my one piece integrated handlebars and takes a standard Garmin insert to hold the computer securely in place."}
                    cardBadges={[CardBadges.modeling, CardBadges.printing]}
                />
            </Link>
            <Link href="/3dModeling/modifiedDactyl" className="m-10">
                <CADProjectCard
                    stlFileLocation={"./stlModels/ModifiedDactyl.stl"}
                    cameraFoV={90}
                    cardTitle={"Modified Dactyl"}
                    cardText={"This is a modified Dactyl I made, because I wanted to generate an easily modifiable CAD file, rather than the typical STLs that have been available for other Dactyls."}
                    cardBadges={[CardBadges.modeling, CardBadges.keyboards]}
                />
            </Link>
            <Link href="/3dModeling/randomCrystalThing" className="m-10">
                <CADProjectCard
                    stlFileLocation={"./stlModels/RandomCrystalThing.stl"}
                    cameraFoV={90}
                    cardTitle={"Crystal Thing"}
                    cardText={"I was just having fun in CAD for this one. There's no point or purpose, but I think it looks cool."}
                    cardBadges={[CardBadges.modeling]}
                />
            </Link>
        </div>
    )
}

// export default Projects;