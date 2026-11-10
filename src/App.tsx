import { useEffect, useState } from "react";

type Theme = "dark" | "light";

type SubscriptionPlan = {
  id: string;
  title: string;
  periodLabel: string;
  price: number;
  popular?: boolean;
};

type GameProfile = {
  id: string;
  name: string;
  category: string;
  fps: number;
  temp: number;
  status: string;
};

const INITIAL_PLANS: SubscriptionPlan[] = [
  { id: "day", title: "اشتراك يومي", periodLabel: "يوم واحد", price: 5 },
  { id: "week", title: "اشتراك أسبوعي", periodLabel: "7 أيام", price: 25 },
  { id: "month", title: "اشتراك شهري", periodLabel: "30 يوم", price: 79, popular: true },
  { id: "6months", title: "اشتراك 6 أشهر", periodLabel: "6 أشهر", price: 399 },
  { id: "year", title: "اشتراك سنوي", periodLabel: "سنة كاملة", price: 699 },
];

const ALL_GAMES: GameProfile[] = [
  { id: "1", name: "Farlight 84", category: "Battle Royale", fps: 120, temp: 38, status: "محسّن بالذكاء الاصطناعي" },
  { id: "2", name: "PUBG Mobile", category: "Battle Royale", fps: 90, temp: 40, status: "محسّن بالذكاء الاصطناعي" },
  { id: "3", name: "Apex Legends Mobile", category: "FPS Games", fps: 120, temp: 37, status: "محسّن بالذكاء الاصطناعي" },
  { id: "4", name: "OneState", category: "Roleplay", fps: 60, temp: 35, status: "محسّن بالذكاء الاصطناعي" },
  { id: "5", name: "Call of Duty: Mobile", category: "FPS Action", fps: 120, temp: 39, status: "محسّن بالذكاء الاصطناعي" },
  { id: "6", name: "Free Fire Max", category: "Battle Royale", fps: 90, temp: 36, status: "محسّن بالذكاء الاصطناعي" },
  { id: "7", name: "Genshin Impact", category: "Open World", fps: 60, temp: 42, status: "محسّن بالذكاء الاصطناعي" },
  { id: "8", name: "Car Parking Multiplayer", category: "Simulation", fps: 60, temp: 34, status: "محسّن بالذكاء الاصطناعي" },
];

