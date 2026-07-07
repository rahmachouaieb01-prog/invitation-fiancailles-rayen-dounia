import { motion } from "framer-motion";
import Countdown from "./Countdown";
import Rsvp from "./Rsvp";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: "easeOut" as const },
};

function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400/70 sm:w-24" />
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-gold-400">
        <path d="M12 21s-7.5-4.9-10-9.2C.4 8.7 2 5 5.5 5 7.7 5 9.4 6.3 12 9c2.6-2.7 4.3-4 6.5-4C22 5 23.6 8.7 22 11.8 19.5 16.1 12 21 12 21z" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400/70 sm:w-24" />
    </div>
  );
}

const programme = [
  { heure: "20h00", titre: "Accueil des invités", detail: "Premiers instants de partage" },
  { heure: "21h00", titre: "L'arrivée de Rayen & Dounia", detail: "Le bonheur prend vie" },
  { heure: "21h00", titre: "Cérémonie des fiançailles", detail: "Échange des promesses et des bagues" },
  { heure: "22h00", titre: "Soirée dansante", detail: "Musique live & douceurs sucrées" },
];

export default function Invitation() {
  return (
    <main className="relative">
      {/* Fixed satin background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250,246,238,0.78), rgba(250,246,238,0.86)), url('/images/satin-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Vertical satin ribbons on wide screens */}
      <div className="satin-ribbon-v pointer-events-none fixed inset-y-0 left-6 z-0 hidden w-10 opacity-70 xl:block" />
      <div className="satin-ribbon-v pointer-events-none fixed inset-y-0 right-6 z-0 hidden w-10 opacity-70 xl:block" />

      {/* ===== Hero ===== */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div {...fadeUp} data-stop className="space-y-6">
          <img
            src="/images/wax-seal.png"
            alt="Sceau R et D"
            className="float-soft seal-mask mix-blend-multiply mx-auto w-24 drop-shadow-[0_12px_24px_rgba(120,95,55,0.3)] sm:w-28"
          />
          <p className="font-serif text-xs tracking-[0.5em] uppercase text-cocoa/70 sm:text-sm">
            Avec la bénédiction de Dieu
          </p>
          <p className="mx-auto max-w-md font-serif text-lg text-cocoa/80 italic sm:text-xl">
            Les familles Chouaieb &amp; Mekacher seraient honorées de votre présence pour célébrer les fiançailles de leurs aînés.
          </p>
          <h1 className="font-script text-6xl leading-tight text-gold-gradient sm:text-8xl">
            Rayen <span className="font-serif text-4xl align-middle sm:text-6xl">&amp;</span> Dounia
          </h1>
          <Divider />
          <div className="font-serif text-cocoa">
            <p className="text-2xl font-medium tracking-wide sm:text-3xl">Jeudi 16 Juillet 2026</p>
            <p className="mt-1 text-sm tracking-[0.35em] uppercase text-cocoa/60">
              à partir de 20 heures
            </p>
          </div>
        </motion.div>

        <motion.a
          href="#compte-a-rebours"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-cocoa/50 transition-colors hover:text-gold-500"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase">Découvrir</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-lg"
          >
            ↓
          </motion.span>
        </motion.a>
      </section>

      {/* ===== Countdown ===== */}
      <section id="compte-a-rebours" className="relative px-6 py-24">
        <motion.div {...fadeUp} data-stop className="mx-auto max-w-4xl space-y-10 text-center">
          <div className="space-y-3">
            <p className="text-xs tracking-[0.45em] uppercase text-gold-600">Le grand jour approche</p>
            <h2 className="font-script text-5xl text-gold-gradient sm:text-6xl">Compte à rebours</h2>
          </div>
          <Countdown />
        </motion.div>
      </section>

      {/* ===== Details ===== */}
      <section className="relative px-6 py-24">
        <motion.div {...fadeUp} data-stop className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-3 text-center">
            <p className="text-xs tracking-[0.45em] uppercase text-gold-600">Les détails</p>
            <h2 className="font-script text-5xl text-gold-gradient sm:text-6xl">La réception</h2>
            <Divider />
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: (
                  <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                ),
                titre: "Date & Heure",
                lignes: ["Jeudi 16 Juillet 2026", "Accueil dès 20h00"],
              },
              {
                icon: (
                  <>
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </>
                ),
                titre: "Lieu",
                lignes: ["Salle des Fêtes Shirine"],
              },
              {
                icon: (
                  <path d="M12 3l2.4 4.8 5.3.8-3.8 3.7.9 5.3L12 15.1l-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L12 3z" />
                ),
                titre: "Tenue",
                lignes: ["Laissez parler votre élégance"],
              },
            ].map((c) => (
              <div
                key={c.titre}
                className="satin-panel gold-frame relative rounded-xl p-8 text-center shadow-[0_20px_45px_-20px_rgba(120,95,55,0.4)] transition-transform duration-500 hover:-translate-y-1.5"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/50 bg-white/60">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 stroke-gold-500"
                    fill="none"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {c.icon}
                  </svg>
                </div>
                <h3 className="mb-3 font-serif text-xl font-semibold tracking-wide text-cocoa">
                  {c.titre}
                </h3>
                {c.lignes.map((l) => (
                  <p key={l} className="text-sm leading-relaxed text-cocoa/70">
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== Programme ===== */}
      <section className="relative px-6 py-24">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl space-y-12">
          <div data-stop className="space-y-3 text-center">
            <p className="text-xs tracking-[0.45em] uppercase text-gold-600">Déroulement de la soirée</p>
            <h2 className="font-script text-5xl text-gold-gradient sm:text-6xl">Programme</h2>
            <Divider />
          </div>

          <div className="relative space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[19px] before:w-px before:bg-gradient-to-b before:from-transparent before:via-gold-400/60 before:to-transparent sm:before:left-1/2">
            {programme.map((p, i) => (
              <div
                key={p.heure}
                data-stop={i < programme.length - 1 ? true : undefined}
                data-programme-item
                className={`relative flex items-start gap-6 sm:w-1/2 ${
                  i % 2 === 0
                    ? "sm:mr-auto sm:flex-row-reverse sm:pr-10 sm:text-right"
                    : "sm:ml-auto sm:pl-10"
                } pl-14 sm:pl-0 ${i % 2 !== 0 ? "sm:pl-10" : ""}`}
              >
                <span
                  className={`absolute top-1 left-3 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-gold-500 bg-ivory-50 shadow-[0_0_0_4px_rgba(201,169,97,0.2)] sm:left-auto ${
                    i % 2 === 0 ? "sm:-right-[7px]" : "sm:-left-[7px]"
                  }`}
                />
                <div className="satin-panel gold-border w-full rounded-lg p-5 shadow-[0_14px_35px_-18px_rgba(120,95,55,0.45)]">
                  <p className="font-serif text-lg font-semibold text-gold-500">{p.heure}</p>
                  <p className="font-serif text-xl text-cocoa">{p.titre}</p>
                  <p className="mt-1 text-sm text-cocoa/65 italic">{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== In Memoriam ===== */}
      <section className="relative px-6 py-24">
        <motion.div {...fadeUp} data-stop className="mx-auto max-w-2xl">
          <div className="satin-panel gold-frame relative rounded-xl px-8 py-12 text-center shadow-[0_20px_50px_-24px_rgba(120,95,55,0.4)] sm:px-14">
            <div className="mb-6 flex justify-center">
              <svg viewBox="0 0 24 24" className="h-7 w-7 fill-gold-400 float-soft">
                <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2z" />
              </svg>
            </div>
            <p className="mx-auto max-w-md font-serif text-lg leading-relaxed text-cocoa/80 italic sm:text-xl">
              Une douce pensée pour nos êtres chers, qui nous regardent du Ciel et vivent à jamais dans nos cœurs.
            </p>
            <div className="mx-auto my-6 h-px w-20 bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
            <div className="mx-auto flex max-w-fit flex-wrap items-center justify-center gap-x-3 gap-y-2 text-gold-500 sm:flex-nowrap sm:gap-4 md:gap-5 px-2">
              <span className="font-serif text-base font-medium tracking-[0.08em] sm:tracking-[0.16em] uppercase text-gold-400 sm:text-lg md:text-xl">
                ISMAHENE
              </span>
              <span className="text-gold-300/90">•</span>
              <span className="font-serif text-base font-medium tracking-[0.08em] sm:tracking-[0.16em] uppercase text-gold-400 sm:text-lg md:text-xl">
                FATHI
              </span>
              <span className="text-gold-300/90">•</span>
              <span className="font-serif text-base font-medium tracking-[0.08em] sm:tracking-[0.16em] uppercase text-gold-400 sm:text-lg md:text-xl">
                MONSEF
              </span>
              <span className="text-gold-300/90">•</span>
              <span className="font-serif text-base font-medium tracking-[0.08em] sm:tracking-[0.16em] uppercase text-gold-400 sm:text-lg md:text-xl">
                SAMI
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== RSVP ===== */}
      <section className="relative px-6 py-24">
        <motion.div {...fadeUp} className="mx-auto max-w-4xl space-y-12">
          <div data-stop className="space-y-3 text-center">
            <p className="text-xs tracking-[0.45em] uppercase text-gold-600">Votre réponse nous est précieuse</p>
            <h2 className="font-script text-5xl text-gold-gradient sm:text-6xl">Confirmation</h2>
            <Divider />
          </div>
          <div data-stop data-stop-manual>
            <Rsvp />
          </div>
        </motion.div>
      </section>

      {/* ===== Footer ===== */}
      <footer data-stop className="relative px-6 pt-10 pb-16 text-center">
        <div className="satin-ribbon mx-auto mb-10 h-2 max-w-xs rounded-full" />
        <p className="font-script text-4xl text-gold-gradient">R &amp; D</p>
        <p className="mt-3 text-xs tracking-[0.4em] uppercase text-cocoa/60">
          16 · 07 · 2026 — Avec tout notre amour
        </p>
      </footer>
    </main>
  );
}
