"use client"
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()
  const [text, setText] = useState("")

  const createTree = () => {

    router.push(`/generate?handle=${text}`)
  }

  return (
    <main>
      <section className="bg-[#254f1a] min-h-[120vh] grid grid-cols-2">
        <div className="flex justify-center flex-col ml-[10vw] gap-3">
          <p className="text-yellow-300 font-bold text-8xl">Everthing you
            are.in one,
            simple link in bio.
          </p>

          <p className="text-white text-xl my-4">
            Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, X, Youtube and other social media profiles.
          </p>
          <div className="input flex gap-2">
            <input value={text} onChange={(e) => setText(e.target.value)} className="bg-white px-15 py-6 focus:outline-green-800 rounded-md" type="text" placeholder="Enter your handle" />

            <button onClick={createTree} className="bg-pink-300 hover:bg-pink-400 cursor-pointer rounded-full px-12 py-6 font-semibold">Claim your BitTree</button>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col mr-[10vw]">
          <Image className="200" src="/home.png" alt="Home" width={384} height={384} />
        </div>
      </section>
      <section className="bg-[#e9c0e9] min-h-[100vh]">
        <div className="justify-center items-center grid grid-cols-2 pt-10 ml-15">
          <div className="col1">
            <Image className="mt-10" src="/home1.png" width={500} height={500} alt="image" />
          </div>
          <div className="col2 flex justify-center flex-col mr-[10vw] gap-3">
            <h2 className="text-purple-900 font-bold text-8xl">Create and customize
              your Linktree in
               minutes
            </h2>

            <p className="text-black text-xl my-4">
              Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.
            </p>
            <div className="button flex gap-2">
               <button onClick={createTree} className="bg-purple-900 hover:bg-purple-800 cursor-pointer rounded-full px-12 py-6 font-semibold">Get started with Free</button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
