# Safari Cache Temizleme Rehberi

## 🔄 Safari'de Cache Temizleme

### Yöntem 1: Hard Refresh (En Hızlı)
1. Safari'de oyun sayfasını açın
2. **Shift + Command + R** (Mac) veya **Shift + Ctrl + R** (Windows) tuşlarına basın
3. Sayfa yeniden yüklenecek ve cache atlanacak

### Yöntem 2: Safari Ayarlarından Temizleme
1. Safari menüsünden **Geliştirici** → **Önbellekleri Boşalt** seçin
2. Veya **Safari** → **Tercihler** → **Gelişmiş** → **Geliştirici Menüsünü Göster**
3. Sonra **Geliştirici** → **Önbellekleri Boşalt**

### Yöntem 3: Service Worker'ı Devre Dışı Bırakma
1. Safari'de oyun sayfasını açın
2. **Geliştirici** → **Service Workers** → **Unregister** tıklayın
3. Sayfayı yenileyin

### Yöntem 4: Tamamen Temizleme
1. Safari → **Tercihler** → **Gizlilik**
2. **Web Sitesi Verilerini Yönet** tıklayın
3. `guvenk82.github.io` sitesini bulun
4. **Kaldır** tıklayın
5. Sayfayı yenileyin

## 📱 iOS Safari'de Cache Temizleme

### Yöntem 1: Hard Refresh
1. Oyun sayfasını açın
2. Sayfayı aşağı çekip bırakın (pull to refresh)
3. Veya sayfayı kapatıp tekrar açın

### Yöntem 2: Safari Ayarları
1. **Ayarlar** → **Safari**
2. **Geçmişi ve Web Sitesi Verilerini Temizle** tıklayın
3. **Geçmişi ve Verileri Temizle** onaylayın

### Yöntem 3: Uçak Modu
1. Uçak modunu açın
2. Safari'yi kapatın
3. Uçak modunu kapatın
4. Safari'yi tekrar açın

## 🔧 Service Worker Cache Versiyonu

Service Worker cache versiyonu `v2` olarak güncellendi. Eski cache otomatik olarak silinecek.

## ✅ Kontrol

Cache temizlendikten sonra:
1. Sayfayı yenileyin
2. Console'u açın (Geliştirici → Web Inspector)
3. "ServiceWorker registered" mesajını görmelisiniz
4. Yeni versiyon yüklenecek

## 🆘 Hala Çalışmıyorsa

1. Safari'yi tamamen kapatın
2. Tekrar açın
3. Oyun sayfasına gidin
4. Hard refresh yapın (Shift + Command + R)

