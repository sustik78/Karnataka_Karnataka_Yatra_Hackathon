"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Compass,
  CornerDownLeft,
  Loader2,
  Mic,
  MicOff,
  Palette,
  Send,
  Sparkles,
  User,
  Volume2,
  X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Category, Companion, DietPreference, Prefs, Region, TravelStyle } from "@/lib/types";
import { CATEGORIES, PLACES, REGION_NAMES_EN, REGION_NAMES_KN } from "@/data/places";
import { useLang } from "@/i18n/LangProvider";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  extractedPrefs?: Partial<Prefs>;
  timestamp: string;
}

interface AiAssistantChatProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPlan: (prefs: Partial<Prefs>) => void;
}

// Client-side NLP intent parser for English & Kannada travel queries (Zero API Key)
function parseTravelIntent(query: string): {
  isTripPlan: boolean;
  replyEn: string;
  replyKn: string;
  prefs: Partial<Prefs>;
} {
  const lower = query.toLowerCase();

  // 1. Duration extraction
  let days = 4;
  const dayMatch = lower.match(/(\d+)\s*(?:days?|day|ದಿನಗಳು|ದಿನ|d)/);
  if (dayMatch) {
    days = Math.min(10, Math.max(1, parseInt(dayMatch[1], 10)));
  } else if (lower.includes("weekend") || lower.includes("ವಾರಾಂತ್ಯ")) {
    days = 2;
  } else if (lower.includes("week") || lower.includes("ವಾರ")) {
    days = 7;
  }

  // 2. Region / Place matching
  const matchedRegions: Region[] = [];
  const mustVisitIds: string[] = [];

  const regionKeywords: Record<string, Region> = {
    coorg: "Coorg",
    kodagu: "Coorg",
    ಕೊಡಗು: "Coorg",
    ಮಡಿಕೇರಿ: "Coorg",
    madikeri: "Coorg",
    hampi: "Hampi",
    ಹಂಪಿ: "Hampi",
    vijayanagara: "Hampi",
    mysore: "Mysuru",
    mysuru: "Mysuru",
    ಮೈಸೂರು: "Mysuru",
    mangaluru: "Mangaluru",
    mangalore: "Mangaluru",
    udupi: "Mangaluru",
    ಉಡುಪಿ: "Mangaluru",
    ಮಂಗಳೂರು: "Mangaluru",
    gokarna: "Uttara Kannada",
    ಗೋಕರ್ಣ: "Uttara Kannada",
    murudeshwar: "Uttara Kannada",
    ಮುರುಡೇಶ್ವರ: "Uttara Kannada",
    dandeli: "Uttara Kannada",
    ದಾಂಡೇಲಿ: "Uttara Kannada",
    karwar: "Uttara Kannada",
    chikkamagaluru: "Chikkamagaluru",
    chikmagalur: "Chikkamagaluru",
    ಚಿಕ್ಕಮಗಳೂರು: "Chikkamagaluru",
    hassan: "Hassan",
    ಹಾಸನ: "Hassan",
    belur: "Hassan",
    ಬೇಲೂರು: "Hassan",
    halebidu: "Hassan",
    shivamogga: "Shivamogga",
    shimoga: "Shivamogga",
    ಶಿವಮೊಗ್ಗ: "Shivamogga",
    jog: "Shivamogga",
    ಜೋಗ: "Shivamogga",
    badami: "Badami",
    ಬದಾಮಿ: "Badami",
    pattadakal: "Badami",
    aihole: "Badami",
    vijayapura: "Vijayapura",
    bijapur: "Vijayapura",
    ವಿಜಯಪುರ: "Vijayapura",
    gumbaz: "Vijayapura",
    chitradurga: "Chitradurga",
    ಚಿತ್ರದುರ್ಗ: "Chitradurga",
    hubballi: "Hubballi-Dharwad",
    dharwad: "Hubballi-Dharwad",
    ಹುಬ್ಬಳ್ಳಿ: "Hubballi-Dharwad",
    kalaburagi: "Kalaburagi",
    gulbarga: "Kalaburagi",
    bidar: "Kalaburagi",
    ಬೀದರ್: "Kalaburagi",
    belagavi: "Belagavi",
    belgaum: "Belagavi",
    ಬೆಳಗಾವಿ: "Belagavi",
    bengaluru: "Bengaluru",
    bangalore: "Bengaluru",
    ಬೆಂಗಳೂರು: "Bengaluru"
  };

  for (const [kw, reg] of Object.entries(regionKeywords)) {
    if (lower.includes(kw) && !matchedRegions.includes(reg)) {
      matchedRegions.push(reg);
    }
  }

  // 3. Companions & Demographics
  let companions: Companion = "Solo";
  let adults = 2;
  let seniors = 0;
  let kids = 0;

  if (
    lower.includes("parent") ||
    lower.includes("senior") ||
    lower.includes("ತಂದೆ") ||
    lower.includes("ತಾಯಿ") ||
    lower.includes("ಪೋಷಕ") ||
    lower.includes("ಹಿರಿಯ")
  ) {
    companions = "Family";
    seniors = 2;
    adults = 2;
  } else if (
    lower.includes("family") ||
    lower.includes("ಕುಟುಂಬ") ||
    lower.includes("ಮಕ್ಕಳು") ||
    lower.includes("kid") ||
    lower.includes("child")
  ) {
    companions = "Family";
    adults = 2;
    kids = 1;
  } else if (
    lower.includes("couple") ||
    lower.includes("honeymoon") ||
    lower.includes("ದಂಪತಿ") ||
    lower.includes("partner")
  ) {
    companions = "Couple";
    adults = 2;
  } else if (
    lower.includes("friend") ||
    lower.includes("ಸ್ನೇಹಿತ") ||
    lower.includes("group") ||
    lower.includes("buddies")
  ) {
    companions = "Friends";
    adults = 4;
  }

  // 4. Dietary preferences
  let diet: DietPreference = "Any";
  if (
    lower.includes("pure veg") ||
    lower.includes("jain") ||
    lower.includes("sattvic") ||
    lower.includes("ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ") ||
    lower.includes("ಸಾತ್ವಿಕ")
  ) {
    diet = "Pure Veg";
  } else if (
    lower.includes("veg") ||
    lower.includes("vegetarian") ||
    lower.includes("ಸಸ್ಯಾಹಾರಿ")
  ) {
    diet = "Vegetarian";
  } else if (
    lower.includes("non-veg") ||
    lower.includes("seafood") ||
    lower.includes("meat") ||
    lower.includes("fish") ||
    lower.includes("ಮೀನು") ||
    lower.includes("ಮಾಂಸ")
  ) {
    diet = "Non-Veg";
  }

  // 5. Interests
  const interests: Category[] = [];
  if (lower.includes("temple") || lower.includes("ದೇವಾಲಯ") || lower.includes("ದೇವಸ್ಥಾನ") || lower.includes("spiritual")) {
    interests.push("Temples", "Spiritual");
  }
  if (lower.includes("beach") || lower.includes("ಕಡಲತೀರ") || lower.includes("sea")) {
    interests.push("Beaches");
  }
  if (lower.includes("heritage") || lower.includes("history") || lower.includes("ಕೋಟೆ") || lower.includes("ಪರಂಪರೆ") || lower.includes("palace")) {
    interests.push("Heritage");
  }
  if (lower.includes("wildlife") || lower.includes("safari") || lower.includes("ವನ್ಯಜೀವಿ") || lower.includes("tiger")) {
    interests.push("Wildlife");
  }
  if (lower.includes("waterfall") || lower.includes("ಜಲಪಾತ") || lower.includes("falls")) {
    interests.push("Waterfalls");
  }
  if (lower.includes("coffee") || lower.includes("ಕಾಫಿ") || lower.includes("plantation")) {
    interests.push("Coffee Estates");
  }
  if (lower.includes("toy") || lower.includes("craft") || lower.includes("artisan") || lower.includes("ಗೊಂಬೆ") || lower.includes("ಕರಕುಶಲ") || lower.includes("saree") || lower.includes("silk") || lower.includes("bidri")) {
    interests.push("Artisans & Crafts");
  }
  if (interests.length === 0) {
    interests.push("Heritage", "Food");
  }

  // 6. Style
  let style: TravelStyle = "Balanced";
  if (seniors > 0 || lower.includes("relaxed") || lower.includes("peaceful") || lower.includes("slow") || lower.includes("ವಿಶ್ರಾಂತ")) {
    style = "Relaxed";
  } else if (lower.includes("packed") || lower.includes("fast") || lower.includes("quick") || lower.includes("ಸಾಂದ್ರ")) {
    style = "Packed";
  } else if (lower.includes("offbeat") || lower.includes("hidden") || lower.includes("ಅಪರೂಪದ")) {
    style = "Offbeat";
  }

  // Match places for mustVisit
  if (matchedRegions.length > 0) {
    const candidatePlaces = PLACES.filter((p) => matchedRegions.includes(p.region));
    if (candidatePlaces.length > 0) {
      mustVisitIds.push(...candidatePlaces.slice(0, 4).map((p) => p.id));
    }
  }

  const isTripPlan =
    dayMatch !== null ||
    matchedRegions.length > 0 ||
    companions !== "Solo" ||
    diet !== "Any" ||
    lower.includes("trip") ||
    lower.includes("plan") ||
    lower.includes("route") ||
    lower.includes("ಪ್ರವಾಸ") ||
    lower.includes("ಯಾತ್ರೆ");

  const regionsLabelEn = matchedRegions.length > 0 ? matchedRegions.join(", ") : "Karnataka Highlights";
  const regionsLabelKn = matchedRegions.length > 0 ? matchedRegions.map((r) => REGION_NAMES_KN[r] ?? r).join(", ") : "ಕರ್ನಾಟಕದ ಪ್ರಮುಖ ತಾಣಗಳು";

  const seniorNoteEn = seniors > 0 ? " Crafted at a comfortable, leisurely pace with easy walking stops suitable for seniors." : "";
  const seniorNoteKn = seniors > 0 ? " ಹಿರಿಯರಿಗೆ ಅನುಕೂಲವಾಗುವಂತೆ ಸುಲಭ ನಡಿಗೆ ಹಾದಿ ಮತ್ತು ನೆರಳಿನ ವಿಶ್ರಾಂತಿ ಸ್ಥಳಗಳನ್ನು ಗಮನದಲ್ಲಿಟ್ಟುಕೊಂಡು ರೂಪಿಸಲಾಗಿದೆ." : "";

  const dietNoteEn = diet !== "Any" ? ` Featuring curated ${diet} dining recommendations.` : "";
  const dietNoteKn = diet !== "Any" ? ` ${diet === "Pure Veg" ? "ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ" : diet === "Vegetarian" ? "ಸಸ್ಯಾಹಾರಿ" : "ಸ್ಥಳೀಯ ಖಾದ್ಯ"} ಊಟದ ಶಿಫಾರಸುಗಳೊಂದಿಗೆ.` : "";

  const replyEn = isTripPlan
    ? `I have crafted a tailored ${days}-day ${style.toLowerCase()} itinerary focusing on ${regionsLabelEn} for ${companions.toLowerCase()} travelers.${seniorNoteEn}${dietNoteEn} Tap 'Apply to Planner' below to see the interactive route, highway distances, and day-by-day stops!`
    : `Karnataka offers 15 distinct cultural circuits: from the stone chariot of Hampi and Hoysala temples of Belur-Halebidu to the coastal beaches of Gokarna and lush coffee hills of Coorg. Tell me how many days you have and who is traveling, and I will shape your journey!`;

  const replyKn = isTripPlan
    ? `${regionsLabelKn} ಕೇಂದ್ರಿತ ${days} ದಿನಗಳ ${style === "Relaxed" ? "ವಿಶ್ರಾಂತ" : "ಸಮತೋಲಿತ"} ಪ್ರವಾಸವನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ.${seniorNoteKn}${dietNoteKn} ನಕ್ಷೆ, ಹೆದ್ದಾರಿ ಸಂಪರ್ಕ ಮತ್ತು ವಿವರವಾದ ವೇಳಾಪಟ್ಟಿಯನ್ನು ನೋಡಲು ಕೆಳಗಿನ 'ಪ್ಲಾನ್ ಅನ್ವಯಿಸಿ' ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ!`
    : `ಕರ್ನಾಟಕದಲ್ಲಿ ೧೫ ಅನನ್ಯ ಸಾಂಸ್ಕೃತಿಕ ಸರ್ಕ್ಯೂಟ್‌ಗಳಿವೆ: ಹಂಪಿಯ ಕಲ್ಲಿನ ರಥ, ಬೇಲೂರು-ಹಳೇಬೀಡು ಹೊಯ್ಸಳ ವಾಸ್ತುಶಿಲ್ಪ, ಗೋಕರ್ಣ-ಮುರುಡೇಶ್ವರ ಕಡಲತೀರ ಮತ್ತು ಕೊಡಗಿನ ಹಸಿರು ಬೆಟ್ಟಗಳು. ನಿಮ್ಮ ದಿನಗಳು ಮತ್ತು ಕುಟುಂಬದ ವಿವರಗಳನ್ನು ತಿಳಿಸಿ, ನಿಮಗಾಗಿ ಪರಿಪೂರ್ಣ ಪ್ರವಾಸ ಸಿದ್ಧಪಡಿಸುತ್ತೇನೆ!`;

  return {
    isTripPlan,
    replyEn,
    replyKn,
    prefs: {
      days,
      style,
      companions,
      adults,
      kids,
      seniors,
      diet,
      interests,
      mustVisitIds
    }
  };
}

