import React, { useState } from 'react';
import { BLOOD_KNOWLEDGE_BASE } from './data/bloodKnowledge';

const BloodAI = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: '🏥 **Karibu kwenye BloodLink Medical Corner!** 🩸\n\nMimi ni **BloodLink Professional AI Assistant**. Nipo hapa kutoa ushauri wa kitaalamu wa afya, ufafanuzi wa makundi ya damu, vigezo vya kuchangia, na kuondoa hofu yoyote.\n\n*Je, nikusaidie nini leo Shujaa?*'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Quick Local Knowledge Base Search
  const findLocalAnswer = (query) => {
    const cleanQuery = query.toLowerCase();
    for (const item of BLOOD_KNOWLEDGE_BASE) {
      if (item.keywords.some((key) => cleanQuery.includes(key))) {
        return item.answer;
      }
    }
    return null;
  };

  // Advanced Groq API with 20 Professional System Instructions
  const fetchGroqAIAnswer = async (userQuery) => {
    try {
      const systemPrompt = `Wewe ni BloodLink Professional AI Assistant - Daktari Bingwa na Msaidizi Mtaalamu wa Afya na Mifumo ya Utoaji Damu.
Unapaswa kufuata miongozo hii 20 kwa umakini mkubwa:
1. Anza na ukaribisho mchangamfu na wa heshima.
2. Jibu kwa Kiswahili sanifu, fasaha na kinachoeleweka kwa urahisi.
3. Tumia Bold, Bullet points, na maumbo ya kugawa maelezo ili yasomeke vizuri.
4. Tumia Emoji za afya (🩸, 🏥, ❤️, 💡, ✅, ⚠️).
5. Kama swali ni la dharura, mpe ushauri wa kwanza na mssititize kwenda hospitali haraka.
6. Tengua dhana potofu za utoaji damu kwa kutoa ukweli wa kisayansi.
7. Malizia na kauli mbiu au hamasa ya kuokoa maisha.
8. Majibu yawe mafupi, yaliyoenda shule (maneno 100-250).
9. Kumbusha vigezo vya kuchangia damu: Umri 18-65, Uzito 50kg+, Afya njema.
10. Msisitize usiri wa taarifa za afya.
11. Ushauri wa kunywa maji mengi na kula kabla ya kuchangia.
12. Kuepuka mazoezi magumu na pombe kwa masaa 24 baada ya kuchangia.
13. Heshima na utaalamu kwenye maswali ya wanawake.
14. Taarifa sahihi za uoanifu wa makundi ya damu.
15. Kutoa matumaini na amani.
16. Kumbusha kuwa vipimo vya afya ni bure wakati wa kuchangia.
17. Jibu maswali ya afya ya jumla kwa ufasaha.
18. Kama muulizaji katumia Kiingereza, mjibu kwa Kiingereza mchangamfu.
19. Usishauri kunywa dawa za hospitali bila cheti cha daktari.
20. Kuwa Balozi wa mfumo wa BloodLink.`;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userQuery }
          ],
          temperature: 0.5,
          max_tokens: 1024
        })
      });

      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Groq Error:', error);
      return "⚠️ **Taarifa ya Mfumo:** Kuna hitilafu ndogo ya mtandao. Lakini unaweza kutumia vifungo vya haraka hapo juu kupata elimu rasmi ya afya na damu!";
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userQuery = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userQuery }]);
    setInput('');
    setLoading(true);

    const localAnswer = findLocalAnswer(userQuery);

    if (localAnswer) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: 'ai', text: localAnswer }]);
        setLoading(false);
      }, 300);
    } else {
      const aiAnswer = await fetchGroqAIAnswer(userQuery);
      setMessages((prev) => [...prev, { sender: 'ai', text: aiAnswer }]);
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '720px',
      margin: '25px auto',
      padding: '24px',
      background: '#0B0C10',
      borderRadius: '20px',
      color: '#fff',
      border: '2px solid #FF0033',
      boxShadow: '0 0 30px rgba(255, 0, 51, 0.35)',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Header with Glowing Effect */}
      <div style={{ textAlign: 'center', marginBottom: '18px' }}>
        <h2 style={{
          color: '#FF0033',
          fontSize: '2rem',
          fontWeight: '700',
          margin: '0',
          textShadow: '0 0 12px rgba(255, 0, 51, 0.7)'
        }}>
          🩸 BloodLink Professional AI
        </h2>
        <p style={{ color: '#00F5D4', fontSize: '0.95rem', margin: '6px 0 0 0', fontWeight: '500' }}>
          Msaidizi Wako Mahiri wa Afya na Uchangiaji Damu Salama
        </p>
      </div>

      {/* Quick FAQ Chips */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '14px' }}>
        {BLOOD_KNOWLEDGE_BASE.map((faq) => (
          <button
            key={faq.id}
            onClick={() => setInput(faq.question)}
            style={{
              background: '#1F2833',
              color: '#FFD700',
              border: '1px solid #FF0033',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 0 8px rgba(255, 0, 51, 0.2)'
            }}
          >
            {faq.question}
          </button>
        ))}
      </div>

      {/* Chat Messages Viewport */}
      <div style={{
        height: '400px',
        overflowY: 'auto',
        background: '#12131C',
        padding: '18px',
        borderRadius: '14px',
        border: '1px solid #2A2D3E',
        marginBottom: '16px'
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '14px 0' }}>
            <div style={{
              background: msg.sender === 'user' 
                ? 'linear-gradient(135deg, #FF0033, #B30024)' 
                : '#1A1C29',
              color: '#FFFFFF',
              padding: '14px 18px',
              borderRadius: msg.sender === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
              display: 'inline-block',
              maxWidth: '88%',
              whiteSpace: 'pre-line',
              lineHeight: '1.6',
              fontSize: '1rem',
              border: msg.sender === 'ai' ? '1px solid #2E3248' : 'none',
              boxShadow: msg.sender === 'user' ? '0 0 12px rgba(255, 0, 51, 0.4)' : 'none',
              textAlign: 'left'
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ textAlign: 'left', margin: '10px 0' }}>
            <span style={{
              color: '#FFD700',
              fontStyle: 'italic',
              fontSize: '0.9rem',
              background: '#1A1C29',
              padding: '8px 16px',
              borderRadius: '12px',
              border: '1px solid #FF0033',
              display: 'inline-block'
            }}>
              🧠 BloodLink AI inachakata majibu ya kitaalamu...
            </span>
          </div>
        )}
      </div>

      {/* Form Input */}
      <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Andika swali lako hapa (mif: Vigezo vya kutoa damu ni yapi?)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: '14px 16px',
            borderRadius: '10px',
            border: '1px solid #3A3D52',
            background: '#151722',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          style={{
            background: 'linear-gradient(45deg, #FF0033, #99001F)',
            color: '#fff',
            border: 'none',
            padding: '0 26px',
            borderRadius: '10px',
            fontWeight: '700',
            cursor: 'pointer',
            fontSize: '1rem',
            boxShadow: '0 0 15px rgba(255, 0, 51, 0.5)'
          }}
        >
          Tuma
        </button>
      </form>
    </div>
  );
};

export default BloodAI;
