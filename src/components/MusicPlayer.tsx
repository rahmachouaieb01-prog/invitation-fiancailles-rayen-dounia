import { useEffect, useRef, useState } from "react";

interface MusicPlayerProps {
  /** Quand true, on tente de lancer la lecture */
  active: boolean;
}

/**
 * Lecteur de musique d'ambiance discret.
 * - Tente de démarrer dès l'arrivée sur la page.
 * - Si le navigateur bloque l'autoplay, la musique se débloque
 *   automatiquement au premier contact (tap / clic / touche).
 * - Un bouton flottant permet de couper / réactiver le son.
 */
export default function MusicPlayer({ active }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  // Initialise l'élément audio une seule fois
  useEffect(() => {
    const audio = new Audio("https://files.catbox.moe/lobv2v.mp3");
    audio.loop = true;
    audio.volume = 0.0;
    audio.preload = "auto";
    audioRef.current = audio;
    audio.addEventListener("canplaythrough", () => setReady(true), { once: true });
    return () => {
      audio.pause();
    };
  }, []);

  // Fondu progressif du volume
  const fadeTo = (target: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const step = () => {
      if (!audioRef.current) return;
      const diff = target - audio.volume;
      if (Math.abs(diff) < 0.02) {
        audio.volume = target;
        if (target === 0) audio.pause();
        return;
      }
      audio.volume = Math.min(1, Math.max(0, audio.volume + diff * 0.08));
      requestAnimationFrame(step);
    };
    step();
  };

  const startPlayback = () => {
    const audio = audioRef.current;
    if (!audio || playing) return Promise.resolve();

    return audio
      .play()
      .then(() => {
        setPlaying(true);
        fadeTo(0.45);
      })
      .catch(() => {
        // Certains navigateurs bloquent l'autoplay sonore.
        // On réessaiera automatiquement au premier contact utilisateur.
      });
  };

  // Tente de démarrer dès que le composant est actif
  useEffect(() => {
    if (active) startPlayback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, ready]);

  // Si l'autoplay est bloqué, on relance au premier contact utilisateur
  useEffect(() => {
    if (!active || playing) return;

    const unlock = () => {
      startPlayback();
    };

    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("keydown", unlock);
    window.addEventListener("touchstart", unlock, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, playing, ready]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      fadeTo(0);
      setPlaying(false);
    } else {
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          setPlaying(true);
          fadeTo(0.45);
        })
        .catch(() => {});
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Couper la musique" : "Activer la musique"}
      className="fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/60 bg-ivory-50/80 text-gold-600 shadow-[0_8px_24px_-8px_rgba(120,95,55,0.5)] backdrop-blur-sm transition hover:scale-105 hover:bg-ivory-100"
    >
      {playing && (
        <>
          <span className="absolute inset-0 animate-ping rounded-full border border-gold-400/40" />
          <span className="absolute -inset-1 rounded-full border border-gold-300/30" />
        </>
      )}
      {playing ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M9 18V5l12-2v13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
      <span className="sr-only">{ready ? "" : "Chargement..."}</span>
    </button>
  );
}
