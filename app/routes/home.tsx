import React, { useState } from "react";
import MemeUploader from "../components/MemeUploader";
import MemeEditor from "../components/MemeEditor";
import MemeGallery from "../components/MemeGallery";
import MemeShareButtons from "../components/MemeShareButtons";

type Meme = {
  url: string;
  topText: string;
  bottomText: string;
};

export function meta() {
  return [
    { title: "GENERATEUR DES MEMES" },
    { name: "description", content: "Bienvenue dans mon application" },
  ];
}

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [memeUrl, setMemeUrl] = useState<string | null>(null);
  const [gallery, setGallery] = useState<Meme[]>([]);

  const handleSaveToGallery = () => {
    if (!memeUrl) return;
    setGallery([{ url: memeUrl, topText: "", bottomText: "" }, ...gallery]);
  };

  return (
    <main>
      <h1>Générateur de mèmes</h1>
      <MemeUploader onUpload={setImage} />
      {image && (
        <MemeEditor image={image} onMemeGenerated={setMemeUrl} />
      )}
      {memeUrl && (
        <div style={{ marginTop: 16 }}>
          <a href={memeUrl} download="meme.png">
            <button>Télécharger le mème</button>
          </a>
          <button onClick={handleSaveToGallery} style={{ marginLeft: 8 }}>
            Ajouter à la galerie
          </button>
        </div>
      )}
      <MemeGallery gallery={gallery} />
    </main>
  );
}