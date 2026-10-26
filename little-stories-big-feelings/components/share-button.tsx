"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";

export function ShareButton() {
  const [copied, setCopied] = useState(false);
  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: document.title, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      // A canceled native share is an intentional no-op.
    }
  }
  return <button className="text-link share-button" onClick={share} type="button">{copied ? <><Check size={15} /> Link copied</> : <><Link2 size={15} /> Share this story</>}</button>;
}
