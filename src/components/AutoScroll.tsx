import { useEffect, useRef, useState } from "react";

interface AutoScrollProps {
  /** Démarre l'auto-scroll (déclenché après l'ouverture de l'enveloppe) */
  active: boolean;
}

/**
 * Défilement automatique ARRÊT PAR ARRÊT.
 * La page glisse doucement vers chaque point marqué [data-stop],
 * le centre à l'écran, marque une pause de lecture (adaptée au texte),
 * puis passe au suivant.
 * - Pause si l'utilisateur scrolle lui-même.
 * - Bouton pause / reprise, puis "revoir" à la fin.
 */
export default function AutoScroll({ active }: AutoScrollProps) {
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);

  const pausedRef = useRef(false);
  const cancelledRef = useRef(false);
  const runningRef = useRef(false);
  const userPauseUntil = useRef(0);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const blocked = () =>
    pausedRef.current || performance.now() < userPauseUntil.current;

  // Attente (gelée pendant une pause)
  const wait = (ms: number) =>
    new Promise<void>((resolve) => {
      let remaining = ms;
      let last = performance.now();
      const tick = (now: number) => {
        if (cancelledRef.current) return resolve();
        const dt = now - last;
        last = now;
        if (!blocked()) remaining -= dt;
        if (remaining <= 0) resolve();
        else requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });

  // Glissement fluide (easeInOutCubic) vers une position Y
  const smoothScrollTo = (targetY: number, duration: number) =>
    new Promise<void>((resolve) => {
      let startY = window.scrollY;
      let dist = targetY - startY;
      const startT = performance.now();
      let pausedAccum = 0;
      let lastPauseStart = 0;
      let wasBlocked = false;

      const step = (now: number) => {
        if (cancelledRef.current) return resolve();

        // gère les pauses sans casser l'easing
        if (blocked()) {
          if (!wasBlocked) {
            wasBlocked = true;
            lastPauseStart = now;
          }
          requestAnimationFrame(step);
          return;
        } else if (wasBlocked) {
          wasBlocked = false;
          pausedAccum += now - lastPauseStart;
          // recalcule depuis la position courante (au cas où l'user a bougé)
          startY = window.scrollY;
          dist = targetY - startY;
        }

        const elapsed = now - startT - pausedAccum;
        const t = Math.min(1, elapsed / duration);
        const eased =
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        window.scrollTo(0, startY + dist * eased);
        if (t < 1) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });

  // Centre un élément dans la fenêtre
  const centerY = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const elCenter = window.scrollY + rect.top + rect.height / 2;
    let y = elCenter - window.innerHeight / 2;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return Math.max(0, Math.min(max, y));
  };

  // Temps de lecture selon la quantité de texte
  const readingTime = (el: HTMLElement) => {
    if (el.hasAttribute("data-programme-item")) return 2400;
    const chars = (el.innerText || "").trim().length;
    const ms = 3000 + chars * 16;
    return Math.max(3000, Math.min(8500, ms));
  };

  const isProgrammeItem = (el: HTMLElement | undefined) =>
    !!el?.hasAttribute("data-programme-item");

  // Durée de la transition vers un arrêt
  const transitionTime = (
    currentEl: HTMLElement | undefined,
    nextEl: HTMLElement | undefined
  ) => {
    // Entre les cartes du programme : un peu plus rapide
    if (isProgrammeItem(nextEl)) return 1200;
    // Quitter le programme vers la section suivante : encore plus rapide,
    // pour éviter le moment presque vide avec seulement le bloc 21h visible.
    if (isProgrammeItem(currentEl) && !isProgrammeItem(nextEl)) return 700;
    return 1500;
  };

  const runSequence = async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    cancelledRef.current = false;
    setFinished(false);

    const stops = Array.from(
      document.querySelectorAll<HTMLElement>("[data-stop]")
    );
    if (stops.length === 0) {
      runningRef.current = false;
      return;
    }

    // Pause de lecture sur le tout premier bloc (accueil)
    await wait(readingTime(stops[0]));

    for (let i = 1; i < stops.length; i++) {
      if (cancelledRef.current) break;
      const currentEl = stops[i - 1];
      const el = stops[i];
      await smoothScrollTo(centerY(el), transitionTime(currentEl, el));
      if (cancelledRef.current) break;
      await wait(readingTime(el));
    }

    if (!cancelledRef.current) setFinished(true);
    runningRef.current = false;
  };

  useEffect(() => {
    if (!active) return;
    const startTimer = setTimeout(runSequence, 400);

    const onUser = () => {
      userPauseUntil.current = performance.now() + 3000;
    };
    window.addEventListener("wheel", onUser, { passive: true });
    window.addEventListener("touchmove", onUser, { passive: true });

    return () => {
      clearTimeout(startTimer);
      cancelledRef.current = true;
      runningRef.current = false;
      window.removeEventListener("wheel", onUser);
      window.removeEventListener("touchmove", onUser);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const restart = () => {
    cancelledRef.current = true;
    runningRef.current = false;
    setPaused(false);
    setFinished(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      cancelledRef.current = false;
      runSequence();
    }, 900);
  };

  if (!active) return null;

  return (
    <button
      onClick={() => (finished ? restart() : setPaused((p) => !p))}
      aria-label={finished ? "Revoir" : paused ? "Reprendre" : "Mettre en pause"}
      className="fixed bottom-6 right-20 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/60 bg-ivory-50/80 text-gold-600 shadow-[0_8px_24px_-8px_rgba(120,95,55,0.5)] backdrop-blur-sm transition hover:scale-105 hover:bg-ivory-100"
    >
      {finished ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      ) : paused ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M7 5l12 7-12 7z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      )}
    </button>
  );
}
