import { ArrowIcon, MailIcon } from "./Icons";
import { Button } from "./Button";
import { siteConfig } from "@/data/site";

export function CTASection({
  title = "A clearer coding journey starts with the right first step.",
  text = "Share the learner’s age, current level, and goal. We’ll help identify a practical place to begin.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="section cta-section">
      <div className="container">
        <div className="cta-panel">
          <div>
            <span className="eyebrow eyebrow--light">Your next step</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="cta-actions">
            <Button href="/contact" variant="secondary">
              Discuss your goal <ArrowIcon />
            </Button>
            <Button href={`mailto:${siteConfig.email}`} variant="ghost">
              <MailIcon /> Email BitCode
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
