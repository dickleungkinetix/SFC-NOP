import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import imgHero from "figma:asset/4095f7088a770ad2fc6a4abd1dbaf4eb80413283.png";

const MOCK_RESULTS = [
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
  "HSBC Insurance Brokers Limited",
  "HSBC Insurance (Asia) Limited",
  "HSBC Life (International) Limited",
  "HSBC Nominees (Hong Kong) Limited",
  "HSBC Private Bank (Suisse) SA",
  "HSBC Securities (Asia) Limited",
  "HSBC Trinkaus & Burkhardt AG",
  "HSBC Wealth Holdings Limited",
];

export function SearchResults() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [searchValue, setSearchValue] = useState(params.get("q") || "");
  const [searchType, setSearchType] = useState(params.get("type") || "stockCode");

  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(searchValue)}&type=${searchType}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        variant="search"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearch={handleSearch}
        searchType={searchType}
        onSearchTypeChange={setSearchType}
      />

      {/* Hero background strip (partially visible behind card) */}
      <div className="relative">
        <div className="h-[120px] lg:h-[160px] overflow-hidden">
          <img
            src={imgHero}
            alt="background"
            className="w-full h-full object-cover object-center opacity-70"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(0,126,206,0.44) 10%, rgba(63,157,226,0) 38%, rgba(29,29,29,0.44) 100%)",
            }}
          />
        </div>

        {/* Search results card */}
        <div className="absolute inset-x-0 top-4 px-4 lg:px-8 max-w-screen-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-[rgba(249,250,251,0.8)] px-6 py-3 border-b border-gray-200">
              <h2 className="text-[#009ca6] font-bold text-lg">Search Listed Securities</h2>
            </div>

            {/* Filter section */}
            <div className="px-6 py-4 border-b border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-3">Search by</h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 max-w-sm">
                {[
                  { value: "stockCode", label: "Stock Code" },
                  { value: "individuals", label: "Individuals" },
                  { value: "corporations", label: "Corporations" },
                  { value: "licensee", label: "Licensee" },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        searchType === opt.value ? "border-[#008581]" : "border-gray-300"
                      }`}
                      onClick={() => setSearchType(opt.value)}
                    >
                      {searchType === opt.value && (
                        <div className="w-3 h-3 rounded-full bg-[#008581]" />
                      )}
                    </div>
                    <span
                      className={`text-sm cursor-pointer ${
                        searchType === opt.value ? "text-gray-900 font-medium" : "text-gray-500"
                      }`}
                      onClick={() => setSearchType(opt.value)}
                    >
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Match count */}
            <div className="px-6 py-3">
              <span className="text-gray-800 font-medium">
                Matched record(s): <strong>{MOCK_RESULTS.length * 16}</strong>
              </span>
            </div>

            {/* Results table */}
            <div className="overflow-hidden">
              {/* Table header */}
              <div className="bg-[#f0f9fa] px-6 py-3 border-b border-gray-200">
                <span className="text-[#009ca6] font-bold text-sm">Issuer</span>
              </div>

              {/* Table rows */}
              <div className="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto">
                {MOCK_RESULTS.map((name) => (
                  <div
                    key={name}
                    className="px-6 py-3 hover:bg-[#f0f9fa] cursor-pointer transition-colors"
                    onClick={() => navigate("/corporation/ck-hutchison")}
                  >
                    <span className="text-[#009ca6] text-sm font-medium">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to push content below the absolutely positioned card */}
      <div style={{ height: "calc(120px + 60vh + 80px)" }} className="lg:hidden" />
      <div style={{ height: "calc(160px + 60vh + 80px)" }} className="hidden lg:block" />

      <Footer />
    </div>
  );
}
