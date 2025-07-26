"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateAIInsights } from "./dashboard";
// import { DemandLevel, MarketOutlook } from "@prisma/client";

export async function UpdateUser(data) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  try {
    const result = await db.$transaction(
      async (tx) => {
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });
        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);
         
            industryInsight = await db.industryInsight.create({
               data: {
                 industry: data.industry,
                 ...insights,
                 nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
               },
             }); 
        }
        const updatedUser = await tx.user.update({
          where: {
            clerkUserId: userId,
          },
          data: {
            industry: data.industry,
            skills: data.skills,
            experience: data.experience,
            bio: data.bio,

          },
        });
        return { updatedUser, industryInsight };

      },
      {
        timeout: 10000,
      }
    );
    return {success:true, ...result};
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw new Error("Failed to update profile"+error.message);
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select:{
        industry: true,
        
      }
    });

    return {
      isOnboarded: !!user?.industry,

    }
  } catch (error) {
    console.error("Error checking onboarding status:", error.message);
    throw new Error("Failed to fetch onboarding status");
  }
}
