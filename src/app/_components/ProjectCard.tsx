import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import {AiFillGithub} from "rocketicons/ai";

interface ProjectCard {
    cardImageUrl: string;
    cardImageAlt: string
    cardTitle: string;
    cardText: string;
    cardBadges: Array<string>;
}

const ProjectCard: React.FC<ProjectCard> = ({cardImageUrl, cardImageAlt, cardTitle, cardText, cardBadges}) => {
    const badges = cardBadges.map((badge) => {
        return <div key={badge} className="badge badge-outline">{badge}</div>
    })

    return(
        <div className="card w-96 bg-neutral shadow-xl z-0">
            <figure className="h-1/2 z-0">
                <Image
                    src={cardImageUrl}
                    alt={cardImageAlt}
                    width={500}
                    height={500}
                />
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

export default ProjectCard;