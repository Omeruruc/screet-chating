// Zikirler veritabanı
const zikirlerDB = {
    1: [
        { text: "Subhanallah", count: 33 },
        { text: "Elhamdülillah", count: 33 },
        { text: "Allahu Ekber", count: 33 },
        { text: "La ilahe illallah", count: 100 }
    ],
    2: [
        { text: "Estağfirullah", count: 100 },
        { text: "Ya Rahman", count: 33 },
        { text: "Ya Rahim", count: 33 }
    ],
    3: [
        { text: "La havle vela kuvvete illa billah", count: 50 },
        { text: "Hasbunallahu ve ni'mel vekil", count: 33 },
        { text: "Allahu Ekber", count: 33 }
    ],
    4: [
        { text: "Ya Latif", count: 100 },
        { text: "Ya Hafiz", count: 33 },
        { text: "Ya Rezzak", count: 33 }
    ],
    5: [
        { text: "La ilahe illallahül melikül hakkul mübin", count: 100 },
        { text: "Subhanallahi ve bihamdihi", count: 33 }
    ],
    6: [
        { text: "Allahümme salli ala seyyidina Muhammed", count: 100 },
        { text: "Ya Vedud", count: 33 }
    ],
    7: [
        { text: "Ya Selam", count: 100 },
        { text: "Ya Mü'min", count: 33 },
        { text: "Ya Müheymin", count: 33 }
    ],
    8: [
        { text: "Ya Aziz", count: 100 },
        { text: "Ya Cebbar", count: 33 },
        { text: "Ya Mütekebbir", count: 33 }
    ],
    9: [
        { text: "Ya Halik", count: 100 },
        { text: "Ya Bari", count: 33 },
        { text: "Ya Musavvir", count: 33 }
    ],
    10: [
        { text: "Ya Gaffar", count: 100 },
        { text: "Ya Kahhar", count: 33 },
        { text: "Ya Vehhab", count: 33 }
    ],
    11: [
        { text: "Ya Rezzak", count: 100 },
        { text: "Ya Fettah", count: 33 },
        { text: "Ya Alim", count: 33 }
    ],
    12: [
        { text: "Ya Kabıd", count: 100 },
        { text: "Ya Basıt", count: 33 },
        { text: "Ya Hafıd", count: 33 }
    ],
    13: [
        { text: "Ya Rafi", count: 100 },
        { text: "Ya Muiz", count: 33 },
        { text: "Ya Müzil", count: 33 }
    ],
    14: [
        { text: "Ya Semi", count: 100 },
        { text: "Ya Basir", count: 33 },
        { text: "Ya Hakem", count: 33 }
    ],
    15: [
        { text: "Ya Adl", count: 100 },
        { text: "Ya Latif", count: 33 },
        { text: "Ya Habir", count: 33 }
    ],
    16: [
        { text: "Ya Halim", count: 100 },
        { text: "Ya Azim", count: 33 },
        { text: "Ya Gafur", count: 33 }
    ],
    17: [
        { text: "Ya Şekur", count: 100 },
        { text: "Ya Ali", count: 33 },
        { text: "Ya Kebir", count: 33 }
    ],
    18: [
        { text: "Ya Hafiz", count: 100 },
        { text: "Ya Mukit", count: 33 },
        { text: "Ya Hasib", count: 33 }
    ],
    19: [
        { text: "Ya Celil", count: 100 },
        { text: "Ya Kerim", count: 33 },
        { text: "Ya Rakib", count: 33 }
    ],
    20: [
        { text: "Ya Mucib", count: 100 },
        { text: "Ya Vasi", count: 33 },
        { text: "Ya Hakim", count: 33 }
    ],
    21: [
        { text: "Ya Vedud", count: 100 },
        { text: "Ya Mecid", count: 33 },
        { text: "Ya Bais", count: 33 }
    ],
    22: [
        { text: "Ya Şehid", count: 100 },
        { text: "Ya Hak", count: 33 },
        { text: "Ya Vekil", count: 33 }
    ],
    23: [
        { text: "Ya Kavi", count: 100 },
        { text: "Ya Metin", count: 33 },
        { text: "Ya Veli", count: 33 }
    ],
    24: [
        { text: "Ya Hamid", count: 100 },
        { text: "Ya Muhsi", count: 33 },
        { text: "Ya Mübdi", count: 33 }
    ],
    25: [
        { text: "Ya Muid", count: 100 },
        { text: "Ya Muhyi", count: 33 },
        { text: "Ya Mümit", count: 33 }
    ],
    26: [
        { text: "Ya Hay", count: 100 },
        { text: "Ya Kayyum", count: 33 },
        { text: "Ya Vacid", count: 33 }
    ],
    27: [
        { text: "Ya Macid", count: 100 },
        { text: "Ya Vahid", count: 33 },
        { text: "Ya Samed", count: 33 }
    ],
    28: [
        { text: "Ya Kadir", count: 100 },
        { text: "Ya Muktedir", count: 33 },
        { text: "Ya Mukaddim", count: 33 }
    ],
    29: [
        { text: "Ya Muahhir", count: 100 },
        { text: "Ya Evvel", count: 33 },
        { text: "Ya Ahir", count: 33 }
    ],
    30: [
        { text: "Ya Zahir", count: 100 },
        { text: "Ya Batın", count: 33 },
        { text: "Ya Müteali", count: 33 },
        { text: "La ilahe illallah", count: 100 }
    ]
};

