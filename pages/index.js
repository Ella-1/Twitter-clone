import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Login from "@/components/Login";
import Head from "next/head";
import Image from "next/image";
import { getProviders, getSession, useSession } from "next-auth/react";
import axios from "axios";

export default function Home({providers, trendingResults,followResults}) {
  const {data: session} = useSession();
  if (!session) return <Login providers={providers}/>

  return (
    <div>
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        {/* Sidebar */}
        <Sidebar />
        {/* feeds */}
        <Feed />
        {/* widgets */}
      {/* modal */}
      </main>
    </div>
  );
}



// export async function getServerSideProps(context) {
//   const trendingResults = await axios("https://www.jsonkeeper.com/b/NKEV").then(
//     (res) => res.data
//   );
//   const followResults = await axios("https://www.jsonkeeper.com/b/WWMJ").then(
//     (res) => res.data
//   );
//   const providers = await getProviders();
//   const session = await getSession(context);
//   console.log(providers)

//   return {
//     props: {
//       trendingResults,
//       followResults,
//       providers,
//       session,
//     },
//   };
// }
