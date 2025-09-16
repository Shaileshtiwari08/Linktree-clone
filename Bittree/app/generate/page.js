"use client"
import { useState } from 'react';
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Generate = () => {

    const searchParams = useSearchParams();
    const router = useRouter();


    // const [link, setlink] = useState("")
    // const [linktext, setlinktext] = useState("")
    const [links, setLinks] = useState([{ link: "", linktext: "" }])
    const [handle, sethandle] = useState(searchParams.get("handle" ))
    const [pic, setpic] = useState("")
    const [desc, setdesc] = useState("")

    const handlechange = (index, link, linktext) => {
        setLinks((initialLinks)=>{
            return initialLinks.map((item, i)=>{
                if (i==index) {
                    return { link, linktext }
                } else {
                    return item
                }

            })
        })
    }
    const addLink = () => {
        setLinks(links.concat([{link: "" ,linktext: ""}]))
    }

    const submitLinks = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "handle": handle,
            "links": links,
            "pic": pic,
            "desc": desc
        });
        console.log(raw)

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const r = await fetch("http://localhost:3000/api/add", requestOptions)
        const result = await r.json()
        if(result.success){
          toast.success(result.message)
          setLinks([{ link: "", linktext: "" }])
          setpic("")
          sethandle("")  
          setdesc("")
          
          router.push(`/${handle}`)
        }else{
            toast.error(result.message)
        }
    }

    return (
        <>
            <div className='bg-[#E9C0E9] min-h-[120vh] grid grid-cols-2'>
                <div className='col1 flex flex-col items-center justify-center text-gray-900'>
                    <div className='flex flex-col gap-5 my-8'>
                        <h1 className='font-bold text-4xl'>Create your BitTree</h1>
                        <div className='item'>
                            <h2 className='font-semibold text-2xl' >Step 1: Claim your Handle</h2>
                            <div className='mx-4'>
                                <input value={handle || ""} onChange={e=>{ sethandle(e.target.value)}} className='px-5 py-4 my-2 bg-white focus:outline-pink-500 rounded-3xl' type="text" placeholder='Choose a Handle' />
                            </div>
                        </div>
                        <div className='item gap-2'>
                            <h2 className='font-semibold text-2xl' >Step 2: Add your Links</h2>
                            {links && links.map((item, index)=>{
                                return <div key={index} className='mx-4 '>
                                <input value={item.link || ""} onChange={e=>{handlechange(index, e.target.value, item.link) }} className='px-5 py-4 my-2 mx-2 bg-white focus:outline-pink-500 rounded-3xl' type="text" placeholder='Enter link' />
                                <input value={item.linktext || ""} onChange={e=>{handlechange(index,item.link, e.target.value)}} className='px-5 py-4 bg-white my-2 mx-2 focus:outline-pink-500 rounded-3xl' type="text" placeholder='Enter link text' />
                                </div>
                            })}
                            <button onClick={()=>addLink()} className='p-5 py-2 cursor-pointer mx-2 bg-slate-900 text-white font-bold rounded-3xl'> + Add Link </button>
                        </div>

                        <div className='item'>
                            <h2 className='font-semibold text-2xl' >Step 3: Add Picture and Description</h2>
                            <div className='mx-4 flex flex-col'>
                            <input value={pic || ""} onChange={e =>{setpic(e.target.value) }} className='px-5 py-4 mx-2 bg-white my-2 focus:outline-pink-500 rounded-3xl' type="text" placeholder='Enter link to your Picture' />
                            <input value={desc || ""} onChange={e=>{setdesc(e.target.value)}} className='px-5 py-4 my-2 bg-white mx-2 focus:outline-pink-500  rounded-3xl' type="text" placeholder='Enter Description' />
                            <button disabled={pic==""||handle==""|| links[0]?.linktext==""} onClick={()=>{submitLinks()}} className='disabled:bg-gray-400 p-5 px-5 mx-2 w-fit my-5 bg-slate-900 cursor-pointer text-white font-bold rounded-3xl'>Create your BitTree</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col2 w-full h-screen bg-[#E9C0E9]'>
                    <img className='h-full object-contain' src='/generate.png' alt='Generate your links' />
                <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default Generate