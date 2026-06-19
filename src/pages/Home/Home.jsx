import { NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
export default function Home() {
  const slides = useMemo(
    () => [
      { src: "/images/doanthanhnien.jpg", alt: "Digital Public Service" },
    ],
    []
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3500);
    return () => clearInterval(t);
  }, [slides.length]);
  //Test
  const features = [
    {
      to: "/gioi-thieu",
      title: "Giới thiệu",
      desc: "Cơ cấu tổ chức và truyền thống Chi đoàn Văn phòng.",
      tone: "purple",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7"
          aria-hidden="true"
        >
          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
        </svg>
      ),
    },
    {
      to: "/hoat-dong",
      title: "Hoạt động Đoàn",
      desc: "Tin tức sự kiện, phong trào thanh niên tình nguyện.",
      tone: "orange",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7"
          aria-hidden="true"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <path d="M16 3.128a4 4 0 0 1 0 7.744" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <circle cx="9" cy="7" r="4" />
        </svg>
      ),
    },
    {
      to: "/dich-vu-cong",
      title: "Dịch vụ công",
      desc: "Hướng dẫn VNeID, nộp hồ sơ trực tuyến, Đăng ký tạm trú.",
      tone: "blue",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7"
          aria-hidden="true"
        >
          <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
          <path d="M14 2v5a1 1 0 0 0 1 1h5" />
          <path d="M10 9H8" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
        </svg>
      ),
    },
    {
      to: "/kham-pha",
      title: "Khám phá phường Bình Tân",
      desc: "Tìm hiểu di tích lịch sử, văn hóa và ẩm thực đặc trưng.",
      tone: "green",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7"
          aria-hidden="true"
        >
          <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
          <path d="M15 5.764v15" />
          <path d="M9 3.236v15" />
        </svg>
      ),
    },
  ];

  const toneCls = {
    purple: {
      card: "from-purple-50 to-white",
      icon: "text-purple-600",
      glow: "bg-purple-400/20",
      ring: "group-hover:ring-purple-200",
    },
    orange: {
      card: "from-orange-50 to-white",
      icon: "text-orange-600",
      glow: "bg-orange-400/20",
      ring: "group-hover:ring-orange-200",
    },
    blue: {
      card: "from-blue-50 to-white",
      icon: "text-blue-600",
      glow: "bg-blue-400/20",
      ring: "group-hover:ring-blue-200",
    },
    green: {
      card: "from-green-50 to-white",
      icon: "text-green-600",
      glow: "bg-green-400/20",
      ring: "group-hover:ring-green-200",
    },
  };
  return (
    <div className="space-y-10">
      {/* HERO */}
      <section className="relative mx-4 mt-6 overflow-hidden rounded-3xl text-white shadow-[0_22px_70px_-25px_rgba(2,6,23,0.65)] flex flex-col md:flex-row min-h-[500px]">
        {/* nền đẹp hơn: gradient + glow nhẹ */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-blue-700 to-indigo-600" />
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />

        {/* pattern nhẹ hơn (không đậm) */}
        <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.7)_1px,transparent_0)] [background-size:22px_22px] pointer-events-none" />

        {/* LEFT */}
        <div className="relative z-10 w-full md:w-3/5 p-8 md:p-16 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase backdrop-blur border border-white/20 bg-white/10 w-fit">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_6px_rgba(16,185,129,0.18)]" />
            Hưởng ứng ngày Chuyển đổi số Quốc gia
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
            Thư viện Dịch vụ công điện tử &amp; <br />
            <span className="bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">
              Khám phá phường Bình Tân
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
            Hỗ trợ đoàn viên, thanh niên và người dân thực hiện thủ tục hành chính nhanh chóng.
            Kết nối và lan tỏa giá trị văn hóa - lịch sử địa phương.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <NavLink to="/dich-vu-cong">
              <button className="px-6 py-3 bg-white text-blue-800 font-bold rounded-xl hover:bg-blue-50 transition shadow-[0_14px_30px_-18px_rgba(0,0,0,0.45)] active:translate-y-[1px] flex items-center">
                Tra cứu thủ tục ngay <span className="ml-2">→</span>
              </button>
            </NavLink>

            <NavLink to="/kham-pha">
              <button className="px-6 py-3 rounded-xl font-semibold border border-white/25 bg-white/10 backdrop-blur hover:bg-white/15 transition active:translate-y-[1px]">
                Khám phá phường Bình Tân
              </button>
            </NavLink>
          </div>
        </div>

        {/* RIGHT (giữ nguyên kích thước, chỉ làm đẹp) */}
        <div className="relative w-full md:w-2/5 h-64 md:h-auto p-3 md:p-4">
          <div className="relative h-full overflow-hidden rounded-2xl md:rounded-3xl border border-white/15 bg-white/5 shadow-[0_30px_80px_-35px_rgba(0,0,0,0.6)]">
            {/* track */}
            <div
              className="h-full w-full flex md:absolute md:inset-0 transition-transform duration-700 ease-[cubic-bezier(.2,.9,.2,1)]"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {slides.map((s) => (
                <div key={s.src} className="relative w-full h-full flex-none">
                  <img
                    alt={s.alt}
                    src={s.src}
                    className="w-full h-full object-cover select-none"
                    draggable="false"
                  />
                  {/* overlay ảnh đẹp hơn */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute inset-0 [box-shadow:inset_0_0_120px_rgba(0,0,0,0.35)]" />
                </div>
              ))}
            </div>

            {/* vệt chia giữa 2 cột (nhẹ, sang) */}
            <div className="hidden md:block absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-blue-900/55 to-transparent" />
          </div>
        </div>
      </section>
      <section>
        <section className="py-12">
          <section className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-800">Tiện ích nổi bật</h2>
              <p className="text-gray-500 mt-2">
                Truy cập nhanh các chuyên mục chính của cổng thông tin
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f) => {
                const t = toneCls[f.tone];
                return (
                  <NavLink key={f.to} to={f.to} className="group block">
                    <div
                      className={[
                        "relative overflow-hidden rounded-2xl p-6",
                        "bg-gradient-to-b",
                        t.card,
                        "ring-1 ring-black/5",
                        "transition-all duration-300",
                        "hover:-translate-y-1 hover:shadow-xl",
                        "hover:ring-1 hover:ring-black/10",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                      ].join(" ")}
                    >
                      {/* nền pattern nhẹ */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl opacity-70" />
                        <div className={["absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl", t.glow].join(" ")} />
                      </div>

                      {/* icon */}
                      <div className="relative mb-4 flex items-center justify-between">
                        <div
                          className={[
                            "relative w-14 h-14 bg-white rounded-2xl",
                            "flex items-center justify-center",
                            "shadow-sm ring-1 ring-black/5",
                            "transition-transform duration-300",
                            "group-hover:scale-110 group-hover:-rotate-2",
                            "ring-offset-0",
                          ].join(" ")}
                        >
                          <span className={t.icon}>{f.icon}</span>
                          <span
                            className={[
                              "absolute inset-0 rounded-2xl",
                              "ring-2 ring-transparent",
                              "transition-all duration-300",
                              "group-hover:ring-2",
                              t.ring,
                            ].join(" ")}
                          />
                        </div>

                        {/* mũi tên subtle */}
                        <span className="text-gray-400 transition-all duration-300 group-hover:text-gray-600 group-hover:translate-x-0.5">
                          →
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {f.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </section>
        </section>
        <section className="bg-white py-12 border-y border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

              {/* BLUE */}
              <div
                className="group relative rounded-2xl p-6 text-center
        bg-blue-50/40 hover:bg-blue-50/70
        ring-1 ring-black/5
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5
          transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="h-6 w-6 text-blue-600">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M8 13h8" />
                    <path d="M8 17h8" />
                  </svg>
                </div>

                <div className="text-4xl font-extrabold tracking-tight text-blue-600 mb-1">
                  100<span className="text-2xl align-top">%</span>
                </div>
                <div className="text-gray-800 font-semibold">Hồ sơ trực tuyến</div>
                <p className="text-sm text-gray-600 mt-1">Hỗ trợ người dân tận tình</p>

                <div className="hidden md:block absolute right-0 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
              </div>

              {/* ORANGE */}
              <div
                className="group relative rounded-2xl p-6 text-center
        bg-orange-50/40 hover:bg-orange-50/70
        ring-1 ring-black/5
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5
          transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="h-6 w-6 text-orange-600">
                    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>

                <div className="text-4xl font-extrabold tracking-tight text-orange-600 mb-1">
                  15<span className="text-2xl align-top">+</span>
                </div>
                <div className="text-gray-800 font-semibold">Di tích &amp; Địa điểm</div>
                <p className="text-sm text-gray-600 mt-1">Đã được số hóa thông tin</p>

                <div className="hidden md:block absolute right-0 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
              </div>

              {/* GREEN */}
              <div
                className="group relative rounded-2xl p-6 text-center
        bg-green-50/40 hover:bg-green-50/70
        ring-1 ring-black/5
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5
          transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="h-6 w-6 text-green-600">
                    <path d="M4 12a8 8 0 0 1 16 0" />
                    <path d="M6 12v4a2 2 0 0 0 2 2h1" />
                    <path d="M18 12v4a2 2 0 0 1-2 2h-1" />
                    <path d="M9 18h6" />
                    <path d="M12 4v2" />
                  </svg>
                </div>

                <div className="text-4xl font-extrabold tracking-tight text-green-600 mb-1">
                  24<span className="text-2xl align-top">/7</span>
                </div>
                <div className="text-gray-800 font-semibold">Trợ lý ảo hỗ trợ</div>
                <p className="text-sm text-gray-600 mt-1">Giải đáp thắc mắc tự động</p>
              </div>

            </div>
          </div>
        </section>


      </section>
      {/* các section “Tiện ích nổi bật”, “100%/15+/24/7” bạn copy tiếp từ file index.html */}
    </div>
  );
}