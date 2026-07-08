export default function About() {
  const mission = [
    "Tiên phong chuyển đổi số trong dịch vụ công.",
    "Hỗ trợ người dân tiếp cận công nghệ.",
    "Giữ gìn bản sắc văn hóa địa phương.",
  ];

  const achievements = [
    "Chi đoàn vững mạnh xuất sắc nhiều năm liền.",
    "Công trình thanh niên tiêu biểu cấp Quận.",
    "100% đoàn viên hoàn thành tốt nhiệm vụ.",
  ];

  const highlights = [
    { label: "Đoàn viên", value: "100%" },
    { label: "Vai trò", value: "Nòng cốt" },
    { label: "Định hướng", value: "Chuyển đổi số" },
    { label: "Hoạt động", value: "An sinh" },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50">
      {/* nền nhẹ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-sky-200/35 blur-3xl" />
        <div className="absolute top-32 -right-24 h-96 w-96 rounded-full bg-emerald-200/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-200/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/65 to-slate-50" />
      </div>

      <div className="relative">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <div className="mx-auto max-w-6xl">
            {/* HERO */}
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Thông tin Cung ứng dịch vụ công Bình Tân
                </div>

                <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl">
                  Chi đoàn Văn phòng{" "}
                  <span className="bg-gradient-to-r from-sky-700 via-blue-700 to-emerald-700 bg-clip-text text-transparent">
                    HĐND &amp; UBND
                  </span>{" "}
                  Phường Bình Tân
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  Lực lượng nòng cốt trong các phong trào thanh niên tại địa
                  phương — tiên phong chuyển đổi số, cải cách hành chính và đồng
                  hành an sinh xã hội.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href="#about"
                    className="inline-flex items-center justify-center rounded-xl bg-slate-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-900"
                  >
                    Khám phá nội dung
                  </a>
                  <a
                    href="#structure"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    Xem cơ cấu tổ chức
                  </a>
                </div>
                {/* Stats (trắng, shadow, chữ to hơn, 2 trên 2 dưới) */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="
                                  rounded-2xl bg-white px-4 py-4
                                  shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)]
                                  ring-1 ring-slate-200/70
                                  transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-22px_rgba(15,23,42,0.45)]
                                "
                    >
                      <div className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight text-slate-800">
                        {h.value}
                      </div>
                      <div className="mt-1 text-xs sm:text-sm leading-tight text-slate-600">
                        {h.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual card */}
              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-transparent to-amber-500/10" />
                  <div className="relative p-5">
                    <div className="overflow-hidden rounded-2xl">
                      <img
                        src="/images/doanthanhnien.jpg"
                        alt="Banner Đoàn"
                        className="h-64 w-full object-cover sm:h-72"
                      />
                    </div>

                    <div className="mt-5 space-y-3">
                      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            Tinh thần hành động
                          </p>
                          <p className="text-xs text-slate-500">
                            “Đâu cần thanh niên có, việc gì khó có thanh niên”
                          </p>
                        </div>
                        <span className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
                          Sẵn sàng
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <MiniTag>Chuyển đổi số</MiniTag>
                        <MiniTag>Cải cách hành chính</MiniTag>
                        <MiniTag>An sinh xã hội</MiniTag>
                        <MiniTag>Văn hoá</MiniTag>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="mt-10 grid gap-6 lg:grid-cols-12" id="about">
              {/* About text */}
              <div className="lg:col-span-7">
                <Card>
                  <SectionTitle kicker="Giới thiệu" title="Về chúng tôi" />
                  <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
                    <p>
                      Chi đoàn Văn phòng HĐND &amp; UBND Phường Bình Tân là lực
                      lượng nòng cốt trong các phong trào thanh niên tại địa
                      phương. Với tinh thần “Đâu cần thanh niên có, việc gì khó
                      có thanh niên”, chúng tôi luôn tiên phong trong công tác
                      chuyển đổi số, cải cách hành chính và các hoạt động an
                      sinh xã hội.
                    </p>
                    <p>
                      Chi đoàn không chỉ tập trung vào công tác chuyên môn mà
                      còn tích cực tham gia bảo tồn và phát huy các giá trị văn
                      hóa lịch sử lâu đời của vùng đất Bình Tân.
                    </p>
                  </div>
                </Card>

                <div className="mt-6">
                  <Card>
                    <SectionTitle kicker="Hoạt động" title="Dấu ấn nổi bật" />
                    <div className="mt-5 space-y-4">
                      <TimelineItem
                        title="Chuyển đổi số"
                        desc="Hỗ trợ người dân tiếp cận dịch vụ công, quy trình số hoá minh bạch và thuận tiện."
                      />
                      <TimelineItem
                        title="Cải cách hành chính"
                        desc="Đồng hành hỗ trợ, góp phần cải thiện trải nghiệm người dân tại bộ phận một cửa."
                      />
                      <TimelineItem
                        title="An sinh xã hội"
                        desc="Tham gia hoạt động cộng đồng, hỗ trợ hoàn cảnh khó khăn và các chương trình thiện nguyện."
                      />
                      <TimelineItem
                        title="Văn hoá – lịch sử"
                        desc="Góp phần giữ gìn, lan toả giá trị văn hoá địa phương qua hoạt động truyền thông."
                      />
                    </div>
                  </Card>
                </div>
              </div>

              {/* Mission + Achievements */}
              <div className="lg:col-span-5 space-y-6">
                <Card>
                  <SectionTitle kicker="Định hướng" title="Sứ mệnh" />
                  <ul className="mt-4 space-y-3 text-slate-600">
                    {mission.map((t, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card>
                  <SectionTitle kicker="Ghi nhận" title="Thành tích" />
                  <ul className="mt-4 space-y-3 text-slate-600">
                    {achievements.map((t, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-amber-500" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>

            {/* Structure */}
            <div className="mt-10" id="structure">
              <Card>
                <SectionTitle kicker="Nhân sự" title="Cơ cấu tổ chức" />
                <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                  <p className="text-slate-500 italic">
                    Sơ đồ tổ chức đang được cập nhật...
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- UI bits ---------- */

function Card({ children }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      {children}
    </div>
  );
}

function SectionTitle({ kicker, title }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          {kicker}
        </p>
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-800">
          {title}
        </h2>
      </div>
      <span className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
        Bình Tân
      </span>
    </div>
  );
}

function MiniTag({ children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-center text-xs text-slate-600">
      {children}
    </div>
  );
}

function TimelineItem({ title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <span className="mt-1 h-3 w-3 rounded-full bg-sky-600" />
        <span className="mt-2 h-full w-px bg-slate-200" />
      </div>
      <div className="pb-2">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{desc}</p>
      </div>
    </div>
  );
}
