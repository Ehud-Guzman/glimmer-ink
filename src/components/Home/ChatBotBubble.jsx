// components/Home/ChatBotBubble.jsx
import { motion } from "framer-motion";
import { FiMessageSquare, FiX, FiSend, FiChevronRight } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

/* =======================
   ENHANCED BOT BRAIN
======================= */

// Enhanced intent detection with confidence scoring
const detectIntent = (text) => {
  const lower = text.toLowerCase();
  
  // Keywords with weights
  const keywordMap = {
    web: { 
      keywords: ["website", "site", "web app", "landing page", "portfolio", "web design", "frontend", "ui/ux"],
      weight: 1.0
    },
    ecommerce: { 
      keywords: ["ecommerce", "online store", "shop", "sell online", "payment", "mpesa", "products", "store"],
      weight: 1.0
    },
    branding: { 
      keywords: ["logo", "branding", "brand identity", "design", "visual identity", "business card"],
      weight: 1.0
    },
    maintenance: { 
      keywords: ["fix", "update", "slow", "bug", "broken", "maintenance", "seo", "hosting", "optimize"],
      weight: 1.0
    },
    pricing: { 
      keywords: ["price", "cost", "quote", "budget", "how much", "estimate", "affordable"],
      weight: 0.9
    },
    greeting: { 
      keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "start"],
      weight: 0.5
    },
    thanks: { 
      keywords: ["thanks", "thank you", "appreciate"],
      weight: 0.3
    }
  };

  let bestMatch = { intent: "general", confidence: 0 };
  
  for (const [intent, data] of Object.entries(keywordMap)) {
    let score = 0;
    data.keywords.forEach(keyword => {
      if (lower.includes(keyword)) {
        score += data.weight;
      }
    });
    
    if (score > bestMatch.confidence) {
      bestMatch = { intent, confidence: score };
    }
  }
  
  // Check for questions
  if (lower.includes("?") && bestMatch.confidence < 0.5) {
    return { intent: "question", confidence: 0.6 };
  }
  
  // If user mentions contact info
  if (lower.match(/email|phone|number|contact/)) {
    return { intent: "contact", confidence: 0.8 };
  }
  
  return bestMatch;
};

// Extract details from user input
const extractDetails = (text, intent) => {
  const lower = text.toLowerCase();
  const details = {};
  
  // Extract business/personal
  if (lower.includes("business") || lower.includes("company") || lower.includes("corporate")) {
    details.type = "business";
  } else if (lower.includes("personal") || lower.includes("portfolio") || lower.includes("blog")) {
    details.type = "personal";
  } else if (lower.includes("organization") || lower.includes("ngo") || lower.includes("church")) {
    details.type = "organization";
  }
  
  // Extract product type
  if (intent === "ecommerce") {
    if (lower.includes("physical") || lower.includes("product") || lower.includes("goods")) {
      details.productType = "physical";
    } else if (lower.includes("digital") || lower.includes("download") || lower.includes("ebook")) {
      details.productType = "digital";
    } else if (lower.includes("service") || lower.includes("consulting") || lower.includes("booking")) {
      details.productType = "service";
    }
  }
  
  // Extract timeline
  if (lower.match(/\basap\b|\burgent\b|\bnow\b/)) {
    details.timeline = "ASAP";
  } else if (lower.match(/\bweek\b|\bweeks\b/)) {
    details.timeline = "Within weeks";
  } else if (lower.match(/\bmonth\b|\bmonths\b/)) {
    details.timeline = "Within months";
  } else if (lower.match(/\bflexible\b|\bno rush\b|\bwhenever\b/)) {
    details.timeline = "Flexible";
  }
  
  // Extract contact info
  const emailMatch = lower.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) details.email = emailMatch[0];
  
  const phoneMatch = lower.match(/(\+?\d{1,4}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{3,4}/);
  if (phoneMatch) details.phone = phoneMatch[0];
  
  // Extract budget mentions
  if (lower.match(/\d+[\s]*(k|thousand|ksh|usd|dollars?)/i)) {
    details.hasBudget = true;
  }
  
  return details;
};

