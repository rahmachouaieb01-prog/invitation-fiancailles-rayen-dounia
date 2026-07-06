import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    const title = "Invitation de fiançailles de Rayen & Dounia";
    const text = "Vous êtes invités à célébrer les fiançailles de Rayen & Dounia ✨";

    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }

      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore cancel / blocked clipboard
    }
  };

  return (
    <button
      onClick={share}
      aria-label="Partager l'invitation"
      className="fixed bottom-6 left-6 z-[60] flex h-12 items-center gap-2 rounded-full border border-gold-400/60 bg-ivory-50/80 px-4 text-gold-600 shadow-[0_8px_24px_-8px_rgba(120,95,55,0.5)] backdrop-blur-sm transition hover:scale-[1.02] hover:bg-ivory-100"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M8.6 13.5l6.8 4" />
        <path d="M15.4 6.5l-6.8 4" />
      </svg>
      <span className="font-serif text-xs tracking-[0.28em] uppercase">
        {copied ? "Lien copié" : "Partager"}
      </span>
    </button>
  );
}
