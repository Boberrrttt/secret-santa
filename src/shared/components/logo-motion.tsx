"use client";

import { useEffect, useRef } from "react";

// Ported from adonph-logo-motion.html (minus the glow, replay button and render mode).
// ponytail: fixed SVG ids, so only one instance per page
const ease = "cubic-bezier(.22,1,.36,1)";
const back = "cubic-bezier(.34,1.56,.64,1)";
const handsetPath =
  "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z";
const playPath = "M4 13 Q4 1 15 7 L52 33 Q60 40 52 47 L15 73 Q4 79 4 67 Z";

const stroke = { fill: "none", stroke: "#fff", strokeWidth: 8, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const fillBox = { transformBox: "fill-box", transformOrigin: "center" } as const;
const word = { fill: "#fff", fontFamily: "var(--font-inter), Inter, Arial, sans-serif", fontWeight: 900 } as const;

export function LogoMotion({ className }: { className?: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const play = useRef<() => void>(() => {});

  useEffect(() => {
    const root = svg.current;
    if (!root || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const $ = (id: string) => root.querySelector<SVGElement>(`#lm-${id}`)!;
    const draws = root.querySelectorAll<SVGElement>(".lm-draw");
    const drawIn = [
      { strokeDasharray: "1 1", strokeDashoffset: 1 },
      { strokeDasharray: "1 1", strokeDashoffset: 0 },
    ];
    const anims: Animation[] = [];
    const A = (el: Element, kf: Keyframe[], delay: number, duration: number, easing = ease, fill: FillMode = "both") =>
      anims.push(el.animate(kf, { delay, duration, easing, fill }));

    A(draws[0], drawIn, 200, 800);
    A($("play"), [{ transform: "scale(.6)", opacity: 0 }, { transform: "scale(1)", opacity: 1 }], 200, 700, back);
    A($("play"), [{ transform: "scale(1)" }, { transform: "scale(.86)" }, { transform: "scale(1)" }], 1050, 450);
    A($("playRing"), [{ transform: "scale(.6)", opacity: 0.9 }, { transform: "scale(1.5)", opacity: 0 }], 1150, 700, ease, "forwards");

    A(draws[1], drawIn, 750, 800);
    A($("mobile"), [{ transform: "translateY(14px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }], 750, 700);
    A($("dot"), [{ transform: "scale(0)" }, { transform: "scale(1)" }], 1450, 450, back);
    A($("screen"), [{ opacity: 0 }, { opacity: 0.55 }, { opacity: 0 }], 1550, 600, "ease-out");

    A(draws[2], drawIn, 1300, 800);
    A($("handset"), [{ opacity: 0, transform: "rotate(-25deg) scale(.8)" }, { opacity: 1, transform: "rotate(0) scale(1)" }], 1300, 750, back);
    A($("handset"), ["0", "-9deg", "8deg", "-7deg", "6deg", "-3deg", "0"].map((r) => ({ transform: `rotate(${r})` })), 2100, 650, "ease-in-out");
    A($("ring1"), [{ transform: "scale(.7)", opacity: 0.8 }, { transform: "scale(1.45)", opacity: 0 }], 2100, 800, ease, "forwards");
    A($("ring2"), [{ transform: "scale(.7)", opacity: 0.8 }, { transform: "scale(1.45)", opacity: 0 }], 2400, 800, ease, "forwards");

    A($("ad"), [{ transform: "translateY(30px)" }, { transform: "translateY(0)" }], 2600, 650);
    A($("onph"), [{ transform: "translateY(26px)" }, { transform: "translateY(0)" }], 2800, 650);
    A($("wipeTxtr"), [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], 2800, 800);
    A($("tm"), [{ opacity: 0 }, { opacity: 1 }], 3500, 400, "ease-out");
    A($("shine"), [{ transform: "skewX(-20deg) translateX(0)" }, { transform: "skewX(-20deg) translateX(420px)" }], 3800, 1000, "ease-in-out");

    play.current = () => anims.forEach((a) => { a.currentTime = 0; a.play(); });
    return () => anims.forEach((a) => a.cancel());
  }, []);

  return (
    <svg ref={svg} viewBox="-4 -4 210 118" className={className} overflow="visible" role="img" aria-label="ADONPH Inc." onMouseEnter={() => play.current()}>
      <defs>
        <linearGradient id="lm-shineG" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#9fc0ff" stopOpacity="0" />
          <stop offset=".5" stopColor="#cfe0ff" stopOpacity="1" />
          <stop offset="1" stopColor="#9fc0ff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="lm-wipeAD"><rect x="-2" y="82" width="54" height="30" /></clipPath>
        <clipPath id="lm-wipeTxt">
          <rect id="lm-wipeTxtr" x="54" y="86" width="152" height="26" style={{ transformBox: "fill-box", transformOrigin: "left center" }} />
        </clipPath>
        <g id="lm-art">
          <path {...stroke} d={playPath} />
          <rect {...stroke} x="69" y="4" width="42" height="73" rx="11" />
          <circle cx="90" cy="64.5" r="4.6" fill="#fff" />
          <path {...stroke} strokeWidth={2.16} transform="translate(116.6 -3.4) scale(3.7)" d={handsetPath} />
          <text {...word} x="0" y="109.5" fontSize="34.5" textLength="48" lengthAdjust="spacingAndGlyphs">AD</text>
          <text {...word} x="56.5" y="109.5" fontSize="25" textLength="145.5" lengthAdjust="spacingAndGlyphs">ONPH INC.</text>
        </g>
        <mask id="lm-mask"><use href="#lm-art" /></mask>
      </defs>

      <g id="lm-play" style={fillBox}>
        <path {...stroke} className="lm-draw" d={playPath} pathLength={1} />
      </g>
      <circle id="lm-playRing" cx="26" cy="40" r="30" fill="none" stroke="#fff" strokeWidth="2" style={fillBox} opacity="0" />

      <g id="lm-mobile" style={fillBox}>
        <rect {...stroke} className="lm-draw" x="69" y="4" width="42" height="73" rx="11" pathLength={1} />
        <rect id="lm-screen" x="75" y="10" width="30" height="45" rx="4" fill="#9fc0ff" opacity="0" />
        <circle id="lm-dot" cx="90" cy="64.5" r="4.6" fill="#fff" style={fillBox} />
      </g>

      <circle id="lm-ring1" cx="161" cy="40" r="34" fill="none" stroke="#fff" strokeWidth="2" style={fillBox} opacity="0" />
      <circle id="lm-ring2" cx="161" cy="40" r="34" fill="none" stroke="#fff" strokeWidth="2" style={fillBox} opacity="0" />
      <g id="lm-handset" style={fillBox}>
        <path {...stroke} strokeWidth={2.16} className="lm-draw" transform="translate(116.6 -3.4) scale(3.7)" pathLength={1} d={handsetPath} />
      </g>

      <g clipPath="url(#lm-wipeAD)">
        <text id="lm-ad" {...word} x="0" y="109.5" fontSize="34.5" textLength="48" lengthAdjust="spacingAndGlyphs">AD</text>
      </g>
      <g clipPath="url(#lm-wipeTxt)">
        <text id="lm-onph" {...word} x="56.5" y="109.5" fontSize="25" textLength="145.5" lengthAdjust="spacingAndGlyphs">ONPH INC.</text>
      </g>
      <text id="lm-tm" {...word} fontWeight={700} x="189" y="6.5" fontSize="7.5">TM</text>

      <g mask="url(#lm-mask)">
        <rect id="lm-shine" x="-60" y="-10" width="50" height="130" fill="url(#lm-shineG)" transform="skewX(-20)" />
      </g>
    </svg>
  );
}
