import { FiShield } from "react-icons/fi";

const navItems = [
  { id: "introduction", title: "Introduction" },
  { id: "information-collected", title: "Information We Collect" },
  { id: "data-use", title: "How We Use Your Data" },
  { id: "data-security", title: "Data Security" },
  { id: "data-retention", title: "Data Retention" },
  { id: "legal-rights", title: "Your Legal Rights" },
  { id: "third-party", title: "Third-Party Services" },
  { id: "cookies", title: "Cookies" },
  { id: "policy-changes", title: "Policy Updates" },
  { id: "contact", title: "Contact Us" },
];

export default function PolicySidebar({ activeSection, scrollToSection }) {
  return (
    <div className="lg:w-64 flex-shrink-0 hidden lg:block">
      <div className="sticky top-24 bg-[var(--current-bg)] rounded-xl shadow-lg border border-[var(--current-border)] p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FiShield className="text-primary" /> Policy Navigation
        </h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                activeSection === item.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-[var(--current-bg-hover)] text-[var(--current-text)]"
              }`}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
