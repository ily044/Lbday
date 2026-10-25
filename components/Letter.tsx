"use client";

import { useState } from "react";
import { content } from "../data/content";

type Props = {
  onBack: () => void;
  onComplete: () => void;
};

export default function Letter({ onBack, onComplete }: Props) {
  const [opened, setOpened] = useState(false);

  return (
    <section className="page-section letter-page">
      <button className="back-button" onClick={onBack}>
        ← Назад
      </button>

      <div className="section-heading">
        <span className="eyebrow">КІЛЬКА СЛІВ ВІД МЕНЕ</span>
        <h2>{content.letterTitle}</h2>
        <p>Для тебе, моє серденько.</p>
      </div>

      {!opened ? (
        <button
          className="envelope"
          onClick={() => setOpened(true)}
          aria-label="Відкрити лист"
        >
          <span className="envelope-heart">♡</span>
          <span className="envelope-title">Для Лізочки</span>
          <span className="envelope-hint">
            Натисни, щоб відкрити лист
          </span>
        </button>
      ) : (
        <article className="letter-card letter-reveal">
          <div className="letter-heart">♡</div>
          <p className="letter-text">{content.letter}</p>
          <div className="letter-signature">З любов'ю, для тебе ❤️</div>
        </article>
      )}

      {opened && (
        <div className="firework-area letter-continue">
          <div className="firework firework-one" />
          <div className="firework firework-two" />

          <button className="primary-button" onClick={onComplete}>
            Повернутися до меню<span>→</span>
          </button>
        </div>
      )}
    </section>
  );
}