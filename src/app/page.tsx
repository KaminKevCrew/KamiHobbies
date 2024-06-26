import Link from "next/link";
import CADProjectCard from "~/app/_components/CADProjectCard";
import { api } from "~/trpc/server";
import ThreeScene from "~/app/_components/ThreeScene";
import React from "react";


export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen flex-wrap items-center justify-center bg-base-100 from-[#2e026d] to-[#15162c] text-white">
      <div className="card w-96 bg-neutral shadow-xl z-0 m-10">
        <figure className="h-1/2 z-0"></figure>
        <div className="h-1/2 card-body z-0">
          <h2 className="card-title z-0">Software Projects</h2>
          <p className="text-black z-0"></p>
        </div>
      </div>
      <div className="card w-96 bg-neutral shadow-xl z-0 m-10">
        <figure className="h-1/2 z-0"></figure>
        <div className="h-1/2 card-body z-0">
          <h2 className="card-title z-0">Hardware Projects</h2>
          <p className="text-black z-0"></p>
        </div>
      </div>
      <div className="card w-96 bg-neutral shadow-xl z-0 m-10">
        <figure className="h-1/2 z-0"></figure>
        <div className="h-1/2 card-body z-0">
          <h2 className="card-title z-0">CAD Projects</h2>
          <p className="text-black z-0"></p>
        </div>
      </div>
      <div className="card w-96 bg-neutral shadow-xl z-0 m-10">
        <figure className="h-1/2 z-0"></figure>
        <div className="h-1/2 card-body z-0">
          <h2 className="card-title z-0">Other Projects</h2>
          <p className="text-black z-0"></p>
        </div>
      </div>
    </main>
  );
}