import { MessageCircle, Phone } from "lucide-react";

// Fixed Call / WhatsApp bar for phones. Hidden from md up, where the header has
// its own Get a Quote button. Footer adds matching bottom padding so it never
// covers content.
export default function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 md:hidden border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      role="region"
      aria-label="Quick contact"
    >
      <div className="grid grid-cols-2 gap-2.5">
        <a
          href="tel:+254746527253"
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white active:bg-primary-dark"
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          Call
        </a>
        <a
          href="https://wa.me/254746527253"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white active:bg-green-800"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
