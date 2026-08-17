import { AuthForm } from "@/components/AuthForm";
import { Container, Section } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <Section>
      <Container className="max-w-md">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Sign in to your 3DBuildBot account.</p>
        </div>
        <AuthForm mode="login" />
      </Container>
    </Section>
  );
}
