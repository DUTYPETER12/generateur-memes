import React from "react";

type Meme = {
  url: string;
  topText: string;
  bottomText: string;
};

type MemeGalleryProps = {
  gallery: Meme[];
};

export default function MemeGallery({ gallery }: MemeGalleryProps) {
  return (
    <section>
      <h2>Galerie des mèmes</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {gallery.length === 0 && <p>Aucun mème enregistré pour le moment.</p>}
        {gallery.map((meme, idx) => (
          <div key={idx} style={{ border: "1px solid #ddd", padding: 8 }}>
            <img src={meme.url} alt="Mème" style={{ maxWidth: 200, display: "block" }} />
            <div style={{ fontSize: 12, marginTop: 4 }}>
              <strong>{meme.topText}</strong>
              <br />
              <strong>{meme.bottomText}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}