import { useState } from "react";
import { ChevronRight, ChevronDown, X } from "lucide-react";
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
    children: [
      { label: "Buybacks" },
      { label: "Outstanding" },
      { label: "Short" },
    ],
  },
  {
    label: "CCASS",
    highlight: true,
    children: [
      {
        label: "Holdings",
        children: [
          { label: "Snapshot", active: true },
          { label: "Custodians" },
          { label: "Brokers" },
          { label: "Investors" },
          { label: "CCASS total" },
          { label: "Non-CCASS" },
        ],
      },
      { label: "Changes" },
      { label: "Big Changes" },
      { label: "Concentration" },
      { label: "Big changes all stocks" },
      { label: "Participants" },
      { label: "About CCASS" },
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

function SidebarItem({ node, depth = 0 }: { node: NavNode; depth?: number }) {
  const [open, setOpen] = useState(depth < 2);
  const hasChildren = !!node.children;
  const isActive = !!node.active;
  const isHighlight = !!node.highlight;

  return (
    <div>
      <div
        className={`flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors ${
          isActive
            ? "text-[#009ca6]"
            : isHighlight
            ? "text-[#009ca6]"
            : "text-gray-600"
        }`}
        style={{ paddingLeft: depth * 10 + 8 }}
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
        <div>
          {node.children!.map((child) => (
            <SidebarItem key={child.label} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

// ──────────────── DATA ────────────────

const summaryRows = [
  { type: "Custodians", holding: "2,149,011,284", stake: "56.11", bold: false },
  { type: "Brokers", holding: "295,439,385", stake: "7.71", bold: false },
  { type: "Other Intermediaries", holding: "92,516,329", stake: "2.42", bold: false },
  { type: "Intermediaries", holding: "2,536,966,998", stake: "66.24", bold: false },
  { type: "Named Investors", holding: "66,700", stake: "0.00", bold: false },
  { type: "Unnamed investors", holding: "17,724,571", stake: "0.46", bold: false },
  { type: "Total in CCASS", holding: "2,554,758,269", stake: "66.70", bold: true },
  { type: "Securities not in CCASS", holding: "1,275,286,231", stake: "33.30", bold: false },
  { type: "Issued securities", holding: "3,830,044,500", stake: "100.00", bold: false },
];

const detailRows = [
  { row: 1, id: "C00019", name: "THE HONGKONG AND SHANGHAI BANKING", holding: "1,344,378,198", lastChange: "2026-03-25" },
  { row: 2, id: "C00010", name: "CITIBANK N.A.", holding: "352,980,310", lastChange: "2026-03-25" },
  { row: 3, id: "C00039", name: "STANDARD CHARTERED BANK (HONG KONG) LTD", holding: "99,061,885", lastChange: "2026-03-25" },
];

// ──────────────── MAIN PAGE ────────────────

export default function CorporationDetailPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        showSearch
        searchValue={searchText}
        onSearchChange={setSearchText}
      />

      {/* Main layout with background image underneath */}
      <div className="relative flex-1">
        {/* Background image — 444px tall, sits behind main content */}
        <img
          src={imgHero}
          alt=""
          className="absolute inset-x-0 top-0 w-full h-[444px] object-cover object-center opacity-80"
        />
        <div className="absolute inset-x-0 top-0 h-[444px] bg-gradient-to-b from-blue-800/30 to-gray-800/30" />

      <div className="relative max-w-7xl mx-auto w-full px-2 sm:px-4 lg:px-6 py-4 lg:py-6">
        <div className="flex gap-4 lg:gap-6 relative">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:relative lg:w-52 lg:shrink-0 bg-white rounded-xl p-4 h-fit">
            <div className="space-y-2">
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
               style={{
                 animation: 'fadeIn 0.3s ease-out forwards'
               }}
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
             {/* Header with close button */}
             <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-gray-200">
               <span className="font-semibold text-[#008581] text-lg">Navigation</span>
               <button onClick={() => setSidebarOpen(false)}>
                 <ChevronDown className="w-5 h-5 text-[#008581]" />
               </button>
             </div>

             {/* Menu items */}
             <div className="p-6 space-y-6">
               {/* HOME section */}
               <div>
                 <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                   HOME
                 </div>
               </div>

               {/* KEY DATA section */}
               <div>
                 <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                   KEY DATA
                 </div>
                 <div className="space-y-2">
                   {sidebarTree[0]?.children?.map((child) => (
                     <div
                       key={child.label}
                       className={`px-4 py-2.5 text-sm rounded-lg cursor-pointer transition-colors ${
                         child.active
                           ? "bg-cyan-100 text-[#008581] font-semibold"
                           : "text-gray-600 hover:text-[#008581]"
                       }`}
                     >
                       {child.label}
                     </div>
                   ))}
                 </div>
               </div>

               {/* ANALYSIS section */}
               <div>
                 <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                   ANALYSIS
                 </div>
                 <div className="space-y-2">
                   {sidebarTree.filter(n => !n.highlight && n.label !== "Prices" && n.label !== "Events" && n.label !== "Dealings" && n.label !== "Quote").slice(0, 3).map((node) => (
                     <div
                       key={node.label}
                       className="px-4 py-2.5 text-sm text-gray-600 rounded-lg cursor-pointer hover:text-[#008581] transition-colors"
                     >
                       {node.label}
                     </div>
                   ))}
                 </div>
               </div>

               {/* More items */}
               <div className="space-y-2">
                 {sidebarTree.filter(n => !n.highlight).slice(3, 6).map((node) => (
                   <div
                     key={node.label}
                     className="px-4 py-2.5 text-sm text-gray-600 rounded-lg cursor-pointer hover:text-[#008581] transition-colors"
                   >
                     {node.label}
                   </div>
                 ))}
               </div>
             </div>
           </aside>


          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
              {/* Corporation badge */}
              <div className="mb-3">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded border"
                  style={{
                    background: "#e8f5e9",
                    color: "#2e7d32",
                    border: "1px solid #a5d6a7",
                  }}
                >
                  Corporation
                </span>
              </div>

              {/* Company title */}
              <h1
                className="text-gray-900 mb-1"
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: "clamp(16px, 3vw, 22px)",
                  fontWeight: "bold",
                }}
              >
                CK Hutchison Holdings Limited: 0 HKD
              </h1>

              {/* Tabs */}
              <div className="flex gap-1 mt-4 mb-5 border-b border-gray-200 overflow-x-auto">
                {["Ordinary shares : HKD", "Example Others", "Category A", "Category B", "Others"].map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px whitespace-nowrap ${
                      activeTab === i
                        ? "border-[#008581] text-[#008581]"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Listings */}
              <div className="mb-5">
                <h3 className="text-[#008581] font-semibold mb-3">Listings</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-gray-200">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        {["EXCHANGE", "CODE", "LISTED", "LAST TRADE", "DELISTED"].map((col) => (
                          <th
                            key={col}
                            className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0"
                          >
                            {col}
                          </th>
                        ))}
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

              {/* CCASS Holdings header */}
              <div className="mb-4 flex flex-wrap items-baseline gap-2">
                <h3 className="text-gray-900 font-bold text-base">
                  CCASS holdings on <span>2026-03-25</span>
                </h3>
                <span className="text-xs text-gray-400 italic">Hit the stake to see the history.</span>
              </div>

              {/* Summary */}
              <div className="mb-5">
                <h4 className="text-[#008581] font-semibold mb-2">Summary</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-t border-b border-gray-200 bg-gray-50">
                        <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">
                          Type of Holder
                        </th>
                        <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">
                          Holding
                        </th>
                        <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">
                          Stake %
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {summaryRows.map((row, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                          <td
                            className={`py-2.5 px-3 ${
                              row.bold ? "font-semibold text-gray-900" : "text-gray-700"
                            }`}
                          >
                            {row.type}
                          </td>
                          <td
                            className={`py-2.5 px-3 ${
                              row.bold ? "font-semibold text-gray-900" : "text-gray-700"
                            }`}
                          >
                            {row.holding}
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              style={{
                                color: "#009ca6",
                                fontWeight: row.bold ? "700" : "500",
                              }}
                            >
                              {row.stake}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Details */}
              <div>
                <h4 className="text-[#008581] font-semibold mb-2">Details</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-t border-b border-gray-200 bg-gray-50">
                        {["ROW", "CCASS ID", "NAME", "HOLDING", "LAST CHANGE", "STA"].map(
                          (col) => (
                            <th
                              key={col}
                              className="text-left py-2 px-3 text-xs text-gray-500 font-semibold whitespace-nowrap uppercase tracking-wide"
                            >
                              {col}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {detailRows.map((row) => (
                        <tr key={row.row} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-3 text-gray-500">{row.row}</td>
                          <td className="py-3 px-3 text-[#009ca6]">{row.id}</td>
                          <td className="py-3 px-3 text-[#009ca6] underline cursor-pointer text-xs">
                            {row.name}
                          </td>
                          <td className="py-3 px-3 text-gray-700 whitespace-nowrap">
                            {row.holding}
                          </td>
                          <td className="py-3 px-3 text-[#009ca6]">{row.lastChange}</td>
                          <td className="py-3 px-3 text-gray-500">↑</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <a
                    href="#"
                    className="text-[#009ca6] underline text-sm hover:text-[#008581]"
                  >
                    View All Participants
                  </a>
                  <span className="text-xs text-gray-400">Showing top 3 of 154 participants</span>
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
