import React, { useState, useEffect } from 'react';
import './App.css';
import BloodAI from './bloodAI';
// Default Gallery & Media Uploads Managed by Admin
const defaultAdminGallery = [
  {
    id: 1,
    title: "Mchangiaji Akisaidia Kuokoa Maisha",
    category: "Hero Gallery",
    type: "image",
    url: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80",
    caption: "Mchango wako wa leo ni matumaini ya mtu mwingine kesho."
  },
  {
    id: 2,
    title: "Uhifadhi Salama wa Damu Hospitalini",
    category: "Blood Bank",
    type: "image",
    url: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
    caption: "Chupa za damu zikaguliwa na kuhifadhiwa kwa viwango vya AES/Cold-Chain."
  }
];

// Health Facilities Directory
const healthFacilitiesData = [
  {
    id: "HOSP-001",
    name: "Hospitali ya Taifa Muhimbili (MNH)",
    region: "Dar es Salaam",
    district: "Ilala",
    type: "National Referral Hospital",
    emergencyPhone: "+255 22 215 1377",
    bloodBankDirect: "+255 22 215 0302",
    email: "bloodbank@muhimbili.or.tz",
    address: "Barabara ya Malik, Upanga, Dar es Salaam",
    departments: [
      { name: "Idara Kuu ya Benki ya Damu", head: "Dr. A. Hassan", phone: "+255 713 000 111" },
      { name: "Kitengo cha Dharura (EMD)", head: "Dr. F. Massawe", phone: "+255 713 000 112" }
    ]
  },
  {
    id: "HOSP-002",
    name: "Hospitali ya Rufaa ya Kanda Mbeya (MZRH)",
    region: "Mbeya",
    district: "Mbeya Mjini",
    type: "Zonal Referral Hospital",
    emergencyPhone: "+255 25 250 3456",
    bloodBankDirect: "+255 25 250 3457",
    email: "bloodbank@mzrh.go.tz",
    address: "Eneo la Hospitali, Mbeya",
    departments: [
      { name: "Benki ya Damu ya Kanda ya Nyanda za Juu Kusini", head: "Dr. K. Mwakyusa", phone: "+255 754 222 333" },
      { name: "Kitengo cha Bima na Uhifadhi", head: "Bw. C. Mwalimu", phone: "+255 754 222 334" }
    ]
  }
];

