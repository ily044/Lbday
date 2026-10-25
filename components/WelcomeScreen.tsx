"use client";

import { content } from "../data/content";

type Props = {
  onStart: () => void;
};

export default function WelcomeScreen({ onStart }: Props) {
  return (
    <main className="welcome-screen">
      <div className="ambient-glow glow-one" />
      <div className="ambient-glow glow-two" />
      <div className="ambient-glow glow-three" />

      <div className="welcome-stars" aria-hidden="true">
        ✦　♡　✧　♡　✦
      </div>

      <div className="welcome-content">
        <p className="eyebrow">Особливий день особливої людини</p>

        <div className="heart-symbol" aria-hidden="true">
          ♡
        </div>

        <h1>
          Для тебе, Лізочко
        </h1>

        <p className="welcome-description">
          Моє сонечко, я підготував для тебе маленький особливий світ,
          наповнений нашими спогадами, теплими словами та любов’ю.
        </p>

        <p className="welcome-description">
          З днем народження! Нехай ця маленька пригода
          подарує тобі усмішку!
        </p>

        <button className="primary-button" onClick={onStart}>
          Відкрити мій подарунок ♡
        </button>

        <p className="small-note">
          Створено з любов’ю для мого серденька 💗
        </p>
      </div>
    </main>
  );
}