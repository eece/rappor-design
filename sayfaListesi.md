# Eğitim Platformu - Rol Bazlı Sayfa Listesi

## 1. Ortak / Kimlik Doğrulama Sayfaları (Auth Flow)
* **Giriş (Login) Sayfası:** Kullanıcıların e-posta ve şifreleriyle sisteme güvenli bir şekilde giriş yapmasını sağlar.
* **Kayıt (Register) Sayfası:** Yeni kullanıcıların öğretmen, öğrenci veya veli rolünü seçerek sisteme üye olmasını sağlar.
* **E-Posta Doğrulama (Email Verification) Sayfası:** Kayıt sonrası hesap güvenliği için gönderilen 6 haneli kodun (OTP) girilerek e-postanın onaylanmasını sağlar.

## 2. Admin İçin Gerekli Sayfalar
* **Admin Dashboard (Genel Yönetim Paneli):** Sistemdeki genel istatistikleri ve bekleyen onayları gösteren ana yönetim ekranıdır.
* **Kullanıcı ve Rol Yönetimi Sayfası:** Sistemdeki öğretmen, öğrenci ve veli hesaplarının listelendiği, yetkilendirildiği veya durumlarının yönetildiği sayfadır.
* **İlişki ve Atama Yönetimi Sayfası:** Öğrencilerin hangi velilerle ve hangi sınıflarla eşleştirileceğinin merkezi olarak kurulduğu ilişkisel yönetim ekranıdır.
* **Sınıf ve Eğitim Yapısı Yönetimi Sayfası:** Sistemdeki sınıf seviyelerinin (4. sınıf, 5. sınıf vb.) ,derslerin, derslere bağlı konuların, tanımlandığı sayfadır.

## 3. Öğretmen İçin Gerekli Sayfalar
* **Öğretmen Takvim (Calendar) Sayfası:** Öğretmenin ders oturumlarını planladığı, geçmiş ve gelecek derslerini aylık/haftalık grid yapısında gördüğü ana takvim ekranıdır.
* **Ders ve Konu Yönetim Sayfası:** Atandığı derslere ait alt konuların, Markdown ders notlarının ve harici materyal linklerinin repetear ile (URL/Ad) girildiği içerik yönetim sayfasıdır.
* **Quiz ve Soru Yönetim Sayfası:** Konulara bağlı çoktan seçmeli veya boşluk doldurma tipindeki soruların JSON payload olarak oluşturulduğu sınav hazırlık ekranıdır. Quiz oluştururken önce 4 şıklı ya da 5 şıklı seçimi yapılır. Ona göre soru ve seçenekler gelir, öğretmen doldurup, doğru seçeneği de belirtir.
* **Yoklama ve Tahsilat (Finans) Sayfası:** Takvimdeki bir derse katılan öğrencilerin seçildiği, snapshot fiyatlandırma üzerinden `is_paid` (ödendi) takibinin yapıldığı yoklama ve borç kapatma ekranıdır.

## 4. Öğrenci İçin Gerekli Sayfalar
* **Öğrenci Ders Takvimi Sayfası:** Öğrencinin kendisine atanan dersleri, etkinlikleri ve planlanmış oturumları takvim veya liste halinde gördüğü ana sayfadır.
* **Ders Detay ve Materyal Sayfası:** Seçilen derse ve konuya ait Markdown ders notlarının okunduğu ve öğretmenin eklediği harici materyal linklerine ulaşıldığı sayfadır.
* **Quiz Çözme (Test) Sayfası:** Geri sayım sayacı eşliğinde soruların yanıtlandığı, cevapların tarayıcı hafızasında (Zustand) güvenle tutulduğu interaktif sınav ekranıdır.
* **Sınav Sonuç ve Analiz Sayfası:** Tamamlanan sınavın ardından anlık başarı oranının, doğru/yanlış istatistiklerinin ve soru çözümlerinin incelendiği rapordur.

## 5. Veli İçin Gerekli Sayfalar
* **Veli Dashboard & Çocuk Seçim Sayfası:** Birden fazla çocuğa sahip velilerin, dropdown üzerinden ilgili öğrenciyi seçerek o çocuğun verilerine odaklanmasını sağlayan ana ekrandır.
* **Finansal Borç ve Ödeme Takip Sayfası:** Seçili öğrencinin geçmiş ve gelecekteki derslerinden doğan, henüz ödenmemiş (`is_paid: false`) toplam borç miktarını ve detaylarını gösteren finansal ekrandır.
* **Öğrenci Gelişim ve Rapor Sayfası:** Çocuğun tamamladığı quizlerin başarı grafiklerini ve ders bazlı ilerleme durumunu gözlemlediği takip ekranıdır.