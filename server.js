import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Screens metadata registry
const screens = [
  { id: 'genel_y_netim_paneli_rappor', title: 'Genel Yönetim Paneli', category: 'Yönetim & İdare', role: 'Yönetici', icon: 'dashboard', desc: 'Kurum geneli istatistikler, aktif dersler, finansal özet ve operasyonel metrikler.' },
  { id: 'kullan_c_ve_rol_y_netimi_rappor', title: 'Kullanıcı ve Rol Yönetimi', category: 'Yönetim & İdare', role: 'Yönetici', icon: 'manage_accounts', desc: 'Öğretmen, öğrenci, veli ve idareci hesapları, rol yetkilendirmeleri ve kullanıcı listesi.' },
  { id: 's_n_f_ve_e_itim_yap_s_y_netimi_rappor', title: 'Sınıf ve Eğitim Yapısı Yönetimi', category: 'Yönetim & İdare', role: 'Yönetici', icon: 'school', desc: 'Şubeler, seviyeler, derslikler ve eğitim hiyerarşisi yapılandırması.' },
  { id: 'i_li_ki_ve_atama_y_netimi_rappor', title: 'İlişki ve Atama Yönetimi', category: 'Yönetim & İdare', role: 'Yönetici', icon: 'group_add', desc: 'Öğretmen-ders-sınıf atamaları ve öğrenci danışmanlık eşleştirmeleri.' },
  { id: 'ders_ve_i_erik_y_netimi_rappor', title: 'Ders ve İçerik Yönetimi', category: 'Akademik & Müfredat', role: 'Akademik', icon: 'menu_book', desc: 'Müfredat üniteleri, ders planları, konu ağaçları ve içerik havuzu.' },
  { id: 'ders_detay_ve_materyaller_rappor', title: 'Ders Detay ve Materyaller', category: 'Akademik & Müfredat', role: 'Öğretmen / Öğrenci', icon: 'folder_open', desc: 'Ders notları, video kayıtları, PDF materyalleri ve ödev dökümanları.' },
  { id: 's_nav_ve_soru_y_netimi_rappor', title: 'Sınav ve Soru Yönetimi', category: 'Ölçme & Değerlendirme', role: 'Öğretmen', icon: 'quiz', desc: 'Soru bankası, optik form yönetimi, online/yüz yüze sınav hazırlama.' },
  { id: 's_nav_sonu_ve_analiz_rappor', title: 'Sınav Sonuç ve Analiz', category: 'Ölçme & Değerlendirme', role: 'Yönetici / Öğretmen', icon: 'analytics', desc: 'Detaylı net analizleri, kazanım bazlı başarı grafikleri ve karne çıktıları.' },
  { id: 'quiz_zme_ekran_rappor', title: 'Quiz Çözme Ekranı', category: 'Ölçme & Değerlendirme', role: 'Öğrenci', icon: 'timer', desc: 'Öğrenciler için sayaçlı, soru gezintili interaktif test ve quiz arayüzü.' },
  { id: 'retmen_takvimi_rappor', title: 'Öğretmen Takvimi', category: 'Öğretmen Paneli', role: 'Öğretmen', icon: 'calendar_month', desc: 'Haftalık ders programı, etüt saatleri ve birebir öğrenci randevuları.' },
  { id: 'yoklama_ve_finans_takibi_rappor', title: 'Yoklama ve Finans Takibi', category: 'Öğretmen Paneli', role: 'Öğretmen', icon: 'fact_check', desc: 'Ders bazlı yoklama alma, ek ders ve hakediş puantaj tablosu.' },
  { id: 'renci_ders_takvimi_rappor', title: 'Öğrenci Ders Takvimi', category: 'Öğrenci & Veli', role: 'Öğrenci', icon: 'event', desc: 'Öğrencinin haftalık ders, etüt ve sınav takvimi ile canlı ders bağlantıları.' },
  { id: 'renci_geli_im_ve_raporlar_rappor', title: 'Öğrenci Gelişim ve Raporlar', category: 'Öğrenci & Veli', role: 'Öğrenci / Veli', icon: 'trending_up', desc: 'Konu bazlı yetkinlik haritası, ödev tamamlama oranı ve deneme sınavı trendleri.' },
  { id: 'veli_paneli_ve_renci_se_imi_rappor', title: 'Veli Paneli ve Öğrenci Seçimi', category: 'Öğrenci & Veli', role: 'Veli', icon: 'family_restroom', desc: 'Birden fazla öğrenci takibi, devamsızlık durumu, ödev kontrolü ve öğretmen mesajları.' },
  { id: 'finansal_takip_ve_demeler_rappor', title: 'Finansal Takip ve Ödemeler', category: 'Finans & Muhasebe', role: 'Finans', icon: 'payments', desc: 'Öğrenci taksitleri, tahsilat durumu, gelir-gider raporları ve fatura takibi.' },
  { id: 'giri_yap_rappor', title: 'Giriş Yap', category: 'Kimlik & Güvenlik', role: 'Genel', icon: 'login', desc: 'Kullanıcı giriş ekranı (T.C. Kimlik / E-posta ve şifre ile giriş).' },
  { id: 'kay_t_ol_rappor', title: 'Kayıt Ol', category: 'Kimlik & Güvenlik', role: 'Genel', icon: 'person_add', desc: 'Yeni veli/öğrenci/öğretmen başvuru ve ön kayıt arayüzü.' },
  { id: 'e_posta_do_rulama_rappor', title: 'E-posta Doğrulama', category: 'Kimlik & Güvenlik', role: 'Genel', icon: 'mark_email_read', desc: '6 haneli güvenlik kodu ile e-posta ve hesap doğrulama ekranı.' }
];

