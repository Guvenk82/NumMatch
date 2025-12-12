#!/bin/bash

echo "==================================="
echo "GitHub Push Yardımcı Script"
echo "==================================="
echo ""
echo "Bu script push yapmanıza yardımcı olacak."
echo ""
echo "ÖNCE: GitHub'da Personal Access Token oluşturmanız gerekiyor:"
echo "1. GitHub.com > Settings > Developer settings > Personal access tokens"
echo "2. Generate new token (classic)"
echo "3. 'repo' yetkisini seçin"
echo "4. Token'ı kopyalayın"
echo ""
read -p "Token'ı hazırladınız mı? (y/n): " ready

if [ "$ready" != "y" ]; then
    echo "Lütfen önce token oluşturun. Detaylar için GITHUB_PUSH.md dosyasına bakın."
    exit 1
fi

echo ""
echo "Push yapılıyor..."
echo "Username olarak 'guvenk82' girin"
echo "Password olarak token'ı yapıştırın"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Başarılı! Değişiklikler GitHub'a yüklendi."
    echo "Birkaç dakika sonra https://guvenk82.github.io/NumMatch/ adresinde görünecek."
else
    echo ""
    echo "❌ Hata oluştu. GITHUB_PUSH.md dosyasına bakın."
fi