// Dualar veritabanı
const dualarDB = {
    sabah: [
        {
            baslik: "Sübhaneke Duası",
            arapca: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلاَ إِلَهَ غَيْرُكَ",
            turkce: "Allah'ım! Sen eksik sıfatlardan pak ve uzaksın. Seni daima böyle tenzih eder ve överim. Senin adın mübarektir. Varlığın her şeyden yücedir. Senden başka ilah yoktur."
        },
        {
            baslik: "Fatiha Suresi",
            arapca: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾",
            turkce: "Rahman ve Rahim olan Allah'ın adıyla. Hamd, Alemlerin Rabbi olan Allah'a mahsustur. O, Rahman ve Rahim'dir. Din (hesap) gününün sahibidir. (Allahım!) Ancak sana kulluk eder ve yalnız senden yardım dileriz. Bizi doğru yola ilet. Kendilerine nimet verdiklerinin yoluna; gazaba uğrayanların ve sapıtanların yoluna değil."
        },
        {
            baslik: "Fil Suresi",
            arapca: "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ ﴿١﴾ أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ ﴿٢﴾ وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ ﴿٣﴾ تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ ﴿٤﴾ فَجَعَلَهُمْ كَعَصْفٍ مَأْكُولٍ ﴿٥﴾",
            turkce: "Rabbinin fil sahiplerine ne yaptığını görmedin mi? Onların tuzaklarını boşa çıkarmadı mı? Üzerlerine sürü sürü kuşlar gönderdi. O kuşlar, onlara pişkin tuğladan yapılmış taşlar atıyordu. Nihayet onları yenilmiş ekin yaprağı haline getirdi."
        }
    ],
    ogle: [
        {
            baslik: "Ettehiyyatü Duası",
            arapca: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ السَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
            turkce: "Bütün tahiyyeler, salavat ve güzel şeyler Allah'a mahsustur. Ey Peygamber! Allah'ın selamı, rahmeti ve bereketi senin üzerine olsun. Selam bizim üzerimize ve Allah'ın salih kulları üzerine olsun. Şahitlik ederim ki Allah'tan başka ilah yoktur. Yine şahitlik ederim ki Muhammed O'nun kulu ve elçisidir."
        },
        {
            baslik: "Kevser Suresi",
            arapca: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ﴿١﴾ فَصَلِّ لِرَبِّكَ وَانْحَرْ ﴿٢﴾ إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ ﴿٣﴾",
            turkce: "Şüphesiz biz sana Kevser'i verdik. O halde Rabbin için namaz kıl ve kurban kes. Doğrusu sana buğzeden, soyu kesik olanın ta kendisidir."
        }
    ],
    ikindi: [
        {
            baslik: "Allahümme Salli",
            arapca: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
            turkce: "Allah'ım! İbrahim'e ve İbrahim'in ailesine rahmet ettiğin gibi, Muhammed'e ve Muhammed'in ailesine de rahmet et. Şüphesiz sen övülmeye layıksın, şan ve şeref sahibisin."
        },
        {
            baslik: "Asr Suresi",
            arapca: "وَالْعَصْرِ ﴿١﴾ إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ ﴿٢﴾ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ ﴿٣﴾",
            turkce: "Asra andolsun ki, insan gerçekten ziyan içindedir. Ancak iman edip salih ameller işleyenler, birbirlerine hakkı tavsiye edenler ve birbirlerine sabrı tavsiye edenler başka."
        }
    ],
    aksam: [
        {
            baslik: "Allahümme Barik",
            arapca: "اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
            turkce: "Allah'ım! İbrahim'e ve İbrahim'in ailesine bereket verdiğin gibi, Muhammed'e ve Muhammed'in ailesine de bereket ver. Şüphesiz sen övülmeye layıksın, şan ve şeref sahibisin."
        },
        {
            baslik: "İhlas Suresi",
            arapca: "قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ ﴿٤﴾",
            turkce: "De ki: O Allah birdir. Allah Samed'dir. O doğurmamış ve doğmamıştır. Onun hiçbir dengi yoktur."
        }
    ],
    yatsi: [
        {
            baslik: "Rabbena Duaları",
            arapca: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
            turkce: "Rabbimiz! Bize dünyada iyilik ver, ahirette de iyilik ver. Bizi cehennem azabından koru."
        },
        {
            baslik: "Nas Suresi",
            arapca: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾ مَلِكِ النَّاسِ ﴿٢﴾ إِلَهِ النَّاسِ ﴿٣﴾ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٤﴾ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿٥﴾ مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾",
            turkce: "De ki: İnsanların Rabbine sığınırım. İnsanların malikine, İnsanların (gerçek) ilahına. O sinsi vesvesecinin şerrinden. O ki, insanların göğüslerine vesvese verir. Gerek cinlerden, gerek insanlardan."
        }
    ],
    teravih: [
        {
            baslik: "Kunut Duaları",
            arapca: "اَللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنَسْتَهْدِيكَ وَنُؤْمِنُ بِكَ وَنَتُوبُ إِلَيْكَ وَنَتَوَكَّلُ عَلَيْكَ وَنُثْنِي عَلَيْكَ الْخَيْرَ كُلَّهُ نَشْكُرُكَ وَلاَ نَكْفُرُكَ وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ",
            turkce: "Allah'ım! Senden yardım isteriz, günahlarımızı bağışlamanı isteriz, razı olduğun şeylere hidayet etmeni isteriz. Sana inanırız, sana tevbe ederiz. Sana güveniriz. Bize verdiğin bütün nimetleri bilerek seni hayır ile överiz. Sana şükrederiz. Hiçbir nimetini inkar etmez ve onları başkasından bilmeyiz. Nimetlerini inkar eden ve sana karşı geleni bırakırız."
        },
        {
            baslik: "Felak Suresi",
            arapca: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾ مِنْ شَرِّ مَا خَلَقَ ﴿٢﴾ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿٤﴾ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾",
            turkce: "De ki: Yarattığı şeylerin şerrinden, karanlığı çöktüğü zaman gecenin şerrinden, düğümlere üfürüp büyü yapan üfürükçülerin şerrinden ve kıskandığı vakit kıskanç kişinin şerrinden sabahın Rabbine sığınırım."
        }
    ]
};

