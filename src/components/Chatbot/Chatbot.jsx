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
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    // 1. BẬT TRẠNG THÁI ĐANG LOAD LÊN (Hiển thị 3 dấu chấm)
    setIsLoading(true);

    try {
      const response = await fetch('https://chatbot-backend-xxx.vercel.app/api/chat', { // Giữ nguyên link của bạn nha
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: userText })
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);

    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: "Lỗi kết nối đến máy chủ." }]);
    } finally {
      // 2. TẮT TRẠNG THÁI LOAD ĐI (Dù gọi API thành công hay lỗi cũng phải tắt)
      setIsLoading(false);
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
             // ... Code hiện tại hiển thị tin nhắn của bạn ...
             <div key={index} className={`message ${msg.sender}`}>{msg.text}</div>
          ))}

          {/* CHÈN THÊM ĐOẠN NÀY VÀO DƯỚI VÒNG LẶP TIN NHẮN */}
          {isLoading && (
            <div className="message bot loading-indicator">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
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