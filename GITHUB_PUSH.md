# GitHub Push Sorunu Çözümü

## Sorun
GitHub artık şifre ile push kabul etmiyor. Personal Access Token kullanmanız gerekiyor.

## Çözüm: Personal Access Token Oluşturma

### ADIM 1: Token Oluşturun

1. 🌐 [GitHub.com](https://github.com) → Giriş yapın
2. Sağ üstte profil fotoğrafınıza tıklayın
3. **Settings** seçin
4. Sol menüden **Developer settings** seçin
5. **Personal access tokens** → **Tokens (classic)** seçin
6. **Generate new token** → **Generate new token (classic)** tıklayın
7. **Note:** Token'a bir isim verin (örn: "NumMatch Push")
8. **Expiration:** Süre seçin (90 days veya istediğiniz süre)
9. **Select scopes:** Aşağıdaki yetkileri seçin:
   - ✅ **repo** (tüm repo yetkileri)
10. En altta **Generate token** butonuna tıklayın
11. ⚠️ **ÖNEMLİ:** Token'ı hemen kopyalayın! (Bir daha gösterilmeyecek)
    - Token şuna benzer: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### ADIM 2: Token ile Push Yapın

Terminal'de şu komutları çalıştırın:

```bash
cd /Users/gk/Desktop/Projelerim/NumMatch

# Push yaparken şifre yerine token kullanın
git push -u origin main
```

**Username:** GitHub kullanıcı adınızı girin (örn: guvenk82)
**Password:** Token'ı yapıştırın (ghp_ ile başlayan)

### ADIM 3: Token'ı Kaydetmek (Opsiyonel)

Token'ı her seferinde girmemek için:

```bash
# Token'ı git credential helper'a kaydedin
git config --global credential.helper osxkeychain

# İlk push'ta token'ı girin, sonraki seferlerde otomatik kullanılacak
```

## Alternatif: SSH Key Kullanımı (Önerilen)

SSH key kullanmak daha güvenli ve kolay:

### 1. SSH Key Oluşturun

```bash
ssh-keygen -t ed25519 -C "email@example.com"
# Enter'a basın (default ayarları kullan)
# Passphrase isteğe bağlı (boş bırakabilirsiniz)
```

### 2. Public Key'i Kopyalayın

```bash
cat ~/.ssh/id_ed25519.pub
# Çıkan key'i kopyalayın
```

### 3. GitHub'a Ekleyin

1. GitHub > Settings > SSH and GPG keys
2. **New SSH key** tıklayın
3. **Title:** "MacBook" veya istediğiniz isim
4. **Key:** Kopyaladığınız key'i yapıştırın
5. **Add SSH key** tıklayın

### 4. Remote URL'i Değiştirin

```bash
cd /Users/gk/Desktop/Projelerim/NumMatch
git remote set-url origin git@github.com:guvenk82/NumMatch.git
git push -u origin main
```

## Hızlı Çözüm (Token ile)

1. Token oluşturun (yukarıdaki ADIM 1)
2. Terminal'de:
```bash
cd /Users/gk/Desktop/Projelerim/NumMatch
git push -u origin main
```
3. Username: `guvenk82`
4. Password: Token'ı yapıştırın

## Sorun Giderme

### "Permission denied" hatası
- Token'ın `repo` yetkisi olduğundan emin olun
- Token'ın süresi dolmamış olmalı

### "Repository not found" hatası
- Repository adını kontrol edin
- Repository'nin var olduğundan emin olun

### Token çalışmıyor
- Token'ı yeniden oluşturun
- Remote URL'i kontrol edin: `git remote -v`

