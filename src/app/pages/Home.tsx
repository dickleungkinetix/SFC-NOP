import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SFCLogo } from "../components/SFCLogo";
import { Footer } from "../components/Footer";
import imgHero from "figma:asset/855b1c6163e833e64d0daf6309750bee98af2afd.png";
import svgPaths from "../../imports/svg-eeujv9dou2";
import { Menu, X, ChevronRight, BarChart2, Users, Building2, BookOpen, LayoutGrid } from "lucide-react";

const navItems = [
  { label: "Stock Trading Analysis System", color: "#007d3d" },
  { label: "Advisors to HK-listed issuers", color: "#b13bb8" },
  { label: "HK Companies Registry analysis", color: "#7fd084" },
  { label: "UK Companies House analysis", color: "#d63200" },
  { label: "SFC licensees analysis", color: "#009bff" },
  { label: "Categories", color: "#ffb81d" },
];

// Category card icons
function IconCCASS() {
  return (
    <svg width="40" height="44" viewBox="0 0 40.9451 44.4151" fill="none">
      <path d={svgPaths.pe456e00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
      <path d={svgPaths.p3a69400} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
      <path d="M7.67553 13.8785H17.9118" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
      <path d={svgPaths.p267d9f80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
      <path d="M23.0307 11.1032H31.9874" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
      <path d={svgPaths.p1dd68570} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
      <path d={svgPaths.pfc73280} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
      <path d={svgPaths.p28b4e200} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
      <path d={svgPaths.p3c58b600} fill="#00A651" />
      <path d={svgPaths.p18fb2100} stroke="#00A651" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
      <path d={svgPaths.pdd33500} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
      <path d={svgPaths.p37c98f00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
      <path d="M12.7939 19.431V29.1468" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
      <path d="M17.9123 13.8785H23.0304" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
      <path d="M19.1913 33.3113H23.03" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
    </svg>
  );
}

function IconCorporations() {
  return (
    <svg width="40" height="44" viewBox="0 0 50.4 65.8" fill="none">
      <path d={svgPaths.p37f7e600} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <path d="M27.0181 4.2L15.6023 15.4H27.0181V4.2Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <path d={svgPaths.p18f75700} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <path d={svgPaths.p18823a00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <path d={svgPaths.p19d70d00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <path d="M14.6984 42H35.6984" stroke="#00A651" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  );
}

function IconIndividuals() {
  return (
    <svg width="40" height="44" viewBox="0 0 50.4 65" fill="none">
      <circle cx="25.2" cy="14" r="10" stroke="white" strokeWidth="3" />
      <path d="M6 50c0-10.5 8.5-19 19.2-19s19.2 8.5 19.2 19" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M35 38l8 8-8 8" stroke="#00A651" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconLicensee() {
  return (
    <svg width="40" height="44" viewBox="0 0 55 70" fill="none">
      <path d={svgPaths.p232f9600} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <path d="M25 20h20M25 30h20M25 40h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="50" r="12" fill="none" stroke="#00A651" strokeWidth="2.5" />
      <path d="M45 50l3 3 6-6" stroke="#00A651" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const categoryCards = [
  {
    id: "ccass",
    title: "CCASS",
    Icon: IconCCASS,
    links: [
      "Top CCASS changes",
      "CCASS concentration analysis",
      "CCASS Investor Participant stakes",
      "CCASS participants and holdings",
    ],
  },
  {
    id: "corporations",
    title: "Corporations",
    Icon: IconCorporations,
    links: [
      "HK companies per year",
      "HK companies by incorporation date and type",
      "Non-HK companies in HK per year",
      "Non-HK companies in HK by registration date",
      "HK-registered foreign companies",
    ],
  },
  {
    id: "individuals",
    title: "Individuals",
    Icon: IconIndividuals,
    links: [
      "League Tables of advisers",
      "Changes of auditors of current HK-listed companies",
    ],
  },
  {
    id: "licensee",
    title: "Licensee",
    Icon: IconLicensee,
    links: [
      "League tables of SFC licensees",
      "Latest changes in SFC licensees",
      "Historic total of SFC licensees",
    ],
  },
];

const faqItems = [
  {
    q: "What makes SFC CCASS visualization unique?",
    a: "It scans 3,000+ HK stocks daily, showing time-series charts of holdings changes for instant detection of transfers and big-player moves.",
    highlight: true,
  },
  {
    q: "How do the email alerts work, and what can I track?",
    a: "You can set up unlimited real-time alerts for disclosures and large trades. Alerts are sent to your email immediately when triggered.",
  },
  {
    q: "Is the platform mobile-friendly for on-the-go research?",
    a: "Yes, the platform is fully responsive and optimized for mobile devices, tablets, and desktops.",
  },
];

export function Home() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("stockCode");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(searchValue)}&type=${searchType}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ===== DESKTOP HEADER ===== */}
      <header className="bg-white hidden lg:block">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex items-center justify-between py-3">
            <SFCLogo scale={0.95} />
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="cursor-pointer hover:text-[#008581]">中文</span>
              <span className="cursor-pointer hover:text-[#008581]">-A</span>
              <span className="cursor-pointer hover:text-[#008581]">A</span>
              <span className="cursor-pointer hover:text-[#008581]">+A</span>
            </div>
          </div>
          <nav className="flex items-center border-t border-gray-100">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className="relative px-3 py-3 text-xs font-medium text-gray-700 hover:text-[#008581] whitespace-nowrap transition-colors group"
              >
                {item.label}
                <span
                  className="absolute bottom-0 left-0 right-0 h-[3px]"
                  style={{ backgroundColor: item.color }}
                />
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ===== MOBILE HEADER ===== */}
      <header className="bg-white lg:hidden">
        <div className="px-4 py-3 flex items-center justify-between">
          <SFCLogo scale={0.55} />
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-gray-700">
            <Menu size={26} />
          </button>
        </div>
        {/* Color strip */}
        <div className="flex w-full h-[5px]">
          {navItems.map((item) => (
            <div key={item.label} className="flex-1" style={{ backgroundColor: item.color }} />
          ))}
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden" style={{ minHeight: "clamp(300px, 40vw, 520px)" }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={imgHero}
            alt="Hong Kong skyline"
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,126,206,0.31) 10%, rgba(63,157,226,0) 38%, rgba(29,29,29,0.31) 100%)",
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center px-4 pt-8 pb-8 lg:pt-12 lg:pb-14">
          {/* Title */}
          <h1
            className="text-white text-center mb-6 lg:mb-8"
            style={{
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              fontSize: "clamp(22px, 3vw, 32px)",
              textShadow: "1px 1px 0px black",
              lineHeight: 1.35,
              maxWidth: 800,
            }}
          >
            Hong Kong Listed Companies, New Online Platform
          </h1>

          {/* Search bar */}
          <div className="w-full max-w-[780px] lg:max-w-[900px] mb-4">
            <div
              className="bg-[#fafafa] rounded-full flex items-center border-2 border-[#04ecd3]"
              style={{ boxShadow: "0 0 6px #17d9d1" }}
            >
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search Items"
                className="flex-1 bg-transparent px-5 py-3 lg:py-4 text-base lg:text-lg outline-none text-gray-700 placeholder-gray-400"
              />
              <button
                onClick={handleSearch}
                className="bg-[#128c88] text-white rounded-full px-5 lg:px-8 py-3 lg:py-3.5 mx-1.5 flex items-center gap-2 hover:bg-[#0a7470] transition-colors text-sm lg:text-base"
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 22 22">
                  <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="2" />
                  <line x1="14" y1="14" x2="20" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </div>

          {/* Radio filters */}
          <div className="bg-white rounded-full px-4 py-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              { value: "stockCode", label: "Stock Code" },
              { value: "individuals", label: "Individuals" },
              { value: "corporations", label: "Corporations" },
              { value: "licensee", label: "Licensee" },
            ].map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    searchType === opt.value ? "border-[#008581]" : "border-gray-400"
                  }`}
                  onClick={() => setSearchType(opt.value)}
                >
                  {searchType === opt.value && (
                    <div className="w-3 h-3 rounded-full bg-[#008581]" />
                  )}
                </div>
                <span
                  className="text-sm text-gray-800 cursor-pointer select-none"
                  onClick={() => setSearchType(opt.value)}
                >
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORY CARDS ===== */}
      <section className="px-4 lg:px-6 py-6 lg:py-8 max-w-screen-xl mx-auto w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryCards.map((card) => (
            <div
              key={card.id}
              className="bg-[#0c6fae] rounded-2xl lg:rounded-3xl p-4 lg:p-5 flex flex-col gap-3 shadow-lg cursor-pointer hover:bg-[#0a5f99] transition-colors"
              style={{ boxShadow: "0px 1px 54px 0px #385c7f" }}
              onClick={() => navigate(`/corporation/${card.id}`)}
            >
              {/* Icon + Title row */}
              <div className="flex items-center gap-2 lg:gap-3">
                <div
                  className="shrink-0 flex items-center justify-center rounded-xl border border-[rgba(226,232,240,0.5)]"
                  style={{ width: 56, height: 56 }}
                >
                  <card.Icon />
                </div>
                <h3 className="text-white font-bold text-sm lg:text-base leading-tight">
                  {card.title}
                </h3>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-0.5">
                {card.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-white text-xs lg:text-sm underline leading-6 hover:text-[#04ecd3] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="px-4 lg:px-6 py-6 lg:py-8 max-w-screen-xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: Accordion */}
          <div className="flex flex-col gap-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className={`w-full flex items-center justify-between px-4 py-3 text-left ${
                    item.highlight && openFaq === i
                      ? "bg-[#f0fbfa]"
                      : "bg-white hover:bg-gray-50"
                  } transition-colors`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span
                    className={`text-sm font-medium ${
                      item.highlight ? "text-[#009ca6]" : "text-gray-700"
                    }`}
                  >
                    {item.q}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp size={16} className="text-gray-400 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400 shrink-0 ml-2" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-4 py-3 bg-white border-t border-gray-100">
                    <p className="text-sm text-gray-600">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: FAQ Description */}
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-gray-800">
              Frequently{" "}
              <span className="text-[#009ca6]">Asked Questions</span>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              This FAQ covers using CCASS visualizations to track big-player moves, setting unlimited
              real-time alerts for disclosures and large trades, plus seamless mobile/desktop access.
            </p>
          </div>
        </div>
      </section>

      <div className="flex-1" />
      <Footer />

      {/* ===== MOBILE MENU DRAWER ===== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="flex-1 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
          <div className="w-[280px] bg-white flex flex-col overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 cursor-pointer">中文</span>
                <span className="text-gray-200">|</span>
                <div className="flex gap-2 text-sm text-gray-600">
                  <span className="cursor-pointer hover:text-[#009ca6]">-A</span>
                  <span className="cursor-pointer hover:text-[#009ca6]">A</span>
                  <span className="cursor-pointer hover:text-[#009ca6]">+A</span>
                </div>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-gray-500">
                <X size={20} />
              </button>
            </div>

            {/* First item expanded */}
            <div className="border-b border-gray-100">
              <div className="flex items-center gap-3 px-4 py-4">
                <div className="w-10 h-10 bg-[#009ca6] rounded-xl flex items-center justify-center">
                  <BarChart2 size={20} className="text-white" />
                </div>
                <p className="flex-1 text-sm font-semibold text-[#009ca6] leading-tight">
                  Stock Trading Analysis System
                </p>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
              <div className="pb-3 px-4">
                <p className="text-sm font-semibold text-[#009ca6] mb-2">Stock Trading Analysis System</p>
                <div className="h-px bg-[#009ca6] mb-3" />
                {[
                  "Top CCASS changes",
                  "CCASS concentration analysis",
                  "CCASS Investor Participant stakes",
                  "CCASS participants and holdings",
                  "Shanghai-HK connect southbound positions",
                  "Shenzhen-HK connect southbound positions",
                ].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block py-1.5 text-sm text-gray-700 underline hover:text-[#009ca6]"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {[
              { icon: <Users size={18} />, label: "Advisors to HK-listed issuers" },
              { icon: <Building2 size={18} />, label: "HK Companies Registry analysis" },
              { icon: <BookOpen size={18} />, label: "UK Companies House analysis" },
              { icon: <BookOpen size={18} />, label: "SFC licensees analysis" },
              { icon: <LayoutGrid size={18} />, label: "Categories" },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 hover:bg-gray-50"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                  {item.icon}
                </div>
                <span className="flex-1 text-sm font-medium text-gray-700">{item.label}</span>
                <ChevronRight size={16} className="text-gray-400" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
