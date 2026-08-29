import Link from "next/link";
import { Logo } from "./Logo";
import { MailIcon, MessageIcon } from "./Icons";
import { footerItems, siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>
            Mentor-led coding for learners who want to understand the logic,
            practise actively, and build work they can explain.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <h2>Quick links</h2>
          <div className="footer-links footer-links--quick">
            {footerItems.map((item) => (
              <Link key={item.href} href={item.href} prefetch={false}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
        <div>
          <h2>Reach BitCode</h2>
          <div className="footer-links footer-contact">
            <a href={`mailto:${siteConfig.email}`}>
              <MailIcon /> {siteConfig.email}
            </a>
            <a href={`tel:+${siteConfig.phoneRaw}`}>
              <MessageIcon /> {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          &copy; {new Date().getFullYear()} {siteConfig.businessName}.
          Understand. Practise. Build.
        </span>
        <Link href="/contact" prefetch={false}>
          Discuss a learning goal
        </Link>
      </div>
    </footer>
  );
}
