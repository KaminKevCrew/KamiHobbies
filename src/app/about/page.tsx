import React from 'react';

export default function About () {


    return(
        <div className="flex w-full flex-col">
            <h1 className="">About Kevin Kaminski</h1>
            <div className="divider">Overview</div>
            <div className="card bg-base-300 rounded-box grid p-4">
                <p>
                    For over 3 years, I have been a professional fullstack web developer. I have had exposure to several languages
                    and frameworks, and I have become a very strong developer during that time, working on numerous
                    projects - both for clients, and internally. I have built POCs from the ground up, worked on custom
                    LLM integrations for clients, and developed new features in client enterprise applications which had
                    to support over 100,000 requests per hour during peak times. I am equally comfortable on the frontend
                    and backend, and can quickly and efficiently pick up new frameworks and technologies as needed.
                </p>
                <p>
                    My greatest passion is application-specific learning. By this, I mean that I love to learn with purpose.
                    If I there is something I need to learn in order to accomplish a specific task, I will delve into the
                    subject, and soak up all relevant information like a sponge. That being said, perhaps my biggest shortcoming
                    revolves around general learning. I am not great at learning about a subject without having a specific
                    application for that knowledge. This is why I have such a long list of (somewhat) random skills. Every
                    one of these skills listed really are things I have worked with/used, and virtually every one of them
                    has some sort of story associated with them for when I learned them.
                </p>
                <p>
                    I am looking for a position that will let me utilize some (or all!) of these skills. My skillset is
                    wide, but I think you will be surprised at just how deep I have delved into these topics (Especially RC
                    Aircraft and 3D Printing). I am a strong communicator who loves working on a tight-knit team. I am
                    always happy to help, and I have spent a significant amount of time sharing my knowledge with others.

                </p>
            </div>
            <div className="divider">Skills</div>
            <div className="flex card bg-base-300 rounded-box place-items-center p-4">
                <ul>
                    <li>
                        <h3>Languages</h3>
                        <ul className="flex flex-wrap gap-4">
                            <li className="badge badge-secondary">Python3</li>
                            <li className="badge badge-secondary">Ruby</li>
                            <li className="badge badge-secondary">Java</li>
                            <li className="badge badge-secondary">JavaScript</li>
                            <li className="badge badge-secondary">TypeScript</li>
                            <li className="badge badge-secondary">HTML</li>
                            <li className="badge badge-secondary">CSS</li>
                            <li className="badge badge-secondary">C/C++</li>
                            <li className="badge badge-secondary">C#</li>
                            <li className="badge badge-secondary">Bash</li>
                        </ul>
                    </li>

                    <li>
                        <h3>Frameworks</h3>
                        <ul className="flex flex-wrap gap-4">
                            <li className="badge badge-secondary">Flask</li>
                            <li className="badge badge-secondary">FastAPI</li>
                            <li className="badge badge-secondary">Ruby on Rails</li>
                            <li className="badge badge-secondary">Spring Boot</li>
                            <li className="badge badge-secondary">React</li>
                            <li className="badge badge-secondary">Next.js</li>
                            <li className="badge badge-secondary">Ember</li>
                            <li className="badge badge-secondary">Angular.js</li>
                            <li className="badge badge-secondary">Arduino</li>
                            <li className="badge badge-secondary">Node.js</li>
                        </ul>
                    </li>

                    <li>
                        <h3>Tools and Services</h3>
                        <ul className="flex flex-wrap gap-4">
                            <li className="badge badge-secondary">Git(hub, lab)</li>
                            <li className="badge badge-secondary">Github Action</li>
                            <li className="badge badge-secondary">Jenkins</li>
                            <li className="badge badge-secondary">Docker</li>
                            <li className="badge badge-secondary">BigPanda</li>
                            <li className="badge badge-secondary">AppDynamics</li>
                            <li className="badge badge-secondary">SonarQube</li>
                            <li className="badge badge-secondary">JUnit</li>
                            <li className="badge badge-secondary">Tailwind</li>
                            <li className="badge badge-secondary">DaisyUI</li>
                            <li className="badge badge-secondary">OpenCV</li>
                            <li className="badge badge-secondary">Azure</li>
                            <li className="badge badge-secondary">Postman</li>
                        </ul>
                    </li>

                    <li>
                        Database
                        <ul className="flex flex-wrap gap-4">
                            <li className="badge badge-secondary">PostgreSQL</li>
                            <li className="badge badge-secondary">MongoDB</li>
                            <li className="badge badge-secondary">MySQL</li>
                            <li className="badge badge-secondary">MicrosoftSQL</li>
                        </ul>
                    </li>

                    <li>
                        Operating Systems and System Administration
                        <ul className="flex flex-wrap gap-4">
                            <li className="badge badge-secondary">Windows</li>
                            <li className="badge badge-secondary">MacOS</li>
                            <li className="badge badge-secondary">Linux</li>
                            <li className="badge badge-secondary">FreeBSD</li>
                            <li className="badge badge-secondary">TrueNAS</li>
                            <li className="badge badge-secondary">UnRaid</li>

                        </ul>
                    </li>

                    <li>
                        3D Modeling/CAD
                        <ul className="flex flex-wrap gap-4">
                            <li className="badge badge-secondary">Fusion 360</li>
                            <li className="badge badge-secondary">Inventor</li>
                            <li className="badge badge-secondary">OndselES (FreeCAD)</li>
                            <li className="badge badge-secondary">SolidWorks</li>
                            <li className="badge badge-secondary">OnShape</li>
                            <li className="badge badge-secondary">Shapr3d</li>
                            <li className="badge badge-secondary">OpenSCAD</li>
                        </ul>
                    </li>

                    <li>
                        Electronics
                        <ul className="flex flex-wrap gap-4">
                            <li className="badge badge-secondary">Soldering</li>
                            <li className="badge badge-secondary">Hot Air Rework</li>
                            <li className="badge badge-secondary">Altium Designer</li>
                            <li className="badge badge-secondary">Eagle</li>
                            <li className="badge badge-secondary">KiCAD</li>
                            <li className="badge badge-secondary">Schematic Components</li>
                            <li className="badge badge-secondary">PCB Footprints</li>
                            <li className="badge badge-secondary">Schematic Routing</li>
                            <li className="badge badge-secondary">PCB Layout</li>
                            <li className="badge badge-secondary">PCB Routing</li>
                            <li className="badge badge-secondary">Configuring for PCBA</li>
                        </ul>
                    </li>

                    <li>
                        3D Printing
                        <ul className="flex flex-wrap gap-4">
                            <li className="badge badge-secondary">FDM</li>
                            <li className="badge badge-secondary">MSLA</li>
                            <li className="badge badge-secondary">SLS</li>
                            <li className="badge badge-secondary">MJF</li>
                            <li className="badge badge-secondary">SLM</li>
                            <li className="badge badge-secondary">PrusaSlicer</li>
                            <li className="badge badge-secondary">SuperSlicer</li>
                            <li className="badge badge-secondary">OrqaSlicer</li>
                            <li className="badge badge-secondary">LycheeSlicer</li>
                            <li className="badge badge-secondary">VoxelDance Tango</li>
                            <li className="badge badge-secondary">Design for 3d Printing</li>
                            <li className="badge badge-secondary">Marlin</li>
                            <li className="badge badge-secondary">Klipper</li>
                            <li className="badge badge-secondary">RepRap Firmware</li>
                            <li className="badge badge-secondary">Printer Configuration</li>
                            <li className="badge badge-secondary">Printer Tuning</li>
                        </ul>
                    </li>

                    <li>
                        Remote Control Aircraft
                        <ul className="flex flex-wrap gap-4">
                            <li className="badge badge-secondary">FPV</li>
                            <li className="badge badge-secondary">Multirotor</li>
                            <li className="badge badge-secondary">Fixed Wing</li>
                            <li className="badge badge-secondary">Betaflight</li>
                            <li className="badge badge-secondary">iNav</li>
                            <li className="badge badge-secondary">ArduPilot</li>
                            <li className="badge badge-secondary">OpenTx</li>
                            <li className="badge badge-secondary">EdgeTx</li>
                            <li className="badge badge-secondary">DJI FPV</li>
                            <li className="badge badge-secondary">HDZero</li>
                            <li className="badge badge-secondary">Discus Launch Gliders</li>
                        </ul>
                    </li>

                    <li>
                        Other
                        <ul className="flex flex-wrap gap-4">
                            <li className="badge badge-secondary">Microsoft Office</li>
                            <li className="badge badge-secondary">Adobe Creative Cloud</li>
                            <li className="badge badge-secondary">Unity</li>
                            <li className="badge badge-secondary">VS Code</li>
                            <li className="badge badge-secondary">PyCharm</li>
                            <li className="badge badge-secondary">WebStorm</li>
                            <li className="badge badge-secondary">IntelliJ</li>
                            <li className="badge badge-secondary">RubyMine</li>
                            <li className="badge badge-secondary">Manual Mill Operation</li>
                            <li className="badge badge-secondary">Manual Lathe Operation</li>
                            <li className="badge badge-secondary">MIG Welding</li>
                            <li className="badge badge-secondary">Stick Welding</li>
                            <li className="badge badge-secondary">Plasma Cutting</li>
                            <li className="badge badge-secondary">OxyAcetelene Cutting</li>
                            <li className="badge badge-secondary">RESTful API Development</li>
                            <li className="badge badge-secondary">Agile/Scrum Development</li>
                            <li className="badge badge-secondary">Microservices Architecture</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}