import { AuthForm } from "@/components/AuthForm";
import { SocialLoginButtons } from "@/components/SocialLoginButtons";
import { Container, Section } from "@/components/Card";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign in" };

// When Clerk is configured, redirect to Clerk-powered /sign-in page.
// Otherwise fall back to legacy bcrypt/JWT + optional social login buttons.
export default function LoginPage() {
  if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    redirect("/sign-in");
  }
  return LegacyLoginPage();
}

function LegacyLoginPage() {
  return (
    <Section>
      <Container className="max-w-md">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Sign in to your 3DBuildBot account.</p>
        </div>
        <SocialLoginButtons variant="login" />
        <AuthForm mode="login" />
      </Container>
    </Section>
  );
}
