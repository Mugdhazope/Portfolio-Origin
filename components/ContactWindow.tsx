"use client";

import { ArrowUpRight, Mail, Network } from "lucide-react";
import { personalLinks } from "@/data/personal";

export function ContactWindow() {
  return (
    <article className="contact-window">
      <h3>Say hello.</h3>
      <p className="contact-copy">
        For projects, research, or anything worth building — email is the best place to reach me.
      </p>
      <div className="contact-emails">
        {personalLinks.emails.map((email) => (
          <a key={email} className="contact-email" href={`mailto:${email}`}>
            {email} <ArrowUpRight size={16} />
          </a>
        ))}
      </div>
      <div className="contact-links">
        {personalLinks.emails.map((email) => (
          <a key={email} href={`mailto:${email}`}><Mail size={14} /> {email}</a>
        ))}
        {personalLinks.linkedin ? (
          <a href={personalLinks.linkedin} target="_blank" rel="noreferrer"><Network size={14} /> LinkedIn</a>
        ) : null}
      </div>
    </article>
  );
}
