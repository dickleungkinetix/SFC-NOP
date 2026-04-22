import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import imgHero from "../assets/4095f7088a770ad2fc6a4abd1dbaf4eb80413283.png";

const leftNavSections = [
  {
    label: "Key Data",
    color: "#009ca6",
    children: ["Buybacks", "Outstanding", "Short"],
  },
  {
    label: "CCASS",
    active: true,
    children: [
      {
        label: "Holdings",
        active: true,
        children: ["Snapshot", "Custodians", "Brokers", "Investors", "CCASS total", "Non-CCASS"],
      },
      {
        label: "Changes",
        children: ["Big Changes", "Concentration", "Big changes all stocks", "Participants", "About CCASS"],
      },
    ],
  },
  { label: "Total Return" },
  { label: "Compare Return" },
  { label: "Prices" },
  { label: "Events" },
  { label: "Dealings" },
  { label: "Quote" },
  { label: "Officers" },
  { label: "Pay" },
  { label: "Advisers" },
  { label: "Financials" },
  { label: "Complain" },
];

const ccassSummaryRows = [
  { type: "Custodians", holding: "2,149,011,284", stake: "56.11", highlight: true },
  { type: "Brokers", holding: "295,439,385", stake: "7.71", highlight: true },
  { type: "Other Intermediaries", holding: "92,516,329", stake: "2.42", highlight: true },
  { type: "Intermediaries", holding: "2,536,966,998", stake: "66.24", highlight: true },
  { type: "Named Investors", holding: "66,700", stake: "0.00", highlight: false },
  { type: "Unnamed investors", holding: "17,724,571", stake: "0.46", highlight: false },
  { type: "Total in CCASS", holding: "2,554,758,269", stake: "66.70", bold: true },
  { type: "Securities not in CCASS", holding: "1,275,286,231", stake: "33.30", highlight: false },
  { type: "Issued securities", holding: "3,830,044,500", stake: "100.00", bold: true },
];

const ccassDetails = [
  {
    row: 1,
    id: "C00019",
    name: "THE HONGKONG AND SHANGHAI BANKING",
    holding: "1,344,378,198",
    lastChange: "2026-03-25",
  },
  {
    row: 2,
    id: "C00010",
    name: "CITIBANK N.A.",
    holding: "352,980,310",
    lastChange: "2026-03-25",
  },
  {
    row: 3,
    id: "C00039",
    name: "STANDARD CHARTERED BANK (HONG KONG) LTD",
    holding: "99,061,885",
    lastChange: "2026-03-25",
  },
];

interface NavItemProps {
  label: string;
  active?: boolean;
  color?: string;
  children?: any[];
  level?: number;
}

function NavItem({ label, active, color, children, level = 0 }: NavItemProps) {
  const [expanded, setExpanded] = useState(active || false);

  return (
    <div>
      <div
        className={`flex items-center justify-between px-3 py-2 cursor-pointer text-sm transition-colors ${
          active
            ? "bg-[#e8f4f5] text-[#009ca6] font-semibold"
            : "text-gray-600 hover:bg-gray-50"
        } ${level > 0 ? "pl-" + (level * 4 + 3) : ""}`}
        style={{ paddingLeft: level > 0 ? `${level * 12 + 12}px` : "12px" }}
        onClick={() => children && setExpanded(!expanded)}
      >
        <span style={{ color: color || (active ? "#009ca6" : undefined) }}>{label}</span>
        {children && (expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />)}
      </div>
      {children && expanded && (
        <div>
          {children.map((child: any) =>
            typeof child === "string" ? (
              <div
                key={child}
                className={`px-3 py-1.5 text-sm cursor-pointer transition-colors hover:bg-gray-50 ${
                  child === "Snapshot" ? "text-[#009ca6] font-semibold bg-[#e8f4f5]" : "text-gray-500"
                }`}
                style={{ paddingLeft: `${(level + 1) * 12 + 12}px` }}
              >
                {child}
              </div>
            ) : (
              <NavItem key={child.label} {...child} level={level + 1} />
            )
          )}
        </div>
      )}
    </div>
  );
}