// Yemek menüleri veritabanı
const menulerDB = {
    1: {
        corba: "Mercimek Çorbası",
        anaYemek: "Patlıcan Kebabı",
        pilav: "Şehriyeli Pilav",
        salata: "Mevsim Salatası",
        tatli: "Güllaç"
    },
    2: {
        corba: "Ezogelin Çorbası",
        anaYemek: "Karnıyarık",
        pilav: "Bulgur Pilavı",
        salata: "Çoban Salatası",
        tatli: "Sütlaç"
    },
    3: {
        corba: "Yayla Çorbası",
        anaYemek: "İzmir Köfte",
        pilav: "Nohutlu Pilav",
        salata: "Gavurdağı Salatası",
        tatli: "Keşkül"
    },
    4: {
        corba: "Tarhana Çorbası",
        anaYemek: "Etli Güveç",
        pilav: "Domatesli Bulgur Pilavı",
        salata: "Roka Salatası",
        tatli: "Kazandibi"
    },
    5: {
        corba: "Domates Çorbası",
        anaYemek: "Tas Kebabı",
        pilav: "İç Pilav",
        salata: "Kısır",
        tatli: "Aşure"
    },
    6: {
        corba: "İşkembe Çorbası",
        anaYemek: "Kuzu Tandır",
        pilav: "Mercimekli Pilav",
        salata: "Patlıcan Salatası",
        tatli: "Kadayıf"
    },
    7: {
        corba: "Mantar Çorbası",
        anaYemek: "Orman Kebabı",
        pilav: "Sebzeli Pilav",
        salata: "Yeşil Salata",
        tatli: "Baklava"
    },
    8: {
        corba: "Tavuk Suyu Çorbası",
        anaYemek: "Tepsi Kebabı",
        pilav: "Sade Pilav",
        salata: "Mercimek Salatası",
        tatli: "Şöbiyet"
    },
    9: {
        corba: "Sebze Çorbası",
        anaYemek: "Pideli Köfte",
        pilav: "Havuçlu Pilav",
        salata: "Semizotu Salatası",
        tatli: "Tulumba"
    },
    10: {
        corba: "Düğün Çorbası",
        anaYemek: "Mantı",
        pilav: "Bezelyeli Pilav",
        salata: "Börülce Salatası",
        tatli: "Revani"
    },
    11: {
        corba: "Şehriye Çorbası",
        anaYemek: "Kuru Fasulye",
        pilav: "Pirinç Pilavı",
        salata: "Patates Salatası",
        tatli: "Şekerpare"
    },
    12: {
        corba: "Balkabağı Çorbası",
        anaYemek: "Etli Yaprak Sarma",
        pilav: "Özbek Pilavı",
        salata: "Havuç Salatası",
        tatli: "Dilber Dudağı"
    },
    13: {
        corba: "Kırmızı Mercimek Çorbası",
        anaYemek: "Hünkar Beğendi",
        pilav: "Patlıcanlı Pilav",
        salata: "Bostana",
        tatli: "Un Helvası"
    },
    14: {
        corba: "Analı Kızlı Çorbası",
        anaYemek: "İskender Kebap",
        pilav: "Mantarlı Pilav",
        salata: "Rus Salatası",
        tatli: "İrmik Helvası"
    },
    15: {
        corba: "Kereviz Çorbası",
        anaYemek: "Çökertme Kebabı",
        pilav: "Tavuklu Pilav",
        salata: "Akdeniz Salatası",
        tatli: "Künefe"
    },
    16: {
        corba: "Brokoli Çorbası",
        anaYemek: "Beyti Sarma",
        pilav: "Fıstıklı Pilav",
        salata: "Zahter Salatası",
        tatli: "Ekmek Kadayıfı"
    },
    17: {
        corba: "Lahana Çorbası",
        anaYemek: "Ali Nazik",
        pilav: "Kimyonlu Pilav",
        salata: "Tabbule",
        tatli: "Fırın Sütlaç"
    },
    18: {
        corba: "Kelle Paça Çorbası",
        anaYemek: "Patlıcan Musakka",
        pilav: "Safran Pilavı",
        salata: "Şakşuka",
        tatli: "Lokma"
    },
    19: {
        corba: "Kremalı Mantar Çorbası",
        anaYemek: "Kuzu Kapama",
        pilav: "Kaşarlı Pilav",
        salata: "Közlenmiş Patlıcan Salatası",
        tatli: "Cevizli Baklava"
    },
    20: {
        corba: "Tavuklu Şehriye Çorbası",
        anaYemek: "Kağıt Kebabı",
        pilav: "Zerdeçallı Pilav",
        salata: "Yoğurtlu Havuç Salatası",
        tatli: "Kaymaklı Ekmek Kadayıfı"
    },
    21: {
        corba: "Yeşil Mercimek Çorbası",
        anaYemek: "Kuzu İncik",
        pilav: "Baharatlı Pilav",
        salata: "Kırmızı Lahana Salatası",
        tatli: "Şambali"
    },
    22: {
        corba: "Süzme Mercimek Çorbası",
        anaYemek: "Kuzu Haşlama",
        pilav: "Kuşbaşılı Pilav",
        salata: "Kereviz Salatası",
        tatli: "Tel Kadayıf"
    },
    23: {
        corba: "Tavuk Çorbası",
        anaYemek: "Kuzu Pirzola",
        pilav: "Soğanlı Pilav",
        salata: "Pancar Salatası",
        tatli: "Kalburabastı"
    },
    24: {
        corba: "Yoğurt Çorbası",
        anaYemek: "Kuzu Güveç",
        pilav: "Kestaneli Pilav",
        salata: "Karışık Salata",
        tatli: "Vezir Parmağı"
    },
    25: {
        corba: "Alaca Çorbası",
        anaYemek: "Kuzu Tandır",
        pilav: "Havuçlu Pilav",
        salata: "Marul Salatası",
        tatli: "Fıstıklı Sarma"
    },
    26: {
        corba: "Paça Çorbası",
        anaYemek: "Kuzu Kavurma",
        pilav: "Sebzeli Pilav",
        salata: "Yeşil Zeytin Salatası",
        tatli: "Bülbül Yuvası"
    },
    27: {
        corba: "Tutmaç Çorbası",
        anaYemek: "Kuzu Çöp Şiş",
        pilav: "Domatesli Pilav",
        salata: "Cevizli Roka Salatası",
        tatli: "Dilber Lokması"
    },
    28: {
        corba: "Ekşili Köfte Çorbası",
        anaYemek: "Kuzu Kol",
        pilav: "Nohutlu Pilav",
        salata: "Turp Salatası",
        tatli: "Hanım Göbeği"
    },
    29: {
        corba: "Erişte Çorbası",
        anaYemek: "Kuzu Büryan",
        pilav: "Mercimekli Pilav",
        salata: "Taze Soğan Salatası",
        tatli: "Şam Tatlısı"
    },
    30: {
        corba: "Sultan Çorbası",
        anaYemek: "Kuzu Dolma",
        pilav: "Özel Pilav",
        salata: "Bayram Salatası",
        tatli: "Saray Sarması"
    }
};

