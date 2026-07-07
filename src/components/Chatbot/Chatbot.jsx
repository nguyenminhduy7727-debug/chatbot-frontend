import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './Chatbot.css';
// Import file dữ liệu (bạn có thể gửi cái này lên backend sau)


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Xin chào! Tôi là Trợ lý ảo của Trung tâm Cung ứng dịch vụ công phường Bình Tân. Bạn cần hỏi thông tin gì?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLonading] = useState(false);
  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    // 1. BẬT TRẠNG THÁI ĐANG LOAD LÊN (Hiển thị 3 dấu chấm)
    setIsLoading(true);

    try {
      const response = await fetch('https://chatbot-backend-bice.vercel.app/api/chat', { // Giữ nguyên link của bạn nha
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: userText })
      });

      const data = await response.json();
    if (data.reply) {
        // Nếu AI trả lời đàng hoàng thì in ra
        setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
      } else {
        // Nếu Backend báo lỗi hoặc trả về rỗng (bị quá tải)
        console.error("Lỗi từ máy chủ:", data);
        setMessages((prev) => [...prev, { 
          sender: 'bot', 
          text: "Hệ thống đang quá tải hoặc máy chủ đang khởi động lại. Bạn vui lòng thử lại sau vài giây nhé! ⚙️" 
        }]);
      }

    } catch (error) {
      setMessages((prev) => [...prev, { 
        sender: 'bot', 
        text: "Lỗi kết nối mạng hoặc máy chủ không phản hồi. Vui lòng kiểm tra lại!" 
      }]);
    } finally {
      setIsLoading(false); // Dù lỗi hay không cũng phải tắt 3 dấu chấm đi
    }
  };

 return (
    <div className="chatbot-container">
      {/* Nút bấm tròn màu đỏ bên ngoài */}
      {!isOpen && (
        <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}

      {/* Khung chat */}
      {isOpen && (
        <div className="chat-window">
          {/* Thanh tiêu đề */}
          <div className="chat-header">
            <div className="header-info">
              <span className="bot-name">Trợ lý CUNG ỨNG BÌNH TÂN</span>
              <span className="bot-status">Đang hoạt động</span>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
          </div>

          {/* Nội dung chat */}
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
            
            {/* Hiệu ứng 3 dấu chấm (nếu bạn có dùng) */}
            {isLoading && (
              <div className="message bot loading-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
          </div>

          {/* Khu vực nhập chữ */}
          <div className="chat-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Nhập câu hỏi của bạn..."
            />
            <button className="send-btn" onClick={handleSend}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Chatbot;