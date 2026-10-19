import React, { useState } from 'react';
import './App.css';

// Master Translations Dictionary
const translations = {
  sw: {
    liveAlert: "🔴 TAARIFA YA DHARURA:",
    alertMsg: "Hospitali ya Taifa Muhimbili inahitaji chupa 3 za damu ya O- kwa haraka!",
    navHome: "Nyumbani",
    navDonor: "Mtoaji Damu",
    navRequest: "Omba Damu",
    navAdmin: "Admin Dashboard",
    btnJoin: "♥ Jiunge na Sisi",
    heroPill: "MFUMO WA KIMATAIFA WA KUOKOA MAISHA",
    heroTitle1: "Kila Doti.",
    heroTitle2: "Kila Maisha.",
    heroSub: "Mtandao wa kisasa zaidi, wenye usalama wa kiwango cha juu cha encryption unaounganisha watoaji wa damu waliosajiliwa na hospitali zilizothibitishwa kwa haraka na uwazi.",
    btnMemberDonor: "♥ Mwanachama Mtoaji →",
    btnRequestNow: "+ Omba Damu Sasa",
    liveFlow: "LIVE BLOOD FLOW MONITORING",
    liveRequestsTitle: "🚨 Live Emergency Requests (Maombi ya Dharura)",
    btnNewReq: "+ Tuma Ombi Jipya",
    btnRespond: "♥ Jibu & Changa",
    unitsNeeded: "Chupa Zinazohitajika:",
    patient: "Mgonjwa:",
    gallerySub: "ADMIN-VERIFIED MEDIA GALLERY",
    galleryTitle: "📸 Matukio, Picha na Video za Uchangiwa Damu",
    managedBadge: "🔒 Managed Exclusively by Admin",
    reserveTitle: "📈 LIVE BLOOD RESERVE (Akiba ya Benki ya Damu)",
    calcHeader: "🩸 BIOLOGICAL MATCH MATRIX",
    calcTitle: "Kikokotoo cha Utangamano wa Damu (Blood Compatibility)",
    calcSub: "Chagua kundi la damu kuona nani unaweza kumpa au kupokea kutoka kwake.",
    canDonateTo: "➔ CAN DONATE BLOOD TO",
    canReceiveFrom: "♥ CAN RECEIVE BLOOD FROM",
    eduTitle: "📚 Elimu ya Afya na Vigezo vya Kuchangia Damu",
    facilityTitle: "🏥 Mawasiliano ya Vituo vya Afya Vilivyosajiliwa",
    donorPortalTitle: "Usajili wa Mtoaji Damu (Donor Registration)",
    donorPortalDesc: "Ulinzi wa Taarifa: Data zote zinalindwa kwa usimbaji wa hali ya juu wa AES-256 Bit.",
    fullName: "Jina Kamili *",
    phone: "Namba ya Simu *",
    email: "Barua Pepe",
    bloodGroup: "Kundi la Damu *",
    weight: "Uzito (kg) *",
    consentText: "Nathibitisha kwamba taarifa zote ni za kweli na ninakubali kuchangia damu kwa hiari.",
    btnSubmitDonor: "Kamilisha Usajili wa Donor",
    adminTitle: "🛡️ Central Admin Control Hub",
    adminStockTitle: "📊 Usimamizi wa Units za Damu (Blood Stock Control)",
    adminMediaTitle: "📁 Media & File Manager (Upload Kutoka Kwenye Kompyuta/Simu/Link)",
    btnUpload: "+ Hifadhi na Chapisha Media",
    totalDonorsLabel: "DONORS WALIOSAJILIWA",
    totalRecipientsLabel: "MAOMBI YA WANAOHITAJI",
    totalUnitsLabel: "JUMLA YA CHUPA ZILIZOPO",
    criticalCasesLabel: "CASES ZA DHARURA"
  },
  en: {
    liveAlert: "🔴 LIVE EMERGENCY ALERT:",
    alertMsg: "Muhimbili National Hospital urgently needs 3 units of O- blood!",
    navHome: "Home",
    navDonor: "Donor Portal",
    navRequest: "Request Blood",
    navAdmin: "Admin Console",
    btnJoin: "♥ Join Us Today",
    heroPill: "INTERNATIONAL LIFE-SAVING NETWORK",
    heroTitle1: "Every Drop.",
    heroTitle2: "Every Life.",
    heroSub: "An ultra-modern, highly encrypted network seamlessly connecting verified registered donors with authorized hospitals with transparency.",
    btnMemberDonor: "♥ Become a Donor →",
    btnRequestNow: "+ Request Blood Now",
    liveFlow: "LIVE BLOOD FLOW MONITORING",
    liveRequestsTitle: "🚨 Live Emergency Requests",
    btnNewReq: "+ Submit New Request",
    btnRespond: "♥ Respond & Donate",
    unitsNeeded: "Units Needed:",
    patient: "Patient:",
    gallerySub: "ADMIN-VERIFIED MEDIA GALLERY",
    galleryTitle: "📸 Blood Donation Campaigns & Media Showcase",
    managedBadge: "🔒 Managed Exclusively by Admin",
    reserveTitle: "📈 LIVE BLOOD RESERVE (National Bank Inventory)",
    calcHeader: "🩸 BIOLOGICAL MATCH MATRIX",
    calcTitle: "Blood Compatibility Calculator",
    calcSub: "Select a blood group to display match compatibility for donors and recipients.",
    canDonateTo: "➔ CAN DONATE BLOOD TO",
    canReceiveFrom: "♥ CAN RECEIVE BLOOD FROM",
    eduTitle: "📚 Health Guidance & Eligibility Checklist",
    facilityTitle: "🏥 Registered Healthcare Facilities Directory",
    donorPortalTitle: "Donor Registration Portal",
    donorPortalDesc: "Data Security: All submitted information is encrypted using 256-bit AES protocol.",
    fullName: "Full Name *",
    phone: "Phone Number *",
    email: "Email Address",
    bloodGroup: "Blood Group *",
    weight: "Weight (kg) *",
    consentText: "I confirm that all provided data is true and I consent to voluntary blood donation.",
    btnSubmitDonor: "Complete Donor Registration",
    adminTitle: "🛡️ Central Admin Control Hub",
    adminStockTitle: "📊 Blood Stock Control",
    adminMediaTitle: "📁 Media & File Manager (Upload From Local Device or Link)",
    btnUpload: "+ Save & Publish Media",
    totalDonorsLabel: "REGISTERED DONORS",
    totalRecipientsLabel: "RECIPIENT REQUESTS",
    totalUnitsLabel: "TOTAL UNITS RESERVED",
    criticalCasesLabel: "CRITICAL CASES"
  }
};

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

