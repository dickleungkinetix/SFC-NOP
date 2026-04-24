import { useState } from "react";
import { ChevronRight, ChevronDown, X, User } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import imgHero from "figma:asset/4095f7088a770ad2fc6a4abd1dbaf4eb80413283.png";

// ──────────────── SIDEBAR TREE ────────────────

interface NavNode {
  label: string;
  active?: boolean;
}

const sidebarTree: NavNode[] = [
  { label: "Key Data", active: true },
  { label: "FAQ" },
  { label: "Positions" },
  { label: "Pay" },
  { label: "Dealings" },
  { label: "SFC Reports" },
];

// ──────────────── DATA ────────────────

const otherNames = [
  { surname: "Razack", givenNames: "Abraham", chineseName: "", type: "F" },
  { surname: "Razack", givenNames: "Ebrahim Abdul", chineseName: "", type: "F" },
];

// ──────────────── MAIN PAGE ────────────────

export default function IndividualDetailPage() {
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
                <div
                  key={node.label}
                  className={`flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors px-2 rounded-lg ${
                    node.active
                      ? "text-[#008581] font-semibold bg-cyan-100"
                      : "text-gray-600"
                  }`}
                >
                  <span className="text-sm">{node.label}</span>
                </div>
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
             <div className="p-6 space-y-2">
               {sidebarTree.map((node) => (
                 <div
                   key={node.label}
                   className={`px-4 py-2.5 text-sm rounded-lg cursor-pointer transition-colors ${
                     node.active
                       ? "bg-cyan-100 text-[#008581] font-semibold"
                       : "text-gray-600 hover:text-[#008581]"
                   }`}
                 >
                   {node.label}
                 </div>
               ))}
             </div>
           </aside>


          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
              {/* Individual badge */}
              <div className="mb-3">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded border"
                  style={{
                    background: "#e0f2f1",
                    color: "#008581",
                    border: "1px solid #008581",
                  }}
                >
                  Individual
                </span>
              </div>

              {/* Name title */}
              <h1
                className="text-gray-900 mb-6"
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: "clamp(18px, 3vw, 26px)",
                  fontWeight: "bold",
                }}
              >
                Shek, Abraham Lai Him 石禮謙
              </h1>

              {/* Personal Information section */}
              <div className="border border-gray-200 rounded-xl p-4 lg:p-6 mb-6">
                <h2 className="text-[#008581] font-semibold text-lg mb-5">
                  Personal Information
                </h2>

                {/* Other Names */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    OTHER NAMES
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200 rounded-lg">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          {["SURNAME", "GIVEN NAMES", "CHINESE NAME", "TYPE"].map((col) => (
                            <th
                              key={col}
                              className="text-left py-2.5 px-4 text-xs text-gray-500 font-semibold tracking-wide whitespace-nowrap"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {otherNames.map((row, i) => (
                          <tr key={i} className="border-b border-gray-100 last:border-b-0">
                            <td className="py-3 px-4 text-gray-900">{row.surname}</td>
                            <td className="py-3 px-4 text-gray-900">{row.givenNames}</td>
                            <td className="py-3 px-4 text-gray-900">{row.chineseName}</td>
                            <td className="py-3 px-4 text-gray-500">{row.type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">A=Alias, F=Former name</p>
                </div>

                {/* Demographics */}
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    DEMOGRAPHICS
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Gender */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">GENDER</p>
                      <p className="text-lg font-bold text-gray-900">M</p>
                    </div>
                    {/* Estimated Date of Birth */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">ESTIMATED DATE OF BIRTH</p>
                      <p className="text-lg font-bold text-[#009ca6]">1945-06-24</p>
                    </div>
                    {/* Estimated Age */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">ESTIMATED AGE</p>
                      <p className="text-lg font-bold text-gray-900">80 years 279 days</p>
                    </div>
                  </div>
                </div>

                {/* Find matching names link */}
                <div className="mt-2">
                  <a href="#" className="text-[#009ca6] underline text-sm hover:text-[#008581]">
                    Find matching names
                  </a>
                </div>
              </div>

              {/* Bottom cards row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* SFC Trust Rating */}
                <div className="border border-gray-200 rounded-xl p-4 lg:p-6">
                  <h2 className="text-[#008581] font-semibold text-lg mb-5">
                    SFC Trust Rating
                  </h2>
                  <div className="flex gap-4">
                    <div className="flex-1 border border-gray-200 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">USERS</p>
                      <p className="text-3xl font-bold text-gray-900">0</p>
                    </div>
                    <div className="flex-1 border border-gray-200 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">AVERAGE (0-5)</p>
                      <p className="text-3xl font-bold text-gray-400">N/A</p>
                    </div>
                  </div>
                </div>

                {/* Relatives */}
                <div className="border border-gray-200 rounded-xl p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-[#008581] font-semibold text-lg">Relatives</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">GENERATIONS</span>
                      <select className="text-xs border border-gray-300 rounded px-2 py-1 text-gray-600">
                        <option></option>
                      </select>
                    </div>
                  </div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    NON-LINEAL RELATIVES
                  </h3>
                  <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-400" />
                      </div>
                      <a href="#" className="text-[#009ca6] underline text-sm hover:text-[#008581]">
                        Har, Lisa Suk Ping (-)
                      </a>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      SPOUSE
                    </span>
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
