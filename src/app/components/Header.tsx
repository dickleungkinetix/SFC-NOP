import { useState, useEffect, useRef } from "react";
import { Menu, Search } from "lucide-react";
import { Link, useNavigate } from "react-router";
import sfcLogoPng from "../../assets/SFC_Logo.png";
import { MobileMenu } from "./MobileMenu";

const navItems = [
  { label: "HK-listed boards", color: "#007d3d" },
  { label: "HK-listed issuers", color: "#b13bb8" },
  { label: "HK-listed securities", color: "#7fd084" },
  { label: "Advisors to HK-listed issuers", color: "#009bff" },
  { label: "SFC licensees analysis", color: "#ffb81d" },
];

interface HeaderProps {
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  onSearchSubmit?: () => void;
  searchFilter?: string;
  onSearchFilterChange?: (v: string) => void;
}

export function Header({
  showSearch = false,
  searchValue = "",
  onSearchChange,
  onSearchSubmit,
  searchFilter = "Stock Code",
  onSearchFilterChange,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openNavItem, setOpenNavItem] = useState<string | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setOpenNavItem(null);
      }
    };

    if (openNavItem) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openNavItem]);

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
            <img
              src={sfcLogoPng}
              alt="SFC"
              width={108}
              height={55}
              className="shrink-0"
              style={{ objectFit: "contain" }}
              loading="eager"
            />
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
          <div className="lg:hidden flex items-center gap-3 px-4 pb-2.5 overflow-x-auto relative z-50">
            {["Stock Code", "Individuals", "Corporations", "Licensee"].map((opt) => (
              <label 
                key={opt} 
                className="flex items-center gap-1.5 cursor-pointer shrink-0 relative z-50"
              >
                <input 
                  type="radio" 
                  name="mobile-search-filter" 
                  className="hidden" 
                  checked={searchFilter === opt}
                  onChange={() => onSearchFilterChange && onSearchFilterChange(opt)}
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                    searchFilter === opt ? "border-[#008581]" : "border-gray-400"
                  }`}
                >
                  {searchFilter === opt && <div className="w-2 h-2 rounded-full bg-[#008581]" />}
                </div>
                <span className={`text-xs transition-colors ${searchFilter === opt ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                  {opt}
                </span>
              </label>
            ))}
          </div>
        )}

        {/* ── Desktop Navigation Bar ── */}
        <nav className="hidden lg:block border-t border-gray-100">
          <div className="relative flex items-center justify-center mx-auto px-4 lg:px-8 max-w-7xl" ref={megaMenuRef}>
                {navItems.map((item) => (
                  <div 
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => setOpenNavItem(item.label)}
                    onMouseLeave={() => setOpenNavItem(null)}
                  >
                    <button
                      className={`relative text-sm px-3 py-3 whitespace-nowrap shrink-0 block w-full text-left ${
                        openNavItem === item.label 
                          ? "font-bold text-[#008783]" 
                          : "text-gray-800 hover:text-gray-600"
                      }`}
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
                      className="fixed top-full left-1/2 -translate-x-1/2 w-[calc(100vw-40px)] lg:w-[1100px] max-w-7xl mx-auto bg-white shadow-2xl border-t-2 z-50 animate-in fade-in slide-in-from-top-2 duration-300"
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
                         <span className={`text-xl ${openNavItem === item.label ? 'font-black' : 'font-bold'} text-gray-900`}>{item.label}</span>
                      </div>

                    {item.label === "HK-listed boards" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-12 gap-y-10 text-left">
                        {/* Column 1: Board Composition & Analysis */}
                        <div>
                          <ul className="space-y-3.5">
                            {["Board composition per Company", "Distribution of directors per Company", "Distribution of female directors per Company", "Directorships by type and gender", "Distribution of INEDs per person"].map(link => (
                              <li key={link}><a href="#" className="text-gray-500 hover:text-blue-600 text-[13px] leading-tight block transition-colors whitespace-normal">{link}</a></li>
                            ))}
                          </ul>
                        </div>

                        {/* Column 2: Director Information */}
                        <div>
                          <ul className="space-y-3.5">
                            {["Directorships per person", "Age distribution of directors", "Latest HK-listed directors", "Webb-site League Table of directors"].map(link => (
                              <li key={link}><a href="#" className="text-gray-500 hover:text-blue-600 text-[13px] leading-tight block transition-colors whitespace-normal">{link}</a></li>
                            ))}
                          </ul>
                        </div>
                       </div>
                    )}

                    {item.label === "HK-listed issuers" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-12 gap-y-10 text-left">
                        {/* Column 1: Regulatory & Market Information */}
                        <div>
                          <ul className="space-y-3.5">
                            {["Stock Exchange listed issuer regulatory teams", "Number of issuers by market annually", "Domicile", "Domicile changes (including unlisted companies)", "Name changes"].map(link => (
                              <li key={link}><a href="#" className="text-gray-500 hover:text-blue-600 text-[13px] leading-tight block transition-colors whitespace-normal">{link}</a></li>
                            ))}
                          </ul>
                        </div>

                        {/* Column 2: Financial & Company Information */}
                        <div>
                          <ul className="space-y-3.5">
                            {["Financial year-end", "Reporting speed", "Companies' web sites"].map(link => (
                              <li key={link}><a href="#" className="text-gray-500 hover:text-blue-600 text-[13px] leading-tight block transition-colors whitespace-normal">{link}</a></li>
                            ))}
                          </ul>
                        </div>
                       </div>
                    )}
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
