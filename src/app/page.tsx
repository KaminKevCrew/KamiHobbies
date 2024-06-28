import Link from "next/link";
import Image from "next/image";
import React from "react";
import { prefix } from './prefix';

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-wrap justify-center bg-base-100 from-[#2e026d] to-[#15162c] text-white">
      <Link href="/software" className="m-10">
          <div className="card w-96 bg-neutral shadow-xl z-0">
              <figure className="h-1/2 z-0">
                  <Image src={`${prefix}/softwarePhotos/Arduino IDE Screenshot.png`} alt="Screenshot of Arduino code" width={500} height={500}/>
              </figure>
              <div className="h-1/2 card-body z-0">
                  <h2 className="card-title z-0">Software Projects</h2>
                  <p className="text-black z-0"></p>
              </div>
          </div>
      </Link>
      <Link href="/hardware" className="m-10">
          <div className="card w-96 bg-neutral shadow-xl z-0">
              <figure className="h-1/2 z-0">
                  <Image src={`${prefix}/hardwarePhotos/PCB Screenshot Example.png`} alt="Screenshot of PCB 3D Model" width={500} height={500}/>
              </figure>
              <div className="h-1/2 card-body z-0">
                  <h2 className="card-title z-0">Hardware Projects</h2>
                  <p className="text-black z-0"></p>
              </div>
          </div>
      </Link>
      <Link href="/3dModeling" className="m-10">
          <div className="card w-96 bg-neutral shadow-xl z-0">
              <figure className="h-1/2 z-0">
                  <Image src={`${prefix}/CADPhotos/3d Modeling Screenshot.png`} alt="Screenshot of 3D CAD Model" width={500} height={500}/>
              </figure>
              <div className="h-1/2 card-body z-0">
                  <h2 className="card-title z-0">CAD Projects</h2>
                  <p className="text-black z-0"></p>
              </div>
          </div>
      </Link>
      <Link href="" className="m-10">
          <div className="card w-96 bg-neutral shadow-xl z-0">
              <figure className="h-1/2 z-0">
                  <Image src={``} alt="1991 Toyota Supra" width={500} height={500}/>
              </figure>
              <div className="h-1/2 card-body z-0">
                  <h2 className="card-title z-0">Other Projects</h2>
                  <p className="text-black z-0"></p>
              </div>
          </div>
      </Link>
    </main>
  );
}