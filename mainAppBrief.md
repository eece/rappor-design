Tasarım Mobile first olmalı ve https://mantine.dev/ yapısına uygun olmalı.

## 1. Rol, Yetki ve İlişki Mimarisi

Kullanıcılar sisteme Kayıt (Register) ekranından **Öğretmen, Öğrenci veya Veli** üyelik tipini seçerek dahil olur ve zorunlu E-Posta Doğrulama (Email Verification) adımını geçer. Kullanıcılar arasındaki tüm hiyerarşik bağlar sistem yöneticisi tarafından kurulur.

* **Admin:** Tüm sistemin, finansal altyapının ve kullanıcı ilişkilerinin tek yöneticisidir. Sınıfları oluşturur. Filament Relation Managers üzerinden hangi öğrencinin hangi veliye ait olduğunu, hangi öğrencinin hangi sınıfa/öğretmene atanacağını merkezi olarak belirler.
* **Öğretmen:** 
  * Atandığı sınıflara Ders ve alt Konular oluşturur. Konulara Markdown ders notları, Quizler ve **Harici Materyal Linkleri (URL + Ad)** ekler.
  * Kendisine ait FullCalendar arayüzünde ders oturumlarını planlar.
  * Derse katılan öğrencileri takvim üzerinden seçer, yoklama alır ve "Snapshot" mantığıyla finansal kayıt oluşturarak ödemesi alınan dersleri (`is_paid`) işaretler.
* **Öğrenci:** Sınıf hiyerarşisinde gezinir. Kendi panelindeki takvim veya liste üzerinden planlanmış derslerini görür. Ders detayına tıkladığında ilgili konunun materyal URL'lerine, notlarına ve sınavlarına doğrudan erişir. Sınavları çözer, anlık doğruluk analizlerini görüntüler.
* **Veli (Read-Only & Finans):** Sisteme veri girişi yapamaz. E-postası doğrulandıktan sonra Admin tarafından çocuklarıyla eşleştirildiğinde, paneli üzerinden çocukları arasında geçiş (dropdown) yapar. Çocuğunun gelişim istatistiklerini ve ödenmemiş (`is_paid: false`) geçmiş/gelecek ders ücretlerinin listelendiği finansal dashboard'u görüntüler.

---

## 2. Finansal Akış ve Takvim Yönetimi

Harici takvim uygulamaları (Google Calendar vb.) kullanılmaz. Tüm veri bütünlüğü ve finansal kesinlik uygulamanın kendi veritabanında sağlanır.

* **Snapshot (Anlık Görüntü) Fiyatlandırma:** Veritabanında öğrenciye ait bir `current_hourly_rate` (güncel saatlik ücret) tutulur. Öğretmen takvimde bir ders oluşturup öğrenciyi derse eklediği anda (veya Admin öğrencinin ücretini belirlediğinde), sistem o anki fiyatı okuyarak `Lesson_Student` pivot tablosuna mühürler (`fee` sütunu). Gelecekte öğrencinin birim fiyatı artırılsa bile, geçmiş derslerin oluşturduğu finansal borç kayıtları asla değişmez.
* **Tahsilat Paneli:** Öğretmen, takvimdeki geçmiş veya gelecek bir dersin detayına girdiğinde o dersteki öğrencileri listeler. Öğrencinin yanındaki `is_paid` toggle'ı işaretlendiğinde borç kapanır; işaretlenmeyen tüm kayıtlar Veli panelinde "Ödenecek Tutar" olarak toplanır.

---

## 3. Veritabanı ve İlişkisel Model (PostgreSQL)

1. **Users:** `id`, `name`, `email`, `role`, `email_verified_at`.
2. **Parent_Student (Pivot):** Multi-tenant yapı için Veli ve Öğrenci eşleşmeleri.
3. **Student_Pricing:** `student_id`, `current_hourly_rate`.
4. **Classes, Courses:** Eğitim hiyerarşisi (Sınıflar ve Dersler).
5. **Topics:** `id`, `course_id`, `title`, `materials` (JSONB formatında `[{name: '...', url: '...'}]`).
6. **Notes:** `id`, `topic_id`, `title`, `content` (Markdown).
7. **Quizzes, Questions:** Ölçme-değerlendirme tabloları. Sorular esneklik için JSONB `payload` olarak tutulur.
8. **Submissions, Student_Answers:** Öğrenci sonuçları ve madde analizi (soru bazlı başarı ölçümü) pivot tablosu.
9. **Lesson_Sessions (Takvim Olayları):** `id`, `teacher_id`, `topic_id`, `scheduled_at`, `duration`.
10. **Lesson_Student (Yoklama ve Finans Pivotu):** `id`, `lesson_session_id`, `student_id`, `fee` (Snapshot Fiyat), `is_paid` (Boolean).

---

## 4. Teknik Teknoloji Yığını (Tech Stack)

