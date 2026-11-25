# Respec

[![Son sürüm](https://img.shields.io/github/v/release/getrespec/getrespec?label=release)](https://github.com/getrespec/getrespec/releases)
[![Testler](https://github.com/getrespec/getrespec/actions/workflows/ci.yml/badge.svg)](https://github.com/getrespec/getrespec/actions/workflows/ci.yml)
[![Node.js 20 veya üstü](https://img.shields.io/badge/node-%3E%3D20-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Claude Code, Codex ve Cursor ile çalışır](https://img.shields.io/badge/works%20with-Claude%20Code%20%7C%20Codex%20%7C%20Cursor-2f45c8)](#başlarken)
[![Lisans: FSL-1.1-ALv2](https://img.shields.io/badge/license-FSL--1.1--ALv2-2f45c8)](LICENSE.md)

[English](README.md) · **Türkçe**

**Kariyerini AI çağına göre yeniden kur.**

Rol yapma oyunlarında *respec*, karakterinin yetenek puanlarını sıfırlayıp başka bir oyun tarzına göre yeniden dağıtmak demek. Kelime, İngilizcedeki "respecialization", yani "yeniden uzmanlaşma" kelimesinin kısaltması. Respec de yazılım geliştiricilerin AI çağının yeni rollerine (AI Engineer, AI Product Engineer, Forward-Deployed Engineer…) geçmesine yardım ediyor: bildiklerini çöpe atmadan, uygulayarak öğrenerek.

Üye olacağın bir platform yok: Respec bir klasör. Kendi kodlama agent'ınla (Claude Code, Codex, Cursor…) açtığında agent senin öğretmenin, değerlendiricin ve kariyer rehberin oluyor.

Respec senin dilinde konuşur: `/respec start` ile başla ve Türkçe yaz, sana Türkçe cevap versin.

## Nasıl çalışır

1. **Profil** – CV'ni okur ya da sana birkaç soru sorar, ardından kısa bir seviye tespiti yapar.
2. **Rol önerisi** – güncel iş ilanı verilerine (`data/market/roles.md`) bakarak sana uyan 2–3 rol önerir. Karar veremediysen 1–2 haftalık bir deneme modülü verir.
3. **Müfredat** – nasıl öğrenmek istediğini sorar (hedefin ne, ne kadar derine inmek istiyorsun, örnekler hangi projeden ya da alandan gelsin), rolün tüm becerilerini haritalar ve bildiklerini atlayan bir müfredat çıkarır. Müfredat bir rol haritasıyla başlar: o roldeki insanlar gerçekte ne yapıyor ve her modül bunun neresine oturuyor.
4. **Öğrenme döngüsü** – her modül aynı sırayla ilerler: ders (seçtiğin proje ya da alandan gerçek bir durumla açılır) → senaryo tabanlı quiz → eksik kalan konuların farklı örneklerle yeniden anlatılması → uygulamalı ödev → değerlendirme. Amaç neyi, nerede ve ne zaman kullanacağını bilmek.
5. **Dashboard** – ilerlemeni, zayıf noktalarını ve seviyeni (Çırak → Kalfa → Usta) gösteren, bilgisayarında çalışan bir web uygulaması. Bir modüle tıklayıp dersini okuyabilir, quiz cevaplarına bakabilir, ödev kodunu inceleyebilir ve nasıl değerlendirildiğini görebilirsin.

## Başlarken

```bash
git clone https://github.com/getrespec/getrespec
cd getrespec && claude   # ya da klasörü Codex / Cursor ile aç
```

Sonra:

```
/respec start
```

İstersen önce CV'ni `learner/cv/` klasörüne koy (PDF ya da Markdown).

## Komutlar

| Komut | Ne yapar |
|---|---|
| `/respec start` | Profilini çıkarır ve seviye tespiti yapar |
| `/respec role` | Sana uyan rolleri önerir |
| `/respec plan` | Birkaç soru sorar ve seçtiğin rol için müfredat hazırlar (ya da mevcut müfredatını günceller) |
| `/respec next` | Sıradaki adımı başlatır (ders, quiz, tekrar, ödev) |
| `/respec submit` | Ödevini değerlendirir |
| `/respec dossier` | Geçtiğin bir ödevden iş başvurusu için mülakat dosyası hazırlar |
| `/respec dashboard` | Dashboard'u tarayıcıda açar |
| `/respec update-trends` | Rol ve iş ilanı verilerini internetten günceller |
| `/respec update` | Respec'i en son sürüme günceller |
| `/respec status` | Nerede olduğunu ve sıradaki adımı gösterir |

Özel slash komutu olmayan agent'larda (ör. Codex) `respec start`, `respec next` gibi yazman yeterli.

## Önerilen model ayarları

Derslerin ve değerlendirmelerin kalitesi kullanılan modele bağlı. Bu yüzden repo şu varsayılanlarla geliyor:

| Agent | Dosya | Model | Effort |
|---|---|---|---|
| Claude Code | `.claude/settings.json` | `opus` (şu an Opus 5.5) | `medium` |
| Codex | `.codex/config.toml` | `gpt-6.1-sol` | `medium` |

- Bunlar zorunlu değil, **varsayılan**. Bir oturum içinde Claude Code'da `/model` ve `/effort`, Codex'te `/model` ile değiştirebilirsin.
- Codex proje ayarlarını yalnızca klasöre **güvendiğinde** okur. İlk açılışta sorduğunda klasöre güven.
- Claude Code'da `opus` takma adı her zaman güncel Opus modelini gösterir. Belirli bir sürüme sabitlemek için `"model": "claude-opus-5-5"` yaz.
- Kendi ayarlarını `.claude/settings.local.json` (git'e girmez) ya da `~/.codex/config.toml` içinde tut.

## Dashboard

```bash
node scripts/serve.mjs --open      # http://127.0.0.1:4747
```

İlerlemeni canlı takip eden, salt okunur bir uygulama. Genel bakış sayfasında seviyen, sıradaki adımın, müfredatın, beceri haritan, zayıf noktaların ve LLM kullanımın var. Her modülün sayfasında ders (içindekiler ve etkileşimli görseliyle), quiz geçmişi, ödev, `work/` klasöründeki kodun ve değerlendirme var; değerlendirmedeki kanıtlar doğrudan kodundaki satıra götürür. Sunucu yalnızca kendi bilgisayarından gelen isteklere cevap verir; CV'ni ve `.env` dosyanı asla göstermez.

Uygulama `dashboard/dist` içinde derlenmiş olarak gelir. Üzerinde çalışmak istersen: `cd dashboard && npm install && npm run dev`.

## LLM kullanım kaydı

LLM çağıran ödevler bilgisayarında çalışan küçük bir proxy üzerinden geçer. Böylece sen de değerlendirici de her isteğin kaç token'a ve ne kadar süreye mal olduğunu görebilirsiniz:

```bash
node scripts/llm-proxy.mjs                 # ayrı bir terminalde açık bırak
node scripts/usage-report.mjs              # modül ve model bazında özet
```

SDK'nı `learner/.env` dosyasından proxy'ye yönlendir (resmi SDK'lar bu değişkenleri kendiliğinden okur):

```
OPENAI_BASE_URL=http://localhost:8787/openai/v1
ANTHROPIC_BASE_URL=http://localhost:8787/anthropic
```

OpenRouter (`/openrouter/api/v1`) ve Ollama (`/ollama/v1`) da aynı şekilde çalışır. Proxy yalnızca modeli, token sayılarını ve gecikmeyi kaydeder; prompt'lar, cevaplar ve API anahtarları diske hiç yazılmaz. Toplamları ve her modülün kullanımını dashboard'da görebilirsin.

## Sürümler ve güncellemeler

Kurulu sürüm `package.json` dosyasında yazar; her sürümde nelerin değiştiği [`CHANGELOG.md`](CHANGELOG.md) dosyasında. Sürümler [GitHub'da](https://github.com/getrespec/getrespec/releases) yayınlanır.

Yeni bir sürüm çıktığında agent'ın bunu oturumun başında söyler, dashboard'da da bir bildirim görünür. Kurmak için `/respec update` yaz: agent neler değiştiğini anlatır, repodaki dosyalarda senin yaptığın değişiklik olup olmadığına bakar ve yeni sürümü indirir. Güncelleme `learner/` klasörüne hiç dokunmaz. Elle kontrol etmek istersen: `node scripts/check-update.mjs`.

Kontrol, günde en fazla bir kez GitHub'a en son sürümün ne olduğunu sorar; seninle ya da ilerlemenle ilgili hiçbir bilgi gönderilmez. Kapatmak için `RESPEC_NO_UPDATE_CHECK=1` ortam değişkenini tanımla.

## Gizlilik

CV'n, ilerlemen, ödevlerin ve API anahtarların `learner/` klasöründe kalır. Bu klasör hiçbir zaman git'e eklenmez.

## İlerlemen ve sertifika

`learner/` klasöründeki ilerlemen senin öğrenme kaydın: okuyup değiştirebileceğin düz dosyalar ve onları senin adına agent yazıyor. Bu yüzden bir şeyin kanıtı sayılmaz ve hiçbir sertifika ona dayanmaz. Sertifika (web uygulamasıyla gelecek) Respec'in sunucularında yapılan ayrı bir değerlendirme: bitirme projenin testleri ve eval'leri, kendi tasarım kararlarınla ilgili sorular ve daha önce görmediğin kısa bir görev. Her sertifika, neyin ne zaman değerlendirildiğini herkesin kontrol edebileceği açık bir sayfaya bağlanır.

## Mülakat dosyası

Bir ödevi geçtiğinde agent onu bir mülakat dosyasına çevirmeyi önerir; istersen sonra `/respec dossier` ile de isteyebilirsin. İş başvurusuna ekleyebileceğin bir HTML dosyası ve PDF kopyası çıkar. İlk sayfa ne yaptığını sade bir dille anlatır ve kod okumayan bir İK uzmanının sorabileceği soruları verir. Gerisi teknik mülakatçı için: 3–5 kararın, savunma cevapların, eksikleriyle birlikte değerlendirme, sana sorulabilecek sorular ve en sonda kendi kodundan alıntılar. Hikâyeyi agent yazar; puanlar ve kod doğrudan değerlendirmenden ve `work/` klasöründen gelir, bu yüzden ikisi birbirinden farklı olamaz.

- **Beyana dayalıdır.** Sertifika değil, kendi agent'ının değerlendirmesini gösterir ve sayfa bunu açıkça söyler. Mülakatçılar dosyanın nasıl okunacağını [getrespec.dev/tr/dossier](https://www.getrespec.dev/tr/dossier/) adresinde bulabilir.
- **Paylaşıp paylaşmamak sana kalmış.** Dosya `learner/dossier/` klasörüne yazılır ve kendi başına hiçbir yere gitmez. Oluşturulmadan önce içine girecek her kod alıntısını görürsün. CV'n, `.env` dosyan ve profilin asla kullanılmaz; API anahtarına benzeyen bir şey bulursa renderer dosyayı yazmayı reddeder.
- Script ya da takip içermez ve çevrimdışı açılır. PDF, kendi Chrome ya da Edge tarayıcınla oluşturulur; ikisi de yoksa HTML'i açıp PDF olarak yazdırabilirsin. En alttaki "Respec ile hazırlandı" linki isteğe bağlıdır.
- Nasıl göründüğünü `examples/learner-demo/dossier/` klasöründeki örnekte görebilirsin.

## Gereksinimler

- Bir kodlama agent'ı (Claude Code, Codex, Cursor, …)
- Node.js 20 veya üstü (dashboard sunucusu ve kullanım proxy'si için; `npm install` gerekmez)
- LLM API'si çağıran ödevler için: bir API anahtarı (OpenAI, Anthropic, Google) ya da yerel bir model (Ollama)

## Lisans

Respec'in kaynak kodu okunmaya, çalıştırılmaya ve değiştirilmeye açık; [Functional Source License 1.1, Apache 2.0 Future License](LICENSE.md) (FSL-1.1-ALv2) ile lisanslı. İş yerinde kullanmak ve ekibini eğitmek dahil her amaçla kullanabilirsin; tek bir istisna var: Respec'i ya da ondan yapılmış bir şeyi başkalarına rakip bir ticari ürün veya hizmet olarak sunmak. Her sürüm, yayınlanmasından iki yıl sonra Apache License 2.0 ile de kullanılabilir hale gelir.

Lisans, Respec adını ve logosunu kapsamaz. Telif hakkı 2026 [Haluk Coş](https://github.com/thesurvivor).

## Katkıda bulunmak

Katkılar aynı lisansla kabul edilir.

Testleri `node --test test/*.test.mjs` ile çalıştır. Dashboard'u örnek veriyle denemek için: `node scripts/serve.mjs --learner examples/learner-demo`.

Pull request'inin neyi değiştirdiğini `CHANGELOG.md` dosyasındaki `## [Unreleased]` başlığının altına yaz; CI bunu kontrol eder. Sürüm numarasının nasıl seçildiği ve sürümün nasıl yayınlandığı [`RELEASING.md`](RELEASING.md) dosyasında: bir sürüm pull request'i açılır, merge edildiğinde GitHub sürümü kendiliğinden yayınlanır.

Bu README'nin İngilizce bir sürümü var: [`README.md`](README.md). Birini değiştirdiğinde aynı pull request'te diğerini de güncelle.

Piyasa verileri `data/market/roles.md` dosyasında tutulur ve `/respec update-trends` ile güncellenir. Yeni ülkeler için kaynaklı piyasa notları ekleyen pull request'lere açığız.

Respec her öğrenciye kendi dilinde yazar ve bunu yaparken `data/language/<kod>.md` dosyasındaki yazım rehberine uyar. Rehberler önce agent'ın yazdığı taslaklar olarak başlar, öğrenciler düzelttikçe iyileşir. Respec'i kendi dilinde kullanıyorsan o dilin rehberini gözden geçirmek, yapabileceğin en faydalı katkılardan biri (bkz. `data/language/README.md`).
