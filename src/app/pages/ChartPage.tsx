import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import imgHero from "../../assets/4095f7088a770ad2fc6a4abd1dbaf4eb80413283.png";

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
  { label: "Listing Team" },
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

// ──────────────── CANDLESTICK CHART WITH CROSSHAIR & TOOLTIP ────────────────

interface CandleData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  date: string;
  price: string;
  volume: string;
}

function CandlestickChartWithTooltip({ data }: { data: CandleData[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    date: "",
    price: "",
    volume: "",
  });
  const [crosshair, setCrosshair] = useState({ x: -1, y: -1 });

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const padding = { top: 40, right: 40, bottom: 40, left: 60 };
    const chartWidth = canvas.width - padding.left - padding.right;
    const chartHeight = canvas.height - padding.top - padding.bottom;

    // Calculate price range
    const prices = data.flatMap((d) => [d.high, d.low]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;
    const padding_price = priceRange * 0.1;

    const scaleY = (price: number) => {
      const normalized = (price - minPrice + padding_price) / (priceRange + padding_price * 2);
      return padding.top + chartHeight - normalized * chartHeight;
    };

    const scaleX = (idx: number) => padding.left + (idx / (data.length - 1)) * chartWidth;

    // Draw background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = "#e5e5e5";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (i / 4) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(canvas.width - padding.right, y);
      ctx.stroke();
    }

    // Draw Y-axis labels
    ctx.fillStyle = "#666";
    ctx.font = "11px Arial";
    ctx.textAlign = "right";
    for (let i = 0; i <= 4; i++) {
      const price = minPrice + (priceRange * i) / 4;
      const y = padding.top + chartHeight - (i / 4) * chartHeight;
      ctx.fillText(price.toFixed(2), padding.left - 10, y + 4);
    }

    // Draw candlesticks
    const candleWidth = Math.max(1, chartWidth / (data.length * 1.5));
    data.forEach((candle, idx) => {
      const x = scaleX(idx);
      const openY = scaleY(candle.open);
      const closeY = scaleY(candle.close);
      const highY = scaleY(candle.high);
      const lowY = scaleY(candle.low);
      const isUp = candle.close >= candle.open;

      // Draw wick
      ctx.strokeStyle = isUp ? "#26a69a" : "#ef5350";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();

      // Draw body
      ctx.fillStyle = isUp ? "#26a69a" : "#ef5350";
      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.abs(closeY - openY) || 1;
      ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
    });

    // Draw axes
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, canvas.height - padding.bottom);
    ctx.lineTo(canvas.width - padding.right, canvas.height - padding.bottom);
    ctx.stroke();

    // Draw X-axis labels
    ctx.fillStyle = "#666";
    ctx.font = "11px Arial";
    ctx.textAlign = "center";
    const step = Math.max(1, Math.floor(data.length / 5));
    data.forEach((candle, idx) => {
      if (idx % step === 0) {
        const x = scaleX(idx);
        ctx.fillText(candle.date, x, canvas.height - padding.bottom + 20);
      }
    });

    // Draw title
    ctx.fillStyle = "#333";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("CK Hutchison Holdings Limited - Price Chart (HKD)", canvas.width / 2, 25);

    // Draw crosshair if visible
    if (crosshair.x >= 0 && crosshair.y >= 0) {
      ctx.strokeStyle = "#999999";
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);

      // Vertical line
      ctx.beginPath();
      ctx.moveTo(crosshair.x, padding.top);
      ctx.lineTo(crosshair.x, canvas.height - padding.bottom);
      ctx.stroke();

      // Horizontal line
      ctx.beginPath();
      ctx.moveTo(padding.left, crosshair.y);
      ctx.lineTo(canvas.width - padding.right, crosshair.y);
      ctx.stroke();

      ctx.setLineDash([]);
    }
  }, [data, crosshair]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const padding = { top: 40, right: 40, bottom: 40, left: 60 };
    const chartWidth = canvas.width - padding.left - padding.right;

    // Find nearest candlestick
    if (mouseX >= padding.left && mouseX <= canvas.width - padding.right && mouseY >= padding.top && mouseY <= canvas.height - padding.bottom) {
      const relX = mouseX - padding.left;
      const idx = Math.round((relX / chartWidth) * (data.length - 1));
      
      if (idx >= 0 && idx < data.length) {
        const candle = data[idx];
        
        // Calculate price from Y coordinate
        const prices = data.flatMap((d) => [d.high, d.low]);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const priceRange = maxPrice - minPrice || 1;
        const padding_price = priceRange * 0.1;
        const chartHeight = canvas.height - padding.top - padding.bottom;

        const price = maxPrice - ((mouseY - padding.top) / chartHeight) * (priceRange + padding_price * 2) + padding_price;

        setTooltip({
          visible: true,
          x: mouseX,
          y: mouseY,
          date: candle.date,
          price: price.toFixed(2),
          volume: (candle.volume / 1000000).toFixed(2),
        });

        setCrosshair({ x: mouseX, y: mouseY });
      }
    }
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
    setCrosshair({ x: -1, y: -1 });
  };

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative" }}>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ display: "block", width: "100%", height: "100%", cursor: "crosshair" }}
      />
      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            left: `${tooltip.x + 10}px`,
            top: `${tooltip.y + 10}px`,
            background: "#1f2937",
            color: "#ffffff",
            padding: "8px 12px",
            borderRadius: "4px",
            fontSize: "11px",
            pointerEvents: "none",
            zIndex: 1000,
            whiteSpace: "nowrap",
          }}
        >
          <div><strong>{tooltip.date}</strong></div>
          <div>Price: {tooltip.price} HKD</div>
          <div>Volume: {tooltip.volume}M</div>
        </div>
      )}
    </div>
  );
}

