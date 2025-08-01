"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
 // ✅ Needed for fetching email
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ✅ Helper to get or create a user
async function getOrCreateUser(userId) {
  let user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    const clerkUser = await clerkClient.users.getUser(userId);
    const email = clerkUser?.emailAddresses?.[0]?.emailAddress;

    if (!email) throw new Error("User email not found from Clerk");

    user = await db.user.create({
      data: {
        clerkUserId: userId,
        email,
        industry: null, // ✅ safest default
        experience: 0,
        skills: [],
        bio: "This is a new user",
      },
    });
    
    
  }

  return user;
}

export async function generateCoverLetter(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await getOrCreateUser(userId);

  const prompt = `
    Write a professional cover letter for a ${data.jobTitle} position at ${data.companyName}.
    
    About the candidate:
    - Industry: ${user.industry}
    - Years of Experience: ${user.experience}
    - Skills: ${user.skills?.join(", ")}
    - Professional Background: ${user.bio}
    
    Job Description:
    ${data.jobDescription}
    
    Requirements:
    1. Use a professional, enthusiastic tone
    2. Highlight relevant skills and experience
    3. Show understanding of the company's needs
    4. Keep it concise (max 400 words)
    5. Use proper business letter formatting in markdown
    6. Include specific examples of achievements
    7. Relate candidate's background to job requirements
    
    Format the letter in markdown.
  `;

  try {
    const result = await model.generateContent(prompt);
    const content = result.response.text().trim();

    const coverLetter = await db.coverLetter.create({
      data: {
        content,
        jobDescription: data.jobDescription,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        status: "completed",
        userId: user.id,
      },
    });

    return coverLetter;
  } catch (error) {
    console.error("Error generating cover letter:", error.message);
    throw new Error("Failed to generate cover letter");
  }
}

export async function getCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await getOrCreateUser(userId);

  return await db.coverLetter.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });
}

export async function deleteCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await getOrCreateUser(userId);

  return await db.coverLetter.delete({
    where: {
      id,
      userId: user.id,
    },
  });
}
export async function getCoverLetters() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await getOrCreateUser(userId);

  return await db.coverLetter.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}