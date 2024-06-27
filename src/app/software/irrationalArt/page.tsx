import React from 'react';
import Image from 'next/image';
import Link from "next/link";

export default function IrrationalArt() {

    return(
        <div>
            <div className="carousel carousel-center rounded-box w-full space-x-4 p-4">
                <div id="slide1" className="carousel-item flex-col items-center">
                    <Image
                        src="/softwarePhotos/IrrationalArt500DigitsOfE.png"
                        alt="500 Digits of E"
                        height={500}
                        width={500}
                        className="rounded-box"
                    />
                    <div className="badge badge-accent">500 Digits of E</div>
                </div>
                <div id="slide2" className="carousel-item flex-col items-center">
                    <Image
                        src="/softwarePhotos/IrrationalArt500DigitsOfPhi.png"
                        alt="500 Digits of Phi"
                        height={500}
                        width={500}
                        className="rounded-box"
                    />
                    <div className="badge badge-accent">500 Digits of Phi</div>
                </div>
                <div id="slide3" className="carousel-item flex-col items-center">
                    <Image
                        src="/softwarePhotos/IrrationalArt500DigitsOfPi.png"
                        alt="500 Digits of Pi"
                        height={500}
                        width={500}
                        className="rounded-box"
                    />
                    <div className="badge badge-accent">500 Digits of Pi</div>
                </div>
                <div id="slide4" className="carousel-item flex-col items-center">
                    <Image
                        src="/softwarePhotos/IrrationalArt500DigitsOfRootTwo.png"
                        alt="500 Digits of Root Two"
                        height={500}
                        width={500}
                        className="rounded-box"
                    />
                    <div className="badge badge-accent">500 Digits of Root Two</div>
                </div>
                <div id="slide5" className="carousel-item flex-col items-center">
                    <Image
                        src="/softwarePhotos/IrrationalArt20kDigitsOfE.png"
                        alt="20,000 Digits of E"
                        height={500}
                        width={500}
                        className="rounded-box"
                    />
                    <div className="badge badge-accent">20,000 Digits of E</div>
                </div>
                <div id="slide6" className="carousel-item flex-col items-center">
                    <Image
                        src="/softwarePhotos/IrrationalArt20kDigitsOfPhi.png"
                        alt="20,000 Digits of Phi"
                        height={500}
                        width={500}
                        className="rounded-box"
                    />
                    <div className="badge badge-accent">20,000 Digits of Phi</div>
                </div>
                <div id="slide7" className="carousel-item flex-col items-center">
                    <Image
                        src="/softwarePhotos/IrrationalArt20kDigitsOfPi.png"
                        alt="20,000 Digits of Pi"
                        height={500}
                        width={500}
                        className="rounded-box"
                    />
                    <div className="badge badge-accent">20,000 Digits of Pi</div>
                </div>
                <div id="slide8" className="carousel-item flex-col items-center">
                    <Image
                        src="/softwarePhotos/IrrationalArt20kDigitsOfRootTwo.png"
                        alt="20,000 Digits of Root Two"
                        height={500}
                        width={500}
                        className="rounded-box"
                    />
                    <div className="badge badge-accent">20,000 Digits of Root Two</div>
                </div>
            </div>
            <p className="p-4">
                Ahh, Irrational Art. One of my early web development projects. This project was inspired by a project from
                2015 called The Art in Pi by Nadieh Bremer (
                <Link href="https://www.visualcinnamon.com/art/the-art-in-pi/" passHref legacyBehavior>
                    <a target="_blank" className="link">
                        link
                    </a>
                </Link>
                ). Nadieh created a script that generated a PDF {"\'map\'"} of the digits of Pi.
                I found myself inspired by this project, but I also wanted to have more interactivity rather than only
                having a static PDF available. To accomplish this, I decided to use vanilla JavaScript, and the HTML Canvas
                element. I also realized that there was no practical reason this project needed to be limited to Pi, so
                I added some of the other more famous irrational numbers (namely: E, Phi, Root Two). I also decided to
                integrate some additional functionality that would allow users to use any arbitrary sequence of digits,
                and to allow users to select how many digits should be displayed.
            </p>
            <p className="p-4">
                The original project by Nadieh utilized up to 1,000,000 digits of Pi, however I found that anything
                substantially above 20,000 digits would end up lagging so much as to be unuseable on my computers, so I
                limited the viewport to only display up to 20,000 digits. During development of this project, I needed to
                learn about the HTML canvas element and how to draw in it, how to process text files in JavaScript, and
                how to handle interactive controls in a canvas element - which is an entirely manual process!
            </p>
        </div>
    )
}