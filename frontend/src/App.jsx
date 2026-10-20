import React, { useState, useEffect } from 'react';
import './App.css';
import './App.css';
// Tafsiri za Lugha (Language Translations Dictionary)
const translations = {
  sw: {
    navHome: "Nyumbani",
    navDonor: "Mtoaji Damu",
    navRequest: "Omba Damu",
    navAdmin: "Admin Dashboard",
    joinUs: "♥ Jiunge na Sisi",
    installApp: "📱 Sakinisha App",
    heroPill: "MFUMO WA KIMATAIFA WA KUOKOA MAISHA",
    heroTitlePart1: "Kila Doti.",
    heroTitlePart2: "Kila Maisha.",
    heroSubtext: "Mtandao wa kisasa zaidi, wenye usalama wa kiwango cha juu cha encryption unaounganisha watoaji wa damu waliosajiliwa na hospitali zilizothibitishwa kwa haraka na uwazi.",
    btnMember: "♥ Mwanachama Mtoaji →",
    btnRequest: "+ Omba Damu Sasa",
    secVerify: "Official Healthcare Verification Protocol • Hospital Auth Token Required",
    liveFlow: "LIVE BLOOD FLOW MONITORING",
    liveEmergency: "🚨 Live Emergency Requests (Maombi ya Dharura)",
    newRequestBtn: "+ Tuma Ombi Jipya",
    unitsNeeded: "Chupa Zinazohitajika:",
    respondBtn: "♥ Jibu & Changa",
    mediaGalleryTag: "ADMIN-VERIFIED MEDIA GALLERY",
    mediaGalleryTitle: "📸 Matukio, Picha na Video za Uchangiwa Damu",
    managedAdmin: "🔒 Managed Exclusively by Admin",
    clickToView: "🔍 Bonyeza Kuangalia",
    liveReserve: "📈 LIVE BLOOD RESERVE (Akiba ya Benki ya Damu)",
    secureSync: "SECURE SYNC",
    compatibilityTitle: "Kikokotoo cha Utangamano wa Damu (Blood Compatibility)",
    compatibilitySub: "Chagua kundi la damu kuona nani unaweza kumpa au kupokea kutoka kwake.",
    canDonateTo: "➔ CAN DONATE BLOOD TO",
    canReceiveFrom: "♥ CAN RECEIVE BLOOD FROM",
    eduTitle: "📚 Elimu ya Afya na Vigezo vya Kuchangia Damu",
    donorCriteriaTitle: "✅ Vigezo Kuu vya Mchangiaji Damu",
    ageText: "Umri: Miaka 18 hadi 65.",
    weightText: "Uzito: Siyo chini ya Kilogramu 50 (50kg).",
    healthText: "Hali ya Afya: Uwe mzima bila magonjwa sugu ya kuambukiza kupitia damu.",
    durationText: "Muda: Angalau miezi 3 tangu uchangie mara ya mwisho.",
    benefitsTitle: "🌟 Faida za Afya za Kuchangia Damu",
    heartBenefit: "Afya ya Moyo: Inapunguza madini ya chuma yaliyozidi mwilini.",
    cellsBenefit: "Seli Mpya: Mwili huchochewa kutengeneza damu mpya na safi.",
    checkupBenefit: "Vipimo vya Bure: Hupata vipimo kamili vya afya yako.",
    facilityTitle: "🏥 Mawasiliano ya Vituo vya Afya Vilivyosajiliwa"
  },
  eng: {
    navHome: "Home",
    navDonor: "Blood Donor",
    navRequest: "Request Blood",
    navAdmin: "Admin Dashboard",
    joinUs: "♥ Join Us",
    installApp: "📱 Install App",
    heroPill: "INTERNATIONAL LIFE-SAVING SYSTEM",
    heroTitlePart1: "Every Drop.",
    heroTitlePart2: "Every Life.",
    heroSubtext: "The most advanced, high-security encrypted network connecting registered blood donors with verified hospitals instantly and transparently.",
    btnMember: "♥ Donor Member →",
    btnRequest: "+ Request Blood Now",
    secVerify: "Official Healthcare Verification Protocol • Hospital Auth Token Required",
    liveFlow: "LIVE BLOOD FLOW MONITORING",
    liveEmergency: "🚨 Live Emergency Requests",
    newRequestBtn: "+ New Request",
    unitsNeeded: "Units Needed:",
    respondBtn: "♥ Respond & Donate",
    mediaGalleryTag: "ADMIN-VERIFIED MEDIA GALLERY",
    mediaGalleryTitle: "📸 Blood Donation Events, Photos & Videos",
    managedAdmin: "🔒 Managed Exclusively by Admin",
    clickToView: "🔍 Click to View Full Screen",
    liveReserve: "📈 LIVE BLOOD RESERVE",
    secureSync: "SECURE SYNC",
    compatibilityTitle: "Blood Compatibility Calculator",
    compatibilitySub: "Select a blood group to see donation and receiving matches.",
    canDonateTo: "➔ CAN DONATE BLOOD TO",
    canReceiveFrom: "♥ CAN RECEIVE BLOOD FROM",
    eduTitle: "📚 Health Education & Donor Guidelines",
    donorCriteriaTitle: "✅ Main Blood Donor Criteria",
    ageText: "Age: 18 to 65 years old.",
    weightText: "Weight: Not less than 50 kilograms (50kg).",
    healthText: "Health Status: Healthy without chronic blood-borne infections.",
    durationText: "Duration: At least 3 months since your last donation.",
    benefitsTitle: "🌟 Health Benefits of Donating Blood",
    heartBenefit: "Heart Health: Reduces excess iron levels in the body.",
    cellsBenefit: "New Cells: Stimulates the body to produce fresh, new blood.",
    checkupBenefit: "Free Screenings: Receive complete health screenings.",
    facilityTitle: "🏥 Registered Health Facilities Directory"
  }
};

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

