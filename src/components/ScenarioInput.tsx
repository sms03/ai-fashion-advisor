
import React from 'react';

interface ScenarioInputProps {
  onScenarioSubmit: (scenario: string) => void;
}

const ScenarioInput: React.FC<ScenarioInputProps> = ({ onScenarioSubmit }) => {
  const [scenario, setScenario] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (scenario.trim()) {
      onScenarioSubmit(scenario);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto space-y-4">
      <div className="relative">
        <textarea
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
          placeholder="Describe your scenario (e.g., 'Going to a wedding next weekend, need a formal outfit')"
          className="w-full min-h-[120px] p-4 rounded-lg border border-fashion-border
            focus:border-accent focus:ring-2 focus:ring-accent/10
            transition-all duration-300 ease-in-out
            bg-white/70 backdrop-blur-sm
            placeholder:text-fashion-muted text-fashion-text resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 px-6 rounded-lg bg-accent/90 backdrop-blur-sm text-white font-medium
          transform transition-all duration-300 ease-in-out
          hover:bg-accent hover:scale-[1.02] active:scale-[0.98]
          disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!scenario.trim()}
      >
        Get Fashion Advice
      </button>
    </form>
  );
};

export default ScenarioInput;
