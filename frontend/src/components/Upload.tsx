import React, { useState } from "react";
export default function Upload({
  onFile,
}: {
  onFile: (f: File | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      onFile(null);
      setPreview(null);
      return;
    }
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      alert("Only PNG/JPEG");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("Max 10MB");
      return;
    }
    onFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result));
    reader.readAsDataURL(file);
  }
  return (
    <div>
      <input type="file" accept="image/png,image/jpeg" onChange={onChange} />
      {preview && <img src={preview} alt="preview" className="mt-2 max-h-64" />}
    </div>
  );
}
