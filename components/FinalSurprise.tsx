import { content } from "../data/content";

export default function FinalSurprise() {
  return (
    <section className="final-screen">
      <div className="final-glow" />
      <div className="final-heart">♡</div>

      <span className="eyebrow">І НАОСТАНОК, МОЯ ЛЮБА</span>

      <h2>{content.finalTitle}</h2>

      <p>{content.finalText}</p>

      <div className="final-gift">
        <div className="gift-sparkle">✧</div>
        <div className="gift-box">🎁</div>
        <div className="gift-sparkle gift-sparkle-two">✦</div>
      </div>

      <p className="final-note">
        А поки що міцно обіймаю тебе подумки, моє золотце.
      </p>

      <div className="final-signature">Твій ❤️</div>
    </section>
  );
}