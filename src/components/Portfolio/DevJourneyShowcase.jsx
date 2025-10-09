// DevJourneyShowcase.jsx
import JourneyCard from "./JourneyCard";
import { journeyProjects } from "./journeyProjects";

const DevJourneyShowcase = () => {
  return (
    <section id="portfolio" className="bg-[var(--current-bg)] py-16 md:py-24 px-4 md:px-12 transition-colors duration-300">
      <div className="text-center mb-16 md:mb-20">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-[var(--current-text)]">
          My Web Dev Journey
        </h2>
        <p className="mt-4 text-base md:text-lg max-w-xl mx-auto text-[color:var(--neutral-600)] dark:text-[color:var(--neutral-300)]">
          Every build here tells a story — clean code, bold design, and zero shortcuts.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {journeyProjects.map((project, index) => (
          <JourneyCard
            key={project.title}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default DevJourneyShowcase;