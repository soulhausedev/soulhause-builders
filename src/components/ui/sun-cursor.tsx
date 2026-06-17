"use client";

import { useEffect, useState } from "react";

export function SunCursor() {
  const [pos, setPos]       = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true); // assume touch until proven otherwise

  useEffect(() => {
    // Only show custom cursor on devices with a fine pointer (mouse), not touch
    const mq = window.matchMedia("(pointer: fine)");
    setIsTouch(!mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsTouch(!e.matches);
    mq.addEventListener("change", onChange);

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const hide = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", hide);
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 99999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s",
      }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animation: "sun-spin 8s linear infinite" }}
      >
        <defs>
          <clipPath id="cursor-sun">
            <circle cx="14" cy="14" r="13" />
          </clipPath>
        </defs>

        {/* Sun base */}
        <circle cx="14" cy="14" r="13" fill="#F5C432" />

        {/* Stripe bands */}
        <rect x="0" y="14" width="28" height="0.8" fill="#F5F0E6" clipPath="url(#cursor-sun)" />
        <rect x="0" y="15" width="28" height="3"   fill="#F0A020" clipPath="url(#cursor-sun)" />
        <rect x="0" y="18" width="28" height="0.8" fill="#F5F0E6" clipPath="url(#cursor-sun)" />
        <rect x="0" y="19" width="28" height="3"   fill="#E89070" clipPath="url(#cursor-sun)" />
        <rect x="0" y="22" width="28" height="0.8" fill="#F5F0E6" clipPath="url(#cursor-sun)" />
        <rect x="0" y="23" width="28" height="3"   fill="#E8703A" clipPath="url(#cursor-sun)" />
        <rect x="0" y="26" width="28" height="0.8" fill="#F5F0E6" clipPath="url(#cursor-sun)" />
        <rect x="0" y="27" width="28" height="3"   fill="#C45525" clipPath="url(#cursor-sun)" />

        {/* Outline ring */}
        <circle cx="14" cy="14" r="13" stroke="#4F9080" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}