// Smart response generator with conversation flow
const getSmartResponse = (intentData, conversation, userInput = "") => {
  const { intent, confidence } = intentData;
  const { stage, collected, lastBotMessage } = conversation;
  const lowerInput = userInput.toLowerCase();
  
  // Handle low confidence - ask for clarification
  if (confidence < 0.5 && stage === 0) {
    const clarifications = [
      "I'm not sure I understand. Are you looking for a website, online store, or something else?",
      "Could you clarify? I help with websites, ecommerce, branding, and maintenance.",
      "Let me know if you need: website, ecommerce store, branding, or fixes?"
    ];
    return clarifications[Math.floor(Math.random() * clarifications.length)];
  }
  
  // Handle thanks
  if (intent === "thanks") {
    return "You're welcome! 😊 Is there anything else I can help with?";
  }
  
  // Handle greetings
  if (intent === "greeting") {
    return "👋 Need a website, ecommerce store, or fixes? What can I help you with today?";
  }
  
  // Handle contact info sharing
  if ((intent === "contact" || collected.email || collected.phone) && stage >= 3) {
    return "🎉 Perfect! I've got your contact info. Our team will reach out within 24 hours with a customized proposal. Thank you! 🚀";
  }
  
  // Stage-based responses
  switch(stage) {
    case 0: // Initial - trying to identify intent
      const initialResponses = {
        web: "Websites are our specialty! Is this for a business, personal brand, or organization?",
        ecommerce: "Great choice for selling online! Are you selling physical products, digital goods, or services?",
        branding: "Branding is key to standing out! Starting fresh or redesigning existing branding?",
        maintenance: "Got it. Is your site currently live, or having issues with speed/functionality?",
        pricing: "I can help with pricing! What type of project are you considering?",
        question: "I'm happy to answer your questions! What would you like to know about our web services?",
        contact: "I can connect you with our team! What's the best way to reach you? (Email or phone)"
      };
      
      if (initialResponses[intent]) {
        return initialResponses[intent];
      }
      
      // If we've already asked but user didn't specify
      if (lastBotMessage && lastBotMessage.includes("Are you looking for")) {
        return "Could you tell me if you need: website, ecommerce, branding, or maintenance?";
      }
      
      return "What type of web service do you need: website, ecommerce, branding, or maintenance?";
    
    case 1: // Intent identified, need specifics
      const detailPrompts = {
        web: collected.type 
          ? `Perfect for a ${collected.type} website! What kind of features do you need? (e.g., contact form, gallery, blog)`
          : "Is this website for business, personal, or organizational use?",
        
        ecommerce: collected.productType
          ? `Great! ${collected.productType === 'physical' ? 'Physical products' : collected.productType === 'digital' ? 'Digital products' : 'Services'}. How many products, and do you need M-Pesa integration?`
          : "What will you be selling: physical goods, digital downloads, or services?",
        
        branding: "Do you have any existing design elements, colors, or inspiration you'd like to share?",
        
        maintenance: "What specific issues are you experiencing? (slow speed, bugs, security, updates)",
        
        pricing: collected.intent 
          ? `For ${collected.intent}, our pricing starts from Ksh 15,000. Do you have a specific budget in mind?`
          : "What type of project are you pricing? (website, ecommerce, etc.)"
      };
      
      return detailPrompts[collected.intent] || "Tell me more about your project requirements.";
    
    case 2: // Details collected, need timeline
      if (collected.timeline) {
        return `Timeline: ${collected.timeline}. What's the best way to contact you? Email or phone?`;
      }
      
      return "What's your timeline for this project? (ASAP, within weeks, within months, flexible)";
    
    case 3: // Timeline known, need contact
      if (collected.email || collected.phone) {
        return "🎉 Excellent! I have all the details. Our team will contact you within 24 hours with a tailored proposal. Thank you! 🚀";
      }
      
      // Check if user just shared contact info
      if (userInput.match(/email|phone|number|@|\.com|\d{10}/)) {
        return "🎉 Perfect! I've got your contact info. Our team will reach out within 24 hours. Thank you! 🚀";
      }
      
      return "How should we contact you? Please share your email or phone number.";
    
    default:
      return "Is there anything else I can help you with today?";
  }
};

