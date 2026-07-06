import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Envelope from "./components/Envelope";
import Invitation from "./components/Invitation";
import MusicPlayer from "./components/MusicPlayer";
import AutoScroll from "./components/AutoScroll";
import ShareButton from "./components/ShareButton";

export default function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Invitation is always mounted underneath so it is ready
          instantly when the envelope fades away (no gap / no latency) */}
      <Invitation />

      <AnimatePresence>
        {!opened && <Envelope key="envelope" onOpened={() => setOpened(true)} />}
      </AnimatePresence>

      {/* Musique d'ambiance : tente de démarrer dès le chargement,
          puis se débloque automatiquement au premier contact si besoin */}
      <MusicPlayer active />

      {/* Défilement automatique : la page se dévoile toute seule */}
      {opened && <AutoScroll active={opened} />}

      {/* Partage de l'invitation */}
      <ShareButton />
    </div>
  );
}