export default function App() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const [plans, setPlans] = useState<SubscriptionPlan[]>(INITIAL_PLANS);
  const [editingPrices, setEditingPrices] = useState<Record<string, number>>({});
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<SubscriptionPlan | null>(null);
  
  // حالة رفع الإيصال للتحويل البنكي
  const [receiptUploaded, setReceiptUploaded] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, [theme]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  function showToast(msg: string) {
    setToast(msg);
  }

  function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault();
    // التحقق المباشر من بيانات الأدمن الجديدة الخاصة بك
    if (usernameInput.trim() === "Abdullah farhan" && passwordInput.trim() === "Kw67657617") {
      setIsAdminLoggedIn(true);
      setActiveTab("admin");
      showToast("مرحباً بك يا عبد الله في لوحة الإدارة الآمنة 👑");
    } else {
      showToast("❌ اسم المستخدم أو كلمة المرور غير صحيحة!");
    }
  }

  function handlePriceUpdate(planId: string) {
    const newPrice = editingPrices[planId];
    if (newPrice !== undefined && newPrice >= 0) {
      setPlans((prev) => prev.map((p) => (p.id === planId ? { ...p, price: Number(newPrice) } : p)));
      showToast("✅ تم تحديث السعر للزوار فوراً!");
    }
  }

  const isDark = theme === "dark";
  const c = {
    bg: isDark ? "#0b0f19" : "#f1f5f9",
    card: isDark ? "#151c2c" : "#ffffff",
    border: isDark ? "#232e47" : "#e2e8f0",
    text: isDark ? "#f1f5f9" : "#0f172a",
    muted: isDark ? "#94a3b8" : "#64748b",
    primary: "#8b5cf6",
    accent: "#06b6d4",
    success: "#10b981",
    danger: "#ef4444",
    apple: "#000000",
    google: "#4285F4",
  };

  return (
    <div style={{ minHeight: "100vh", background: c.bg, color: c.text, display: "flex", fontFamily: "system-ui" }}>
      <aside style={{ width: 260, background: c.card, borderInlineEnd: `1px solid ${c.border}`, padding: 20, display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: c.primary, marginBottom: 30 }}>🎮 AI-G KSA GAMING</div>
        <button onClick={() => setActiveTab("dashboard")} style={{ padding: "12px", background: activeTab === "dashboard" ? `${c.primary}22` : "transparent", color: activeTab === "dashboard" ? c.primary : c.muted, border: "none", borderRadius: 10, cursor: "pointer", marginBottom: 8, fontWeight: 700, textAlign: "start" }}>
          🎮 مركز كافة الألعاب
        </button>
        <button onClick={() => setActiveTab("pricing")} style={{ padding: "12px", background: activeTab === "pricing" || activeTab === "checkout" ? `${c.primary}22` : "transparent", color: activeTab === "pricing" || activeTab === "checkout" ? c.primary : c.muted, border: "none", borderRadius: 10, cursor: "pointer", marginBottom: 8, fontWeight: 700, textAlign: "start" }}>
          💎 باقات الاشتراك والدفع
        </button>
        <button onClick={() => setActiveTab("admin")} style={{ padding: "12px", background: activeTab === "admin" ? `${c.primary}22` : "transparent", color: activeTab === "admin" ? c.primary : c.muted, border: "none", borderRadius: 10, cursor: "pointer", marginBottom: 8, fontWeight: 700, textAlign: "start" }}>
          🔒 لوحة الأدمن الآمنة
        </button>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} style={{ marginTop: "auto", padding: 10, borderRadius: 8, border: `1px solid ${c.border}`, background: "transparent", color: c.text, cursor: "pointer" }}>
          {theme === "dark" ? "☀️ نهاري" : "🌙 ليلي"}
        </button>
      </aside>

      <main style={{ flex: 1, padding: 30, overflowY: "auto" }}>
        {activeTab === "dashboard" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>🎮 مركز التحسين الذكي لكافة الألعاب</h1>
            <p style={{ color: c.muted, marginBottom: 20, fontSize: 14 }}>تم تفعيل محرك رفع الإطارات وخفض الحرارة التلقائي لجميع ألعابك المفضلة.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              {ALL_GAMES.map((g) => (
                <div key={g.id} style={{ background: c.card, border: `1px solid ${c.border}`, padding: 20, borderRadius: 14 }}>
                  <h3 style={{ marginBottom: 6 }}>{g.name}</h3>
                  <p style={{ color: c.accent, fontSize: 12, marginBottom: 10 }}>التصنيف: {g.category}</p>
                  <p style={{ color: c.muted, fontSize: 13, marginBottom: 12 }}>الأداء المستهدف: {g.fps} FPS | الحرارة: {g.temp}°C</p>
                  <button onClick={() => showToast(`🚀 تم تفعيل تعزيز الذكاء الاصطناعي لـ ${g.name}`)} style={{ width: "100%", padding: "8px", borderRadius: 8, border: "none", background: `${c.primary}22`, color: c.primary, fontWeight: 700, cursor: "pointer" }}>
                    تفعيل التحسين الآن
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "pricing" && (
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 10 }}>💎 باقات الاشتراك الشاملة</h1>
            <p style={{ color: c.muted, marginBottom: 20, fontSize: 14 }}>اختر الباقة المناسبة لك وادفع فوراً عبر Apple Pay، Google Pay، أو التحويل البنكي.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
              {plans.map((p) => (
                <div key={p.id} style={{ background: c.card, border: `2px solid ${p.popular ? c.primary : c.border}`, borderRadius: 16, padding: 24, textAlign: "center" }}>
                  <h3>{p.title}</h3>
                  <div style={{ fontSize: 32, fontWeight: 900, color: c.accent, margin: "14px 0" }}>{p.price} ر.س</div>
                  <p style={{ color: c.muted, fontSize: 13, marginBottom: 20 }}>صلاحية: {p.periodLabel}</p>
                  <button onClick={() => { setSelectedPlanForCheckout(p); setActiveTab("checkout"); }} style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: c.primary, color: "#fff", fontWeight: 700, cursor: "pointer" }}>
                    اختر وادفع 🚀
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "checkout" && selectedPlanForCheckout && (
          <div style={{ maxWidth: 500, margin: "0 auto", background: c.card, padding: 30, borderRadius: 16, border: `1px solid ${c.border}` }}>
            <h2 style={{ marginBottom: 10, color: c.success }}>💳 إتمام الدفع الآمن</h2>
            <p style={{ color: c.muted, marginBottom: 20 }}>الباقة المختارة: <b>{selectedPlanForCheckout.title}</b> — والمبلغ: <b>{selectedPlanForCheckout.price} ر.س</b></p>
            
            {/* أزرار الدفع السريع Apple Pay و Google Pay */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              <button onClick={() => showToast("🍎 جاري الاتصال ببوابة Apple Pay...")} style={{ width: "100%", padding: 14, borderRadius: 12, border: "none", background: c.apple, color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
                 Pay الدفع السريع بـ Apple Pay
              </button>
              <button onClick={() => showToast("🤖 جاري الاتصال بـ Google Pay / Android Pay...")} style={{ width: "100%", padding: 14, borderRadius: 12, border: "none", background: c.google, color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
                Google Pay / Android Pay الدفع السريع
              </button>
            </div>

            <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 20, marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, marginBottom: 10 }}>🏦 أو التحويل البنكي المباشر (الآيبان IBAN)</h3>
              <div style={{ background: c.bg, padding: 14, borderRadius: 10, fontSize: 13, lineHeight: 1.6, color: c.muted, marginBottom: 14 }}>
                <b>البنك الأهلي السعودي (SNB)</b><br />
                اسم الحساب: شركة AI-G KSA GAMING<br />
                رقم الآيبان: <span style={{ color: c.accent, userSelect: "all" }}>SA03 1000 0001 2345 6789 0123</span>
              </div>
              <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>رفع إيصال التحويل البنكي:</label>
              <input type="file" onChange={() => setReceiptUploaded(true)} style={{ width: "100%", padding: 8, background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, marginBottom: 12, color: c.text }} />
              {receiptUploaded && <p style={{ color: c.success, fontSize: 13, marginBottom: 10 }}>✔ تم رفع الإيصال بنجاح وسيتم التفعيل خلال دقائق!</p>}
            </div>

            <button onClick={() => { setActiveTab("pricing"); showToast("✨ تم استلام طلبك بنجاح!"); }} style={{ width: "100%", padding: 12, borderRadius: 10, border: `1px solid ${c.border}`, background: "transparent", color: c.text, fontWeight: 700, cursor: "pointer" }}>
              العودة للباقات
            </button>
          </div>
        )}

        {activeTab === "admin" && (
          <div>
            {!isAdminLoggedIn ? (
              <div style={{ maxWidth: 380, margin: "40px auto", background: c.card, padding: 30, borderRadius: 16, border: `1px solid ${c.border}` }}>
                <h2 style={{ textAlign: "center", marginBottom: 20 }}>🔒 لوحة الإدارة المؤمّنة</h2>
                <form onSubmit={handleAdminLogin}>
                  <label style={{ display: "block", fontSize: 13, color: c.muted, marginBottom: 6 }}>اسم المستخدم (Username)</label>
                  <input
                    type="text"
                    placeholder="أدخل اسم المستخدم"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    style={{ width: "100%", padding: 12, borderRadius: 10, border: `1px solid ${c.border}`, background: c.bg, color: c.text, marginBottom: 16, fontSize: 15 }}
                  />

                  <label style={{ display: "block", fontSize: 13, color: c.muted, marginBottom: 6 }}>كلمة المرور (Password)</label>
                  <input
                    type="password"
                    placeholder="أدخل كلمة المرور"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    style={{ width: "100%", padding: 12, borderRadius: 10, border: `1px solid ${c.border}`, background: c.bg, color: c.text, marginBottom: 20, fontSize: 15 }}
                  />

                  <button type="submit" style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: c.success, color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 16 }}>
                    دخول مشفر وآمن
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                  <h1 style={{ fontSize: 24, fontWeight: 800, color: c.success }}>⚙️ لوحة تحكم الأدمن (تعديل الأسعار)</h1>
                  <button onClick={() => setIsAdminLoggedIn(false)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: c.danger, color: "#fff", cursor: "pointer", fontWeight: 700 }}>
                    تسجيل الخروج
                  </button>
                </div>
                <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: 24 }}>
                  {plans.map((p) => (
                    <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${c.border}` }}>
                      <b>{p.title}</b>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <input type="number" defaultValue={p.price} onChange={(e) => setEditingPrices({ ...editingPrices, [p.id]: Number(e.target.value) })} style={{ width: 80, padding: 8, borderRadius: 8, border: `1px solid ${c.border}`, background: c.bg, color: c.text, textAlign: "center" }} />
                        <span>ر.س</span>
                        <button onClick={() => handlePriceUpdate(p.id)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: c.primary, color: "#fff", cursor: "pointer", fontWeight: 700 }}>تحديث</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {toast && <div style={{ position: "fixed", bottom: 20, left: 20, background: c.card, border: `1px solid ${c.primary}`, padding: "12px 20px", borderRadius: 10, fontWeight: 700, zIndex: 999 }}>{toast}</div>}
    </div>
  );
}
