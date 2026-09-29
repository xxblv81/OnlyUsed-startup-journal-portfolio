# OnlyUsed — Startup Journal & Portfolio

**▶ Live site / 線上瀏覽：https://xxblv81.github.io/OnlyUsed-startup-journal-portfolio/**
(Founder case study / 創辦人作品集：[`#/case/overview`](https://xxblv81.github.io/OnlyUsed-startup-journal-portfolio/#/case/overview))

---

## English

OnlyUsed was the marketplace for pre-owned adult intimates and related goods that I started building in March 2026, initially aimed at the audiences of OnlyFans and X creators. In Taiwan this trade was scattered across private messages on Facebook, PTT, X and Threads, with no protection for privacy, hygiene, fraud or personal safety.

Over about six months we incorporated a company in Taiwan (name approved April 2026), defined a full creator-platform spec with our development team (19 front-end pages, 14 API groups, 27 admin modules), built a website prototype, and repositioned three times — a core creator platform, a Taiwan-facing pre-loved womenswear version, and a planned overseas version. The project ended in September 2026, stopped by regulation and payment restrictions, a lack of validation data, and the founders moving on.

This repository is the portfolio site, in three parts:

| Part | What's in it |
|---|---|
| **Founder case study** | 13 sections: timeline, the three versions, problem and market, product, pricing, trust and compliance, technology, go-to-market, brand, what happened, and my role |
| **Restored site** | 10 working screens rebuilt from the original onlyused.me design system and the April 2026 spec: home, feed, creators, marketplace, auctions, my closet, cart, orders, messages, terms |
| **Original files** | The May 2026 pitch deck, the April 2026 platform spec, and 13 pages from the Taiwan-facing version |

The site switches between English and Traditional Chinese (top-right button).

> **About the restoration.** The original website (onlyused.me) has been taken down. This portfolio was rebuilt from the interface styles preserved before the takedown, the April 2026 spec, the May 2026 deck and the page files of the time. The spec, deck and 13 Taiwan-facing pages are original files; the other screens were recreated from the original design system and the spec. All accounts, products, prices and figures are illustrative — **there is no real operating data and no explicit content**. Market figures and overseas regulations are quoted from the deck and internal documents of the time and were not independently verified.

## 中文

OnlyUsed 是我在 2026 年 3 月開始創辦的平台，媒合二手成人內衣物與周邊商品的買賣，初期客群瞄準 OnlyFans、X 上創作者的粉絲。這類交易在台灣原本散落在 FB、PTT、X、Threads 的私訊裡，隱私、衛生、詐騙與人身安全都沒有保障。

大約六個月裡，我們在台灣設立了公司（2026/04 名稱核准）、與開發方定義出完整的創作者平台規格（前台 19 頁、API 14 類、後台 27 個模組）、做出網站原型，並經歷三個版本的定位：核心的創作者平台、台灣對外的二手女裝版本、規劃中的海外版本。專案在 2026 年 9 月結束，原因是法規與金流限制、驗證數據不足，以及團隊成員各自規劃下一步。

這個 repo 就是作品集網站，分成三大類：

| 類別 | 內容 |
|---|---|
| **創辦人作品集** | 13 個段落：時間軸、三個版本、痛點與市場、產品、收費方式、信任與法遵、技術、成長策略、品牌、結局與反思、創辦人 |
| **原站還原** | 依原本 onlyused.me 的設計系統與 2026/04 規格書重建的 10 個可操作畫面：首頁、動態、創作者、市集、拍賣、我的衣櫃、購物車、訂單、訊息、條款 |
| **原始檔案** | 2026/05 提案簡報、2026/04 平台規格書，以及台灣對外版本的 13 個頁面 |

網站可以切換中英文（右上角按鈕）。

> **關於還原。** 原本的 OnlyUsed 網站（onlyused.me）已經下架。這份作品集依據下架前留存的介面樣式、2026/04 規格書、2026/05 提案簡報與當時的頁面檔案重建。規格書、簡報與 13 個台灣版頁面是原始檔案；其他畫面依原站設計系統與規格書重新製作。介面中的帳號、商品、價格與數字皆為示意——**這裡沒有任何真實營運數據，也不含露骨內容**。市場數字與海外法規引自當時的簡報與內部文件，未經獨立查證。

---

## Structure / 結構

```
index.html   the site (single page, no build step) / 網站主頁（免建置）
app.css      shared styles (the original design system) / 共用樣式（原站設計系統）
app.js       data, screens, routing, EN/ZH switch / 資料、畫面、路由、中英切換
pages/       original files: deck, spec, 13 Taiwan-facing pages / 原始檔案
img/         logo, sticker, deck pages / 標誌、貼紙、簡報頁面
```

When editing, bump the `?v=` number on `app.css` and `app.js` in `index.html` so visitors don't get a cached old version. / 修改後請把 `index.html` 裡 `app.css`、`app.js` 的 `?v=` 版本號加一，避免訪客看到快取的舊版。

© 2026 August · OnlyUsed
