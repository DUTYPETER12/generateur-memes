import React, { useRef, useEffect, useState } from "react";
import MemeShareButtons from "../components/MemeShareButtons";

type MemeEditorProps = {
  image: string;
  onMemeGenerated: (url: string) => void;
};

export default function MemeEditor({ image, onMemeGenerated }: MemeEditorProps) {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Dessine le mème sur le canvas
  const drawMeme = () => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.src = image;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      ctx.font = `${Math.floor(canvas.width / 10)}px Impact, Arial, sans-serif`;
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 4;
      ctx.textAlign = "center";

      // Texte du haut
      ctx.textBaseline = "top";
      ctx.fillText(topText.toUpperCase(), canvas.width / 2, 10);
      ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 10);

      // Texte du bas
      ctx.textBaseline = "bottom";
      ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 10);
      ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 10);

      // Génère l'URL du mème pour le parent
      onMemeGenerated(canvas.toDataURL("image/png"));
    };
  };

  useEffect(() => {
    drawMeme();
    // eslint-disable-next-line
  }, [image, topText, bottomText]);

  return (
    <section>
      <div style={{ margin: "16px 0" }}>
        <input
          type="text"
          placeholder="Texte du haut"
          value={topText}
          onChange={e => setTopText(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          type="text"
          placeholder="Texte du bas"
          value={bottomText}
          onChange={e => setBottomText(e.target.value)}
        />
      </div>
      <canvas ref={canvasRef} style={{ maxWidth: "100%", border: "1px solid #ccc" }} />
    </section>
  );
}