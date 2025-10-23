import React from "react";
import { useState, useEffect } from "react";
import Upload from "../components/Upload";
import { useGenerate } from "../hooks/useGenerate";
import api from "../services/api";

export default function Studio() {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("vogue");
  const [history, setHistory] = useState<any[]>([]);
  const { loading, error, result, generate, abort } = useGenerate();

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const res = await api.get("/generations?limit=5", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setHistory(res.data);
    } catch {}
  }

  async function onGenerate() {
    const fd = new FormData();
    fd.append("prompt", prompt);
    fd.append("style", style);
    if (file) fd.append("image", file);
    try {
      const res = await generate(fd);
      setHistory((prev) => [res, ...prev].slice(0, 5));
    } catch {}
  }

  function restore(gen: any) {
    setPrompt(gen.prompt);
    setStyle(gen.style);
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold">AI Studio (Simulated)</h1>
      <div className="mt-4">
        <label className="block">Prompt</label>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mt-2">
        <label>Style</label>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="border p-2"
        >
          <option value="vogue">Vogue</option>
          <option value="street">Street</option>
          <option value="retro">Retro</option>
        </select>
      </div>
      <div className="mt-2">
        <Upload onFile={setFile} />
      </div>
      <div className="mt-4 space-x-2">
        <button
          onClick={onGenerate}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
        <button onClick={abort} className="bg-gray-200 px-4 py-2 rounded">
          Abort
        </button>
      </div>
      {error && (
        <div role="alert" className="mt-2 text-red-600">
          {error}
        </div>
      )}
      {result && (
        <div className="mt-4">
          Result:
          <img
            src={`${api.defaults.baseURL}${result.imageUrl}`}
            alt="res"
            className="max-h-48"
          />
        </div>
      )}
      <div className="mt-6">
        <h2 className="font-semibold">History (last 5)</h2>
        <div className="grid grid-cols-1 gap-2 mt-2">
          {history.map((h) => (
            <div
              key={h.id}
              className="border p-2 flex items-center justify-between"
            >
              <div>
                <div className="font-medium">
                  {h.prompt} — {h.style}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(h.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {h.imageUrl && (
                  <img
                    src={`${api.defaults.baseURL}${h.imageUrl}`}
                    alt="thumb"
                    className="h-12"
                  />
                )}
                <button
                  onClick={() => restore(h)}
                  className="bg-yellow-300 px-2 py-1 rounded"
                >
                  Restore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
