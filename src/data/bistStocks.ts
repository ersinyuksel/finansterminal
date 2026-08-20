export interface BistStockDefinition {
  code: string;
  symbol: string;
  name: string;
  unit: 'P' | '₺';
  defaultPrice: number;
  defaultChange: number;
  defaultVol: number;
}

export const ALL_BIST_500_STOCKS: BistStockDefinition[] = [
  {
    "code": "BIST100",
    "symbol": "BIST:XU100",
    "name": "BIST 100 Endeksi",
    "unit": "P",
    "defaultPrice": 14165.14,
    "defaultChange": -0.05,
    "defaultVol": 2635662202
  },
  {
    "code": "BIST30",
    "symbol": "BIST:XU030",
    "name": "BIST 30 Endeksi",
    "unit": "P",
    "defaultPrice": 16027.93,
    "defaultChange": -0.01,
    "defaultVol": 1577955456
  },
  {
    "code": "XBANK",
    "symbol": "BIST:XBANK",
    "name": "BIST Banka Endeksi",
    "unit": "P",
    "defaultPrice": 15778.41,
    "defaultChange": 0.03,
    "defaultVol": 243798482
  },
  {
    "code": "XUSIN",
    "symbol": "BIST:XUSIN",
    "name": "BIST Sanayi Endeksi",
    "unit": "P",
    "defaultPrice": 19122.94,
    "defaultChange": 0.45,
    "defaultVol": 45000000000
  },
  {
    "code": "XTEK",
    "symbol": "BIST:XTEK",
    "name": "BIST Teknoloji Endeksi",
    "unit": "P",
    "defaultPrice": 21955.97,
    "defaultChange": 1.2,
    "defaultVol": 18000000000
  },
  {
    "code": "SASA",
    "symbol": "BIST:SASA",
    "name": "Sasa Polyester",
    "unit": "₺",
    "defaultPrice": 2.37,
    "defaultChange": -0.84,
    "defaultVol": 2282766448
  },
  {
    "code": "BJKAS",
    "symbol": "BIST:BJKAS",
    "name": "Beşiktaş JK",
    "unit": "₺",
    "defaultPrice": 2.02,
    "defaultChange": 9.78,
    "defaultVol": 767513067
  },
  {
    "code": "PAHOL",
    "symbol": "BIST:PAHOL",
    "name": "PASIFIK HOLDING A.S",
    "unit": "₺",
    "defaultPrice": 1.32,
    "defaultChange": 2.33,
    "defaultVol": 217800496
  },
  {
    "code": "HEKTS",
    "symbol": "BIST:HEKTS",
    "name": "Hektaş",
    "unit": "₺",
    "defaultPrice": 2.85,
    "defaultChange": 1.79,
    "defaultVol": 406754428
  },
  {
    "code": "CANTE",
    "symbol": "BIST:CANTE",
    "name": "Çan2 Termik",
    "unit": "₺",
    "defaultPrice": 1.22,
    "defaultChange": 2.52,
    "defaultVol": 157757923
  },
  {
    "code": "ISCTR",
    "symbol": "BIST:ISCTR",
    "name": "İş Bankası (C)",
    "unit": "₺",
    "defaultPrice": 12.53,
    "defaultChange": 0,
    "defaultVol": 1555625011
  },
  {
    "code": "MARMR",
    "symbol": "BIST:MARMR",
    "name": "Marmara Holding AS",
    "unit": "₺",
    "defaultPrice": 2.52,
    "defaultChange": 6.33,
    "defaultVol": 215531969
  },
  {
    "code": "IHLAS",
    "symbol": "BIST:IHLAS",
    "name": "Ihlas Holding",
    "unit": "₺",
    "defaultPrice": 1.08,
    "defaultChange": 0.93,
    "defaultVol": 86702560
  },
  {
    "code": "KOCMT",
    "symbol": "BIST:KOCMT",
    "name": "Koc Metalurji AS",
    "unit": "₺",
    "defaultPrice": 5.6,
    "defaultChange": 8.11,
    "defaultVol": 399612752
  },
  {
    "code": "GOODY",
    "symbol": "BIST:GOODY",
    "name": "Goodyear Lastikleri T.",
    "unit": "₺",
    "defaultPrice": 3.1,
    "defaultChange": 2.65,
    "defaultVol": 217951685
  },
  {
    "code": "SISE",
    "symbol": "BIST:SISE",
    "name": "Şişecam",
    "unit": "₺",
    "defaultPrice": 39.18,
    "defaultChange": -5.36,
    "defaultVol": 2734020873
  },
  {
    "code": "TRALT",
    "symbol": "BIST:TRALT",
    "name": "Turk Altin Isletmeleri",
    "unit": "₺",
    "defaultPrice": 48.3,
    "defaultChange": 2.29,
    "defaultVol": 2477442240
  },
  {
    "code": "ISKPL",
    "symbol": "BIST:ISKPL",
    "name": "Isik Plastik Sanayi VE Dis Ticaret Pazarlama AS",
    "unit": "₺",
    "defaultPrice": 8.11,
    "defaultChange": -1.34,
    "defaultVol": 392685592
  },
  {
    "code": "ADESE",
    "symbol": "BIST:ADESE",
    "name": "Adese Gayrimenkul Yatirim AS",
    "unit": "₺",
    "defaultPrice": 0.88,
    "defaultChange": 2.33,
    "defaultVol": 39233741
  },
  {
    "code": "BALSU",
    "symbol": "BIST:BALSU",
    "name": "Balsu Gida Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 10.8,
    "defaultChange": 0.75,
    "defaultVol": 467837176
  },
  {
    "code": "EREGL",
    "symbol": "BIST:EREGL",
    "name": "Ereğli Demir Çelik",
    "unit": "₺",
    "defaultPrice": 37.76,
    "defaultChange": 1.02,
    "defaultVol": 1633327869
  },
  {
    "code": "FENER",
    "symbol": "BIST:FENER",
    "name": "Fenerbahçe",
    "unit": "₺",
    "defaultPrice": 3.07,
    "defaultChange": -1.6,
    "defaultVol": 131876538
  },
  {
    "code": "EFOR",
    "symbol": "BIST:EFOR",
    "name": "Efor Yatirim Sanayi Ticaret",
    "unit": "₺",
    "defaultPrice": 18.4,
    "defaultChange": -1.81,
    "defaultVol": 771836355
  },
  {
    "code": "EKGYO",
    "symbol": "BIST:EKGYO",
    "name": "Emlak Konut GYO",
    "unit": "₺",
    "defaultPrice": 18.34,
    "defaultChange": 0.22,
    "defaultVol": 733256712
  },
  {
    "code": "LRSHO",
    "symbol": "BIST:LRSHO",
    "name": "Loras Holding",
    "unit": "₺",
    "defaultPrice": 2.82,
    "defaultChange": -4.41,
    "defaultVol": 108834761
  },
  {
    "code": "YKBNK",
    "symbol": "BIST:YKBNK",
    "name": "Yapı Kredi Bankası",
    "unit": "₺",
    "defaultPrice": 35.38,
    "defaultChange": -0.11,
    "defaultVol": 1317021066
  },
  {
    "code": "KRDMD",
    "symbol": "BIST:KRDMD",
    "name": "Kardemir (D)",
    "unit": "₺",
    "defaultPrice": 42.66,
    "defaultChange": 2.84,
    "defaultVol": 1468237411
  },
  {
    "code": "TSPOR",
    "symbol": "BIST:TSPOR",
    "name": "Trabzonspor",
    "unit": "₺",
    "defaultPrice": 1.02,
    "defaultChange": 0,
    "defaultVol": 34027437
  },
  {
    "code": "KGYO",
    "symbol": "BIST:KGYO",
    "name": "KORAY GAYRIMENKUL YATIRIM ORTAKLIGI",
    "unit": "₺",
    "defaultPrice": 13.35,
    "defaultChange": 5.53,
    "defaultVol": 436477636
  },
  {
    "code": "GSRAY",
    "symbol": "BIST:GSRAY",
    "name": "Galatasaray",
    "unit": "₺",
    "defaultPrice": 1.03,
    "defaultChange": 0.98,
    "defaultVol": 32093724
  },
  {
    "code": "ALVES",
    "symbol": "BIST:ALVES",
    "name": "Alves Kablo Sanayi ve Ticaret A. S.",
    "unit": "₺",
    "defaultPrice": 1.76,
    "defaultChange": 0.57,
    "defaultVol": 52687323
  },
  {
    "code": "PSGYO",
    "symbol": "BIST:PSGYO",
    "name": "Pasifik Gayrimenkul Yatirim Ortakligi AS",
    "unit": "₺",
    "defaultPrice": 3.56,
    "defaultChange": 0.56,
    "defaultVol": 105063877
  },
  {
    "code": "AKBNK",
    "symbol": "BIST:AKBNK",
    "name": "Akbank",
    "unit": "₺",
    "defaultPrice": 68.8,
    "defaultChange": 0,
    "defaultVol": 2018081642
  },
  {
    "code": "BTCIM",
    "symbol": "BIST:BTCIM",
    "name": "Baticim Bati Anadolu Cimento Sanayii",
    "unit": "₺",
    "defaultPrice": 4.78,
    "defaultChange": 1.49,
    "defaultVol": 138359825
  },
  {
    "code": "AEFES",
    "symbol": "BIST:AEFES",
    "name": "Anadolu Efes",
    "unit": "₺",
    "defaultPrice": 19.18,
    "defaultChange": -0.78,
    "defaultVol": 526722004
  },
  {
    "code": "KTLEV",
    "symbol": "BIST:KTLEV",
    "name": "KATILIMEVIM TASARRUF FINANSMAN",
    "unit": "₺",
    "defaultPrice": 55.1,
    "defaultChange": 0.18,
    "defaultVol": 1485071675
  },
  {
    "code": "HDFGS",
    "symbol": "BIST:HDFGS",
    "name": "Hedef Girisim Sermayesi Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 2.55,
    "defaultChange": 2.41,
    "defaultVol": 65189151
  },
  {
    "code": "IZENR",
    "symbol": "BIST:IZENR",
    "name": "Izdemir Enerji Elektrik Uretim",
    "unit": "₺",
    "defaultPrice": 8.6,
    "defaultChange": 1.53,
    "defaultVol": 205281166
  },
  {
    "code": "CVKMD",
    "symbol": "BIST:CVKMD",
    "name": "CVK MADEN ISLETMELERI SANAYI VE TICARET A.S",
    "unit": "₺",
    "defaultPrice": 17.29,
    "defaultChange": 2.98,
    "defaultVol": 406636421
  },
  {
    "code": "METEN",
    "symbol": "BIST:METEN",
    "name": "METGUN Enerji Yatirimlari",
    "unit": "₺",
    "defaultPrice": 22.74,
    "defaultChange": 9.96,
    "defaultVol": 528886852
  },
  {
    "code": "KATMR",
    "symbol": "BIST:KATMR",
    "name": "Katmerciler Arac Ustu Ekipman Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 2.29,
    "defaultChange": -0.43,
    "defaultVol": 53180496
  },
  {
    "code": "ZOREN",
    "symbol": "BIST:ZOREN",
    "name": "Zorlu Enerji",
    "unit": "₺",
    "defaultPrice": 2.29,
    "defaultChange": 0.44,
    "defaultVol": 52093346
  },
  {
    "code": "PEKGY",
    "symbol": "BIST:PEKGY",
    "name": "Peker Gayrimenkul Yatirim Ortakligi AS",
    "unit": "₺",
    "defaultPrice": 15.46,
    "defaultChange": 0.39,
    "defaultVol": 345990641
  },
  {
    "code": "PETKM",
    "symbol": "BIST:PETKM",
    "name": "Petkim",
    "unit": "₺",
    "defaultPrice": 19.16,
    "defaultChange": 0,
    "defaultVol": 422192765
  },
  {
    "code": "OBAMS",
    "symbol": "BIST:OBAMS",
    "name": "Oba Makarnacilik Sanayi Ve Ticaret A. S.",
    "unit": "₺",
    "defaultPrice": 5.15,
    "defaultChange": 2.18,
    "defaultVol": 105344059
  },
  {
    "code": "VAKFN",
    "symbol": "BIST:VAKFN",
    "name": "Vakif Finansal Kiralama AS",
    "unit": "₺",
    "defaultPrice": 1.18,
    "defaultChange": -0.84,
    "defaultVol": 23846641
  },
  {
    "code": "BETAE",
    "symbol": "BIST:BETAE",
    "name": "Beta Enerji ve Teknoloji AS",
    "unit": "₺",
    "defaultPrice": 111.2,
    "defaultChange": 6.31,
    "defaultVol": 2217292416
  },
  {
    "code": "SKBNK",
    "symbol": "BIST:SKBNK",
    "name": "Sekerbank T.",
    "unit": "₺",
    "defaultPrice": 5.96,
    "defaultChange": -0.17,
    "defaultVol": 117597892
  },
  {
    "code": "GOKNR",
    "symbol": "BIST:GOKNR",
    "name": "GOKNUR GIDA MADDELERI ENERJI IMALAT ITHALAT IHRACAT TICARET VE SANAYI",
    "unit": "₺",
    "defaultPrice": 19.46,
    "defaultChange": 5.76,
    "defaultVol": 378165343
  },
  {
    "code": "DAPGM",
    "symbol": "BIST:DAPGM",
    "name": "DAP GAYRIMENKUL GELISTIRME AS",
    "unit": "₺",
    "defaultPrice": 8.72,
    "defaultChange": 1.04,
    "defaultVol": 166931067
  },
  {
    "code": "IMASM",
    "symbol": "BIST:IMASM",
    "name": "IMAS Makina Sanayi",
    "unit": "₺",
    "defaultPrice": 2.48,
    "defaultChange": -1.98,
    "defaultVol": 47073669
  },
  {
    "code": "ENKAI",
    "symbol": "BIST:ENKAI",
    "name": "Enka İnşaat",
    "unit": "₺",
    "defaultPrice": 83.3,
    "defaultChange": -4.96,
    "defaultVol": 1562676596
  },
  {
    "code": "TUKAS",
    "symbol": "BIST:TUKAS",
    "name": "Tukas Gida Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 1.99,
    "defaultChange": 0.51,
    "defaultVol": 37197673
  },
  {
    "code": "TURSG",
    "symbol": "BIST:TURSG",
    "name": "Türkiye Sigorta",
    "unit": "₺",
    "defaultPrice": 6.26,
    "defaultChange": -0.32,
    "defaultVol": 116584306
  },
  {
    "code": "HUNER",
    "symbol": "BIST:HUNER",
    "name": "Hun Yenilenebilir Enerji Uretim AS",
    "unit": "₺",
    "defaultPrice": 3.77,
    "defaultChange": 0.53,
    "defaultVol": 69658716
  },
  {
    "code": "AKENR",
    "symbol": "BIST:AKENR",
    "name": "Akenerji Elektrik Uretim",
    "unit": "₺",
    "defaultPrice": 10.76,
    "defaultChange": -3.24,
    "defaultVol": 193481048
  },
  {
    "code": "FRIGO",
    "symbol": "BIST:FRIGO",
    "name": "Frigo-Pak Gida Maddeleri Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 2.29,
    "defaultChange": -2.14,
    "defaultVol": 40928751
  },
  {
    "code": "KRGYO",
    "symbol": "BIST:KRGYO",
    "name": "Korfez Gayrimenkul Yatirim Ortakligi AS",
    "unit": "₺",
    "defaultPrice": 2.87,
    "defaultChange": 0,
    "defaultVol": 51024978
  },
  {
    "code": "FZLGY",
    "symbol": "BIST:FZLGY",
    "name": "FUZUL GAYRIMENKUL YATIRIM ORTAKLIGI",
    "unit": "₺",
    "defaultPrice": 10.77,
    "defaultChange": 1.99,
    "defaultVol": 185691397
  },
  {
    "code": "HLGYO",
    "symbol": "BIST:HLGYO",
    "name": "Halk Gayrimenkul Yatirim Ortakligi AS",
    "unit": "₺",
    "defaultPrice": 4.37,
    "defaultChange": -3.32,
    "defaultVol": 73040267
  },
  {
    "code": "CWENE",
    "symbol": "BIST:CWENE",
    "name": "CW Enerji",
    "unit": "₺",
    "defaultPrice": 37.28,
    "defaultChange": 0.76,
    "defaultVol": 619791706
  },
  {
    "code": "ESEN",
    "symbol": "BIST:ESEN",
    "name": "Esenboga Elektrik Uretim AS",
    "unit": "₺",
    "defaultPrice": 3.5,
    "defaultChange": 0.86,
    "defaultVol": 55805533
  },
  {
    "code": "CEMZY",
    "symbol": "BIST:CEMZY",
    "name": "CEM ZEYTIN",
    "unit": "₺",
    "defaultPrice": 14.63,
    "defaultChange": 10,
    "defaultVol": 213841429
  },
  {
    "code": "LIDER",
    "symbol": "BIST:LIDER",
    "name": "LDR Turizm",
    "unit": "₺",
    "defaultPrice": 44.34,
    "defaultChange": 0.18,
    "defaultVol": 639218432
  },
  {
    "code": "MRGYO",
    "symbol": "BIST:MRGYO",
    "name": "Marti Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 1.28,
    "defaultChange": 0,
    "defaultVol": 18430985
  },
  {
    "code": "GENIL",
    "symbol": "BIST:GENIL",
    "name": "Gen Ilac ve Saglik Urunleri Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 11.1,
    "defaultChange": 1.56,
    "defaultVol": 157849182
  },
  {
    "code": "INFO",
    "symbol": "BIST:INFO",
    "name": "INFO YATIRIM MENKUL DEGERLER A.S",
    "unit": "₺",
    "defaultPrice": 7.11,
    "defaultChange": 1.43,
    "defaultVol": 96985996
  },
  {
    "code": "ESCOM",
    "symbol": "BIST:ESCOM",
    "name": "Escort Teknoloji Yatirim",
    "unit": "₺",
    "defaultPrice": 6.15,
    "defaultChange": 2.33,
    "defaultVol": 83554423
  },
  {
    "code": "MARTI",
    "symbol": "BIST:MARTI",
    "name": "Marti Otel Isletmeleri",
    "unit": "₺",
    "defaultPrice": 1.38,
    "defaultChange": -2.13,
    "defaultVol": 18710747
  },
  {
    "code": "ALGYO",
    "symbol": "BIST:ALGYO",
    "name": "Alarko Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 3.6,
    "defaultChange": -1.91,
    "defaultVol": 47649794
  },
  {
    "code": "SARAE",
    "symbol": "BIST:SARAE",
    "name": "SA-RA Enerji Insaat Ticaret ve Sanayi",
    "unit": "₺",
    "defaultPrice": 78,
    "defaultChange": 3.59,
    "defaultVol": 1024150218
  },
  {
    "code": "TEHOL",
    "symbol": "BIST:TEHOL",
    "name": "Tera Yatirim Teknoloji Holding",
    "unit": "₺",
    "defaultPrice": 51.3,
    "defaultChange": 0,
    "defaultVol": 668564531
  },
  {
    "code": "GOLDA",
    "symbol": "BIST:GOLDA",
    "name": "Golda Gida Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 12.14,
    "defaultChange": -0.74,
    "defaultVol": 156836976
  },
  {
    "code": "FORMT",
    "symbol": "BIST:FORMT",
    "name": "FORMET METAL VE CAM SANAYI",
    "unit": "₺",
    "defaultPrice": 1.7,
    "defaultChange": 1.19,
    "defaultVol": 21657281
  },
  {
    "code": "ATATR",
    "symbol": "BIST:ATATR",
    "name": "Ata Turizm Isletmecilik Tasimacilik Madencilik Kuyumculu",
    "unit": "₺",
    "defaultPrice": 15.31,
    "defaultChange": 1.32,
    "defaultVol": 187805259
  },
  {
    "code": "KARSN",
    "symbol": "BIST:KARSN",
    "name": "Karsan Otomotiv",
    "unit": "₺",
    "defaultPrice": 9.61,
    "defaultChange": -5.13,
    "defaultVol": 117448192
  },
  {
    "code": "GARAN",
    "symbol": "BIST:GARAN",
    "name": "Garanti BBVA",
    "unit": "₺",
    "defaultPrice": 131.3,
    "defaultChange": 0.23,
    "defaultVol": 1532848457
  },
  {
    "code": "SURGY",
    "symbol": "BIST:SURGY",
    "name": "Sur Tatil Evleri Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 36,
    "defaultChange": -9.82,
    "defaultVol": 410290992
  },
  {
    "code": "ULUFA",
    "symbol": "BIST:ULUFA",
    "name": "Ulusal Faktoring",
    "unit": "₺",
    "defaultPrice": 1.74,
    "defaultChange": -1.14,
    "defaultVol": 19316828
  },
  {
    "code": "KZBGY",
    "symbol": "BIST:KZBGY",
    "name": "KIZILBUK GAYRIMENKUL YATIRIM ORTAKLIGI",
    "unit": "₺",
    "defaultPrice": 2.04,
    "defaultChange": 0,
    "defaultVol": 22607633
  },
  {
    "code": "MEYSU",
    "symbol": "BIST:MEYSU",
    "name": "Meysu Gida Sanayi Ve Ticaret",
    "unit": "₺",
    "defaultPrice": 12.04,
    "defaultChange": 3.44,
    "defaultVol": 132201897
  },
  {
    "code": "ASTOR",
    "symbol": "BIST:ASTOR",
    "name": "Astor Enerji",
    "unit": "₺",
    "defaultPrice": 338.5,
    "defaultChange": -1.1,
    "defaultVol": 3697765876
  },
  {
    "code": "ASELS",
    "symbol": "BIST:ASELS",
    "name": "Aselsan Elektronik",
    "unit": "₺",
    "defaultPrice": 387.75,
    "defaultChange": 0.06,
    "defaultVol": 4206215450
  },
  {
    "code": "MASFN",
    "symbol": "BIST:MASFN",
    "name": "Masfen Enerji AS",
    "unit": "₺",
    "defaultPrice": 43.86,
    "defaultChange": 4.58,
    "defaultVol": 475118143
  },
  {
    "code": "SMRVA",
    "symbol": "BIST:SMRVA",
    "name": "Sumer Varlik Yonetim",
    "unit": "₺",
    "defaultPrice": 12.15,
    "defaultChange": -3.42,
    "defaultVol": 128927222
  },
  {
    "code": "BAYRK",
    "symbol": "BIST:BAYRK",
    "name": "BAYRAK EBT TABAN SANAYI VE TICARET",
    "unit": "₺",
    "defaultPrice": 4.43,
    "defaultChange": 2.55,
    "defaultVol": 46941640
  },
  {
    "code": "ALTNY",
    "symbol": "BIST:ALTNY",
    "name": "Altinay Savunma Teknolojileri",
    "unit": "₺",
    "defaultPrice": 15.77,
    "defaultChange": -5.96,
    "defaultVol": 165682664
  },
  {
    "code": "OYAKC",
    "symbol": "BIST:OYAKC",
    "name": "Oyak Çimento",
    "unit": "₺",
    "defaultPrice": 21.92,
    "defaultChange": 0.46,
    "defaultVol": 225796342
  },
  {
    "code": "FROTO",
    "symbol": "BIST:FROTO",
    "name": "Ford Otosan",
    "unit": "₺",
    "defaultPrice": 79.6,
    "defaultChange": 0.63,
    "defaultVol": 811763268
  },
  {
    "code": "QUAGR",
    "symbol": "BIST:QUAGR",
    "name": "Qua Granite Hayal Yapi ve Urunleri Sanayi Ticaret AS",
    "unit": "₺",
    "defaultPrice": 3.19,
    "defaultChange": 0.31,
    "defaultVol": 32322997
  },
  {
    "code": "FONET",
    "symbol": "BIST:FONET",
    "name": "Fonet Bilgi Teknolojileri AS",
    "unit": "₺",
    "defaultPrice": 5.26,
    "defaultChange": 1.74,
    "defaultVol": 52423217
  },
  {
    "code": "THYAO",
    "symbol": "BIST:THYAO",
    "name": "Türk Hava Yolları",
    "unit": "₺",
    "defaultPrice": 305.25,
    "defaultChange": 0,
    "defaultVol": 3007357799
  },
  {
    "code": "DMLKT",
    "symbol": "BIST:DMLKT",
    "name": "Emlak Konut Gayrimenkul Yatirim Ortakligi  0 % Certificates 2025-31.12.2199",
    "unit": "₺",
    "defaultPrice": 6.57,
    "defaultChange": 3.96,
    "defaultVol": 63631527
  },
  {
    "code": "AGROT",
    "symbol": "BIST:AGROT",
    "name": "Agrotech Yuksek Teknoloji ve Yatirim AS",
    "unit": "₺",
    "defaultPrice": 2.4,
    "defaultChange": 1.69,
    "defaultVol": 23130041
  },
  {
    "code": "KCHOL",
    "symbol": "BIST:KCHOL",
    "name": "Koç Holding",
    "unit": "₺",
    "defaultPrice": 206.3,
    "defaultChange": -0.43,
    "defaultVol": 1948882886
  },
  {
    "code": "DMRGD",
    "symbol": "BIST:DMRGD",
    "name": "DMR Unlu Mamuller Uretim Gida Toptan Perakende Ihracat",
    "unit": "₺",
    "defaultPrice": 10.44,
    "defaultChange": -0.57,
    "defaultVol": 97928526
  },
  {
    "code": "SAHOL",
    "symbol": "BIST:SAHOL",
    "name": "Sabancı Holding",
    "unit": "₺",
    "defaultPrice": 89.25,
    "defaultChange": -0.17,
    "defaultVol": 828280520
  },
  {
    "code": "EMPAE",
    "symbol": "BIST:EMPAE",
    "name": "Empa Elektronik Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 80.95,
    "defaultChange": 5.96,
    "defaultVol": 737888068
  },
  {
    "code": "MIATK",
    "symbol": "BIST:MIATK",
    "name": "Mia Teknoloji",
    "unit": "₺",
    "defaultPrice": 32.7,
    "defaultChange": -0.73,
    "defaultVol": 296629286
  },
  {
    "code": "ENERY",
    "symbol": "BIST:ENERY",
    "name": "Enerya Enerji",
    "unit": "₺",
    "defaultPrice": 9.05,
    "defaultChange": 0.67,
    "defaultVol": 80172013
  },
  {
    "code": "TCELL",
    "symbol": "BIST:TCELL",
    "name": "Turkcell",
    "unit": "₺",
    "defaultPrice": 103.2,
    "defaultChange": -0.86,
    "defaultVol": 896453611
  },
  {
    "code": "USAK",
    "symbol": "BIST:USAK",
    "name": "Usak Seramik Sanayii",
    "unit": "₺",
    "defaultPrice": 1.24,
    "defaultChange": 0.81,
    "defaultVol": 10754322
  },
  {
    "code": "TATEN",
    "symbol": "BIST:TATEN",
    "name": "Tatlipinar Enerji Uretim",
    "unit": "₺",
    "defaultPrice": 8.48,
    "defaultChange": -0.93,
    "defaultVol": 73261892
  },
  {
    "code": "TTKOM",
    "symbol": "BIST:TTKOM",
    "name": "Türk Telekom",
    "unit": "₺",
    "defaultPrice": 53.6,
    "defaultChange": -1.65,
    "defaultVol": 444579250
  },
  {
    "code": "LINK",
    "symbol": "BIST:LINK",
    "name": "Link Bilgisayar Sistemleri Yazilimi ve Donanimi Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 5.92,
    "defaultChange": -0.34,
    "defaultVol": 49081933
  },
  {
    "code": "IHLGM",
    "symbol": "BIST:IHLGM",
    "name": "Ihlas Gayrimenkul Proje Gelistirme ve Ticaret",
    "unit": "₺",
    "defaultPrice": 1.58,
    "defaultChange": 0.64,
    "defaultVol": 13079531
  },
  {
    "code": "BORLS",
    "symbol": "BIST:BORLS",
    "name": "Borlease Otomotiv AS",
    "unit": "₺",
    "defaultPrice": 4.19,
    "defaultChange": -0.95,
    "defaultVol": 34074065
  },
  {
    "code": "ISVEA",
    "symbol": "BIST:ISVEA",
    "name": "Isvea Seramik ve Banyo Urunleri Sanayi",
    "unit": "₺",
    "defaultPrice": 53.45,
    "defaultChange": 6.99,
    "defaultVol": 431308949
  },
  {
    "code": "TKNSA",
    "symbol": "BIST:TKNSA",
    "name": "Teknosa Ic ve Dis Ticaret AS",
    "unit": "₺",
    "defaultPrice": 19.74,
    "defaultChange": 9.97,
    "defaultVol": 158417409
  },
  {
    "code": "TUPRS",
    "symbol": "BIST:TUPRS",
    "name": "TÜPRAŞ",
    "unit": "₺",
    "defaultPrice": 363.5,
    "defaultChange": 0.48,
    "defaultVol": 2896483957
  },
  {
    "code": "AKSA",
    "symbol": "BIST:AKSA",
    "name": "Aksa Akrilik Kimya Sanayii",
    "unit": "₺",
    "defaultPrice": 11.73,
    "defaultChange": -0.09,
    "defaultVol": 92253025
  },
  {
    "code": "KBORU",
    "symbol": "BIST:KBORU",
    "name": "Kuzey Boru",
    "unit": "₺",
    "defaultPrice": 23.56,
    "defaultChange": 1.55,
    "defaultVol": 184930121
  },
  {
    "code": "A1YEN",
    "symbol": "BIST:A1YEN",
    "name": "A1 Yenilenebilir Enerji Uretim AS",
    "unit": "₺",
    "defaultPrice": 2.8,
    "defaultChange": 1.08,
    "defaultVol": 21955802
  },
  {
    "code": "BESTE",
    "symbol": "BIST:BESTE",
    "name": "Best Brands Grup Enerji Yatirim as",
    "unit": "₺",
    "defaultPrice": 36,
    "defaultChange": 5.88,
    "defaultVol": 273044592
  },
  {
    "code": "VAKBN",
    "symbol": "BIST:VAKBN",
    "name": "VakıfBank",
    "unit": "₺",
    "defaultPrice": 30.88,
    "defaultChange": 0.39,
    "defaultVol": 233020109
  },
  {
    "code": "SMRTG",
    "symbol": "BIST:SMRTG",
    "name": "Smart Gunes Enerjisi Teknolojileri Arastirma Gelistirme Uretim Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 10.44,
    "defaultChange": -1.04,
    "defaultVol": 77676481
  },
  {
    "code": "ALBTN",
    "symbol": "BIST:ALBTN",
    "name": "Albayrak Hazir Beton Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 26.88,
    "defaultChange": 2.6,
    "defaultVol": 199210825
  },
  {
    "code": "MEKAG",
    "symbol": "BIST:MEKAG",
    "name": "Meka Global Makine Imalat Sanayi Ve Ticaret",
    "unit": "₺",
    "defaultPrice": 3.01,
    "defaultChange": 2.73,
    "defaultVol": 21906789
  },
  {
    "code": "EKIM",
    "symbol": "BIST:EKIM",
    "name": "Ekim Turizm Ticaret ve Sanayi",
    "unit": "₺",
    "defaultPrice": 17.63,
    "defaultChange": 0.51,
    "defaultVol": 127339709
  },
  {
    "code": "ODAS",
    "symbol": "BIST:ODAS",
    "name": "Odaş Elektrik",
    "unit": "₺",
    "defaultPrice": 7.49,
    "defaultChange": 0,
    "defaultVol": 54054551
  },
  {
    "code": "SELVA",
    "symbol": "BIST:SELVA",
    "name": "SELVA GIDA SANAYI",
    "unit": "₺",
    "defaultPrice": 1.79,
    "defaultChange": 0,
    "defaultVol": 12799191
  },
  {
    "code": "HKTM",
    "symbol": "BIST:HKTM",
    "name": "HIDROPAR HAREKET KONTROL TEKNOLOJILERI MERKEZI SANAYI VE TICARET",
    "unit": "₺",
    "defaultPrice": 12.46,
    "defaultChange": 7.41,
    "defaultVol": 88105732
  },
  {
    "code": "EUPWR",
    "symbol": "BIST:EUPWR",
    "name": "Europower Enerji",
    "unit": "₺",
    "defaultPrice": 95.8,
    "defaultChange": -1.44,
    "defaultVol": 661707940
  },
  {
    "code": "DERHL",
    "symbol": "BIST:DERHL",
    "name": "Derluks Yatirim Holding AS",
    "unit": "₺",
    "defaultPrice": 2.25,
    "defaultChange": 0.45,
    "defaultVol": 15274013
  },
  {
    "code": "HALKB",
    "symbol": "BIST:HALKB",
    "name": "Halkbank",
    "unit": "₺",
    "defaultPrice": 34.14,
    "defaultChange": -0.12,
    "defaultVol": 231427617
  },
  {
    "code": "ARDYZ",
    "symbol": "BIST:ARDYZ",
    "name": "ARD Grup Bilisim Teknolojileri AS",
    "unit": "₺",
    "defaultPrice": 90.65,
    "defaultChange": 8.82,
    "defaultVol": 607650972
  },
  {
    "code": "ARZUM",
    "symbol": "BIST:ARZUM",
    "name": "Arzum Elektrikli Ev Aletleri Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 1.67,
    "defaultChange": -1.76,
    "defaultVol": 10984879
  },
  {
    "code": "ORZAX",
    "symbol": "BIST:ORZAX",
    "name": "Orzaks Ilac ve Kimya Sanayi Ticaret",
    "unit": "₺",
    "defaultPrice": 100.1,
    "defaultChange": 3.09,
    "defaultVol": 657773116
  },
  {
    "code": "IZMDC",
    "symbol": "BIST:IZMDC",
    "name": "Izmir Demir Celik Sanayi",
    "unit": "₺",
    "defaultPrice": 12.41,
    "defaultChange": -4.32,
    "defaultVol": 80681145
  },
  {
    "code": "KCAER",
    "symbol": "BIST:KCAER",
    "name": "Kocaer Celik Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 16.04,
    "defaultChange": 0.31,
    "defaultVol": 104132097
  },
  {
    "code": "HEDEF",
    "symbol": "BIST:HEDEF",
    "name": "Hedef Holding AS",
    "unit": "₺",
    "defaultPrice": 173.8,
    "defaultChange": 10,
    "defaultVol": 1115813728
  },
  {
    "code": "ALTIN",
    "symbol": "BIST:ALTIN",
    "name": "DARPHANE ALTIN SERTIFIKASI",
    "unit": "₺",
    "defaultPrice": 74.35,
    "defaultChange": 0.46,
    "defaultVol": 465110700
  },
  {
    "code": "YEOTK",
    "symbol": "BIST:YEOTK",
    "name": "YEO Teknoloji Enerji ve Endustri",
    "unit": "₺",
    "defaultPrice": 41.56,
    "defaultChange": -0.19,
    "defaultVol": 256391744
  },
  {
    "code": "AKFGY",
    "symbol": "BIST:AKFGY",
    "name": "Akfen Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 2.63,
    "defaultChange": 0.77,
    "defaultVol": 15701894
  },
  {
    "code": "PRDGS",
    "symbol": "BIST:PRDGS",
    "name": "PARDUS GIRISIM SERMAYESI YATIRIM ORTAKLIGI",
    "unit": "₺",
    "defaultPrice": 7.78,
    "defaultChange": 4.43,
    "defaultVol": 46108170
  },
  {
    "code": "MERKO",
    "symbol": "BIST:MERKO",
    "name": "Merko Gida Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 1.39,
    "defaultChange": 0,
    "defaultVol": 8181184
  },
  {
    "code": "AYDEM",
    "symbol": "BIST:AYDEM",
    "name": "Aydem Yenilenebilir Enerji AS",
    "unit": "₺",
    "defaultPrice": 26.46,
    "defaultChange": 5,
    "defaultVol": 154096663
  },
  {
    "code": "DENGE",
    "symbol": "BIST:DENGE",
    "name": "Denge Yatirim Holding AS",
    "unit": "₺",
    "defaultPrice": 2.27,
    "defaultChange": 1.34,
    "defaultVol": 13176726
  },
  {
    "code": "EUREN",
    "symbol": "BIST:EUREN",
    "name": "Europen Endustri Insaat Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 3.86,
    "defaultChange": -0.77,
    "defaultVol": 21873605
  },
  {
    "code": "DGNMO",
    "symbol": "BIST:DGNMO",
    "name": "Doganlar Mobilya Grubu Imalat Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 8.97,
    "defaultChange": -0.22,
    "defaultVol": 50414333
  },
  {
    "code": "MAGEN",
    "symbol": "BIST:MAGEN",
    "name": "MARGUN ENERJI URETIM SANAYI VE TICARET",
    "unit": "₺",
    "defaultPrice": 35.16,
    "defaultChange": -1.29,
    "defaultVol": 189865617
  },
  {
    "code": "RTALB",
    "symbol": "BIST:RTALB",
    "name": "RTA Laboratuvarlari Biyolojik Urunler Ilac ve Makina Sanayi Ticaret",
    "unit": "₺",
    "defaultPrice": 2.96,
    "defaultChange": 0.68,
    "defaultVol": 15698644
  },
  {
    "code": "GENKM",
    "symbol": "BIST:GENKM",
    "name": "Gentas Kimya Sanayi ve Ticaret Pazarlama",
    "unit": "₺",
    "defaultPrice": 10.99,
    "defaultChange": 1.1,
    "defaultVol": 57356173
  },
  {
    "code": "ARSAN",
    "symbol": "BIST:ARSAN",
    "name": "Arsan Holding",
    "unit": "₺",
    "defaultPrice": 3.51,
    "defaultChange": 1.15,
    "defaultVol": 17824061
  },
  {
    "code": "ENSRI",
    "symbol": "BIST:ENSRI",
    "name": "Ensari Sinai Yatirimlar",
    "unit": "₺",
    "defaultPrice": 5.12,
    "defaultChange": -0.58,
    "defaultVol": 25908572
  },
  {
    "code": "BINHO",
    "symbol": "BIST:BINHO",
    "name": "1000 Yatirimlar Holding AS",
    "unit": "₺",
    "defaultPrice": 10.28,
    "defaultChange": 2.49,
    "defaultVol": 51984264
  },
  {
    "code": "ZGYO",
    "symbol": "BIST:ZGYO",
    "name": "Z Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 34.54,
    "defaultChange": 1.83,
    "defaultVol": 173322687
  },
  {
    "code": "KLRHO",
    "symbol": "BIST:KLRHO",
    "name": "KILER HOLDING",
    "unit": "₺",
    "defaultPrice": 73.5,
    "defaultChange": -8.53,
    "defaultVol": 368009870
  },
  {
    "code": "ENTRA",
    "symbol": "BIST:ENTRA",
    "name": "IC Enterra Yenilenebilir Enerji AS",
    "unit": "₺",
    "defaultPrice": 4.69,
    "defaultChange": -0.42,
    "defaultVol": 23022507
  },
  {
    "code": "YUNSA",
    "symbol": "BIST:YUNSA",
    "name": "Yunsa Yunlu Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 9.02,
    "defaultChange": -1.2,
    "defaultVol": 44255827
  },
  {
    "code": "KARCL",
    "symbol": "BIST:KARCL",
    "name": "Kardemir Celik Sanayi AS",
    "unit": "₺",
    "defaultPrice": 89.65,
    "defaultChange": 10,
    "defaultVol": 439779151
  },
  {
    "code": "YKSLN",
    "symbol": "BIST:YKSLN",
    "name": "Yukselen Celik AS",
    "unit": "₺",
    "defaultPrice": 2.8,
    "defaultChange": -2.1,
    "defaultVol": 13396695
  },
  {
    "code": "MEGMT",
    "symbol": "BIST:MEGMT",
    "name": "Mega Metal Sanayi Ve Ticaret",
    "unit": "₺",
    "defaultPrice": 73.5,
    "defaultChange": 5.45,
    "defaultVol": 351037691
  },
  {
    "code": "SARKY",
    "symbol": "BIST:SARKY",
    "name": "Sarkuysan Elektrolitik Bakir Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 26.64,
    "defaultChange": 2.38,
    "defaultVol": 126944848
  },
  {
    "code": "REEDR",
    "symbol": "BIST:REEDR",
    "name": "Reeder Teknoloji",
    "unit": "₺",
    "defaultPrice": 6,
    "defaultChange": 0,
    "defaultVol": 28494528
  },
  {
    "code": "YESIL",
    "symbol": "BIST:YESIL",
    "name": "Yesil Yatirim Holding AS",
    "unit": "₺",
    "defaultPrice": 1.23,
    "defaultChange": 1.65,
    "defaultVol": 5821038
  },
  {
    "code": "KORDS",
    "symbol": "BIST:KORDS",
    "name": "Kordsa Teknik",
    "unit": "₺",
    "defaultPrice": 95.8,
    "defaultChange": 4.41,
    "defaultVol": 450241511
  },
  {
    "code": "TKFEN",
    "symbol": "BIST:TKFEN",
    "name": "Tekfen Holding",
    "unit": "₺",
    "defaultPrice": 235,
    "defaultChange": -0.42,
    "defaultVol": 1095522530
  },
  {
    "code": "ALBRK",
    "symbol": "BIST:ALBRK",
    "name": "Albaraka Turk Katilim Bankasi",
    "unit": "₺",
    "defaultPrice": 8.4,
    "defaultChange": 1.69,
    "defaultVol": 37649926
  },
  {
    "code": "EKOS",
    "symbol": "BIST:EKOS",
    "name": "Ekos Teknoloji ve Elektrik AS",
    "unit": "₺",
    "defaultPrice": 5.48,
    "defaultChange": -0.36,
    "defaultVol": 24482558
  },
  {
    "code": "KFEIN",
    "symbol": "BIST:KFEIN",
    "name": "Kafein Yazilim Hizmetleri Ticaret AS",
    "unit": "₺",
    "defaultPrice": 8.91,
    "defaultChange": 3.6,
    "defaultVol": 39754014
  },
  {
    "code": "EKDMR",
    "symbol": "BIST:EKDMR",
    "name": "Ekinciler Demir ve Celik Sanayi AS",
    "unit": "₺",
    "defaultPrice": 46.14,
    "defaultChange": 3.08,
    "defaultVol": 202438558
  },
  {
    "code": "OZGYO",
    "symbol": "BIST:OZGYO",
    "name": "Ozderici Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 2.09,
    "defaultChange": 0.48,
    "defaultVol": 9080856
  },
  {
    "code": "IHGZT",
    "symbol": "BIST:IHGZT",
    "name": "Ihlas Gazetecilik",
    "unit": "₺",
    "defaultPrice": 1.18,
    "defaultChange": 0.85,
    "defaultVol": 5124715
  },
  {
    "code": "JANTS",
    "symbol": "BIST:JANTS",
    "name": "Jantsa Jant Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 15.06,
    "defaultChange": 2.24,
    "defaultVol": 63769883
  },
  {
    "code": "PRKME",
    "symbol": "BIST:PRKME",
    "name": "Park Elektrik Uretim Madencilik Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 18.74,
    "defaultChange": -5.83,
    "defaultVol": 77187849
  },
  {
    "code": "KAREL",
    "symbol": "BIST:KAREL",
    "name": "Karel Elektronik Sanayi ve Ticaret SA",
    "unit": "₺",
    "defaultPrice": 10.16,
    "defaultChange": -0.39,
    "defaultVol": 41052801
  },
  {
    "code": "SVGYO",
    "symbol": "BIST:SVGYO",
    "name": "Savur Gayrimenkul Yatirim Ortakligi A.S",
    "unit": "₺",
    "defaultPrice": 15.39,
    "defaultChange": 0.72,
    "defaultVol": 61432571
  },
  {
    "code": "PGSUS",
    "symbol": "BIST:PGSUS",
    "name": "Pegasus Hava Yolları",
    "unit": "₺",
    "defaultPrice": 152.4,
    "defaultChange": 0.46,
    "defaultVol": 607432415
  },
  {
    "code": "ISMEN",
    "symbol": "BIST:ISMEN",
    "name": "Is Yatirim Menkul Degerler AS",
    "unit": "₺",
    "defaultPrice": 32.42,
    "defaultChange": -2,
    "defaultVol": 126632228
  },
  {
    "code": "DAGI",
    "symbol": "BIST:DAGI",
    "name": "Dagi Giyim Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 10.1,
    "defaultChange": 1.51,
    "defaultVol": 39147297
  },
  {
    "code": "DARDL",
    "symbol": "BIST:DARDL",
    "name": "Dardanel Onentas Gida San.",
    "unit": "₺",
    "defaultPrice": 1.71,
    "defaultChange": 0,
    "defaultVol": 6535449
  },
  {
    "code": "ICUGS",
    "symbol": "BIST:ICUGS",
    "name": "ICU Girisim Sermayesi Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 5.39,
    "defaultChange": -2,
    "defaultVol": 20485703
  },
  {
    "code": "SOHOE",
    "symbol": "BIST:SOHOE",
    "name": "Soho Giyim ve Enerji",
    "unit": "₺",
    "defaultPrice": 10.75,
    "defaultChange": 1.13,
    "defaultVol": 39520257
  },
  {
    "code": "GSDHO",
    "symbol": "BIST:GSDHO",
    "name": "GSD Holding",
    "unit": "₺",
    "defaultPrice": 4.93,
    "defaultChange": 2.71,
    "defaultVol": 17820811
  },
  {
    "code": "VESBE",
    "symbol": "BIST:VESBE",
    "name": "Vestel Beyaz Eşya",
    "unit": "₺",
    "defaultPrice": 5.57,
    "defaultChange": -0.18,
    "defaultVol": 20121352
  },
  {
    "code": "PATEK",
    "symbol": "BIST:PATEK",
    "name": "Pasifik Teknoloji AS",
    "unit": "₺",
    "defaultPrice": 19.82,
    "defaultChange": -0.05,
    "defaultVol": 69993577
  },
  {
    "code": "METRO",
    "symbol": "BIST:METRO",
    "name": "Metro Ticari ve Mali Yatirimlar Holding",
    "unit": "₺",
    "defaultPrice": 8.84,
    "defaultChange": 1.49,
    "defaultVol": 30865240
  },
  {
    "code": "OSTIM",
    "symbol": "BIST:OSTIM",
    "name": "Ostim Endustriyel Yatirimlar ve Isletme AS",
    "unit": "₺",
    "defaultPrice": 1.62,
    "defaultChange": 0.62,
    "defaultVol": 5545137
  },
  {
    "code": "PASEU",
    "symbol": "BIST:PASEU",
    "name": "Pasifik Eurasia Lojistik dis Ticaret AS",
    "unit": "₺",
    "defaultPrice": 170.6,
    "defaultChange": 0.95,
    "defaultVol": 580238749
  },
  {
    "code": "ZERGY",
    "symbol": "BIST:ZERGY",
    "name": "Zeray Gayrimenkul Yatirim Ortakligi AS",
    "unit": "₺",
    "defaultPrice": 8.98,
    "defaultChange": 0.45,
    "defaultVol": 30377248
  },
  {
    "code": "SKTAS",
    "symbol": "BIST:SKTAS",
    "name": "Soktas Tekstil Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 3.37,
    "defaultChange": 4.01,
    "defaultVol": 11074197
  },
  {
    "code": "AKSEN",
    "symbol": "BIST:AKSEN",
    "name": "Aksa Enerji",
    "unit": "₺",
    "defaultPrice": 84.75,
    "defaultChange": -1.74,
    "defaultVol": 278306966
  },
  {
    "code": "KOPOL",
    "symbol": "BIST:KOPOL",
    "name": "Koza Polyester",
    "unit": "₺",
    "defaultPrice": 5.73,
    "defaultChange": 0.7,
    "defaultVol": 18786424
  },
  {
    "code": "TRMET",
    "symbol": "BIST:TRMET",
    "name": "TR Anadolu Metal Madencilik Isletmeleri",
    "unit": "₺",
    "defaultPrice": 128,
    "defaultChange": 1.11,
    "defaultVol": 418241920
  },
  {
    "code": "MANAS",
    "symbol": "BIST:MANAS",
    "name": "Manas Enerji Yonetimi Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 33.62,
    "defaultChange": -0.18,
    "defaultVol": 109789606
  },
  {
    "code": "ECILC",
    "symbol": "BIST:ECILC",
    "name": "Eczacıbaşı İlaç",
    "unit": "₺",
    "defaultPrice": 77.85,
    "defaultChange": 3.8,
    "defaultVol": 248374353
  },
  {
    "code": "KNFRT",
    "symbol": "BIST:KNFRT",
    "name": "Konfrut Tarim",
    "unit": "₺",
    "defaultPrice": 12.37,
    "defaultChange": 4.83,
    "defaultVol": 39323129
  },
  {
    "code": "SNGYO",
    "symbol": "BIST:SNGYO",
    "name": "Sinpas Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 3.23,
    "defaultChange": -0.31,
    "defaultVol": 10191632
  },
  {
    "code": "LIDFA",
    "symbol": "BIST:LIDFA",
    "name": "Lider Faktoring",
    "unit": "₺",
    "defaultPrice": 2.72,
    "defaultChange": -1.09,
    "defaultVol": 8432930
  },
  {
    "code": "ISGSY",
    "symbol": "BIST:ISGSY",
    "name": "Is Girisim Sermayesi Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 17.02,
    "defaultChange": -3.24,
    "defaultVol": 52746665
  },
  {
    "code": "TSKB",
    "symbol": "BIST:TSKB",
    "name": "TSKB",
    "unit": "₺",
    "defaultPrice": 10.98,
    "defaultChange": -0.18,
    "defaultVol": 33528638
  },
  {
    "code": "ULKER",
    "symbol": "BIST:ULKER",
    "name": "Ülker Bisküvi",
    "unit": "₺",
    "defaultPrice": 91.45,
    "defaultChange": 0.83,
    "defaultVol": 277304018
  },
  {
    "code": "GLRYH",
    "symbol": "BIST:GLRYH",
    "name": "Guler Yatirim Holding",
    "unit": "₺",
    "defaultPrice": 3.11,
    "defaultChange": 2.3,
    "defaultVol": 9360391
  },
  {
    "code": "TERA",
    "symbol": "BIST:TERA",
    "name": "Tera Yatirim Menkul Degerler AS",
    "unit": "₺",
    "defaultPrice": 180.4,
    "defaultChange": 1.06,
    "defaultVol": 535613914
  },
  {
    "code": "HATSN",
    "symbol": "BIST:HATSN",
    "name": "Hat-San Gemi Insaa Bakim Onarim Deniz Nakliyat Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 49.86,
    "defaultChange": -1.36,
    "defaultVol": 145113641
  },
  {
    "code": "SNICA",
    "symbol": "BIST:SNICA",
    "name": "Sanica Isi Sanayi",
    "unit": "₺",
    "defaultPrice": 3.16,
    "defaultChange": 0.32,
    "defaultVol": 9193565
  },
  {
    "code": "VKGYO",
    "symbol": "BIST:VKGYO",
    "name": "Vakif Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 1.95,
    "defaultChange": 0,
    "defaultVol": 5631898
  },
  {
    "code": "AKGRT",
    "symbol": "BIST:AKGRT",
    "name": "Aksigorta AS",
    "unit": "₺",
    "defaultPrice": 6.37,
    "defaultChange": -0.47,
    "defaultVol": 18362481
  },
  {
    "code": "BIMAS",
    "symbol": "BIST:BIMAS",
    "name": "BİM Mağazalar",
    "unit": "₺",
    "defaultPrice": 376.75,
    "defaultChange": 0.53,
    "defaultVol": 1076730779
  },
  {
    "code": "A1CAP",
    "symbol": "BIST:A1CAP",
    "name": "A1 Capital Yatitim Menkul Degerler",
    "unit": "₺",
    "defaultPrice": 8.14,
    "defaultChange": 1.5,
    "defaultVol": 23049273
  },
  {
    "code": "YYLGD",
    "symbol": "BIST:YYLGD",
    "name": "Yayla Agro Gida Sanayi ve Nakliyat AS",
    "unit": "₺",
    "defaultPrice": 10.37,
    "defaultChange": 1.07,
    "defaultVol": 28920686
  },
  {
    "code": "KRDMA",
    "symbol": "BIST:KRDMA",
    "name": "Kardemir Karabiik Demir celik Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 43.48,
    "defaultChange": 2.98,
    "defaultVol": 120532430
  },
  {
    "code": "RYSAS",
    "symbol": "BIST:RYSAS",
    "name": "Reysas Tasimacilik ve Lojistik Ticaret",
    "unit": "₺",
    "defaultPrice": 23.2,
    "defaultChange": -2.85,
    "defaultVol": 64225256
  },
  {
    "code": "LXGYO",
    "symbol": "BIST:LXGYO",
    "name": "Luxera Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 10.71,
    "defaultChange": 0.19,
    "defaultVol": 29459708
  },
  {
    "code": "NTGAZ",
    "symbol": "BIST:NTGAZ",
    "name": "Naturelgaz Sanayi Ve Ticaret",
    "unit": "₺",
    "defaultPrice": 10.63,
    "defaultChange": -2.39,
    "defaultVol": 29188428
  },
  {
    "code": "DCTTR",
    "symbol": "BIST:DCTTR",
    "name": "DCT Trading Dis Ticaret",
    "unit": "₺",
    "defaultPrice": 7.52,
    "defaultChange": 0.53,
    "defaultVol": 20499182
  },
  {
    "code": "MOGAN",
    "symbol": "BIST:MOGAN",
    "name": "Mogan Enerji Yatirim Holding",
    "unit": "₺",
    "defaultPrice": 20,
    "defaultChange": 0.2,
    "defaultVol": 54007000
  },
  {
    "code": "BERA",
    "symbol": "BIST:BERA",
    "name": "Bera Holding AS",
    "unit": "₺",
    "defaultPrice": 13.29,
    "defaultChange": -1.41,
    "defaultVol": 35849629
  },
  {
    "code": "GENTS",
    "symbol": "BIST:GENTS",
    "name": "Gentas Dekoratif Yuzeyler Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 5.2,
    "defaultChange": -0.95,
    "defaultVol": 13708438
  },
  {
    "code": "NATEN",
    "symbol": "BIST:NATEN",
    "name": "Naturel Yenilenebilir Enerji Ticaret",
    "unit": "₺",
    "defaultPrice": 5.59,
    "defaultChange": -0.53,
    "defaultVol": 14433190
  },
  {
    "code": "QUICK",
    "symbol": "BIST:QUICK",
    "name": "Quick Sigorta AS",
    "unit": "₺",
    "defaultPrice": 74.1,
    "defaultChange": 1.02,
    "defaultVol": 188855484
  },
  {
    "code": "TUREX",
    "symbol": "BIST:TUREX",
    "name": "TUREKS TURIZM TASIMACILIK",
    "unit": "₺",
    "defaultPrice": 6.54,
    "defaultChange": 0.15,
    "defaultVol": 16565297
  },
  {
    "code": "FRMPL",
    "symbol": "BIST:FRMPL",
    "name": "Formul Plastik Ve Metal Sanayi AS",
    "unit": "₺",
    "defaultPrice": 38.66,
    "defaultChange": 0.62,
    "defaultVol": 95543860
  },
  {
    "code": "PAPIL",
    "symbol": "BIST:PAPIL",
    "name": "PAPILON SAVUNMA TEKNOLOJI VE TICARET A.S",
    "unit": "₺",
    "defaultPrice": 12.08,
    "defaultChange": -3.36,
    "defaultVol": 29825677
  },
  {
    "code": "SSAAT",
    "symbol": "BIST:SSAAT",
    "name": "Saat ve Saat Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 39.74,
    "defaultChange": -0.9,
    "defaultVol": 98100415
  },
  {
    "code": "ORGE",
    "symbol": "BIST:ORGE",
    "name": "Orge Enerji Elektrik Taahhut AS",
    "unit": "₺",
    "defaultPrice": 116.3,
    "defaultChange": 5.06,
    "defaultVol": 283891556
  },
  {
    "code": "GEDIK",
    "symbol": "BIST:GEDIK",
    "name": "Gedik Yatirim Menkul Degerler",
    "unit": "₺",
    "defaultPrice": 6.36,
    "defaultChange": 0.79,
    "defaultVol": 15449833
  },
  {
    "code": "ENDAE",
    "symbol": "BIST:ENDAE",
    "name": "Enda Enerji Holding",
    "unit": "₺",
    "defaultPrice": 19.28,
    "defaultChange": 0.16,
    "defaultVol": 46796339
  },
  {
    "code": "TEKTU",
    "symbol": "BIST:TEKTU",
    "name": "Tek-Art Insaat Ticaret Turizm Sanayi ve Yatirimlar",
    "unit": "₺",
    "defaultPrice": 7.58,
    "defaultChange": -1.43,
    "defaultVol": 18354295
  },
  {
    "code": "LKMNH",
    "symbol": "BIST:LKMNH",
    "name": "Lokman Hekim Engurusag Saglik, Turizm, Egitim Hizmetleri ve Insaat Taahhut",
    "unit": "₺",
    "defaultPrice": 12.88,
    "defaultChange": -5.71,
    "defaultVol": 30948760
  },
  {
    "code": "GESAN",
    "symbol": "BIST:GESAN",
    "name": "Girişim Elektrik",
    "unit": "₺",
    "defaultPrice": 83.95,
    "defaultChange": -0.65,
    "defaultVol": 200046050
  },
  {
    "code": "VESTL",
    "symbol": "BIST:VESTL",
    "name": "Vestel",
    "unit": "₺",
    "defaultPrice": 22.56,
    "defaultChange": 1.44,
    "defaultVol": 53752697
  },
  {
    "code": "KAYSE",
    "symbol": "BIST:KAYSE",
    "name": "Kayseri Şeker",
    "unit": "₺",
    "defaultPrice": 3.8,
    "defaultChange": -0.26,
    "defaultVol": 8986172
  },
  {
    "code": "VBTYZ",
    "symbol": "BIST:VBTYZ",
    "name": "VBT Yazilim AS",
    "unit": "₺",
    "defaultPrice": 33.5,
    "defaultChange": 6.48,
    "defaultVol": 78524034
  },
  {
    "code": "UCAYM",
    "symbol": "BIST:UCAYM",
    "name": "Ucay Muhendislik Enerji ve Iklimlendirme Teknolojileri",
    "unit": "₺",
    "defaultPrice": 28.46,
    "defaultChange": 2.37,
    "defaultVol": 66320822
  },
  {
    "code": "BOBET",
    "symbol": "BIST:BOBET",
    "name": "Bogazici Beton Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 19.3,
    "defaultChange": -2.23,
    "defaultVol": 44863545
  },
  {
    "code": "CEMAS",
    "symbol": "BIST:CEMAS",
    "name": "Cemas Dokum Sanayi",
    "unit": "₺",
    "defaultPrice": 4.1,
    "defaultChange": 0.49,
    "defaultVol": 9517478
  },
  {
    "code": "DOHOL",
    "symbol": "BIST:DOHOL",
    "name": "Doğan Holding",
    "unit": "₺",
    "defaultPrice": 20.84,
    "defaultChange": -0.1,
    "defaultVol": 48180309
  },
  {
    "code": "VAKFA",
    "symbol": "BIST:VAKFA",
    "name": "Vakif Faktoring",
    "unit": "₺",
    "defaultPrice": 10.96,
    "defaultChange": 0.37,
    "defaultVol": 25149802
  },
  {
    "code": "AZTEK",
    "symbol": "BIST:AZTEK",
    "name": "Aztek Teknoloji Urunleri Ticaret",
    "unit": "₺",
    "defaultPrice": 4.63,
    "defaultChange": -0.64,
    "defaultVol": 10599482
  },
  {
    "code": "HURGZ",
    "symbol": "BIST:HURGZ",
    "name": "Hurriyet Gazetecilik ve Matbaacilik",
    "unit": "₺",
    "defaultPrice": 7.53,
    "defaultChange": -1.95,
    "defaultVol": 17191382
  },
  {
    "code": "GEREL",
    "symbol": "BIST:GEREL",
    "name": "Gersan Elektrik Ticaret ve Sanayi",
    "unit": "₺",
    "defaultPrice": 45.78,
    "defaultChange": -0.26,
    "defaultVol": 104493262
  },
  {
    "code": "TCKRC",
    "symbol": "BIST:TCKRC",
    "name": "Kirac Galvaniz Telekominikasyon Metal Makine Insaat Elektrik Sanayi Ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 172.7,
    "defaultChange": 0.99,
    "defaultVol": 391366005
  },
  {
    "code": "CIMSA",
    "symbol": "BIST:CIMSA",
    "name": "Çimsa Çimento",
    "unit": "₺",
    "defaultPrice": 45.96,
    "defaultChange": 0.7,
    "defaultVol": 104049855
  },
  {
    "code": "EYGYO",
    "symbol": "BIST:EYGYO",
    "name": "EYG Gayrimenkul Yatirim Ortakligi AS",
    "unit": "₺",
    "defaultPrice": 2.6,
    "defaultChange": -1.89,
    "defaultVol": 5775115
  },
  {
    "code": "GUBRF",
    "symbol": "BIST:GUBRF",
    "name": "Gübre Fabrikaları",
    "unit": "₺",
    "defaultPrice": 440,
    "defaultChange": 4.95,
    "defaultVol": 908061000
  },
  {
    "code": "KRVGD",
    "symbol": "BIST:KRVGD",
    "name": "Kervan Gida Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 2.41,
    "defaultChange": 0.42,
    "defaultVol": 4927298
  },
  {
    "code": "KLGYO",
    "symbol": "BIST:KLGYO",
    "name": "Kiler Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 4.39,
    "defaultChange": -1.13,
    "defaultVol": 8870838
  },
  {
    "code": "MOBTL",
    "symbol": "BIST:MOBTL",
    "name": "Mobitel Iletisim Nizmetleri Sanayi ve Ticaret A.S",
    "unit": "₺",
    "defaultPrice": 14.33,
    "defaultChange": -3.76,
    "defaultVol": 28873746
  },
  {
    "code": "CATES",
    "symbol": "BIST:CATES",
    "name": "Çates Elektrik",
    "unit": "₺",
    "defaultPrice": 55.05,
    "defaultChange": 5.97,
    "defaultVol": 110326586
  },
  {
    "code": "HOROZ",
    "symbol": "BIST:HOROZ",
    "name": "Horoz Lojistik Kargo Hizmetleri Ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 66.85,
    "defaultChange": 0.98,
    "defaultVol": 133965862
  },
  {
    "code": "PRZMA",
    "symbol": "BIST:PRZMA",
    "name": "Prizma Pres Matbaacilik Yayincilik Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 79.2,
    "defaultChange": 10,
    "defaultVol": 158101099
  },
  {
    "code": "CCOLA",
    "symbol": "BIST:CCOLA",
    "name": "Coca-Cola Icecek",
    "unit": "₺",
    "defaultPrice": 80.75,
    "defaultChange": -1.76,
    "defaultVol": 159717363
  },
  {
    "code": "ARFYE",
    "symbol": "BIST:ARFYE",
    "name": "ARF Bio Yenilenebilir Enerji Uretim AS",
    "unit": "₺",
    "defaultPrice": 23.86,
    "defaultChange": -1.08,
    "defaultVol": 45801227
  },
  {
    "code": "RUBNS",
    "symbol": "BIST:RUBNS",
    "name": "Rubenis Tekstil Sanayi Ticaret AS",
    "unit": "₺",
    "defaultPrice": 34.02,
    "defaultChange": 3.4,
    "defaultVol": 64935471
  },
  {
    "code": "DMSAS",
    "symbol": "BIST:DMSAS",
    "name": "Demisas Dokum Emaye Mamulleri Sanayi",
    "unit": "₺",
    "defaultPrice": 9.22,
    "defaultChange": 2.44,
    "defaultVol": 17586846
  },
  {
    "code": "SRVGY",
    "symbol": "BIST:SRVGY",
    "name": "Servet Gayrimenkul Yatirim Ortakligi AS",
    "unit": "₺",
    "defaultPrice": 2.55,
    "defaultChange": 0.79,
    "defaultVol": 4835455
  },
  {
    "code": "BORSK",
    "symbol": "BIST:BORSK",
    "name": "Bor Seker",
    "unit": "₺",
    "defaultPrice": 6.15,
    "defaultChange": 1.65,
    "defaultVol": 11544503
  },
  {
    "code": "HRKET",
    "symbol": "BIST:HRKET",
    "name": "Hareket Proje Tasimaciligi ve Yuk Muhendisligi AS",
    "unit": "₺",
    "defaultPrice": 104.5,
    "defaultChange": 4.81,
    "defaultVol": 195767792
  },
  {
    "code": "BOSSA",
    "symbol": "BIST:BOSSA",
    "name": "Bossa Ticaret ve Sanayi Isletmeleri T.",
    "unit": "₺",
    "defaultPrice": 6.82,
    "defaultChange": -3.94,
    "defaultVol": 12747057
  },
  {
    "code": "KRPLS",
    "symbol": "BIST:KRPLS",
    "name": "Koroplast Temizlik Ambalaj Urunleri Sanayi ve dis Ticaret AS",
    "unit": "₺",
    "defaultPrice": 10.08,
    "defaultChange": 4.13,
    "defaultVol": 18760311
  },
  {
    "code": "ISGYO",
    "symbol": "BIST:ISGYO",
    "name": "İş GYO",
    "unit": "₺",
    "defaultPrice": 27.44,
    "defaultChange": 2.08,
    "defaultVol": 50620160
  },
  {
    "code": "TEZOL",
    "symbol": "BIST:TEZOL",
    "name": "Europap Tezol Paper Industry and Trade Inc.",
    "unit": "₺",
    "defaultPrice": 9.95,
    "defaultChange": 0.91,
    "defaultVol": 18309861
  },
  {
    "code": "OSMEN",
    "symbol": "BIST:OSMEN",
    "name": "Osmanli Yatirim Menkul Degerler",
    "unit": "₺",
    "defaultPrice": 8.02,
    "defaultChange": 3.75,
    "defaultVol": 14747665
  },
  {
    "code": "FADE",
    "symbol": "BIST:FADE",
    "name": "Fade Gida Yatirim Sanayi Ticaret",
    "unit": "₺",
    "defaultPrice": 15.42,
    "defaultChange": -0.84,
    "defaultVol": 27840008
  },
  {
    "code": "SOKM",
    "symbol": "BIST:SOKM",
    "name": "Şok Marketler",
    "unit": "₺",
    "defaultPrice": 52.35,
    "defaultChange": -0.66,
    "defaultVol": 93739009
  },
  {
    "code": "BNTAS",
    "symbol": "BIST:BNTAS",
    "name": "Bantas Bandirma Ambalaj Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 6.32,
    "defaultChange": 0.64,
    "defaultVol": 11202175
  },
  {
    "code": "AKFIS",
    "symbol": "BIST:AKFIS",
    "name": "Akfen insaat Turizm ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 92,
    "defaultChange": 3.55,
    "defaultVol": 162770632
  },
  {
    "code": "EPLAS",
    "symbol": "BIST:EPLAS",
    "name": "Egeplast Ege Plastik Ticaret ve Sanayi",
    "unit": "₺",
    "defaultPrice": 5.67,
    "defaultChange": 2.16,
    "defaultVol": 10028115
  },
  {
    "code": "AKHAN",
    "symbol": "BIST:AKHAN",
    "name": "Akhan Un Fabrikasi Ve Tarim Urunleri Gida Sanayi Ticaret",
    "unit": "₺",
    "defaultPrice": 40.92,
    "defaultChange": -3.67,
    "defaultVol": 72003773
  },
  {
    "code": "TRENJ",
    "symbol": "BIST:TRENJ",
    "name": "TR Dogal Enerji Kaynaklari Arastirma ve Uretim",
    "unit": "₺",
    "defaultPrice": 94.2,
    "defaultChange": -0.79,
    "defaultVol": 164724526
  },
  {
    "code": "DOFER",
    "symbol": "BIST:DOFER",
    "name": "Dofer Yapi Maizemeleri Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 31.2,
    "defaultChange": 4.91,
    "defaultVol": 54089100
  },
  {
    "code": "AAGYO",
    "symbol": "BIST:AAGYO",
    "name": "Agaoglu Avrasya Gayrimenkul Yatirim Ortakligi AS",
    "unit": "₺",
    "defaultPrice": 12.7,
    "defaultChange": -0.78,
    "defaultVol": 21847035
  },
  {
    "code": "AGHOL",
    "symbol": "BIST:AGHOL",
    "name": "Anadolu Grubu Holding",
    "unit": "₺",
    "defaultPrice": 31.22,
    "defaultChange": 0.26,
    "defaultVol": 53186579
  },
  {
    "code": "DESA",
    "symbol": "BIST:DESA",
    "name": "Desa Deri Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 10.47,
    "defaultChange": -0.29,
    "defaultVol": 17655687
  },
  {
    "code": "ADEL",
    "symbol": "BIST:ADEL",
    "name": "Adel Kalemcilik Ticaret ve Sanayi",
    "unit": "₺",
    "defaultPrice": 32.98,
    "defaultChange": -0.48,
    "defaultVol": 54976934
  },
  {
    "code": "EDATA",
    "symbol": "BIST:EDATA",
    "name": "E-Data Teknoloji Pazarlama AS",
    "unit": "₺",
    "defaultPrice": 19.89,
    "defaultChange": 1.84,
    "defaultVol": 32491946
  },
  {
    "code": "GIPTA",
    "symbol": "BIST:GIPTA",
    "name": "Gipta Ofis Kirtasiye ve Promosyon Urunleri Imalat Sanayi",
    "unit": "₺",
    "defaultPrice": 80.45,
    "defaultChange": -0.56,
    "defaultVol": 127926280
  },
  {
    "code": "OZSUB",
    "symbol": "BIST:OZSUB",
    "name": "Ozsu Balik Uretim",
    "unit": "₺",
    "defaultPrice": 39.94,
    "defaultChange": 0.3,
    "defaultVol": 63324071
  },
  {
    "code": "MNDRS",
    "symbol": "BIST:MNDRS",
    "name": "Menderes Tekstil Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 10.99,
    "defaultChange": 1.67,
    "defaultVol": 17346616
  },
  {
    "code": "CONSE",
    "symbol": "BIST:CONSE",
    "name": "Consus Enerji Isletmeciligi ve Hizmetleri",
    "unit": "₺",
    "defaultPrice": 2.28,
    "defaultChange": 0.44,
    "defaultVol": 3586171
  },
  {
    "code": "ULUUN",
    "symbol": "BIST:ULUUN",
    "name": "Ulusoy Un Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 8.34,
    "defaultChange": -0.24,
    "defaultVol": 13043076
  },
  {
    "code": "MHRGY",
    "symbol": "BIST:MHRGY",
    "name": "MHR Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 3.34,
    "defaultChange": -0.6,
    "defaultVol": 5012669
  },
  {
    "code": "NIBAS",
    "symbol": "BIST:NIBAS",
    "name": "Nigbas Nigde Beton Sanayi ve Ticarte",
    "unit": "₺",
    "defaultPrice": 3.51,
    "defaultChange": 0.57,
    "defaultVol": 5258075
  },
  {
    "code": "OZYSR",
    "symbol": "BIST:OZYSR",
    "name": "Ozyasar Tel ve Galvanizleme Sanayi",
    "unit": "₺",
    "defaultPrice": 13.02,
    "defaultChange": 2.44,
    "defaultVol": 19469353
  },
  {
    "code": "SANFM",
    "symbol": "BIST:SANFM",
    "name": "SANIFOAM ENDUSTRI VE TUKETIM URUNLERI SANAYI TICARET",
    "unit": "₺",
    "defaultPrice": 9.15,
    "defaultChange": 1.1,
    "defaultVol": 13679790
  },
  {
    "code": "GWIND",
    "symbol": "BIST:GWIND",
    "name": "GALATA WIND ENERJI",
    "unit": "₺",
    "defaultPrice": 23.02,
    "defaultChange": 0.35,
    "defaultVol": 34239603
  },
  {
    "code": "RNPOL",
    "symbol": "BIST:RNPOL",
    "name": "Rainbow Polikarbonat Sanayi Ticaret",
    "unit": "₺",
    "defaultPrice": 2.51,
    "defaultChange": -1.57,
    "defaultVol": 3673307
  },
  {
    "code": "RYGYO",
    "symbol": "BIST:RYGYO",
    "name": "Reysas Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 40.86,
    "defaultChange": -2.9,
    "defaultVol": 59504786
  },
  {
    "code": "AHGAZ",
    "symbol": "BIST:AHGAZ",
    "name": "Ahlatcı Doğalgaz",
    "unit": "₺",
    "defaultPrice": 33.7,
    "defaultChange": -0.47,
    "defaultVol": 48912955
  },
  {
    "code": "AKFYE",
    "symbol": "BIST:AKFYE",
    "name": "AKFEN YENILENEBILIR ENERJI",
    "unit": "₺",
    "defaultPrice": 23.08,
    "defaultChange": 0.09,
    "defaultVol": 33496281
  },
  {
    "code": "RUZYE",
    "symbol": "BIST:RUZYE",
    "name": "Ruzy Madencilik Ve Enerji Yatirimlari Sanayi Ve Ticaret",
    "unit": "₺",
    "defaultPrice": 8.43,
    "defaultChange": -0.12,
    "defaultVol": 12017766
  },
  {
    "code": "SUWEN",
    "symbol": "BIST:SUWEN",
    "name": "Suwen Tekstil San. Paz. AS",
    "unit": "₺",
    "defaultPrice": 6.47,
    "defaultChange": 0.31,
    "defaultVol": 9100909
  },
  {
    "code": "BARMA",
    "symbol": "BIST:BARMA",
    "name": "Barem Ambalaj Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 10.01,
    "defaultChange": -6.62,
    "defaultVol": 13916022
  },
  {
    "code": "NETCD",
    "symbol": "BIST:NETCD",
    "name": "Netcad Yazilim",
    "unit": "₺",
    "defaultPrice": 130.4,
    "defaultChange": 1.32,
    "defaultVol": 180262874
  },
  {
    "code": "YAPRK",
    "symbol": "BIST:YAPRK",
    "name": "Yaprak Sut ve Besi Ciftikleri Sanayi Ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 11.27,
    "defaultChange": -1.23,
    "defaultVol": 15524109
  },
  {
    "code": "VRGYO",
    "symbol": "BIST:VRGYO",
    "name": "Vera Konsept Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 1.75,
    "defaultChange": -0.57,
    "defaultVol": 2382401
  },
  {
    "code": "MOPAS",
    "symbol": "BIST:MOPAS",
    "name": "Mopas Marketcilik Gida Sanayi Ve Ticaret",
    "unit": "₺",
    "defaultPrice": 28.28,
    "defaultChange": 1.14,
    "defaultVol": 38348726
  },
  {
    "code": "KRSTL",
    "symbol": "BIST:KRSTL",
    "name": "Kristal Kola ve Mesrubat Sanayi Ticaret",
    "unit": "₺",
    "defaultPrice": 9.51,
    "defaultChange": 0.96,
    "defaultVol": 12815724
  },
  {
    "code": "IZFAS",
    "symbol": "BIST:IZFAS",
    "name": "Izmir Firca Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 63.5,
    "defaultChange": 2.09,
    "defaultVol": 85512783
  },
  {
    "code": "CGCAM",
    "symbol": "BIST:CGCAM",
    "name": "Cagdas Cam Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 36.96,
    "defaultChange": 2.44,
    "defaultVol": 49117918
  },
  {
    "code": "CEOEM",
    "symbol": "BIST:CEOEM",
    "name": "CEO Event Medya AS",
    "unit": "₺",
    "defaultPrice": 24.82,
    "defaultChange": 2.9,
    "defaultVol": 32606704
  },
  {
    "code": "TUCLK",
    "symbol": "BIST:TUCLK",
    "name": "Tugcelik Aluminyum ve Metal Mamulleri Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 3.81,
    "defaultChange": -0.26,
    "defaultVol": 4964106
  },
  {
    "code": "ZPLIB",
    "symbol": "BIST:ZPLIB",
    "name": "Ziraat Portfoy BIST Likit Banka Endeksi Hisse Senedi Yogun Borsa Yatirim Fonu",
    "unit": "₺",
    "defaultPrice": 186.35,
    "defaultChange": -0.32,
    "defaultVol": 241394436
  },
  {
    "code": "YAYLA",
    "symbol": "BIST:YAYLA",
    "name": "Yayla Enerji Uretim Turizm ve Insaat Ticaret AS",
    "unit": "₺",
    "defaultPrice": 23.08,
    "defaultChange": -0.52,
    "defaultVol": 29446641
  },
  {
    "code": "BEGYO",
    "symbol": "BIST:BEGYO",
    "name": "Bati Ege Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 3.55,
    "defaultChange": -0.28,
    "defaultVol": 4522849
  },
  {
    "code": "FORTE",
    "symbol": "BIST:FORTE",
    "name": "FORTE BILGI ILETISIM TEKNOLOJILERI VE SAVUNMA SANAYI",
    "unit": "₺",
    "defaultPrice": 141.9,
    "defaultChange": 3.96,
    "defaultVol": 180664810
  },
  {
    "code": "BIOEN",
    "symbol": "BIST:BIOEN",
    "name": "BIotrend Cevre ve EnerjI Yatirimlari AS",
    "unit": "₺",
    "defaultPrice": 17.23,
    "defaultChange": -1.26,
    "defaultVol": 21935582
  },
  {
    "code": "TAVHL",
    "symbol": "BIST:TAVHL",
    "name": "TAV Havalimanları",
    "unit": "₺",
    "defaultPrice": 279.5,
    "defaultChange": 1.27,
    "defaultVol": 355256798
  },
  {
    "code": "EGSER",
    "symbol": "BIST:EGSER",
    "name": "Ege Seramik Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 3,
    "defaultChange": 0,
    "defaultVol": 3795537
  },
  {
    "code": "ENJSA",
    "symbol": "BIST:ENJSA",
    "name": "Enerjisa Enerji",
    "unit": "₺",
    "defaultPrice": 107.3,
    "defaultChange": 1.04,
    "defaultVol": 133683782
  },
  {
    "code": "AKSGY",
    "symbol": "BIST:AKSGY",
    "name": "Akis Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 9.72,
    "defaultChange": -0.82,
    "defaultVol": 12096715
  },
  {
    "code": "MGROS",
    "symbol": "BIST:MGROS",
    "name": "Migros Ticaret",
    "unit": "₺",
    "defaultPrice": 558,
    "defaultChange": 0.54,
    "defaultVol": 691882056
  },
  {
    "code": "CELHA",
    "symbol": "BIST:CELHA",
    "name": "Celik Halat ve Tel Sanayii",
    "unit": "₺",
    "defaultPrice": 25.02,
    "defaultChange": 1.46,
    "defaultVol": 31013566
  },
  {
    "code": "BIENY",
    "symbol": "BIST:BIENY",
    "name": "Bien Yapi Urunleri Sanayi Turizm Ve Ticaret",
    "unit": "₺",
    "defaultPrice": 20.84,
    "defaultChange": 0.19,
    "defaultVol": 25401376
  },
  {
    "code": "SMART",
    "symbol": "BIST:SMART",
    "name": "Smartiks Yazilim AS",
    "unit": "₺",
    "defaultPrice": 25.6,
    "defaultChange": 3.23,
    "defaultVol": 31194138
  },
  {
    "code": "EMKEL",
    "symbol": "BIST:EMKEL",
    "name": "Emek Elektrik Endustrisi",
    "unit": "₺",
    "defaultPrice": 17.9,
    "defaultChange": -0.61,
    "defaultVol": 21652037
  },
  {
    "code": "INVEO",
    "symbol": "BIST:INVEO",
    "name": "Inveo Yatirim Holding AS",
    "unit": "₺",
    "defaultPrice": 7.09,
    "defaultChange": 0.42,
    "defaultVol": 8471479
  },
  {
    "code": "INDES",
    "symbol": "BIST:INDES",
    "name": "Indeks Bilgisayar Sistemleri Muhendislik Sanayi ve Ticaret A.S",
    "unit": "₺",
    "defaultPrice": 10.3,
    "defaultChange": -0.96,
    "defaultVol": 12198764
  },
  {
    "code": "GSDDE",
    "symbol": "BIST:GSDDE",
    "name": "GSD Denizcilik Gayrimenkul Insaat Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 13.38,
    "defaultChange": 1.36,
    "defaultVol": 15713097
  },
  {
    "code": "DYOBY",
    "symbol": "BIST:DYOBY",
    "name": "Dyo Boya Fabrikalari Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 13.28,
    "defaultChange": -1.63,
    "defaultVol": 15488743
  },
  {
    "code": "MAVI",
    "symbol": "BIST:MAVI",
    "name": "Mavi Giyim",
    "unit": "₺",
    "defaultPrice": 38.2,
    "defaultChange": -0.05,
    "defaultVol": 43282052
  },
  {
    "code": "BURCE",
    "symbol": "BIST:BURCE",
    "name": "Burcelik Bursa Celik Doekum Sanayii",
    "unit": "₺",
    "defaultPrice": 36.38,
    "defaultChange": 2.71,
    "defaultVol": 40632385
  },
  {
    "code": "MERCN",
    "symbol": "BIST:MERCN",
    "name": "MERCAN KIMYA SANAYI VE TICARET",
    "unit": "₺",
    "defaultPrice": 21.42,
    "defaultChange": 3.48,
    "defaultVol": 23918707
  },
  {
    "code": "EGEPO",
    "symbol": "BIST:EGEPO",
    "name": "Nasmed Ozel Saglik Hizmetleri Ticaret",
    "unit": "₺",
    "defaultPrice": 18.04,
    "defaultChange": 1.92,
    "defaultVol": 19984279
  },
  {
    "code": "GLRMK",
    "symbol": "BIST:GLRMK",
    "name": "Gulermak Agir Sanayi Insaat Ve Taahhut",
    "unit": "₺",
    "defaultPrice": 180.1,
    "defaultChange": 0.61,
    "defaultVol": 198877406
  },
  {
    "code": "PINSU",
    "symbol": "BIST:PINSU",
    "name": "Pinar Su ve Icecek Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 10.38,
    "defaultChange": 0.1,
    "defaultVol": 11229333
  },
  {
    "code": "BRLSM",
    "symbol": "BIST:BRLSM",
    "name": "Birlesim Muhendislik Isitma Sogutma Havalandirma Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 15.9,
    "defaultChange": -0.81,
    "defaultVol": 17096348
  },
  {
    "code": "EKSUN",
    "symbol": "BIST:EKSUN",
    "name": "Eksun Gida Tarim Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 6.08,
    "defaultChange": 0.33,
    "defaultVol": 6528278
  },
  {
    "code": "AVOD",
    "symbol": "BIST:AVOD",
    "name": "A.V.O.D. KURUTULMUS GIDA VE TARIM URUNLERI SANAYI TICARET",
    "unit": "₺",
    "defaultPrice": 3.94,
    "defaultChange": 0,
    "defaultVol": 4190009
  },
  {
    "code": "SAYAS",
    "symbol": "BIST:SAYAS",
    "name": "Say Yenilenebilir Enerji Ekipmanlari Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 57.75,
    "defaultChange": -1.37,
    "defaultVol": 61139001
  },
  {
    "code": "KUYAS",
    "symbol": "BIST:KUYAS",
    "name": "Kuyas Yatirim",
    "unit": "₺",
    "defaultPrice": 64.9,
    "defaultChange": 1.25,
    "defaultVol": 68070105
  },
  {
    "code": "DOFRB",
    "symbol": "BIST:DOFRB",
    "name": "DOF Robotik Sanayi",
    "unit": "₺",
    "defaultPrice": 135.8,
    "defaultChange": -1.38,
    "defaultVol": 140945055
  },
  {
    "code": "SELEC",
    "symbol": "BIST:SELEC",
    "name": "Selcuk Ecza Deposu Ticaret ve Sanayi",
    "unit": "₺",
    "defaultPrice": 253,
    "defaultChange": 0.8,
    "defaultVol": 260497402
  },
  {
    "code": "BIGCH",
    "symbol": "BIST:BIGCH",
    "name": "Buyuk Sefler Gida Turizm Tekstil Danismanlik Organizasyon Egitim Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 6.14,
    "defaultChange": 0,
    "defaultVol": 6091555
  },
  {
    "code": "PLTUR",
    "symbol": "BIST:PLTUR",
    "name": "PLATFORM TURIZM TASIMACILIK GIDA INSAAT TEMIZLIK HIZMETLERI SANAYI VE TICARET",
    "unit": "₺",
    "defaultPrice": 20.14,
    "defaultChange": -2.52,
    "defaultVol": 19618475
  },
  {
    "code": "BESLR",
    "symbol": "BIST:BESLR",
    "name": "Besler Gida Ve Kimya Sanayi Ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 12.65,
    "defaultChange": -0.86,
    "defaultVol": 12318659
  },
  {
    "code": "ETILR",
    "symbol": "BIST:ETILR",
    "name": "Etiler Gida ve Ticari Yatirimlar Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 6.13,
    "defaultChange": 0.49,
    "defaultVol": 5954161
  },
  {
    "code": "SAFKR",
    "symbol": "BIST:SAFKR",
    "name": "Safkar Ege Cooling Air Conditioning Cold Air Tes.Ihr.Ith.A.S",
    "unit": "₺",
    "defaultPrice": 20.4,
    "defaultChange": -0.49,
    "defaultVol": 19592017
  },
  {
    "code": "ALARK",
    "symbol": "BIST:ALARK",
    "name": "Alarko Holding",
    "unit": "₺",
    "defaultPrice": 103.3,
    "defaultChange": -0.1,
    "defaultVol": 96849741
  },
  {
    "code": "KLSER",
    "symbol": "BIST:KLSER",
    "name": "Kaleseramik Canakkale Kalebodur Seramik",
    "unit": "₺",
    "defaultPrice": 24.86,
    "defaultChange": -0.96,
    "defaultVol": 23223143
  },
  {
    "code": "MAKTK",
    "symbol": "BIST:MAKTK",
    "name": "Makina Takim Endustrisi",
    "unit": "₺",
    "defaultPrice": 9.74,
    "defaultChange": 0.83,
    "defaultVol": 9075011
  },
  {
    "code": "EGGUB",
    "symbol": "BIST:EGGUB",
    "name": "Ege Gübre",
    "unit": "₺",
    "defaultPrice": 104.1,
    "defaultChange": 1.76,
    "defaultVol": 95486454
  },
  {
    "code": "TOASO",
    "symbol": "BIST:TOASO",
    "name": "Tofaş Oto",
    "unit": "₺",
    "defaultPrice": 267.75,
    "defaultChange": -0.28,
    "defaultVol": 244738762
  },
  {
    "code": "EDIP",
    "symbol": "BIST:EDIP",
    "name": "Edip Gayrimenkul Yatirim Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 35.18,
    "defaultChange": -1.79,
    "defaultVol": 32040572
  },
  {
    "code": "CRDFA",
    "symbol": "BIST:CRDFA",
    "name": "Creditwest Faktoring",
    "unit": "₺",
    "defaultPrice": 28.4,
    "defaultChange": -0.28,
    "defaultVol": 25637646
  },
  {
    "code": "ALKA",
    "symbol": "BIST:ALKA",
    "name": "Alkim Kagit Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 8.09,
    "defaultChange": -0.49,
    "defaultVol": 7170547
  },
  {
    "code": "ECOGR",
    "symbol": "BIST:ECOGR",
    "name": "Ecogreen Enerji Holding",
    "unit": "₺",
    "defaultPrice": 36.74,
    "defaultChange": 0.93,
    "defaultVol": 32452883
  },
  {
    "code": "KONKA",
    "symbol": "BIST:KONKA",
    "name": "Konya Kagit Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 11.71,
    "defaultChange": 1.39,
    "defaultVol": 10329567
  },
  {
    "code": "AVGYO",
    "symbol": "BIST:AVGYO",
    "name": "Avrasya Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 17.95,
    "defaultChange": 2.81,
    "defaultVol": 15568376
  },
  {
    "code": "SERNT",
    "symbol": "BIST:SERNT",
    "name": "Seranit Granit Seramik Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 7.9,
    "defaultChange": 0.64,
    "defaultVol": 6830324
  },
  {
    "code": "ARASE",
    "symbol": "BIST:ARASE",
    "name": "Dogu Aras Enerji Yatirimlari AS",
    "unit": "₺",
    "defaultPrice": 122.9,
    "defaultChange": 7.24,
    "defaultVol": 103441366
  },
  {
    "code": "OZKGY",
    "symbol": "BIST:OZKGY",
    "name": "Özak GYO",
    "unit": "₺",
    "defaultPrice": 12.54,
    "defaultChange": -1.34,
    "defaultVol": 10538879
  },
  {
    "code": "LMKDC",
    "symbol": "BIST:LMKDC",
    "name": "Limak Dogu Anadolu Cimento Sanayi Ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 24.38,
    "defaultChange": -0.81,
    "defaultVol": 20432293
  },
  {
    "code": "HATEK",
    "symbol": "BIST:HATEK",
    "name": "Hateks Hatay Tekstil Isletmeleri",
    "unit": "₺",
    "defaultPrice": 12.15,
    "defaultChange": 1.5,
    "defaultVol": 10169076
  },
  {
    "code": "ANGEN",
    "symbol": "BIST:ANGEN",
    "name": "Anatolia Tani ve Biyoteknoloji Urunleri Arastirma Gelistirme Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 9.17,
    "defaultChange": 0.77,
    "defaultVol": 7618418
  },
  {
    "code": "BMSCH",
    "symbol": "BIST:BMSCH",
    "name": "BMS Celik Hasir Sanayi Ve Ticaret",
    "unit": "₺",
    "defaultPrice": 12.1,
    "defaultChange": 0.67,
    "defaultVol": 9904407
  },
  {
    "code": "ATATP",
    "symbol": "BIST:ATATP",
    "name": "ATP Yazilim ve Teknoloji AS",
    "unit": "₺",
    "defaultPrice": 286.75,
    "defaultChange": 1.06,
    "defaultVol": 231743608
  },
  {
    "code": "SEGYO",
    "symbol": "BIST:SEGYO",
    "name": "SEKER GAYRIMENKUL YATIRIM ORTAKLIGI",
    "unit": "₺",
    "defaultPrice": 3.86,
    "defaultChange": -1.78,
    "defaultVol": 3084221
  },
  {
    "code": "BRSAN",
    "symbol": "BIST:BRSAN",
    "name": "Borusan Boru",
    "unit": "₺",
    "defaultPrice": 655.5,
    "defaultChange": -1.13,
    "defaultVol": 521656077
  },
  {
    "code": "KLSYN",
    "symbol": "BIST:KLSYN",
    "name": "Koleksiyon Mobilya Sanayi AS",
    "unit": "₺",
    "defaultPrice": 16,
    "defaultChange": -0.5,
    "defaultVol": 12390672
  },
  {
    "code": "GZNMI",
    "symbol": "BIST:GZNMI",
    "name": "Gezinomi Seyahat Turizm Ticaret",
    "unit": "₺",
    "defaultPrice": 58.6,
    "defaultChange": 2.27,
    "defaultVol": 45166946
  },
  {
    "code": "TATGD",
    "symbol": "BIST:TATGD",
    "name": "Tat Gida Sanayi",
    "unit": "₺",
    "defaultPrice": 18.9,
    "defaultChange": 1.61,
    "defaultVol": 14553246
  },
  {
    "code": "MCARD",
    "symbol": "BIST:MCARD",
    "name": "Metropal Kurumsal Hizmetler",
    "unit": "₺",
    "defaultPrice": 154.2,
    "defaultChange": 0.06,
    "defaultVol": 118322286
  },
  {
    "code": "CUSAN",
    "symbol": "BIST:CUSAN",
    "name": "Cuhadaroglu Metal Sanayi ve Pazarlama AS",
    "unit": "₺",
    "defaultPrice": 25.62,
    "defaultChange": 0,
    "defaultVol": 19441788
  },
  {
    "code": "PENTA",
    "symbol": "BIST:PENTA",
    "name": "Penta Teknoloji Urunleri Dagitim Ticaret AS",
    "unit": "₺",
    "defaultPrice": 13,
    "defaultChange": -1.74,
    "defaultVol": 9792887
  },
  {
    "code": "MERIT",
    "symbol": "BIST:MERIT",
    "name": "Merit Turizm Yatirim ve Isletmeleri AS",
    "unit": "₺",
    "defaultPrice": 16.47,
    "defaultChange": 0.55,
    "defaultVol": 12334103
  },
  {
    "code": "BMSTL",
    "symbol": "BIST:BMSTL",
    "name": "BMS Birlesik Metal Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 46.96,
    "defaultChange": 1.87,
    "defaultVol": 35112415
  },
  {
    "code": "POLHO",
    "symbol": "BIST:POLHO",
    "name": "Polisan Holding AS",
    "unit": "₺",
    "defaultPrice": 22.68,
    "defaultChange": 1.61,
    "defaultVol": 16945952
  },
  {
    "code": "KOTON",
    "symbol": "BIST:KOTON",
    "name": "Koton Magazacilik Tekstil Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 12.5,
    "defaultChange": 0.32,
    "defaultVol": 9338925
  },
  {
    "code": "YIGIT",
    "symbol": "BIST:YIGIT",
    "name": "Yigit Aku Malzemeleri Nakliyat Turizm Insaat Sanayi Ve Ticaret",
    "unit": "₺",
    "defaultPrice": 21.06,
    "defaultChange": 0.38,
    "defaultVol": 15601016
  },
  {
    "code": "BIGEN",
    "symbol": "BIST:BIGEN",
    "name": "Birlesim Grup Enerji Yatirimlari AS",
    "unit": "₺",
    "defaultPrice": 137.5,
    "defaultChange": 3.85,
    "defaultVol": 100228425
  },
  {
    "code": "KLKIM",
    "symbol": "BIST:KLKIM",
    "name": "Kalekim Kimyevi Maddeler Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 26.44,
    "defaultChange": 0.76,
    "defaultVol": 19269816
  },
  {
    "code": "ESCAR",
    "symbol": "BIST:ESCAR",
    "name": "Escar Filo Kiralama Hizmetleri",
    "unit": "₺",
    "defaultPrice": 44.42,
    "defaultChange": -0.31,
    "defaultVol": 32259137
  },
  {
    "code": "IHYAY",
    "symbol": "BIST:IHYAY",
    "name": "Ihlas Yayin Holding",
    "unit": "₺",
    "defaultPrice": 1.27,
    "defaultChange": 0,
    "defaultVol": 921542
  },
  {
    "code": "MNDTR",
    "symbol": "BIST:MNDTR",
    "name": "Mondi Turkey Oluklu Mukavva Kagit ve Ambalaj Sanayi",
    "unit": "₺",
    "defaultPrice": 5.11,
    "defaultChange": 0.2,
    "defaultVol": 3666982
  },
  {
    "code": "SOKE",
    "symbol": "BIST:SOKE",
    "name": "Soke Degirmencilik Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 15.1,
    "defaultChange": 1.75,
    "defaultVol": 10782684
  },
  {
    "code": "TRILC",
    "symbol": "BIST:TRILC",
    "name": "Turk Ilac ve Serum Sanayi AS",
    "unit": "₺",
    "defaultPrice": 1.16,
    "defaultChange": 0,
    "defaultVol": 821754
  },
  {
    "code": "VSNMD",
    "symbol": "BIST:VSNMD",
    "name": "Visne Madencilik Uretim Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 48.82,
    "defaultChange": 0.91,
    "defaultVol": 34564316
  },
  {
    "code": "PETUN",
    "symbol": "BIST:PETUN",
    "name": "Pinar Entegre Et ve Un Sanayii",
    "unit": "₺",
    "defaultPrice": 11.08,
    "defaultChange": -0.27,
    "defaultVol": 7804331
  },
  {
    "code": "SUNTK",
    "symbol": "BIST:SUNTK",
    "name": "Sun Tekstil Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 39.5,
    "defaultChange": -0.95,
    "defaultVol": 27786275
  },
  {
    "code": "KRONT",
    "symbol": "BIST:KRONT",
    "name": "Kron Teknoloji AS",
    "unit": "₺",
    "defaultPrice": 28.94,
    "defaultChange": 2.99,
    "defaultVol": 20340363
  },
  {
    "code": "TNZTP",
    "symbol": "BIST:TNZTP",
    "name": "TAPDI OKSIJEN OZEL SAGLIK VE EGITIM HIZMETLERI SANAYI TICARET",
    "unit": "₺",
    "defaultPrice": 27.8,
    "defaultChange": -0.57,
    "defaultVol": 19402398
  },
  {
    "code": "ASGYO",
    "symbol": "BIST:ASGYO",
    "name": "ASCE GAYRIMENKUL YATIRIM ORTAKLIGI",
    "unit": "₺",
    "defaultPrice": 11.08,
    "defaultChange": 0.09,
    "defaultVol": 7657853
  },
  {
    "code": "LILAK",
    "symbol": "BIST:LILAK",
    "name": "Lila Kagit Sanayi Ve Ticaret",
    "unit": "₺",
    "defaultPrice": 29.6,
    "defaultChange": 1.65,
    "defaultVol": 20423349
  },
  {
    "code": "RGYAS",
    "symbol": "BIST:RGYAS",
    "name": "Ronesans Gayrimenkul Yatirim",
    "unit": "₺",
    "defaultPrice": 205.7,
    "defaultChange": -1.77,
    "defaultVol": 141791478
  },
  {
    "code": "BUCIM",
    "symbol": "BIST:BUCIM",
    "name": "Bursa Cimento Fabrikasi",
    "unit": "₺",
    "defaultPrice": 5.06,
    "defaultChange": -0.2,
    "defaultVol": 3472374
  },
  {
    "code": "BAHKM",
    "symbol": "BIST:BAHKM",
    "name": "Bahadir Kimya Sanayi Ve Ticaret",
    "unit": "₺",
    "defaultPrice": 125.7,
    "defaultChange": 3.97,
    "defaultVol": 85824063
  },
  {
    "code": "PNLSN",
    "symbol": "BIST:PNLSN",
    "name": "Panelsan Cati Cephe Sistemleri Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 43.1,
    "defaultChange": 2.42,
    "defaultVol": 29364418
  },
  {
    "code": "ARMGD",
    "symbol": "BIST:ARMGD",
    "name": "Armada Gida Ticaret ve Sanayi",
    "unit": "₺",
    "defaultPrice": 211.1,
    "defaultChange": -2.49,
    "defaultVol": 142666235
  },
  {
    "code": "BSOKE",
    "symbol": "BIST:BSOKE",
    "name": "Batisoke Soke Cimento Sanayii T.",
    "unit": "₺",
    "defaultPrice": 34.08,
    "defaultChange": 0.12,
    "defaultVol": 23022096
  },
  {
    "code": "EGEGY",
    "symbol": "BIST:EGEGY",
    "name": "Egeyapi Avrupa Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 28.9,
    "defaultChange": 0.7,
    "defaultVol": 19386033
  },
  {
    "code": "KZGYO",
    "symbol": "BIST:KZGYO",
    "name": "Kuzugrup Gayrimenkul Yatirim Ortakligi AS",
    "unit": "₺",
    "defaultPrice": 19.96,
    "defaultChange": 1.06,
    "defaultVol": 13384497
  },
  {
    "code": "NTHOL",
    "symbol": "BIST:NTHOL",
    "name": "Net Holding",
    "unit": "₺",
    "defaultPrice": 46.22,
    "defaultChange": -0.13,
    "defaultVol": 30942441
  },
  {
    "code": "RALYH",
    "symbol": "BIST:RALYH",
    "name": "Ral Yatirim Holding",
    "unit": "₺",
    "defaultPrice": 265.75,
    "defaultChange": -0.47,
    "defaultVol": 177290329
  },
  {
    "code": "SEKUR",
    "symbol": "BIST:SEKUR",
    "name": "Sekuro Plastik Ambalaj Sanayi",
    "unit": "₺",
    "defaultPrice": 11.06,
    "defaultChange": 0.55,
    "defaultVol": 7360917
  },
  {
    "code": "AKSUE",
    "symbol": "BIST:AKSUE",
    "name": "Aksu Enerji ve Ticaret",
    "unit": "₺",
    "defaultPrice": 46.26,
    "defaultChange": 0.96,
    "defaultVol": 30575131
  },
  {
    "code": "IDGYO",
    "symbol": "BIST:IDGYO",
    "name": "Idealist Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 3.29,
    "defaultChange": -4.36,
    "defaultVol": 2170452
  },
  {
    "code": "ANSGR",
    "symbol": "BIST:ANSGR",
    "name": "Anadolu Anonim Turk Sigorta Sirketi",
    "unit": "₺",
    "defaultPrice": 28.82,
    "defaultChange": 0.49,
    "defaultVol": 18844822
  },
  {
    "code": "GOZDE",
    "symbol": "BIST:GOZDE",
    "name": "Gozde Girisim Sermayesi Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 22.4,
    "defaultChange": -1.41,
    "defaultVol": 14619046
  },
  {
    "code": "ORCAY",
    "symbol": "BIST:ORCAY",
    "name": "ORCAY ORTAKOY CAY SANAYI VE TICARET",
    "unit": "₺",
    "defaultPrice": 3.69,
    "defaultChange": 3.65,
    "defaultVol": 2386500
  },
  {
    "code": "BLCYT",
    "symbol": "BIST:BLCYT",
    "name": "Bilici Yatirim Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 19.51,
    "defaultChange": 0.41,
    "defaultVol": 12482225
  },
  {
    "code": "GMTAS",
    "symbol": "BIST:GMTAS",
    "name": "Gimat Magazacilik Insaat Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 46.62,
    "defaultChange": -1.6,
    "defaultVol": 29376567
  },
  {
    "code": "BLUME",
    "symbol": "BIST:BLUME",
    "name": "Blume Metal Kimya",
    "unit": "₺",
    "defaultPrice": 38.72,
    "defaultChange": -1.22,
    "defaultVol": 24332229
  },
  {
    "code": "LYDHO",
    "symbol": "BIST:LYDHO",
    "name": "Lydia Holding",
    "unit": "₺",
    "defaultPrice": 184,
    "defaultChange": 2.45,
    "defaultVol": 111563800
  },
  {
    "code": "ICBCT",
    "symbol": "BIST:ICBCT",
    "name": "ICBC Turkey Bank",
    "unit": "₺",
    "defaultPrice": 21.76,
    "defaultChange": -0.27,
    "defaultVol": 13154203
  },
  {
    "code": "EUYO",
    "symbol": "BIST:EUYO",
    "name": "Euro Menkul Kiymet Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 5.4,
    "defaultChange": -3.57,
    "defaultVol": 3221300
  },
  {
    "code": "ISFIN",
    "symbol": "BIST:ISFIN",
    "name": "Is Finansal Kiralama",
    "unit": "₺",
    "defaultPrice": 20.76,
    "defaultChange": 0.39,
    "defaultVol": 12227287
  },
  {
    "code": "SKYMD",
    "symbol": "BIST:SKYMD",
    "name": "Seker Yatirim Menkul Degerler",
    "unit": "₺",
    "defaultPrice": 14.09,
    "defaultChange": 0.93,
    "defaultVol": 8190306
  },
  {
    "code": "KRTEK",
    "symbol": "BIST:KRTEK",
    "name": "Karsu Tekstil Sanayii ve Ticaret",
    "unit": "₺",
    "defaultPrice": 6.23,
    "defaultChange": 0.16,
    "defaultVol": 3617530
  },
  {
    "code": "BULGS",
    "symbol": "BIST:BULGS",
    "name": "Bulls Girisim Sermayesi Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 35.5,
    "defaultChange": 0.11,
    "defaultVol": 20551483
  },
  {
    "code": "ELITE",
    "symbol": "BIST:ELITE",
    "name": "Elite Naturel Organik Gida Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 28.46,
    "defaultChange": 2.3,
    "defaultVol": 16069284
  },
  {
    "code": "KLYPV",
    "symbol": "BIST:KLYPV",
    "name": "Kalyon Gunes Teknolojileri Uretim",
    "unit": "₺",
    "defaultPrice": 58.65,
    "defaultChange": 0.69,
    "defaultVol": 32941007
  },
  {
    "code": "AYGAZ",
    "symbol": "BIST:AYGAZ",
    "name": "Aygaz",
    "unit": "₺",
    "defaultPrice": 309.5,
    "defaultChange": -0.8,
    "defaultVol": 173503224
  },
  {
    "code": "OFSYM",
    "symbol": "BIST:OFSYM",
    "name": "Ofis Yem Gida Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 63,
    "defaultChange": 4.65,
    "defaultVol": 35286867
  },
  {
    "code": "SILVR",
    "symbol": "BIST:SILVR",
    "name": "Silverline Endustri ve Ticaret",
    "unit": "₺",
    "defaultPrice": 2.27,
    "defaultChange": 0,
    "defaultVol": 1261226
  },
  {
    "code": "OYYAT",
    "symbol": "BIST:OYYAT",
    "name": "Oyak Yatirim Menkul Degerler",
    "unit": "₺",
    "defaultPrice": 35.12,
    "defaultChange": 1.33,
    "defaultVol": 18794889
  },
  {
    "code": "SEYKM",
    "symbol": "BIST:SEYKM",
    "name": "Seyitler Kimya Sanayi AS",
    "unit": "₺",
    "defaultPrice": 4.79,
    "defaultChange": 0.63,
    "defaultVol": 2545047
  },
  {
    "code": "KMPUR",
    "symbol": "BIST:KMPUR",
    "name": "Kimteks Poliuretan Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 21.48,
    "defaultChange": 1.8,
    "defaultVol": 11389834
  },
  {
    "code": "BAGFS",
    "symbol": "BIST:BAGFS",
    "name": "Bagfas Bandirma Gubre Fabrikalari",
    "unit": "₺",
    "defaultPrice": 25.16,
    "defaultChange": 1.29,
    "defaultVol": 13082017
  },
  {
    "code": "BEYAZ",
    "symbol": "BIST:BEYAZ",
    "name": "Beyaz Filo Oto Kiralama AS",
    "unit": "₺",
    "defaultPrice": 23.48,
    "defaultChange": -0.09,
    "defaultVol": 12042328
  },
  {
    "code": "GLYHO",
    "symbol": "BIST:GLYHO",
    "name": "Global Yatirim Holding",
    "unit": "₺",
    "defaultPrice": 17.11,
    "defaultChange": -0.12,
    "defaultVol": 8581041
  },
  {
    "code": "CRFSA",
    "symbol": "BIST:CRFSA",
    "name": "CarrefourSA Carrefour Sabanci Ticaret Merkezi",
    "unit": "₺",
    "defaultPrice": 304.5,
    "defaultChange": -9.98,
    "defaultVol": 151331019
  },
  {
    "code": "KONTR",
    "symbol": "BIST:KONTR",
    "name": "Kontrolmatik",
    "unit": "₺",
    "defaultPrice": 4.19,
    "defaultChange": -0.48,
    "defaultVol": 2006888
  },
  {
    "code": "PENGD",
    "symbol": "BIST:PENGD",
    "name": "Penguen Gida Sanayi",
    "unit": "₺",
    "defaultPrice": 9.6,
    "defaultChange": 0.21,
    "defaultVol": 4533792
  },
  {
    "code": "ARENA",
    "symbol": "BIST:ARENA",
    "name": "Arena Bilgisayar AS",
    "unit": "₺",
    "defaultPrice": 20.82,
    "defaultChange": -1.98,
    "defaultVol": 9827623
  },
  {
    "code": "ALFAS",
    "symbol": "BIST:ALFAS",
    "name": "Alfa Solar Enerji",
    "unit": "₺",
    "defaultPrice": 41.1,
    "defaultChange": -0.72,
    "defaultVol": 19345606
  },
  {
    "code": "SEGMN",
    "symbol": "BIST:SEGMN",
    "name": "Segmen Kardesler Gida Uretim ve Ambalaj Sanayi AS",
    "unit": "₺",
    "defaultPrice": 56.7,
    "defaultChange": 3.09,
    "defaultVol": 26592300
  },
  {
    "code": "ATLAS",
    "symbol": "BIST:ATLAS",
    "name": "Atlas Menkul Kiymetler Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 6.38,
    "defaultChange": 0.79,
    "defaultVol": 2968901
  },
  {
    "code": "ISDMR",
    "symbol": "BIST:ISDMR",
    "name": "Iskenderun Demir ve Celik AS",
    "unit": "₺",
    "defaultPrice": 51,
    "defaultChange": -0.2,
    "defaultVol": 23440875
  },
  {
    "code": "PCILT",
    "symbol": "BIST:PCILT",
    "name": "PC Iletisim ve Medya Hizmetleri Sanayi Ticaret AS",
    "unit": "₺",
    "defaultPrice": 31.06,
    "defaultChange": 2.64,
    "defaultVol": 14261603
  },
  {
    "code": "AFYON",
    "symbol": "BIST:AFYON",
    "name": "Afyon Cimento Sanayii T.",
    "unit": "₺",
    "defaultPrice": 12.53,
    "defaultChange": -0.16,
    "defaultVol": 5727902
  },
  {
    "code": "ALCTL",
    "symbol": "BIST:ALCTL",
    "name": "Alcatel Lucent Teletas Telekomunikasyon",
    "unit": "₺",
    "defaultPrice": 131.2,
    "defaultChange": 3.06,
    "defaultVol": 58708720
  },
  {
    "code": "AYEN",
    "symbol": "BIST:AYEN",
    "name": "Ayen Enerji",
    "unit": "₺",
    "defaultPrice": 32.7,
    "defaultChange": -2.15,
    "defaultVol": 14520173
  },
  {
    "code": "DGATE",
    "symbol": "BIST:DGATE",
    "name": "Datagate Bilgisayar Malzemeleri Ticaret",
    "unit": "₺",
    "defaultPrice": 106.8,
    "defaultChange": -3.44,
    "defaultVol": 47110121
  },
  {
    "code": "IEYHO",
    "symbol": "BIST:IEYHO",
    "name": "Isiklar Enerji ve Yapi Holding",
    "unit": "₺",
    "defaultPrice": 181.3,
    "defaultChange": 1.51,
    "defaultVol": 79902173
  },
  {
    "code": "MTRKS",
    "symbol": "BIST:MTRKS",
    "name": "Matriks Finansal Teknolojiler",
    "unit": "₺",
    "defaultPrice": 31.96,
    "defaultChange": -1.66,
    "defaultVol": 14054794
  },
  {
    "code": "AVHOL",
    "symbol": "BIST:AVHOL",
    "name": "Avrupa Yatirim Holding AS",
    "unit": "₺",
    "defaultPrice": 38.5,
    "defaultChange": 0.05,
    "defaultVol": 16886601
  },
  {
    "code": "HUBVC",
    "symbol": "BIST:HUBVC",
    "name": "Hub Girisim Sermayesi Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 2.67,
    "defaultChange": -0.74,
    "defaultVol": 1167775
  },
  {
    "code": "DURDO",
    "symbol": "BIST:DURDO",
    "name": "Duran Dogan Basim ve Ambalaj Sanayi",
    "unit": "₺",
    "defaultPrice": 5.18,
    "defaultChange": 0.58,
    "defaultVol": 2214232
  },
  {
    "code": "NETAS",
    "symbol": "BIST:NETAS",
    "name": "Netas Telekomunikasyon",
    "unit": "₺",
    "defaultPrice": 68.3,
    "defaultChange": 9.98,
    "defaultVol": 29115675
  },
  {
    "code": "DITAS",
    "symbol": "BIST:DITAS",
    "name": "Ditas Dogan Yedek Parca Imalat ve Teknik",
    "unit": "₺",
    "defaultPrice": 24.9,
    "defaultChange": -0.8,
    "defaultVol": 10476077
  },
  {
    "code": "DZGYO",
    "symbol": "BIST:DZGYO",
    "name": "Deniz Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 7.35,
    "defaultChange": -0.14,
    "defaultVol": 3069220
  },
  {
    "code": "PNSUT",
    "symbol": "BIST:PNSUT",
    "name": "Pinar Sut Mamulleri Sanayii",
    "unit": "₺",
    "defaultPrice": 10.48,
    "defaultChange": 0.87,
    "defaultVol": 4373032
  },
  {
    "code": "SAMAT",
    "symbol": "BIST:SAMAT",
    "name": "Saray Matbaacilik Kagitcilik Kirtasiyecilik Ticaret Ve Sanayi",
    "unit": "₺",
    "defaultPrice": 5.43,
    "defaultChange": 0.18,
    "defaultVol": 2252782
  },
  {
    "code": "DURKN",
    "symbol": "BIST:DURKN",
    "name": "Durukan Sekerleme Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 21.08,
    "defaultChange": 2.33,
    "defaultVol": 8715400
  },
  {
    "code": "MARBL",
    "symbol": "BIST:MARBL",
    "name": "Tureks Turunc Madencilik Ic ve Dis Ticaret",
    "unit": "₺",
    "defaultPrice": 12.29,
    "defaultChange": 0.16,
    "defaultVol": 5070215
  },
  {
    "code": "CEMTS",
    "symbol": "BIST:CEMTS",
    "name": "Cemtas Celik Makina Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 8.88,
    "defaultChange": -0.11,
    "defaultVol": 3588621
  },
  {
    "code": "TSGYO",
    "symbol": "BIST:TSGYO",
    "name": "TSKB Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 5.75,
    "defaultChange": -1.2,
    "defaultVol": 2322264
  },
  {
    "code": "GLBMD",
    "symbol": "BIST:GLBMD",
    "name": "Global Menkul Degerler",
    "unit": "₺",
    "defaultPrice": 12.99,
    "defaultChange": 2.53,
    "defaultVol": 5162096
  },
  {
    "code": "MAKIM",
    "symbol": "BIST:MAKIM",
    "name": "MAKIM MAKINA TEKNOLOJILERI SANAYIVE TICARET",
    "unit": "₺",
    "defaultPrice": 16.02,
    "defaultChange": 0.69,
    "defaultVol": 6309028
  },
  {
    "code": "TGSAS",
    "symbol": "BIST:TGSAS",
    "name": "TGS Dis Ticaret AS",
    "unit": "₺",
    "defaultPrice": 212.1,
    "defaultChange": 6.05,
    "defaultVol": 80689627
  },
  {
    "code": "UNLU",
    "symbol": "BIST:UNLU",
    "name": "Unlu Yatirim Holding",
    "unit": "₺",
    "defaultPrice": 11.03,
    "defaultChange": 0.18,
    "defaultVol": 4172561
  },
  {
    "code": "ULAS",
    "symbol": "BIST:ULAS",
    "name": "Ulaslar Turizm Energi Tarim Gida ve Insaat Yatirimlari",
    "unit": "₺",
    "defaultPrice": 23.84,
    "defaultChange": 2.85,
    "defaultVol": 8967607
  },
  {
    "code": "ALKIM",
    "symbol": "BIST:ALKIM",
    "name": "Alkim Alkali Kimya",
    "unit": "₺",
    "defaultPrice": 15.57,
    "defaultChange": -0.89,
    "defaultVol": 5851190
  },
  {
    "code": "TRGYO",
    "symbol": "BIST:TRGYO",
    "name": "Torunlar Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 92.55,
    "defaultChange": -0.96,
    "defaultVol": 34656736
  },
  {
    "code": "IHAAS",
    "symbol": "BIST:IHAAS",
    "name": "Ihlas Haber Ajansi SA",
    "unit": "₺",
    "defaultPrice": 57.3,
    "defaultChange": -1.21,
    "defaultVol": 21192004
  },
  {
    "code": "AHSGY",
    "symbol": "BIST:AHSGY",
    "name": "Ahes Gayrimenkul Yatirim Ortakligi AS",
    "unit": "₺",
    "defaultPrice": 19.15,
    "defaultChange": 1.11,
    "defaultVol": 6853268
  },
  {
    "code": "DOAS",
    "symbol": "BIST:DOAS",
    "name": "Doğuş Otomotiv",
    "unit": "₺",
    "defaultPrice": 172.5,
    "defaultChange": 0.76,
    "defaultVol": 60850928
  },
  {
    "code": "KLMSN",
    "symbol": "BIST:KLMSN",
    "name": "Klimasan Klima Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 29.94,
    "defaultChange": 2.25,
    "defaultVol": 10356845
  },
  {
    "code": "ARTMS",
    "symbol": "BIST:ARTMS",
    "name": "Artemis Hali A. S.",
    "unit": "₺",
    "defaultPrice": 36.5,
    "defaultChange": -0.98,
    "defaultVol": 12480409
  },
  {
    "code": "KIMMR",
    "symbol": "BIST:KIMMR",
    "name": "Ersan Alisveris Hizmetleri ve Gida Sanayi Ticaret",
    "unit": "₺",
    "defaultPrice": 13.75,
    "defaultChange": -0.51,
    "defaultVol": 4698788
  },
  {
    "code": "OYLUM",
    "symbol": "BIST:OYLUM",
    "name": "Oylum Sinai Yatirimlar",
    "unit": "₺",
    "defaultPrice": 7.27,
    "defaultChange": -1.36,
    "defaultVol": 2480539
  },
  {
    "code": "BVSAN",
    "symbol": "BIST:BVSAN",
    "name": "BULBULOGLU VINC SANAYI VE TICARET",
    "unit": "₺",
    "defaultPrice": 113.2,
    "defaultChange": 1.25,
    "defaultVol": 38470228
  },
  {
    "code": "BRISA",
    "symbol": "BIST:BRISA",
    "name": "Brisa Bridgestone Sabanci Lastik Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 79.45,
    "defaultChange": -2.46,
    "defaultVol": 26301923
  },
  {
    "code": "YATAS",
    "symbol": "BIST:YATAS",
    "name": "Yatas Yatak ve Yorgan Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 33.9,
    "defaultChange": -3.2,
    "defaultVol": 11057434
  },
  {
    "code": "MSGYO",
    "symbol": "BIST:MSGYO",
    "name": "Mistral Gayrimenkul Yatirim Ortakligi AS",
    "unit": "₺",
    "defaultPrice": 6,
    "defaultChange": 0.33,
    "defaultVol": 1941552
  },
  {
    "code": "SEKFK",
    "symbol": "BIST:SEKFK",
    "name": "Seker Finansal Kiralama",
    "unit": "₺",
    "defaultPrice": 4.75,
    "defaultChange": -2.86,
    "defaultVol": 1534701
  },
  {
    "code": "ARCLK",
    "symbol": "BIST:ARCLK",
    "name": "Arçelik",
    "unit": "₺",
    "defaultPrice": 94.9,
    "defaultChange": -0.47,
    "defaultVol": 29901377
  },
  {
    "code": "SDTTR",
    "symbol": "BIST:SDTTR",
    "name": "SDT Uzay ve Savunma",
    "unit": "₺",
    "defaultPrice": 249.2,
    "defaultChange": -1.79,
    "defaultVol": 78457879
  },
  {
    "code": "ASUZU",
    "symbol": "BIST:ASUZU",
    "name": "Anadolu Isuzu Otomotiv Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 47.26,
    "defaultChange": 0.51,
    "defaultVol": 14598378
  },
  {
    "code": "GARFA",
    "symbol": "BIST:GARFA",
    "name": "Garanti Faktoring",
    "unit": "₺",
    "defaultPrice": 26.52,
    "defaultChange": 0.45,
    "defaultVol": 8002781
  },
  {
    "code": "ECZYT",
    "symbol": "BIST:ECZYT",
    "name": "Eczacibasi Yatirim Holding Ortakligi AS",
    "unit": "₺",
    "defaultPrice": 330,
    "defaultChange": 2.17,
    "defaultVol": 99318120
  },
  {
    "code": "MACKO",
    "symbol": "BIST:MACKO",
    "name": "Mackolik Internet Hizmetleri Ticaret AS",
    "unit": "₺",
    "defaultPrice": 33.74,
    "defaultChange": -0.24,
    "defaultVol": 10133134
  },
  {
    "code": "ISSEN",
    "symbol": "BIST:ISSEN",
    "name": "Isbir Sentetik Dokuma Sanayi AS",
    "unit": "₺",
    "defaultPrice": 6.93,
    "defaultChange": -0.14,
    "defaultVol": 2072701
  },
  {
    "code": "BRKSN",
    "symbol": "BIST:BRKSN",
    "name": "Berkosan Yalitim ve Tecrit Maddeleri Uretim ve Ticaret",
    "unit": "₺",
    "defaultPrice": 8.05,
    "defaultChange": -1.83,
    "defaultVol": 2404801
  },
  {
    "code": "ANELE",
    "symbol": "BIST:ANELE",
    "name": "Anel Elektrik Proje Taahhut ve Ticaret",
    "unit": "₺",
    "defaultPrice": 138.2,
    "defaultChange": -0.43,
    "defaultVol": 41190234
  },
  {
    "code": "ETYAT",
    "symbol": "BIST:ETYAT",
    "name": "Euro Trend Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 16.03,
    "defaultChange": -0.62,
    "defaultVol": 4772163
  },
  {
    "code": "OTKAR",
    "symbol": "BIST:OTKAR",
    "name": "Otokar Otomotiv ve Savunma Sanayi",
    "unit": "₺",
    "defaultPrice": 320,
    "defaultChange": 2.65,
    "defaultVol": 94377280
  },
  {
    "code": "EUKYO",
    "symbol": "BIST:EUKYO",
    "name": "Euro Kapital Yatirim Ortakligi AS",
    "unit": "₺",
    "defaultPrice": 13.05,
    "defaultChange": 0.38,
    "defaultVol": 3842181
  },
  {
    "code": "DEVA",
    "symbol": "BIST:DEVA",
    "name": "Deva Holding",
    "unit": "₺",
    "defaultPrice": 79.8,
    "defaultChange": 9.99,
    "defaultVol": 22519879
  },
  {
    "code": "SANEL",
    "symbol": "BIST:SANEL",
    "name": "San-El Muhendislik Elektrik Taahhut Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 59.45,
    "defaultChange": -1.65,
    "defaultVol": 16705509
  },
  {
    "code": "FLAP",
    "symbol": "BIST:FLAP",
    "name": "Flap Kongre Toplanti Hizmetleri Otomotiv ve Turizm",
    "unit": "₺",
    "defaultPrice": 10.71,
    "defaultChange": 0.37,
    "defaultVol": 2977776
  },
  {
    "code": "TRCAS",
    "symbol": "BIST:TRCAS",
    "name": "Turcas Holding",
    "unit": "₺",
    "defaultPrice": 46.52,
    "defaultChange": -0.09,
    "defaultVol": 12917534
  },
  {
    "code": "DNISI",
    "symbol": "BIST:DNISI",
    "name": "Dinamik Isi Makina Yalitim Malzemeleri Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 19.37,
    "defaultChange": 0.47,
    "defaultVol": 5369596
  },
  {
    "code": "KRDMB",
    "symbol": "BIST:KRDMB",
    "name": "Kardemir Karabiik Demir celik Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 132.3,
    "defaultChange": 0.92,
    "defaultVol": 35406920
  },
  {
    "code": "BINBN",
    "symbol": "BIST:BINBN",
    "name": "Bin Ulasim Ve Akilli Sehir Teknolojileri AS",
    "unit": "₺",
    "defaultPrice": 183.2,
    "defaultChange": 2.92,
    "defaultVol": 49025786
  },
  {
    "code": "PKART",
    "symbol": "BIST:PKART",
    "name": "Plastikkart Akilli Kart Iletisim Sistemleri Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 127.4,
    "defaultChange": -3.99,
    "defaultVol": 32808685
  },
  {
    "code": "MEPET",
    "symbol": "BIST:MEPET",
    "name": "Mepet Metro Petrol Ve Tesisleri Sanayi Ticaret",
    "unit": "₺",
    "defaultPrice": 20.4,
    "defaultChange": 4.08,
    "defaultVol": 5253469
  },
  {
    "code": "ZEDUR",
    "symbol": "BIST:ZEDUR",
    "name": "Zedur Enerji ElekTrik Uretim",
    "unit": "₺",
    "defaultPrice": 7.94,
    "defaultChange": 0.25,
    "defaultVol": 2032727
  },
  {
    "code": "ADGYO",
    "symbol": "BIST:ADGYO",
    "name": "Adra Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 55.45,
    "defaultChange": 1.19,
    "defaultVol": 14076426
  },
  {
    "code": "KARTN",
    "symbol": "BIST:KARTN",
    "name": "Kartonsan Karton Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 189,
    "defaultChange": 2.44,
    "defaultVol": 47291580
  },
  {
    "code": "GLCVY",
    "symbol": "BIST:GLCVY",
    "name": "GELECEK VARLIK YONETIMI A.S",
    "unit": "₺",
    "defaultPrice": 49.96,
    "defaultChange": 1.09,
    "defaultVol": 12414510
  },
  {
    "code": "MEDTR",
    "symbol": "BIST:MEDTR",
    "name": "Meditera Tibbi Malzeme Sanayi Ve Ticaret",
    "unit": "₺",
    "defaultPrice": 25.42,
    "defaultChange": 1.19,
    "defaultVol": 6276834
  },
  {
    "code": "ERCB",
    "symbol": "BIST:ERCB",
    "name": "Erciyas Celik Boru Sanayi",
    "unit": "₺",
    "defaultPrice": 48.62,
    "defaultChange": 1.08,
    "defaultVol": 11964458
  },
  {
    "code": "EGPRO",
    "symbol": "BIST:EGPRO",
    "name": "Ege Profil Ticaret ve Sanayi",
    "unit": "₺",
    "defaultPrice": 35.82,
    "defaultChange": 1.19,
    "defaultVol": 8774682
  },
  {
    "code": "TMPOL",
    "symbol": "BIST:TMPOL",
    "name": "Temapol Polimer Plastik Ve Insaat Sanayi Ticaret A..S",
    "unit": "₺",
    "defaultPrice": 569.5,
    "defaultChange": -2.23,
    "defaultVol": 139080443
  },
  {
    "code": "IHEVA",
    "symbol": "BIST:IHEVA",
    "name": "Ihlas Ev Aletleri Imalat, Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 2.01,
    "defaultChange": 0,
    "defaultVol": 480330
  },
  {
    "code": "NUGYO",
    "symbol": "BIST:NUGYO",
    "name": "Nurol Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 8.89,
    "defaultChange": 0.11,
    "defaultVol": 2084243
  },
  {
    "code": "TDGYO",
    "symbol": "BIST:TDGYO",
    "name": "Trend Gayrimenkul Yatirim Ortakligi AS",
    "unit": "₺",
    "defaultPrice": 16.7,
    "defaultChange": 0.36,
    "defaultVol": 3768188
  },
  {
    "code": "EUHOL",
    "symbol": "BIST:EUHOL",
    "name": "Euro Yatirim Holding",
    "unit": "₺",
    "defaultPrice": 11.5,
    "defaultChange": -2.54,
    "defaultVol": 2572918
  },
  {
    "code": "HTTBT",
    "symbol": "BIST:HTTBT",
    "name": "Hitit Bilgisayar Hizmetleri",
    "unit": "₺",
    "defaultPrice": 37.26,
    "defaultChange": 0.22,
    "defaultVol": 8136615
  },
  {
    "code": "ANHYT",
    "symbol": "BIST:ANHYT",
    "name": "Anadolu Hayat Emeklilik",
    "unit": "₺",
    "defaultPrice": 107.2,
    "defaultChange": 0,
    "defaultVol": 22628098
  },
  {
    "code": "LOGO",
    "symbol": "BIST:LOGO",
    "name": "Logo Yazilim Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 137,
    "defaultChange": 0.37,
    "defaultVol": 28493397
  },
  {
    "code": "ONRYT",
    "symbol": "BIST:ONRYT",
    "name": "Onur Yuksek Teknoloji AS",
    "unit": "₺",
    "defaultPrice": 59.05,
    "defaultChange": 0.34,
    "defaultVol": 12002798
  },
  {
    "code": "AVPGY",
    "symbol": "BIST:AVPGY",
    "name": "Avrupakent Gayrimenkul Yatirim Ortakligi SA",
    "unit": "₺",
    "defaultPrice": 51.25,
    "defaultChange": -0.29,
    "defaultVol": 10136328
  },
  {
    "code": "ALKLC",
    "symbol": "BIST:ALKLC",
    "name": "Altinkilic Gida ve Sut Sanayi Ticaret AS",
    "unit": "₺",
    "defaultPrice": 430.75,
    "defaultChange": 1.23,
    "defaultVol": 81093426
  },
  {
    "code": "PSDTC",
    "symbol": "BIST:PSDTC",
    "name": "Pergamon Status Dis Ticaret",
    "unit": "₺",
    "defaultPrice": 152.2,
    "defaultChange": 2.77,
    "defaultVol": 27825965
  },
  {
    "code": "DERIM",
    "symbol": "BIST:DERIM",
    "name": "Derimod Konfeksiyon Ayakkabi Deri Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 36.52,
    "defaultChange": -1.24,
    "defaultVol": 6589194
  },
  {
    "code": "MPARK",
    "symbol": "BIST:MPARK",
    "name": "MLP Sağlık (Medical Park)",
    "unit": "₺",
    "defaultPrice": 440.5,
    "defaultChange": 0.51,
    "defaultVol": 77540334
  },
  {
    "code": "RODRG",
    "symbol": "BIST:RODRG",
    "name": "Rodrigo Tekstil Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 25.44,
    "defaultChange": 1.76,
    "defaultVol": 4476346
  },
  {
    "code": "ISYAT",
    "symbol": "BIST:ISYAT",
    "name": "Is Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 7.46,
    "defaultChange": 0.4,
    "defaultVol": 1308201
  },
  {
    "code": "DUNYH",
    "symbol": "BIST:DUNYH",
    "name": "Dunya Holding",
    "unit": "₺",
    "defaultPrice": 150.8,
    "defaultChange": 1.89,
    "defaultVol": 26082971
  },
  {
    "code": "TMSN",
    "symbol": "BIST:TMSN",
    "name": "Tumosan Motor Ve Traktor Sanayi AS",
    "unit": "₺",
    "defaultPrice": 77.7,
    "defaultChange": 0.19,
    "defaultVol": 13257873
  },
  {
    "code": "GUNDG",
    "symbol": "BIST:GUNDG",
    "name": "Gundogdu Gida Sut Urunleri Sanayi Ve Dis Ticaret AS",
    "unit": "₺",
    "defaultPrice": 1641,
    "defaultChange": 8.17,
    "defaultVol": 278499033
  },
  {
    "code": "PRKAB",
    "symbol": "BIST:PRKAB",
    "name": "Turk Prysmian Kablo ve Sistemleri",
    "unit": "₺",
    "defaultPrice": 33.62,
    "defaultChange": 1.14,
    "defaultVol": 5641066
  },
  {
    "code": "GMSTR",
    "symbol": "BIST:GMSTR",
    "name": "Istanbul Silver B Tipi Gumus Borsa Yatirim Fonu",
    "unit": "₺",
    "defaultPrice": 611,
    "defaultChange": 0.41,
    "defaultVol": 101015408
  },
  {
    "code": "DSTKF",
    "symbol": "BIST:DSTKF",
    "name": "Destek Finans Faktoring",
    "unit": "₺",
    "defaultPrice": 1915,
    "defaultChange": 0.26,
    "defaultVol": 305419520
  },
  {
    "code": "MTRYO",
    "symbol": "BIST:MTRYO",
    "name": "Metro Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 8.49,
    "defaultChange": -1.05,
    "defaultVol": 1281285
  },
  {
    "code": "DOGUB",
    "symbol": "BIST:DOGUB",
    "name": "Dogusan Boru Sanayii ve Ticaret",
    "unit": "₺",
    "defaultPrice": 77.15,
    "defaultChange": 0.19,
    "defaultVol": 11642475
  },
  {
    "code": "DESPC",
    "symbol": "BIST:DESPC",
    "name": "Despec Bilgisayar Pazarlama ve Ticaret",
    "unit": "₺",
    "defaultPrice": 39.72,
    "defaultChange": 0,
    "defaultVol": 5922173
  },
  {
    "code": "ZRGYO",
    "symbol": "BIST:ZRGYO",
    "name": "Ziraat Gayrimenkul Yatirim Ortakligi AS",
    "unit": "₺",
    "defaultPrice": 19.72,
    "defaultChange": 0.97,
    "defaultVol": 2939838
  },
  {
    "code": "DOKTA",
    "symbol": "BIST:DOKTA",
    "name": "Doktas Dokumculuk Ticaret ve Sanayi",
    "unit": "₺",
    "defaultPrice": 21.94,
    "defaultChange": 1.95,
    "defaultVol": 3191173
  },
  {
    "code": "TABGD",
    "symbol": "BIST:TABGD",
    "name": "TAB Gıda",
    "unit": "₺",
    "defaultPrice": 260,
    "defaultChange": -0.76,
    "defaultVol": 36507120
  },
  {
    "code": "AVTUR",
    "symbol": "BIST:AVTUR",
    "name": "Avrasya Petrol ve Turistik Tesisler Yatirimlar AS",
    "unit": "₺",
    "defaultPrice": 13,
    "defaultChange": 0,
    "defaultVol": 1818297
  },
  {
    "code": "BYDNR",
    "symbol": "BIST:BYDNR",
    "name": "Baydoner Restoranlari",
    "unit": "₺",
    "defaultPrice": 39.36,
    "defaultChange": 1.5,
    "defaultVol": 5390509
  },
  {
    "code": "GEDZA",
    "symbol": "BIST:GEDZA",
    "name": "Gediz Ambalaj Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 28.04,
    "defaultChange": -0.07,
    "defaultVol": 3744602
  },
  {
    "code": "AKYHO",
    "symbol": "BIST:AKYHO",
    "name": "Akdeniz Yatirim Holding",
    "unit": "₺",
    "defaultPrice": 2.26,
    "defaultChange": 0.89,
    "defaultVol": 301226
  },
  {
    "code": "ODINE",
    "symbol": "BIST:ODINE",
    "name": "Odine Solutions Teknoloji Ticaret ve Sanayi AS",
    "unit": "₺",
    "defaultPrice": 3197.5,
    "defaultChange": -1.92,
    "defaultVol": 413497503
  },
  {
    "code": "IZINV",
    "symbol": "BIST:IZINV",
    "name": "Iz Yatirim Holding AS",
    "unit": "₺",
    "defaultPrice": 55.6,
    "defaultChange": 1.28,
    "defaultVol": 7004043
  },
  {
    "code": "KTSKR",
    "symbol": "BIST:KTSKR",
    "name": "Kutahya Seker Fabrikasi AS",
    "unit": "₺",
    "defaultPrice": 85.7,
    "defaultChange": -0.46,
    "defaultVol": 10048411
  },
  {
    "code": "GRTHO",
    "symbol": "BIST:GRTHO",
    "name": "Grainturk Holding",
    "unit": "₺",
    "defaultPrice": 227,
    "defaultChange": 0.53,
    "defaultVol": 26535846
  },
  {
    "code": "DGGYO",
    "symbol": "BIST:DGGYO",
    "name": "Dogus Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 36.02,
    "defaultChange": -1.15,
    "defaultVol": 4164056
  },
  {
    "code": "TBORG",
    "symbol": "BIST:TBORG",
    "name": "Turk Tuborg Bira ve Malt Sanayii",
    "unit": "₺",
    "defaultPrice": 133.7,
    "defaultChange": -2.62,
    "defaultVol": 15336326
  },
  {
    "code": "ATAKP",
    "symbol": "BIST:ATAKP",
    "name": "Atakey Patates Gida Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 45.28,
    "defaultChange": 1.3,
    "defaultVol": 5172516
  },
  {
    "code": "OBASE",
    "symbol": "BIST:OBASE",
    "name": "Obase Bilgisayar ve Danismanlik Hizmetleri Ticaret",
    "unit": "₺",
    "defaultPrice": 39.26,
    "defaultChange": -1.36,
    "defaultVol": 4327905
  },
  {
    "code": "MARKA",
    "symbol": "BIST:MARKA",
    "name": "Marka Yatirim Holding",
    "unit": "₺",
    "defaultPrice": 84.9,
    "defaultChange": -1.22,
    "defaultVol": 9284155
  },
  {
    "code": "KERVN",
    "symbol": "BIST:KERVN",
    "name": "Kervansaray Yatirim Holding",
    "unit": "₺",
    "defaultPrice": 10.91,
    "defaultChange": 0.09,
    "defaultVol": 1152303
  },
  {
    "code": "VANGD",
    "symbol": "BIST:VANGD",
    "name": "Vanet Gida Sanayi Ic ve Dis Ticaret AS",
    "unit": "₺",
    "defaultPrice": 102.4,
    "defaultChange": 2.4,
    "defaultVol": 10490573
  },
  {
    "code": "MZHLD",
    "symbol": "BIST:MZHLD",
    "name": "Mazhar Zorlu Holding",
    "unit": "₺",
    "defaultPrice": 5.28,
    "defaultChange": 0.38,
    "defaultVol": 528644
  },
  {
    "code": "PAMEL",
    "symbol": "BIST:PAMEL",
    "name": "Pamel Yenilenebilir Elektrik Uretim AS",
    "unit": "₺",
    "defaultPrice": 79.6,
    "defaultChange": -0.44,
    "defaultVol": 7734891
  },
  {
    "code": "PARSN",
    "symbol": "BIST:PARSN",
    "name": "Parsan Makina Parcalari Sanayii",
    "unit": "₺",
    "defaultPrice": 71.7,
    "defaultChange": 1.06,
    "defaultVol": 6920269
  },
  {
    "code": "GRSEL",
    "symbol": "BIST:GRSEL",
    "name": "Gur-Sel Turizm Tasimacilik Ve Servis Ticaret",
    "unit": "₺",
    "defaultPrice": 351.5,
    "defaultChange": 1.01,
    "defaultVol": 33665616
  },
  {
    "code": "BRKVY",
    "symbol": "BIST:BRKVY",
    "name": "Birikim Varlik Yonetim",
    "unit": "₺",
    "defaultPrice": 76.1,
    "defaultChange": -0.2,
    "defaultVol": 7287184
  },
  {
    "code": "KUTPO",
    "symbol": "BIST:KUTPO",
    "name": "Kutahya Porselen Sanayi",
    "unit": "₺",
    "defaultPrice": 82.65,
    "defaultChange": -0.42,
    "defaultVol": 7882744
  },
  {
    "code": "TURGG",
    "symbol": "BIST:TURGG",
    "name": "TURKER PROJE GAYRIMENKUL VE YATIRIM GELISTIRME",
    "unit": "₺",
    "defaultPrice": 27.46,
    "defaultChange": 0,
    "defaultVol": 2550430
  },
  {
    "code": "Z30KE",
    "symbol": "BIST:Z30KE",
    "name": "Ziraat Portfoy Katilim 30 Esit Agirlikli Endeksi Hisse Senedi Yogun Borsa Yatirim Fonu Capitalisation Units",
    "unit": "₺",
    "defaultPrice": 186.8,
    "defaultChange": 0.97,
    "defaultVol": 16925388
  },
  {
    "code": "AKCNS",
    "symbol": "BIST:AKCNS",
    "name": "Akcansa Cimento Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 240,
    "defaultChange": -0.7,
    "defaultVol": 20965200
  },
  {
    "code": "EBEBK",
    "symbol": "BIST:EBEBK",
    "name": "EBEBEK MAGAZACILIK",
    "unit": "₺",
    "defaultPrice": 78.25,
    "defaultChange": 0.06,
    "defaultVol": 6782397
  },
  {
    "code": "BIGTK",
    "symbol": "BIST:BIGTK",
    "name": "Big Medya Teknoloji",
    "unit": "₺",
    "defaultPrice": 350.5,
    "defaultChange": -0.14,
    "defaultVol": 28937280
  },
  {
    "code": "BIZIM",
    "symbol": "BIST:BIZIM",
    "name": "Bizim Toptan SatiG Magazalari A.g.",
    "unit": "₺",
    "defaultPrice": 23.94,
    "defaultChange": -1.24,
    "defaultVol": 1942659
  },
  {
    "code": "VKFYO",
    "symbol": "BIST:VKFYO",
    "name": "Vakif Menkul Kiymet Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 22.88,
    "defaultChange": 0.35,
    "defaultVol": 1711653
  },
  {
    "code": "SANKO",
    "symbol": "BIST:SANKO",
    "name": "Sanko Pazarlama Ithalat Ihracat",
    "unit": "₺",
    "defaultPrice": 18.69,
    "defaultChange": -0.05,
    "defaultVol": 1394629
  },
  {
    "code": "BASGZ",
    "symbol": "BIST:BASGZ",
    "name": "Baskent Dogalgaz Dagitim Gayrimenkul Yatirim Ortakligi AS",
    "unit": "₺",
    "defaultPrice": 43.02,
    "defaultChange": 0.14,
    "defaultVol": 3104237
  },
  {
    "code": "YYAPI",
    "symbol": "BIST:YYAPI",
    "name": "Yesil Yapi Endustrisi",
    "unit": "₺",
    "defaultPrice": 0.85,
    "defaultChange": 1.19,
    "defaultVol": 61307
  },
  {
    "code": "ATAGY",
    "symbol": "BIST:ATAGY",
    "name": "Ata Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 10.51,
    "defaultChange": 1.15,
    "defaultVol": 753252
  },
  {
    "code": "OTTO",
    "symbol": "BIST:OTTO",
    "name": "OTTO HOLDING A.S",
    "unit": "₺",
    "defaultPrice": 170.6,
    "defaultChange": 0.53,
    "defaultVol": 11944218
  },
  {
    "code": "ULUSE",
    "symbol": "BIST:ULUSE",
    "name": "Ulusoy Elektrik Imalat Taahhut ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 302.25,
    "defaultChange": -0.33,
    "defaultVol": 20682363
  },
  {
    "code": "PKENT",
    "symbol": "BIST:PKENT",
    "name": "Petrokent Turizm",
    "unit": "₺",
    "defaultPrice": 126.8,
    "defaultChange": -0.86,
    "defaultVol": 8663230
  },
  {
    "code": "VKING",
    "symbol": "BIST:VKING",
    "name": "Viking Kagit ve Seluloz",
    "unit": "₺",
    "defaultPrice": 22.34,
    "defaultChange": 0.54,
    "defaultVol": 1525643
  },
  {
    "code": "OZRDN",
    "symbol": "BIST:OZRDN",
    "name": "Ozerden Ambalaj Sanayi",
    "unit": "₺",
    "defaultPrice": 28.4,
    "defaultChange": 1.28,
    "defaultVol": 1933188
  },
  {
    "code": "PAGYO",
    "symbol": "BIST:PAGYO",
    "name": "Panora Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 150.5,
    "defaultChange": -2.4,
    "defaultVol": 10173951
  },
  {
    "code": "GRNYO",
    "symbol": "BIST:GRNYO",
    "name": "Garanti Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 14.19,
    "defaultChange": -2.81,
    "defaultVol": 938782
  },
  {
    "code": "VERTU",
    "symbol": "BIST:VERTU",
    "name": "Verusaturk Girisim Sermayesi Yatirim Ortakligi AS",
    "unit": "₺",
    "defaultPrice": 36.08,
    "defaultChange": -0.06,
    "defaultVol": 2365693
  },
  {
    "code": "TTRAK",
    "symbol": "BIST:TTRAK",
    "name": "Turk Traktor ve Ziraat Makineleri",
    "unit": "₺",
    "defaultPrice": 413.25,
    "defaultChange": -0.18,
    "defaultVol": 26524451
  },
  {
    "code": "Z30KP",
    "symbol": "BIST:Z30KP",
    "name": "Ziraat Portfoy Katilim 30 Endeksi Hisse Senedi Yogun Borsa Yatirim Fonu ETF Capitalisation Units",
    "unit": "₺",
    "defaultPrice": 273.4,
    "defaultChange": 0.66,
    "defaultVol": 17352151
  },
  {
    "code": "ONCSM",
    "symbol": "BIST:ONCSM",
    "name": "ONCOSEM ONKOLOJIK SISTEMLER SANAYI VE TICARET",
    "unit": "₺",
    "defaultPrice": 241.5,
    "defaultChange": -0.21,
    "defaultVol": 14063270
  },
  {
    "code": "AGESA",
    "symbol": "BIST:AGESA",
    "name": "AgeSA Hayat ve Emeklilik",
    "unit": "₺",
    "defaultPrice": 236.9,
    "defaultChange": -0.25,
    "defaultVol": 13215230
  },
  {
    "code": "AYCES",
    "symbol": "BIST:AYCES",
    "name": "Altin Yunus Cesme Turistik Tesisler",
    "unit": "₺",
    "defaultPrice": 478.75,
    "defaultChange": -3.28,
    "defaultVol": 26328378
  },
  {
    "code": "OPT25",
    "symbol": "BIST:OPT25",
    "name": "OSMANLI P BIST TEM 25 END HY BYF",
    "unit": "₺",
    "defaultPrice": 52,
    "defaultChange": -0.12,
    "defaultVol": 2779712
  },
  {
    "code": "TARKM",
    "symbol": "BIST:TARKM",
    "name": "Tarkim Bitki Koruma Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 454.5,
    "defaultChange": 1.91,
    "defaultVol": 24092136
  },
  {
    "code": "ERSU",
    "symbol": "BIST:ERSU",
    "name": "Ersu Meyve ve Gida Sanayi",
    "unit": "₺",
    "defaultPrice": 25.32,
    "defaultChange": 1.44,
    "defaultVol": 1291523
  },
  {
    "code": "GOLTS",
    "symbol": "BIST:GOLTS",
    "name": "Goltas Goller Bolgesi Cimento Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 296.5,
    "defaultChange": 1.02,
    "defaultVol": 14996674
  },
  {
    "code": "VAKKO",
    "symbol": "BIST:VAKKO",
    "name": "Vakko Tekstil ve Hazir Giyim Sanayi Isletmeleri",
    "unit": "₺",
    "defaultPrice": 69.1,
    "defaultChange": 0.22,
    "defaultVol": 3494318
  },
  {
    "code": "BFREN",
    "symbol": "BIST:BFREN",
    "name": "Bosch Fren Sistemleri Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 129.9,
    "defaultChange": -0.54,
    "defaultVol": 6242474
  },
  {
    "code": "ACSEL",
    "symbol": "BIST:ACSEL",
    "name": "Aciselsan Acipayam Seluloz Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 122.5,
    "defaultChange": -0.08,
    "defaultVol": 5660235
  },
  {
    "code": "BRKO",
    "symbol": "BIST:BRKO",
    "name": "Birko Birlesik Koyunlulular Mensucat ve Ticaret",
    "unit": "₺",
    "defaultPrice": 13.81,
    "defaultChange": 3.76,
    "defaultVol": 612543
  },
  {
    "code": "MRSHL",
    "symbol": "BIST:MRSHL",
    "name": "Marshall Boya ve Vernik Sanayi",
    "unit": "₺",
    "defaultPrice": 1887,
    "defaultChange": 0.86,
    "defaultVol": 78182184
  },
  {
    "code": "TRHOL",
    "symbol": "BIST:TRHOL",
    "name": "Tera Financial Investments Holding",
    "unit": "₺",
    "defaultPrice": 2218,
    "defaultChange": -1.64,
    "defaultVol": 91390472
  },
  {
    "code": "OPTLR",
    "symbol": "BIST:OPTLR",
    "name": "Osmanli Portfoy Bist 30 Endeksi Hisse Senedi Yogun Borsa Yatir",
    "unit": "₺",
    "defaultPrice": 63.12,
    "defaultChange": 0.13,
    "defaultVol": 2507442
  },
  {
    "code": "VERUS",
    "symbol": "BIST:VERUS",
    "name": "Verusa Holding AS",
    "unit": "₺",
    "defaultPrice": 634.5,
    "defaultChange": -1.17,
    "defaultVol": 22363587
  },
  {
    "code": "TLMAN",
    "symbol": "BIST:TLMAN",
    "name": "Trabzon Liman Isletmeciligi AS",
    "unit": "₺",
    "defaultPrice": 79.85,
    "defaultChange": 0.19,
    "defaultVol": 2688390
  },
  {
    "code": "MEGAP",
    "symbol": "BIST:MEGAP",
    "name": "Mega Polietilen Kopuk Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 1.82,
    "defaultChange": 2.25,
    "defaultVol": 58034
  },
  {
    "code": "KAPLM",
    "symbol": "BIST:KAPLM",
    "name": "Kaplamin Ambalaj Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 431.5,
    "defaultChange": 0.82,
    "defaultVol": 12980383
  },
  {
    "code": "RAYSG",
    "symbol": "BIST:RAYSG",
    "name": "Ray Sigorta",
    "unit": "₺",
    "defaultPrice": 162.7,
    "defaultChange": -0.18,
    "defaultVol": 4692593
  },
  {
    "code": "FMIZP",
    "symbol": "BIST:FMIZP",
    "name": "Federal-Mogul Izmit Piston ve Pim Uretim Tesisleri",
    "unit": "₺",
    "defaultPrice": 295.75,
    "defaultChange": -0.67,
    "defaultVol": 8451056
  },
  {
    "code": "BAKAB",
    "symbol": "BIST:BAKAB",
    "name": "Bak Ambalaj Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 45.1,
    "defaultChange": -0.53,
    "defaultVol": 1234432
  },
  {
    "code": "GLDTR",
    "symbol": "BIST:GLDTR",
    "name": "GOLDIST - Istanbul Gold ETF",
    "unit": "₺",
    "defaultPrice": 570.5,
    "defaultChange": 0.18,
    "defaultVol": 15178153
  },
  {
    "code": "OZATD",
    "symbol": "BIST:OZATD",
    "name": "OZATA DENIZCILIK SANAYI VE TICARET AS",
    "unit": "₺",
    "defaultPrice": 4357.5,
    "defaultChange": -0.97,
    "defaultVol": 115155653
  },
  {
    "code": "INTEM",
    "symbol": "BIST:INTEM",
    "name": "Intema Insaat ve Tesisat Malzemeleri Yatirim ve Pazarlama",
    "unit": "₺",
    "defaultPrice": 263.25,
    "defaultChange": 1.84,
    "defaultVol": 6901625
  },
  {
    "code": "ERBOS",
    "symbol": "BIST:ERBOS",
    "name": "Erbosan Erciyas Boru Sanayii ve Ticaret",
    "unit": "₺",
    "defaultPrice": 153.5,
    "defaultChange": -0.26,
    "defaultVol": 4014486
  },
  {
    "code": "AKMGY",
    "symbol": "BIST:AKMGY",
    "name": "Akmerkez Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 275.5,
    "defaultChange": 0.18,
    "defaultVol": 7052800
  },
  {
    "code": "CLEBI",
    "symbol": "BIST:CLEBI",
    "name": "Celebi Hava Servisi",
    "unit": "₺",
    "defaultPrice": 1533,
    "defaultChange": 1.59,
    "defaultVol": 39014850
  },
  {
    "code": "ZGOLD",
    "symbol": "BIST:ZGOLD",
    "name": "Ziraat Portfolio Gold Participation ETF",
    "unit": "₺",
    "defaultPrice": 706.5,
    "defaultChange": 0.21,
    "defaultVol": 17065508
  },
  {
    "code": "LUKSK",
    "symbol": "BIST:LUKSK",
    "name": "Luks Kadife Ticaret ve Sanayi",
    "unit": "₺",
    "defaultPrice": 89.15,
    "defaultChange": 0.06,
    "defaultVol": 2140402
  },
  {
    "code": "OYAYO",
    "symbol": "BIST:OYAYO",
    "name": "Oyak Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 44.6,
    "defaultChange": 0.63,
    "defaultVol": 1069820
  },
  {
    "code": "INGRM",
    "symbol": "BIST:INGRM",
    "name": "Ingram Micro Bilisim Sistemleri",
    "unit": "₺",
    "defaultPrice": 397,
    "defaultChange": 0.25,
    "defaultVol": 9437881
  },
  {
    "code": "YGGYO",
    "symbol": "BIST:YGGYO",
    "name": "Yeni Gimat Gayrimenkul Yatirim Ortakligi AS",
    "unit": "₺",
    "defaultPrice": 235.9,
    "defaultChange": 0,
    "defaultVol": 5595548
  },
  {
    "code": "AGYO",
    "symbol": "BIST:AGYO",
    "name": "Atakule Gayrimenkul Yatirim Ortakligi",
    "unit": "₺",
    "defaultPrice": 7.38,
    "defaultChange": 0.14,
    "defaultVol": 173865
  },
  {
    "code": "BANVT",
    "symbol": "BIST:BANVT",
    "name": "Banvit Bandirma Vitaminli Yem Sanayii",
    "unit": "₺",
    "defaultPrice": 158.4,
    "defaultChange": 0.13,
    "defaultVol": 3624350
  },
  {
    "code": "INVES",
    "symbol": "BIST:INVES",
    "name": "Investco Holding",
    "unit": "₺",
    "defaultPrice": 817,
    "defaultChange": 0.37,
    "defaultVol": 18302434
  },
  {
    "code": "KUVVA",
    "symbol": "BIST:KUVVA",
    "name": "Kuvva Gida Ticaret ve Sanayi Yatirimlari",
    "unit": "₺",
    "defaultPrice": 158.5,
    "defaultChange": 0,
    "defaultVol": 3348154
  },
  {
    "code": "SKYLP",
    "symbol": "BIST:SKYLP",
    "name": "Skyalp Finansal Teknolojiler ve Danismanlik A.S",
    "unit": "₺",
    "defaultPrice": 269.5,
    "defaultChange": 3.95,
    "defaultVol": 5656805
  },
  {
    "code": "NUHCM",
    "symbol": "BIST:NUHCM",
    "name": "Nuh Cimento Sanayi",
    "unit": "₺",
    "defaultPrice": 218.7,
    "defaultChange": 0.28,
    "defaultVol": 4382967
  },
  {
    "code": "KLNMA",
    "symbol": "BIST:KLNMA",
    "name": "Turkiye Kalkinma ve Yatirim Bankasi",
    "unit": "₺",
    "defaultPrice": 9,
    "defaultChange": 0.67,
    "defaultVol": 146502
  },
  {
    "code": "SONME",
    "symbol": "BIST:SONME",
    "name": "Soenmez Filament Sentetik Iplik ve Elyaf Sanayi",
    "unit": "₺",
    "defaultPrice": 139.3,
    "defaultChange": -0.21,
    "defaultVol": 2170433
  },
  {
    "code": "MAALT",
    "symbol": "BIST:MAALT",
    "name": "Marmaris Altinyunus Turistik Tesisler A.S",
    "unit": "₺",
    "defaultPrice": 1012,
    "defaultChange": -2.97,
    "defaultVol": 14495888
  },
  {
    "code": "DIRIT",
    "symbol": "BIST:DIRIT",
    "name": "Diriteks Dirilis Tekstil Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 28.06,
    "defaultChange": 0,
    "defaultVol": 372861
  },
  {
    "code": "COSMO",
    "symbol": "BIST:COSMO",
    "name": "Cosmos Yatirim Holding",
    "unit": "₺",
    "defaultPrice": 117.9,
    "defaultChange": -0.17,
    "defaultVol": 1523386
  },
  {
    "code": "BRYAT",
    "symbol": "BIST:BRYAT",
    "name": "Borusan Yatirim ve Pazarlama AS",
    "unit": "₺",
    "defaultPrice": 1710,
    "defaultChange": -0.06,
    "defaultVol": 21511800
  },
  {
    "code": "CMBTN",
    "symbol": "BIST:CMBTN",
    "name": "Cimbeton Hazir Beton ve Prefabrik Yapi Elemanlari Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 1595,
    "defaultChange": 0.69,
    "defaultVol": 17288205
  },
  {
    "code": "BURVA",
    "symbol": "BIST:BURVA",
    "name": "Burcelik Vana Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 826,
    "defaultChange": 1.91,
    "defaultVol": 7225848
  },
  {
    "code": "YBTAS",
    "symbol": "BIST:YBTAS",
    "name": "Yibitas Yozgat Isci Birligi Insaat Malzemeleri Ticaret Ve San",
    "unit": "₺",
    "defaultPrice": 15,
    "defaultChange": 0,
    "defaultVol": 121740
  },
  {
    "code": "ENPRA",
    "symbol": "BIST:ENPRA",
    "name": "Enpara Bank",
    "unit": "₺",
    "defaultPrice": 55.85,
    "defaultChange": -0.09,
    "defaultVol": 448364
  },
  {
    "code": "APBDL",
    "symbol": "BIST:APBDL",
    "name": "Ak Portfoy BIST Banka Disi Likit 10 Endeksi Hisse Senedi Yogun",
    "unit": "₺",
    "defaultPrice": 39.53,
    "defaultChange": 0.08,
    "defaultVol": 297938
  },
  {
    "code": "ALCAR",
    "symbol": "BIST:ALCAR",
    "name": "Alarko Carrier Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 714,
    "defaultChange": -0.28,
    "defaultVol": 4478922
  },
  {
    "code": "SNPAM",
    "symbol": "BIST:SNPAM",
    "name": "Sonmez Pamuklu Sanayii",
    "unit": "₺",
    "defaultPrice": 20.14,
    "defaultChange": 0.5,
    "defaultVol": 125754
  },
  {
    "code": "APX30",
    "symbol": "BIST:APX30",
    "name": "AK Portfoy BIST 30 Endeksi Hisse Senedi Fonu (Hisse Senedi Yo)",
    "unit": "₺",
    "defaultPrice": 38.76,
    "defaultChange": -0.03,
    "defaultVol": 229924
  },
  {
    "code": "YONGA",
    "symbol": "BIST:YONGA",
    "name": "Yonga Mobilya SANAYI ve TICARET AS",
    "unit": "₺",
    "defaultPrice": 46.98,
    "defaultChange": -0.76,
    "defaultVol": 235934
  },
  {
    "code": "KONYA",
    "symbol": "BIST:KONYA",
    "name": "Konya Cimento Sanayi",
    "unit": "₺",
    "defaultPrice": 3737.5,
    "defaultChange": 0.54,
    "defaultVol": 17891413
  },
  {
    "code": "ZSR25",
    "symbol": "BIST:ZSR25",
    "name": "ZIRAAT PORTFOY BIST SURDURULEBILIRLIK 25 ENDEKSI HISSE SENEDI YOGUN BORSA YATIRIM FONU Units -- Distribution",
    "unit": "₺",
    "defaultPrice": 48.5,
    "defaultChange": -0.04,
    "defaultVol": 224701
  },
  {
    "code": "ATSYH",
    "symbol": "BIST:ATSYH",
    "name": "Atlantis Yatirim Holding",
    "unit": "₺",
    "defaultPrice": 130,
    "defaultChange": 0,
    "defaultVol": 539630
  },
  {
    "code": "ZPBDL",
    "symbol": "BIST:ZPBDL",
    "name": "ZIRAAT PORTFOY BIST BANKA DISI LIKIT 10 ENDEKSI HISSE SENEDI YOGUN BORSA YATIRIM FONU Capitalisation Units",
    "unit": "₺",
    "defaultPrice": 270.9,
    "defaultChange": 0.07,
    "defaultVol": 1044319
  },
  {
    "code": "POLTK",
    "symbol": "BIST:POLTK",
    "name": "Politeknik Metal Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 4797.5,
    "defaultChange": -4.15,
    "defaultVol": 18038600
  },
  {
    "code": "QNBFK",
    "symbol": "BIST:QNBFK",
    "name": "QNB Finansal Kiralama",
    "unit": "₺",
    "defaultPrice": 46.2,
    "defaultChange": 3.03,
    "defaultVol": 168260
  },
  {
    "code": "EGEEN",
    "symbol": "BIST:EGEEN",
    "name": "Ege Endüstri",
    "unit": "₺",
    "defaultPrice": 5290,
    "defaultChange": -0.56,
    "defaultVol": 18684280
  },
  {
    "code": "OPK30",
    "symbol": "BIST:OPK30",
    "name": "Osmanli Portfoy Ka Katilim 30 Endeksi Hisse Se",
    "unit": "₺",
    "defaultPrice": 79.18,
    "defaultChange": 0.71,
    "defaultVol": 266837
  },
  {
    "code": "BRMEN",
    "symbol": "BIST:BRMEN",
    "name": "Birlik Mensucat Ticaret ve Sanayi Isletmesi",
    "unit": "₺",
    "defaultPrice": 15.61,
    "defaultChange": 2.7,
    "defaultVol": 50561
  },
  {
    "code": "MMCAS",
    "symbol": "BIST:MMCAS",
    "name": "MMC Sanayi ve Ticari Yatirimlar A.S",
    "unit": "₺",
    "defaultPrice": 53.2,
    "defaultChange": -5,
    "defaultVol": 140076
  },
  {
    "code": "UFUK",
    "symbol": "BIST:UFUK",
    "name": "Ufuk Yatirim Yonetim Ve Gayrimenkul",
    "unit": "₺",
    "defaultPrice": 1820,
    "defaultChange": -1.62,
    "defaultVol": 4213300
  },
  {
    "code": "QNBTR",
    "symbol": "BIST:QNBTR",
    "name": "QNB Bank AS",
    "unit": "₺",
    "defaultPrice": 193,
    "defaultChange": 0,
    "defaultVol": 439075
  },
  {
    "code": "BALAT",
    "symbol": "BIST:BALAT",
    "name": "Balatacilar Balatacilik Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 73,
    "defaultChange": 0,
    "defaultVol": 159651
  },
  {
    "code": "CASA",
    "symbol": "BIST:CASA",
    "name": "Casa Emtia Petrol Kimyevi ve Turevleri Sanayi Ticaret AS",
    "unit": "₺",
    "defaultPrice": 72,
    "defaultChange": -1.23,
    "defaultVol": 144072
  },
  {
    "code": "AYES",
    "symbol": "BIST:AYES",
    "name": "Ayes Celik Hasir ve Cit Sanayi AS",
    "unit": "₺",
    "defaultPrice": 30.3,
    "defaultChange": -1.69,
    "defaultVol": 54752
  },
  {
    "code": "ISBIR",
    "symbol": "BIST:ISBIR",
    "name": "Isbir Holding AS",
    "unit": "₺",
    "defaultPrice": 72,
    "defaultChange": 0.42,
    "defaultVol": 126864
  },
  {
    "code": "SODSN",
    "symbol": "BIST:SODSN",
    "name": "Sodas Sodyum Sanayii AS",
    "unit": "₺",
    "defaultPrice": 7.56,
    "defaultChange": 0.8,
    "defaultVol": 12096
  },
  {
    "code": "BASCM",
    "symbol": "BIST:BASCM",
    "name": "Bastas Baskent Cimento Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 13.2,
    "defaultChange": -0.68,
    "defaultVol": 21080
  },
  {
    "code": "DOCO",
    "symbol": "BIST:DOCO",
    "name": "DO & CO Aktiengesellschaft",
    "unit": "₺",
    "defaultPrice": 11475,
    "defaultChange": -1.14,
    "defaultVol": 16673175
  },
  {
    "code": "EMNIS",
    "symbol": "BIST:EMNIS",
    "name": "Eminis Ambalaj Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 166,
    "defaultChange": 0,
    "defaultVol": 221942
  },
  {
    "code": "KENT",
    "symbol": "BIST:KENT",
    "name": "Kent Gida Maddeleri Sanayii ve Ticaret",
    "unit": "₺",
    "defaultPrice": 365,
    "defaultChange": 0,
    "defaultVol": 470485
  },
  {
    "code": "ZPT10",
    "symbol": "BIST:ZPT10",
    "name": "ZIRAAT PORTFOY YILDIZ PAZAR TEKNOLOJI VE ILETISIM 10 ENDEKSI HISSE SENEDI YOGUN BORSA YATIRIM FONU Units Capitalisation",
    "unit": "₺",
    "defaultPrice": 128.55,
    "defaultChange": 0,
    "defaultVol": 154517
  },
  {
    "code": "ISGLK",
    "symbol": "BIST:ISGLK",
    "name": "Is Portfoy Yonetim ETF",
    "unit": "₺",
    "defaultPrice": 708.5,
    "defaultChange": 0.5,
    "defaultVol": 687954
  },
  {
    "code": "ATEKS",
    "symbol": "BIST:ATEKS",
    "name": "Akin Tekstil",
    "unit": "₺",
    "defaultPrice": 110,
    "defaultChange": 3.29,
    "defaultVol": 94600
  },
  {
    "code": "EKIZ",
    "symbol": "BIST:EKIZ",
    "name": "Ekiz Kimya Sanayi ve Ticaret",
    "unit": "₺",
    "defaultPrice": 60.05,
    "defaultChange": -3.15,
    "defaultVol": 47920
  },
  {
    "code": "INTEK",
    "symbol": "BIST:INTEK",
    "name": "Innosa Teknoloji",
    "unit": "₺",
    "defaultPrice": 260,
    "defaultChange": 2.06,
    "defaultVol": 178100
  },
  {
    "code": "ORMA",
    "symbol": "BIST:ORMA",
    "name": "Orma Orman Mahsulleri Integre Sanayi ve Ticaret AS",
    "unit": "₺",
    "defaultPrice": 165.3,
    "defaultChange": -5,
    "defaultVol": 82815
  },
  {
    "code": "USDTR",
    "symbol": "BIST:USDTR",
    "name": "Finans Asset Management American Dollar Foreign ETF",
    "unit": "₺",
    "defaultPrice": 4452,
    "defaultChange": 0.04,
    "defaultVol": 2132508
  },
  {
    "code": "OPTGY",
    "symbol": "BIST:OPTGY",
    "name": "Osmanli Pf. Kar Payi Od. BIST GYO En. Hi. Se. Yogun TL ETF",
    "unit": "₺",
    "defaultPrice": 159.35,
    "defaultChange": -0.41,
    "defaultVol": 75054
  },
  {
    "code": "QTEMZ",
    "symbol": "BIST:QTEMZ",
    "name": "DJIST - Dow Jones Istanbul 20",
    "unit": "₺",
    "defaultPrice": 345.3,
    "defaultChange": 0.26,
    "defaultVol": 162636
  },
  {
    "code": "SUMAS",
    "symbol": "BIST:SUMAS",
    "name": "Sumas Suni Tahta ve Mobilya Sanayii AS",
    "unit": "₺",
    "defaultPrice": 278,
    "defaultChange": 1.09,
    "defaultVol": 129826
  },
  {
    "code": "LYDYE",
    "symbol": "BIST:LYDYE",
    "name": "Lydia Yesil Enerji kaynaklari",
    "unit": "₺",
    "defaultPrice": 13650,
    "defaultChange": 2.69,
    "defaultVol": 5760300
  },
  {
    "code": "GATEG",
    "symbol": "BIST:GATEG",
    "name": "Gate Group Teknoloji Medya Ve Siber Guvenlik Hizmetleri",
    "unit": "₺",
    "defaultPrice": 314.5,
    "defaultChange": -0.47,
    "defaultVol": 112591
  },
  {
    "code": "CMENT",
    "symbol": "BIST:CMENT",
    "name": "Cimentas Izmir Cimento Fabrikasi Turk",
    "unit": "₺",
    "defaultPrice": 275,
    "defaultChange": 0.36,
    "defaultVol": 87175
  },
  {
    "code": "ZRE20",
    "symbol": "BIST:ZRE20",
    "name": "ZIRAAT PORTFOY RISK ESIT BANKA DISI 20 ENDEKSI HISSE SENEDI YOGUN BORSA YATIRIM FONU Units Capitalisation",
    "unit": "₺",
    "defaultPrice": 180.9,
    "defaultChange": -0.5,
    "defaultVol": 39798
  },
  {
    "code": "KSTUR",
    "symbol": "BIST:KSTUR",
    "name": "Kustur Kusadasi Turizm Endustrisi",
    "unit": "₺",
    "defaultPrice": 2456,
    "defaultChange": -1.17,
    "defaultVol": 311912
  },
  {
    "code": "OPX30",
    "symbol": "BIST:OPX30",
    "name": "Osmanli Portfoy Bi Osmanli Py/Etf",
    "unit": "₺",
    "defaultPrice": 85.28,
    "defaultChange": 0,
    "defaultVol": 4264
  },
  {
    "code": "ISBTR",
    "symbol": "BIST:ISBTR",
    "name": "Turkiye Is Bankasi",
    "unit": "₺",
    "defaultPrice": 499997.5,
    "defaultChange": -3.85,
    "defaultVol": 2999985
  },
  {
    "code": "ISKUR",
    "symbol": "BIST:ISKUR",
    "name": "Turkiye Is Bankasi",
    "unit": "₺",
    "defaultPrice": 4125000,
    "defaultChange": 0,
    "defaultVol": 4125000
  }
];
