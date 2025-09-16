import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
import {
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaTwitter,
    FaGoogle,
    FaLink,
    ChatGTPIcon as FaChatGPT ,
    FaSnapchat ,
    FaLinkedin,
    FaGithub,
} from "react-icons/fa";


export default async function Page({ params }) {
    const handle = (await params).handle
    const client = await clientPromise;
    const db = client.db("Bittree")
    const collection = db.collection("links")

    //if the handle is alredy claimed , you cannot create the BitTree
    const item = await collection.findOne({ handle: handle })
    if (!item) {
        return notFound()
    }
    console.log(item)

    // 🔧 Icon selector
    const getIcon = (text) => {
        text = text.toLowerCase();
        if (text.includes("facebook")) return <FaFacebook className="text-blue-600" />;
        if (text.includes("instagram")) return <FaInstagram className="text-pink-500" />;
        if (text.includes("youtube")) return <FaYoutube className="text-black" />;
        if (text.includes("twitter")) return <FaTwitter className="text-blue-400" />;
        if (text.includes("google")) return <FaGoogle className="text-red-500" />;
        if (text.includes("chatgpt")) return <FaChatGPT className="text-black" />;
        if (text.includes("snapchat")) return <FaSnapchat className="text-black" />;
        if (text.includes("linkedin")) return <FaLinkedin className="text-blue-700" />;
        if (text.includes("github")) return <FaGithub className="text-black" />;
        return <FaLink className="text-gray-500" />;
    };
    
    return <div className="flex min-h-screen bg-gray-300 justify-center items-start my-10">
        {item && <div className="photo flex justify-center items-center flex-col rounded-4xl bg-gray-200 p-3 shadow-4xl gap-4">
            <img className="rounded-full h-50" src={item.pic} alt="" />
            <span className="font-bold text-xl">@{item.handle}</span>
            <span className="desc w-lg text-center">{item.desc}</span>
            <div className="links">
                {item.links.map((item, index) => (
                    <Link key={index} href={item.link}><div className="py-4 shadow-lg min-w-xl flex justify-center rounded-full px-2 my-3 bg-white" >
                        {/* {item.linktext} */}
                        <span className="text-xl">{getIcon(item.linktext)}</span>
                        <span className="text-lg font-semibold">{item.linktext}</span>

                    </div></Link>
                ))}</div>
        </div>}
    </div>
}