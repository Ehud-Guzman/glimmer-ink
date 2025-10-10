// DevJourneyShowcase.jsx
import JourneyCard from "./JourneyCard";
import { journeyProjects } from "./journeyProjects";

const DevJourneyShowcase = () => {
  return (
    <section className="bg-[var(--current-bg)] py-24 px-4 md:px-12 transition-colors duration-300 overflow-visible"> {/* Added overflow-visible */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--current-text)]">
          My Web Dev Journey
        </h2>
        <p className="mt-4 text-lg max-w-xl mx-auto text-[color:var(--neutral-600)] dark:text-[color:var(--neutral-300)]">
          Every build here tells a story — clean code, bold design, and zero shortcuts.
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-32"> {/* Added space-y-32 for better mobile spacing */}
        {journeyProjects.map((project, index) => (
          <JourneyCard
            key={index}
            project={project}
            alignRight={index % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
};

export default DevJourneyShowcase;