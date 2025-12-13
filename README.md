<div align="center">

## 🚀 Modern Newsletter

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Resend](https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=resend&logoColor=white)](https://resend.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

Modular newsletter solution built on a modern full-stack foundation. This project showcases clean architecture using Next.js Server Actions, Supabase RLS (Row Level Security), and React Email templates.

---

## ✨ Key Features

* **Secured Routes (Admin):** The admin dashboard is protected using **`middleware.ts`** and Supabase Authentication.
* **Serverless Database:** Uses **Supabase (PostgreSQL)** for subscriber data storage.
* **Zero-Exposure Logic:** All data interaction logic (adding subscribers, sending emails) runs securely on the server via **Next.js Server Actions**.
* **High Email Deliverability:** Utilizes **Resend** for reliable email sending, minimizing the risk of landing in the spam folder.
* **Modern Email Design:** Email templates are designed using **React Email**, ensuring a responsive and consistent look across various email clients (Gmail, Outlook, etc.).
* **Modular Structure:** Code is organized into dedicated folders like **`src/server/`**, **`src/lib/`**, and **`src/utils/`** for maintainability and scalability.

---

## 💻 Tech Stack

| Area | Technology | Notes |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | Front-end & Serverless Back-end |
| **Language** | TypeScript | Ensures code quality and type safety |
| **Styling** | Tailwind CSS | Utility-first CSS for rapid design |
| **Database** | Supabase | PostgreSQL Database & Authentication (Free Tier) |
| **Animation** | **Framer Motion** | Declarative animation library for React |
| **Email** | Resend & React Email | Sending service and template creation |
| **Package Manager**| pnpm | Efficient dependency management |

---

## ⚙️ Local Installation

### Prerequisites

Ensure you have the following installed:
Node.js (version 18+)
pnpm

### Step 1: Clone the Repository

```bash
git clone https://github.com/zeiynz/newsletter/
cd newsletter
