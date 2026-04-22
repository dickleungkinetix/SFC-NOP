import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { SFCLogo } from "./SFCLogo";
import { MobileMenu } from "./MobileMenu";

const navItems = [
  { label: "Stock Trading Analysis System", color: "#007d3d" },
  { label: "Advisors to HK-listed issuers", color: "#b13bb8" },
  { label: "HK Companies Registry analysis", color: "#7fd084" },
  { label: "UK Companies House analysis", color: "#d63200" },
  { label: "SFC licensees analysis", color: "#009bff" },
  { label: "Categories", color: "#ffb81d" },
];

interface HeaderProps {
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  onSearchSubmit?: () => void;
}

export function Header({
  showSearch = false,
  searchValue = "",
  onSearchChange,
  onSearchSubmit,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openNavItem, setOpenNavItem] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (onSearchSubmit) onSearchSubmit();
    else navigate("/search?q=" + encodeURIComponent(searchValue));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-30">
        {/* ── Top Bar ── */}
        <div className="flex items-center justify-between px-4 lg:px-8 py-2 lg:py-3 gap-3">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <SFCLogo width={108} />
          </Link>

          {/* Desktop: optional search bar in header (search results page) */}
          {showSearch && (
            <div className="hidden lg:flex flex-1 max-w-xl mx-6">
              <div
                className="w-full flex items-center rounded-full bg-white overflow-hidden"
                style={{ border: "2px solid #04ecd3", boxShadow: "0 0 5px #17d9d1" }}
              >
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search Items"
                  className="flex-1 px-5 py-2 outline-none text-gray-500 bg-transparent text-sm"
                />
                <button
                  onClick={handleSearch}
                  className="bg-[#128c88] text-white px-5 py-2 flex items-center gap-2 rounded-full m-1 hover:bg-[#0a7472] transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span className="text-sm">Search</span>
                </button>
              </div>
            </div>
          )}

          {/* Desktop spacer when no search */}
          {!showSearch && <div className="hidden lg:block flex-1" />}

          {/* Desktop language/font controls */}
          <div className="hidden lg:flex items-center gap-2 text-sm text-gray-700 shrink-0">
            <span>中文</span>
            <span className="text-base tracking-wide">-A A +A</span>
          </div>

          {/* Mobile: inline search bar (search results page only) */}
          {showSearch && (
            <div
              className="flex lg:hidden flex-1 items-center rounded-full bg-white overflow-hidden"
              style={{ border: "2px solid #04ecd3", boxShadow: "0 0 4px #17d9d1" }}
            >
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search Items"
                className="flex-1 px-3 py-2 outline-none text-gray-500 text-sm bg-transparent"
              />
              <button
                onClick={handleSearch}
                className="bg-[#128c88] text-white p-2 rounded-full m-0.5 hover:bg-[#0a7472] transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button className="lg:hidden p-1.5 ml-1 shrink-0" onClick={() => setMenuOpen(true)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Mobile: search filter row (search results page) */}
        {showSearch && (
          <div className="lg:hidden flex items-center gap-3 px-4 pb-2.5 overflow-x-auto">
            {["Stock Code", "Individuals", "Corporations", "Licensee"].map((opt, i) => (
              <label key={opt} className="flex items-center gap-1.5 cursor-pointer shrink-0">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    i === 0 ? "border-[#008581]" : "border-gray-400"
                  }`}
                >
                  {i === 0 && <div className="w-2 h-2 rounded-full bg-[#008581]" />}
                </div>
                <span className={`text-xs ${i === 0 ? "text-gray-900" : "text-gray-500"}`}>
                  {opt}
                </span>
              </label>
            ))}
          </div>
        )}

        {/* ── Desktop Navigation Bar ── */}
        <nav className="hidden lg:block border-t border-gray-100">
          <div className="relative flex items-center justify-center px-4 lg:px-8">
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => setOpenNavItem(openNavItem === item.label ? null : item.label)}
                  className="relative text-sm text-gray-800 hover:text-gray-600 px-3 py-3 whitespace-nowrap shrink-0 block w-full text-left"
                >
                  {item.label}
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[3px]"
                    style={{ backgroundColor: item.color }}
                  />
                </button>
                
                {/* Mega Menu - Click-based accordion with smooth animation */}
                {openNavItem === item.label && (
                  <div 
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[calc(100vw-40px)] lg:w-[1100px] max-w-7xl bg-white shadow-2xl border-t-2 z-50 animate-in fade-in slide-in-from-top-2 duration-300"
                    style={{ borderTopColor: item.color }}
                  >
                    <div className="p-8">
                      {/* Header with Title and Icon */}
                      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                        <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${item.color}15` }}>
                          <svg className="w-6 h-6" style={{ color: item.color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
                          </svg>
                        </div>
                        <span className="text-xl font-bold text-gray-900">{item.label}</span>
                      </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-x-8 gap-y-10 text-left">
                      {/* Column 1: Trading Analysis */}
                      <div>
                        <div className="flex items-center gap-2 mb-5">
                          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" /><path d="M16 5V3" /><path d="M8 5V3" /><path d="M3 9h16" /><path d="m15 18 3 3 5-5" />
                          </svg>
                          <h4 className="font-bold text-gray-900 text-sm tracking-tight whitespace-normal">Trading Analysis</h4>
                        </div>
                        <ul className="space-y-3.5">
                          {["Market share", "Trading activity", "Short selling", "Stock analysis"].map(link => (
                            <li key={link}><a href="#" className="text-gray-500 hover:text-blue-600 text-[13px] leading-tight block transition-colors whitespace-normal">{link}</a></li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 2: Stock Information */}
                      <div>
                        <div className="flex items-center gap-2 mb-5">
                          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
                          </svg>
                          <h4 className="font-bold text-gray-900 text-sm tracking-tight whitespace-normal">Stock Information</h4>
                        </div>
                        <ul className="space-y-3.5">
                          {["Stock list", "IPO", "Stock suspended", "Stock search"].map(link => (
                            <li key={link}><a href="#" className="text-gray-500 hover:text-blue-600 text-[13px] leading-tight block transition-colors whitespace-normal">{link}</a></li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 3: Exchange Participant */}
                      <div>
                        <div className="flex items-center gap-2 mb-5">
                          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                          <h4 className="font-bold text-gray-900 text-sm tracking-tight whitespace-normal">Exchange Participant</h4>
                        </div>
                        <ul className="space-y-3.5">
                          {["Participant list", "Category", "Status", "Participant search"].map(link => (
                            <li key={link}><a href="#" className="text-gray-500 hover:text-blue-600 text-[13px] leading-tight block transition-colors whitespace-normal">{link}</a></li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 4: Short Position */}
                      <div>
                        <div className="flex items-center gap-2 mb-5">
                          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20v-6M6 20V10M18 20V4" />
                          </svg>
                          <h4 className="font-bold text-gray-900 text-sm tracking-tight whitespace-normal">Short Position</h4>
                        </div>
                        <ul className="space-y-3.5">
                          {["Weekly report", "Daily report", "Aggregated", "History"].map(link => (
                            <li key={link}><a href="#" className="text-gray-500 hover:text-blue-600 text-[13px] leading-tight block transition-colors whitespace-normal">{link}</a></li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 5: Shareholding Analysis */}
                      <div>
                        <div className="flex items-center gap-2 mb-5">
                          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" />
                          </svg>
                          <h4 className="font-bold text-gray-900 text-sm tracking-tight whitespace-normal">Shareholding Analysis</h4>
                        </div>
                        <ul className="space-y-3.5">
                          {["Disclosure", "Large shareholding", "History", "Search"].map(link => (
                            <li key={link}><a href="#" className="text-gray-500 hover:text-blue-600 text-[13px] leading-tight block transition-colors whitespace-normal">{link}</a></li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 6: Others */}
                      <div>
                        <div className="flex items-center gap-2 mb-5">
                          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
                          </svg>
                          <h4 className="font-bold text-gray-900 text-sm tracking-tight whitespace-normal">Others</h4>
                        </div>
                        <ul className="space-y-3.5">
                          {["Feedback", "FAQ", "Contact", "About SFC"].map(link => (
                            <li key={link}><a href="#" className="text-gray-500 hover:text-blue-600 text-[13px] leading-tight block transition-colors whitespace-normal">{link}</a></li>
                          ))}
                        </ul>
                       </div>
                     </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* ── Mobile Colored Rainbow Bar ── */}
        <div className="lg:hidden flex w-full h-[5px]">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="flex-1"
              style={{ backgroundColor: item.color }}
            />
          ))}
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
