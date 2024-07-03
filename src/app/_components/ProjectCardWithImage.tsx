import type ProjCard from "~/app/_components/ProjCardInterface";
import type {StaticImageData} from "next/image";
import Image from "next/image";
import React from "react";

interface ProjectCardWithImage extends ProjCard {
    cardImageUrl?: never;
    cardImage: StaticImageData;
}

const ProjectCardWithImage: React.FC<ProjectCardWithImage> = ({cardImage, cardImageAlt, cardTitle, cardText, cardBadges}) => {
    const badges = cardBadges.map((badge) => {
        return <div key={badge} className="badge badge-outline">{badge}</div>
    })

    return(
        <div className="card w-96 bg-neutral shadow-xl z-0">
            <figure className="h-1/2 z-0">
                <Image src={cardImage} alt={cardImageAlt} width={500} height={500}/>
            </figure>
            <div className="h-1/2 card-body z-0">
                <h2 className="card-title z-0">{cardTitle}</h2>
                <p className="z-0">{cardText}</p>
                <div className="card-actions justify-end">
                    {badges}
                </div>
            </div>
        </div>
    )
}

export default ProjectCardWithImage;