export function CorporationDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("ordinary");
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("stockCode");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(searchValue)}&type=${searchType}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        showSearch={true}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchSubmit={handleSearch}
      />

      {/* Background strip */}
      <div className="relative overflow-hidden" style={{ height: 160 }}>
        <img
          src={imgHero}
          alt="background"
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,126,206,0.31) 10%, rgba(63,157,226,0) 38%, rgba(29,29,29,0.31) 100%)",
          }}
        />
      </div>

      {/* Main layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-2 sm:px-4 lg:px-6 py-4 lg:py-6 -mt-20 relative z-10">
        <div className="flex gap-4 lg:gap-6 relative">
          <button className="lg:hidden fixed bottom-6 left-4 z-40 bg-[#008581] text-white rounded-full px-4 py-2.5 shadow-lg text-sm font-semibold flex items-center gap-2" onClick={() => setSidebarOpen(true)}>
            <ChevronRight className="w-4 h-4" />
            <span>Menu</span>
          </button>
          <aside className="lg:relative lg:translate-x-0 lg:w-52 lg:shrink-0 lg:block fixed top-24 left-0 h-[calc(100vh-96px)] w-64 z-20 bg-white shadow-2xl lg:shadow-none lg:rounded-xl overflow-y-auto transition-transform duration-300 -translate-x-full" style={{ transform: sidebarOpen ? 'translateX(0)' : undefined }}>
            <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-semibold text-gray-800 text-sm">Navigation</span>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-2 lg:p-3">
              {leftNavSections.map((item) => (
                <NavItem key={item.label} {...item} />
              ))}
            </div>
          </aside>
          
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
              <div className="mb-3">
                <span className="text-xs font-semibold px-3 py-1 rounded border" style={{ background: 'rgb(232, 245, 233)', color: 'rgb(46, 125, 50)', border: '1px solid rgb(165, 214, 167)' }}>Corporation</span>
              </div>
              <h1 className="text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif', fontSize: 'clamp(16px, 3vw, 22px)', fontWeight: 'bold' }}>CK Hutchison Holdings Limited: 0 HKD</h1>
              <div className="flex gap-1 mt-4 mb-5 border-b border-gray-200 overflow-x-auto">
                <button className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px whitespace-nowrap ${activeTab === 'ordinary' ? 'border-[#008581] text-[#008581]' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('ordinary')}>Ordinary shares : HKD</button>
                <button className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px whitespace-nowrap ${activeTab === 'others' ? 'border-[#008581] text-[#008581]' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('others')}>Example Others</button>
              </div>
              
              <div className="mb-5">
                <h3 className="text-[#008581] font-semibold mb-3">Listings</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-gray-200">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0">EXCHANGE</th>
                        <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0">CODE</th>
                        <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0">LISTED</th>
                        <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0">LAST TRADE</th>
                        <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0">DELISTED</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-3 text-gray-700 border-r border-gray-100">-K-Main</td>
                        <td className="py-3 px-3 text-gray-700 border-r border-gray-100">00001</td>
                        <td className="py-3 px-3 text-gray-700 border-r border-gray-100">1972-11-01</td>
                        <td className="py-3 px-3 text-gray-400 border-r border-gray-100">–</td>
                        <td className="py-3 px-3 text-[#009ca6] underline cursor-pointer">Docs</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mb-4 flex flex-wrap items-baseline gap-2">
                <h3 className="text-gray-900 font-bold text-base">CCASS holdings on <span>2026-03-25</span></h3>
                <span className="text-xs text-gray-400 italic">Hit the stake to see the history.</span>
              </div>
              
              <div className="mb-5">
                <h4 className="text-[#008581] font-semibold mb-2">Summary</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-t border-b border-gray-200 bg-gray-50">
                        <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">Type of Holder</th>
                        <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">Holding</th>
                        <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">Stake %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ccassSummaryRows.map((row) => (
                        <tr key={row.type} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className={`py-2.5 px-3 ${row.bold ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{row.type}</td>
                          <td className={`py-2.5 px-3 ${row.bold ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{row.holding}</td>
                          <td className="py-2.5 px-3"><span style={{ color: 'rgb(0, 156, 166)', fontWeight: row.bold ? 700 : 500 }}>{row.stake}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h4 className="text-[#008581] font-semibold mb-2">Details</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-t border-b border-gray-200 bg-gray-50">
                        <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold whitespace-nowrap uppercase tracking-wide">ROW</th>
                        <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold whitespace-nowrap uppercase tracking-wide">CCASS ID</th>
                        <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold whitespace-nowrap uppercase tracking-wide">NAME</th>
                        <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold whitespace-nowrap uppercase tracking-wide">HOLDING</th>
                        <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold whitespace-nowrap uppercase tracking-wide">LAST CHANGE</th>
                        <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold whitespace-nowrap uppercase tracking-wide">STA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ccassDetails.map((row) => (
                        <tr key={row.row} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-3 text-gray-500">{row.row}</td>
                          <td className="py-3 px-3 text-[#009ca6]">{row.id}</td>
                          <td className="py-3 px-3 text-[#009ca6] underline cursor-pointer text-xs">{row.name}</td>
                          <td className="py-3 px-3 text-gray-700 whitespace-nowrap">{row.holding}</td>
                          <td className="py-3 px-3 text-[#009ca6]">{row.lastChange}</td>
                          <td className="py-3 px-3 text-gray-500">↑</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <a href="#" className="text-[#009ca6] underline text-sm hover:text-[#008581]">View All Participants</a>
                  <span className="text-xs text-gray-400">Showing top 3 of 154 participants</span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