// Sayfa yüklendiğinde çalışacak kodlar
document.addEventListener('DOMContentLoaded', () => {
    // Geçerli tarihi göster
    updateCurrentDate();
    
    // Sekme değiştirme işlevselliği
    setupTabs();
    
    // Başlangıç gününü ayarla
    const startDay = 1;
    document.getElementById('selectedDay').textContent = `${startDay}. Gün`;
    document.getElementById('currentDay').textContent = `${startDay}. Gün`;
    
    // Zikir listesini oluştur
    loadZikirler(startDay);
    
    // Dua kategorilerini ayarla
    setupDuaCategories();
    
    // İlk menüyü yükle
    loadMenu(startDay);
    
    // İlerleme çubuğunu güncelle
    updateProgress();
});

// Geçerli tarihi göster
function updateCurrentDate() {
    const date = new Date();
    document.getElementById('currentDate').textContent = date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Sekme değiştirme
function setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Aktif sekmeyi değiştir
            document.querySelector('.tab-btn.active').classList.remove('active');
            tab.classList.add('active');
            
            // İçeriği göster/gizle
            const targetId = tab.dataset.tab;
            document.querySelector('.tab-content.active').classList.remove('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// Zikirleri yükle
function loadZikirler(gun) {
    const zikirList = document.querySelector('.zikir-list');
    zikirList.innerHTML = '';
    
    const gunlukZikirler = zikirlerDB[gun] || [];
    gunlukZikirler.forEach(zikir => {
        const zikirItem = document.createElement('div');
        zikirItem.className = 'zikir-item';
        
        const checkbox = document.createElement('div');
        checkbox.className = 'zikir-checkbox';
        checkbox.addEventListener('click', () => {
            checkbox.classList.toggle('checked');
            updateProgress();
        });
        
        const text = document.createElement('div');
        text.className = 'zikir-text';
        text.textContent = zikir.text;
        
        const count = document.createElement('div');
        count.className = 'zikir-count';
        count.textContent = `${zikir.count}x`;
        
        zikirItem.appendChild(checkbox);
        zikirItem.appendChild(text);
        zikirItem.appendChild(count);
        zikirList.appendChild(zikirItem);
    });
}

// Dua kategorilerini ayarla
function setupDuaCategories() {
    const categories = document.querySelectorAll('.dua-category');
    categories.forEach(category => {
        category.addEventListener('click', () => {
            document.querySelector('.dua-category.active').classList.remove('active');
            category.classList.add('active');
            loadDualar(category.dataset.category);
        });
    });
    
    // İlk kategoriyi yükle
    loadDualar('sabah');
}

// Duaları yükle
function loadDualar(category) {
    const duaContent = document.querySelector('.dua-content');
    duaContent.innerHTML = '';
    
    const dualar = dualarDB[category] || [];
    dualar.forEach(dua => {
        const duaItem = document.createElement('div');
        duaItem.className = 'dua-item';
        duaItem.innerHTML = `
            <h3>${dua.baslik}</h3>
            <div class="dua-arapca">${dua.arapca}</div>
            <div class="dua-turkce">${dua.turkce}</div>
        `;
        duaContent.appendChild(duaItem);
    });
}

// Menüyü yükle
function loadMenu(gun) {
    const menuCalendar = document.querySelector('.menu-calendar');
    menuCalendar.innerHTML = '';
    
    const menu = menulerDB[gun];
    if (menu) {
        Object.entries(menu).forEach(([kategori, yemek]) => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <h3>${kategori.charAt(0).toUpperCase() + kategori.slice(1)}</h3>
                <p>${yemek}</p>
            `;
            menuCalendar.appendChild(menuItem);
        });
    }
}

// İlerleme çubuğunu güncelle
function updateProgress() {
    const tamamlananZikirler = document.querySelectorAll('.zikir-checkbox.checked').length;
    const toplamZikirler = document.querySelectorAll('.zikir-checkbox').length;
    
    const progress = (tamamlananZikirler / toplamZikirler) * 100;
    document.getElementById('ramazanProgress').style.width = `${progress}%`;
    document.getElementById('completedDays').textContent = Math.floor((progress / 100) * 30);
}

// Gün değiştirme kontrolleri
document.getElementById('prevDay').addEventListener('click', () => {
    const currentDay = parseInt(document.getElementById('selectedDay').textContent);
    if (currentDay > 1) {
        const newDay = currentDay - 1;
        document.getElementById('selectedDay').textContent = `${newDay}. Gün`;
        document.getElementById('currentDay').textContent = `${newDay}. Gün`;
        loadZikirler(newDay);
        loadMenu(newDay);
    }
});

document.getElementById('nextDay').addEventListener('click', () => {
    const currentDay = parseInt(document.getElementById('selectedDay').textContent);
    if (currentDay < 30) {
        const newDay = currentDay + 1;
        document.getElementById('selectedDay').textContent = `${newDay}. Gün`;
        document.getElementById('currentDay').textContent = `${newDay}. Gün`;
        loadZikirler(newDay);
        loadMenu(newDay);
    }
}); 