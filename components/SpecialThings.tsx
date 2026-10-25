"use client";

import { useState } from "react";
import { content } from "../data/content";

type Props = {
  onBack: () => void;
  onComplete: () => void;
};

export default function SpecialThings({
  onBack,
  onComplete,
}: Props) {
  const [opened, setOpened] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);

  function toggleReason(index: number) {
    setOpened((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  }

  return (
    <section className="page-section reasons-page">
      <button className="back-button" onClick={onBack}>
        ← Назад
      </button>

      <div className="section-heading">
        <span className="eyebrow">ДЛЯ МОЄЇ ЛІЗОЧКИ</span>
        <h2>{content.specialTitle}</h2>
        <p>{content.specialText}</p>
      </div>

      <div className="reasons-counter">
        <span className="counter-heart">♡</span>
        <strong>{opened.length}</strong> зі 101 причин відкрито
        <div className="counter-track">
          <div
            className="counter-fill"
            style={{ width: `${(opened.length / 101) * 100}%` }}
          />
        </div>
      </div>

      <div className="reasons-grid">
        {content.reasons.map((reason, index) => {
          const isOpen = showAll || opened.includes(index);

          return (
            <button
              className={`reason-card ${
                isOpen ? "reason-card-open" : ""
              }`}
              key={index}
              onClick={() => toggleReason(index)}
              aria-expanded={isOpen}
            >
              <span className="reason-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              {isOpen ? (
                <span className="reason-text">{reason}</span>
              ) : (
                <span className="reason-hidden">
                  Натисни, щоб відкрити ♡
                </span>
              )}

              <span className="reason-symbol">
                {isOpen ? "♥" : "+"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="reasons-actions">
        <button
          className="secondary-button"
          onClick={() => setShowAll((previous) => !previous)}
        >
          {showAll ? "Згорнути причини" : "Відкрити всі 101"}
        </button>

        <p>І навіть 101 — це ще не всі причини, золотце.</p>
      </div>

      <button className="primary-button" onClick={onComplete}>
        Повернутися до меню <span>→</span>
      </button>
    </section>
  );
}