import { content } from "../data/content";

type Props = {
  onBack: () => void;
  onComplete: () => void;
};

export default function Memories({ onBack, onComplete }: Props) {
  return (
    <section className="page-section">
      <button className="back-button" onClick={onBack}>
        ← Назад
      </button>

      <div className="section-heading">
        <span className="eyebrow">НАША МАЛЕНЬКАЯ ІСТОРІЯ</span>
        <h2>{content.memoriesTitle}</h2>
        <p>{content.memoriesText}</p>
      </div>

      <div className="photo-grid">
        {content.photos.map((photo, index) => (
          <article
            className={`photo-card photo-card-${index + 1}`}
            key={photo.src}
          >
            <div className="photo-image-wrap">
              <img
                src={photo.src}
                alt={`Наш спогад ${index + 1}`}
                className="memory-photo"
                loading={index < 2 ? "eager" : "lazy"}
              />
              <span className="photo-index">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <p>{photo.caption}</p>
          </article>
        ))}
      </div>

      <p className="photo-hint">
        І це лише шість маленьких частинок нашої історії, кицюню. ♡
      </p>

      <button className="primary-button" onClick={onComplete}>
        Повернутися до меню <span>→</span>
      </button>
    </section>
  );
}