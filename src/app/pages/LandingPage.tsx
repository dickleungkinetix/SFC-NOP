import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import svgPaths from "../../imports/svg-eeujv9dou2";
import imgHero1 from "figma:asset/855b1c6163e833e64d0daf6309750bee98af2afd.png";
import imgHero2 from "figma:asset/4095f7088a770ad2fc6a4abd1dbaf4eb80413283.png";

const heroImages = [imgHero1, imgHero2];
const SLIDE_INTERVAL = 5000;

// ──────────────── HERO CAROUSEL ────────────────

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const startAutoSlide = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_INTERVAL);
  }, []);

  const stopAutoSlide = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [startAutoSlide, stopAutoSlide]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setParallaxY(scrollY * 0.4);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    stopAutoSlide();
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const offset = e.clientX - dragStart;
    setDragOffset(offset);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -50) {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    } else if (dragOffset > 50) {
      setCurrent((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    }
    setDragOffset(0);
    startAutoSlide();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset(0);
      startAutoSlide();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden select-none"
      style={{ minHeight: "444px" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {heroImages.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity ease-in-out"
          style={{
            transitionDuration: "2000ms",
            opacity: i === current ? 1 : 0,
            pointerEvents: "none",
            transform: `translateY(${parallaxY}px) scale(1.1)`,
            willChange: "transform",
          }}
        />
      ))}
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,126,206,0.4) 10%, rgba(63,157,226,0) 38%, rgba(29,29,29,0.4) 100%)",
        }}
      />
    </div>
  );
}

// ──────────────── ICONS ────────────────