// PROFESSIONAL BLOOD AI ASSISTANT COMPONENT
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
  const [page, setPage] = useState('home'); 
  const [selectedGroup, setSelectedGroup] = useState('O-');
  const [selectedFacility, setSelectedFacility] = useState(healthFacilitiesData[0]);
  const [currentLang, setCurrentLang] = useState('sw'); // Language state (sw / eng)
  const t = translations[currentLang]; // Active translations dictionary
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');

  // Selected Media for Full Screen Modal Preview
  const [activeModalMedia, setActiveModalMedia] = useState(null);
  
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

  const [liveRequests, setLiveRequests] = useState([
    { id: "REQ-01", hospital: "Muhimbili National Hospital", patient: "Fatuma Hassan", blood: "O-", units: 3, urgency: "CRITICAL", date: "2026-10-18 08:30" },
    { id: "REQ-02", hospital: "Mbeya Referral Hospital", patient: "Kelman M.", blood: "B+", units: 2, urgency: "URGENT", date: "2026-10-18 10:15" }
  ]);

  const [bloodStockUnits, setBloodStockUnits] = useState({
    "A+": 42, "A-": 12,
    "B+": 38, "B-": 8,
    "AB+": 19, "AB-": 5,
    "O+": 85, "O-": 14
  });

  const [galleryMedia, setGalleryMedia] = useState(defaultAdminGallery);
  const [uploadForm, setUploadForm] = useState({ title: '', type: 'image', url: '', category: 'Community Drive', caption: '' });
  
  const [donorForm, setDonorForm] = useState({ name: '', phone: '', email: '', location: 'Dar es Salaam', blood: 'O+', weight: '', agreed: false });
  const [registeredCard, setRegisteredCard] = useState(null);

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
      {/* Top Encryption & Alert Bar with Functional Language Switcher */}
      <div className="top-status-bar">
        <div className="enc-badge">
          <span className="lock-icon">🛡️</span> 256-BIT AES ENCRYPTION ACTIVE
        </div>
        <div className="ticker">
          <span className="live-alert-tag">🔴 LIVE ALERT:</span> Muhimbili National Hospital needs 3 units of O- blood urgently!
        </div>
        <div className="lang-switcher">
          <button 
            className={`lang-btn ${currentLang === 'sw' ? 'active' : ''}`} 
            onClick={() => setCurrentLang('sw')}
          >
            SWA
          </button>
          <button 
            className={`lang-btn ${currentLang === 'eng' ? 'active' : ''}`} 
            onClick={() => setCurrentLang('eng')}
          >
            ENG
          </button>
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
          <button className={`nav-item ${page === 'home' ? 'active' : ''}`} onClick={() => setPage('home')}>{t.navHome}</button>
          <button className={`nav-item ${page === 'donor' ? 'active' : ''}`} onClick={() => setPage('donor')}>{t.navDonor}</button>
          <button className={`nav-item ${page === 'request' ? 'active' : ''}`} onClick={() => setPage('request')}>{t.navRequest}</button>
          <button className={`nav-item ${page === 'admin' ? 'active' : ''}`} onClick={() => setPage('admin')}>{t.navAdmin}</button>
        </nav>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {showInstallBanner && (
            <button className="cta-join-btn" onClick={handleInstallClick} style={{ background: '#00F5D4', color: '#0B0C10' }}>
              {t.installApp}
            </button>
          )}
          <button className="cta-join-btn" onClick={() => setPage('donor')}>
            {t.joinUs}
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
              <span className="red-dot"></span> {t.heroPill}
            </div>
            
            <h1 className="hero-title">
              {t.heroTitlePart1}<br />
              <span className="red-title">{t.heroTitlePart2}</span>
            </h1>
            <p className="hero-subtext">
              {t.heroSubtext}
            </p>
            <div className="hero-buttons">
              <button className="btn-red-main" onClick={() => setPage('donor')}>
                {t.btnMember}
              </button>
              <button className="btn-dark-outline" onClick={() => setPage('request')}>
                {t.btnRequest}
              </button>
            </div>
            <div className="verification-text">
              {t.secVerify}
            </div>
            <div className="breathing-drop-container">
              <div className="breathing-blood-drop">
                <span className="drop-icon">🩸</span>
                <div className="pulse-wave wave1"></div>
                <div className="pulse-wave wave2"></div>
              </div>
              <div className="drop-label">{t.liveFlow}</div>
            </div>
          </section>

          {/* LIVE EMERGENCY REQUESTS SECTION */}
          <section className="live-requests-section">
            <div className="section-head">
              <h2>{t.liveEmergency}</h2>
              <button className="btn-small-glow" onClick={() => setPage('request')}>{t.newRequestBtn}</button>
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
                  <p className="units-info">{t.unitsNeeded} <strong>{req.units} Units</strong></p>
                  <div className="req-footer">
                    <small>{req.date}</small>
                    <button className="btn-respond" onClick={() => setPage('donor')}>{t.respondBtn}</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RESPONSIVE MEDIA GALLERY WITH FULL SCREEN PREVIEW MODAL */}
          <section className="image-showcase-section" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <div className="section-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <span className="gold-sub" style={{ color: '#66fcf1', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' }}>{t.mediaGalleryTag}</span>
                <h2 style={{ color: '#fff', fontSize: '28px', marginTop: '5px' }}>{t.mediaGalleryTitle}</h2>
              </div>
              <small className="managed-badge" style={{ color: '#c5c6c7', background: '#1f2833', padding: '6px 12px', borderRadius: '8px', border: '1px solid #45a29e' }}>{t.managedAdmin}</small>
            </div>

            {/* Responsive Grid Layout: 1 col on mobile, 2 on tablet, 3 on desktop */}
            <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
              {galleryMedia.map((media) => (
                <div 
                  key={media.id} 
                  onClick={() => setActiveModalMedia(media)}
                  className="gallery-card" 
                  style={{ background: '#121620', border: '1px solid #1f2833', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.3s ease, border-color 0.3s ease', display: 'flex', flexDirection: 'column' }}
                >
                  {/* Top Image / Video Container (Large and clean) */}
                  <div className="img-wrapper" style={{ width: '100%', height: '240px', background: '#000', position: 'relative', overflow: 'hidden' }}>
                    {media.type === 'video' ? (
                      <video src={media.url} className="gallery-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }}></video>
                    ) : (
                      <img src={media.url} alt={media.title} className="gallery-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                    <span className="img-category-tag" style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.7)', color: '#66fcf1', fontSize: '11px', padding: '4px 10px', borderRadius: '6px', fontWeight: 'bold' }}>{media.category}</span>
                  </div>
                  
                  {/* Bottom Text Area */}
                  <div className="gallery-card-body" style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px' }}>{media.title}</h3>
                      <p style={{ color: '#c5c6c7', fontSize: '14px', lineHeight: '1.5' }}>{media.caption}</p>
                    </div>
                    <div style={{ marginTop: '15px', color: '#66fcf1', fontSize: '12px', fontWeight: '600' }}>{t.clickToView}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FULL SCREEN MODAL PREVIEW FOR MEDIA */}
          {activeModalMedia && (
            <div 
              onClick={() => setActiveModalMedia(null)}
              style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.9)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
            >
              <div 
                onClick={(e) => e.stopPropagation()} 
                style={{ background: '#121620', border: '1px solid #45a29e', borderRadius: '20px', maxWidth: '800px', width: '100%', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}
              >
                <button 
                  onClick={() => setActiveModalMedia(null)}
                  style={{ position: 'absolute', top: '15px', right: '15px', background: '#ff4d4d', color: '#fff', border: 'none', width: '36px', height: '36px', borderRadius: '50%', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', zIndex: 10 }}
                >
                  ✕
                </button>
                <div style={{ width: '100%', maxHeight: '60vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {activeModalMedia.type === 'video' ? (
                    <video src={activeModalMedia.url} controls autoPlay style={{ width: '100%', maxHeight: '60vh', objectFit: 'contain' }}></video>
                  ) : (
                    <img src={activeModalMedia.url} alt={activeModalMedia.title} style={{ width: '100%', maxHeight: '60vh', objectFit: 'contain' }} />
                  )}
                </div>
                <div style={{ padding: '25px' }}>
                  <span style={{ color: '#66fcf1', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>{activeModalMedia.category}</span>
                  <h2 style={{ color: '#fff', fontSize: '24px', margin: '8px 0 12px 0' }}>{activeModalMedia.title}</h2>
                  <p style={{ color: '#c5c6c7', fontSize: '15px', lineHeight: '1.6' }}>{activeModalMedia.caption}</p>
                </div>
              </div>
            </div>
          )}

          {/* Live Reserve Counter */}
          <section className="live-reserve-box">
            <div className="section-head">
              <h2>{t.liveReserve}</h2>
              <span className="sync-badge">{t.secureSync}</span>
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
            <h2>{t.compatibilityTitle}</h2>
            <p>{t.compatibilitySub}</p>
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
                <h3>➔ {t.canDonateTo} ({selectedGroup})</h3>
                <div className="tags-container">
                  {bloodCompatibilityMatrix[selectedGroup].give.map(g => (
                    <span key={g} className="match-tag give">{g}</span>
                  ))}
                </div>
              </div>
              <div className="result-card">
                <h3>♥ {t.canReceiveFrom} ({selectedGroup})</h3>
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
            <h2 className="section-title-center">{t.eduTitle}</h2>
            <div className="edu-grid">
              <div className="edu-card">
                <h3>{t.donorCriteriaTitle}</h3>
                <ul>
                  <li><strong>{t.ageText.split(':')[0]}:</strong> {t.ageText.split(':')[1]}</li>
                  <li><strong>{t.weightText.split(':')[0]}:</strong> {t.weightText.split(':')[1]}</li>
                  <li><strong>{t.healthText.split(':')[0]}:</strong> {t.healthText.split(':')[1]}</li>
                  <li><strong>{t.durationText.split(':')[0]}:</strong> {t.durationText.split(':')[1]}</li>
                </ul>
              </div>
              <div className="edu-card highlight-border">
                <h3>{t.benefitsTitle}</h3>
                <ul>
                  <li><strong>{t.heartBenefit.split(':')[0]}:</strong> {t.heartBenefit.split(':')[1]}</li>
                  <li><strong>{t.cellsBenefit.split(':')[0]}:</strong> {t.cellsBenefit.split(':')[1]}</li>
                  <li><strong>{t.checkupBenefit.split(':')[0]}:</strong> {t.checkupBenefit.split(':')[1]}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Directory of Registered Health Facilities */}
          <section className="directory-section">
            <h2>{t.facilityTitle}</h2>
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
                    I confirm that all provided data is true and I consent to voluntary blood donation[span_2](start_span)[span_2](end_span).
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

      {/* ADMIN DASHBOARD PAGE WITH PASSWORD PROTECTION */}
      {page === 'admin' && (
        <main className="admin-wrapper">
          {!adminAuthenticated ? (
            <div className="portal-container" style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
              <span className="red-sub">RESTRICTED ACCESS</span>
              <h2 style={{ color: '#fff', margin: '10px 0 20px 0' }}>🛡️ Ingiza Admin Password</h2>
              <p style={{ color: '#a1a1aa', fontSize: '13px', marginBottom: '20px' }}>Tafadhali weka neno la siri la kituo kikuu ili uweze kufungua Admin Command Hub.</p>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                // Weka password unayoitaka hapa (Mfano: bloodlink2026 au admin123)
                if (adminPasswordInput === 'bloodlink2026') {
                  setAdminAuthenticated(true);
                  alert("Umefanikiwa kuingia kwenye Admin Dashboard!");
                } else {
                  alert("⚠️ Password siyo sahihi! Tafadhali jaribu tena.");
                  setAdminPasswordInput('');
                }
              }} className="modern-form">
                <div className="field">
                  <input 
                    type="password" 
                    placeholder="Weka Admin Password..." 
                    value={adminPasswordInput} 
                    onChange={e => setAdminPasswordInput(e.target.value)} 
                    required 
                    style={{ textAlign: 'center', fontSize: '16px', letterSpacing: '2px' }}
                  />
                </div>
                <button type="submit" className="btn-red-main full-width" style={{ marginTop: '10px' }}>Fungua Dashboard 🔓</button>
              </form>
            </div>
          ) : (
            <div>
              <div className="admin-header-box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span className="red-sub">CENTRAL COMMAND HUB</span>
                  <h1>🛡️ Admin Control Dashboard</h1>
                </div>
                <button 
                  onClick={() => setAdminAuthenticated(false)} 
                  style={{ background: '#1f2833', color: '#ff2a3b', border: '1px solid #ff2a3b', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  🔒 Logout Admin
                </button>
              </div>

              <div className="sec-pills" style={{ marginBottom: '20px' }}>
                <span className="sec-pill green">🔑 MFA: ACTIVE</span>
                <span className="sec-pill purple">🔒 AES-256: ENCRYPTED</span>
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
            </div>
          )}
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
