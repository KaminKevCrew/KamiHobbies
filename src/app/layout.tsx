import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import NavBar from "~/app/_components/NavBar";

export const metadata = {
  title: "KamiHobbies",
  description: "Created by Kevin Kaminski, using the T3 stack.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`} data-theme="synthwave">
      <body>
        <div >
          <NavBar/>
        </div>
        <div className="z-0">
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </div>
      </body>
    </html>
  );
}
