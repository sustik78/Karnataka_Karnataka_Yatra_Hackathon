"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, Compass, ExternalLink, Heart, MapPin, Palette, Sparkles } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";

interface ArtisanCraft {
  id: string;
  name_en: string;
  name_kn: string;
  region_en: string;
  region_kn: string;
  giTagYear: string;
  desc_en: string;
  desc_kn: string;
  highlight_en: string;
  highlight_kn: string;
  image: string;
}

const ARTISAN_CRAFTS: ArtisanCraft[] = [
  {
    id: "channapatna",
    name_en: "Channapatna Wooden Toys & Lacquerware",
    name_kn: "ಚನ್ನಪಟ್ಟಣದ ಮರದ ಗೊಂಬೆಗಳು",
    region_en: "Ramanagara / Bengaluru Circuit",
    region_kn: "ರಾಮನಗರ / ಬೆಂಗಳೂರು ಸರ್ಕ್ಯೂಟ್",
    giTagYear: "GI Tagged 2006",
    desc_en: "Centuries-old craft patronised by Tipu Sultan. Skilled lathe turners use local Hale mara (ivory wood) and 100% non-toxic vegetable dyes extracted from turmeric, kumkum, and indigo.",
    desc_kn: "ಟಿಪ್ಪು ಸುಲ್ತಾನರ ಕಾಲದಿಂದ ಬೆಳೆದುಬಂದ ವಿಶ್ವಪ್ರಸಿದ್ಧ ಕಲೆ. ಆಲೆ ಮರ ಮತ್ತು ನೈಸರ್ಗಿಕ ಅರಿಶಿನ, ಕುಂಕುಮ, ನೀಲಿ ಬಣ್ಣಗಳಿಂದ ತಯಾರಿಸಿದ ಮಕ್ಕಳ ಸ್ನೇಹಿ ಸುರಕ್ಷಿತ ಮರದ ಆಟಿಕೆಗಳು.",
    highlight_en: "Direct artisan clusters: Maya Organic & Channapatna Crafts Park.",
    highlight_kn: "ಕುಶಲಕರ್ಮಿಗಳ ನೇರ ಕಾರ್ಯಾಗಾರಗಳು: ಮಾಯಾ ಆರ್ಗ್ಯಾನಿಕ್ ಮತ್ತು ಕ್ರಾಫ್ಟ್ಸ್ ಪಾರ್ಕ್.",
    image: "/images/places/lalbagh.jpg"
  },
  {
    id: "bidri",
    name_en: "Bidriware Silver Inlay Metal Craft",
    name_kn: "ಬಿದ್ರಿ ಕಲೆ (ಬೆಳ್ಳಿ ಕೆತ್ತನೆ)",
    region_en: "Bidar / Kalaburagi Circuit",
    region_kn: "ಬೀದರ್ / ಕಲಬುರಗಿ ಸರ್ಕ್ಯೂಟ್",
    giTagYear: "GI Tagged 2006",
    desc_en: "Unique 14th-century Bahmani metal art. Pure silver wire hammered into engraved zinc-copper alloy, blackened permanently using unique soil from Bidar Fort.",
    desc_kn: "೧೪ನೇ ಶತಮಾನದ ಬಹಮನಿ ರಾಜವಂಶದ ವಿಶಿಷ್ಟ ಲೋಹ ಕಲೆ. ಬಿದರ್ ಕೋಟೆಯ ಶತಮಾನಗಳ ಹಳೆಯ ಮಣ್ಣಿನಿಂದ ಕಪ್ಪಾಗಿಸಿದ ಲೋಹದ ಮೇಲೆ ಶುದ್ಧ ಬೆಳ್ಳಿಯ ಜ್ಯಾಮಿತೀಯ ಚಿತ್ತಾರ.",
    highlight_en: "Artisan workshops in Old Bidar town; National Awardee masters.",
    highlight_kn: "ಹಳೆ ಬೀದರ್ ಪಟ್ಟಣದ ಕುಶಲಕರ್ಮಿಗಳ ಗಲ್ಲಿಗಳು ಮತ್ತು ರಾಷ್ಟ್ರ ಪ್ರಶಸ್ತಿ ಪುರಸ್ಕೃತರು.",
    image: "/images/places/bidar-fort.jpg"
  },
  {
    id: "ilkal",
    name_en: "Ilkal Handloom Saree & Guledgudd Khun",
    name_kn: "ಇಳಕಲ್ ಸೀರೆ & ಗುಳೇದಗುಡ್ಡದ ಖಣ",
    region_en: "Bagalkote / Badami Circuit",
    region_kn: "ಬಾಗಲಕೋಟೆ / ಬದಾಮಿ ಸರ್ಕ್ಯೂಟ್",
    giTagYear: "GI Tagged 2006",
    desc_en: "Celebrated for its 'Tope Teni' red-and-white temple pallu interlock and Kasuti embroidery motifs, woven continuously by Devanga weaver families since the 8th century.",
    desc_kn: "೮ನೇ ಶತಮಾನದಿಂದ ದೇವಾಂಗ ನೇಕಾರ ಕುಟುಂಬಗಳು ನೇಯುವ ಸೀರೆ. ಕೆಂಪು ಮತ್ತು ಬಿಳಿ ದೇವಾಲಯದ 'ಟೋಪೇ ತೇನಿ' ಪಲ್ಲು ಮತ್ತು ಜ್ಯಾಮಿತೀಯ ಕಸೂತಿ ಕಲೆಗೆ ಪ್ರಸಿದ್ಧ.",
    highlight_en: "Ilkal Weavers Cooperative Society; Guledgudd handloom cluster.",
    highlight_kn: "ಇಳಕಲ್ ನೇಕಾರರ ಸಹಕಾರ ಸಂಘ ಮತ್ತು ಗುಳೇದಗುಡ್ಡ ಕೈಮಗ್ಗ ಕೇಂದ್ರ.",
    image: "/images/places/badami.jpg"
  },
  {
    id: "mysore-silk",
    name_en: "Mysore Pure Silk & Gold Zari",
    name_kn: "ಮೈಸೂರು ರೇಷ್ಮೆ & ಶುದ್ಧ ಚಿನ್ನದ ಜರಿ",
    region_en: "Mysuru Circuit",
    region_kn: "ಮೈಸೂರು ಸರ್ಕ್ಯೂಟ್",
    giTagYear: "GI Tagged 2005",
    desc_en: "Founded by Nalwadi Krishnaraja Wadiyar in 1912. Woven using 100% pure mulberry silk and authentic 0.65% pure gold embroidered zari with embossed micro-security code.",
    desc_kn: "ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್ ೧೯೧೨ ರಲ್ಲಿ ಸ್ಥಾಪಿಸಿದ ರೇಷ್ಮೆ ಕಾರ್ಖಾನೆ. ಶುದ್ಧ ಹಿಪ್ಪುನೇರಳೆ ರೇಷ್ಮೆ ಮತ್ತು ಅಪ್ಪಟ ಚಿನ್ನದ ಜರಿಯಿಂದ ನೇಯ್ದ ನಾಡಿನ ಹೆಮ್ಮೆಯ ರೇಷ್ಮೆ.",
    highlight_en: "KSIC Heritage Weaving Floor, Mananthody Road, Mysuru.",
    highlight_kn: "ಕೆಎಸ್‌ಐಸಿ ಹೆರಿಟೇಜ್ ನೇಯ್ಗೆ ಕೇಂದ್ರ, ಮಾನಂದವಾಡಿ ರಸ್ತೆ, ಮೈಸೂರು.",
    image: "/images/places/mysuru-palace.jpg"
  },
  {
    id: "kinnal",
    name_en: "Kinnal Painted Wooden Craft",
    name_kn: "ಕಿನ್ನಾಳ ಮರದ ಬಣ್ಣದ ಕಲೆ",
    region_en: "Koppal / Hampi Circuit",
    region_kn: "ಕೊಪ್ಪಳ / ಹಂಪಿ ಸರ್ಕ್ಯೂಟ್",
    giTagYear: "GI Tagged 2012",
    desc_en: "Vijayanagara empire folk heritage crafted by Chitragar families in Koppal. Figural idols and cradle toys carved from Polki wood, pasted with tamarind pulp and painted vividly.",
    desc_kn: "ಕೊಪ್ಪಳದ ಚಿತ್ರಗಾರ ಕುಟುಂಬಗಳು ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಕಾಲದಿಂದ ಉಳಿಸಿಕೊಂಡು ಬಂದ ಕಲೆ. ಪೊನ್ನಕಿ ಮರ ಮತ್ತು ಹುಣಸೆ ಬೀಜದ ಅಂಟಿನಿಂದ ತಯಾರಿಸಿದ ಜಾನಪದ ಗೊಂಬೆಗಳು.",
    highlight_en: "Traditional Chitragar Street, Kinnal village (40 km from Hampi).",
    highlight_kn: "ಕಿನ್ನಾಳ ಗ್ರಾಮದ ಸಾಂಪ್ರದಾಯಿಕ ಚಿತ್ರಗಾರರ ಬೀದಿ (ಹಂಪಿಯಿಂದ ೪೦ ಕಿಮೀ).",
    image: "/images/places/virupaksha-temple.jpg"
  },
  {
    id: "kasuti",
    name_en: "Dharwad Kasuti Needle Embroidery",
    name_kn: "ಧಾರವಾಡದ ಕಸೂತಿ ಕಲೆ",
    region_en: "Dharwad Circuit",
    region_kn: "ಧಾರವಾಡ ಸರ್ಕ್ಯೂಟ್",
    giTagYear: "GI Tagged 2008",
    desc_en: "Intricate needlework practiced by North Karnataka women without drawing outlines, using Gavanti, Murgi, Negi and Menthi stitches to depict chariots, palanquins and peacocks.",
    desc_kn: "ಯಾವುದೇ ಗೆರೆ ಎಳೆಯದೆ ಕಣ್ಣಳತೆಯಿಂದ ಸೂಜಿ-ದಾರದಲ್ಲಿ ನೇಯುವ ಉತ್ತರ ಕರ್ನಾಟಕದ ಪಾರಂಪರಿಕ ಕಸೂತಿ. ರಥ, ಪಲ್ಲಕ್ಕಿ, ನವಿಲು ಮತ್ತು ಗೋಪುರದ ಜ್ಯಾಮಿತೀಯ ಚಿತ್ರಗಳು.",
    highlight_en: "Karnataka Kasuti Kendra, Dharwad & Hubballi handicraft haats.",
    highlight_kn: "ಕರ್ನಾಟಕ ಕಸೂತಿ ಕೇಂದ್ರ, ಧಾರವಾಡ ಮತ್ತು ಹುಬ್ಬಳ್ಳಿ ಕರಕುಶಲ ಮಳಿಗೆಗಳು.",
    image: "/images/places/pattadakal.jpg"
  }
];

