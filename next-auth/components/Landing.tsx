"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


export default  function QikPayLanding() {

  const session = useSession()
    const user = session?.data?.user
    
    return (
      <div className="min-h-screen bg-gray-900 text-white">
         
        
        {/* Hero Section */}
        <section className="flex flex-col  items-center justify-center text-center py-20 px-4">
          <div className="text-8xl text-white font-extrabold font-mono m-8" >QikPay</div>
          <h1 className="text-4xl font-bold">Fast & Secure Payments</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Experience seamless transactions with QikPay. Fast, reliable, and hassle-free payments at your fingertips.
          </p>
          <div className="flex gap-2 ">
            <button className="mt-6 px-6 py-3 hover:cursor-pointer bg-slate-600 border-2 border-slate-600 hover:border-white rounded-lg text-white text-lg" 
            onClick={()=>{
              window.open("https://github.com/saurabhpandey33301/Qik-Pay", "_blank");
            }}>Source code </button>
          <button onClick={()=>{
             {user ? redirect("/dashboard") : redirect("/api/auth/signin")}
          }} className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer rounded-lg text-white text-lg">
            {user ? "Go to Dashboard" : "Get Started"}
          </button>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 px-8 py-16">
          <div className="bg-gray-800 p-6 min-h-[180px] rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Instant Transfers</h2>
            <p className="text-gray-400 mt-2">Send and receive money instantly with no hidden fees.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Secure & Reliable</h2>
            <p className="text-gray-400 mt-2">Bank-grade security ensures your transactions are always safe.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Bank Transfer</h2>
            <p className="text-gray-400 mt-2">Transfer money from your bank  easily.</p>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="text-center py-12 bg-gray-800">
          <h2 className="text-2xl font-bold">{user ? "Enjoy our Seamless service" : "Join QikPay Today!" }</h2>
          <p className="text-lg text-gray-100 mt-2">{user ? "You are onboard" : "Sign up now and start making transactions in seconds."}</p>
          
        </section>
      </div>
    );
  }
  