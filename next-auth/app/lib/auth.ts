import NextAuth, { Session, Account } from "next-auth";
import {prisma} from "@/app/lib/index"


import GitHubProvider from "next-auth/providers/github"

import GoogleProvider from "next-auth/providers/google";
if(!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET ){
    throw new Error("missing github client_id or client_secert")
}

// Extend the Session type to include the id property
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            provider?: string | null;
        };
    }
}

export const {handlers:{GET , POST} , auth ,signIn , signOut} = NextAuth({
    
    providers:[
        GitHubProvider({
            clientId:process.env.GITHUB_CLIENT_ID ,
            clientSecret:process.env.GITHUB_CLIENT_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          })
    ],
    pages: {
      signIn: "/api/auth/signin", 
      error: "/api/auth/error", 
    },
    callbacks: {
        async signIn({ user, account }: { user: { email?: string | null; name?: string | null }; account: Account | null }) {
            if (account?.provider === "google") {
              if (!user.email) {
                console.error("Google account is missing an email!");
                return false;
              }
      
              const existingUser = await prisma.user.findFirst({
                where: { email: user.email },
              });
      
              if (!existingUser) {
                await prisma.user.create({
                  data: {
                    email: user.email,
                    name: user.name ?? "New User", 
                    password: "default",
                  },
                });
              }
            }
            return true;
          },
      
          async session({ session, token }: { session: Session; token: any }) {
                  if (!session.user || !session.user.email) return session;
            
                  const dbUser = await prisma.user.findFirst({
                    where: {
                      email: session.user.email
                    },
                  });
            
                  if (dbUser) {
                    session.user.id = dbUser.id.toString();
                    session.user.name = dbUser.name;
                    session.user.provider = dbUser.password ? "credentials" : "google";
                  }
            
                  return session;
                },
    },
    
    
})