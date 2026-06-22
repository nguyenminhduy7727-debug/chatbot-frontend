export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-10 pb-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                alt="Logo"
                className="w-10 h-10 object-contain"
                src="https://upload.wikimedia.org/wikipedia/vi/0/09/Huy_Hi%E1%BB%87u_%C4%90o%C3%A0n.png"
                loading="lazy"
              />
              <h3 className="text-lg font-bold">Trung tâm Cung Ứng dịch vụ công phường Bình Tân</h3>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              Xung kích - Tình nguyện - Sáng tạo - Hội nhập.
              <br />
              Đồng hành cùng thanh niên lập thân, lập nghiệp và hỗ trợ người dân thực hiện
              dịch vụ công trực tuyến.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-slate-700 pb-2 inline-block">
              Liên hệ
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start">
                <span className="font-semibold mr-2 min-w-[80px]">Địa chỉ:</span>
                <span>436 Đường Bình Hành, phường Bình Tân, TP. Hồ Chí Minh</span>
              </li>

              <li className="flex items-start">
                <span className="font-semibold mr-2 min-w-[80px]">Email:</span>
                <a
                  href="mailto:cungungbinhtan@gmail.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  cungung@gmail.com
                </a>
              </li>

              <li className="flex items-start">
                <span className="font-semibold mr-2 min-w-[80px]">Điện thoại:</span>
                <a
                  href="tel:+84283839XXXX"
                  className="hover:text-blue-400 transition-colors"
                >
                  (028) 3839 xxxx
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-slate-700 pb-2 inline-block">
              Liên kết nhanh
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a
                  href="https://dichvucong.gov.vn"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  Cổng Dịch vụ công Quốc gia
                </a>
              </li>

              {/* ✅ FIX WARNING: đổi a href="#" thành button */}
              <li>
                <button
                  type="button"
                  className="hover:text-blue-400 transition-colors text-left"
                  aria-label="Liên kết Thành Đoàn TP.HCM (đang cập nhật)"
                  title="Liên kết đang cập nhật"
                  onClick={() => {
                    // TODO: Khi có link thật thì thay bằng <a href="..."> hoặc react-router <Link to="...">
                    // Ví dụ: window.open("https://...", "_blank");
                  }}
                >
                  fanpage Cung ứng dịch vụ công Bình Tân:
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 text-center text-xs text-slate-500">
          <p>© {year} Trung tâm Cung Ứng dịch vụ công phường Bình Tân. All rights reserved.</p>
          <p className="mt-1">Thư viện Dịch vụ công điện tử</p>
        </div>
      </div>
    </footer>
  );
}