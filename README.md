# 📝 Yuki Note

Yuki Note is a full-stack AI-assisted note-taking web app that enables users to create, manage, and query their personal notes using natural language. Built with Next.js, Prisma, Tailwind CSS, and OpenAI, the app is designed for simplicity and powerful AI-driven insights.


## 🚀 Features

- ✍️ Create, edit, and delete notes with a clean and modern UI.
- 🔒 Secure email/password authentication.
- 🤖 AI Assistant: Ask questions about your notes and get insightful responses in valid HTML.
- ⚡ Real-time feedback with smooth transitions and loading states.
- 📱 Fully responsive design.

## 🛠 Tech Stack

- **Frontend**: React (Next.js App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Prisma + PostgreSQL
- **Authentication**: Custom with secure password hashing
- **AI**: OpenAI API (`gpt-4o-mini` model)

## 📦 Getting Started

1.  Clone the repo
git clone https://github.com/your-username/yuki-note.git
cd yuki-note

2. Install dependencies
npm install

3. Create environment variables
Create a .env file based on the example:

DATABASE_URL
SUPABASE_URL
SUPABASE_ANON_KEY
OPENAI_API_KEY
NEXT_PUBLIC_BASE_URL=http://localhost:3000 or a domain you want to deploy

4. Set up the database

npx prisma generate
npx prisma migrate dev --name init

5. Start the dev server
npm run dev

🧠 AI Assistant
Answers are generated based on your saved notes.

Responses are formatted in valid, clean HTML for direct rendering in React.

All queries are handled securely on the server. Don't put any sensitive information to the note!

🛡 Security
User authentication with hashed passwords.

Notes are scoped to individual users—no shared access.

Environment variables are used for all sensitive credentials.

📤 Deployment
Deploy-ready for Vercel:

Set DATABASE_URL and OPENAI_API_KEY in your Vercel project settings.

Redeploy after making changes to environment variables.

🧪 Example
Try the live app: https://yuki-note.vercel.app

📄 License
This project is licensed under the MIT License.
