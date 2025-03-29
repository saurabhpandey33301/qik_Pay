"use client"
import { signIn } from "./actions/signin/sign-in";
import { signOut } from "./actions/signout/sign-out";

export default function Home() {
  return (
    <div  className="flex gap-4">
       <button className="p-2 bg-red-400" onClick={()=>{ signIn()}}>Signin</button>
       <button className="p-2 bg-red-400" onClick={() => signOut()}>Logout</button>
    </div>
  );
}
