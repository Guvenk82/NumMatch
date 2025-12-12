#!/bin/bash

echo "==================================="
echo "GitHub'a Yükleme Hazırlığı"
echo "==================================="
echo ""

# Git kullanıcı bilgilerini kontrol et
if ! git config user.name &> /dev/null; then
    echo "Git kullanıcı bilgileriniz ayarlanmamış."
    echo ""
    read -p "GitHub kullanıcı adınızı girin: " GIT_USERNAME
    read -p "GitHub email adresinizi girin: " GIT_EMAIL
    
    git config user.name "$GIT_USERNAME"
    git config user.email "$GIT_EMAIL"
    echo "✓ Git kullanıcı bilgileri ayarlandı"
    echo ""
fi

# Branch'i main yap
git branch -M main
echo "✓ Branch 'main' olarak ayarlandı"
echo ""

# Commit yap
echo "Dosyalar commit ediliyor..."
git add .
git commit -m "Initial commit: NumMatch game"
echo "✓ Commit yapıldı"
echo ""

echo "==================================="
echo "Sonraki Adımlar:"
echo "==================================="
echo ""
echo "1. GitHub.com'a gidin ve yeni bir repository oluşturun"
echo "2. Repository URL'inizi kopyalayın (örn: https://github.com/kullaniciadi/NumMatch.git)"
echo "3. Aşağıdaki komutları çalıştırın:"
echo ""
echo "   git remote add origin GITHUB_URL_BURAYA"
echo "   git push -u origin main"
echo ""
echo "4. GitHub > Settings > Pages > Source: main seçin"
echo "5. Birkaç dakika sonra siteniz yayında olacak!"
echo ""

