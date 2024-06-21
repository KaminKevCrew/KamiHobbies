import Link from "next/link";
import CADProjectCard from "~/app/_components/CADProjectCard";
import { api } from "~/trpc/server";


export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <CADProjectCard
            stlFileLocation={"/stlModels/ModifiedDactyl.stl"}
            cameraFoV={50}
            cardTitle={"Modified Dactyl"}
            cardText={"A Dactyl I made."}
        />
      </div>
    </main>
  );
}