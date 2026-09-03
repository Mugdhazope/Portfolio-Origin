"use client";

import { ProfileSocialLinks } from "@/components/ProfileSocialLinks";

export function ContactWindow() {
  return (
    <article className="contact-window">
      <h3>Say hello.</h3>
      <p className="contact-copy">
        For projects, research, or anything worth building — email is the best place to reach me.
      </p>
      <ProfileSocialLinks className="contact-social-links" size={18} />
    </article>
  );
}
