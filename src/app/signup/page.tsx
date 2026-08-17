import { AuthForm } from "@/components/AuthForm";
import { SocialLoginButtons } from "@/components/SocialLoginButtons";
import { Container, Section } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Create your account" };

export default function SignupPage() {
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