// API route to get all screens
app.get('/api/screens', (req, res) => {
  res.json(screens);
});

// Middleware to inject a floating navigation bar into any rendered screen code.html
app.get('/:folder/code.html', (req, res, next) => {
  const { folder } = req.params;
  const filePath = path.join(__dirname, folder, 'code.html');

  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Inject floating switcher widget
    const navWidget = `
<!-- RAPPOR Navigation Drawer Overlay Widget -->
<div id="rappor-quick-nav-bar" style="position: fixed; bottom: 18px; right: 18px; z-index: 99999; font-family: 'Inter', sans-serif; display: flex; align-items: center; gap: 8px; background: #000a1e; color: #ffffff; padding: 6px 12px; border-radius: 9999px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15);">
  <a href="/" style="display: flex; align-items: center; gap: 6px; color: #79f7e3; text-decoration: none; font-size: 13px; font-weight: 600; padding: 4px 8px; border-radius: 6px;">
    <span class="material-symbols-outlined" style="font-size: 18px;">apps</span>
    <span>RAPPOR Hub</span>
  </a>
  <span style="color: rgba(255,255,255,0.3);">|</span>
  <select onchange="if(this.value) window.location.href=this.value;" style="background: rgba(255,255,255,0.1); color: #ffffff; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; font-size: 12px; padding: 4px 8px; outline: none; cursor: pointer; max-width: 200px;">
    <option value="" disabled selected>Hızlı Ekran Değiştir...</option>
    ${screens.map(s => `<option value="/${s.id}/code.html" ${s.id === folder ? 'selected' : ''}>${s.title} (${s.role})</option>`).join('')}
  </select>
</div>
`;
    // Insert before </body> if present, else append
    if (content.includes('</body>')) {
      content = content.replace('</body>', `${navWidget}</body>`);
    } else {
      content += navWidget;
    }
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(content);
  }
  next();
});

// Serve static assets
app.use(express.static(__dirname));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`RAPPOR Platform Dev Server listening on http://0.0.0.0:${PORT}`);
});
