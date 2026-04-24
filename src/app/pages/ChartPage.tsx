import { useState, useEffect, useRef } from "react";
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
  { label: "Key Data", highlight: true },
  { label: "Prices" },
  { label: "CCASS" },
  { label: "Buybacks" },
  {
    label: "Short",
    children: [
      { label: "All reported stocks", active: true },
      { label: "Notes" },
    ],
  },
  { label: "Total Return" },
  { label: "Compare Return" },
  { label: "Events" },
  { label: "Dealings" },
  { label: "Outstanding" },
  { label: "Quote" },
  { label: "Officers" },
  { label: "Advisers" },
  { label: "Complain" },
  { label: "Pay" },
  { label: "Financials" },
  { label: "Overlaps" },
  { label: "Ess" },
];

function SidebarItem({ node, depth = 0 }: { node: NavNode; depth?: number }) {
  const [open, setOpen] = useState(depth < 2 || node.label === "Short");
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

// ──────────────── HIGHCHARTS ────────────────

function ShortPositionsChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chart: any;

    const initChart = async () => {
      const Highcharts = (await import("highcharts/highstock")).default;

      // Generate mock data matching the chart shape
      const startDate = new Date("2020-03-16").getTime();
      const endDate = new Date("2022-12-15").getTime();
      const points = 150;
      const step = (endDate - startDate) / points;

      const lineData: [number, number][] = [];
      const barData: [number, number][] = [];

      for (let i = 0; i <= points; i++) {
        const t = startDate + i * step;
        // Simulate the curve shape from the screenshot
        const x = i / points;
        let y: number;
        if (x < 0.7) {
          y = 0.3 + Math.sin(x * 8) * 0.15 + Math.random() * 0.05;
        } else if (x < 0.85) {
          y = 0.3 + (x - 0.7) * 8 + Math.sin(x * 12) * 0.1;
        } else {
          y = 1.5 - (x - 0.85) * 4 + Math.random() * 0.1;
        }
        lineData.push([t, Math.max(0, Number(y.toFixed(2)))]);
        barData.push([t, Math.max(0, Number((y * 80 + Math.random() * 20).toFixed(0)))]);
      }

      const el = chartRef.current;
      if (!el) return;
      // @ts-ignore
      chart = Highcharts.stockChart(el, {
        chart: {
          backgroundColor: "#ffffff",
          style: { fontFamily: "Arial, sans-serif" },
        },
        rangeSelector: {
          enabled: true,
          buttons: [
            { type: "month", count: 6, text: "6m" },
            { type: "ytd", text: "YTD" },
            { type: "year", count: 1, text: "1y" },
            { type: "year", count: 3, text: "3y" },
            { type: "year", count: 5, text: "5y" },
            { type: "year", count: 10, text: "10y" },
            { type: "all", text: "All" },
          ],
          buttonTheme: {
            fill: "none",
            stroke: "none",
            style: { color: "#333", fontSize: "12px" },
            states: {
              hover: { fill: "#e6e6e6" },
              select: { fill: "#e6e6e6", style: { color: "#000", fontWeight: "bold" } },
            },
          },
          inputEnabled: false,
          labelStyle: { display: "none" },
        },
        title: {
          text: "Weekly short positions in ORIENT OVERSEAS (INTERNATIONAL) LIMITED: 0 HKD",
          style: { fontSize: "14px", fontWeight: "bold", color: "#333" },
          align: "center",
        },
        navigator: {
          enabled: true,
          height: 40,
          maskFill: "rgba(0, 126, 206, 0.15)",
          series: {
            type: "line",
            color: "#007ece",
            lineWidth: 1,
          },
          xAxis: {
            labels: { style: { fontSize: "10px", color: "#666" } },
          },
        },
        scrollbar: { enabled: false },
        xAxis: {
          type: "datetime",
          labels: {
            style: { fontSize: "11px", color: "#666" },
            formatter: function () {
              const d = new Date(this.value as number);
              const m = d.toLocaleString("en", { month: "short" });
              const y = d.getFullYear().toString().slice(-2);
              return `${m} '${y}`;
            },
          },
          crosshair: true,
        },
        yAxis: [
          {
            // Left axis - % of market cap
            labels: {
              align: "right",
              x: -4,
              style: { fontSize: "11px", color: "#666" },
              formatter: function () {
                return (this.value as number).toFixed(1) + "%";
              },
            },
            opposite: false,
            height: "65%",
            lineWidth: 0,
            gridLineWidth: 1,
            gridLineColor: "#e5e5e5",
            title: { text: null },
          },
          {
            // Right axis - Short positions HK$m
            labels: {
              align: "left",
              x: 4,
              style: { fontSize: "11px", color: "#666" },
            },
            opposite: true,
            height: "65%",
            lineWidth: 0,
            gridLineWidth: 0,
            title: {
              text: "Short positions<br/>HK$m",
              rotation: 270,
              style: { fontSize: "11px", color: "#666" },
            },
          },
          {
            // Bottom axis for columns
            labels: { enabled: false },
            height: "65%",
            lineWidth: 0,
            gridLineWidth: 0,
          },
        ],
        tooltip: {
          shared: true,
          backgroundColor: "rgba(255,255,255,0.95)",
          borderColor: "#ccc",
          borderRadius: 4,
          style: { fontSize: "12px" },
        },
        plotOptions: {
          line: {
            lineWidth: 2,
            marker: { enabled: false },
            states: { hover: { lineWidth: 2 } },
          },
          column: {
            borderWidth: 0,
            pointPadding: 0.05,
            groupPadding: 0,
          },
        },
        series: [
          {
            type: "line",
            name: "% of market cap",
            data: lineData,
            color: "#4db8e8",
            yAxis: 0,
            tooltip: {
              valueDecimals: 2,
              valueSuffix: "%",
            },
          } as any,
          {
            type: "column",
            name: "Short positions HK$m",
            data: barData,
            color: "rgba(180, 180, 180, 0.5)",
            yAxis: 2,
            tooltip: {
              valueDecimals: 0,
              valueSuffix: " HK$m",
            },
          } as any,
        ],
        credits: {
          enabled: true,
          text: "Highcharts.com",
          href: "https://www.highcharts.com",
          position: { align: "left", x: 10, y: -5 },
          style: { fontSize: "11px", color: "#666" },
        },
        legend: { enabled: false },
      });
    };

    initChart();

    return () => {
      if (chart) chart.destroy();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", height: "480px" }}
    />
  );
}

