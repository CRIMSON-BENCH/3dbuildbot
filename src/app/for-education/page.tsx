import Link from "next/link";
import { Container, Section, FeatureCard } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "For Education & Research" };

export default function EducationPage() {
  return (
    <>
      <Section>
        <Container className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Education & Research</div>
          <h1 className="text-4xl font-semibold tracking-tight">Free credits for students. Discounts for research labs.</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            Every ABET-accredited engineering student gets a free-quote allowance and a 25% discount on their first order — verified through .edu email. Faculty research labs get a dedicated procurement lane with net-30 terms.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/signup" className="px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium">Sign up with .edu email →</Link>
            <Link href="/contact" className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 font-medium">Faculty inquiry</Link>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard title="Student credits" desc="Verified .edu accounts get $50 in free-quote credit and 25% off their first order. No credit card required." badge="Students" />
            <FeatureCard title="Capstone sponsor portal" desc="Companies post capstone briefs; students apply through us. Sponsor pays for parts; students get real-world experience." badge="Programs" />
            <FeatureCard title="Thesis print grants" desc="PhD candidates can apply for a $1,000 print-grant per thesis project. Awardees featured as case studies." badge="PhD" />
            <FeatureCard title="Formula SAE / Solar Car / Rocketry" desc="Student engineering competition teams get dedicated sponsorship pricing and priority production queue." badge="Teams" />
            <FeatureCard title="Course-specific print packs" desc="Pre-built print packs mapped to named courses (MIT 2.007, Stanford ME101, and expanding). Instructors set up in one click." badge="Courses" />
            <FeatureCard title="Research lab procurement" desc="Dedicated PO / net-30 flow for university research labs. Grant-friendly invoicing." badge="Labs" />
          </div>
        </Container>
      </Section>
      <Section className="bg-slate-50 dark:bg-slate-950">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight">Partner schools</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Instructors — request a dedicated program page for your school. Our top-500 university landing page tier is being expanded weekly.</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
