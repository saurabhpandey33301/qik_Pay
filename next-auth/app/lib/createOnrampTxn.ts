"use server"


import { prisma } from "@/app/lib/index";
import { auth } from "@/app/lib/auth";



export async function createOnrampTxn (amount : number , provider : string) {
   const session = await auth()
   const uId = session?.user?.id;
   const token = Math.random().toString();

   if(!uId){
       return {
           message : "user not logged in"
       }
   }
   try {
       await prisma.onRampTransaction.create({
        data:{
            userId : uId,
            amount : Number(amount),
            status : "Processing",
            startTime : new Date(),
            provider : provider,
            token: token
        }
       })
      
    //    await axios.post("http://localhost:3005/hdfcWebhook", {
    //     user_identifier: Number(userId),
    //     token: token,
    //     amount: amount
    //    });
    
    //    console.log("Transaction created successfully");
    //    return{
    //           message : "Transaction created successfully"
    //    }

   
        await prisma.$transaction([
            
            prisma.balance.updateMany({
                where: {
                    userId: (uId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(amount)
                    }
                }
            }),
            prisma.balance.upsert({
                where: {
                  userId: (uId),
                },
                update: {}, // Prevents updating if user exists
                create: {
                  userId: (uId),
                  amount: Number(amount),
                  locked: 0,
                },
              }),
            prisma.onRampTransaction.updateMany({
                where: {
                    token: token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);
        return{
            message : "bank transfer successful"
        }
    
   } catch (error) {
       console.log(error);
       alert("Bank tranfer failed")
       return {
           message : "Error while creating transaction"
        }
       
   }

} 