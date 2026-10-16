// src/data/footerData.js
import {
  Instagram,
  Twitter,
  Dribbble,
  Linkedin,
} from "lucide-react";
import { LOCATION, LOCATION_LABEL } from "./location";

const footerStructure = {
  brand: {
    logo: {
      primary: "Glimmer",
      secondary: "Ink",
      tagline: "Where Code meets imagination",
    },
    description:
      `Web design and development studio in ${LOCATION_LABEL}. Business websites, online shops and management systems for businesses across Kenya.`,
    cta: {
      text: "Start your project",
      url: "/contact",
      hoverText: "Let's create →",
    },
  },

  // ✅ MUST match your current App routes
  navigation: [
    {
      title: "Discover",
      links: [
        { name: "Home", url: "/", hoverEffect: "underline" },
        { name: "Work", url: "/work", hoverEffect: "scale" },
        { name: "Services", url: "/services", hoverEffect: "underline" },
        { name: "About", url: "/about", hoverEffect: "highlight" },
        { name: "Blog", url: "/blog", hoverEffect: "underline" },
        { name: `Web Developer ${LOCATION.town}`, url: LOCATION.landingPath, hoverEffect: "underline" },
        { name: "Contact", url: "/contact", hoverEffect: "arrow" },
      ],
    },
  ],

  contact: {
    title: "Get in touch",
    social: [
      {
        icon: Instagram,
        url: "https://www.instagram.com/glimmerink.creations",
        label: "Instagram",
        bgHover: "bg-gradient-to-br from-yellow-400 to-pink-600",
      },
      {
        icon: Twitter,
        url: "https://x.com/GlimmerInk_",
        label: "Twitter",
        bgHover: "bg-gradient-to-br from-blue-400 to-blue-600",
      },
      {
        icon: Dribbble,
        url: "https://dribbble.com/Ehud_Guzman",
        label: "Dribbble",
        bgHover: "bg-gradient-to-br from-pink-400 to-red-500",
      },

      // ✅ If you don’t have them yet, keep as "#" (and component should hide them)
      {
        icon: Linkedin,
        url: "https://www.linkedin.com/company/glimmerink",
        label: "LinkedIn",
        bgHover: "bg-gradient-to-br from-blue-600 to-blue-800",
      },
    ],
  },
};

export default footerStructure;
