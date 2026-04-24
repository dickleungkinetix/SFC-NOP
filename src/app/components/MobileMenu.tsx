import { useState } from "react";
import { X, ChevronRight, BarChart2, Users, Building2, Landmark, FileText, LayoutGrid } from "lucide-react";
import { SFCLogo } from "./SFCLogo";
import chartImage from "../../assets/chart_image.png";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Advisors to HK-listed issuers", icon: <Users className="w-5 h-5 text-[#008581]" /> },
  { label: "HK Companies Registry analysis", icon: <Building2 className="w-5 h-5 text-[#008581]" /> },
  { label: "UK Companies House analysis", icon: <Landmark className="w-5 h-5 text-[#008581]" /> },
  { label: "SFC licensees analysis", icon: <FileText className="w-5 h-5 text-[#008581]" /> },
  { label: "Categories", icon: <LayoutGrid className="w-5 h-5 text-[#008581]" /> },
];

const ccassLinks = [
  "Top CCASS changes",
  "CCASS concentration analysis",
  "CCASS Investor Participant stakes",
  "CCASS participants and holdings",
  "Shanghai-HK connect southbound positions",
  "Shenzhen-HK connect southbound positions",
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>("Stock Trading Analysis System");

  return (
    <>
      {/* Backdrop with fade animation */}
       {isOpen && (
         <div
           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
           onClick={onClose}
           style={{
             animation: isOpen ? 'fadeIn 0.3s ease-out forwards' : 'fadeOut 0.3s ease-in forwards'
           }}
         />
       )}

      {/* Menu Drawer with smooth pull-up animation (slow to fast) */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-white z-[99999] lg:hidden flex flex-col shadow-2xl`}
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'transform'
        }}
      >

        {/* Main Content Layer */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <button onClick={onClose} className="p-1">
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>中文</span>
              <span className="ml-2 text-base">-A A +A</span>
            </div>
          </div>

          {/* Active: Stock Trading Analysis System */}
          <div className="px-4 pt-4">
            <button 
              onClick={() => setExpandedItem(expandedItem === "Stock Trading Analysis System" ? null : "Stock Trading Analysis System")}
              className="w-full flex items-center justify-between bg-[#008581] rounded-xl px-3 py-3 mb-4 hover:bg-[#006b6a] transition-colors shadow-lg"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <BarChart2 className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-sm text-white leading-tight">
                  Stock Trading<br />Analysis System
                </span>
              </div>
              <ChevronRight className={`w-4 h-4 text-white shrink-0 transition-transform duration-300 ${expandedItem === "Stock Trading Analysis System" ? "rotate-90" : ""}`} />
            </button>

            {/* Expanded submenu with animation */}
            {expandedItem === "Stock Trading Analysis System" && (
              <div className="border-t-2 border-[#008581] pt-3 mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="font-semibold text-[#008581] text-sm mb-3">Stock Trading Analysis System</p>
                <ul className="space-y-2">
                  {ccassLinks.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-[#1a56b0] underline text-sm hover:text-[#008581]">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Other nav items */}
          <div className="flex-1 overflow-y-auto px-4">
            {navItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-800 leading-tight">
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decorative - moved to background layer */}
        <div className="absolute bottom-0 right-0 p-4 bg-gradient-to-t from-gray-50 z-0 pointer-events-none">
          <div className="chart-float-wrapper">
            <div className="chart-float-right" />
          </div>
        </div>
      </div>
    </>
  );
}