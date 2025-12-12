# NumMatch - Sayı Eşleştirme Oyunu

Modern ve eğlenceli bir sayı eşleştirme oyunu. PWA (Progressive Web App) desteği ile mobil ve masaüstü cihazlarda çalışır.

## 🎮 Oyun Özellikleri

- 4x4 grid üzerinde sayı eşleştirme
- Otomatik sayı belirme (her 1.8 saniyede)
- Sürükle-bırak ile sayı birleştirme
- Dinamik zorluk sistemi
- En yüksek skor takibi
- Durdur/Devam Et özelliği
- PWA desteği (offline çalışabilir)

## 🚀 Online Deployment

### GitHub Pages

1. Bu repository'yi GitHub'a yükleyin
2. Settings > Pages bölümüne gidin
3. Source olarak "main" branch'ini seçin
4. Save butonuna tıklayın
5. Birkaç dakika sonra oyununuz `https://kullaniciadi.github.io/NumMatch` adresinde yayında olacak

### Netlify

1. [Netlify](https://www.netlify.com/) hesabı oluşturun
2. "Add new site" > "Deploy manually" seçin
3. Tüm dosyaları sürükleyip bırakın
4. Site otomatik olarak yayınlanacak

### Vercel

1. [Vercel](https://vercel.com/) hesabı oluşturun
2. "New Project" butonuna tıklayın
3. Repository'yi bağlayın veya dosyaları yükleyin
4. Deploy butonuna tıklayın

### Firebase Hosting

```bash
# Firebase CLI kurulumu
npm install -g firebase-tools

# Firebase'e giriş yapın
firebase login

# Proje başlatın
firebase init hosting

# Deploy edin
firebase deploy
```

## 📁 Dosya Yapısı

```
NumMatch/
├── index.html          # Ana HTML dosyası
├── style.css           # Stil dosyası
├── script.js           # Oyun mantığı
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker
└── README.md           # Bu dosya
```

## 🔧 Gereksinimler

- Modern bir web tarayıcı (Chrome, Firefox, Safari, Edge)
- HTTPS bağlantısı (PWA özellikleri için - localhost'ta çalışır)

## 📱 PWA Özellikleri

- Ana ekrana eklenebilir
- Offline çalışabilir (Service Worker sayesinde)
- Mobil uyumlu
- App-like deneyim

## 🎯 Oyun Kuralları

1. Her 1.8 saniyede bir rastgele boş hücreye sayı eklenir
2. Başlangıçta eklenen sayı 1'dir
3. Tahtadaki en yüksek değer 64'e ulaştığında eklenen sayı 2 olur
4. Aynı değerdeki sayıları sürükleyerek birleştirebilirsiniz
5. Birleştirilen sayılar toplanır
6. Tüm hücreler dolduğunda oyun biter

## 📝 Notlar

- En yüksek skor localStorage'da saklanır
- Oyun durumu kaydedilmez (her seferinde sıfırdan başlar)
- PWA özellikleri için HTTPS gereklidir (localhost'ta çalışır)

## 🔄 Güncellemeler

- Service Worker cache'i güncellemek için tarayıcı cache'ini temizleyin
- Yeni versiyonlar otomatik olarak algılanır

## 📄 Lisans

Bu proje eğitim amaçlıdır.

