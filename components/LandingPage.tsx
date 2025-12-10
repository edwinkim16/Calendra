'use client'
import Image from "next/image"

export default function LandingPage() {
  return (
    <main className="flex items-center p-10 gap-24 animate-fade-in max-md:flex-col">
        {/* Section with branding, heading, subheading, and illustration */}
        <section className="flex flex-col items-center">
            {/* App Logo */}
            <Image
            src='/assets/logo.svg'
            width={300}
            height={300}
            alt="Logo"
            />
        </section>
    </main>
  );
}