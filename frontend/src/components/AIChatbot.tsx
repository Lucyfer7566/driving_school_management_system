import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

// ── OpenAI Setup ─────────────────────────────────────────────────────
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const OPENAI_MODEL = 'gpt-4o-mini';

const SYSTEM_PROMPT = `Bạn là "Trợ lý Precision Driving" — tư vấn viên ảo thông minh của trung tâm đào tạo lái xe Precision Driving.

## Thông tin trung tâm
- Tên: Precision Driving — Trung tâm đào tạo lái xe
- Giờ làm việc: 7:30 – 17:30, Thứ 2 – Thứ 7
- Hotline: 1900 6868

## Danh mục khóa học & Bảng giá
| Hạng | Tên khóa học | Giá | Thời gian |
|------|-------------|-----|-----------|
| B1   | Xe số tự động (cá nhân) | 12.000.000đ | 3 tháng |
| B2   | Xe số sàn & Số tự động (hành nghề) | 15.000.000đ | 3.5 tháng |
| C     | Xe tải | 20.000.000đ | 4 tháng |

## Chính sách
- Học phí đã bao gồm: lệ phí thi sát hạch, khám sức khỏe, phí cấp bằng.
- Khuyến mãi Hè 2026: giảm 1.000.000đ cho tất cả các hạng.
- Hỗ trợ trả góp 0% qua VNPay và MoMo.
- Hoàn tiền 100% nếu không hài lòng trong 7 ngày đầu.
- Hủy lịch học miễn phí nếu báo trước 24h. Hủy sát giờ sẽ bị tính 1 buổi học.
- Lịch học cuối tuần: có, mỗi Thứ 7 và Chủ nhật.

## Quy tắc trả lời
1. Luôn tư vấn nhiệt tình, ngắn gọn, chuyên nghiệp. Trả lời bằng tiếng Việt.
2. Khi khách hỏi về khóa học, hãy gợi ý khóa phù hợp kèm giá.
3. Khi khách muốn đăng ký / thanh toán, hãy kết thúc câu trả lời bằng ĐÚNG cú pháp sau (trên 1 dòng riêng):
   [ACTION:CHECKOUT:{"id":<database_id_số_nguyên>,"name":"<tên khóa>","category":"<hạng>","duration":"<thời gian>","price":<giá số nguyên>}]
   Mapping ID: B1 → id=1, B2 → id=3, C → id=5
   Ví dụ: [ACTION:CHECKOUT:{"id":3,"name":"Hạng B2 - Xe số sàn & Số tự động","category":"Hạng B2","duration":"3.5 tháng","price":15000000}]
4. KHÔNG bao giờ bịa ra khóa học, giá, hoặc chính sách không có trong bảng trên.
5. Nếu câu hỏi ngoài phạm vi lái xe, hãy từ chối nhẹ nhàng và gợi ý hỏi vấn đề liên quan.`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  action?: { type: string; payload: Record<string, unknown> };
}

// ── Parse action tags from AI response ───────────────────────────────
function parseAction(text: string) {
  const match = text.match(/\[ACTION:CHECKOUT:(.*?)\]/);
  if (match) {
    try {
      const payload = JSON.parse(match[1]);
      const cleanContent = text.replace(/\[ACTION:CHECKOUT:.*?\]/, '').trim();
      return { cleanContent, action: { type: 'CHECKOUT', payload } };
    } catch { /* ignore parse errors */ }
  }
  return { cleanContent: text, action: null };
}