// Determine next stage based on conversation
const getNextStage = (currentStage, intentData, details, lastBotMessage) => {
  const { intent, confidence } = intentData;
  
  // If we're in stage 0 and user gives a clear intent, move to stage 1
  if (currentStage === 0 && confidence >= 0.5 && intent !== "greeting" && intent !== "thanks") {
    return 1;
  }
  
  // If we're in stage 1 and user gives details about type/productType, move to stage 2
  if (currentStage === 1 && (details.type || details.productType || details.status)) {
    return 2;
  }
  
  // If we're in stage 2 and user mentions timeline, move to stage 3
  if (currentStage === 2 && details.timeline) {
    return 3;
  }
  
  // If we're in stage 3 and user gives contact info, move to stage 4 (complete)
  if (currentStage === 3 && (details.email || details.phone)) {
    return 4;
  }
  
  // If user asks for contact early, jump to stage 3
  if (intent === "contact" && currentStage < 3) {
    return 3;
  }
  
  return currentStage;
};

/* =======================
   QUICK REPLY COMPONENT
======================= */
const QuickReplies = ({ stage, intent, onSelect }) => {
  const getReplies = () => {
    if (stage === 0) {
      return [
        "Need a website",
        "Want to sell online", 
        "Fix my website",
        "Logo design",
        "Get pricing",
        "SEO help"
      ];
    }
    
    if (stage === 1) {
      switch(intent) {
        case "web": return ["Business", "Personal", "Organization"];
        case "ecommerce": return ["Physical products", "Digital goods", "Services"];
        case "branding": return ["New logo", "Rebranding", "Full identity"];
        case "maintenance": return ["Speed issues", "Bug fixes", "Updates", "SEO"];
        default: return ["Tell me more", "What's next?", "Examples"];
      }
    }
    
    if (stage === 2) {
      return ["ASAP", "1-2 weeks", "1 month", "Flexible"];
    }
    
    if (stage === 3) {
      return ["Email me", "Call me", "WhatsApp"];
    }
    
    return ["Start over", "More info", "Contact team"];
  };
  
  const replies = getReplies();
  
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {replies.map((reply, i) => (
        <button
          key={i}
          onClick={() => onSelect(reply)}
          className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 rounded-full transition flex items-center gap-1"
        >
          {reply} <FiChevronRight size={10} />
        </button>
      ))}
    </div>
  );
};

