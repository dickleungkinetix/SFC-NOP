import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import imgHero from "../../assets/4095f7088a770ad2fc6a4abd1dbaf4eb80413283.png";

// ──────────────── MAIN PAGE ────────────────

const tabs = ["Holdings", "Changes", "Big changes", "Concentration", "Big changes all stocks", "Participants"];

export default function CCASS() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchFilter, setSearchFilter] = useState("Stock Code");
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        showSearch
        searchValue={searchText}
        onSearchChange={setSearchText}
        searchFilter={searchFilter}
        onSearchFilterChange={setSearchFilter}
      />

      {/* Main layout with background image underneath */}
      <div className="relative flex-1">
        {/* Background image */}
        <img
          src={imgHero}
          alt=""
          className="absolute inset-x-0 top-0 w-full h-[444px] object-cover object-center opacity-80"
        />
        <div className="absolute inset-x-0 top-0 h-[444px] bg-gradient-to-b from-blue-800/30 to-gray-800/30" />

        <div className="relative max-w-9xl mx-auto w-full px-2 sm:px-4 lg:px-6 py-4 lg:py-6">
          <div className="flex gap-4 lg:gap-6 relative">

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block lg:sticky lg:top-[130px] lg:w-52 lg:shrink-0 bg-white rounded-xl p-4 h-fit">
              <div className="space-y-2">
                <div className="flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors text-gray-600" style={{ paddingLeft: '8px' }}>
                  <span className="flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors text-gray-600">Key Data</span>
                </div>
                <div className="flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors text-gray-600" style={{ paddingLeft: '8px' }}>
                  <span className="text-sm">Officers</span>
                </div>
                <div className="flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors text-gray-600" style={{ paddingLeft: '8px' }}>
                  <span className="text-sm">Overlaps</span>
                </div>
                <div className="flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors text-gray-600" style={{ paddingLeft: '8px' }}>
                  <span className="text-sm">Pay</span>
                </div>
                <div className="flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors text-gray-600" style={{ paddingLeft: '8px' }}>
                  <span className="text-sm">Advisers</span>
                </div>
                <div className="flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors text-gray-600" style={{ paddingLeft: '8px' }}>
                  <span className="text-sm">Financials</span>
                </div>
                <div className="flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors text-gray-600" style={{ paddingLeft: '8px' }}>
                  <span className="text-sm">Listing Team</span>
                </div>
                <a href="/CCASS" className="flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors px-2 rounded-lg text-[#008581] font-semibold bg-cyan-100" style={{ paddingLeft: '8px', textDecoration: 'none' }}>
                  <span className="text-sm">CCASS</span>
                </a>
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
              <div className="p-6 space-y-2">
                <div className="px-4 py-2.5 text-sm rounded-lg text-gray-600">Holdings</div>
                <div className="px-4 py-2.5 text-sm rounded-lg text-gray-600">Changes</div>
                <div className="px-4 py-2.5 text-sm rounded-lg text-gray-600">Big changes</div>
                <div className="px-4 py-2.5 text-sm rounded-lg text-gray-600">Concentration</div>
                <div className="px-4 py-2.5 text-sm rounded-lg text-gray-600">Big changes all stocks</div>
                <div className="px-4 py-2.5 text-sm rounded-lg text-gray-600">Participants</div>
                <div className="px-4 py-2.5 text-sm rounded-lg text-[#009ca6] font-semibold">About CCASS</div>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                {/* CCASS badge */}
                <div className="mb-3">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded border"
                    style={{
                      background: "#e8f5e9",
                      color: "#2e7d32",
                      border: "1px solid #a5d6a7",
                    }}
                  >
                    CCASS
                  </span>
                </div>

                {/* Title */}
                <h1
                  className="text-gray-900 mb-6"
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "clamp(16px, 3vw, 22px)",
                    fontWeight: "bold",
                  }}
                >
                  CK Hutchison Holdings Limited: O HKD
                </h1>

                 {/* Stock Exchange Table */}
                 <div className="mb-8 overflow-x-auto">
                   <table className="w-full text-sm border border-gray-200">
                     <thead>
                       <tr className="border-b border-gray-200 bg-gray-50">
                         <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0">Exchange</th>
                         <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0">Code</th>
                         <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0">Listed</th>
                         <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0">Last trade</th>
                         <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0">Delisted</th>
                         <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0"></th>
                       </tr>
                     </thead>
                     <tbody>
                       <tr className="border-b border-gray-100">
                         <td className="py-3 px-3 text-gray-700 border-r border-gray-100">HK Main</td>
                         <td className="py-3 px-3 text-gray-700 border-r border-gray-100">00001</td>
                         <td className="py-3 px-3 text-gray-700 border-r border-gray-100">1972-11-01</td>
                         <td className="py-3 px-3 text-gray-400 border-r border-gray-100">–</td>
                         <td className="py-3 px-3 text-gray-400 border-r border-gray-100">–</td>
                         <td className="py-3 px-4 min-w-[280px] sm:min-w-0 max-w-[300px] text-[#009ca6] underline cursor-pointer">
                           <a href="https://www1.hkexnews.hk/search/titlesearch.xhtml?lang=EN&market=SEHK&stockId=1&category=0" target="_blank" rel="noreferrer" className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors inline-flex items-center justify-center">Docs</a>
                           <a href="/buyback" target="_blank" rel="noreferrer" className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors inline-flex items-center justify-center">Buybacks</a>
                           <a href="/outstanding" target="_blank" rel="noreferrer" className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors inline-flex items-center justify-center">Outstanding</a>
                           <a href="/Short" target="_blank" rel="noreferrer" className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors inline-flex items-center justify-center">Short</a>
                           <a href="/CCASS" target="_blank" rel="noreferrer" className="mx-2 mt-1 mb-1 px-3 py-1 bg-[#128c88] text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors inline-flex items-center justify-center">CCASS</a>
                           <button className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors">Total return</button>
                           <button className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors">Compare returns</button>
                           <button className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors">Prices</button>
                           <button className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors">Events</button>
                           <button className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors">Dealings</button>
                           <button className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors">Quote</button>
                         </td>
                       </tr>
                     </tbody>
                   </table>
                 </div>

                {/* Header Info */}
                <div className="mb-8">
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="text-black font-semibold">CCASS holdings on 2026-04-02</span><br />
                    <span className="text-gray-600">Hit the stake to see the history.</span>
                  </p>
                </div>

                {/* Animated Tabs */}
                <div className="relative mb-6">
                  <div className="flex text-sm font-medium border-b border-gray-200">
                    {tabs.map((tab, i) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(i)}
                        className={`relative px-4 py-3 text-sm whitespace-nowrap transition-colors ${
                          activeTab === i
                            ? "text-white"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {activeTab === i && (
                          <motion.div
                            layoutId="active-tab"
                            className="absolute inset-0 bg-[#128c88] rounded-t-lg"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{tab}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Animated Tab Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                {/* Radio Button Selection - View Options */}
                <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex flex-wrap gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="view" value="snapshot" defaultChecked className="w-4 h-4" />
                      <span className="text-sm font-medium text-gray-700">Snapshot</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="view" value="custodians" className="w-4 h-4" />
                      <span className="text-sm font-medium text-gray-700">Custodians</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="view" value="brokers" className="w-4 h-4" />
                      <span className="text-sm font-medium text-gray-700">Brokers</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="view" value="investors" className="w-4 h-4" />
                      <span className="text-sm font-medium text-gray-700">Investors</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="view" value="ccass-total" className="w-4 h-4" />
                      <span className="text-sm font-medium text-gray-700">CCASS total</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="view" value="non-ccass" className="w-4 h-4" />
                      <span className="text-sm font-medium text-gray-700">Non-CCASS</span>
                    </label>
                  </div>
                </div>

                {/* Summary Section */}
                <div className="mb-8">
                  <h2 className="text-black font-bold text-base mb-4">Summary</h2>
                  <div className="mb-5 overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0">Type of holder</th>
                          <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0">Holding</th>
                          <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0">Stake %</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">Custodians</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">2,152,579,972</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100 text-black font-semibold">56.20</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">Brokers</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">292,451,020</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">7.64</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">Other intermediaries</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">91,969,829</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">2.40</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100 font-semibold">Intermediaries</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100 font-semibold">2,537,000,821</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100 font-semibold">66.24</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">Named investors</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">66,700</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">0.00</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">Unnamed investors</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">17,735,467</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">0.46</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100 font-semibold">Total in CCASS</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100 font-semibold">2,554,802,988</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100 font-semibold">66.70</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">Securities not in CCASS</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">1,275,241,512</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">33.30</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100 font-bold">Issued securities</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100 font-bold">3,830,044,500</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100 font-bold">100.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Details Section */}
                <div className="mb-8">
                  <h2 className="text-black font-bold text-base mb-4">Details</h2>
                  <div className="mb-5 overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0">Row</th>
                          <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0">CCASS ID</th>
                          <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0">Name</th>
                          <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0">Holding</th>
                          <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0">Last change</th>
                          <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0">Stake %</th>
                          <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap border-r border-gray-200 last:border-r-0">Cumul. Stake %</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">1</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">C00019</td>
                          <td className="py-3 px-3 border-r border-gray-100"><a href="#" className="text-[#009ca6] underline cursor-pointer">THE HONGKONG AND SHANGHAI BANKING</a></td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">1,348,299,738</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">2026-04-02</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100 font-semibold">35.20</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">35.20</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">2</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">C00010</td>
                          <td className="py-3 px-3 border-r border-gray-100"><a href="#" className="text-[#009ca6] underline cursor-pointer">CITIBANK N.A.</a></td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">357,981,534</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">2026-04-02</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">9.35</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">44.55</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">3</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">C00039</td>
                          <td className="py-3 px-3 border-r border-gray-100"><a href="#" className="text-[#009ca6] underline cursor-pointer">STANDARD CHARTERED BANK (HONG KONG) LTD</a></td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">101,491,324</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">2026-04-02</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">2.65</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">47.20</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">4</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">C00033</td>
                          <td className="py-3 px-3 border-r border-gray-100"><a href="#" className="text-[#009ca6] underline cursor-pointer">BANK OF CHINA (HONG KONG) LTD</a></td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">78,309,503</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">2026-04-02</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">2.04</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">49.24</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">5</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">C00018</td>
                          <td className="py-3 px-3 border-r border-gray-100"><a href="#" className="text-[#009ca6] underline cursor-pointer">HANG SENG BANK LTD</a></td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">73,965,393</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">2026-04-02</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">1.93</td>
                          <td className="py-3 px-3 text-gray-700 border-r border-gray-100">51.18</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}