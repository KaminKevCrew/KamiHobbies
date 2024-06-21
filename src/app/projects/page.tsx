import React from 'react';
import CADProjectCard from "~/app/_components/CADProjectCard";

// const Projects: React.FC = () => {
export default function Page() {
    return(
        <div>
            <CADProjectCard
                stlFileLocation={"/stlModels/B&WFPM5CenterSpeakerCeilingMount.stl"}
                cameraFoV={90}
                cardTitle={"Speaker and Ceiling Mount"}
                cardText={"This is a custom designed ceiling mount for the center B&W FPM5 speaker in my home theater."}
            />
            <CADProjectCard
                stlFileLocation={"/stlModels/CinemaQuadFrame.stl"}
                cameraFoV={90}
                cardTitle={"Concept Cinema Quad Frame"}
                cardText={"This is a concept for a 7\" quad which is intended to have a tilting control for the camera on the front of the frame, to allow for shooting videos which would otherwise not be possible."}
            />
            <CADProjectCard
                stlFileLocation={"/stlModels/BikeComputerMount.stl"}
                cameraFoV={90}
                cardTitle={"Custom Cycling Computer Mount"}
                cardText={"This is a custom cycling computer mount that mounts on my one piece integrated handlebars and takes a standard Garmin insert to hold the computer securely in place."}
            />
            <CADProjectCard
                stlFileLocation={"/stlModels/ModifiedDactyl.stl"}
                cameraFoV={90}
                cardTitle={"Modified Dactyl"}
                cardText={"This is a modified Dactyl I made, because I wanted to generate an easily modifiable CAD file, rather than the typical STLs that have been available for other Dactyls."}
            />
            <CADProjectCard
                stlFileLocation={"/stlModels/RandomCrystalThing.stl"}
                cameraFoV={90}
                cardTitle={"Crystal Thing"}
                cardText={"I was just having fun in CAD for this one. There's no point or purpose, but I think it looks cool."}
            />
        </div>
    )
}

// export default Projects;