function App() {
  const [lang, setLang] = useState('sw');
  const [page, setPage] = useState('home');
  const [selectedGroup, setSelectedGroup] = useState('O-');
  const [selectedFacility, setSelectedFacility] = useState(healthFacilitiesData[0]);

  // Admin Auth Lock State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const t = translations[lang];

  // Features List
  const features = [
    {
      icon: '🩸',
      title: 'Donate Blood',
      description: 'Register as a donor and help save lives.',
      action: 'Become a Donor',
      page: 'donor',
    },
    {
      icon: '🏥',
      title: 'Request Blood',
      description: 'Submit a blood request through a healthcare facility.',
      action: 'Request Blood',
      page: 'request',
    },
    {
      icon: '🤝',
      title: 'Find Opportunities',
      description: 'Explore ways to support blood donation in your community.',
      action: 'Explore',
      page: 'donor',
    },
  ];

  // Donors List
  const [donorsList, setDonorsList] = useState([
    { id: "DON-1001", name: "Baraka Hassan", phone: "+255 712 345 678", email: "baraka@example.com", location: "Dar es Salaam", blood: "O+", weight: "68 kg", status: "VERIFIED" },
    { id: "DON-1002", name: "Amina Salum", phone: "+255 754 987 654", email: "amina@example.com", location: "Mbeya", blood: "O-", weight: "58 kg", status: "VERIFIED" },
    { id: "DON-1003", name: "Kelvin Joseph", phone: "+255 784 112 233", email: "kelvin@example.com", location: "Mwanza", blood: "A+", weight: "72 kg", status: "VERIFIED" },
  ]);

  // Recipients / Hospital Requests
  const [requestsList, setRequestsList] = useState([
    { id: "REQ-801", facility: "Muhimbili National Hospital", doctor: "Dr. Kilonzo", patient: "Fatuma Hassan", blood: "O-", units: 3, urgency: "CRITICAL", status: "PENDING", date: "2026-10-18 08:30" },
    { id: "REQ-802", facility: "Mbeya Referral Hospital", doctor: "Dr. Mwambene", patient: "Kelman M.", blood: "B+", units: 2, urgency: "URGENT", status: "APPROVED", date: "2026-10-18 10:15" },
  ]);

  // Blood Stock Control
  const [bloodStockUnits, setBloodStockUnits] = useState({
    "A+": 42, "A-": 12,
    "B+": 38, "B-": 8,
    "AB+": 19, "AB-": 5,
    "O+": 85, "O-": 14
  });

  const totalReservedUnits = Object.values(bloodStockUnits).reduce((a, b) => a + b, 0);

  // Gallery & Device File Upload
  const [galleryMedia, setGalleryMedia] = useState(defaultAdminGallery);
  const [uploadForm, setUploadForm] = useState({ title: '', type: 'image', url: '', caption: '' });

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setUploadForm({ ...uploadForm, url: fileUrl, type: file.type.startsWith('video') ? 'video' : 'image' });
    }
  };

  const handleMediaUpload = (e) => {
    e.preventDefault();
    if (!uploadForm.title || !uploadForm.url) {
      alert("Tafadhali chagua file au uweke URL!");
      return;
    }
    const newMedia = {
      id: Date.now(),
      title: uploadForm.title,
      type: uploadForm.type,
      url: uploadForm.url,
      category: "Admin Media",
      caption: uploadForm.caption || "Imepakiwa na Admin"
    };
    setGalleryMedia([newMedia, ...galleryMedia]);
    setUploadForm({ title: '', type: 'image', url: '', caption: '' });
    alert("Media imepakiwa na kuhifadhiwa kikamilifu!");
  };

  // Admin Login Handler (Passcode: admin123)
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPasswordInput === 'admin123') {
      setIsAdminAuthenticated(true);
      setAuthError('');
      setAdminPasswordInput('');
    } else {
      setAuthError('❌ Passcode Sio Sahihi! Ingiza Nywila Sahihi ya Admin.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setPage('home');
  };

  // Donor Registration Handler
  const [donorForm, setDonorForm] = useState({ name: '', phone: '', email: '', location: 'Dar es Salaam', blood: 'O+', weight: '', agreed: false });
  const [registeredCard, setRegisteredCard] = useState(null);

  const handleDonorSubmit = (e) => {
    e.preventDefault();
    if (!donorForm.agreed) {
      alert("Tafadhali thibitisha vigezo vya afya!");
      return;
    }
    const newDonor = {
      id: `DON-${Math.floor(1000 + Math.random() * 9000)}`,
      name: donorForm.name,
      phone: donorForm.phone,
      email: donorForm.email || "N/A",
      location: donorForm.location,
      blood: donorForm.blood,
      weight: `${donorForm.weight} kg`,
      status: "VERIFIED"
    };
    setDonorsList([newDonor, ...donorsList]);
    setRegisteredCard(newDonor);
  };

  const handleApproveRequest = (id) => {
    setRequestsList(requestsList.map(req => req.id === id ? { ...req, status: 'APPROVED' } : req));
  };

  return (
    <div className="app-container">
      {/* Top Encryption & Working Language Switcher */}
      <div className="top-status-bar">
        <div className="enc-badge">
          <span className="lock-icon">🛡️</span> 256-BIT AES ENCRYPTION ACTIVE
        </div>
        <div className="ticker">
          <span className="live-alert-tag">{t.liveAlert}</span> {t.alertMsg}
        </div>
        <div className="lang-switcher">
          <button className={`lang-btn ${lang === 'sw' ? 'active' : ''}`} onClick={() => setLang('sw')}>SWA</button>
          <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>ENG</button>
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

        <button className="cta-join-btn" onClick={() => setPage('donor')}>
          {t.btnJoin}
        </button>
      </header>

      {/* HOME PAGE */}
      {page === 'home' && (
        <main className="home-wrapper">
          <section className="hero-banner">
            <div className="system-pill">
              <span className="red-dot"></span> {t.heroPill}
            </div>
            
            <h1 className="hero-title">
              {t.heroTitle1}<br />
              <span className="red-title">{t.heroTitle2}</span>
            </h1>

            <p className="hero-subtext">{t.heroSub}</p>

            <div className="hero-buttons">
              <button className="btn-red-main" onClick={() => setPage('donor')}>{t.btnMemberDonor}</button>
              <button className="btn-dark-outline" onClick={() => setPage('request')}>{t.btnRequestNow}</button>
            </div>

            {/* Breathing Blood Drop */}
            <div className="breathing-drop-container">
              <div className="breathing-blood-drop">
                <span className="drop-icon">🩸</span>
                <div className="pulse-wave wave1"></div>
                <div className="pulse-wave wave2"></div>
              </div>
              <div className="drop-label">{t.liveFlow}</div>
            </div>
          </section>

          {/* Mission Strip */}
          <section className="mission-strip">
            <div className="mission-item">
              <span className="strip-number">01</span>
              <div>
                <strong>Register</strong>
                <p>Tell us how you can help save lives.</p>
              </div>
            </div>
            <div className="mission-item">
              <span className="strip-number">02</span>
              <div>
                <strong>Connect</strong>
                <p>Link directly with verified medical requests.</p>
              </div>
            </div>
            <div className="mission-item">
              <span className="strip-number">03</span>
              <div>
                <strong>Make a difference</strong>
                <p>Donate through officially approved facilities.</p>
              </div>
            </div>
          </section>

          {/* Live Emergency Requests */}
          <section className="live-requests-section">
            <div className="section-head">
              <h2>{t.liveRequestsTitle}</h2>
              <button className="btn-small-glow" onClick={() => setPage('request')}>{t.btnNewReq}</button>
            </div>
            <div className="requests-grid">
              {requestsList.map((req) => (
                <div key={req.id} className="emergency-card">
                  <div className="req-top">
                    <span className="blood-group-tag">{req.blood}</span>
                    <span className={`urgency-badge ${req.urgency.toLowerCase()}`}>{req.urgency}</span>
                  </div>
                  <h3>{req.facility}</h3>
                  <p>📍 {t.patient} <strong>{req.patient}</strong></p>
                  <p className="units-info">{t.unitsNeeded} <strong>{req.units} Units</strong></p>
                  <div className="req-footer">
                    <small>{req.date}</small>
                    <button className="btn-respond" onClick={() => setPage('donor')}>{t.btnRespond}</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Services Section / Feature Cards */}
          <section className="services-section">
            <div className="section-heading">
              <span className="section-label">HOW YOU CAN HELP</span>
              <h2>One mission. <span className="red-accent">Many ways.</span></h2>
              <p>Choose how you want to be part of the BLOODLINK community.</p>
            </div>

            <div className="feature-grid">
              {features.map((feature) => (
                <article className="feature-card" key={feature.title}>
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <button className="feature-link" onClick={() => setPage(feature.page)}>
                    {feature.action} <span>→</span>
                  </button>
                </article>
              ))}
            </div>
          </section>

          {/* Dynamic Gallery Showcase */}
          <section className="image-showcase-section">
            <div className="section-header-flex">
              <div>
                <span className="gold-sub">{t.gallerySub}</span>
                <h2>{t.galleryTitle}</h2>
              </div>
              <small className="managed-badge">{t.managedBadge}</small>
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
                  </div>
                  <div className="gallery-card-body">
                    <h3>{media.title}</h3>
                    <p>{media.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Blood Reserve Count */}
          <section className="live-reserve-box">
            <div className="section-head">
              <h2>{t.reserveTitle}</h2>
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
            <div className="pill-header">{t.calcHeader}</div>
            <h2>{t.calcTitle}</h2>
            <p>{t.calcSub}</p>

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
                <h3>{t.canDonateTo} ({selectedGroup})</h3>
                <div className="tags-container">
                  {bloodCompatibilityMatrix[selectedGroup].give.map(g => (
                    <span key={g} className="match-tag give">{g}</span>
                  ))}
                </div>
              </div>

              <div className="result-card">
                <h3>{t.canReceiveFrom} ({selectedGroup})</h3>
                <div className="tags-container">
                  {bloodCompatibilityMatrix[selectedGroup].receive.map(r => (
                    <span key={r} className="match-tag receive">{r}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* DONOR REGISTRATION PORTAL */}
      {page === 'donor' && (
        <main className="form-page">
          <div className="portal-container">
            <button className="back-btn" onClick={() => setPage('home')}>← {t.navHome}</button>
            <div className="portal-header">
              <h1>{t.donorPortalTitle}</h1>
              <p>{t.donorPortalDesc}</p>
            </div>

            {registeredCard ? (
              <div className="donor-pass-card">
                <h3>🎉 DIGITAL DONOR PASS</h3>
                <p>Name: <strong>{registeredCard.name}</strong></p>
                <p>ID: <code>{registeredCard.id}</code></p>
                <p>Blood Group: <span className="blood-tag">{registeredCard.blood}</span></p>
                <button className="btn-red-main" onClick={() => setRegisteredCard(null)}>Register Another</button>
              </div>
            ) : (
              <form onSubmit={handleDonorSubmit} className="modern-form">
                <div className="field">
                  <label>{t.fullName}</label>
                  <input type="text" required placeholder="e.g. Baraka Hassan" value={donorForm.name} onChange={e => setDonorForm({...donorForm, name: e.target.value})} />
                </div>

                <div className="field">
                  <label>{t.phone}</label>
                  <input type="tel" required placeholder="+255 7XX XXX XXX" value={donorForm.phone} onChange={e => setDonorForm({...donorForm, phone: e.target.value})} />
                </div>

                <div className="field">
                  <label>{t.email}</label>
                  <input type="email" placeholder="baraka@example.com" value={donorForm.email} onChange={e => setDonorForm({...donorForm, email: e.target.value})} />
                </div>

                <div className="field">
                  <label>{t.bloodGroup}</label>
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
                  <label>{t.weight}</label>
                  <input type="number" min="50" required placeholder="e.g. 65" value={donorForm.weight} onChange={e => setDonorForm({...donorForm, weight: e.target.value})} />
                </div>

                <div className="medical-checklist-box">
                  <label className="checkbox-label">
                    <input type="checkbox" required checked={donorForm.agreed} onChange={e => setDonorForm({...donorForm, agreed: e.target.checked})} />
                    {t.consentText}
                  </label>
                </div>

                <button type="submit" className="btn-red-main full-width">{t.btnSubmitDonor}</button>
              </form>
            )}
          </div>
        </main>
      )}

      {/* REQUEST BLOOD PAGE */}
      {page === 'request' && (
        <main className="form-page">
          <div className="portal-container">
            <button className="back-btn" onClick={() => setPage('home')}>← {t.navHome}</button>
            <h1>Emergency Blood Request</h1>
            <form onSubmit={(e) => { e.preventDefault(); alert("Request Submitted!"); setPage('home'); }} className="modern-form">
              <div className="field">
                <label>Facility Name</label>
                <input type="text" placeholder="Hospital Name" required />
              </div>
              <div className="field">
                <label>Required Blood Group</label>
                <select>
                  <option value="O-">O Negative</option>
                  <option value="O+">O Positive</option>
                </select>
              </div>
              <button type="submit" className="btn-red-main full-width">Submit Request</button>
            </form>
          </div>
        </main>
      )}

      {/* ADMIN CONTROL DASHBOARD WITH AUTHENTICATION LOCK */}
      {page === 'admin' && (
        <main className="admin-wrapper">
          {!isAdminAuthenticated ? (
            /* ADMIN LOGIN AUTHENTICATION FORM */
            <div className="admin-lock-card">
              <div className="lock-icon-large">🔒</div>
              <h2>ADMIN AUTHENTICATION REQUIRED</h2>
              <p>Eneo hili linatumiwa na Ma-Admin pekee. Ingiza Passcode yako kufungua Dashboard.</p>

              <form onSubmit={handleAdminLogin} className="admin-login-form">
                <div className="field">
                  <label>Admin Passcode / Security Key</label>
                  <input 
                    type="password" 
                    placeholder="Ingiza Passcode (Default: admin123)" 
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    required
                  />
                </div>
                {authError && <div className="auth-error-msg">{authError}</div>}
                <button type="submit" className="btn-red-main full-width">🔓 Verify & Access Hub</button>
              </form>
            </div>
          ) : (
            /* AUTHENTICATED ADMIN DASHBOARD */
            <div>
              <div className="admin-header-flex">
                <div>
                  <h1>{t.adminTitle}</h1>
                  <p>MFA Status: <span className="green-text">ACTIVE</span> | Session: <span className="green-text">ENCRYPTED</span></p>
                </div>
                <button className="btn-logout" onClick={handleAdminLogout}>🚪 Logout Admin</button>
              </div>
{/* Key Admin Statistics Bar */}
              <div className="admin-stats-summary-grid">
                <div className="summary-card">
                  <span className="summary-title">{t.totalDonorsLabel}</span>
                  <div className="summary-value red-text">{donorsList.length}</div>
                </div>
                <div className="summary-card">
                  <span className="summary-title">{t.totalRecipientsLabel}</span>
                  <div className="summary-value gold-text">{requestsList.length}</div>
                </div>
                <div className="summary-card">
                  <span className="summary-title">{t.totalUnitsLabel}</span>
                  <div className="summary-value green-text">{totalReservedUnits} Units</div>
                </div>
                <div className="summary-card">
                  <span className="summary-title">{t.criticalCasesLabel}</span>
                  <div className="summary-value pink-text">1 Critical</div>
                </div>
              </div>

              {/* Donors List Table */}
              <div className="admin-table-section">
                <h3>🩸 Registered Donors List ({donorsList.length})</h3>
                <table className="admin-custom-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Full Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Location</th>
                      <th>Group</th>
                      <th>Weight</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donorsList.map((d) => (
                      <tr key={d.id}>
                        <td><code>{d.id}</code></td>
                        <td><strong>{d.name}</strong></td>
                        <td>{d.phone}</td>
                        <td>{d.email}</td>
                        <td>{d.location}</td>
                        <td><span className="blood-tag">{d.blood}</span></td>
                        <td>{d.weight}</td>
                        <td><span className="status-verified">{d.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Recipients Table */}
              <div className="admin-table-section">
                <h3>🏥 Recipient Requests & Hospital Cases ({requestsList.length})</h3>
                <table className="admin-custom-table">
                  <thead>
                    <tr>
                      <th>REQ ID</th>
                      <th>Facility / Hospital</th>
                      <th>Doctor</th>
                      <th>Patient</th>
                      <th>Group</th>
                      <th>Units</th>
                      <th>Urgency</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestsList.map((r) => (
                      <tr key={r.id}>
                        <td><code>{r.id}</code></td>
                        <td>{r.facility}</td>
                        <td>{r.doctor}</td>
                        <td><strong>{r.patient}</strong></td>
                        <td><span className="blood-tag">{r.blood}</span></td>
                        <td>{r.units} Units</td>
                        <td><span className={`urgency-pill ${r.urgency.toLowerCase()}`}>{r.urgency}</span></td>
                        <td>{r.status}</td>
                        <td>
                          {r.status === 'PENDING' ? (
                            <button className="btn-approve" onClick={() => handleApproveRequest(r.id)}>Approve</button>
                          ) : (
                            <span className="approved-tag">✓ Approved</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Blood Stock Control */}
              <div className="admin-stock-control-box">
                <h3>{t.adminStockTitle}</h3>
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

              {/* Media Upload */}
              <div className="admin-media-manager">
                <h3>{t.adminMediaTitle}</h3>
                <form onSubmit={handleMediaUpload} className="admin-img-form">
                  <div className="form-group-row">
                    <input type="text" placeholder="Title" value={uploadForm.title} onChange={e => setUploadForm({...uploadForm, title: e.target.value})} required />
                    <input type="file" accept="image/*,video/*" onChange={handleFileSelect} className="file-input-btn" />
                  </div>

                  <div className="form-group-row">
                    <input type="url" placeholder="Direct URL Link" value={uploadForm.url} onChange={e => setUploadForm({...uploadForm, url: e.target.value})} />
                    <input type="text" placeholder="Caption" value={uploadForm.caption} onChange={e => setUploadForm({...uploadForm, caption: e.target.value})} />
                  </div>

                  <button type="submit" className="btn-add-img">{t.btnUpload}</button>
                </form>
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
        <p>Every drop. Every life. International high-security blood donation network.</p>
        <small>© 2026 BLOODLINK. All Rights Reserved.</small>
      </footer>
    </div>
  );
}

export default App;