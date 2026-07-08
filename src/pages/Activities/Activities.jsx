import { useEffect, useMemo, useState } from "react";
import activities from "../../Datanew/activities.json";

export default function Activities() {
  const [selectedPost, setSelectedPost] = useState(null);

  const [q, setQ] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [sort, setSort] = useState("newest"); // newest | oldest

  // đóng bằng phím ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedPost(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const categories = useMemo(() => {
    const set = new Set(activities.map((a) => a.category).filter(Boolean));
    return ["Tất cả", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();

    let list = activities.filter((p) => {
      const okCat = category === "Tất cả" || p.category === category;
      const okQ =
        !keyword ||
        [p.title, p.excerpt, p.author, p.content]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(keyword);
      return okCat && okQ;
    });

    list = [...list].sort((a, b) => {
      if (sort === "oldest") return a.date.localeCompare(b.date);
      return b.date.localeCompare(a.date); // newest
    });

    return list;
  }, [q, category, sort]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-sky-50 via-slate-50 to-white">
      {/* pattern nhẹ */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] bg-[radial-gradient(#1d4ed8_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* HEADER */}
      <div className="border-b bg-white/85 backdrop-blur">
        <div className="container mx-auto px-4 py-10">
          <div className="text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800 ring-1 ring-inset ring-blue-200">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
              CỔNG THÔNG TIN HOẠT ĐỘNG
            </div>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Hoạt động của Trung tâm Cung ứng dịch vụ công Bình Tân
            </h2>

            <p className="mx-auto mt-2 max-w-3xl text-slate-600">
              Cập nhật tin tức và sự kiện mới nhất của tuổi trẻ Bình Tân — trình bày rõ ràng,
              đúng trọng tâm, phong cách hành chính.
            </p>

            {/* line nhấn */}
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500" />
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 max-w-2xl mx-auto">
            <Stat label="Bài viết" value={String(activities.length)} />
            <Stat label="Danh mục" value={String(categories.length - 1)} />
            <Stat label="Cập nhật" value={formatDateVN(getNewestDate(activities))} />
          </div>

          {/* Controls */}
          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-12">
            <div className="md:col-span-6">
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  🔎
                </span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Tìm theo tiêu đề, nội dung, tác giả..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-sm text-slate-900 shadow-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-sm text-slate-900 shadow-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
              </select>
            </div>
          </div>

          {/* Result line */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600">
            <div>
              Hiển thị{" "}
              <span className="font-semibold text-slate-900">{filtered.length}</span> /{" "}
              <span className="font-semibold text-slate-900">{activities.length}</span> bài viết
            </div>

            {(q || category !== "Tất cả") && (
              <button
                onClick={() => {
                  setQ("");
                  setCategory("Tất cả");
                  setSort("newest");
                }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <ArticleCard key={post.id} post={post} onOpen={() => setSelectedPost(post)} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <div className="text-4xl">📄</div>
            <div className="mt-3 text-lg font-semibold text-slate-900">Không tìm thấy bài viết</div>
            <p className="mt-1 text-sm text-slate-600">Thử đổi từ khóa hoặc danh mục.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
      <div className="text-xs font-semibold text-slate-500">{label}</div>
      <div className="mt-1 text-lg font-bold text-slate-900">{value}</div>
    </div>
  );
}

function ArticleCard({ post, onOpen }) {
  const reading = calcReadingTime(post.content || post.excerpt || "");
  const isNew = isWithinDays(post.date, 14);

  return (
    <article
      onClick={onOpen}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur transition hover:shadow-xl hover:-translate-y-0.5"
    >
      {/* top gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-sky-500 to-emerald-500" />

      <div className="relative h-48 overflow-hidden bg-slate-100">
        {/* category pill */}
        <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
          <span className="rounded-full bg-gradient-to-r from-blue-800 to-sky-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow">
            {post.category}
          </span>
          {isNew && (
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-inset ring-emerald-200">
              Mới
            </span>
          )}
        </div>

        {/* image count */}
        {post.images?.length > 0 && (
          <div className="absolute right-3 top-3 z-10 rounded-lg bg-black/55 px-2 py-1 text-[11px] font-bold text-white backdrop-blur">
            +{post.images.length}
          </div>
        )}

        <img
          src={post.cover}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* subtle bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent" />
      </div>

      <div className="flex h-full flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            {formatDateVN(post.date)}
          </span>
          <span className="text-slate-300">•</span>
          <span>{post.author}</span>
          <span className="text-slate-300">•</span>
          <span>{reading} phút đọc</span>
        </div>

        <h3 className="mt-3 line-clamp-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-700">
          {post.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-semibold text-blue-700">Xem chi tiết</span>
          <span className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 group-hover:bg-slate-50">
            Mở →
          </span>
        </div>
      </div>
    </article>
  );
}

function PostModal({ post, onClose }) {
  const [activeImg, setActiveImg] = useState(post.cover);

  useEffect(() => {
    setActiveImg(post.cover);
  }, [post.cover]);

  const imgs = useMemo(() => {
    const arr = [post.cover, ...(post.images || [])].filter(Boolean);
    return Array.from(new Set(arr));
  }, [post.cover, post.images]);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* content */}
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* top bar */}
        <div className="flex items-center justify-between border-b bg-slate-50 px-5 py-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-gradient-to-r from-blue-800 to-sky-600 px-3 py-1 font-bold uppercase tracking-wider text-white">
              {post.category}
            </span>
            <span className="text-slate-500">{formatDateVN(post.date)}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">{post.author}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">
              {calcReadingTime(post.content || post.excerpt || "")} phút đọc
            </span>
          </div>

          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            aria-label="Đóng"
            title="Đóng"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 gap-0 md:grid-cols-12">
          {/* image */}
          <div className="md:col-span-5">
            <div className="h-72 w-full bg-slate-100 md:h-full">
              <img src={activeImg} alt={post.title} className="h-full w-full object-cover" />
            </div>

            {imgs.length > 1 && (
              <div className="border-t bg-white p-3">
                <div className="flex gap-2 overflow-x-auto">
                  {imgs.map((src) => (
                    <button
                      key={src}
                      onClick={() => setActiveImg(src)}
                      className={[
                        "h-16 w-24 flex-none overflow-hidden rounded-xl border",
                        src === activeImg
                          ? "border-blue-500 ring-4 ring-blue-100"
                          : "border-slate-200 hover:border-slate-300",
                      ].join(" ")}
                      title="Xem ảnh"
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* text */}
          <div className="md:col-span-7">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                {post.title}
              </h3>

              {/* divider */}
              <div className="mt-4 h-px w-full bg-slate-200" />

              <div className="mt-4">
                <p className="whitespace-pre-line text-slate-700 leading-relaxed">
                  {post.content || post.excerpt}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Ghi chú: Nội dung hiển thị theo thông tin đăng tải.
                </div>
                <button
                  onClick={onClose}
                  className="rounded-xl bg-gradient-to-r from-blue-700 to-sky-600 px-5 py-2 text-sm font-semibold text-white hover:from-blue-800 hover:to-sky-700"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Helpers */
function formatDateVN(isoDate) {
  if (!isoDate) return "";
  const [y, m, d] = isoDate.split("-");
  return `${d}/${m}/${y}`;
}

function calcReadingTime(text) {
  const words = String(text).trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 180)); // ~180 wpm
  return minutes;
}

function isWithinDays(isoDate, days) {
  if (!isoDate) return false;
  const d = new Date(isoDate);
  const now = new Date();
  const diff = (now - d) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= days;
}

function getNewestDate(list) {
  const dates = list.map((x) => x.date).filter(Boolean).sort();
  return dates[dates.length - 1] || "";
}
