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

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    // Cập nhật tin nhắn user lên UI ngay lập tức
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    try {
      // Gọi lên Backend (đang chạy ở port 5000)
      const response = await fetch('https://chatbot-backend-bice.vercel.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: userText })
      });
      
      const data = await response.json();

      // Thêm câu trả lời của Gemini vào UI
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
      
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: "Lỗi kết nối đến máy chủ." }]);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Khung chat */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h4>Trợ lý hành chính công</h4>
            <button onClick={toggleChat}>X</button>
          </div>
          
            <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {/* Nếu là bot thì dùng ReactMarkdown để dịch chữ in đậm/xuống dòng */}
                {msg.sender === 'bot' ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  /* Nếu là người dùng thì in chữ bình thường */
                  msg.text
                )}
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Gửi</button>
          </div>
        </div>
      )}

      {/* Nút bong bóng chat */}
      <div className="chat-bubble" onClick={toggleChat}>
        💬
      </div>
    </div>
  );
};

export default Chatbot;