// ──────────────── MAIN PAGE ────────────────

export default function ChartPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [stockCode, setStockCode] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        showSearch
        searchValue={searchText}
        onSearchChange={setSearchText}
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
                {sidebarTree.map((node) => (
                  <div key={node.label} className="px-4 py-2.5 text-sm rounded-lg text-gray-600">
                    {node.label}
                  </div>
                ))}
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

                {/* Listings table */}
                <div className="mb-5 overflow-x-auto">
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
                        <td className="py-3 px-3 text-gray-700 border-r border-gray-100">HK-Main</td>
                        <td className="py-3 px-3 text-gray-700 border-r border-gray-100">00001</td>
                        <td className="py-3 px-3 text-gray-700 border-r border-gray-100">1972-11-01</td>
                        <td className="py-3 px-3 text-gray-400 border-r border-gray-100">–</td>
                        <td className="py-3 px-3 text-[#009ca6] underline cursor-pointer">Docs</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Stock code input */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-sm text-gray-700">Stock code:</span>
                  <input
                    type="text"
                    value={stockCode}
                    onChange={(e) => setStockCode(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 text-sm w-32 outline-none focus:border-[#008581]"
                  />
                  <button className="bg-[#008581] text-white text-sm font-semibold px-5 py-1.5 rounded hover:bg-[#006b6a] transition-colors">
                    Go
                  </button>
                </div>

                {/* Short positions heading */}
                <h2
                  className="text-gray-900 mb-4"
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "clamp(18px, 2.5vw, 24px)",
                    fontWeight: "bold",
                  }}
                >
                  Short positions
                </h2>

                {/* Chart */}
                <div className="border border-gray-200 rounded-lg p-2 lg:p-3">
                  <ShortPositionsChart />
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
