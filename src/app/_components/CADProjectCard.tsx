import React from 'react';
import ThreeScene from "~/app/_components/ThreeScene";

interface CADProjectCard {
    stlFileLocation: string;
    cameraFoV: number;
    cardTitle: string;
    cardText: string;
}

const CADProjectCard: React.FC<CADProjectCard> = ({ stlFileLocation, cameraFoV, cardTitle, cardText }) => {
    return(
        <div className="card w-96 bg-base-100 shadow-xl z-0">
            <figure className="h-1/2 z-0"><ThreeScene stlFileLocation={stlFileLocation} cameraFoV={cameraFoV}/></figure>
            <div className="h-1/2 card-body z-0">
                <h2 className="card-title text-black z-0">{cardTitle}</h2>
                <p className="text-black z-0">{cardText}</p>
            </div>
        </div>
    );
}

export default CADProjectCard;