import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/courses",
    "/teaching-method",
    "/projects",
    "/testimonials",
    "/contact",
    "/links",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority:
      path === "" ? 1 : path === "/courses" || path === "/contact" ? 0.9 : 0.7,
  }));
}
