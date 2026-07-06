import { motion } from "framer-motion";
import { useState } from "react";

interface EnvelopeProps {
  onOpened: () => void;
  onInteract?: () => void;
}

export default function Envelope({ onOpened, onInteract }: EnvelopeProps) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpened, 6600);
  };

  // Premier contact avec l'écran : lance la musique tout de suite
  // (les navigateurs exigent une interaction pour jouer du son).
  const handleFirstInteract = () => {
    onInteract?.();
  };

  return (
    <motion.div
      onPointerDown={handleFirstInteract}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-4"
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        backgroundImage:
          "linear-gradient(rgba(250,246,238,0.82), rgba(250,246,238,0.88)), url('/images/satin-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: opening ? 0 : 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="mb-8 text-center font-serif text-sm tracking-[0.45em] uppercase text-gold-600"
      >
        Une invitation vous attend
      </motion.p>

      {/* Envelope */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={
          opening
            ? { opacity: 0, y: 60, scale: 0.94, transition: { delay: 5.9, duration: 0.7 } }
            : { opacity: 1, y: 0, transition: { duration: 1, delay: 0.15 } }
        }
        className="relative w-full max-w-[520px]"
        style={{ perspective: 1400 }}
      >
        <div className="relative aspect-[3/2] w-full">
          {/* Card sliding out */}
          <motion.div
            initial={{ y: 0 }}
            animate={opening ? { y: "-46%", transition: { delay: 0.9, duration: 1.8, ease: "easeOut" } } : {}}
            className="absolute inset-x-[6%] top-[6%] bottom-[10%] z-10 rounded-sm satin-panel gold-border shadow-md"
          >
            <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
              <span
                dir="rtl"
                className="text-center text-2xl font-semibold leading-relaxed text-gold-600 sm:text-3xl"
                style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif", textShadow: "0 1px 1px rgba(255,255,255,0.6)" }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </span>
              <span className="max-w-[80%] text-center font-serif text-sm italic leading-relaxed text-cocoa/75 sm:text-base">
                Une journée écrite par Allah,
                <br />
                un bonheur partagé avec vous.
              </span>
            </div>
          </motion.div>

          {/* Envelope body */}
          <div
            className="absolute inset-0 z-20 rounded-md shadow-[0_25px_60px_-15px_rgba(120,95,55,0.45)]"
            style={{
              background: "linear-gradient(160deg,#fbf7ef 0%,#f3ecdd 55%,#ede3ce 100%)",
              clipPath: "polygon(0 0, 50% 52%, 100% 0, 100% 100%, 0 100%)",
            }}
          />
          {/* Side folds shading */}
          <div
            className="absolute inset-0 z-20 opacity-60"
            style={{
              background:
                "linear-gradient(105deg, rgba(160,135,90,0.14) 0%, transparent 28%), linear-gradient(-105deg, rgba(160,135,90,0.14) 0%, transparent 28%)",
              clipPath: "polygon(0 0, 50% 52%, 100% 0, 100% 100%, 0 100%)",
            }}
          />

          {/* Flap */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={opening ? { rotateX: -178 } : {}}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformOrigin: "top center" }}
            className="preserve-3d absolute inset-x-0 top-0 z-30 h-[55%]"
          >
            <div
              className="backface-hidden absolute inset-0 rounded-t-md"
              style={{
                background: "linear-gradient(180deg,#fdfaf3 0%,#f1e8d5 70%,#e9dec5 100%)",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                filter: "drop-shadow(0 4px 6px rgba(120,95,55,0.18))",
              }}
            />
          </motion.div>

          {/* Satin ribbon horizontal */}
          <motion.div
            animate={opening ? { opacity: 0, transition: { duration: 0.5 } } : {}}
            className="satin-ribbon shimmer absolute left-1/2 top-1/2 z-40 h-[13%] w-[112%] -translate-x-1/2 -translate-y-1/2"
          />

          {/* Wax seal */}
          <motion.button
            onClick={handleOpen}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.96 }}
            animate={
              opening
                ? { scale: 0.6, opacity: 0, rotate: 8, transition: { duration: 0.5 } }
                : {}
            }
            className="absolute top-[calc(50%+1px)] left-1/2 z-50 w-[19%] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full focus:outline-none"
            aria-label="Ouvrir l'invitation"
          >
            <img
              src="/images/wax-seal.png"
              alt="Sceau R et D"
              className="float-soft seal-mask mix-blend-multiply w-full rounded-full drop-shadow-[0_10px_18px_rgba(120,95,55,0.35)]"
            />
          </motion.button>
        </div>
      </motion.div>

      <motion.button
        onClick={handleOpen}
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-10 cursor-pointer border-b border-gold-400/60 pb-1 font-serif text-sm tracking-[0.35em] uppercase text-cocoa/80 transition-colors hover:text-gold-600"
      >
        Toucher le sceau pour ouvrir
      </motion.button>
    </motion.div>
  );
}
