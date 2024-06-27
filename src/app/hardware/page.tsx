import React from 'react';
import Link from 'next/link';
import ProjectCard from "~/app/_components/ProjectCard";

export default function Hardware() {

    return(
        <div>
            <Link href="/hardware/ledLightGuide">
                <ProjectCard
                    cardImageUrl=""
                    cardImageAlt=""
                    cardTitle=""
                    cardText=""
                    cardBadges={[]}
                />
            </Link>
            <Link href="/hardware/ledController">
                <ProjectCard
                    cardImageUrl=""
                    cardImageAlt=""
                    cardTitle=""
                    cardText=""
                    cardBadges={[]}
                />
            </Link>
        </div>
    )
}