export function AiAssistantChat({ isOpen, onClose, onApplyPlan }: AiAssistantChatProps) {
  const { lang, t } = useLang();
  const reduceMotion = useReducedMotion();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-welcome",
      sender: "assistant",
      text: t.assistant.welcome,
      timestamp: "Just now"
    }
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<unknown>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Voice speech synthesis
  const speakMessage = (id: string, text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isSpeakingId === id) {
      window.speechSynthesis.cancel();
      setIsSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    const matchedVoice =
      lang === "kn"
        ? voices.find((v) => v.lang.toLowerCase().startsWith("kn")) ||
          voices.find((v) => v.lang.toLowerCase().startsWith("hi") || v.lang.toLowerCase() === "en-in")
        : voices.find((v) => v.lang.toLowerCase() === "en-in") || voices[0];

    if (matchedVoice) {
      utterance.voice = matchedVoice;
      utterance.lang = matchedVoice.lang;
    }
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeakingId(null);
    utterance.onerror = () => setIsSpeakingId(null);

    setIsSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Web Speech Recognition for Kannada & English Voice Input
  const toggleListening = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        lang === "kn"
          ? "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಲಭ್ಯವಿಲ್ಲ (Chrome/Edge ಬಳಸಿ)."
          : "Speech recognition is not supported in this browser. Please use Chrome or Edge."
      );
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        (recognitionRef.current as { stop: () => void }).stop();
      }
      setIsListening(false);
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const recognition = new (SpeechRecognition as any)();
      recognitionRef.current = recognition;
      recognition.lang = lang === "kn" ? "kn-IN" : "en-IN";
      recognition.continuous = false;
      recognition.interimResults = false;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setInput(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      setIsListening(true);
    } catch {
      setIsListening(false);
    }
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const parsed = parseTravelIntent(query);
    const assistantReply = lang === "kn" ? parsed.replyKn : parsed.replyEn;

    const assistantMessage: Message = {
      id: `asst-${Date.now() + 1}`,
      sender: "assistant",
      text: assistantReply,
      extractedPrefs: parsed.isTripPlan ? parsed.prefs : undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
  };

  const handleApply = (prefs: Partial<Prefs>) => {
    onApplyPlan(prefs);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-end justify-center bg-black/75 p-0 backdrop-blur-md sm:items-center sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong flex h-[90vh] max-h-[740px] w-full max-w-2xl flex-col rounded-t-[2rem] border border-white/20 shadow-2xl sm:rounded-[2rem]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl border border-gold/40 bg-gold/15 text-gold shadow-gold">
                  <Bot size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-white sm:text-lg">
                    {t.assistant.title}
                  </h3>
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold text-teal">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
                    {t.assistant.subtitle}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label={t.common.close}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.05] text-white/70 hover:border-gold/50 hover:text-gold"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-bold ${
                      msg.sender === "user"
                        ? "border-coral/40 bg-coral/20 text-coral"
                        : "border-gold/40 bg-gold/20 text-gold"
                    }`}
                  >
                    {msg.sender === "user" ? <User size={13} /> : <Sparkles size={13} />}
                  </span>

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed sm:text-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-coral/20 to-gold/20 border border-white/15 text-white"
                        : "glass border border-white/15 text-white/90"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Apply Plan Button if extracted */}
                    {msg.extractedPrefs ? (
                      <div className="mt-3 border-t border-white/10 pt-3">
                        <button
                          type="button"
                          onClick={() => handleApply(msg.extractedPrefs!)}
                          className="cta-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-coral px-4 py-2 text-xs font-bold text-[#1a1205] shadow-gold transition hover:brightness-110"
                        >
                          <Compass size={13} aria-hidden="true" />
                          {t.assistant.applyPlan}
                          <ArrowRight size={13} aria-hidden="true" />
                        </button>
                      </div>
                    ) : null}

                    <div className="mt-2 flex items-center justify-between text-[10px] text-white/40">
                      <span>{msg.timestamp}</span>
                      {msg.sender === "assistant" ? (
                        <button
                          type="button"
                          onClick={() => speakMessage(msg.id, msg.text)}
                          className="flex items-center gap-1 rounded px-1.5 py-0.5 text-gold/75 hover:text-gold"
                          title="Read aloud"
                        >
                          <Volume2 size={12} />
                          {isSpeakingId === msg.id ? "Stop" : "Listen"}
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="border-t border-white/10 bg-black/25 px-4 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
                {t.assistant.quickTips}
              </p>
              <div className="mt-1.5 flex gap-1.5 overflow-x-auto pb-1">
                {t.assistant.suggested.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-white/70 hover:border-gold/50 hover:bg-gold/10 hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="border-t border-white/10 p-3 sm:p-4">
              {isListening ? (
                <div className="mb-2 flex items-center justify-between rounded-xl border border-coral/40 bg-coral/10 px-3 py-1.5 text-xs text-coral">
                  <span className="flex items-center gap-2 animate-pulse">
                    <span className="h-2 w-2 rounded-full bg-coral" />
                    {t.assistant.listening.replace("{lang}", lang === "kn" ? "ಕನ್ನಡ" : "English")}
                  </span>
                  <button
                    type="button"
                    onClick={toggleListening}
                    className="font-bold underline text-[11px]"
                  >
                    {t.phrases.stop}
                  </button>
                </div>
              ) : null}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t.assistant.placeholder}
                    className="w-full rounded-full border border-white/15 bg-white/[0.06] py-3 pl-4 pr-11 text-xs text-white placeholder-white/40 focus:border-gold/60 focus:bg-white/[0.1] focus:outline-none focus:ring-2 focus:ring-gold/30 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={toggleListening}
                    aria-label={t.assistant.micLabel}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full transition ${
                      isListening
                        ? "bg-coral text-white animate-bounce"
                        : "text-white/50 hover:text-gold"
                    }`}
                  >
                    {isListening ? <MicOff size={15} /> : <Mic size={15} />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-r from-gold to-coral text-[#1a1205] shadow-gold transition hover:brightness-110 disabled:opacity-40"
                >
                  <Send size={16} aria-hidden="true" />
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
