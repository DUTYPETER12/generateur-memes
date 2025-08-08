import React from "react";

type MemeUploaderProps = {
  onUpload: (img: string) => void;
};

export default function MemeUploader({ onUpload }: MemeUploaderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => onUpload(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };
  return <input type="file" accept="image/*" onChange={handleChange} />;
}