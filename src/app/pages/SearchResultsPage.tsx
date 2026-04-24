import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import svgPaths from "../../imports/svg-7ratgxrxq9";
import imgHero from "figma:asset/4095f7088a770ad2fc6a4abd1dbaf4eb80413283.png";

const searchResults = [
  "HSBC BANK PLC",
  "HSBC BROKING (CHINA) LIMITED",
  "HSBC BROKING FOREX (ASIA) LIMITED",
  "HSBC BROKING FUTURES (ASIA) LIMITED",
  "HSBC BROKING FUTURES (HONG KONG) LIMITED",
  "HSBC BROKING SECURITIES (ASIA) LIMITED",
  "HSBC BROKING SECURITIES (HONG KONG) LIMITED",
  "HSBC BROKING SERVICES (ASIA) LIMITED (HK)",
  "HSBC Corporate Finance (Hong Kong) Limited",
  "HSBC FINANCE (NETHERLANDS)",
  "HSBC Global Asset Management (Hong Kong) Limited",
  "HSBC Holdings plc",
  "HSBC INSURANCE BROKERS LTD",
  "HSBC Insurance (Asia-Pacific) Holdings Limited",
  "HSBC International Trustee Limited",
  "HSBC LIFE (INTERNATIONAL) LIMITED",
  "HSBC NOMINEES (HONG KONG) LIMITED",
  "HSBC Private Banking Holdings (Suisse) SA",
  "HSBC Private Bank (UK) Limited",
  "HSBC Securities (USA) Inc.",
];

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
          selected ? "border-[#008581]" : "border-gray-300"
        }`}
      >
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#008581]" />}
      </div>
      <span className={`text-sm select-none ${selected ? "text-gray-900" : "text-gray-500"}`}>
        {label}
      </span>
    </label>
  );
}

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(params.get("q") || "HSBC");
  const [searchFilter, setSearchFilter] = useState("Stock Code");

  const handleSearchSubmit = () => {
    navigate(`/search?q=${encodeURIComponent(searchText)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        showSearch
        searchValue={searchText}
        onSearchChange={setSearchText}
        onSearchSubmit={handleSearchSubmit}
        searchFilter={searchFilter}
        onSearchFilterChange={setSearchFilter}
      />

      {/* Background */}
      <div className="relative flex-1" style={{ minHeight: 200 }}>
        <img
          src={imgHero}
          alt=""
          className="absolute inset-0 w-full object-cover object-center"
        />
        {/* Search results panel */}
                <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-6 lg:py-10">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#f3f4f6]">
            {/* Header - Matching Figma Container1 */}
            <div
              className="px-4 lg:px-8 py-3.5 border-b border-[#f3f4f6]"
              style={{ background: "rgba(249,250,251,0.5)" }}
            >
              <h2 className="text-[#009ca6] font-bold text-[18px]">
                Search Listed Securities
              </h2>
            </div>

            {/* Content Body */}
            <div className="p-4 lg:p-8 space-y-8">
               {/* Search by filter - Matching Figma Container3/4/5 */}
               <div className="hidden lg:block bg-[#f9fafb] rounded-[16px] border border-[#f3f4f6] p-5 lg:p-8">
                 <div className="flex flex-col gap-4">
                  <h3 className="font-bold text-[#1e2939] text-[18px]">Search by</h3>
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
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
              </div>

              {/* Match count - Matching Figma Container12 */}
              <div className="flex items-center gap-2">
                <span className="text-[#1e2939] font-medium text-[18px]">Matched record(s):</span>
                <span className="text-[#1e2939] font-medium text-[18px]">319</span>
              </div>

              {/* Desktop Table View - Matching TableRow/TableRow1 etc */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#f0f9fa] border-y border-[#e2e8f0]">
                      <th className="px-4 py-3 text-left text-[#009ca6] font-bold text-[14px]">Issuer</th>
                      <th className="px-4 py-3 text-center text-[#009ca6]">
                        <div className="flex justify-center">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d={svgPaths.p39ee6532} stroke="#009CA6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d={svgPaths.p14d10c00} stroke="#009CA6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d="M1.33333 8H14.6667" stroke="#009CA6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          </svg>
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-[#009ca6] font-bold text-[14px]">Formed</th>
                      <th className="px-4 py-3 text-left text-[#009ca6] font-bold text-[14px]">Issue</th>
                      <th className="px-4 py-3 text-left text-[#009ca6] font-bold text-[14px]">Shares</th>
                      <th className="px-4 py-3 text-right text-[#009ca6] font-bold text-[14px]">Stake</th>
                      <th className="px-4 py-3 text-left text-[#009ca6] font-bold text-[14px]">Holding date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#edf2f7]">
                    {searchResults.map((result, i) => (
                      <tr
                        key={i}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => navigate("/corporation/0001")}
                      >
                        <td className="px-4 py-4 text-[#009ca6] font-medium text-[14px] hover:underline">
                          {result}
                        </td>
                        <td className="px-4 py-4 text-center text-[#009ca6] font-medium text-[14px]">
                          {i % 3 === 0 ? "GBEN" : "HK"}
                        </td>
                        <td className="px-4 py-4 text-[#4a5568] text-[14px]">
                          {1980 + (i % 40)}-01-01
                        </td>
                        <td className="px-4 py-4 text-[#4a5568] text-[14px]">
                          Ordinary shares
                        </td>
                        <td className="px-4 py-4 text-[#4a5568] text-[14px]">
                          {Math.floor(Math.random() * 100000000).toLocaleString()}
                        </td>
                        <td className="px-4 py-4 text-right text-[#4a5568] text-[14px]">
                          100.00%
                        </td>
                        <td className="px-4 py-4 text-[#4a5568] text-[14px]">
                          2012-12-31
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile List View (kept as is for responsive fallback) */}
              <div className="lg:hidden">
                <div className="bg-[#f0f9fa] border-y border-gray-200 px-4 py-2 mb-2">
                  <span className="text-[#009ca6] font-bold text-sm">Issuer</span>
                </div>
                <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                  {searchResults.map((result, i) => (
                    <div
                      key={i}
                      className="px-4 py-3 hover:bg-[#f0f9fa] cursor-pointer"
                      onClick={() => navigate("/corporation/0001")}
                    >
                      <span className="text-[#009ca6] font-medium text-sm">
                        {result}
                      </span>
                    </div>
                  ))}
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
