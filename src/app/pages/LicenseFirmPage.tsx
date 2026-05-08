import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import imgHero from "figma:asset/4095f7088a770ad2fc6a4abd1dbaf4eb80413283.png";

interface NavNode {
  label: string;
  active?: boolean;
}

const sidebarTree: NavNode[] = [
  { label: "Key Data" },
  { label: "Officers" },
  { label: "Overlaps" },
  { label: "SFC Licenses", active: true },
  { label: "Listing" },
  { label: "SFC Web" },
];

export default function LicenseFirmPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<"Current" | "History">("Current");

  // Screenshot content: SFC/SEC licenses listing table.
  const firmRows = useMemo(
    () =>
      [
        {
          cOrR: "C",
          activity: "Advising on futures contracts",
          from: "2004-09-10",
          until: "",
        },
        {
          cOrR: "C",
          activity: "Asset management",
          from: "2004-09-10",
          until: "",
        },
        {
          cOrR: "C",
          activity: "Dealing in futures contracts",
          from: "2004-09-10",
          until: "",
        },
      ],
    []
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header showSearch={false} />

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
            <aside className="hidden lg:block lg:sticky lg:top-[130px] lg:w-52 lg:shrink-0 bg-white rounded-xl p-4 h-fit shadow-sm">
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

            {sidebarOpen && (
              <div
                className="lg:hidden fixed inset-0 bg-black/40 z-40"
                onClick={() => setSidebarOpen(false)}
                style={{ animation: "fadeIn 0.3s ease-out forwards" }}
              />
            )}

            {/* Sidebar - Bottom Sheet (Mobile Only) */}
            <aside
              className={`lg:hidden fixed left-5 right-5 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl overflow-hidden max-h-[70vh]`}
              style={{
                transform: sidebarOpen ? "translateY(0)" : "translateY(100%)",
                transition:
                  "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
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
                {/* Badge */}
                <div className="mb-3">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded border"
                    style={{
                      background: "#e0f2f1",
                      color: "#008581",
                      border: "1px solid #008581",
                    }}
                  >
                    License Firm
                  </span>
                </div>

                {/* Title */}
                <h1
                  className="text-gray-900 mb-2"
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "clamp(18px, 3vw, 26px)",
                    fontWeight: "bold",
                  }}
                >
                  HSBC BROKING FUTURES (HONG KONG) LTD 滙豐金融期貨(香港)有限公司
                </h1>

                <div className="mt-4">
                  <div className="flex items-center gap-4 text-sm text-gray-700 mb-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={sidebarTab === "Current"}
                        onChange={() => setSidebarTab("Current")}
                      />
                      Current
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={sidebarTab === "History"}
                        onChange={() => setSidebarTab("History")}
                      />
                      History
                    </label>
                  </div>

                  <h2 className="text-sm font-semibold">SFC licenses</h2>
                  <p className="text-xs text-gray-600 leading-relaxed mt-1">
                    C/licensed corporation (regulated by SFC). R=Registered Institution (regulated by HKMA). If there is no starting date then the entity has been in that activity since at least 1-Apr-2003 when the current register began.
                  </p>

                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200">
                      <thead>
                        <tr className="bg-gray-50">
                          {[
                            "C/R",
                            "Activity",
                            "From",
                            "Until",
                          ].map((col) => (
                            <th
                              key={col}
                              className="text-left py-2 px-3 text-xs text-gray-500 font-semibold border-b border-gray-200"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {firmRows.map((r, idx) => (
                          <tr key={idx}>
                            <td className="py-2 px-3 border-b border-gray-100">
                              {r.cOrR}
                            </td>
                            <td className="py-2 px-3 border-b border-gray-100">
                              {r.activity}
                            </td>
                            <td className="py-2 px-3 border-b border-gray-100">
                              {r.from}
                            </td>
                            <td className="py-2 px-3 border-b border-gray-100">
                              {r.until || ""}
                            </td>
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

      <Footer />
    </div>
  );
}
