export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up">
        <div className="bg-blue-700 p-6 text-center">
          <div className="mx-auto flex items-center justify-center mb-4">
            <img
              alt="Logo"
              className="w-24 h-24 object-contain filter drop-shadow-sm"
              src="https://upload.wikimedia.org/wikipedia/vi/0/09/Huy_Hi%E1%BB%87u_%C4%90o%C3%A0n.png"
            />
          </div>
          <h2 className="text-2xl font-bold text-white uppercase">Đăng nhập hệ thống</h2>
          <p className="text-blue-100 text-sm mt-1">Dành cho Cán bộ Đoàn &amp; Quản trị viên</p>
        </div>

        <form className="p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Tên đăng nhập</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Nhập tên đăng nhập..."
              type="text"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Mật khẩu</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••"
              type="password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}