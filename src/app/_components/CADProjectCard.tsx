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
        <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure><ThreeScene stlFileLocation={stlFileLocation} cameraFoV={cameraFoV}/></figure>
            <div className="card-body">
                <h2 className="card-title text-black">{cardTitle}</h2>
                <p className="text-black">{cardText}</p>
            </div>
        </div>
    );
}

export default CADProjectCard;