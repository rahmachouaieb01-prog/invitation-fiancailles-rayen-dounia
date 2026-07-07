import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgvyjnv";

export default function Rsvp() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [attending, setAttending] = useState<"oui" | "non">("oui");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    setError("");

    const payload = {
      nom: name.trim(),
      presence: attending === "oui" ? "Avec plaisir" : "Avec regret",
      invites: guests,
      mot_du_coeur: message.trim(),
      evenement: "Fiançailles Rayen & Dounia",
      date: "16 juillet 2026",
      _subject: `RSVP – ${name.trim()}`,
    };

    try {
      if (FORMSPREE_ENDPOINT) {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error("submit-failed");
        }
      }

      setSent(true);
    } catch {
      setError(
        "L'envoi n'a pas abouti. Vérifiez votre endpoint Formspree dans Vercel puis réessayez."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-md border border-gold-400/40 bg-white/70 px-4 py-3 font-sans text-sm text-cocoa placeholder:text-cocoa/40 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-400/50 transition";

  return (
    <div className="satin-panel gold-frame relative mx-auto w-full max-w-xl rounded-xl p-8 shadow-[0_25px_60px_-20px_rgba(120,95,55,0.4)] sm:p-12">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 py-8 text-center"
          >
            <img
              src="/images/wax-seal.png"
              alt=""
              className="w-20 float-soft seal-mask mix-blend-multiply"
            />
            <p className="font-script text-4xl text-gold-gradient">Merci {name} !</p>
            <p className="max-w-sm font-serif text-lg text-cocoa/80 italic">
              {attending === "oui"
                ? "Votre présence illuminera cette soirée. Nous avons hâte de célébrer avec vous."
                : "Nous sommes tristes de ne pas vous compter parmi nous, mais nous vous remercions de tout cœur."}
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -16 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="space-y-2 text-center">
              <p className="font-script text-4xl text-gold-gradient sm:text-5xl">
                Le plaisir de vous accueillir commence ici
              </p>
              {!FORMSPREE_ENDPOINT && (
                <p className="mx-auto max-w-md text-xs leading-relaxed text-cocoa/45 italic">
                  Mode démo activé — ajoutez votre endpoint Formspree pour recevoir et consulter les réponses en ligne.
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs tracking-[0.25em] uppercase text-cocoa/70">
                Votre nom
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Prénom & Nom"
                required
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs tracking-[0.25em] uppercase text-cocoa/70">
                  Serez-vous des nôtres ?
                </label>
                <div className="flex overflow-hidden rounded-md border border-gold-400/40">
                  {(["oui", "non"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setAttending(v)}
                      className={`flex-1 cursor-pointer py-3 text-[11px] tracking-wide uppercase transition ${
                        attending === v
                          ? "bg-gradient-to-r from-ivory-100 via-champagne to-ivory-200 text-gold-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_8px_18px_-12px_rgba(178,141,74,0.45)]"
                          : "bg-white/60 text-cocoa/60 hover:bg-gold-300/15 hover:text-gold-500"
                      }`}
                    >
                      {v === "oui" ? "Avec plaisir" : "Avec regret"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs tracking-[0.25em] uppercase text-cocoa/70">
                  Invités
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className={inputClass}
                >
                  {["1", "2", "3", "4", "5"].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === "1" ? "personne" : "personnes"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs tracking-[0.25em] uppercase text-cocoa/70">
                Un mot du cœur
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Vos vœux pour les fiancés..."
                className={inputClass}
              />
            </div>

            {error && (
              <p className="text-center text-sm text-rose-600/80">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="shimmer relative w-full cursor-pointer rounded-md border border-gold-400/35 bg-gradient-to-r from-ivory-100 via-champagne to-ivory-200 py-3.5 font-serif text-sm font-semibold tracking-[0.35em] uppercase text-gold-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_14px_28px_-14px_rgba(178,141,74,0.42)] transition hover:brightness-[1.03] disabled:cursor-wait disabled:opacity-75"
            >
              {submitting ? "Envoi..." : "Je confirme ma présence"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
