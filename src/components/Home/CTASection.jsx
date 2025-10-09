// components/Home/CTASection.jsx
import { motion } from "framer-motion";
import { useState } from "react";

const CTASection = () => {
  const [hovered, setHovered] = useState(false);

  const CodeBackground = () => {
    const grid = [
      {
        id: 1,
        content: `function createPremiumUI() {\n  return {\n    design: "glass-morphism",\n    animations: "framer-motion",\n    quality: "top-tier"\n  }\n}`,
        position: { top: "10%", left: "5%" },
        delay: 0.2
      },
      {
        id: 2,
        content: `const project = {\n  name: "Elite Design",\n  stack: ["React", "Tailwind", "Framer"],\n  status: "inDevelopment"\n}`,
        position: { top: "25%", left: "30%" },
        delay: 0.4
      },
      {
        id: 3,
        content: `// Premium UI Component\n<GlassCard \n  gradient="from-cyan-500 to-blue-600"\n  blur="xl"\n  className="p-8"\n/>`,
        position: { top: "40%", left: "55%" },
        delay: 0.6
      },
      {
        id: 4,
        content: `@keyframes premiumEffect {\n  0% { opacity: 0.3; }\n  50% { opacity: 0.1; }\n  100% { opacity: 0.3; }\n}`,
        position: { top: "55%", left: "80%" },
        delay: 0.8
      },
      {
        id: 5,
        content: `const techStack = [\n  "Next.js", \n  "TypeScript", \n  "Tailwind",\n  "Framer Motion",\n  "Three.js"\n];`,
        position: { top: "70%", left: "20%" },
        delay: 1.0
      },
      {
        id: 6,
        content: `/* Design System */\n$primary: #38bdf8;\n$secondary: #818cf8;\n$glass: rgba(255,255,255,0.05);`,
        position: { top: "85%", left: "45%" },
        delay: 1.2
      }
    ];

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {grid.map((item) => (
          <motion.div
            key={item.id}
            className="absolute font-mono text-xs opacity-10"
            style={{ ...item.position, color: "var(--neutral-400)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{
              duration: 15,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut"
            }}
          >
            {item.content.split("\n").map((line, i) => (
              <div key={i} className="whitespace-pre">{line}</div>
            ))}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden"
      style={{ backgroundColor: "var(--current-bg)" }}
    >
      <CodeBackground />

      {/* Optional Grid Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMxYTIyNDAiPjxwYXRoIGQ9Ik00MCAwSDB2NDAiLz48L2c+PC9zdmc+')]" />

      {/* Glow Accents */}
      <div className="absolute w-[30rem] h-[30rem] rounded-full blur-[160px] top-1/4 left-[10%] -z-10" style={{ backgroundColor: "var(--primary-500)", opacity: 0.1 }} />
      <div className="absolute w-[25rem] h-[25rem] rounded-full blur-[140px] bottom-1/4 right-[10%] -z-10" style={{ backgroundColor: "var(--secondary-500)", opacity: 0.1 }} />
      <div className="absolute w-[20rem] h-[20rem] rounded-full blur-[120px] top-[20%] right-[20%] -z-10" style={{ backgroundColor: "var(--primary-400)", opacity: 0.1 }} />

      {/* Glass Card */}
      <motion.div
        className="relative z-10 w-full max-w-4xl text-center backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border shadow-2xl"
        style={{
          background: "var(--current-card)",
          borderColor: "var(--current-border)",
          color: "var(--current-text)",
          boxShadow: hovered
            ? "0 25px 50px -12px var(--shadow-primary)"
            : "var(--shadow-md)"
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -5 }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6"
          style={{
            background: "linear-gradient(90deg, var(--primary-500), var(--secondary-500))",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent"
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="font-mono">
            {"<"}CraftDigitalExcellence{"/>"}
          </span>
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ color: "var(--current-text)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Transform your vision into a <span style={{ color: "var(--primary-400)", fontWeight: 500 }}>premium digital experience</span> with cutting-edge design and development.
        </motion.p>

        <div className="relative inline-block">
          <motion.div
            className="absolute -inset-1 rounded-full blur-lg opacity-70"
            style={{
              background: "linear-gradient(to right, var(--primary-500), var(--secondary-500))"
            }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.a
            href="/contact"
            className="relative inline-block px-8 py-4 rounded-full font-bold text-lg transition-all"
            style={{
              background: "linear-gradient(to right, var(--primary-500), var(--secondary-500))",
              color: "white"
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              Start Your Project
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.a>
        </div>

        {/* Tech Stack */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {['React', 'NextJS', 'TypeScript', 'TailwindCSS', 'FramerMotion', 'ThreeJS'].map((tech, i) => (
            <motion.span
              key={i}
              className="px-4 py-2 rounded-full text-sm border transition-all"
              style={{
                backgroundColor: "var(--current-input)",
                color: "var(--current-text)",
                borderColor: "var(--current-border)"
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "var(--primary-100)",
                color: "var(--primary-600)"
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