export function ArtisansSection() {
  const { lang, t } = useLang();
  const reduceMotion = useReducedMotion();

  return (
    <section id="artisans" className="relative scroll-mt-24 py-16 sm:py-20 print:hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow">
            <Palette size={13} aria-hidden="true" />
            {t.artisans.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.artisans.title}
          </h2>
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
            {t.artisans.subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ARTISAN_CRAFTS.map((craft, index) => {
            const name = lang === "kn" ? craft.name_kn : craft.name_en;
            const region = lang === "kn" ? craft.region_kn : craft.region_en;
            const description = lang === "kn" ? craft.desc_kn : craft.desc_en;
            const highlight = lang === "kn" ? craft.highlight_kn : craft.highlight_en;

            return (
              <motion.article
                key={craft.id}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }}
                className="glass group flex flex-col overflow-hidden rounded-[1.75rem] border border-white/10 transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-glass-lg"
              >
                <div className="relative h-44 overflow-hidden sm:h-48">
                  <img
                    src={craft.image}
                    alt={name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b1a] via-[#0b0b1a]/25 to-transparent" />
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-gold/40 bg-black/60 px-2.5 py-1 text-[9px] font-bold text-gold backdrop-blur-md">
                    <Award size={10} aria-hidden="true" />
                    {craft.giTagYear}
                  </span>
                  <div className="absolute inset-x-3 bottom-3 flex items-center gap-1 text-[10px] font-semibold text-white/80">
                    <MapPin size={11} className="text-gold" aria-hidden="true" />
                    <span>{region}</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-bold text-white transition group-hover:text-gold sm:text-xl">
                    {name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/65">
                    {description}
                  </p>

                  <div className="mt-4 rounded-xl border border-gold/20 bg-gold/[0.04] p-3 text-[11px] text-gold/90">
                    <p className="font-semibold">{lang === "kn" ? "ಕುಶಲಕರ್ಮಿಗಳ ನೇರ ಸಂಪರ್ಕ:" : "Direct Support & Clusters:"}</p>
                    <p className="mt-0.5 text-white/70">{highlight}</p>
                  </div>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/10 text-[10px] text-white/40">
                    <span className="flex items-center gap-1 text-teal">
                      <Sparkles size={11} aria-hidden="true" />
                      {lang === "kn" ? "ಅಸಲಿ ಕರಕುಶಲ ಕಲೆ" : "Heritage GI Cluster"}
                    </span>
                    <span className="font-medium text-white/50">
                      {lang === "kn" ? "ನೇರ ಖರೀದಿಗೆ ಪ್ರೋತ್ಸಾಹಿಸಿ" : "Buy Directly From Weavers"}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