// ──────────────── RECHARTS WITH RANGE BUTTONS ────────────────

function ShortPositionsChart() {
  const [allChartData, setAllChartData] = useState<any[]>([]);
  const [displayedChartData, setDisplayedChartData] = useState<any[]>([]);
  const [selectedRange, setSelectedRange] = useState<string>("all");
  const [zoomRange, setZoomRange] = useState<[number, number]>([0, 100]);

  // Generate realistic OHLC data for candlestick chart - CK Hutchison Holdings (Stock Code: 1)
  const generateChartData = () => {
    const startDate = new Date("2020-03-16");
    const endDate = new Date("2024-12-31");
    const points = 100;  // Reduced for weekly candles
    const step = (endDate.getTime() - startDate.getTime()) / points;

    const data = [];
    let basePrice = 50; // Starting price in HKD for CK Hutchison
    
    for (let i = 0; i <= points; i++) {
      const t = new Date(startDate.getTime() + i * step);
      const x = i / points;
      
      // Generate realistic price movement patterns
      let volatility: number;
      let trend: number = 0;
      
      if (x < 0.3) {
        // 2020: Early pandemic volatility
        volatility = 4;
        trend = -0.5 + Math.sin(x * 15) * 2;
      } else if (x < 0.6) {
        // 2021-2022: Recovery period
        volatility = 3;
        trend = 1 + Math.cos(x * 10) * 0.5;
      } else if (x < 0.85) {
        // 2023: Market adjustment
        volatility = 2.5;
        trend = 0.3 + Math.sin(x * 8) * 0.8;
      } else {
        // 2024: Recent trends
        volatility = 2;
        trend = 0.5 + Math.sin(x * 12) * 0.6;
      }
      
      // Update base price
      basePrice += trend + (Math.random() - 0.5) * 0.5;
      
      // Generate OHLC data
      const open = Number(basePrice.toFixed(2));
      const close = Number((basePrice + (Math.random() - 0.5) * volatility).toFixed(2));
      const high = Number(Math.max(open, close) + Math.random() * volatility);
      const low = Number(Math.min(open, close) - Math.random() * volatility);
      const volume = Math.floor(1000000 + Math.random() * 5000000);
      
      data.push({
        date: t.toISOString().split("T")[0],
        open: Number(Math.max(1, open).toFixed(2)),
        high: Number(Math.max(1, high).toFixed(2)),
        low: Number(Math.max(1, low).toFixed(2)),
        close: Number(Math.max(1, close).toFixed(2)),
        volume: volume,
      });
    }
    return data;
  };

  // Filter data based on selected range
  const filterDataByRange = (data: any[], range: string) => {
    const now = new Date("2024-12-31");
    let startDate = new Date();

    switch (range) {
      case "6m":
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
        break;
      case "ytd":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case "1y":
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      case "3y":
        startDate = new Date(now.getFullYear() - 3, now.getMonth(), now.getDate());
        break;
      case "5y":
        startDate = new Date(now.getFullYear() - 5, now.getMonth(), now.getDate());
        break;
      case "10y":
        startDate = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate());
        break;
      case "all":
      default:
        return data;
    }

    return data.filter((item) => new Date(item.date) >= startDate);
  };

  // Apply zoom range to filter the chart display data
  const applyZoomRange = (data: any[], minPercent: number, maxPercent: number) => {
    if (minPercent === 0 && maxPercent === 100) {
      return data;
    }
    
    const startIndex = Math.floor((data.length - 1) * (minPercent / 100));
    const endIndex = Math.ceil((data.length - 1) * (maxPercent / 100));
    
    return data.slice(startIndex, endIndex + 1);
  };

  useEffect(() => {
    const generated = generateChartData();
    const filtered = filterDataByRange(generated, selectedRange);
    setAllChartData(filtered);
    
    // Apply zoom range to the filtered data
    const zoomed = applyZoomRange(filtered, zoomRange[0], zoomRange[1]);
    setDisplayedChartData(zoomed);
  }, [selectedRange, zoomRange]);

  const rangeButtons = [
    { label: "6m", value: "6m" },
    { label: "YTD", value: "ytd" },
    { label: "1y", value: "1y" },
    { label: "3y", value: "3y" },
    { label: "5y", value: "5y" },
    { label: "10y", value: "10y" },
    { label: "All", value: "all" },
  ];

  return (
    <div>
      {/* Stock Information */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          CK Hutchison Holdings Limited (長江和記實業有限公司)
        </h3>
        <p className="text-sm text-gray-600">
          Stock Code: 1 | Hong Kong Stock Exchange (HKEX) | Short Positions Tracking
        </p>
      </div>

      {/* Chart Container - Custom Candlestick with Crosshair and Tooltip */}
      <div style={{ height: "480px", width: "100%", marginBottom: "20px", background: "#fff", borderRadius: "4px", position: "relative", overflow: "hidden" }}>
        {displayedChartData.length > 0 && (
          <CandlestickChartWithTooltip data={displayedChartData} />
        )}
      </div>

      {/* Navigator Toolbar - Range Slider */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        <div 
          role="toolbar" 
          aria-orientation="vertical" 
          className="flex items-center gap-2 h-10 bg-gray-50 rounded p-2"
          aria-label="Navigator"
        >
          {/* Range visualization bar */}
          <div className="flex-1 relative h-6 bg-gray-200 rounded border border-gray-300 flex items-center overflow-hidden">
            {/* Selected range indicator */}
            <div 
              className="absolute h-full bg-blue-100 border-l-2 border-r-2 border-blue-400"
              style={{
                left: `${zoomRange[0]}%`,
                right: `${100 - zoomRange[1]}%`,
              }}
            />
            
            {/* Left slider */}
            <input 
              type="range" 
              role="presentation"
              aria-label="Minimum"
              tabIndex={0}
              step="0.1"
              min="0"
              max="100"
              value={zoomRange[0]}
              onChange={(e) => {
                const newMin = Math.min(parseFloat(e.target.value), zoomRange[1]);
                setZoomRange([newMin, zoomRange[1]]);
              }}
              className="absolute w-full h-full opacity-0 cursor-ew-resize z-5"
              style={{ pointerEvents: 'auto' }}
            />
            
            {/* Right slider */}
            <input 
              type="range" 
              role="presentation"
              aria-label="Maximum"
              tabIndex={-1}
              step="0.1"
              min="0"
              max="100"
              value={zoomRange[1]}
              onChange={(e) => {
                const newMax = Math.max(parseFloat(e.target.value), zoomRange[0]);
                setZoomRange([zoomRange[0], newMax]);
              }}
              className="absolute w-full h-full opacity-0 cursor-ew-resize z-5"
              style={{ pointerEvents: 'auto' }}
            />

            {/* Left handle */}
            <div 
              className="absolute top-1/2 w-3 h-5 bg-gray-300 border border-gray-400 rounded-sm cursor-ew-resize shadow-sm hover:bg-gray-400 transition-colors"
              style={{
                left: `${zoomRange[0]}%`,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            />

            {/* Right handle */}
            <div 
              className="absolute top-1/2 w-3 h-5 bg-gray-300 border border-gray-400 rounded-sm cursor-ew-resize shadow-sm hover:bg-gray-400 transition-colors"
              style={{
                left: `${zoomRange[1]}%`,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Percentage labels */}
          <div className="text-xs text-gray-600 font-semibold min-w-[60px] text-right">
            {Math.round(zoomRange[1] - zoomRange[0])}%
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2 ml-2">
          Drag the handles to zoom into a specific date range
        </p>
      </div>

      {/* Range Buttons - Positioned BELOW Navigator */}
      <div className="flex flex-wrap gap-2 justify-center py-4 border-t border-gray-200">
        {rangeButtons.map((btn) => (
          <button
            key={btn.value}
            onClick={() => setSelectedRange(btn.value)}
            className={`px-4 py-2 text-sm font-semibold rounded transition-colors ${
              selectedRange === btn.value
                ? "bg-[#009ca6] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
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
          <aside className="hidden lg:block lg:sticky lg:top-[130px] lg:w-52 lg:shrink-0 bg-white rounded-xl p-4 h-fit">
            <div className="space-y-2">
              <div className="flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors px-2 rounded-lg text-[#008581] font-semibold bg-cyan-100" style={{ paddingLeft: '8px' }}>
                <span className="text-sm text-[#009ca6]">Key Data</span>
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
               <div className="flex items-center justify-between py-1.5 cursor-pointer hover:text-[#008581] transition-colors text-gray-600" style={{ paddingLeft: '8px' }}>
                 <span className="text-sm">CCASS</span>
               </div>
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
                  <a href="/pages/CCASS" className="underline hover:text-[#008581]">{node.label}</a>
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
                        {["EXCHANGE", "CODE", "LISTED", "LAST TRADE", "DELISTED", ""].map((col) => (
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
                        <td className="py-3 px-3 text-gray-400 border-r border-gray-100">–</td>                        
                        <td className="py-3 px-3 text-[#009ca6] underline cursor-pointer"><button className="mx-2 mt-1 mb-1 px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors">Docs</button></td>
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
