3D MODEL DOSYALARI
==================

Galeride dönen 3D önizleme için bu klasöre BINARY STL dosyası koy.

NEDEN STL?
----------
STL dosyaları arka planda (Web Worker'da) ayrıştırılır → arayüz DONMAZ.
3MF dosyaları ise tarayıcının ana iş parçacığında açılır (DOMParser
gerektirir) ve büyük modellerde ekranı saniyelerce dondurur.
Bu yüzden tüm modeller STL olmalı.

3MF / OBJ ELİNDEYSE
-------------------
Dilimleyicinden (Lychee, Bambu Studio, Chitubox) "Export > Binary STL"
ile dışa aktar, sonra buraya koy. Alternatif olarak eldeki 3MF'leri
toplu çevirmek için: node scripts/convert3mf.mjs

DOSYA BOYUTU
------------
< 15 MB önerilir. Çok yüksek poligonlu modeller (50MB+) yüklenirken
GPU'ya yükleme nedeniyle yarım saniyelik bir takılma yaşatabilir.
Dilimleyicide "decimate / reduce" ile poligon sayısını düşürebilirsin.

GALERİYE EKLEMEK
----------------
src/components/ui/Gallery.jsx içindeki ilgili ürünün stlFile alanını
güncelle:  stlFile: '/models/stl/dosya-adi.stl'
3D rozeti ve "3D'yi Başlat" butonu otomatik görünür.