function IconCCASS() {
  return (
    <svg width="46" height="50" viewBox="0 0 68.5738 74.3851" fill="none">
      <path d={svgPaths.pe456e00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.32" />
      <path d={svgPaths.p3a69400} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.32" />
      <path d="M12.8581 23.2447H30.0015" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.32" />
      <path d={svgPaths.p267d9f80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.32" />
      <path d="M38.573 18.5967H53.5735" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.32" />
      <path d={svgPaths.p1dd68570} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.32" />
      <path d={svgPaths.pfc73280} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.32" />
      <path d={svgPaths.p28b4e200} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.32" />
      <path d={svgPaths.p3c58b600} fill="#00A651" />
      <path d={svgPaths.p18fb2100} stroke="#00A651" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.32" />
      <path d={svgPaths.pdd33500} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.32" />
      <path d={svgPaths.p37c98f00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.32" />
      <path d="M21.4279 32.5434V48.8151" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.32" />
      <path d="M30.0005 23.2447H38.5722" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.32" />
      <path d="M32.1436 55.7888H38.5724" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.32" />
    </svg>
  );
}

function IconCorporations() {
  return (
    <svg width="46" height="46" viewBox="0 0 50.4 50.4" fill="none">
      <path d="M14.6984 42H35.6984" stroke="#00A651" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.15" />
      <path d={svgPaths.p18f75700} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.15" />
      <path d={svgPaths.p18823a00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.15" />
      <path d={svgPaths.p19d70d00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.15" />
    </svg>
  );
}

function IconIndividuals() {
  return (
    <svg width="44" height="50" viewBox="0 0 68.1625 76.3" fill="none">
      <path d={svgPaths.p232f9600} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d={svgPaths.pda42c80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d={svgPaths.p6296d80} stroke="#00A651" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d={svgPaths.p22f00f80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d={svgPaths.p1cbfb300} fill="#00A651" stroke="#00A651" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d={svgPaths.p34938cc0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d="M23.1875 22.8375H44.975" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d="M23.1875 32.025H52.2375" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d="M23.1875 41.2125H37.7125" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d="M23.1875 50.4H34.0812" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
    </svg>
  );
}

function IconLicensee() {
  return (
    <svg width="48" height="44" viewBox="0 0 77.1174 67.2" fill="none">
      <path d={svgPaths.p37f7e600} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d="M15.6023 15.4H27.0181V4.2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d={svgPaths.p3fc00e80} stroke="#00A651" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d={svgPaths.pcf778be} stroke="#00A651" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d="M21.4047 26.6H49.9442" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d="M21.4047 37.8H49.9442" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d="M21.4047 49H49.9442" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d={svgPaths.pd6cd400} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d="M69.8031 32.2V36.4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d={svgPaths.pa08bc80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d={svgPaths.p3b8cd500} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d={svgPaths.p77b3780} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d={svgPaths.p3fe03580} stroke="#00A651" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      <path d="M55.6008 63H61.3087" stroke="#00A651" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
    </svg>
  );
}

// ──────────────── CATEGORY CARDS ────────────────

const cards = [
  {
    id: "ccass",
    title: "CCASS",
    icon: <IconCCASS />,
    links: [
      "Top CCASS changes",
      "CCASS concentration analysis",
      "CCASS Investor Participant stakes",
      "CCASS participants and holdings",
    ],
    href: "/chart",
  },
  {
    id: "corporations",
    title: "Corporations",
    icon: <IconCorporations />,
    links: [
      "HK companies per year",
      "HK companies by incorporation date and type",
      "Non-HK companies in HK per year",
      "Non-HK companies in HK by registration date",
      "HK-registered foreign companies",
    ],
    href: "/corporation/0001",
  },
  {
    id: "individuals",
    title: "Individuals",
    icon: <IconIndividuals />,
    links: [
      "League Tables of advisers",
      "Changes of auditors of current HK-listed companies",
    ],
    href: "/individual/1",
  },
  {
    id: "licensee",
    title: "Licensee",
    icon: <IconLicensee />,
    links: [
      "League tables of SFC licensees",
      "Latest changes in SFC licensees",
      "Historic total of SFC licensees",
    ],
    href: "#",
  },
];

// ──────────────── FAQ SECTION ────────────────

const faqs = [
  {
    q: "What makes SFC CCASS visualization unique?",
    a: "It scans 3,000+ HK stocks daily, showing time-series charts of holdings changes for instant detection of transfers and big-player moves.",
  },
  {
    q: "How do the email alerts work, and what can I track?",
    a: "Set up unlimited real-time email alerts for specific stocks, thresholds, and participant changes. Alerts trigger instantly when CCASS updates.",
  },
  {
    q: "Is the platform mobile-friendly for on-the-go research?",
    a: "Yes. The platform is fully optimized for both mobile and desktop, allowing seamless research whether at your desk or on the move.",
  },
];

// ──────────────── RADIO BUTTON ────────────────

function RadioOption({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer" onClick={onSelect}>
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
          selected ? "border-[#008581]" : "border-gray-400"
        }`}
      >
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#008581]" />}
      </div>
      <span className="text-sm text-gray-800 whitespace-nowrap select-none">{label}</span>
    </label>
  );
}

// ──────────────── MAIN PAGE ────────────────

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchFilter, setSearchFilter] = useState("Stock Code");
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleSearch = () => {
    const query = searchText.trim() || "HSBC";
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* ── Hero Section ── */}
      <HeroCarousel />

      {/* Hero content */}
      <div className="relative z-10 -mt-[444px] flex flex-col items-center px-4 pt-8 pb-28 sm:pb-32 lg:pt-12 lg:pb-36" style={{ minHeight: "444px" }}>
        {/* Title */}
        <h1
          className="text-white text-center mb-5 lg:mb-7 px-2 max-w-3xl"
          style={{
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            fontSize: "clamp(22px, 4vw, 32px)",
            textShadow: "1px 1px 0 black",
            lineHeight: 1.35,
          }}
        >
          Hong Kong Listed Companies, New Online Platform
        </h1>

        {/* Search bar */}
        <div
          className="flex items-center bg-[#fafafa] rounded-full w-full max-w-[95%] sm:max-w-[85%] lg:max-w-[900px] mb-4"
          style={{
            border: "2px solid #04ecd3",
            boxShadow: "0 0 5.4px #17d9d1",
            height: "56px",
          }}
        >
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search Items"
            className="flex-1 px-5 py-2 bg-transparent outline-none text-gray-500 text-base lg:text-xl"
          />
          <button
            onClick={handleSearch}
            className="bg-[#128c88] text-white rounded-full flex items-center gap-2 px-4 lg:px-6 py-2 m-1 hover:bg-[#0a7472] transition-colors shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 22.6406 22.6406" fill="none">
              <path
                d={svgPaths.pfc4cc00}
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <span className="hidden sm:inline text-sm lg:text-base">Search</span>
          </button>
        </div>

        {/* Radio filters */}
        <div className="bg-white rounded-full px-5 py-2.5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 shadow-sm w-full max-w-[95%] sm:max-w-[85%] lg:w-[35%]">
          {["Stock Code", "Individuals", "Corporations", "Licensee"].map((opt) => (
            <RadioOption
              key={opt}
              label={opt}
              selected={searchFilter === opt}
              onSelect={() => setSearchFilter(opt)}
            />
          ))}
        </div>
      </div>

      {/* ── Category Cards — float up over hero ── */}
      <div className="relative z-10 -mt-20 sm:-mt-24 lg:-mt-24 px-3 sm:px-4 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {cards.map((card) => (
            <a
              key={card.id}
              href={card.href}
              onClick={(e) => {
                if (card.href.startsWith("/")) {
                  e.preventDefault();
                  navigate(card.href);
                }
              }}
              className="bg-[#0c6fae] rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-5 flex flex-col gap-3 hover:bg-[#0a5f95] transition-colors cursor-pointer"
              style={{ boxShadow: "0 1px 54px 0 rgba(56,92,127,0.6)" }}
            >
              {/* Icon + Title row */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className="flex items-center justify-center rounded-xl shrink-0"
                  style={{
                    border: "1.5px solid rgba(226,232,240,0.5)",
                    width: 56,
                    height: 56,
                  }}
                >
                  {card.icon}
                </div>
                <h2
                  className="text-white leading-tight"
                  style={{ fontFamily: "Arial, sans-serif", fontWeight: "bold", fontSize: 15 }}
                >
                  {card.title}
                </h2>
              </div>

              {/* Links */}
              <ul className="space-y-1">
                {card.links.map((link) => (
                  <li key={link}>
                    <span className="text-white underline text-xs sm:text-sm cursor-pointer hover:text-blue-200 leading-relaxed block">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </div>

      {/* ── FAQ Section ── */}
      <div className="max-w-6xl mx-auto w-full px-4 lg:px-8 py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-12">
          {/* Right (shown first on desktop via flex-row-reverse): FAQ title + description */}
          <div className="lg:w-[400px] lg:shrink-0">
            <h2
              className="mb-3"
              style={{ fontFamily: "Arial, sans-serif", fontSize: "clamp(20px, 3vw, 26px)" }}
            >
              <span className="text-gray-900">Frequently </span>
              <span className="text-[#008581]">Asked Questions</span>
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              This FAQ covers using CCASS visualizations to track big-player moves, setting
              unlimited real-time alerts for disclosures and large trades, plus seamless
              mobile/desktop access.
            </p>
          </div>

          {/* Left: Accordion */}
          <div className="flex-1 min-w-0">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-200">
                <button
                  className="w-full text-left py-4 flex items-start justify-between gap-3"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  <span
                    className={`text-sm lg:text-sm leading-snug ${
                      openFaq === i ? "text-[#008581] font-semibold" : "text-gray-700"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <div className="shrink-0 mt-0.5">
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>
                {openFaq === i && (
                  <p className="text-sm text-gray-600 pb-4 pr-8 leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
