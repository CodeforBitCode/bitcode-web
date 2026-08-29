/* eslint-disable @next/next/no-img-element -- The precompressed 5 KB brand asset is cheaper than an image optimizer request. */
import type { Metadata } from "next";
import { CodeIcon, MailIcon, MessageIcon, SparkIcon } from "@/components/Icons";
import { LinktreeButton } from "@/components/LinktreeButton";
import { siteConfig, whatsappUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "BitCode Links and Contact",
  description:
    "Find BitCode learning paths, project guidance, email, and direct contact options in one simple link hub.",
  alternates: { canonical: "/links" },
  robots: { index: true, follow: true },
};

export default function LinksPage() {
  return (
    <section className="links-page">
      <div className="links-orb links-orb--one" />
      <div className="links-orb links-orb--two" />
      <div className="links-profile">
        <img
          src="/bitcode-logo.webp"
          alt="BitCode logo"
          width="132"
          height="132"
          decoding="async"
          fetchPriority="high"
        />
        <span className="links-kicker">
          <SparkIcon /> Coding made clear
        </span>
        <h1>BitCode</h1>
        <p>Founded by {siteConfig.founder}</p>
        <small>Understand. Practise. Build.</small>
        <div className="linktree-list">
          <LinktreeButton href="/contact" icon={<MessageIcon />}>
            Find your starting path
          </LinktreeButton>
          <LinktreeButton href="/courses" icon={<CodeIcon />}>
            Explore learning paths
          </LinktreeButton>
          <LinktreeButton href="/" icon={<SparkIcon />}>
            Visit BitCode home
          </LinktreeButton>
          <LinktreeButton
            href={`mailto:${siteConfig.email}`}
            icon={<MailIcon />}
          >
            Send an email
          </LinktreeButton>
          <LinktreeButton href={whatsappUrl()} icon={<MessageIcon />}>
            Send a quick message
          </LinktreeButton>
        </div>
        <footer>
          Understand. Practise. Build. <span>BitCode</span>
        </footer>
      </div>
    </section>
  );
}
