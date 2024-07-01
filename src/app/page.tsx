import Link from "next/link";
import Image from "next/image";
import React from "react";
import ArduinoIDEScreenshot from '../../public/softwarePhotos/Arduino IDE Screenshot.png'
import PCBScreenshot from '../../public/hardwarePhotos/PCB Screenshot Example.png'
import ThreeDModelingScreenshot from '../../public/CADPhotos/3d Modeling Screenshot.png'
import Mk3SupraEngineBay from '../../public/1991 Supra Engine Bay.jpg'

export default async function Home() {
    console.log(process.env.NEXT_PUBLIC_ENV);
    console.log("You should have base path above this message.")
  return (
    <main className="flex min-h-screen flex-wrap justify-center bg-base-100 from-[#2e026d] to-[#15162c] text-white">
        <div>
            {process.env.NEXT_PUBLIC_ENV}
        </div>
      <Link href="/software" className="m-10">
          <div className="card w-96 bg-neutral shadow-xl z-0">
              <figure className="h-1/2 z-0">
                  <Image src={ArduinoIDEScreenshot} alt="Screenshot of Arduino code" width={500} height={500}/>
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
                  <Image src={PCBScreenshot} alt="Screenshot of PCB 3D Model" width={500} height={500}/>
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
                  <Image src={ThreeDModelingScreenshot} alt="Screenshot of 3D CAD Model" width={500} height={500}/>
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
                  <Image src={Mk3SupraEngineBay} alt="1991 Toyota Supra" width={500} height={500}/>
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