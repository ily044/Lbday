type Props = {
  title: string;
  subtitle: string;
  options: {
    title: string;
    description: string;
    symbol: string;
    completed: boolean;
    onClick: () => void;
  }[];
  unlocked?: boolean;
  onContinue?: () => void;
  continueLabel?: string;
};

export default function SectionMenu({
  title,
  subtitle,
  options,
  unlocked = false,
  onContinue,
  continueLabel = "Продовжити",
}: Props) {
  const completedCount = options.filter(
    (option) => option.completed
  ).length;

  return (
    <section className="page-section">
      <div className="section-heading">
        <span className="eyebrow">ТРОХИ ТЕПЛА ДЛЯ ТЕБЕ</span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="progress-text">
        Переглянуто: {completedCount} з {options.length}
      </div>

      <div className="menu-grid">
        {options.map((option) => (
          <button
            key={option.title}
            className={`menu-card ${
              option.completed ? "menu-card-completed" : ""
            }`}
            onClick={option.onClick}
          >
            <span className="card-symbol">{option.symbol}</span>
            <span className="card-title">{option.title}</span>
            <span className="card-description">
              {option.description}
            </span>
            <span className="card-footer">
              {option.completed ? "Переглянуто ✓" : "Відкрити →"}
            </span>
          </button>
        ))}
      </div>

      {unlocked && onContinue && (
        <div className="firework-area">
          <div className="firework firework-one" />
          <div className="firework firework-two" />
          <div className="firework firework-three" />

          <p className="unlock-message">
            Ти відкрила обидва розділи, сонечко!
          </p>

          <button
            className="primary-button continue-button"
            onClick={onContinue}
          >
            {continueLabel} <span>→</span>
          </button>
        </div>
      )}
    </section>
  );
}