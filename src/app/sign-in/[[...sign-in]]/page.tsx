import { SignIn } from "@clerk/nextjs";
import { Container, Section } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <Section>
      <Container className="max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Sign in to upload parts, manage quotes, and track production.</p>
        </div>
        <div className="flex justify-center">
          <SignIn appearance={{ elements: { rootBox: "w-full", card: "w-full" } }} />
        </div>
      </Container>
    </Section>
  );
}
