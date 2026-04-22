import svgPaths from "../../imports/svg-eeujv9dou2";

interface SFCLogoProps {
  width?: number;
  className?: string;
}

export function SFCLogo({ width = 160, className = "" }: SFCLogoProps) {
  const NATURAL_W = 159.581;
  const NATURAL_H = 82;
  const scale = width / NATURAL_W;

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: NATURAL_W * scale, height: NATURAL_H * scale, overflow: "visible" }}
    >
      <div style={{ transformOrigin: "top left", transform: `scale(${scale})`, width: NATURAL_W, height: NATURAL_H, position: "absolute", top: 0, left: 0, overflow: "visible" }}>
        {/* Bird wing (ClipPathGroup) */}
        <div style={{ position: "absolute", top: 0, left: 0, width: 108.801, height: 66.969 }}>
          <svg width="108.801" height="66.969" viewBox="0 0 108.801 66.969" fill="none">
            <mask id="sfcBirdMask" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="109" height="67" x="0" y="0">
              <path d={svgPaths.p14e97a80} fill="white" />
            </mask>
            <g mask="url(#sfcBirdMask)">
              <path d={svgPaths.p3195b980} fill="url(#sfcBirdGradient)" />
            </g>
            <defs>
              <radialGradient id="sfcBirdGradient" cx="0" cy="0" r="1"
                gradientTransform="matrix(113.324 18.4848 7.98133 -34.5821 60.691 57.018)"
                gradientUnits="userSpaceOnUse">
                <stop stopColor="#008581" />
                <stop offset="0.00050354" stopColor="#008581" />
                <stop offset="0.1726" stopColor="#098984" />
                <stop offset="0.4589" stopColor="#23928E" />
                <stop offset="0.8219" stopColor="#4CA19D" />
                <stop offset="1" stopColor="#63A9A5" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* S */}
        <div style={{ position: "absolute", left: 103.33, top: 43.8, width: 15.331, height: 17.189 }}>
          <svg viewBox="0 0 15.3308 17.189" width="15.331" height="17.189" fill="none">
            <path d={svgPaths.p21313700} fill="#385C7F" />
          </svg>
        </div>
        {/* F */}
        <div style={{ position: "absolute", left: 123.86, top: 44.14, width: 14.483, height: 16.593 }}>
          <svg viewBox="0 0 14.4833 16.5935" width="14.483" height="16.593" fill="none">
            <path d={svgPaths.p34ce4a00} fill="#385C7F" />
          </svg>
        </div>
        {/* C */}
        <div style={{ position: "absolute", left: 142.22, top: 43.87, width: 15.905, height: 17.228 }}>
          <svg viewBox="0 0 15.9049 17.2278" width="15.905" height="17.228" fill="none">
            <path d={svgPaths.pe318a80} fill="#385C7F" />
          </svg>
        </div>
        {/* 証 top */}
        <div style={{ position: "absolute", left: 102.84, top: 66.56, width: 5.829, height: 3.155 }}>
          <svg viewBox="0 0 5.82864 3.15536" width="5.829" height="3.155" fill="none">
            <path d={svgPaths.pb0b6c80} fill="#385C7F" />
          </svg>
        </div>
        <div style={{ position: "absolute", left: 109.11, top: 67, width: 11.127, height: 6.496 }}>
          <svg viewBox="0 0 11.1274 6.49632" width="11.127" height="6.496" fill="none">
            <path d={svgPaths.p33336300} fill="#385C7F" />
          </svg>
        </div>
        <div style={{ position: "absolute", left: 109.42, top: 77.88, width: 10.377, height: 3.007 }}>
          <svg viewBox="0 0 10.3768 3.00687" width="10.377" height="3.007" fill="none">
            <path d={svgPaths.p10814200} fill="#385C7F" />
          </svg>
        </div>
        <div style={{ position: "absolute", left: 110.39, top: 73.35, width: 8.257, height: 4.009 }}>
          <svg viewBox="0 0 8.25724 4.00915" width="8.257" height="4.009" fill="none">
            <path d={svgPaths.p130df3f2} fill="#385C7F" />
          </svg>
        </div>
        {/* rotated stroke */}
        <div style={{ position: "absolute", left: 103.33, top: 73.39, width: 5.169, height: 1.345, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: "rotate(-89.87deg) skewX(0.04deg)" }}>
            <svg viewBox="0 0 1.33639 5.1663" width="1.336" height="5.166" fill="none">
              <path d={svgPaths.p1bb57880} fill="#385C7F" />
            </svg>
          </div>
        </div>
        <div style={{ position: "absolute", left: 103.19, top: 75.95, width: 5.431, height: 4.937 }}>
          <svg viewBox="0 0 5.43125 4.9372" width="5.431" height="4.937" fill="none">
            <path d={svgPaths.p541bc00} fill="#385C7F" />
          </svg>
        </div>
        {/* rotated stroke 2 */}
        <div style={{ position: "absolute", left: 103.34, top: 70.91, width: 5.169, height: 1.345, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: "rotate(-89.87deg) skewX(0.04deg)" }}>
            <svg viewBox="0 0 1.33639 5.16629" width="1.336" height="5.166" fill="none">
              <path d={svgPaths.pe134440} fill="#385C7F" />
            </svg>
          </div>
        </div>
        {/* 監 chars */}
        <div style={{ position: "absolute", left: 123.82, top: 66.93, width: 8.081, height: 8.352 }}>
          <svg viewBox="0 0 8.08062 8.35241" width="8.081" height="8.352" fill="none">
            <path d={svgPaths.p1a9a7380} fill="#385C7F" />
          </svg>
        </div>
        <div style={{ position: "absolute", left: 131.9, top: 66.56, width: 7.727, height: 6.793 }}>
          <svg viewBox="0 0 7.72738 6.7933" width="7.727" height="6.793" fill="none">
            <path d={svgPaths.pccd100} fill="#385C7F" />
          </svg>
        </div>
        <div style={{ position: "absolute", left: 123.11, top: 75.99, width: 16.603, height: 4.937 }}>
          <svg viewBox="0 0 16.6028 4.93721" width="16.603" height="4.937" fill="none">
            <path d={svgPaths.p38f7fb00} fill="#385C7F" />
          </svg>
        </div>
        <div style={{ position: "absolute", left: 135.03, top: 71.46, width: 4.504, height: 3.192 }}>
          <svg viewBox="0 0 4.50396 3.19248" width="4.504" height="3.192" fill="none">
            <path d={svgPaths.p26661e80} fill="#385C7F" />
          </svg>
        </div>
        {/* 會 chars */}
        <div style={{ position: "absolute", left: 144.66, top: 75.69, width: 12.673, height: 5.308 }}>
          <svg viewBox="0 0 12.6729 5.30842" width="12.673" height="5.308" fill="none">
            <path d={svgPaths.p362b05c0} fill="#385C7F" />
          </svg>
        </div>
        <div style={{ position: "absolute", left: 142.54, top: 66.37, width: 17.044, height: 8.649 }}>
          <svg viewBox="0 0 17.0444 8.64939" width="17.044" height="8.649" fill="none">
            <path d={svgPaths.p21199a00} fill="#385C7F" />
          </svg>
        </div>
      </div>
    </div>
  );
}
