import React from "react";

type MemeShareButtonsProps = {
  memeUrl: string;
};

export default function MemeShareButtons({ memeUrl }: MemeShareButtonsProps) {
  const shareText = encodeURIComponent("Regardez mon mème !");
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(memeUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(memeUrl)}&text=${shareText}`;
  const whatsappUrl = `https://wa.me/?text=${shareText}%20${encodeURIComponent(memeUrl)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(memeUrl);
      alert("Lien du mème copié !");
    } catch {
      alert("Impossible de copier le lien.");
    }
  };

  return (
    <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
      <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
        <button style={{ background: "#1877f2", color: "#fff" }}>Partager sur Facebook</button>
      </a>
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
        <button style={{ background: "#1da1f2", color: "#fff" }}>Partager sur Twitter</button>
      </a>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <button style={{ background: "#25d366", color: "#fff" }}>Partager sur WhatsApp</button>
      </a>
      <button onClick={handleCopy}>Copier le lien</button>
    </div>
  )
  };