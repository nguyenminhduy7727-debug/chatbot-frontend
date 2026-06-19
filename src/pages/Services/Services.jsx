import { useEffect, useMemo, useState } from "react";
import posts from "../../Datanew/services_post";

const typeColorMap = {
  green: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  blue: "bg-sky-50 text-sky-800 ring-sky-200",
  yellow: "bg-amber-50 text-amber-900 ring-amber-200",
  gray: "bg-slate-50 text-slate-800 ring-slate-200",
};

function Badge({ color = "gray", children }) {
  const cls = typeColorMap[color] ?? typeColorMap.gray;
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold ring-1 ${cls}`}
    >
      <span className="h-2 w-2 rounded-full bg-current opacity-60" />
      {children}
    </span>
  );
}

function Icon({ children, tone = "blue" }) {
  const toneCls =
    tone === "emerald"
      ? "bg-emerald-600"
      : tone === "slate"
      ? "bg-slate-900"
      : "bg-blue-600";
  return (
    <div
      className={`h-11 w-11 rounded-2xl ${toneCls} text-white flex items-center justify-center shadow-sm`}
    >
      {children}
    </div>
  );
}

export default function Services() {
  const [selectedPost, setSelectedPost] = useState(null);

  // UI state
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");

  // ESC đóng modal
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedPost(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // khóa scroll nền khi mở modal
  useEffect(() => {
    document.body.style.overflow = selectedPost ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [selectedPost]);

  const allTypes = useMemo(() => {
    const set = new Set(posts.map((p) => p.type).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, []);

  const featured = useMemo(() => posts?.slice?.(0, 3) ?? [], []);

  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    return posts.filter((p) => {
      const hitType = type === "all" ? true : p.type === type;
      const hitQ =
        !keyword ||
        `${p.title ?? ""} ${p.desc ?? ""} ${p.author ?? ""}`
          .toLowerCase()
          .includes(keyword);
      return hitType && hitQ;
    });
  }, [q, type]);

  // next/prev trong modal
  const selectedIndex = useMemo(() => {
    if (!selectedPost) return -1;
    return filtered.findIndex((x) => x.id === selectedPost.id);
  }, [selectedPost, filtered]);

  const goPrev = () => {
    if (selectedIndex <= 0) return;
    setSelectedPost(filtered[selectedIndex - 1]);
  };

  const goNext = () => {
    if (selectedIndex < 0 || selectedIndex >= filtered.length - 1) return;
    setSelectedPost(filtered[selectedIndex + 1]);
  };

  const openYoutube = (embed) => {
    if (!embed) return "";
    if (embed.includes("/embed/")) {
      const id = embed.split("/embed/")[1].split("?")[0];
      return `https://www.youtube.com/watch?v=${id}`;
    }
    return embed;
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      {/* TOP HERO (modern glass) */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-28 -right-28 h-96 w-96 rounded-full bg-blue-300/50 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-emerald-300/40 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.08)_1px,transparent_0)] [background-size:18px_18px] opacity-40" />
        </div>

        <div className="relative container mx-auto px-4 pt-10 pb-8">
          <div className="rounded-[32px] border border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-sm overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/80 ring-1 ring-slate-200 px-3 py-1 text-xs font-extrabold text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Thư viện số • Hướng dẫn dịch vụ công
                  </div>

                  <h2 className="mt-4 text-3xl md:text-4xl font-black tracking-tight text-slate-900">
                    Dịch vụ công{" "}
                    <span className="text-blue-700">— Hướng dẫn &amp; Video</span>
                  </h2>

                  <p className="mt-3 text-slate-600 leading-relaxed">
                    Tra cứu nhanh thủ tục, xem video minh họa và đọc hướng dẫn chi
                    tiết. Tối ưu cho người dân thao tác trên điện thoại.
                  </p>

                  {/* Search + filter */}
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-slate-400"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <path d="m21 21-4.3-4.3"></path>
                        </svg>
                        <input
                          value={q}
                          onChange={(e) => setQ(e.target.value)}
                          placeholder="Tìm Kiếm Danh Mục Hướng Dẫn"
                          className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                        />
                        {q && (
                          <button
                            type="button"
                            onClick={() => setQ("")}
                            className="text-xs font-extrabold text-slate-500 hover:text-slate-800"
                          >
                            Xóa
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                        <select
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="w-full bg-transparent outline-none text-sm font-bold text-slate-700"
                        >
                          {allTypes.map((t) => (
                            <option key={t} value={t}>
                              {t === "all" ? "Tất cả loại" : t}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-white/80 ring-1 ring-slate-200 p-4">
                      <div className="text-xs text-slate-500">Bài hướng dẫn</div>
                      <div className="text-2xl font-black text-slate-900">
                        {posts.length}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-white/80 ring-1 ring-slate-200 p-4">
                      <div className="text-xs text-slate-500">Có video</div>
                      <div className="text-2xl font-black text-slate-900">
                        {posts.filter((p) => p.youtubeEmbed).length}
                      </div>
                    </div>
                    <div className="hidden sm:block rounded-2xl bg-white/80 ring-1 ring-slate-200 p-4">
                      <div className="text-xs text-slate-500">Hotline</div>
                      <div className="text-2xl font-black text-slate-900">
                        1022
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured */}
                <div className="flex flex-col gap-3 lg:items-end">
                  <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                    Gợi ý nổi bật
                  </div>
                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {featured.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPost(p)}
                        className="group inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur ring-1 ring-slate-200 px-4 py-2 text-sm font-extrabold text-slate-700 hover:text-blue-700 hover:ring-blue-200 transition"
                      >
                        <span className="h-2 w-2 rounded-full bg-blue-600 group-hover:bg-blue-700" />
                        <span className="line-clamp-1 max-w-[220px]">
                          {p.title}
                        </span>
                        <span className="text-slate-400 group-hover:text-blue-500">
                          →
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="text-xs text-slate-500 lg:text-right">
                    {filtered.length} kết quả • lọc theo:{" "}
                    <span className="font-extrabold text-slate-700">
                      {type === "all" ? "Tất cả" : type}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* subtle footer strip */}
            <div className="px-6 md:px-8 py-4 border-t border-slate-200/60 bg-white/60 flex flex-wrap gap-2 items-center justify-between">
              <div className="text-sm text-slate-600">
                Ưu tiên nội dung{" "}
                <span className="font-extrabold text-slate-800">
                  thủ tục hành chính
                </span>
                , rõ ràng &amp; đúng quy trình.
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-slate-900 text-white px-4 py-2 text-xs font-extrabold">
                  Cập nhật liên tục
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Guide Cards (cleaner) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-white flex items-center gap-3">
                  <Icon tone="blue">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        width="14"
                        height="20"
                        x="5"
                        y="2"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M12 18h.01"></path>
                    </svg>
                  </Icon>
                  <div>
                    <h3 className="font-black text-lg text-slate-900">
                      VNeID: tạo tài khoản
                    </h3>
                    <p className="text-sm text-slate-500">
                      4 bước cơ bản để bắt đầu
                    </p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    "Tải ứng dụng VNeID trên App Store hoặc Google Play.",
                    "Chọn 'Đăng ký' và nhập CCCD + số điện thoại.",
                    "Quét QR trên CCCD gắn chip.",
                    "Nhập OTP để hoàn tất.",
                  ].map((text, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-9 w-9 rounded-2xl bg-blue-50 ring-1 ring-blue-100 text-blue-700 flex items-center justify-center font-black text-sm">
                        {idx + 1}
                      </div>
                      <p className="text-slate-700 leading-relaxed mt-1">
                        {text}
                      </p>
                    </div>
                  ))}
                  <div className="mt-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                    <div className="font-black mb-1">Lưu ý</div>
                    Đăng ký <strong>Mức 2</strong> cần đến Công an phường để thu
                    nhận <strong>vân tay</strong> và{" "}
                    <strong>ảnh chân dung</strong>.
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-white flex items-center gap-3">
                  <Icon tone="emerald">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"></path>
                      <path d="M20.054 15.987H3.946"></path>
                    </svg>
                  </Icon>
                  <div>
                    <h3 className="font-black text-lg text-slate-900">
                      Nộp hồ sơ trực tuyến
                    </h3>
                    <p className="text-sm text-slate-500">
                      Quy trình chuẩn trên Cổng DVC
                    </p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    "Vào dichvucong.gov.vn",
                    "Đăng nhập bằng VNeID.",
                    "Tìm thủ tục theo từ khóa (ví dụ: 'tình trạng hôn nhân').",
                    "Chọn 'Nộp hồ sơ trực tuyến' + đính kèm giấy tờ.",
                    "Lưu mã hồ sơ để tra cứu.",
                  ].map((text, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-9 w-9 rounded-2xl bg-emerald-50 ring-1 ring-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
                        {idx + 1}
                      </div>
                      <p className="text-slate-700 leading-relaxed mt-1">
                        {text}
                      </p>
                    </div>
                  ))}

                  <div className="mt-2 flex flex-wrap gap-2">
                    <a
                      href="https://dichvucong.gov.vn"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-2 text-sm font-black hover:opacity-90 transition"
                    >
                      Mở Cổng DVCQG <span className="opacity-80">↗</span>
                    </a>
                    <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-4 py-2 text-sm font-black ring-1 ring-slate-200">
                      Tip: dùng VNeID nhanh
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts list */}
            <div className="space-y-4">
              <div className="flex items-end justify-between gap-4 mt-2">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <span className="h-9 w-9 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 7v14"></path>
                        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                      </svg>
                    </span>
                    Danh mục hướng dẫn
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Chọn thẻ để xem chi tiết, có thể kèm video minh họa
                  </p>
                </div>

                <div className="hidden md:flex items-center gap-2 text-xs font-extrabold text-slate-600">
                  <span className="rounded-full bg-white ring-1 ring-slate-200 px-3 py-1">
                    {filtered.length} kết quả
                  </span>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                  <div className="text-lg font-black text-slate-900">
                    Không tìm thấy kết quả
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    Thử đổi từ khóa hoặc chuyển bộ lọc loại bài.
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filtered.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPost(p)}
                      className="text-left group rounded-[28px] border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-blue-200 transition-all overflow-hidden"
                    >
                      <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                        <img
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300"
                          src={p.thumbnail}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                        <div className="absolute left-4 top-4">
                          <Badge color={p.typeColor}>{p.type}</Badge>
                        </div>

                        <div className="absolute right-4 top-4">
                          <div className="h-10 w-10 rounded-2xl bg-white/15 backdrop-blur ring-1 ring-white/20 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="opacity-90"
                            >
                              <path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"></path>
                              <circle cx="12" cy="12" r="10"></circle>
                            </svg>
                          </div>
                        </div>

                        <div className="absolute left-4 right-4 bottom-4">
                          <h4 className="text-white font-black text-lg leading-snug line-clamp-2 drop-shadow">
                            {p.title}
                          </h4>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col gap-3">
                        <p className="text-sm text-slate-600 line-clamp-3">
                          {p.desc}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="inline-flex items-center gap-1">
                              <span>📅</span> {p.date}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <span>👤</span> {p.author}
                            </span>
                          </div>

                          <div className="inline-flex items-center gap-2 text-sm font-black text-blue-700 group-hover:text-blue-800">
                            Xem{" "}
                            <span className="transition-transform group-hover:translate-x-1">
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <div className="rounded-[28px] p-6 shadow-lg sticky top-24 ring-1 ring-white/15 bg-gradient-to-b from-sky-700 via-blue-800 to-blue-950 text-white overflow-hidden">
              {/* pattern */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.45)_1px,transparent_0)] [background-size:18px_18px]" />
              {/* glow */}
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-300/25 blur-3xl" />
              <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />

              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-black mb-1">Cổng chính thức</h3>
                    <p className="text-sky-100/90 text-sm">
                      Truy cập nhanh liên kết đáng tin cậy
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <a
                    href="https://dichvucong.gov.vn"
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl bg-white/12 hover:bg-white/18 ring-1 ring-white/18 p-4 transition"
                  >
                    <div className="font-black flex items-center justify-between">
                      Dịch vụ công Quốc gia{" "}
                      <span className="ml-2 opacity-90">↗</span>
                    </div>
                    <div className="text-xs text-sky-100/90 mt-1">
                      Cổng tích hợp toàn quốc
                    </div>
                  </a>

                  <a
                    href="https://dichvucong.bocongan.gov.vn"
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl bg-white/12 hover:bg-white/18 ring-1 ring-white/18 p-4 transition"
                  >
                    <div className="font-black flex items-center justify-between">
                      DVC Bộ Công an{" "}
                      <span className="ml-2 opacity-90">↗</span>
                    </div>
                    <div className="text-xs text-sky-100/90 mt-1">
                      Thủ tục thuộc Bộ Công an
                    </div>
                  </a>

                  {/* ✅ FIX WARNING: thay <a href="#"> bằng button */}
                  <button
                    type="button"
                    onClick={() => {
                      // TODO: khi có link thật, đổi lại thành <a href="..."> hoặc <Link to="...">
                      // Ví dụ: navigate("/du-lieu-dan-cu");
                    }}
                    className="text-left w-full block rounded-2xl bg-white/12 hover:bg-white/18 ring-1 ring-white/18 p-4 transition"
                    aria-label="Dữ liệu dân cư (đang cập nhật)"
                    title="Dữ liệu dân cư (đang cập nhật)"
                  >
                    <div className="font-black flex items-center justify-between">
                      Dữ liệu Dân cư{" "}
                      <span className="ml-2 opacity-90">↗</span>
                    </div>
                    <div className="text-xs text-sky-100/90 mt-1">
                      Cập nhật thông tin dân cư
                    </div>
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-black uppercase text-sky-100/90 tracking-wider">
                      Tổng đài hỗ trợ
                    </div>
                    <div className="text-3xl font-black mt-1">1022</div>
                  </div>

                  <div className="rounded-2xl bg-white/14 ring-1 ring-white/18 px-4 py-3 text-sm font-black">
                    Hỗ trợ người dân
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="font-black text-slate-900 mb-2">
                Mẹo thao tác nhanh
              </div>
              <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                <li>Dùng VNeID để đăng nhập nhanh.</li>
                <li>Lưu “mã hồ sơ” để tra cứu tiến độ.</li>
                <li>Chuẩn bị file ảnh/PDF rõ nét trước khi đính kèm.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ✅ MODAL (modern) */}
        {selectedPost && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-md p-4"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="bg-white w-full max-w-5xl max-h-[92vh] rounded-[32px] shadow-2xl flex flex-col relative overflow-hidden animate-[fadeIn_180ms_ease-out]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ✅ Header FIX: mobile stack để title không bị xẹp */}
              <div className="p-4 sm:p-6 border-b border-slate-200 bg-white/85 backdrop-blur sticky top-0 z-10">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  {/* Left: title */}
                  <div className="min-w-0">
                    <Badge color={selectedPost.typeColor}>
                      {selectedPost.type}
                    </Badge>

                    <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-snug break-words">
                      {selectedPost.title}
                    </h2>

                    <div className="flex flex-wrap items-center text-sm text-slate-500 mt-2 gap-x-4 gap-y-1">
                      <div className="flex items-center">
                        <span className="mr-1">📅</span> {selectedPost.date}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">👤</span> {selectedPost.author}
                      </div>
                    </div>
                  </div>

                  {/* Right: controls */}
                  <div className="flex items-center justify-end gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={goPrev}
                      disabled={selectedIndex <= 0}
                      className="h-10 sm:h-11 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black transition disabled:opacity-40 disabled:hover:bg-slate-100"
                      aria-label="Bài trước"
                      title="Bài trước"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={selectedIndex >= filtered.length - 1}
                      className="h-10 sm:h-11 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black transition disabled:opacity-40 disabled:hover:bg-slate-100"
                      aria-label="Bài sau"
                      title="Bài sau"
                    >
                      →
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPost(null)}
                      className="h-10 w-10 sm:h-11 sm:w-11 grid place-items-center rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                      aria-label="Đóng"
                      title="Đóng"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="overflow-y-auto p-4 sm:p-6 space-y-8">
                {selectedPost.youtubeEmbed && (
                  <div className="rounded-[28px] overflow-hidden shadow-sm bg-slate-100 border border-slate-200">
                    <div className="aspect-video w-full bg-black relative">
                      <iframe
                        src={selectedPost.youtubeEmbed}
                        className="w-full h-full"
                        title={selectedPost.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>

                    <div className="p-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-sm text-slate-600">
                        Nếu video không hiển thị, mở trực tiếp trên YouTube.
                      </div>
                      <a
                        href={openYoutube(selectedPost.youtubeEmbed)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-2 text-sm font-black hover:opacity-90 transition"
                      >
                        Mở YouTube ↗
                      </a>
                    </div>
                  </div>
                )}

                <div className="rounded-[28px] border border-slate-200 bg-white p-5 sm:p-6">
                  <h3 className="text-lg font-black text-slate-900 border-l-4 border-blue-600 pl-3 mb-4">
                    Nội dung chi tiết
                  </h3>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line text-base sm:text-lg">
                    {selectedPost.content}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs text-slate-500">
                  Đoàn TNCS Hồ Chí Minh Phường Bình Tân — Thư viện số
                </div>
                <div className="text-xs text-slate-500">
                  {selectedIndex >= 0 ? (
                    <>
                      Bài{" "}
                      <span className="font-black text-slate-700">
                        {selectedIndex + 1}
                      </span>{" "}
                      / {filtered.length}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}