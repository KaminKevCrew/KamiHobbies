import React from 'react';
import ThreeScene from "~/app/_components/ThreeScene";

interface CADProjectCard {
    stlFileLocation: string;
    cameraFoV: number;
    cardTitle: string;
    cardText: string;
    cardBadges: Array<string>;
}

const CADProjectCard: React.FC<CADProjectCard> = ({ stlFileLocation, cameraFoV, cardTitle, cardText, cardBadges }) => {
    const badges = cardBadges.map((badge) => {
        return <div key={badge} className="badge badge-outline">{badge}</div>
    })

    return(
        <div className="card w-96 bg-neutral shadow-xl z-0">
            <figure className="h-1/2 z-0"><ThreeScene stlFileLocation={stlFileLocation} cameraFoV={cameraFoV}/></figure>
            <div className="h-1/2 card-body z-0">
                <h2 className="card-title z-0">{cardTitle}</h2>
                <p className="z-0">{cardText}</p>
                <div className="card-actions justify-end">
                    {badges}
                </div>
            </div>
        </div>
    );
}

export default CADProjectCard;