export default function AIChatbot() {
  const { chatOpen, setChatOpen, isLoggedIn, setSelectedCourse } = useAppStore();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Xin chào! 👋 Tôi là Trợ lý ảo của Precision Driving. Bạn cần tư vấn về khóa học lái xe, lịch học, hay bất kỳ thắc mắc gì không? Hãy hỏi tôi nhé!' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Scripted fallback when API is unavailable ─────────────────────
  const getScriptedResponse = (text: string): ChatMessage => {
    const lower = text.toLowerCase();

    if (lower.includes('b2')) {
      if (lower.includes('thanh toán') || lower.includes('đăng ký') || lower.includes('dang ky') || lower.includes('mua')) {
        return {
          role: 'assistant',
          content: 'Tuyệt vời! Khóa Hạng B2 — Xe số sàn & Số tự động (hành nghề) với mức giá 15.000.000đ (đã giảm 1.000.000đ trong chương trình Khuyến mãi Hè 2026). Thời gian học 3.5 tháng.\n\nBấm nút bên dưới để tiến hành thanh toán ngay nhé! 👇',
          action: { type: 'CHECKOUT', payload: { id: 3, name: 'Hạng B2 - Xe số sàn & Số tự động', category: 'Hạng B2', duration: '3.5 tháng', price: 15000000 } },
        };
      }
      return {
        role: 'assistant',
        content: '🚗 **Khóa học Hạng B2 — Xe số sàn & Số tự động (Hành nghề)**\n\n• Học phí: 15.000.000đ (đang giảm 1.000.000đ – Khuyến mãi Hè 2026)\n• Thời gian: 3.5 tháng\n• Bao gồm: Lệ phí thi sát hạch, khám sức khỏe, phí cấp bằng\n• Hỗ trợ trả góp 0% qua VNPay và MoMo\n• Lịch học cuối tuần: Có (Thứ 7 và Chủ nhật)\n\nBạn muốn đăng ký khóa này không? Hãy nhắn "Đăng ký B2" để tôi hỗ trợ thanh toán nhé! 😊',
      };
    }

    if (lower.includes('b1')) {
      if (lower.includes('thanh toán') || lower.includes('đăng ký') || lower.includes('dang ky') || lower.includes('mua')) {
        return {
          role: 'assistant',
          content: 'Khóa Hạng B1 — Xe số tự động (cá nhân) với mức giá 12.000.000đ (đã giảm 1.000.000đ trong chương trình Khuyến mãi Hè 2026). Thời gian học 3 tháng.\n\nBấm nút bên dưới để tiến hành thanh toán! 👇',
          action: { type: 'CHECKOUT', payload: { id: 1, name: 'Hạng B1 - Xe số tự động', category: 'Hạng B1', duration: '3 tháng', price: 12000000 } },
        };
      }
      return {
        role: 'assistant',
        content: '🚗 **Khóa học Hạng B1 — Xe số tự động (Cá nhân)**\n\n• Học phí: 12.000.000đ (đang giảm 1.000.000đ – Khuyến mãi Hè 2026)\n• Thời gian: 3 tháng\n• Bao gồm: Lệ phí thi, khám sức khỏe, cấp bằng\n• Hỗ trợ trả góp 0%\n\nBạn muốn đăng ký không? Hãy nhắn "Đăng ký B1" nhé!',
      };
    }

    if (lower.includes('hạng c') || lower.includes('xe tải') || lower.includes('hang c')) {
      return {
        role: 'assistant',
        content: '🚛 **Khóa học Hạng C — Xe tải**\n\n• Học phí: 20.000.000đ (đang giảm 1.000.000đ – Khuyến mãi Hè 2026)\n• Thời gian: 4 tháng\n• Bao gồm: Lệ phí thi, khám sức khỏe, cấp bằng\n\nBạn muốn đăng ký không? Hãy nhắn "Đăng ký hạng C" nhé!',
      };
    }

    if (lower.includes('khóa học') || lower.includes('khoa hoc') || lower.includes('học lái') || lower.includes('hoc lai') || lower.includes('giá') || lower.includes('bao nhiêu') || lower.includes('bảng giá')) {
      return {
        role: 'assistant',
        content: '📋 **Bảng giá khóa học tại Precision Driving:**\n\n| Hạng | Tên khóa | Giá | Thời gian |\n|------|----------|-----|----------|\n| B1 | Xe số tự động (cá nhân) | 12.000.000đ | 3 tháng |\n| B2 | Xe số sàn & Số tự động (hành nghề) | 15.000.000đ | 3.5 tháng |\n| C | Xe tải | 20.000.000đ | 4 tháng |\n\n🔥 *Khuyến mãi Hè 2026: Giảm 1.000.000đ tất cả hạng!*\n\nBạn quan tâm hạng nào? Cho tôi biết để tư vấn chi tiết nhé!',
      };
    }

    if (lower.includes('lịch') || lower.includes('lich') || lower.includes('hủy') || lower.includes('huy') || lower.includes('đổi') || lower.includes('doi')) {
      return {
        role: 'assistant',
        content: '📅 **Chính sách lịch học:**\n\n• Lịch học cuối tuần: Có (Thứ 7 và Chủ nhật)\n• Hủy lịch miễn phí nếu báo trước **24 giờ**\n• Hủy sát giờ: Bị tính 1 buổi học\n• Đổi lịch: Liên hệ bộ phận CSKH hoặc thao tác trên trang **Lịch học**\n\nBạn có thể vào mục "Lịch học" trên menu để xem và đặt lịch ngay nhé!',
      };
    }

    if (lower.includes('trả góp') || lower.includes('tra gop') || lower.includes('thanh toán') || lower.includes('thanh toan')) {
      return {
        role: 'assistant',
        content: '💳 **Phương thức thanh toán:**\n\n• VNPay (Ví điện tử / QR Code)\n• MoMo (Ví điện tử)\n• Chuyển khoản ngân hàng (VietQR)\n• Hỗ trợ trả góp 0% lãi suất qua VNPay và MoMo\n\nHoàn tiền 100% nếu không hài lòng trong 7 ngày đầu.',
      };
    }

    return {
      role: 'assistant',
      content: 'Cảm ơn bạn đã liên hệ! 😊 Tôi có thể hỗ trợ bạn về:\n\n• Thông tin và bảng giá các khóa học (B1, B2, C)\n• Lịch học và chính sách hủy/đổi lịch\n• Phương thức thanh toán và trả góp\n\nHãy hỏi tôi bất kỳ điều gì liên quan đến việc học lái xe nhé! Hoặc nhắn **"Bảng giá"** để xem danh sách khóa học.',
    };
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Build messages array for OpenAI
      const openaiMessages = [
        { role: 'system' as const, content: SYSTEM_PROMPT },
        ...messages.map(m => ({
          role: m.role === 'assistant' ? 'assistant' as const : 'user' as const,
          content: m.content,
        })),
        { role: 'user' as const, content: trimmed },
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          messages: openaiMessages,
          max_tokens: 1024,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const rawText = data.choices?.[0]?.message?.content || 'Xin lỗi, tôi không thể phản hồi lúc này.';
      const { cleanContent, action } = parseAction(rawText);

      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: cleanContent,
        ...(action ? { action: action as ChatMessage['action'] } : {}),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('OpenAI API error, switching to scripted fallback:', err);
      // Fallback: use scripted response so the demo never breaks
      const fallbackMsg = getScriptedResponse(trimmed);
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = (payload: Record<string, unknown>) => {
    if (!isLoggedIn) {
      navigate('/auth');
      setChatOpen(false);
      return;
    }
    setSelectedCourse({
      id: String(payload.id),
      name: String(payload.name),
      category: String(payload.category),
      duration: String(payload.duration),
      price: Number(payload.price),
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
    });
    navigate('/checkout');
    setChatOpen(false);
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary w-16 h-16 rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        aria-label="Mở trợ lý ảo"
      >
        {chatOpen ? (
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/><circle cx="8" cy="10" r="1.2"/><circle cx="12" cy="10" r="1.2"/><circle cx="16" cy="10" r="1.2"/></svg>
        )}
      </button>

      {/* Chat panel */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[400px] max-h-[600px] bg-white rounded-3xl shadow-2xl border border-surface-variant/30 flex flex-col overflow-hidden animate-in">
          {/* Header */}
          <div className="bg-primary text-on-primary px-6 py-4 flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 110 2h-1.07A7.001 7.001 0 0113 22h-2a7.001 7.001 0 01-6.93-6H3a1 1 0 110-2h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2zm0 7a5 5 0 00-5 5 5 5 0 005 5h0a5 5 0 005-5 5 5 0 00-5-5zm-2 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm4 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/></svg>
            </div>
            <div>
              <h3 className="font-bold text-lg">Trợ lý Precision</h3>
              <p className="text-xs opacity-80">Tư vấn 24/7 bằng AI</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-container-lowest" style={{ minHeight: 300, maxHeight: 420 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-primary text-on-primary rounded-br-md'
                    : 'bg-white border border-surface-variant/40 text-on-surface rounded-bl-md shadow-sm'
                }`}>
                  {msg.content}

                  {/* Action button */}
                  {msg.action?.type === 'CHECKOUT' && (
                    <button
                      onClick={() => handleCheckout(msg.action!.payload)}
                      className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-md"
                    >
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.17 14.75l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0020 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25z"/></svg>
                      Thanh toán khóa học này
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-surface-variant/40 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-surface-variant/30 bg-white flex gap-2 flex-shrink-0">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-4 py-3 rounded-xl border border-outline/30 text-sm focus:outline-none focus:border-primary bg-surface-container-lowest"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-primary text-on-primary px-4 py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:hover:scale-100"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