const bloodCompatibilityMatrix = {
  "O-": { give: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"], receive: ["O-"] },
  "O+": { give: ["O+", "A+", "B+", "AB+"], receive: ["O-", "O+"] },
  "A-": { give: ["A-", "A+", "AB-", "AB+"], receive: ["O-", "A-"] },
  "A+": { give: ["A+", "AB+"], receive: ["O-", "O+", "A-", "A+"] },
  "B-": { give: ["B-", "B+", "AB-", "AB+"], receive: ["O-", "B-"] },
  "B+": { give: ["B+", "AB+"], receive: ["O-", "O+", "B-", "B+"] },
  "AB-": { give: ["AB-", "AB+"], receive: ["O-", "A-", "B-", "AB-"] },
  "AB+": { give: ["AB+"], receive: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"] }
};

// PROFESSIONAL BLOOD AI ASSISTANT COMPONENT (Powered by Groq API)
function BloodAIComponent() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 Habari! Mimi ni **BloodLink AI**, mtaalamu wako wa afya na uchangiaji damu. 🩸 Je, una swali gani kuhusu afya, makundi ya damu, au mahitaji ya dharura leo? 🏥' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage;
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    if (!apiKey) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: '⚠️ **Samahani sana!** Ufunguo wa **Groq API Key** haujasanifiwa kwenye faili la `.env` (`VITE_GROQ_API_KEY`). Tafadhali iweke ili uweze kupata majibu ya kina ya kiprofessional. 🩺' 
        }]);
        setLoading(false);
      }, 1000);
      return;
    }

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [
            { 
              role: 'system', 
              content: 'Wewe ni mtaalamu bingwa wa afya na mfumo wa damu salama wa BloodLink. Jibu maswali kwa lugha ya Kiswahili fasaha, ukitumia muundo wa kiprofessional wenye bolding, emoji za kiafya, na maelezo ya kina ya kusisimua na kuelimisha kama ChatGPT au Gemini.' 
            },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMsg }
          ],
          temperature: 0.7
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        const aiReply = data.choices[0].message.content;
        setMessages(prev => [...prev, { role: 'assistant', content: aiReply }]);
      } else {
        throw new Error('Imeshindikana kupata majibu kutoka Groq API.');
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '❌ **Kosa la Mfumo:** Kumekuwa na tatizo la kuunganishwa na mtandao wa AI. Tafadhali jaribu tena baada ya muda mfupi. 🔄' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blood-ai-container" style={{ background: '#12141c', border: '1px solid #1f2833', borderRadius: '16px', padding: '24px', margin: '30px 0', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', borderBottom: '1px solid #1f2833', paddingBottom: '12px' }}>
        <span style={{ fontSize: '28px' }}>🤖</span>
        <div>
          <h3 style={{ color: '#66fcf1', margin: '0', fontSize: '20px' }}>BloodLink AI Health Assistant</h3>
          <p style={{ color: '#c5c6c7', margin: '0', fontSize: '13px' }}>Muulize chochote kuhusu afya, damu salama na miongozo ya dharura 💡</p>
        </div>
      </div>
      
      <div style={{ maxHeight: '350px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px', paddingRight: '8px' }}>
        {messages.map((m, idx) => (
          <div key={idx} style={{ 
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            background: m.role === 'user' ? '#1f2833' : '#1b2a32',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '12px',
            maxWidth: '85%',
            lineHeight: '1.5',
            border: m.role === 'assistant' ? '1px solid #45a29e' : 'none'
          }}>
            <div dangerouslySetInnerHTML={{ __html: m.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </div>
        ))}
        {loading && <div style={{ color: '#45a29e', fontStyle: 'italic' }}>🩺 AI inachakata swali lako kwa umakini...</div>}
      </div>

      <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={inputMessage} 
          onChange={(e) => setInputMessage(e.target.value)} 
          placeholder="Andika swali lako hapa (mf. Ninawezaje kuchangia damu?)..." 
          style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #45a29e', background: '#0b0c10', color: '#fff', outline: 'none' }}
        />
        <button type="submit" style={{ background: '#ff4d4d', color: '#fff', border: 'none', padding: '0 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Tuma 🚀</button>
      </form>
    </div>
  );
}

function App() {
  const [page, setPage] = useState('home'); // home, donor, request, admin
  const [selectedGroup, setSelectedGroup] = useState('O-');
  const [selectedFacility, setSelectedFacility] = useState(healthFacilitiesData[0]);
  
  // PWA Install States
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('Mtumiaji amekubali ku-install BloodLink');
    }
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  // Live Emergency Requests State
  const [liveRequests, setLiveRequests] = useState([
    { id: "REQ-01", hospital: "Muhimbili National Hospital", patient: "Fatuma Hassan", blood: "O-", units: 3, urgency: "CRITICAL", date: "2026-10-18 08:30" },
    { id: "REQ-02", hospital: "Mbeya Referral Hospital", patient: "Kelman M.", blood: "B+", units: 2, urgency: "URGENT", date: "2026-10-18 10:15" }
  ]);

  // Blood Stock Units per Group (Admin Managed)
  const [bloodStockUnits, setBloodStockUnits] = useState({
    "A+": 42, "A-": 12,
    "B+": 38, "B-": 8,
    "AB+": 19, "AB-": 5,
    "O+": 85, "O-": 14
  });

  // Gallery & Media Upload State
  const [galleryMedia, setGalleryMedia] = useState(defaultAdminGallery);
  const [uploadForm, setUploadForm] = useState({ title: '', type: 'image', url: '', category: 'Community Drive', caption: '' });

  // Donor Registration State
  const [donorForm, setDonorForm] = useState({ name: '', phone: '', email: '', location: 'Dar es Salaam', blood: 'O+', weight: '', agreed: false });
  const [registeredCard, setRegisteredCard] = useState(null);

  // Handle Admin Media Upload
  const handleMediaUpload = (e) => {
    e.preventDefault();
    if (!uploadForm.title || !uploadForm.url) {
      alert("Tafadhali jaza Jina na URL/File ya Medias!");
      return;
    }
    const newMediaItem = {
      id: Date.now(),
      title: uploadForm.title,
      type: uploadForm.type,
      url: uploadForm.url,
      category: uploadForm.category,
      caption: uploadForm.caption || "Imepakiwa na Admin wa Mfumo."
    };
    setGalleryMedia([newMediaItem, ...galleryMedia]);
    setUploadForm({ title: '', type: 'image', url: '', category: 'Community Drive', caption: '' });
    alert("Faili/Picha/Video imepakiwa na kuhifadhiwa kikamilifu!");
  };

  const handleDeleteMedia = (id) => {
    if (window.confirm("Una uhakika unataka kufuta maudhui haya?")) {
      setGalleryMedia(galleryMedia.filter(m => m.id !== id));
    }
  };

  // Handle Donor Form Submit
  const handleDonorSubmit = (e) => {
    e.preventDefault();
    if (!donorForm.agreed) {
      alert("Tafadhali thibitisha vigezo vya afya kabla ya kujisajili!");
      return;
    }
    const cardData = {
      id: `DON-${Math.floor(1000 + Math.random() * 9000)}`,
      name: donorForm.name,
      phone: donorForm.phone,
      blood: donorForm.blood,
      location: donorForm.location,
      weight: donorForm.weight
    };
    setRegisteredCard(cardData);
    alert("Hongera! Umejiunga rasmi na Familia ya BLOODLINK.");
  };

  return (
    <div className="app-container">
      {/* Top Encryption & Alert Bar */}
      <div className="top-status-bar">
        <div className="enc-badge">
          <span className="lock-icon">🛡️</span> 256-BIT AES ENCRYPTION ACTIVE
        </div>
        <div className="ticker">
          <span className="live-alert-tag">🔴 LIVE ALERT:</span> Muhimbili National Hospital needs 3 units of O- blood urgently!
        </div>
        <div className="lang-switcher">
          <button className="lang-btn active">SWA</button>
          <button className="lang-btn">ENG</button>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="main-navbar">
        <div className="nav-brand" onClick={() => setPage('home')}>
          <div className="brand-logo">+</div>
          <div className="brand-text">
            <strong>BLOOD <span className="red-accent">LINK</span></strong>
            <span className="global-tag">GLOBAL</span>
            <small>INTERNATIONAL LIFE-SAVING SYSTEM</small>
          </div>
        </div>
        <nav className="nav-menu">
          <button className={`nav-item ${page === 'home' ? 'active' : ''}`} onClick={() => setPage('home')}>Nyumbani</button>
          <button className={`nav-item ${page === 'donor' ? 'active' : ''}`} onClick={() => setPage('donor')}>Mtoaji Damu</button>
          <button className={`nav-item ${page === 'request' ? 'active' : ''}`} onClick={() => setPage('request')}>Omba Damu</button>
          <button className={`nav-item ${page === 'admin' ? 'active' : ''}`} onClick={() => setPage('admin')}>Admin Dashboard</button>
        </nav>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {showInstallBanner && (
            <button className="cta-join-btn" onClick={handleInstallClick} style={{ background: '#00F5D4', color: '#0B0C10' }}>
              📱 Install App
            </button>
          )}
          <button className="cta-join-btn" onClick={() => setPage('donor')}>
            ♥ Jiunge na Sisi
          </button>
        </div>
      </header>

      {/* RIGHT SIDE FLOATING PWA INSTALL POP-UP */}
      {showInstallBanner && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: '#1f2833',
          border: '2px solid #66fcf1',
          padding: '20px',
          borderRadius: '14px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
          zIndex: 9999,
          maxWidth: '320px',
          animation: 'slideInRight 0.5s ease-out'
        }}>
          <h4 style={{ color: '#66fcf1', margin: '0 0 8px 0' }}>📱 Sakinisha BloodLink App</h4>
          <p style={{ color: '#c5c6c7', fontSize: '13px', margin: '0 0 14px 0' }}>Pata ufikiaji wa haraka na utumie mfumo hata bila intaneti kwenye simu yako!</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleInstallClick} style={{ background: '#66fcf1', color: '#0b0c10', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', flex: 1 }}>Sakinisha Sasa</button>
            <button onClick={() => setShowInstallBanner(false)} style={{ background: 'transparent', color: '#fff', border: '1px solid #c5c6c7', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}>Baadaye</button>
          </div>
        </div>
      )}

      {/* HOME PAGE */}
      {page === 'home' && (
        <main className="home-wrapper">
          {/* Hero Banner */}
          <section className="hero-banner">
            <div className="system-pill">
              <span className="red-dot"></span> MFUMO WA KIMATAIFA WA KUOKOA MAISHA
            </div>
            
            <h1 className="hero-title">
              Kila Doti.<br />
              <span className="red-title">Kila Maisha.</span>
            </h1>
            <p className="hero-subtext">
              Mtandao wa kisasa zaidi, wenye usalama wa kiwango cha juu cha encryption unaounganisha watoaji wa damu waliosajiliwa na hospitali zilizothibitishwa kwa haraka na uwazi.
            </p>
            <div className="hero-buttons">
              <button className="btn-red-main" onClick={() => setPage('donor')}>
                ♥ Mwanachama Mtoaji →
              </button>
              <button className="btn-dark-outline" onClick={() => setPage('request')}>
                + Omba Damu Sasa
              </button>
            </div>
            <div className="verification-text">
              🛡️ Official Healthcare Verification Protocol • Hospital Auth Token Required
            </div>
            {/* Breathing Blood Drop Component */}
            <div className="breathing-drop-container">
              <div className="breathing-blood-drop">
                <span className="drop-icon">🩸</span>
                <div className="pulse-wave wave1"></div>
                <div className="pulse-wave wave2"></div>
              </div>
              <div className="drop-label">LIVE BLOOD FLOW MONITORING</div>
            </div>
          </section>

          {/* LIVE EMERGENCY REQUESTS SECTION */}
          <section className="live-requests-section">
            <div className="section-head">
              <h2>🚨 Live Emergency Requests (Maombi ya Dharura)</h2>
              <button className="btn-small-glow" onClick={() => setPage('request')}>+ Tuma Ombi Jipya</button>
            </div>
            <div className="requests-grid">
              {liveRequests.map((req) => (
                <div key={req.id} className="emergency-card">
                  <div className="req-top">
                    <span className="blood-group-tag">{req.blood}</span>
                    <span className={`urgency-badge ${req.urgency.toLowerCase()}`}>{req.urgency}</span>
                  </div>
                  <h3>{req.hospital}</h3>
                  <p>📍 Mgonjwa: <strong>{req.patient}</strong></p>
                  <p className="units-info">Chupa Zinazohitajika: <strong>{req.units} Units</strong></p>
                  <div className="req-footer">
                    <small>{req.date}</small>
                    <button className="btn-respond" onClick={() => setPage('donor')}>♥ Jibu & Changa</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Dynamic Gallery & Media Showcase */}
          <section className="image-showcase-section">
            <div className="section-header-flex">
              <div>
                <span className="gold-sub">ADMIN-VERIFIED MEDIA GALLERY</span>
                <h2>📸 Matukio, Picha na Video za Uchangiwa Damu</h2>
              </div>
              <small className="managed-badge">🔒 Managed Exclusively by Admin</small>
            </div>
            <div className="gallery-grid">
              {galleryMedia.map((media) => (
                <div key={media.id} className="gallery-card">
                  <div className="img-wrapper">
                    {media.type === 'video' ? (
                      <video src={media.url} controls className="gallery-img"></video>
                    ) : (
                      <img src={media.url} alt={media.title} className="gallery-img" />
                    )}
                    <span className="img-category-tag">{media.category}</span>
                  </div>
                  <div className="gallery-card-body">
                    <h3>{media.title}</h3>
                    <p>{media.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Live Reserve Counter */}
          <section className="live-reserve-box">
            <div className="section-head">
              <h2>📈 LIVE BLOOD RESERVE (Akiba ya Benki ya Damu)</h2>
              <span className="sync-badge">SECURE SYNC</span>
            </div>
            <div className="reserve-grid">
              {Object.entries(bloodStockUnits).map(([grp, count]) => (
                <div key={grp} className={`res-card ${grp === 'O-' ? 'highlight-critical' : ''}`}>
                  <strong>{grp}</strong>
                  <p>{count} Units</p>
                </div>
              ))}
            </div>
          </section>

          {/* Blood Compatibility Calculator */}
          <section className="compatibility-section">
            <div className="pill-header">🩸 BIOLOGICAL MATCH MATRIX</div>
            <h2>Kikokotoo cha Utangamano wa Damu (Blood Compatibility)</h2>
            <p>Chagua kundi la damu kuona nani unaweza kumpa au kupokea kutoka kwake.</p>
            <div className="group-selector-grid">
              {Object.keys(bloodCompatibilityMatrix).map((grp) => (
                <button
                  key={grp}
                  className={`grp-btn ${selectedGroup === grp ? 'active' : ''}`}
                  onClick={() => setSelectedGroup(grp)}
                >
                  {grp}
                </button>
              ))}
            </div>
            <div className="matrix-results">
              <div className="result-card">
                <h3>➔ CAN DONATE BLOOD TO ({selectedGroup})</h3>
                <div className="tags-container">
                  {bloodCompatibilityMatrix[selectedGroup].give.map(g => (
                    <span key={g} className="match-tag give">{g}</span>
                  ))}
                </div>
              </div>
              <div className="result-card">
                <h3>♥ CAN RECEIVE BLOOD FROM ({selectedGroup})</h3>
                <div className="tags-container">
                  {bloodCompatibilityMatrix[selectedGroup].receive.map(r => (
                    <span key={r} className="match-tag receive">{r}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Educational Guidance & Benefits Section */}
          <section className="education-section">
            <h2 className="section-title-center">📚 Elimu ya Afya na Vigezo vya Kuchangia Damu</h2>
            <div className="edu-grid">
              <div className="edu-card">
                <h3>✅ Vigezo Kuu vya Mchangiaji Damu</h3>
                <ul>
                  <li><strong>Umri:</strong> Miaka 18 hadi 65.</li>
                  <li><strong>Uzito:</strong> Siyo chini ya Kilogramu 50 (50kg).</li>
                  <li><strong>Hali ya Afya:</strong> Uwe mzima bila magonjwa sugu ya kuambukiza kupitia damu.</li>
                  <li><strong>Muda:</strong> Angalau miezi 3 tangu uchangie mara ya mwisho.</li>
                </ul>
              </div>
              <div className="edu-card highlight-border">
                <h3>🌟 Faida za Afya za Kuchangia Damu</h3>
                <ul>
                  <li><strong>Afya ya Moyo:</strong> Inapunguza madini ya chuma yaliyozidi mwilini.</li>
                  <li><strong>Seli Mpya:</strong> Mwili huchochewa kutengeneza damu mpya na safi.</li>
                  <li><strong>Vipimo vya Bure:</strong> Hupata vipimo kamili vya afya yako.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Directory of Registered Health Facilities */}
          <section className="directory-section">
            <h2>🏥 Mawasiliano ya Vituo vya Afya Vilivyosajiliwa</h2>
            <div className="facility-picker">
              {healthFacilitiesData.map(fac => (
                <button
                  key={fac.id}
                  className={`fac-btn ${selectedFacility.id === fac.id ? 'active' : ''}`}
                  onClick={() => setSelectedFacility(fac)}
                >
                  {fac.name} ({fac.region})
                </button>
              ))}
            </div>
            {selectedFacility && (
              <div className="facility-details-card">
                <div className="fac-header">
                  <div>
                    <h3>{selectedFacility.name}</h3>
                    <span className="fac-type-badge">{selectedFacility.type}</span>
                  </div>
                  <div className="fac-id-tag">ID: {selectedFacility.id}</div>
                </div>
                <div className="fac-info-grid">
                  <div><strong>Mkoa / Wilaya:</strong> {selectedFacility.region} - {selectedFacility.district}</div>
                  <div><strong>Namba ya Dharura:</strong> <span className="red-phone">{selectedFacility.emergencyPhone}</span></div>
                  <div><strong>Benki ya Damu Direct:</strong> {selectedFacility.bloodBankDirect}</div>
                  <div><strong>Barua Pepe:</strong> {selectedFacility.email}</div>
                </div>
              </div>
            )}
          </section>

          {/* AI ASSISTANT PLACED AT THE VERY BOTTOM OF HOMEPAGE */}
          <BloodAIComponent />
        </main>
      )}

      {/* DONOR REGISTRATION PORTAL PAGE */}
      {page === 'donor' && (
        <main className="form-page">
          <div className="portal-container">
            <button className="back-btn" onClick={() => setPage('home')}>← Back to Home</button>
            <div className="portal-header">
              <span className="red-sub">DONOR PORTAL</span>
              <h1>Usajili wa Mtoaji Damu (Donor Registration)</h1>
              <p>Ulinzi wa Taarifa: Data zote zinalindwa kwa usimbaji wa hali ya juu wa AES-256 Bit na kufuata miongozo ya HIPAA/GDPR.</p>
            </div>
            {registeredCard ? (
              <div className="donor-pass-card">
                <h3>🎉 KITAMBULISHO CHA MCHANGAJI (DIGITAL PASS)</h3>
                <p>Jina: <strong>{registeredCard.name}</strong></p>
                <p>Namba ya Kitambulisho: <code>{registeredCard.id}</code></p>
                <p>Kundi la Damu: <span className="blood-tag">{registeredCard.blood}</span></p>
                <p>Eneo: {registeredCard.location} | Simu: {registeredCard.phone}</p>
                <button className="btn-red-main" onClick={() => setRegisteredCard(null)}>Sajili Mwingine</button>
              </div>
            ) : (
              <form onSubmit={handleDonorSubmit} className="modern-form">
                <div className="field">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Baraka Hassan" 
                    required 
                    value={donorForm.name} 
                    onChange={e => setDonorForm({...donorForm, name: e.target.value})} 
                  />
                </div>
                <div className="field">
                  <label>Phone Number *</label>
                  <input 
                    type="tel" 
                    placeholder="+255 7XX XXX XXX" 
                    required 
                    value={donorForm.phone} 
                    onChange={e => setDonorForm({...donorForm, phone: e.target.value})} 
                  />
                </div>
                <div className="field">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="baraka@example.com" 
                    value={donorForm.email} 
                    onChange={e => setDonorForm({...donorForm, email: e.target.value})} 
                  />
                </div>
                <div className="field">
                  <label>Location / Region *</label>
                  <select value={donorForm.location} onChange={e => setDonorForm({...donorForm, location: e.target.value})}>
                    <option value="Dar es Salaam">Dar es Salaam</option>
                    <option value="Mbeya">Mbeya</option>
                    <option value="Mwanza">Mwanza</option>
                    <option value="Arusha">Arusha</option>
                  </select>
                </div>
                <div className="field">
                  <label>Blood Group *</label>
                  <select value={donorForm.blood} onChange={e => setDonorForm({...donorForm, blood: e.target.value})}>
                    <option value="O+">O Positive</option>
                    <option value="O-">O Negative</option>
                    <option value="A+">A Positive</option>
                    <option value="A-">A Negative</option>
                    <option value="B+">B Positive</option>
                    <option value="B-">B Negative</option>
                    <option value="AB+">AB Positive</option>
                    <option value="AB-">AB Negative</option>
                  </select>
                </div>
                <div className="field">
                  <label>Weight (kg) *</label>
                  <input 
                    type="number" 
                    min="50" 
                    placeholder="e.g. 65" 
                    required 
                    value={donorForm.weight} 
                    onChange={e => setDonorForm({...donorForm, weight: e.target.value})} 
                  />
                </div>
                <div className="medical-checklist-box">
                  <h4>🛡️ MEDICAL ELIGIBILITY CHECKLIST</h4>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      required 
                      checked={donorForm.agreed} 
                      onChange={e => setDonorForm({...donorForm, agreed: e.target.checked})} 
                    />
                    I confirm that all provided data is true and I consent to voluntary blood donation[span_1](start_span)[span_1](end_span).
                  </label>
                </div>
                <button type="submit" className="btn-red-main full-width">Complete Donor Registration</button>
              </form>
            )}
          </div>
        </main>
      )}

      {/* EMERGENCY REQUEST PAGE */}
      {page === 'request' && (
        <main className="form-page">
          <div className="portal-container">
            <button className="back-btn" onClick={() => setPage('home')}>← Back to Home</button>
            <h1>Tuma Ombi la Dharura la Damu</h1>
            <p>Jaza fomu hii kama hospitali au kituo cha afya kuhitaji damu ya haraka.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Ombi lako la dharura limetumwa kwenye kituo kikuu!"); setPage('home'); }} className="modern-form">
              <div className="field">
                <label>Jina la Hospitali / Facility ID</label>
                <input type="text" placeholder="Muhimbili National Hospital" required />
              </div>
              <div className="field">
                <label>Jina la Mgonjwa</label>
                <input type="text" placeholder="Jina la mgonjwa" required />
              </div>
              <div className="field">
                <label>Kundi la Damu Kinachohitajika</label>
                <select>
                  <option value="O-">O Negative</option>
                  <option value="O+">O Positive</option>
                  <option value="B+">B Positive</option>
                </select>
              </div>
              <div className="field">
                <label>Chupa Zinazohitajika (Units)</label>
                <input type="number" min="1" defaultValue="2" required />
              </div>
              <button type="submit" className="btn-red-main full-width">Tuma Ombi Sasa</button>
            </form>
          </div>
        </main>
      )}

      {/* ADMIN DASHBOARD PAGE */}
      {page === 'admin' && (
        <main className="admin-wrapper">
          <div className="admin-header-box">
            <span className="red-sub">CENTRAL COMMAND HUB</span>
            <h1>🛡️ Admin Control Dashboard</h1>
            <div className="sec-pills">
              <span className="sec-pill green">🔑 MFA: ACTIVE</span>
              <span className="sec-pill purple">🔒 AES-256: ENCRYPTED</span>
            </div>
          </div>
          {/* Blood Stock Units Units Control */}
          <div className="admin-stock-control-box">
            <h3>📊 Usimamizi wa Units za Damu (Blood Stock Units Control)</h3>
            <div className="admin-stock-grid">
              {Object.entries(bloodStockUnits).map(([grp, count]) => (
                <div key={grp} className="stock-edit-card">
                  <strong>{grp}</strong>
                  <input 
                    type="number" 
                    value={count} 
                    onChange={(e) => setBloodStockUnits({...bloodStockUnits, [grp]: parseInt(e.target.value) || 0})}
                  />
                  <small>Units</small>
                </div>
              ))}
            </div>
          </div>
          {/* Admin Media & File Upload Manager */}
          <div className="admin-media-manager">
            <h3>📁 Upakiaji wa Faili, Picha, Video, au URL Link</h3>
            <form onSubmit={handleMediaUpload} className="admin-img-form">
              <div className="form-group-row">
                <input 
                  type="text" 
                  placeholder="Kichwa cha Habari / Picha" 
                  value={uploadForm.title} 
                  onChange={e => setUploadForm({...uploadForm, title: e.target.value})} 
                  required 
                />
                <select 
                  value={uploadForm.type} 
                  onChange={e => setUploadForm({...uploadForm, type: e.target.value})}
                >
                  <option value="image">Picha (Image URL)</option>
                  <option value="video">Video (Video URL)</option>
                </select>
              </div>
              <div className="form-group-row">
                <input 
                  type="url" 
                  placeholder="Ingiza URL Link au File path" 
                  value={uploadForm.url} 
                  onChange={e => setUploadForm({...uploadForm, url: e.target.value})} 
                  required 
                />
                <input 
                  type="text" 
                  placeholder="Maelezo mafupi (Caption)" 
                  value={uploadForm.caption} 
                  onChange={e => setUploadForm({...uploadForm, caption: e.target.value})} 
                />
              </div>
              <button type="submit" className="btn-add-img">+ Hifadhi na Chapisha Kwenye Webpage</button>
            </form>
            <div className="admin-image-list">
              <h4>Maudhui Yaliyopo (Active Media):</h4>
              <div className="admin-img-grid">
                {galleryMedia.map(m => (
                  <div key={m.id} className="admin-img-card">
                    {m.type === 'video' ? <video src={m.url}></video> : <img src={m.url} alt={m.title} />}
                    <div className="admin-img-info">
                      <strong>{m.title}</strong>
                      <button className="btn-del-img" onClick={() => handleDeleteMedia(m.id)}>Futa</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-brand">
          <span className="footer-logo">+</span>
          <strong>BLOOD<span className="red-accent">LINK</span></strong>
        </div>
        <p>International high-security blood donation & hospital coordination network.</p>
        <div className="hotlines">
          <strong>EMERGENCY TOLL-FREE:</strong> 114 / 115 | <strong>BLOOD BANK DISPATCH:</strong> +255 22 215 1377
        </div>
      </footer>
    </div>
  );
}

export default App;