* **Frontend (Öğrenci & Veli SPA):** Vite + ReactJS, TypeScript (Strict Mode).
* **Mock Katmanı:** Mock Service Worker (MSW) - Backend hazır olana kadar API isteklerini simüle eder.
* **UI ve Deneyim:** Tailwind CSS ve Mantine (Takvim görünümleri, data grid tablolar, modaller, bildirimler).
* **State ve Veri Çekme:** TanStack Query (Server state / API önbellekleme), Zustand (Quiz geri sayımı, seçili öğrenci takibi).
* **Backend (API & Yönetim):** Laravel 11, Sanctum (Stateful HTTP-Only Cookie Auth), PostgreSQL.
* **Yönetim Paneli:** FilamentPHP v3 (Takvim için `saade/filament-fullcalendar`, sınırsız materyal girişi için yerleşik Repeater, kompleks ilişkiler için Relation Managers).

---

## 5. Detaylı Geliştirme İş Planı (Roadmap)

### FAZ 1: Frontend İskeleti ve MSW Mock Altyapısı
* **Kurulum:** Vite, TypeScript, Tailwind ve Mantine Provider'ların yapılandırılması. React Router ile `/(auth)`, `/student`, `/parent` route'larının Mantine App Shell ile kurulması.
* **Kayıt ve Doğrulama Akışı (UI):** Üyelik tipi seçimi içeren kayıt formunun yazılması. Kayıt sonrası simüle edilmiş OTP/Link bazlı "E-Posta Doğrulaması" ekranının tasarlanması.
* **MSW Entegrasyonu:** `/api/login`, `/api/calendar`, `/api/finances` gibi uçların MSW handler'ları ile mock JSON dönecek şekilde hazırlanması. Backend ayağa kalkana kadar frontend'in bağımsız test edilebilir hale getirilmesi.

### FAZ 2: Quiz Çözme Motoru ve Kullanıcı Arayüzleri
* **Öğrenci Paneli:** Takvim/Liste üzerinden derslerin gösterilmesi. Ders detayında, MSW'den dönen JSONB verisine göre Markdown notların parse edilmesi ve Materyal URL'lerinin dışa bağlantılı butonlar olarak listelenmesi.
* **İstemci Taraflı Quiz (Zustand):** Çoktan seçmeli ve boşluk doldurma sorularının dinamik render edilmesi. Öğrencinin cevaplarının ve kalan süresinin Zustand store'da tarayıcı hafızasında tutulması, bağlantı kopsa dahi korunması.
* **Veli Paneli:** Birden fazla çocuğa sahip veliler için dropdown ile öğrenci değiştirme mekanizması. MSW üzerinden gelen verilere göre, seçili öğrencinin ödenmemiş (`is_paid: false`) derslerinin Mantine DataGrid ile listelenmesi.

### FAZ 3: Backend Core, Veritabanı ve Auth Katmanı
* **Migration ve İlişkiler:** `Parent_Student`, `Lesson_Student` ve JSONB odaklı (`materials`, `payload`) tabloların oluşturulması. Snapshot fiyat kuralının (Business Logic) Observer veya Action sınıflarıyla güvenceye alınması.
* **SPA Authentication:** Laravel Sanctum üzerinden HTTP-Only Cookie altyapısının kurulması. Yerleşik `MustVerifyEmail` arayüzünün (SMTP/Mailtrap) yapılandırılması, routes dosyalarında `verified` middleware'inin aktif edilmesi.
* **API Uçları ve Yetkilendirme:** Velinin sadece kendi `parent_student` tablosunda eşleştiği çocukların API uçlarına istek atabilmesini sağlayan Policy kurallarının yazılması.

### FAZ 4: Takvim, İçerik ve İlişki Yönetimi (FilamentPHP)
* **Merkezi Ağ Yönetimi:** Admin paneli üzerinden Öğrenci-Veli ve Öğrenci-Sınıf atamalarının Relation Manager'lar ile tek ekrandan drag-and-drop/select mantığıyla bağlanması.
* **Öğretmen Takvim Entegrasyonu (FullCalendar):** Öğretmenin takvime tıklayarak yeni `Lesson_Session` oluşturması. Seçili derse katılan öğrencilerin listelenmesi, anlık Snapshot ücretinin pivot tabloya yazılması ve öğretmenin `is_paid` toggle'ı ile tahsilat işaretlemesi yapması.
* **Materyal Repeater:** Konu (Topic) formunda, Filament'in `Repeater::make('materials')` bileşeni kullanılarak JSON formatında sınırsız dış linkin hızlıca eklenebileceği yapının kurulması.

### FAZ 5: Entegrasyon, Test ve Canlıya Alım
* **MSW İptali:** Frontend uygulamasındaki MSW interceptor'ının (mocking) ortam değişkeni `.env` üzerinden kapatılması.
* **Sunucu Bağlantısı:** Vite (React) uygulamasının TanStack Query aracılığıyla yerel Laravel (Sanctum) sunucusuna entegre edilmesi. CORS kurallarının frontend domainini kabul edecek şekilde sıkılaştırılması.
* **E2E Testler:** E-Posta doğrulama, quiz submission ve finansal snapshot borçlandırma döngülerinin Playwright ile uçtan uca test edilip onaylanması.
* **Deployment:** Laravel (Headless API + Admin Panel) projesinin sunucuya, React SPA uygulamasının ise statik derleme ile CDN'e dağıtılarak yayına alınması.