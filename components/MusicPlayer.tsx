"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [enabled, setEnabled] = useState(false);
  const [volume, setVolume] = useState(5);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const hintTimer = window.setTimeout(() => {
      setShowHint(true);
    }, 3500);

    const hideTimer = window.setTimeout(() => {
      setShowHint(false);
    }, 10000);

    return () => {
      window.clearTimeout(hintTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (enabled) {
      audio.pause();
      setEnabled(false);
      return;
    }

    audio.volume = volume / 100;

    try {
      await audio.play();
      setEnabled(true);
      setShowHint(false);
    } catch {
      setEnabled(false);
      setSettingsOpen(true);
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/soft-jazz.mp3"
        loop
        preload="none"
        onPause={() => setEnabled(false)}
        onPlay={() => setEnabled(true)}
      />

      {showHint && !settingsOpen && (
        <button
          className="music-hint"
          onClick={() => {
            setSettingsOpen(true);
            setShowHint(false);
          }}
        >
          Музику можна вимкнути тут ♡
          <span>Налаштування звуку →</span>
        </button>
      )}

      {settingsOpen && (
        <div className="music-panel">
          <div className="music-panel-heading">
            <div>
              <strong>Музика для тебе</strong>
              <p>Легкий джаз для приємного моменту</p>
            </div>

            <button
              className="music-close"
              onClick={() => setSettingsOpen(false)}
              aria-label="Закрити налаштування"
            >
              ×
            </button>
          </div>

          <button
            className="music-toggle"
            onClick={toggleMusic}
          >
            <span>{enabled ? "Ⅱ" : "▶"}</span>
            {enabled ? "Вимкнути музику" : "Увімкнути музику"}
          </button>

          <label className="volume-label" htmlFor="music-volume">
            Гучність <strong>{volume}%</strong>
          </label>

          <input
            id="music-volume"
            className="volume-slider"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(event) => {
              const nextVolume = Number(event.target.value);
              setVolume(nextVolume);

              if (nextVolume === 0 && audioRef.current) {
                audioRef.current.pause();
                setEnabled(false);
              }
            }}
          />

          <button
            className="music-off"
            onClick={() => {
              if (audioRef.current) audioRef.current.pause();
              setEnabled(false);
              setVolume(0);
            }}
          >
            Вимкнути звук повністю
          </button>
        </div>
      )}

      <button
        className={`music-fab ${enabled ? "music-fab-playing" : ""}`}
        onClick={() => {
          setSettingsOpen((previous) => !previous);
          setShowHint(false);
        }}
        aria-label="Налаштування музики"
        title="Налаштування музики"
      >
        <span className="music-note">𝄞</span>
        <span className="music-fab-dot">
          {enabled ? "♫" : "♪"}
        </span>
      </button>
    </>
  );
}