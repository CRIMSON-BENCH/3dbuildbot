import { AuthForm } from "@/components/AuthForm";
import { SocialLoginButtons } from "@/components/SocialLoginButtons";
import { Container, Section } from "@/components/Card";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Create your account" };

// When Clerk is configured, redirect to Clerk-powered /sign-up page.
// Otherwise fall back to legacy bcrypt + optional social login buttons.
export default function SignupPage() {
  if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    redirect("/sign-up");
  }
  return LegacySignupPage();
}

function LegacySignupPage() {
  return (
    <Section>
      <Container className="max-w-md">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Free tier. No credit card. .edu email unlocks student pricing.</p>
        </div>
        <SocialLoginButtons variant="signup" />
        <AuthForm mode="signup" />
      </Container>
    </Section>
  );
}
