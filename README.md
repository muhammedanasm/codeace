# Product Management Dashboard

A premium product listing experience built with Next.js.

## 🚀 How to Run Locally

1. **Clone the repository:**
   `git clone https://github.com/muhammedanasm/codeace.git`

2. **Install dependencies:**
   `npm install`

3. **Set up Environment Variables:**
   Create a file named `.env.local` in the root folder and add:
   `NEXT_PUBLIC_API_URL=https://fakestoreapi.com`

4. **Run the project:**
   `npm run dev`

## Tech Stack

- **Framework:** Next.js (App Router)
- **Validation:** Zod & React Hook Form
- **UI Components:** shadcn/ui (Dialog)
- **Styling:** Tailwind CSS & Custom External CSS
- **API Client:** Axios

## Key Decisions

- **Client-Side Filtering:** Since the FakeStoreAPI doesn't support combined search/filter on the server, I implemented it on the client side for a faster user experience.
- **Responsive Table:** Implemented horizontal scroll for the table on mobile to maintain data readability.
