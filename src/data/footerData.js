// src/data/footerData.js
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Dribbble,
  Linkedin,
} from "lucide-react";

const footerStructure = {
  brand: {
    logo: {
      primary: "Glimmer",
      secondary: "Ink",
      tagline: "Where Code meets imagination",
    },
    description:
      "Transforming ideas into exceptional digital experiences through innovative design and development solutions.",
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
        { name: "Contact", url: "/contact", hoverEffect: "arrow" },
      ],
    },
  ],

  contact: {
    title: "Get in touch",
    methods: [
      {
        icon: Mail,
        text: "nyamuehud@gmail.com",
        copyable: true,
        hoverColor: "text-primary",
      },
      {
        icon: Phone,
        text: "+254 746 527 253",
        action: () => {
          window.location.href = "tel:+254746527253";
        },
        hoverColor: "text-secondary",
      },
      {
        icon: MapPin,
        text: "Freelance, Kenya",
        action: () => {
          window.open("https://maps.google.com?q=Kenya", "_blank");
        },
        hoverColor: "text-accent",
      },
    ],

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

  // keep this if you’re not rendering FooterLegal; otherwise pass it in
  legal: [
    { name: "Privacy Policy", url: "#" },
    { name: "Terms of Service", url: "#" },
    { name: "Cookie Policy", url: "#" },
  ],

  credits: {
    text: "Website Created by GlimmerInk Creations",
    phone: "+254 746 527 253",
    url: "https://glimmerink.co.ke",
  },
};

export default footerStructure;
