"use client";
import React, { useState } from "react";

interface SummarizeResponse {
  summary: string;
}

export default function Home() {
  const [inputText, setInputText] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSummarize = async (
    e: React.MouseEvent<HTMLButtonElement> | undefined
  ): Promise<void> => {
    e?.preventDefault?.();

    if (!inputText.trim()) {
      setError("Please enter some text to summarize!");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const resp = await fetch("https://sanpri-textsummarizer-backend.hf.space/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }

      const data: SummarizeResponse = await resp.json();
      setSummary(data.summary);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Oh sorry! ${err.message}`
          : "Gosh! Failed to summarize text. Please try again!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (): Promise<void> => {
    if (summary) {
      try {
        await navigator.clipboard.writeText(summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text:", err);
      }
    }
  };

  const clearAll = (): void => {
    setInputText("");
    setSummary("");
    setError("");
  };

  // SVG Icons as components to replace lucide-react
  const CheckIcon = () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="20,6 9,17 4,12"></polyline>
    </svg>
  );

  const CopyIcon = () => (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-black to-yellow-400  p-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <p className="text-5xl font-bold text-white drop-shadow-lg flex justify-center font-serif">
              ✨ Text Summarizer ✨
            </p>
          </div>
          <p className="text-xl text-yellow-200 font-semibold">
          &quot;&quot;Let&quot;s refine and condense your text for clarity and impact.&quot;&quot;
          </p>
        </div>

        {/* Main Interface */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl border-4 border-red-500 p-8 shadow-2xl relative">
          {/* Input Section */}
          <div className="space-y-4 mb-8">
            <label className="block text-lg font-bold text-red-600 font-serif">
              ✍️ Enter Your Text!
            </label>
            <div className="relative">
              <textarea
                name=""
                id=""
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-40 bg-yellow-50 text-black border-4 border-yellow-400 rounded-2xl p-4 placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-red-400 focus:border-red-500 resize-none text-base leading-relaxed font-sans"
                placeholder="📝 Enter your text below to generate a concise and impactful summary."
                maxLength={5000}
              />
              <div className="absolute bottom-3 right-3 bg-red-500 text-white rounded-lg px-2 py-1 text-xs font-bold">
                {inputText.length}/5000
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border-4 border-red-400 rounded-xl flex items-center gap-3">
              <div className="text-2xl">⚠️</div>
              <p className="text-red-700 text-sm font-semibold">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleSummarize}
              disabled={!inputText.trim() || isLoading}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-8 py-4 rounded-full text-white font-bold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg border-4 border-yellow-300"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  🎭 Summarizing...
                </>
              ) : (
                <>⚡ Summarize! ⚡</>
              )}
            </button>

            <button
              onClick={clearAll}
              className="px-6 py-4 border-4 border-yellow-500 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-500 transition-all duration-200 text-lg"
            >
              🧹 Clear All
            </button>
          </div>

          {/* Summary Section */}
          {(summary || isLoading) && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-red-600 font-serif">
                  🎉 Here&quot;s Your Summary! 🎉
                </p>
                {summary && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors duration-200 text-sm font-bold bg-yellow-200 px-3 py-1 rounded-full border-2 border-red-400"
                  >
                    {copied ? (
                      <>
                        <CheckIcon />
                        🎊 Copied!
                      </>
                    ) : (
                      <>
                        <CopyIcon />
                        📋 Copy text
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-red-100 border-4 border-yellow-400 rounded-2xl p-6 min-h-32 relative">
                {/* Stars decoration */}
                <div className="absolute top-2 right-2 text-yellow-500 text-xs">
                  ✨⭐✨
                </div>

                {isLoading ? (
                  <div className="flex items-center justify-center h-24">
                    <div className="flex space-x-2">
                      <div className="text-2xl animate-bounce delay-100">
                        ✨
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-800 text-base leading-relaxed font-medium">
                    {summary}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-yellow-200">
          <p className="text-sm font-semibold">
            💡 Built with modern AI tools. Delivering clarity, one summary at a
            time.
          </p>
        </div>
      </div>
    </div>
  );
}
