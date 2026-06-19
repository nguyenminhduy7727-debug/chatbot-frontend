import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const NAV = [
  { to: "/", label: "Trang Chủ", icon: "🏠" },
  { to: "/gioi-thieu", label: "Giới thiệu", icon: "ℹ️" },
  { to: "/hoat-dong", label: "Hoạt động", icon: "⚡" },
  { to: "/dich-vu-cong", label: "Dịch vụ công", icon: "📄" },
  { to: "/kham-pha", label: "Khám phá Bình Tân", icon: "📍" },
];

function NavItem({ to, icon, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "group relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold transition",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
          isActive
            ? "bg-white text-blue-800 shadow-sm"
            : "text-white/90 hover:bg-white/15 hover:text-white",
        ].join(" ")
      }
    >
      <span className="text-base leading-none">{icon}</span>
      <span className="whitespace-nowrap">{label}</span>

      <span
        className={[
          "absolute -bottom-1 left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-full bg-white transition-all",
          "group-hover:w-6",
        ].join(" ")}
      />
    </NavLink>
  );
}

function BotLink({ onClick, className = "" }) {
  return (
    <a
      href="https://botchat-nine.vercel.app/"
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold transition",
        "bg-gradient-to-r from-sky-400/25 to-fuchsia-400/20 text-white hover:from-sky-400/35 hover:to-fuchsia-400/30",
        "ring-1 ring-inset ring-white/20 shadow-sm",
        className,
      ].join(" ")}
    >
      <span className="text-base leading-none">🤖</span>
      <span className="whitespace-nowrap">Trợ Lý Hỗ Trợ</span>
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 opacity-90"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M7 17L17 7" />
        <path d="M8 7h9v9" />
      </svg>
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  const closeMenu = () => setOpen(false);

  // click outside -> close (mobile drawer)
  useEffect(() => {
    const onDocClick = (e) => {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // ESC close
  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // ✅ đổi breakpoint: close khi >= 1024 (lg)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-800 via-blue-700 to-sky-600" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-80 [background:radial-gradient(circle_at_20%_10%,rgba(255,255,255,.18),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,.12),transparent_45%)]" />

        <div className="border-b border-white/10 backdrop-blur">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Brand */}
              <NavLink to="/">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <div className="absolute -inset-1 rounded-2xl bg-white/10 blur" />
                    <img
                      alt="Logo Đoàn"
                      className="relative w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-white/10 p-1 object-contain"
                      src="https://upload.wikimedia.org/wikipedia/vi/0/09/Huy_Hi%E1%BB%87u_%C4%90o%C3%A0n.png"
                    />
                  </div>

                  <div className="leading-tight min-w-0">
                    <h1 className="text-sm lg:text-[15px] font-black uppercase tracking-wide text-white truncate">
                      Đoàn TNCS Hồ Chí Minh
                    </h1>
                    <p className="text-xs text-white/80 truncate">
                      Phường Bình Tân, Thành phố Hồ Chí Minh
                    </p>
                  </div>
                </div>
              </NavLink>


              {/* ✅ DESKTOP nav chỉ hiện từ lg (>=1024) */}
              <nav className="hidden lg:flex items-center gap-2">
                {NAV.map((it) => (
                  <NavItem key={it.to} {...it} />
                ))}
                <div className="mx-1 h-6 w-px bg-white/20" />
                <BotLink />
              </nav>

              {/* ✅ MOBILE button: hiện dưới lg (tức <1024, gồm cả ~900) */}
              <button
                className="lg:hidden inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm font-extrabold text-white hover:bg-white/15 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                aria-label="Menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
                <span>Menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay + drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          <div className="absolute left-0 right-0 top-0">
            <div
              ref={panelRef}
              className="mx-3 mt-3 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-blue-800/95 via-blue-700/95 to-sky-700/90 shadow-2xl"
            >
              <div className="p-3">
                <div className="flex items-center justify-between gap-2 rounded-2xl bg-white/10 p-3">
                  <div className="text-white">
                    <div className="text-sm font-black">Điều hướng nhanh</div>
                    <div className="text-xs text-white/80">Chọn mục bạn muốn xem</div>
                  </div>

                  <button
                    onClick={closeMenu}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white hover:bg-white/15 transition"
                    aria-label="Đóng menu"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-3 grid gap-2">
                  {NAV.map((it) => (
                    <NavLink
                      key={it.to}
                      to={it.to}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        [
                          "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-extrabold transition",
                          isActive ? "bg-white text-blue-800 shadow" : "bg-white/10 text-white hover:bg-white/15",
                        ].join(" ")
                      }
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">{it.icon}</span>
                        <span>{it.label}</span>
                      </span>
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M13 5l7 7-7 7" />
                      </svg>
                    </NavLink>
                  ))}
                </div>

                <div className="my-3 h-px bg-white/15" />

                <BotLink onClick={closeMenu} className="w-full justify-center py-3 rounded-2xl" />

                <div className="mt-3 text-center text-xs text-white/70">
                  Tip: bấm <b>ESC</b> để đóng menu
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
