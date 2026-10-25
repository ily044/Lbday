"use client";

import { useEffect, useState } from "react";

import WelcomeScreen from "../components/WelcomeScreen";
import SectionMenu from "../components/SectionMenu";
import Memories from "../components/Memories";
import SpecialThings from "../components/SpecialThings";
import Letter from "../components/Letter";
import FinalSurprise from "../components/FinalSurprise";
import MusicPlayer from "../components/MusicPlayer";
import { content } from "../data/content";

type Screen =
  | "welcome"
  | "menu1"
  | "memories"
  | "special"
  | "menu2"
  | "letter"
  | "wishes"
  | "final";

type Progress = {
  memories: boolean;
  special: boolean;
  letter: boolean;
  wishes: boolean;
};

const initialProgress: Progress = {
  memories: false,
  special: false,
  letter: false,
  wishes: false,
};

const STORAGE_KEY = "birthday-gift-progress";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [progress, setProgress] =
    useState<Progress>(initialProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        setProgress({
          memories: parsed.memories === true,
          special: parsed.special === true,
          letter: parsed.letter === true,
          wishes: parsed.wishes === true,
        });
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(progress)
      );
    }
  }, [progress, ready]);

  function completeSection(
    section: keyof Progress,
    nextScreen: Screen
  ) {
    setProgress((previous) => ({
      ...previous,
      [section]: true,
    }));

    setScreen(nextScreen);
  }

  if (!ready) {
    return <main className="loading-screen">З любов'ю… ♡</main>;
  }

  const firstStageComplete =
    progress.memories && progress.special;

  const secondStageComplete =
    progress.letter && progress.wishes;

  return (
    <main className={`site-shell screen-${screen}`}>
      <header className="site-header">
        <button
          className="brand"
          onClick={() => setScreen("welcome")}
          aria-label="На початок"
        >
          with love <span>♡</span>
        </button>

        <span className="header-caption">
          маленький світ для Лізочки
        </span>
      </header>

      {screen === "welcome" && (
        <WelcomeScreen onStart={() => setScreen("menu1")} />
      )}

      {screen === "menu1" && (
        <SectionMenu
          title="Трохи про нас"
          subtitle="Відкрий обидва розділи, щоб дізнатися, що чекає далі."
          options={[
            {
              title: "Наші моменти",
              description: "Шість маленьких історій у фотографіях",
              symbol: "♡",
              completed: progress.memories,
              onClick: () => setScreen("memories"),
            },
            {
              title: "101 причина, чому я тебе люблю",
              description: "101 причина чому мені з тобою добре",
              symbol: "✧",
              completed: progress.special,
              onClick: () => setScreen("special"),
            },
          ]}
          unlocked={firstStageComplete}
          continueLabel="Відкрити наступну частину"
          onContinue={() => setScreen("menu2")}
        />
      )}

      {screen === "memories" && (
        <Memories
          onBack={() => setScreen("menu1")}
          onComplete={() =>
            completeSection("memories", "menu1")
          }
        />
      )}

      {screen === "special" && (
        <SpecialThings
          onBack={() => setScreen("menu1")}
          onComplete={() =>
            completeSection("special", "menu1")
          }
        />
      )}

      {screen === "menu2" && (
        <SectionMenu
          title="Ще дещо для тебе"
          subtitle="Моє серденько, попереду ще слова, які я хочу тобі сказати."
          options={[
            {
              title: "Особистий лист",
              description: "Кілька слів від усього серця",
              symbol: "✉",
              completed: progress.letter,
              onClick: () => setScreen("letter"),
            },
            {
              title: "Мої побажання",
              description: "Приємні слова тільки для тебе",
              symbol: "✧",
              completed: progress.wishes,
              onClick: () => setScreen("wishes"),
            },
          ]}
          unlocked={secondStageComplete}
          continueLabel="Відкрити фінальний сюрприз"
          onContinue={() => setScreen("final")}
        />
      )}

      {screen === "letter" && (
        <Letter
          onBack={() => setScreen("menu2")}
          onComplete={() =>
            completeSection("letter", "menu2")
          }
        />
      )}

      {screen === "wishes" && (
        <section className="page-section wishes-page">
          <button
            className="back-button"
            onClick={() => setScreen("menu2")}
          >
            ← Назад
          </button>

          <div className="section-heading">
            <span className="eyebrow">ВІД УСЬОГО СЕРЦЯ</span>
            <h2>{content.wishesTitle}</h2>
            <p>Для тебе, моє золотце.</p>
          </div>

          <div className="wishes-list">
            {content.wishes.map((wish, index) => (
              <article className="wish-item" key={wish}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>{wish}</p>
                <span className="wish-heart">♡</span>
              </article>
            ))}
          </div>

          <div className="firework-area letter-continue">
            <div className="firework firework-one" />
            <div className="firework firework-two" />

            <button
              className="primary-button"
              onClick={() =>
                completeSection("wishes", "menu2")
              }
            >
              Повернутися до меню <span>→</span>
            </button>
          </div>
        </section>
      )}

      {screen === "final" &&
        firstStageComplete &&
        secondStageComplete && <FinalSurprise />}

      <footer className="site-footer">
        <span>Для моєї Лізочки</span>
        <span>♡</span>
      </footer>

      <MusicPlayer />
    </main>
  );
}