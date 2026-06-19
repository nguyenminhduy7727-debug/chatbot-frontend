import { useEffect, useMemo, useState } from "react";
import exploreData from "../../Datanew/explore.json";

const TABS = [
  { key: "all", label: "Tất cả", icon: "✨" },
  { key: "sieu-thi", label: "Siêu Thị", icon: "🛒" },
  { key: "van-hoa", label: "Văn hóa", icon: "🏛️" },
  { key: "am-thuc", label: "Ẩm thực", icon: "🍜" },
];

const CATEGORY_LABEL = {
  "sieu-thi": "Siêu thị",
  "van-hoa": "Văn hoá",
  "am-thuc": "Ẩm thực",
  all: "Tất cả",
};

function CategoryBadge({ category }) {
  const map = {
    "sieu-thi": "from-emerald-500 to-teal-500",
    "van-hoa": "from-fuchsia-500 to-pink-500",
    "am-thuc": "from-orange-500 to-rose-500",
    all: "from-sky-500 to-blue-600",
  };
  const label = CATEGORY_LABEL[category] || "Khác";
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-white shadow-sm",
        "bg-gradient-to-r",
        map[category] || "from-slate-500 to-gray-600",
      ].join(" ")}
    >
      <span className="opacity-95">●</span>
      {label}
    </span>
  );
}

export default function Explore() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPost, setSelectedPost] = useState(null);

  const filteredPosts = useMemo(() => {
    if (activeTab === "all") return exploreData;
    return exploreData.filter((item) => item.category === activeTab);
  }, [activeTab]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedPost(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="relative">
      {/* Background vibe */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-300/40 to-blue-500/30 blur-2xl" />
        <div className="absolute top-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-pink-300/40 to-fuchsia-500/30 blur-2xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-300/30 to-teal-500/20 blur-2xl" />
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/60 p-8 shadow-xl shadow-blue-500/10 backdrop-blur">
          <div className="absolute right-6 top-6 hidden md:block">
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 p-[1px] shadow-lg">
              <div className="rounded-2xl bg-white/80 px-4 py-3 text-sm font-medium text-gray-800">
                📍 Bình Tân • Khám phá ngay
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            Khám phá <span className="bg-gradient-to-r from-blue-700 to-sky-500 bg-clip-text text-transparent">Bình Tân</span>
          </h2>
          <p className="mt-3 max-w-2xl text-gray-700">
            Vùng đất giàu truyền thống lịch sử & văn hóa đặc sắc — chọn danh mục bên dưới và “lướt” một vòng cho đã mắt.
          </p>

          {/* Tabs */}
          <div className="mt-6 flex flex-wrap gap-3">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={[
                    "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                    "ring-1 ring-inset",
                    isActive
                      ? "bg-gradient-to-r from-blue-700 to-sky-500 text-white ring-transparent shadow-lg shadow-blue-500/25"
                      : "bg-white/80 text-gray-700 ring-gray-200 hover:bg-white hover:shadow-md hover:-translate-y-0.5",
                  ].join(" ")}
                >
                  <span className={isActive ? "" : "group-hover:scale-110 transition-transform"}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="ml-1 inline-flex h-2 w-2 animate-pulse rounded-full bg-white/90" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className={[
                "group relative overflow-hidden rounded-3xl border border-gray-100 bg-white",
                "shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer",
              ].join(" ")}
            >
              {/* Image */}
              <div className="relative h-52 bg-gray-100 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-90" />

                <div className="absolute left-4 top-4">
                  <CategoryBadge category={post.category} />
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-extrabold text-white leading-snug line-clamp-2 drop-shadow">
                    {post.title}
                  </h3>
                  <div className="mt-1 text-xs text-white/85 line-clamp-1">
                    📌 <span className="font-semibold">{post.address}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* tags */}
                {!!(post.tags || []).length && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(post.tags || []).slice(0, 6).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200"
                      >
                        #{t}
                      </span>
                    ))}
                    {(post.tags || []).length > 6 && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                        +{(post.tags || []).length - 6}
                      </span>
                    )}
                  </div>
                )}

                {/* CTA */}
                <div className="mt-5 flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPost(post);
                    }}
                    className={[
                      "flex-1 rounded-2xl py-2.5 font-semibold text-white",
                      "bg-gradient-to-r from-blue-700 to-sky-500",
                      "shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition",
                    ].join(" ")}
                  >
                    Xem chi tiết
                  </button>

                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 group-hover:bg-gray-50 transition">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M13 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* subtle corner glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-sky-300/0 to-blue-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition" />
            </article>
          ))}
        </div>

        {/* Empty */}
        {filteredPosts.length === 0 && (
          <div className="mt-10 rounded-3xl border border-gray-200 bg-white/70 p-10 text-center text-gray-700 shadow-sm backdrop-blur">
            <div className="text-4xl">😅</div>
            <div className="mt-3 font-semibold">Chưa có bài viết trong danh mục này.</div>
            <div className="mt-1 text-sm text-gray-600">Bạn thử chọn danh mục khác nhé!</div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

              <div className="absolute left-5 top-5 flex items-center gap-2">
                <CategoryBadge category={selectedPost.category} />
                {!!(selectedPost.tags || []).length && (
                  <span className="hidden sm:inline-flex rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-gray-800">
                    🔥 Hot
                  </span>
                )}
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg transition"
                aria-label="Đóng"
              >
                ✕
              </button>

              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow">
                  {selectedPost.title}
                </h3>
                <p className="mt-2 text-white/90">
                  📌 <span className="font-semibold">{selectedPost.address}</span>
                </p>
              </div>
            </div>

            <div className="p-6 md:p-7">
              {!!(selectedPost.tags || []).length && (
                <div className="flex flex-wrap gap-2">
                  {(selectedPost.tags || []).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-5 text-gray-800 leading-relaxed whitespace-pre-line">
                {selectedPost.content ? selectedPost.content : selectedPost.excerpt}
              </div>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="sm:flex-1 py-3 rounded-2xl border border-gray-200 text-gray-800 hover:bg-gray-50 transition font-semibold"
                >
                  Đóng
                </button>

                <button
                  onClick={() => alert("Bạn có thể điều hướng sang trang chi tiết sau nhé!")}
                  className="sm:flex-1 py-3 rounded-2xl bg-gradient-to-r from-blue-700 to-sky-500 text-white hover:brightness-105 transition font-semibold shadow-lg shadow-blue-500/20"
                >
                  Đi tới bài viết
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
