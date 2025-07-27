# 🤖 AI Career Coach

**AI Career Coach** is a smart web application that empowers job seekers to build a standout resume, generate personalized cover letters, and prepare for interviews — all in one place. It also provides interactive visual feedback on your preparation performance using charts and analytics.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel)](https://careerly-ai-samurai1.vercel.app/)


---

## ✨ Features

- 📝 **AI-Powered Resume Builder**  
  Craft professional resumes with ease and download them as PDF.

- 💌 **Smart Cover Letter Generator**  
  Generate job-specific cover letters instantly using AI.

- 🎯 **Interview Preparation Tool**  
  Practice common questions and get AI feedback with performance charts.

- 📊 **Visual Analytics Dashboard**  
  View your interview prep progress and results with intuitive charts.

- 🔐 **User Authentication**  
  Secure sign-in & sign-up powered by [Clerk](https://clerk.dev/).

---

## 🛠️ Tech Stack

| Tech            | Description                             |
|-----------------|-----------------------------------------|
| [Next.js](https://nextjs.org/) | React framework for frontend & fullstack logic |
| [Prisma ORM](https://www.prisma.io/) | Database ORM for interacting with Neon |
| [Neon](https://neon.tech/)     | Serverless Postgres database |
| [Inngest](https://www.inngest.com/) | Background jobs and event-driven workflows |
| [Clerk](https://clerk.dev/)    | Authentication provider |
| [shadcn/ui](https://ui.shadcn.com/) | Styled UI components |
| [Vercel](https://vercel.com/)  | Hosting and deployment platform |

---

## 📸 Screenshots

| Resume Builder | Cover Letter Generator |
|----------------|------------------------|
| ![Resume Builder](./public/screenshots/resume.png) | ![Cover Letter](./public/screenshots/coverletter.png) |

| Interview Prep | Result Analytics |
|----------------|------------------|
| ![Interview](./public/screenshots/interview.png) | ![Chart](./public/screenshots/chart.png) |

---

## 📦 Installation & Local Setup

```bash
git clone https://github.com/Braj-01/Careerly.AI.git
cd Careerly.AI
# Install dependencies
npm install

# Add your environment variables in `.env.local`
cp .env.example .env.local

# Push Prisma schema
npx prisma db push

# Run dev server
npm run dev
```

## 🧪 Environment Variables

Here are some of the essential environment variables you'll need:

```env
DATABASE_URL=your_neon_postgres_url
CLERK_SECRET_KEY=your_clerk_secret
CLERK_PUBLISHABLE_KEY=your_clerk_key
INNGEST_SIGNING_KEY=your_inngest_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## 🚀 Deployment

This project is deployed on **Vercel** with automatic builds on push.

1. Connect your GitHub repo to [Vercel](https://vercel.com/)
2. Add the required environment variables in the Vercel dashboard
3. Deploy 🎉

---

## 🧠 AI Tools Used

- **GeminiAi** for generating resumes and cover letters  
- **Prompt engineering** for dynamic interview questions and feedback

---

[![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](https://github.com/Braj-01/ai-career-coach/pulls)

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 👨‍💻 Author

**Braj Narayan Awasthi**  
🔗 [LinkedIn](https://www.linkedin.com/in/braj-narayan-awasthi-33193a274)