/* =======================
   MAIN COMPONENT
======================= */
const ChatBotBubble = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversation, setConversation] = useState({
    stage: 0,
    collected: {},
    intent: null,
    lastBotMessage: "",
    messageCount: 0
  });
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      
      // Add welcome message if first time
      if (messages.length === 0) {
        setTimeout(() => {
          const welcomeMsg = {
            text: "👋 Need a website, ecommerce store, or fixes? What can I help you with today?",
            sender: "ai",
            time: getTime()
          };
          setMessages([welcomeMsg]);
          setConversation(prev => ({ ...prev, lastBotMessage: welcomeMsg.text }));
        }, 500);
      }
    }
  }, [open]);

  const getTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const handleQuickReply = (reply) => {
    setInput(reply);
    setTimeout(() => sendMessage(), 100);
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    // Add user message
    const userMsg = {
      text,
      sender: "user",
      time: getTime()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Process after a short delay
    setTimeout(() => {
      // Detect intent with confidence
      const intentData = detectIntent(text);
      
      // Extract details from user input
      const details = extractDetails(text, intentData.intent);
      
      // Update conversation state
      setConversation(prev => {
        const newStage = getNextStage(prev.stage, intentData, details, prev.lastBotMessage);
        const newIntent = prev.intent || (intentData.confidence >= 0.5 ? intentData.intent : null);
        const newCollected = { 
          ...prev.collected, 
          ...details,
          intent: newIntent || prev.collected.intent
        };
        
        // Only update intent if we have a clear one
        if (intentData.confidence >= 0.5 && intentData.intent !== "greeting" && intentData.intent !== "thanks") {
          newCollected.intent = intentData.intent;
        }
        
        return {
          stage: newStage,
          collected: newCollected,
          intent: newIntent,
          lastBotMessage: prev.lastBotMessage,
          messageCount: prev.messageCount + 1
        };
      });

      // Get smart response
      const response = getSmartResponse(
        intentData, 
        {
          stage: conversation.stage,
          collected: { ...conversation.collected, ...details },
          lastBotMessage: conversation.lastBotMessage
        }, 
        text
      );

      // Add AI message
      const aiMsg = {
        text: response,
        sender: "ai",
        time: getTime()
      };

      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);
      
      // Update last bot message
      setConversation(prev => ({ ...prev, lastBotMessage: response }));
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setConversation({
      stage: 0,
      collected: {},
      intent: null,
      lastBotMessage: "",
      messageCount: 0
    });
    
    setTimeout(() => {
      const welcomeMsg = {
        text: "👋 Need a website, ecommerce store, or fixes? What can I help you with today?",
        sender: "ai",
        time: getTime()
      };
      setMessages([welcomeMsg]);
      setConversation(prev => ({ ...prev, lastBotMessage: welcomeMsg.text }));
    }, 300);
  };

  return (
    <div className="fixed bottom-6 right-0 z-40">
      {open ? (
        <motion.div
          className="glass bg-[var(--current-bg)] w-80 rounded-2xl shadow-xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {/* Header */}
          <div className="bg-primary p-4 text-white flex justify-between items-center">
            <h3 className="font-medium">Web Services Assistant</h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={resetChat}
                className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition"
                title="New chat"
              >
                New
              </button>
              <button onClick={() => setOpen(false)}>
                <FiX />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-64 p-4 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-sm opacity-70 text-center mt-20">
                👋 Need a website, ecommerce store, or fixes?
              </p>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`mb-3 ${
                      msg.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block px-3 py-2 rounded-lg max-w-[80%] ${
                        msg.sender === "user"
                          ? "bg-primary text-white"
                          : "bg-white/10 text-orange"
                      }`}
                    >
                      {msg.text.split('\n').map((line, i) => (
                        <p key={i} className="mb-1 last:mb-0">{line}</p>
                      ))}
                    </div>
                    <div className="text-xs opacity-50 mt-1">{msg.time}</div>
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-center space-x-1 mb-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300" />
                  </div>
                )}
              </>
            )}
            
            {/* Quick Replies - only show if not typing and we have messages */}
            {!isTyping && messages.length > 0 && conversation.stage < 4 && (
              <QuickReplies 
                stage={conversation.stage}
                intent={conversation.collected.intent}
                onSelect={handleQuickReply}
              />
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10">
            <div className="flex">
              <input
                ref={inputRef}
                type="text"
                className="flex-1 px-3 py-2 rounded-l bg-white/10 text-sm text-orange outline-none"
                placeholder="Type your request..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="px-4 py-2 bg-primary text-black rounded-r hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FiSend size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.button
          className="bg-primary w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition relative"
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiMessageSquare size={22} />
          {conversation.messageCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {conversation.messageCount}
            </span>
          )}
        </motion.button>
      )}
    </div>
  );
};

export default ChatBotBubble;