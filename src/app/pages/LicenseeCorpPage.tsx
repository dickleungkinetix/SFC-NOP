import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import imgHero from "figma:asset/4095f7088a770ad2fc6a4abd1dbaf4eb80413283.png";

// ──────────────── SIDEBAR TREE ────────────────

interface NavNode {
  label: string;
  children?: NavNode[];
  active?: boolean;
  highlight?: boolean;
}

const sidebarTree: NavNode[] = [
  {
    label: "Key Data",
    highlight: true,
    children: [],
  },
  {
    label: "Officers",
    highlight: true,
    active: true,
    children: [
      { label: "All ranks", active: true },
      { label: "Main board summary" },
      { label: "FAQ" },
    ],
  },
  { label: "Advisers" },
  { label: "Complain" },
  { label: "Pay" },
  { label: "Financials" },
  { label: "Overlaps" },
  { label: "Ess" },
];

function SidebarItem({ node, depth = 0 }: { node: NavNode; depth?: number }) {
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = !!node.children;
  const isActive = !!node.active;
  const isHighlight = !!node.highlight;

  return (
    <div className="mb-1">
      <div
        className={`flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors ${
          isActive
            ? "text-[#009ca6]"
            : isHighlight
            ? "text-[#009ca6]"
            : "text-gray-600"
        }`}
        style={{ paddingLeft: depth * 12 + 8 }}
        onClick={() => hasChildren && setOpen(!open)}
      >
        <span
          className={`text-sm ${
            isActive ? "text-[#009ca6] font-semibold" : isHighlight ? "text-[#009ca6]" : ""
          }`}
        >
          {node.label}
        </span>
        {hasChildren &&
          (open ? (
            <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
          ) : (
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
          ))}
      </div>
      {hasChildren && open && (
        <div className="mt-1">
          {node.children!.map((child) => (
            <SidebarItem key={child.label} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

// ──────────────── DATA ────────────────

const licenseeData = [
  { row: 1, name: "Ai, Jiao 艾曉", age: "-", gen: "-", sfcId: "BUB305", role: "Rep", from: "2023-09-19", until: "2024-09-27" },
  { row: 2, name: "Ai, Yandi 艾雁迪", age: "-", gen: "-", sfcId: "BQL335", role: "Rep", from: "2020-11-10", until: "2023-11-06" },
  { row: 3, name: "Ai, Yu 艾雨", age: "-", gen: "-", sfcId: "BHO463", role: "Rep", from: "2016-06-02", until: "2025-05-06" },
  { row: 4, name: "Ai, Zewen 艾澤文", age: "-", gen: "-", sfcId: "BTK165", role: "Rep", from: "2023-03-01", until: "2025-01-22" },
  { row: 5, name: "An, Xuancheng 安宣誠", age: "-", gen: "-", sfcId: "BRQ870", role: "Rep", from: "2021-09-03", until: "-" },
  { row: 6, name: "Ao, Anqi 安安琪", age: "-", gen: "-", sfcId: "BOB117", role: "Rep", from: "2021-09-29", until: "2024-03-25" },
  { row: 7, name: "Ao, Chuanlong 敖傳龍", age: "-", gen: "-", sfcId: "BUO429", role: "Rep", from: "2024-01-29", until: "2024-07-05" },
  { row: 8, name: "Ao, Yun 敖韻", age: "-", gen: "-", sfcId: "BUE157", role: "Rep", from: "2023-10-17", until: "-" },
  { row: 9, name: "Arai, Fumiko Bonnie 荒井富美子", age: "-", gen: "-", sfcId: "AEU155", role: "Rep", from: "2008-06-10", until: "2009-11-13" },
  { row: 10, name: "Au Yeung, Chi Keung 歐靖強", age: "-", gen: "-", sfcId: "BID775", role: "Rep", from: "2009-01-06", until: "2025-09-05" },
  { row: 11, name: "Bagan, Joanne Fredell", age: "-", gen: "F", sfcId: "BNU356", role: "Rep", from: "2018-11-14", until: "2025-09-15" },
  { row: 12, name: "Bai, Dongxu 白東旭", age: "-", gen: "-", sfcId: "BHF446", role: "Rep", from: "2016-03-24", until: "-" },
  { row: 13, name: "Bai, Hongwei 白宏偉", age: "-", gen: "-", sfcId: "AMB141", role: "Rep", from: "2005-06-01", until: "2014-11-30" },
  { row: 14, name: "Bai, Huizi (SFC:BLP020) 白惠子", age: "-", gen: "-", sfcId: "BLP020", role: "Rep", from: "2023-08-21", until: "-" },
  { row: 15, name: "Bai, Jixing 白嘉星", age: "-", gen: "-", sfcId: "BUA576", role: "Rep", from: "2023-09-05", until: "-" },
  { row: 16, name: "Bai, Jingzhen 白靖真", age: "-", gen: "-", sfcId: "BVW719", role: "Rep", from: "2025-09-19", until: "-" },
  { row: 17, name: "Bai, Qifan 白淇凡", age: "-", gen: "-", sfcId: "BTK333", role: "Rep", from: "2023-02-02", until: "-" },
  { row: 18, name: "Bai, Qing 白靖", age: "-", gen: "-", sfcId: "BTR070", role: "Rep", from: "2023-05-02", until: "2025-09-15" },
];

// ──────────────── MAIN PAGE ────────────────

export default function LicenseeCorpPage() {
  const [activeTab, setActiveTab] = useState("History");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        showSearch
        searchValue={searchText}
        onSearchChange={setSearchText}
      />

      <div className="relative flex-1">
        <img
          src={imgHero}
          alt=""
          className="absolute inset-x-0 top-0 w-full h-[444px] object-cover object-center opacity-80"
        />
        <div className="absolute inset-x-0 top-0 h-[444px] bg-gradient-to-b from-blue-800/30 to-gray-800/30" />

        <div className="relative max-w-7xl mx-auto w-full px-2 sm:px-4 lg:px-6 py-4 lg:py-6">
          <div className="flex gap-4 lg:gap-6 relative">

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block lg:relative lg:w-52 lg:shrink-0 bg-white rounded-xl p-4 h-fit shadow-sm">
              <div className="space-y-1">
                {sidebarTree.map((node) => (
                  <SidebarItem key={node.label} node={node} />
                ))}
              </div>
            </aside>

            {/* Mobile sidebar toggle */}
            <button
              className="lg:hidden fixed bottom-0 left-5 right-5 z-40 bg-gray-100 text-gray-800 px-6 py-4 text-base font-semibold flex items-center justify-between rounded-t-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <span>Navigation</span>
              <ChevronDown className="w-6 h-6 text-[#008581]" />
            </button>

            {/* Sidebar backdrop (mobile) */}
            {sidebarOpen && (
              <div
                className="lg:hidden fixed inset-0 bg-black/40 z-40"
                onClick={() => setSidebarOpen(false)}
                style={{ animation: 'fadeIn 0.3s ease-out forwards' }}
              />
            )}

            {/* Sidebar - Bottom Sheet (Mobile Only) */}
            <aside
              className={`lg:hidden fixed left-5 right-5 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl overflow-hidden max-h-[70vh]`}
              style={{
                transform: sidebarOpen ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                willChange: 'transform',
                opacity: sidebarOpen ? 1 : 0,
                visibility: sidebarOpen ? 'visible' : 'hidden'
              }}
            >
              <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-gray-200">
                <span className="font-semibold text-[#008581] text-lg">Navigation</span>
                <button onClick={() => setSidebarOpen(false)}>
                  <ChevronDown className="w-5 h-5 text-[#008581]" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  {sidebarTree.map((node) => (
                    <div key={node.label} className="space-y-2">
                      <div className={`px-4 py-2.5 text-sm rounded-lg cursor-pointer transition-colors ${
                        node.active ? "bg-cyan-100 text-[#008581] font-semibold" : "text-gray-600 hover:text-[#008581]"
                      }`}>
                        {node.label}
                      </div>
                      {node.children?.map(child => (
                        <div key={child.label} className={`pl-6 pr-4 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
                          child.active ? "text-[#008581] font-semibold" : "text-gray-500 hover:text-[#008581]"
                        }`}>
                          {child.label}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                {/* Licensee Corp badge */}
                <div className="mb-3">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded border"
                    style={{
                      background: "#e8f5e9",
                      color: "#2e7d32",
                      border: "1px solid #a5d6a7",
                    }}
                  >
                    Licensee Corp
                  </span>
                </div>

                {/* Company title */}
                <h1
                  className="text-gray-900 mb-6"
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "clamp(16px, 3vw, 22px)",
                    fontWeight: "bold",
                  }}
                >
                  CHINA INTERNATIONAL CAPITAL CORPORATION HONG KONG SECURITIES LIMITED 中國國際金融香港證券有限公司
                </h1>

                {/* SFC History Section */}
                <div className="border border-gray-200 rounded-lg p-4 lg:p-6 mb-6">
                  <h3 className="text-[#008581] font-bold text-lg mb-4">SFC History</h3>
                  
                  {/* Tabs */}
                  <div className="flex gap-4 mb-6 border-b border-gray-200">
                    {["Current", "History"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 text-sm font-medium transition-colors whitespace-nowrap ${
                          activeTab === tab
                            ? "border-b-2 border-[#008581] text-[#008581]"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Filters */}
                  <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">TAKE ME BACK:</span>
                      <input 
                        type="date" 
                        className="border border-gray-300 rounded px-2 py-1 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#008581]"
                        defaultValue="2026-03-31"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">ACTIVITY TYPE:</span>
                      <input 
                        type="text" 
                        className="border border-gray-300 rounded px-2 py-1 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#008581]"
                        placeholder=""
                      />
                    </div>
                    <div className="flex gap-2 ml-auto">
                      <button className="bg-[#008581] text-white px-4 py-1 rounded hover:bg-[#007471] transition-colors">
                        Go
                      </button>
                      <button className="bg-gray-100 text-gray-600 px-4 py-1 rounded hover:bg-gray-200 transition-colors">
                        clear
                      </button>
                    </div>
                  </div>

                  {/* Table */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">SFC LICENSEES</h4>
                    <p className="text-xs text-gray-500 mb-4">RO=Responsible Officer, Rep=Representative</p>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200 bg-gray-50">
                            {["#", "NAME", "AGE IN 2026", "GEN", "SFC ID", "ROLE", "FROM", "UNTIL"].map((col) => (
                              <th
                                key={col}
                                className="text-left py-3 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap"
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {licenseeData.map((row) => (
                            <tr key={row.row} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="py-3 px-3 text-gray-500">{row.row}</td>
                              <td className="py-3 px-3 text-[#009ca6] underline cursor-pointer font-medium">{row.name}</td>
                              <td className="py-3 px-3 text-gray-600">{row.age}</td>
                              <td className="py-3 px-3 text-gray-600">{row.gen}</td>
                              <td className="py-3 px-3 text-[#009ca6]">{row.sfcId}</td>
                              <td className="py-3 px-3 text-gray-600">{row.role}</td>
                              <td className="py-3 px-3 text-gray-600">{row.from}</td>
                              <td className="py-3 px-3 text-gray-600">{row.until}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}