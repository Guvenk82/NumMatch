# GitHub'a Yükleme - Adım Adım Rehber

## 📋 ÖN HAZIRLIK

### 1. Git Kullanıcı Bilgilerinizi Ayarlayın

Terminal'de şu komutları çalıştırın (kendi bilgilerinizle değiştirin):

```bash
git config --global user.name "Adınız Soyadınız"
git config --global user.email "email@example.com"
```

**VEYA** sadece bu proje için:

```bash
cd /Users/gk/Desktop/Projelerim/NumMatch
git config user.name "Adınız Soyadınız"
git config user.email "email@example.com"
```

---

## 🚀 GITHUB'A YÜKLEME ADIMLARI

### ADIM 1: GitHub'da Repository Oluşturun

1. 🌐 [GitHub.com](https://github.com) adresine gidin
2. 🔐 Giriş yapın (yoksa hesap oluşturun)
3. ➕ Sağ üstteki **"+"** butonuna tıklayın
4. 📁 **"New repository"** seçin
5. 📝 Repository adını girin: `NumMatch` (veya istediğiniz isim)
6. 📖 **Description** (opsiyonel): "Sayı eşleştirme oyunu"
7. 🔓 **Public** seçin (GitHub Pages ücretsiz çalışması için)
8. ⚠️ **"Add a README file"** seçeneğini İŞARETLEMEYİN (zaten var)
9. ✅ **"Create repository"** butonuna tıklayın

### ADIM 2: Repository URL'ini Kopyalayın

Oluşturduğunuz repository sayfasında yeşil **"Code"** butonuna tıklayın ve URL'i kopyalayın:
- Örnek: `https://github.com/kullaniciadi/NumMatch.git`

### ADIM 3: Terminal'de Komutları Çalıştırın

Terminal'de şu komutları sırayla çalıştırın:

```bash
# Proje klasörüne gidin (zaten oradasınız)
cd /Users/gk/Desktop/Projelerim/NumMatch

# Git kullanıcı bilgilerinizi ayarlayın (henüz yapmadıysanız)
git config user.name "Adınız"
git config user.email "email@example.com"

# Branch'i main yap
git branch -M main

# Dosyaları commit edin
git add .
git commit -m "Initial commit: NumMatch game"

# GitHub repository'nizi ekleyin (URL'İ DEĞİŞTİRİN!)
git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git

# GitHub'a yükleyin
git push -u origin main
```

**ÖNEMLİ:** `KULLANICI_ADI` ve `REPO_ADI` kısımlarını kendi bilgilerinizle değiştirin!

### ADIM 4: GitHub Pages'i Aktifleştirin

1. GitHub repository sayfanıza gidin
2. ⚙️ **Settings** sekmesine tıklayın
3. 📄 Sol menüden **"Pages"** seçin
4. 📂 **Source** bölümünden:
   - **Branch:** `main` seçin
   - **Folder:** `/ (root)` seçin
5. 💾 **Save** butonuna tıklayın
6. ⏳ 1-5 dakika bekleyin
7. 🎉 Siteniz şu adreste yayında olacak:
   `https://KULLANICI_ADI.github.io/REPO_ADI/`

---

## 🔧 SORUN GİDERME

### "remote origin already exists" hatası

```bash
git remote remove origin
git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git
```

### Authentication (Kimlik Doğrulama) Hatası

GitHub artık şifre ile push kabul etmiyor. İki seçenek:

#### Seçenek 1: Personal Access Token (Kolay)

1. GitHub > Settings > Developer settings > Personal access tokens > Tokens (classic)
2. "Generate new token (classic)" tıklayın
3. Token'a bir isim verin (örn: "NumMatch")
4. **"repo"** yetkisini seçin
5. "Generate token" tıklayın
6. Token'ı kopyalayın (bir daha gösterilmeyecek!)
7. Push yaparken şifre yerine bu token'ı kullanın

#### Seçenek 2: SSH Key (Önerilen - Uzun Vadeli)

```bash
# SSH key oluştur
ssh-keygen -t ed25519 -C "email@example.com"
# Enter'a basın (default ayarları kullan)

# Public key'i göster
cat ~/.ssh/id_ed25519.pub
# Bu key'i kopyalayın

# GitHub > Settings > SSH and GPG keys > New SSH key
# Key'i yapıştırın ve kaydedin

# Remote URL'i değiştir
git remote set-url origin git@github.com:KULLANICI_ADI/REPO_ADI.git
```

---

## 🔄 GÜNCELLEMELERİ YÜKLEME

Dosyalarda değişiklik yaptıktan sonra:

```bash
cd /Users/gk/Desktop/Projelerim/NumMatch
git add .
git commit -m "Açıklama buraya"
git push
```

---

## ✅ KONTROL LİSTESİ

- [ ] Git kullanıcı bilgileri ayarlandı
- [ ] GitHub'da repository oluşturuldu
- [ ] Repository URL'i kopyalandı
- [ ] `git remote add origin` komutu çalıştırıldı
- [ ] `git push` başarılı oldu
- [ ] GitHub Pages aktifleştirildi
- [ ] Site yayında ve çalışıyor

---

## 💡 İPUÇLARI

- Repository **Public** olmalı (ücretsiz GitHub Pages için)
- `index.html` dosyası root dizinde olmalı
- İlk yükleme sonrası GitHub Pages'in aktif olması 1-5 dakika sürebilir
- Değişiklik yaptıktan sonra `git push` yapmayı unutmayın

---

## 🆘 YARDIM

Sorun yaşarsanız:
1. Terminal'deki hata mesajını kontrol edin
2. GitHub repository sayfanızda dosyaların yüklendiğini kontrol edin
3. GitHub Pages ayarlarını kontrol edin

