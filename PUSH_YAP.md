# GitHub'a Dosya Yükleme - Basit Rehber

## 🎯 ŞU AN DURUM
- ✅ Dosyalar commit edildi
- ❌ GitHub'a push edilmedi (authentication gerekiyor)

## 🚀 ÇÖZÜM: 2 YOL VAR

### YOL 1: Personal Access Token (Hızlı - 5 dakika)

#### Adım 1: Token Oluşturun
1. https://github.com → Giriş yapın
2. Sağ üstte profil fotoğrafı → **Settings**
3. Sol menü: **Developer settings**
4. **Personal access tokens** → **Tokens (classic)**
5. **Generate new token (classic)**
6. **Note:** "NumMatch" yazın
7. **Expiration:** 90 days seçin
8. **Select scopes:** ✅ **repo** işaretleyin
9. **Generate token** tıklayın
10. ⚠️ **Token'ı kopyalayın!** (Bir daha gösterilmeyecek)
    - Token şuna benzer: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

#### Adım 2: Push Yapın
Terminal'de şu komutu çalıştırın:

```bash
cd /Users/gk/Desktop/Projelerim/NumMatch
git push -u origin main
```

**İstendiğinde:**
- **Username:** `guvenk82` yazın
- **Password:** Token'ı yapıştırın (şifre değil!)

---

### YOL 2: SSH Key (Kalıcı Çözüm - 10 dakika)

#### Adım 1: SSH Key Oluşturun
Terminal'de:

```bash
ssh-keygen -t ed25519 -C "email@example.com"
```

**Enter'a basın** (3 kez - default ayarları kullan)

#### Adım 2: Public Key'i Kopyalayın
```bash
cat ~/.ssh/id_ed25519.pub
```

**Çıkan key'i kopyalayın** (ssh-ed25519 ile başlayan uzun metin)

#### Adım 3: GitHub'a Ekleyin
1. https://github.com → Giriş yapın
2. Sağ üstte profil fotoğrafı → **Settings**
3. Sol menü: **SSH and GPG keys**
4. **New SSH key** tıklayın
5. **Title:** "MacBook" yazın
6. **Key:** Kopyaladığınız key'i yapıştırın
7. **Add SSH key** tıklayın

#### Adım 4: Remote URL'i Değiştirin
```bash
cd /Users/gk/Desktop/Projelerim/NumMatch
git remote set-url origin git@github.com:guvenk82/NumMatch.git
```

#### Adım 5: Push Yapın
```bash
git push -u origin main
```

**Artık şifre/token sormayacak!** ✅

---

## ✅ BAŞARILI OLDU MU?

Push başarılı olduktan sonra:
1. https://github.com/guvenk82/NumMatch adresine gidin
2. Dosyaların yüklendiğini görün
3. 1-5 dakika sonra https://guvenk82.github.io/NumMatch/ adresinde güncel versiyon görünecek

---

## 🆘 SORUN MU VAR?

### "Permission denied" hatası
- Token'ın `repo` yetkisi olduğundan emin olun
- Token'ın süresi dolmamış olmalı

### "Repository not found" hatası
- Repository adını kontrol edin: `guvenk82/NumMatch`
- Repository'nin var olduğundan emin olun

### SSH key çalışmıyor
```bash
# Test edin
ssh -T git@github.com

# "Hi guvenk82! You've successfully authenticated" mesajı görmelisiniz
```

---

## 💡 HANGİSİNİ SEÇMELİYİM?

- **Token:** Hızlı çözüm, 5 dakika
- **SSH Key:** Kalıcı çözüm, bir kez yapılır, sonra sorunsuz

**Öneri:** SSH Key kullanın, daha kolay!

