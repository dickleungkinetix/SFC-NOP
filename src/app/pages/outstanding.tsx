import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import imgHero from "figma:asset/4095f7088a770ad2fc6a4abd1dbaf4eb80413283.png";

// NOTE: This page is cloned from `buyback.tsx` and adjusted to show the
// Outstanding section. For now, it reuses the same static/mock table layout.

export default function OutstandingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [stockCode, setStockCode] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header showSearch searchValue={searchText} onSearchChange={setSearchText} />

      <div className="relative flex-1">
        <img
          src={imgHero}
          alt=""
          className="absolute inset-x-0 top-0 w-full h-[444px] object-cover object-center opacity-80"
        />
        <div className="absolute inset-x-0 top-0 h-[444px] bg-gradient-to-b from-blue-800/30 to-gray-800/30" />

        <div className="relative max-w-7xl mx-auto w-full px-2 sm:px-4 lg:px-6 py-4 lg:py-6">
          <div className="flex gap-4 lg:gap-6 relative">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block lg:sticky lg:top-[130px] lg:w-52 lg:shrink-0 bg-white rounded-xl p-4 h-fit">
              <div className="space-y-2">
                <div className="flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors px-2 rounded-lg text-[#008581] font-semibold bg-cyan-100" style={{ paddingLeft: "8px" }}>
                  <span className="text-sm text-[#009ca6]">Key Data</span>
                </div>
                <div className="flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors text-gray-600" style={{ paddingLeft: "8px" }}>
                  <span className="text-sm">Officers</span>
                </div>
                <div className="flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors text-gray-600" style={{ paddingLeft: "8px" }}>
                  <span className="text-sm">Overlaps</span>
                </div>
                <div className="flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors text-gray-600" style={{ paddingLeft: "8px" }}>
                  <span className="text-sm">Pay</span>
                </div>
                <div className="flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors text-gray-600" style={{ paddingLeft: "8px" }}>
                  <span className="text-sm">Advisers</span>
                </div>
                <div className="flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors text-gray-600" style={{ paddingLeft: "8px" }}>
                  <span className="text-sm">Financials</span>
                </div>
                <div className="flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors text-gray-600" style={{ paddingLeft: "8px" }}>
                  <span className="text-sm">Listing Team</span>
                </div>
                <a
                  href="/CCASS"
                  className="flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors text-gray-600 block"
                  style={{ paddingLeft: "8px", textDecoration: "none" }}
                >
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

            {/* Sidebar backdrop */}
            {sidebarOpen && (
              <div
                className="lg:hidden fixed inset-0 bg-black/40 z-40"
                onClick={() => setSidebarOpen(false)}
                style={{ animation: "fadeIn 0.3s ease-out forwards" }}
              />
            )}

            {/* Sidebar bottom sheet */}
            <aside
              className={`lg:hidden fixed left-5 right-5 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl overflow-hidden max-h-[70vh]`}
              style={{
                transform: sidebarOpen ? "translateY(0)" : "translateY(100%)",
                transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                willChange: "transform",
                opacity: sidebarOpen ? 1 : 0,
                visibility: sidebarOpen ? "visible" : "hidden",
              }}
            >
              <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-gray-200">
                <span className="font-semibold text-[#008581] text-lg">Navigation</span>
                <button onClick={() => setSidebarOpen(false)}>
                  <ChevronDown className="w-5 h-5 text-[#008581]" />
                </button>
              </div>
              <div className="p-6 space-y-2">
                <div className="px-4 py-2.5 text-sm rounded-lg text-gray-600">
                  <a href="/pages/CCASS" className="underline hover:text-[#008581]">
                    CCASS
                  </a>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                <div className="mb-3">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded border"
                    style={{
                      background: "rgb(232, 245, 233)",
                      color: "rgb(46, 125, 50)",
                      border: "1px solid rgb(165, 214, 167)",
                    }}
                  >
                    Outstanding
                  </span>
                </div>

                <h1
                  className="text-gray-900 mb-6"
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "clamp(16px, 3vw, 22px)",
                    fontWeight: "bold",
                  }}
                >
                  CK Hutchison Holdings Limited 長江和記實業有限公司
                </h1>

                {/* HK-listed equities table */}
                <div className="mb-5 overflow-x-auto">
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
                        <td className="py-3 px-3 min-w-[280px] sm:min-w-0 max-w-[300px] text-[#009ca6] underline cursor-pointer">
                           <a
                             href="https://www1.hkexnews.hk/search/titlesearch.xhtml?lang=EN&market=SEHK&stockId=1&category=0"
                             target="_blank"
                             rel="noreferrer"
                             className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors inline-flex items-center justify-center"
                           >
                             Docs
                           </a>
                           <a
                             href="/buyback"
                             target="_blank"
                             rel="noreferrer"
                             className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors inline-flex items-center justify-center"
                           >
                             Buybacks
                           </a>
                           <a
                             href="/outstanding"
                             target="_blank"
                             rel="noreferrer"
                             className="mx-2 mt-1 mb-1 px-3 py-1 bg-[#128c88] text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors inline-flex items-center justify-center"
                           >
                             Outstanding
                           </a>
                           <a
                             href="/Short"
                             target="_blank"
                             rel="noreferrer"
                             className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors inline-flex items-center justify-center"
                           >
                             Short
                           </a>
                           <a
                             href="/CCASS"
                             target="_blank"
                             rel="noreferrer"
                             className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors inline-flex items-center justify-center"
                           >
                             CCASS
                           </a>
                           <a
                             href="/TotalReturn"
                             target="_blank"
                             rel="noreferrer"
                             className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors inline-flex items-center justify-center"
                           >
                             Total return
                           </a>
                           <a
                             href="/CompareReturn"
                             target="_blank"
                             rel="noreferrer"
                             className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors inline-flex items-center justify-center"
                           >
                             Compare returns
                           </a>
                           <a
                             href="/Prices"
                             target="_blank"
                             rel="noreferrer"
                             className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors inline-flex items-center justify-center"
                           >
                             Prices
                           </a>
                           <a
                             href="/Events"
                             target="_blank"
                             rel="noreferrer"
                             className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors inline-flex items-center justify-center"
                           >
                             Events
                           </a>
                           <a
                             href="/Dealings"
                             target="_blank"
                             rel="noreferrer"
                             className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors inline-flex items-center justify-center"
                           >
                             Dealings
                           </a>
                           <a
                             href="/Quote"
                             target="_blank"
                             rel="noreferrer"
                             className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors inline-flex items-center justify-center"
                           >
                             Quote
                           </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Filter and search section */}
                <div className="mb-6 bg-white p-4 rounded-lg border">
                  <div className="flex gap-4 items-center">
                    <label className="font-semibold">Stock code:</label>
                    <input type="text" className="border px-3 py-2 rounded w-40" value="" />
                    <button className="bg-gray-400 text-white px-4 py-2 rounded">Go</button>
                  </div>
                </div>

                {/* Outstanding securities title */}
                <h2 className="text-black font-bold text-base mb-2">Outstanding securities</h2>
                <p className="text-gray-700 mb-6">
                  Note: we do not adjust the history for stock splits, consolidations or bonus issues. Pending securities are those not yet issued for bonus issues, rights issues, open offers and scrip-only dividends (which are bonus issues in disguise). The pending market capitalisation includes these securities.
                </p>

                {/* Outstanding table */}
                <div className="bg-white rounded-lg border overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#009ca6]">Securities</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#009ca6]">Change</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#009ca6]">Price</th>
                        <th className="text-left py-3 px-4 font-semibold">Price date</th>
                        <th className="text-right py-3 px-4 font-semibold">Market cap m.</th>
                        <th className="text-right py-3 px-4 font-semibold">Pending securities</th>
                        <th className="text-right py-3 px-4 font-semibold text-[#009ca6]">Pending mcap</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-[#009ca6]">2026-04-30</td>
                        <td className="py-3 px-4 text-right">3,830,044,500</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">65.050</td>
                        <td className="py-3 px-4">2026-04-30</td>
                        <td className="py-3 px-4 text-right">249,144.41</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">249,144.41</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-[#009ca6]">2026-03-31</td>
                        <td className="py-3 px-4 text-right">3,830,044,500</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">59.600</td>
                        <td className="py-3 px-4">2026-03-31</td>
                        <td className="py-3 px-4 text-right">228,270.65</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">228,270.65</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-[#009ca6]">2026-02-28</td>
                        <td className="py-3 px-4 text-right">3,830,044,500</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">64.400</td>
                        <td className="py-3 px-4">2026-02-27</td>
                        <td className="py-3 px-4 text-right">246,654.87</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">246,654.87</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-[#009ca6]">2026-01-31</td>
                        <td className="py-3 px-4 text-right">3,830,044,500</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">63.250</td>
                        <td className="py-3 px-4">2026-01-30</td>
                        <td className="py-3 px-4 text-right">242,250.31</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">242,250.31</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-[#009ca6]">2025-12-31</td>
                        <td className="py-3 px-4 text-right">3,830,044,500</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">52.950</td>
                        <td className="py-3 px-4">2025-12-31</td>
                        <td className="py-3 px-4 text-right">202,800.86</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">202,800.86</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-[#009ca6]">2025-11-30</td>
                        <td className="py-3 px-4 text-right">3,830,044,500</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">54.950</td>
                        <td className="py-3 px-4">2025-11-28</td>
                        <td className="py-3 px-4 text-right">210,460.95</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">210,460.95</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-[#009ca6]">2025-10-31</td>
                        <td className="py-3 px-4 text-right">3,830,044,500</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">51.500</td>
                        <td className="py-3 px-4">2025-10-31</td>
                        <td className="py-3 px-4 text-right">197,247.29</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">197,247.29</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-[#009ca6]">2025-09-30</td>
                        <td className="py-3 px-4 text-right">3,830,044,500</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">51.250</td>
                        <td className="py-3 px-4">2025-09-30</td>
                        <td className="py-3 px-4 text-right">196,289.78</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">196,289.78</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-[#009ca6]">2025-08-31</td>
                        <td className="py-3 px-4 text-right">3,830,044,500</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">51.350</td>
                        <td className="py-3 px-4">2025-08-29</td>
                        <td className="py-3 px-4 text-right">196,672.78</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">196,672.78</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-[#009ca6]">2025-07-31</td>
                        <td className="py-3 px-4 text-right">3,830,044,500</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">51.400</td>
                        <td className="py-3 px-4">2025-07-31</td>
                        <td className="py-3 px-4 text-right">196,864.29</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">196,864.29</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-[#009ca6]">2025-06-30</td>
                        <td className="py-3 px-4 text-right">3,830,044,500</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">48.300</td>
                        <td className="py-3 px-4">2025-06-30</td>
                        <td className="py-3 px-4 text-right">184,991.15</td>
                        <td className="py-3 px-4 text-right">0</td>
                        <td className="py-3 px-4 text-right">184,991.15</td>
                      </tr>
                    </tbody>
                  </table>
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
