# GitHub'a Yükleme Adımları

## 1. GitHub'da Repository Oluşturma

1. [GitHub.com](https://github.com) adresine gidin ve giriş yapın
2. Sağ üstteki **"+"** butonuna tıklayın
3. **"New repository"** seçeneğini seçin
4. Repository adını girin (örn: `NumMatch`)
5. **Public** veya **Private** seçin (Public seçerseniz GitHub Pages ücretsiz çalışır)
6. **"Add a README file"** seçeneğini İŞARETLEMEYİN (zaten var)
7. **"Create repository"** butonuna tıklayın

## 2. Terminal Komutları

Aşağıdaki komutları sırayla çalıştırın:

```bash
# 1. Git repository'sini başlat (zaten yapıldı)
git init

# 2. Tüm dosyaları ekle (zaten yapıldı)
git add .

# 3. İlk commit'i yap (zaten yapıldı)
git commit -m "Initial commit: NumMatch game"

# 4. GitHub repository URL'inizi alın (örnek: https://github.com/kullaniciadi/NumMatch.git)
# Aşağıdaki komutta YOUR_USERNAME ve REPO_NAME'i değiştirin
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 5. Ana branch'i main olarak ayarla
git branch -M main

# 6. GitHub'a yükle
git push -u origin main
```

## 3. GitHub Pages'i Aktifleştirme

1. GitHub repository'nize gidin
2. **Settings** sekmesine tıklayın
3. Sol menüden **Pages** seçeneğine tıklayın
4. **Source** bölümünden **"main"** branch'ini seçin
5. **"/ (root)"** klasörünü seçin
6. **Save** butonuna tıklayın
7. Birkaç dakika sonra siteniz şu adreste yayında olacak:
   `https://YOUR_USERNAME.github.io/REPO_NAME/`

## 4. Sorun Giderme

### Eğer "remote origin already exists" hatası alırsanız:
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

### Eğer authentication hatası alırsanız:
GitHub artık şifre ile push kabul etmiyor. İki seçenek var:

**Seçenek 1: Personal Access Token**
1. GitHub > Settings > Developer settings > Personal access tokens > Tokens (classic)
2. "Generate new token" tıklayın
3. "repo" yetkisini seçin
4. Token'ı kopyalayın
5. Push yaparken şifre yerine bu token'ı kullanın

**Seçenek 2: SSH Key (Önerilen)**
```bash
# SSH key oluştur
ssh-keygen -t ed25519 -C "your_email@example.com"

# Key'i kopyala
cat ~/.ssh/id_ed25519.pub

# Bu key'i GitHub > Settings > SSH and GPG keys > New SSH key'e ekle
# Sonra remote URL'i değiştir:
git remote set-url origin git@github.com:YOUR_USERNAME/REPO_NAME.git
```

## 5. Güncellemeleri Yükleme

Dosyalarda değişiklik yaptıktan sonra:

```bash
git add .
git commit -m "Update: açıklama buraya"
git push
```

## Notlar

- İlk yükleme sonrası GitHub Pages'in aktif olması 1-5 dakika sürebilir
- Repository Public olmalı (ücretsiz GitHub Pages için)
- `index.html` dosyası root dizinde olmalı

