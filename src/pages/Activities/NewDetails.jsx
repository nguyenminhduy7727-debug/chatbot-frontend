import { useParams, Link } from "react-router-dom";
import { news } from "../../Datanew/news";

export default function NewsDetail() {
  const { slug } = useParams();
  const item = news.find((n) => n.slug === slug);

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-10">
        <p>Không tìm thấy bài viết.</p>
        <Link to="/tin-tuc" className="text-blue-700 hover:underline">← Quay lại Tin tức</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/tin-tuc" className="text-blue-700 hover:underline">← Quay lại</Link>

      <h1 className="text-3xl font-bold text-gray-900 mt-4">{item.title}</h1>
      <p className="text-sm text-gray-500 mt-2">{item.date}</p>

      <img src={item.cover} alt={item.title} className="w-full max-h-[420px] object-cover rounded-2xl mt-6" />

      <div
        className="prose max-w-none mt-6"
        dangerouslySetInnerHTML={{ __html: item.content }}
      />
    </div>
  );
}
