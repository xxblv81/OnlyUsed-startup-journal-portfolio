(function(){
  'use strict';
  /* ---------- 語言 ---------- */
  var lang;
  try{ lang=localStorage.getItem('ou-lang'); }catch(e){}
  if(lang!=='zh'&&lang!=='en'){ lang=((navigator.language||'').toLowerCase().indexOf('zh')===0)?'zh':'en'; }
  function L(o){ return o[lang]; }
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function nt(n){ return 'NT$'+n.toLocaleString('en-US'); }
  function zh(){ return lang==='zh'; }
  function T(z,e){ return zh()?z:e; }
  function icon(id){ return '<svg class="svg"><use href="#'+id+'"/></svg>'; }

  /* ---------- 導覽結構 ---------- */
  var SITE=[
    ['home','i-home',{zh:'首頁',en:'Home'},{zh:'深色輪播、精選創作者、進行中拍賣。',en:'Dark hero, featured creators, live auctions.'},'o'],
    ['feed','i-feed',{zh:'動態',en:'Feed'},{zh:'一般、商品、拍賣貼文，含訂閱者限定與付費解鎖。',en:'General, product and auction posts, incl. subscriber-only and paid unlocks.'},'s'],
    ['creators','i-user',{zh:'創作者',en:'Creators'},{zh:'創作者頁、訂閱方案、打賞與私訊。',en:'Creator pages, subscription plans, tips and DMs.'},'s'],
    ['marketplace','i-bag',{zh:'市集',en:'Marketplace'},{zh:'依分類瀏覽、附出貨驗證的商品。',en:'Browse by category; every piece verified at shipping.'},'o'],
    ['auctions','i-gavel',{zh:'拍賣',en:'Auctions'},{zh:'即時競標：倒數、最低加價、出價紀錄。',en:'Live bidding: countdown, minimum raise, bid history.'},'s'],
    ['closet','i-bookmark',{zh:'我的衣櫃',en:'My Closet'},{zh:'訂閱、收藏、KYC 與帳號安全。',en:'Subscriptions, saves, KYC and security.'},'s'],
    ['cart','i-cart',{zh:'購物車',en:'Cart'},{zh:'平台代收款的結帳流程。',en:'Checkout with payment held by the platform.'},'s'],
    ['orders','i-receipt',{zh:'訂單',en:'Orders'},{zh:'7 天自動完成、爭議、賣家淨收款。',en:'7-day auto-complete, disputes, seller net payout.'},'s'],
    ['messages','i-msg',{zh:'訊息',en:'Messages'},{zh:'付費解鎖訊息、打賞、站外聯絡偵測。',en:'Paid-unlock messages, tips, off-platform contact alerts.'},'s'],
    ['terms','i-file',{zh:'條款與政策',en:'Terms & policies'},{zh:'依原站截圖還原的條款頁。',en:'Terms page restored from a screenshot.'},'o']
  ];
  var SEC={
    overview:['i-book',{zh:'總覽',en:'Overview'},{zh:'2026/03 開始的原味創作者平台，在台灣設立公司，9 月結束。',en:'An adult-intimates creator platform, started Mar 2026, incorporated in Taiwan, closed in Sep.'}],
    timeline:['i-clock',{zh:'時間軸',en:'Timeline'},{zh:'3 月合資 → 4 月設立與規格 → 6 月原型 → 7 月調整 → 9 月結束。',en:'Mar JV → Apr company & spec → Jun prototype → Jul pivots → Sep close.'}],
    versions:['i-pivot',{zh:'三個版本',en:'Three versions'},{zh:'核心、台灣對外、海外——同一個想法的三種做法。',en:'Core, Taiwan-facing, overseas — one idea, three shapes.'}],
    market:['i-chart',{zh:'痛點與市場',en:'Problem & market'},{zh:'交易散落在私訊；國外已有 AllThingsWorn 等先例。',en:'Trades scattered in DMs; AllThingsWorn proves it abroad.'}],
    product:['i-phone',{zh:'產品',en:'Product'},{zh:'規格：前台 19 頁、API 14 類、後台 27 模組。',en:'Spec: 19 pages, 14 API groups, 27 admin modules.'}],
    model:['i-coins',{zh:'收費方式',en:'Pricing'},{zh:'四個版本：分項抽成 → 10% → 月費 → 買家保障費。',en:'Four versions: per-type → 10% → subscription → buyer fee.'}],
    trust:['i-shield',{zh:'信任與法遵',en:'Trust & compliance'},{zh:'實名、18+、出貨前後驗證、10 項法律風險清單。',en:'ID checks, 18+, two-sided proof, a 10-item legal risk list.'}],
    tech:['i-layers',{zh:'技術',en:'Technology'},{zh:'規格範圍、使用的服務、海外 12 層架構。',en:'Spec scope, services used, the overseas 12-layer plan.'}],
    growth:['i-trend',{zh:'成長策略',en:'Go-to-market'},{zh:'借創作者粉絲、等級制度、防跳平台。',en:'Borrow creator audiences, reward tiers, keep deals on-platform.'}],
    brand:['i-heart',{zh:'品牌',en:'Brand'},{zh:'名字呼應 OnlyFans；7 月定案粉色 OU 標誌。',en:'A nod to OnlyFans; pink OU mark settled in July.'}],
    files:['i-deck',{zh:'原始檔案',en:'Original files'},{zh:'提案簡報、平台規格、13 個台灣版頁面。',en:'Pitch deck, platform spec, 13 Taiwan-facing pages.'}],
    ending:['i-flag',{zh:'結局與反思',en:'What happened'},{zh:'法規與金流、數據、團隊三道牆與三個教訓。',en:'Three walls and three lessons.'}],
    founder:['i-user',{zh:'創辦人',en:'Founder'},{zh:'九種職能一手統籌；正在找下一個題目。',en:'Nine functions run end to end; looking for what\'s next.'}]
  };
  var CASE_ORDER=['overview','timeline','versions','market','product','model','trust','tech','growth','brand','files','ending','founder'];
  var CASE_GROUPS=[[{zh:'故事',en:'THE STORY'},['overview','timeline','versions','ending']],[{zh:'商業',en:'THE BUSINESS'},['market','model','growth','brand']],[{zh:'產品與技術',en:'PRODUCT & TECH'},['product','trust','tech']],[{zh:'人與成果',en:'PEOPLE & OUTPUT'},['founder','files']]];
  var FIDL={o:{zh:'原站樣式',en:'Original styles'},s:{zh:'依原始規格',en:'From the spec'}};

  /* ---------- 作品集內容 ---------- */
  var TL=[
    ['c',{zh:'2026.03',en:'Mar 2026'},{zh:'合資協議與設立委託',en:'Joint-venture draft and incorporation'},{zh:'擬定合資協議草稿（3/25），委託辦理公司設立（3/27 付款）。',en:'Drafted the joint-venture agreement (25 Mar) and commissioned the incorporation (paid 27 Mar).'}],
    ['c',{zh:'2026.04.09',en:'9 Apr 2026'},{zh:'法律風險清單',en:'Legal risk list'},{zh:'列出猥褻、兒少、私密影像、洗錢、個資、金流申請等 10 項風險與對策。',en:'Ten risks and mitigations: obscenity, minors, intimate images, money laundering, personal data, payment approval and more.'}],
    ['c',{zh:'2026.04.13',en:'13 Apr 2026'},{zh:'公司名稱核准，完成設立',en:'Name approved, company incorporated'},{zh:'核准公司名稱與 10 項營業項目，隨後完成設立登記；四人股東協議定下股權、決策與退場機制。',en:'Company name and ten business lines approved, then fully incorporated; a four-person shareholder agreement set equity, decision rules and exits.'}],
    ['c',{zh:'2026.04.28',en:'28 Apr 2026'},{zh:'平台功能規格',en:'Platform spec'},{zh:'與開發方定義創作者平台：前台 19 頁、API 14 類、後台 27 個模組。',en:'Defined the creator platform with the dev team: 19 pages, 14 API groups, 27 admin modules.'}],
    ['c',{zh:'2026.05',en:'May 2026'},{zh:'提案簡報、雲端上線',en:'Pitch deck, cloud set up'},{zh:'完成 10 頁提案簡報（痛點、市場、競品、服務）；5 月起使用 AWS。',en:'A 10-page deck (problem, market, competitors, services); AWS from May.'}],
    ['t',{zh:'2026.06',en:'Jun 2026'},{zh:'網站原型與台灣對外定位',en:'Prototype and Taiwan-facing framing'},{zh:'onlyused.me 原型上線並逐頁檢討（6/30）；對外改以「二手女性衣物＋穿搭社群」呈現。',en:'The onlyused.me prototype went up and was reviewed page by page (30 Jun); publicly reframed as "pre-loved womenswear + outfit community".'}],
    ['t',{zh:'2026.07.07',en:'7 Jul 2026'},{zh:'為金流申請整理商業模式',en:'Business model for payment approval'},{zh:'10% 服務費（含金流費）、第三方代收、確認收貨後撥款。',en:'10% fee including payment costs, third-party collection, payout after delivery is confirmed.'}],
    ['t',{zh:'2026.07.15',en:'15 Jul 2026'},{zh:'改為平台不經手金流',en:'Platform stops handling payments'},{zh:'賣家月費 NT$89、0 抽成；完成 13 份台灣版指南、政策與規格頁。',en:'NT$89/month seller fee, 0% commission; 13 Taiwan-facing guides, policies and spec pages.'}],
    ['v',{zh:'2026.07 下旬 – 08',en:'Late Jul – Aug 2026'},{zh:'海外路線',en:'The overseas route'},{zh:'英國公司、成人金流、12 層架構；8/1 詢問 Segpay 以外的高風險金流商。',en:'A UK company, adult payment processing, a 12-layer plan; on 1 Aug, asked about high-risk processors beyond Segpay.'}],
    ['e',{zh:'2026.09',en:'Sep 2026'},{zh:'專案結束',en:'Wound down'},{zh:'受阻於法規、金流與數據，四位成員各自規劃下一步。',en:'Stopped by regulation, payments and data; the four founders moved on.'}]
  ];
  var TLTAG={c:['t2',{zh:'核心',en:'Core'}],t:['t1',{zh:'台灣對外',en:'Taiwan-facing'}],v:['t3',{zh:'海外',en:'Overseas'}],e:['t3',{zh:'結束',en:'Ended'}]};
  var VERS=[
    ['v1',{zh:'2026.03 – 05',en:'Mar – May 2026'},{zh:'核心：原味創作者平台',en:'Core: an adult-intimates creator platform'},[[{zh:'商品',en:'Goods'},{zh:'二手成人內衣物與周邊商品',en:'Pre-owned adult intimates and related goods'}],[{zh:'客群',en:'Audience'},{zh:'OnlyFans、X 創作者的粉絲',en:'Fans of OnlyFans and X creators'}],[{zh:'機制',en:'Mechanics'},{zh:'訂閱、付費解鎖、打賞、拍賣、平台代收＋月結分潤',en:'Subscriptions, paid unlocks, tips, auctions, platform collection + monthly payouts'}],[{zh:'風控',en:'Controls'},{zh:'實名 KYC、18+ 確認、出貨前後驗證',en:'ID verification, 18+ checks, proof before and after shipping'}]]],
    ['v2',{zh:'2026.06 – 07',en:'Jun – Jul 2026'},{zh:'台灣對外：二手女裝＋穿搭社群',en:'Taiwan-facing: pre-loved womenswear + outfits'},[[{zh:'商品',en:'Goods'},{zh:'一般二手女裝；明文禁售使用過的貼身衣物',en:'General pre-loved womenswear; used intimates explicitly banned'}],[{zh:'機制',en:'Mechanics'},{zh:'短影音穿搭、影片內商品直購',en:'Outfit videos with in-video shopping'}],[{zh:'收費',en:'Pricing'},{zh:'10% 服務費 → 賣家月費 NT$89、平台不經手金流',en:'10% fee → NT$89/month seller fee, no platform-held payments'}],[{zh:'產出',en:'Output'},{zh:'App 模擬畫面、13 份指南與政策頁',en:'App mockup, 13 guides and policy pages'}]]],
    ['v3',{zh:'2026.07 下旬 – 08（規劃，未執行）',en:'Late Jul – Aug 2026 (planned, not executed)'},{zh:'海外：成人垂直平台',en:'Overseas: an adult vertical platform'},[[{zh:'市場',en:'Market'},{zh:'美國＋英國為灘頭堡',en:'US + UK beachhead'}],[{zh:'主體',en:'Entity'},{zh:'英國有限公司',en:'A UK limited company'}],[{zh:'收費',en:'Pricing'},{zh:'賣家 0%＋買家保障費 20–25%',en:'0% seller + 20–25% buyer protection fee'}],[{zh:'信任',en:'Trust'},{zh:'托管、驗證、匿名寄件',en:'Escrow, verification, anonymous shipping'}]]]
  ];
  var PAIN=[
    [{zh:'交易零散、隱私風險高',en:'Scattered trades, high privacy risk'},{zh:'越來越多人在社群上購買這類商品，但二手交易散在 FB、PTT、X、Threads，隱私風險高。',en:'More people buy these goods on social media, but pre-owned trades are scattered across Facebook, PTT, X and Threads, with high privacy risk.'}],
    [{zh:'沒有私密、匿名、安全的環境',en:'No private, anonymous, safe place'},{zh:'衛生疑慮、身分曝光讓雙方不敢交易；沒有專屬平台；面交有人身安全問題。',en:'Hygiene worries and fear of exposure stop both sides; there is no dedicated platform; meeting in person is unsafe.'}],
    [{zh:'真實性無法保證',en:'No way to verify'},{zh:'無法確定收到的就是賣家出貨的那件，甚至遇到空盒詐騙；怕曝光只能認賠。',en:"Buyers can't be sure they got what was shipped — even empty-box scams — and fear of exposure means swallowing the loss."}]
  ];
  var FEAT=[
    ['i-user',{zh:'創作者頁與四層可見性',en:'Creator pages, four visibility levels'},{zh:'公開、僅訂閱者、特定方案、付費解鎖；追蹤、訂閱、打賞、私訊、檢舉。',en:'Public, subscribers-only, specific plan, paid unlock; follow, subscribe, tip, message, report.'}],
    ['i-gavel',{zh:'即時競標拍賣',en:'Live auctions'},{zh:'起標價、最低加價、倒數與即時推播；結標自動建立訂單。',en:'Starting price, minimum raise, countdown and live alerts; the winning bid becomes an order automatically.'}],
    ['i-msg',{zh:'私訊與付費內容',en:'Messages and paid content'},{zh:'付費解鎖訊息、對話內打賞、封鎖與檢舉。',en:'Paid-unlock messages, in-chat tips, block and report.'}],
    ['i-receipt',{zh:'訂單與爭議',en:'Orders and disputes'},{zh:'送達後 7 天自動完成；7 天內可發起爭議，協商不成由平台仲裁。',en:'Auto-complete 7 days after delivery; disputes within 7 days, with platform arbitration if needed.'}],
    ['i-shield',{zh:'實名審核 KYC',en:'ID verification (KYC)'},{zh:'證件正反面＋自拍照人工審核，敏感資料獨立權限。',en:'ID front/back plus a selfie, reviewed by hand; sensitive data behind separate permissions.'}],
    ['i-coins',{zh:'月結分潤',en:'Monthly revenue share'},{zh:'訂閱、商品、拍賣、打賞、付費解鎖分別設定抽成，每月結算撥款。',en:'Separate commission for subscriptions, goods, auctions, tips and paid unlocks, settled monthly.'}]
  ];
  var FLOW=[
    [{zh:'買家付款',en:'Buyer pays'},{zh:'信用卡、ATM、超商代收',en:'Card, ATM or convenience store'}],
    [{zh:'平台統一收款',en:'Platform holds funds'},{zh:'款項先進平台帳戶，不直接給賣家',en:'Money goes to the platform, not the seller'}],
    [{zh:'出貨與驗證',en:'Ship and verify'},{zh:'出貨前後拍照或錄影',en:'Photos or video before and after'}],
    [{zh:'7 天自動完成',en:'7-day auto-complete'},{zh:'無爭議即完成；有爭議則仲裁',en:'Completes unless disputed; disputes go to arbitration'}],
    [{zh:'月結計算',en:'Monthly settlement'},{zh:'扣除退款、金流手續費、平台抽成',en:'Minus refunds, payment fees and commission'}],
    [{zh:'撥款給創作者',en:'Creator is paid'},{zh:'財務匯款並通知',en:'Transfer and notification'}]
  ];
  var MODEL=[
    [{zh:'2026/04 規格',en:'Apr 2026 spec'},{zh:'平台統一收款；訂閱、商品、拍賣、打賞、付費解鎖可分別設定抽成，月結扣抵。',en:'Platform collects everything; separate commission per type (subscriptions, goods, auctions, tips, paid unlocks), deducted monthly.'},'mid',{zh:'核心',en:'Core'}],
    [{zh:'2026/06–07 台灣',en:'Jun–Jul 2026 Taiwan'},{zh:'10% 服務費（2.5% 金流＋7.5% 服務費，含稅），第三方代收、確認收貨後撥款。',en:'A 10% fee (2.5% payment + 7.5% service, tax incl.), third-party collection, payout after confirmed delivery.'},'hi',{zh:'台灣對外',en:'Taiwan'}],
    [{zh:'2026/07/15 台灣',en:'15 Jul 2026 Taiwan'},{zh:'賣家月費 NT$89（前 14 天免費）、0 抽成、平台不經手金流。',en:'NT$89/month seller fee (14 days free), 0% commission, no platform-held payments.'},'hi',{zh:'台灣對外',en:'Taiwan'}],
    [{zh:'2026/07 下旬 海外',en:'Late Jul 2026 overseas'},{zh:'賣家 0% 抽成＋買家保障費 20–25%；有流動性後再疊加買家與賣家訂閱。',en:'0% seller commission + 20–25% buyer protection fee; subscriptions layered on once there is liquidity.'},'vlo',{zh:'海外規劃',en:'Overseas plan'}]
  ];
  var SOLVE=[
    [{zh:'法規',en:'Regulation'},{zh:'兒少剝削法、社會秩序維護法等——以實名驗證（拍照、身分驗證）處理。',en:'Child-exploitation and public-order laws — handled with real-name verification (photo and ID).'}],
    [{zh:'產品真實性',en:'Authenticity'},{zh:'賣家出貨前拍照或錄影，買家收貨後也上傳，確認沒問題才撥款。',en:'Sellers photograph or film before shipping, buyers upload after delivery; funds release once both match.'}],
    [{zh:'物流',en:'Logistics'},{zh:'暫定參照賣貨便方式，之後與專門的物流廠商合作。',en:"Initially modelled on 7-Eleven's seller shipping service, later a specialist logistics partner."}]
  ];
  var RISKS=[
    [{zh:'免責無效',en:'Disclaimers fail'},{zh:'聲明擋不住刑責',en:"A disclaimer won't stop criminal liability"},{zh:'登入彈窗 18+ 驗證＋勾選，Footer 輔助',en:'18+ pop-up with checkbox at sign-in, plus footer notice'}],
    [{zh:'兒少風險',en:'Minors'},{zh:'未成年買賣',en:'Minors buying or selling'},{zh:'信用卡／身分證雙驗證，兒少凍結通報',en:'Card + ID double check; freeze and report'}],
    [{zh:'私密影像',en:'Intimate images'},{zh:'未經同意的私密照',en:'Non-consensual intimate images'},{zh:'72 小時檢舉下架 SOP，影像 AI 掃描',en:'72-hour report-and-remove SOP, AI image scanning'}],
    [{zh:'假貨商標',en:'Counterfeits'},{zh:'販售仿冒品牌',en:'Selling fake brands'},{zh:'賣家真偽聲明，高風險品牌人工審',en:'Seller authenticity declaration; manual review for high-risk brands'}],
    [{zh:'消保退貨',en:'Returns'},{zh:'衛生不退的爭議',en:'Hygiene no-return disputes'},{zh:'下單前醒目標示「衛生自負無退貨」',en:'A prominent "no returns for hygiene" notice before ordering'}],
    [{zh:'洗錢金流',en:'Money laundering'},{zh:'小額高頻異常',en:'Small, frequent, unusual payments'},{zh:'KYC＋交易超過 3 萬人工審，拒絕代付',en:'KYC + manual review above NT$30,000; no third-party payments'}],
    [{zh:'個資洩漏',en:'Data leaks'},{zh:'高敏感資料',en:'Highly sensitive data'},{zh:'加密＋最小化蒐集，查刪機制',en:'Encryption, minimal collection, access-and-delete process'}],
    [{zh:'金流申請',en:'Payment approval'},{zh:'沒有交易紀錄會被拒',en:'Rejection without transaction history'},{zh:'先用籌備處帳戶＋收款連結累積 10 筆交易',en:'Use a pre-incorporation account and payment links to build 10 transactions first'}]
  ];
  var FEARS=[
    ['b',{zh:'被騙',en:'Getting scammed'},{zh:'付款托管＋爭議處理',en:'Escrow + dispute handling'}],
    ['b',{zh:'買到假貨',en:'Counterfeits'},{zh:'手寫紙條驗證照＋賣家驗證徽章',en:'Handwritten-note proof photos + verified badges'}],
    ['b',{zh:'被身邊的人發現',en:'Being found out'},{zh:'隱密帳單名稱＋低調包裝',en:'Discreet billing name + low-key packaging'}],
    ['s',{zh:'被起底',en:'Being doxxed'},{zh:'匿名寄件＋化名經營',en:'Anonymous shipping + pseudonymous shops'}],
    ['s',{zh:'錢被卡住',en:'Frozen funds'},{zh:'快速出款管道＋透明的出款時程',en:'Fast payout rails + transparent timing'}],
    ['s',{zh:'遇到奧客',en:'Time-wasters'},{zh:'買家也須驗證、封鎖檢舉、客製訂單先付款',en:'Verified buyers, block/report, custom orders paid upfront'}]
  ];
  var LAYERS=[
    [{zh:'網域與 DNS',en:'Domains & DNS'},{zh:'註冊商與 DNS 分開；備援網域、可拋棄短連結網域',en:'Registrar and DNS separate; backup and disposable short-link domains'},'hi',{zh:'低',en:'Low'},20],
    [{zh:'邊緣層',en:'Edge'},{zh:'CDN、WAF、擋機器人；網頁與媒體分開',en:'CDN, WAF, bot blocking; web and media split'},'mid',{zh:'中',en:'Medium'},45],
    [{zh:'前端',en:'Front end'},{zh:'伺服器端渲染、自架',en:'Server-rendered, self-hosted'},'hi',{zh:'低',en:'Low'},20],
    [{zh:'應用層 API',en:'Application API'},{zh:'成人友善主機，容器化方便搬遷',en:'Adult-friendly hosting, containerised'},'mid',{zh:'中',en:'Medium'},45],
    [{zh:'資料層',en:'Data'},{zh:'資料庫、快取、佇列；每日異地備份',en:'Database, cache, queues; daily off-site backups'},'mid',{zh:'中',en:'Medium'},45],
    [{zh:'媒體層',en:'Media'},{zh:'商品照與驗證照；搬遷最慢',en:'Product and proof photos; slowest to move'},'lo',{zh:'高',en:'High'},72],
    [{zh:'身分層',en:'Identity'},{zh:'第三方年齡驗證與 KYC；只存結果',en:'Third-party age checks and KYC; results only'},'mid',{zh:'中',en:'Medium'},45],
    [{zh:'金流層',en:'Payments'},{zh:'收單、托管、出款、加密；主備援事先開好',en:'Acquiring, escrow, payouts, crypto; backups ready in advance'},'vlo',{zh:'極高',en:'Critical'},100],
    [{zh:'物流層',en:'Logistics'},{zh:'匿名面單與追蹤；聚合商可替換',en:'Anonymous labels and tracking; swappable aggregators'},'hi',{zh:'低',en:'Low'},20],
    [{zh:'訊息層',en:'Messaging'},{zh:'SPF、DKIM、DMARC；交易信與行銷信分網域',en:'SPF, DKIM, DMARC; transactional and marketing mail split'},'lo',{zh:'高',en:'High'},72],
    [{zh:'觀測層',en:'Observability'},{zh:'錯誤追蹤與分析自架，不用 GA4',en:'Self-hosted error tracking and analytics; no GA4'},'hi',{zh:'低',en:'Low'},20],
    [{zh:'備援層',en:'Backup'},{zh:'第二家雲、離線備份、每季演練',en:'Second cloud, offline backups, quarterly drills'},'hi',{zh:'—',en:'—'},0]
  ];
  var RISKCOL={hi:'var(--ok)',mid:'var(--warn)',lo:'var(--bad)',vlo:'var(--deep)'};
  var ROLES=[
    [{zh:'公司設立與治理',en:'Company & governance'},{zh:'合資協議、公司名稱與營業項目預查、章程、四人股東協議（技術入股、僵局決策、禁售期、退場），完成台灣公司設立登記',en:'JV agreement, name and business-line approval, articles, a four-person shareholder agreement (tech equity, deadlock rules, lock-up, exits); fully incorporated in Taiwan'},{zh:'合資協議書、股東協議、公司章程、設立登記文件',en:'JV agreement, shareholder agreement, articles, incorporation filings'}],
    [{zh:'法遵與風險',en:'Compliance & risk'},{zh:'10 項法律風險清單、實名與 18+ 確認、KYC 與內容審核、商品規範與退款政策',en:'10-item legal risk list, ID and 18+ checks, KYC and moderation, product rules and refund policy'},{zh:'法律風險清單、商品規範、退款政策、KYC 與內容審核 SOP',en:'Risk list, product rules, refund policy, KYC & moderation SOP'}],
    [{zh:'產品規格',en:'Product spec'},{zh:'與開發方定義創作者平台規格；逐頁檢討網站原型',en:'Defined the creator-platform spec with the dev team; reviewed the prototype page by page'},{zh:'功能規格清單（19／14／27）、網站改動清單',en:'Feature spec (19/14/27), site change list'}],
    [{zh:'提案與市場',en:'Pitch & market'},{zh:'痛點、市場推估、競品研究與服務規劃',en:'Problem, market sizing, competitor research, service plan'},{zh:'10 頁提案簡報',en:'10-page pitch deck'}],
    [{zh:'品牌',en:'Brand'},{zh:'品牌策略、標語與對外語氣',en:'Brand strategy, tagline and voice'},{zh:'Logo、貼紙、平台介紹',en:'Logo, sticker, platform intro'}],
    [{zh:'行銷與成長',en:'Marketing & growth'},{zh:'台灣版行銷企劃與種子賣家招募；海外冷啟動與成長策略',en:'Taiwan marketing plans and seed-seller recruitment; overseas cold-start and growth strategy'},{zh:'廣告企劃、招募手冊、冷啟動計畫、海外成長策略',en:'Ad plan, recruitment playbook, cold-start plan, overseas growth strategy'}],
    [{zh:'金流與財務',en:'Payments & finance'},{zh:'金流申請用商業模式、營利模式比較、高風險金流商詢問、內帳金流模板',en:'Business model for payment approval, revenue-model comparison, high-risk processor outreach, internal ledger template'},{zh:'商業模式與交易規模預估、營利模式比較、金流商名單',en:'Business model & volume forecast, model comparison, processor shortlist'}],
    [{zh:'技術方向',en:'Technical direction'},{zh:'選用雲端與工具、訂定海外 12 層架構原則',en:'Chose cloud and tools; set the overseas 12-layer architecture rules'},{zh:'技術架構與系統串接總覽',en:'Architecture & systems overview'}],
    [{zh:'團隊協調',en:'Team coordination'},{zh:'四人分工與決策機制、會議與文件版本',en:'Four-person roles and decision rules, meetings and document versions'},{zh:'團隊工作規範、股東協議決策條款',en:'Team working norms, shareholder decision clauses'}]
  ];
  var GF=[{k:'all',zh:'全部',en:'All'},{k:'pitch',zh:'提案與規格',en:'Pitch & spec'},{k:'product',zh:'產品',en:'Product'},{k:'buyer',zh:'買家',en:'Buyers'},{k:'seller',zh:'賣家',en:'Sellers'},{k:'policy',zh:'政策',en:'Policies'},{k:'ops',zh:'營運',en:'Operations'}];
  var PAGES=[
    ['pitch','pages/deck.html',{zh:'提案簡報（2026/05）',en:'Pitch deck (May 2026)'},{zh:'定位、痛點、市場、競品與服務規劃，共 10 頁。',en:'Positioning, problem, market, competitors and services — 10 pages.'}],
    ['pitch','pages/spec.html',{zh:'創作者平台功能規格（2026/04/28）',en:'Creator platform spec (28 Apr 2026)'},{zh:'前台 19 頁、API 14 類、後台 27 模組，全文。',en:'19 pages, 14 API groups, 27 admin modules — full text.'}],
    ['product','pages/app-mockup.html',{zh:'App 模擬畫面',en:'App mockup'},{zh:'台灣對外版本的短影音穿搭介面。',en:'The Taiwan-facing outfit-video interface.'},0,1],
    ['buyer','pages/how-to-buy.html',{zh:'買家指南',en:'Buyer guide'},{zh:'購物流程、開箱檢查、自保守則。',en:'Purchase flow, unboxing checks, safety rules.'},0,1],
    ['buyer','pages/shipping-buyer.html',{zh:'包裹追蹤（範本）',en:'Parcel tracking (template)'},{zh:'寄件編號、進度條、取貨提醒。',en:'Tracking number, progress, pickup reminder.'},0,1],
    ['seller','pages/sell.html',{zh:'成為賣家',en:'Become a seller'},{zh:'招募頁：14 天免費、NT$89 月費、0 抽成。',en:'Recruitment: 14 days free, NT$89/month, 0% commission.'},0,1],
    ['seller','pages/seller-guide.html',{zh:'賣家新手指南',en:'Seller starter guide'},{zh:'從註冊到第一筆訂單的六步驟。',en:'Six steps from sign-up to first order.'},0,1],
    ['seller','pages/listing-tutorial.html',{zh:'賣家上架教學',en:'Listing tutorial'},{zh:'Reels 式直式 10 步驟。',en:'A vertical, Reels-style 10-step guide.'},0,1],
    ['seller','pages/pricing-guide.html',{zh:'定價指南',en:'Pricing guide'},{zh:'依成色建議售價與定價心法。',en:'Suggested prices by condition and tactics.'},0,1],
    ['seller','pages/packaging.html',{zh:'包裝寄送指南',en:'Packaging & shipping'},{zh:'出貨時限、包材、配送選項。',en:'Deadlines, materials, carriers.'},0,1],
    ['seller','pages/seller-safety.html',{zh:'賣家安全守則',en:'Seller safety rules'},{zh:'帳號安全、收款紀律、防詐騙。',en:'Account security, payment discipline, anti-fraud.'},0,1],
    ['policy','pages/product-rules.html',{zh:'商品規範',en:'Product rules'},{zh:'可售類別、四級成色、禁售清單。',en:'Categories, four condition grades, banned list.'},0,1],
    ['policy','pages/refund-policy.html',{zh:'退款政策',en:'Refund policy'},{zh:'平台角色、調解時程、詐欺處理。',en:'Platform role, mediation timeline, fraud handling.'},0,1],
    ['ops','pages/shipping-seller.html',{zh:'填寫寄件編號（範本）',en:'Enter tracking number (template)'},{zh:'選通路、填單號、二次確認。',en:'Carrier, number, confirmation.'},0,1],
    ['ops','pages/admin.html',{zh:'管理後台 Dashboard',en:'Admin dashboard'},{zh:'訂單、寄物、案件、KYC、審核、訂閱帳務。數字皆為示意。',en:'Orders, shipping, cases, KYC, review, subscriptions. All figures illustrative.'},1,1]
  ];

  /* ---------- 還原畫面的示意資料（中性名稱，不含露骨描述） ---------- */
  var C=[
    {h:'luna.closet',i:'L',col:'#E84D7A',st:{zh:'蕾絲與睡衣',en:'Lace & sleepwear'},fol:'1.2k',subs:86},
    {h:'mia_after9',i:'M',col:'#9B6EA8',st:{zh:'絲襪與襪類',en:'Hosiery'},fol:'860',subs:41},
    {h:'sora.room',i:'S',col:'#E8765A',st:{zh:'運動系',en:'Activewear'},fol:'640',subs:22},
    {h:'velvet.ivy',i:'V',col:'#C45B7C',st:{zh:'復古內著',en:'Vintage intimates'},fol:'2.3k',subs:137},
    {h:'noa.daily',i:'N',col:'#4E97B8',st:{zh:'日常棉質',en:'Everyday cotton'},fol:'410',subs:15},
    {h:'kiki_lace',i:'K',col:'#C98A3E',st:{zh:'客製訂單',en:'Custom orders'},fol:'1.8k',subs:94}
  ];
  var CATS=[{k:'all',zh:'全部',en:'All'},{k:'intimates',zh:'內著',en:'Intimates'},{k:'hosiery',zh:'襪類',en:'Hosiery'},{k:'sleep',zh:'睡衣',en:'Sleepwear'},{k:'active',zh:'運動',en:'Activewear'}];
  var P=[
    {id:'p1',n:{zh:'蕾絲內衣套組',en:'Lace lingerie set'},p:1280,cat:'intimates',by:'luna.closet',e:'🎀',g:['#FFD6E0','#F4A6BC']},
    {id:'p2',n:{zh:'黑色絲襪',en:'Black stockings'},p:480,cat:'hosiery',by:'mia_after9',e:'🧦',g:['#E4DEEA','#A99BB8']},
    {id:'p3',n:{zh:'運動內衣',en:'Sports bra'},p:650,cat:'active',by:'sora.room',e:'🩱',g:['#FFE3D6','#F2B08F']},
    {id:'p4',n:{zh:'緞面睡衣',en:'Satin sleepwear'},p:980,cat:'sleep',by:'velvet.ivy',e:'👚',g:['#F3E1EA','#D7A3BC']},
    {id:'p5',n:{zh:'棉質內著組',en:'Cotton everyday set'},p:560,cat:'intimates',by:'noa.daily',e:'🩲',g:['#DCEAF5','#9DC1DE']},
    {id:'p6',n:{zh:'及膝襪',en:'Knee-high socks'},p:320,cat:'hosiery',by:'kiki_lace',e:'🧦',g:['#F7EBD9','#E2BE8A']}
  ];
  var now=Date.now();
  var A=[
    {id:'a1',n:{zh:'限量蕾絲睡衣・附親筆卡',en:'Limited lace nightwear, signed card'},by:'luna.closet',start:800,inc:50,end:now+(2*3600+14*60)*1000,e:'🎀',g:['#3B1426','#1A0A12'],bids:[['b***y',1350],['r***o',1300],['k***2',1150],['m***n',950]]},
    {id:'a2',n:{zh:'復古絲襪三件組',en:'Vintage hosiery trio'},by:'velvet.ivy',start:300,inc:30,end:now+38*60*1000,e:'🧦',g:['#2A1A33','#110A16'],bids:[['j***e',540],['t***a',480],['s***7',390]]},
    {id:'a3',n:{zh:'客製款・創作者挑選',en:'Custom piece, creator\'s pick'},by:'kiki_lace',start:500,inc:50,end:now+(5*3600+2*60)*1000,e:'🎁',g:['#33200F','#140B05'],bids:[['a***i',650],['w***n',550]]}
  ];
  var TIERS=[
    [{zh:'基本',en:'Basic'},150,{zh:'/ 月',en:'/ month'},[{zh:'訂閱者限定貼文',en:'Subscriber-only posts'},{zh:'新品搶先看',en:'Early look at new drops'}],0],
    [{zh:'進階',en:'Plus'},399,{zh:'/ 季',en:'/ quarter'},[{zh:'基本方案全部內容',en:'Everything in Basic'},{zh:'客製訂單優先',en:'Priority custom orders'},{zh:'私訊優先回覆',en:'Priority replies'}],1],
    [{zh:'典藏',en:'Collector'},1299,{zh:'/ 年',en:'/ year'},[{zh:'進階方案全部內容',en:'Everything in Plus'},{zh:'會員限定拍賣',en:'Members-only auctions'}],0]
  ];
  var POSTS=[
    {id:'f1',by:'luna.closet',type:'general',d:{zh:'新一批蕾絲系列整理好了，週五上架 ✨',en:'The new lace pieces are sorted — listing Friday ✨'},lk:'1.1k',cm:'64',bg:['#3B1426','#0A0A0A'],e:'🎀'},
    {id:'f2',by:'mia_after9',type:'product',pid:'p2',d:{zh:'黑色絲襪回歸，附出貨驗證照 🖤',en:'Black stockings are back, with proof photos 🖤'},lk:'742',cm:'31',bg:['#241B33','#0A0A10'],e:'🧦'},
    {id:'f3',by:'velvet.ivy',type:'auction',aid:'a2',d:{zh:'三件組拍賣倒數中，最低加價 NT$30',en:'Trio auction closing soon — minimum raise NT$30'},lk:'1.9k',cm:'122',bg:['#2A1A33','#110A16'],e:'🧦'},
    {id:'f4',by:'sora.room',type:'subs',d:{zh:'訂閱者限定：本週穿搭與新品預告',en:'Subscribers only: this week\'s looks and a preview'},lk:'388',cm:'19',bg:['#33200F','#0A0806'],e:'🩱',price:150},
    {id:'f5',by:'kiki_lace',type:'unlock',d:{zh:'客製款式與報價表',en:'Custom options and price list'},lk:'905',cm:'57',bg:['#3B1426','#0A0A0A'],e:'🎁',price:60}
  ];
  var THREADS=[
    {h:'kiki_lace',msgs:[
      {f:'me',t:{zh:'想問可以客製嗎？',en:'Do you take custom orders?'}},
      {f:'them',t:{zh:'可以～細節我整理在付費訊息裡，解鎖後可以看',en:"Yes — I've put the details in a paid message you can unlock."}},
      {f:'lock',price:90,t:{zh:'客製方案與報價',en:'Custom options & pricing'},full:{zh:'款式 A／B／C・7 天內出貨・附出貨驗證照',en:'Styles A/B/C · ships within 7 days · proof photos included'}},
      {f:'me',t:{zh:'可以加 LINE 比較快嗎？',en:'Can I add you on LINE? It\'s faster.'}},
      {f:'warn',t:{zh:'偵測到站外聯絡方式。為保障雙方，請在站內完成交易——站外交易不受平台保障。',en:"Off-platform contact detected. To stay protected, please complete the deal here — off-platform deals aren't covered."}},
      {f:'them',t:{zh:'我們就在這邊聊吧 😊',en:"Let's keep it here 😊"}}]},
    {h:'luna.closet',msgs:[
      {f:'them',t:{zh:'謝謝你訂閱基本方案！週五新品會先在訂閱者限定貼文公開。',en:'Thanks for subscribing to Basic! Friday\'s new pieces go to subscriber-only posts first.'}}]},
    {h:'velvet.ivy',msgs:[
      {f:'sys',t:{zh:'你以 NT$540 得標《復古絲襪三件組》，系統已自動建立訂單並通知付款。',en:'You won "Vintage hosiery trio" at NT$540. An order was created automatically and you\'ve been asked to pay.'}},
      {f:'them',t:{zh:'恭喜得標！出貨前會拍照上傳給你確認 🙏',en:'Congrats! I\'ll upload photos for you before shipping 🙏'}}]}
  ];

  /* ---------- 狀態 ---------- */
  var saved={p1:1,p4:1}, followed={'luna.closet':1}, subscribed={'luna.closet':0}, liked={}, unlocked={};
  var cart=['p1','p2'], mktCat='all', mktQ='', slide=0, thread=0, gFilter='all', pickC='luna.closet', pickA='a1', ageOK=false;
  var myBids={};
  function byId(id){ for(var i=0;i<P.length;i++){ if(P[i].id===id) return P[i]; } }
  function auc(id){ for(var i=0;i<A.length;i++){ if(A[i].id===id) return A[i]; } }
  function cr(h){ for(var i=0;i<C.length;i++){ if(C[i].h===h) return C[i]; } return {h:h,i:h.charAt(0).toUpperCase(),col:'#C45B7C',st:{zh:'',en:''}}; }
  function av(h,s){ var c=cr(h); return '<span class="av" style="background:'+c.col+(s?';width:'+s+'px;height:'+s+'px':'')+'">'+esc(c.i)+'</span>'; }
  function grad(g){ return 'background:linear-gradient(160deg,'+g[0]+','+g[1]+')'; }
  function top(a){ return a.bids.length?a.bids[0][1]:a.start; }
  function fmtLeft(ms){ if(ms<=0) return T('已結標','Ended'); var s=Math.floor(ms/1000),h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60; return (h<10?'0':'')+h+':'+(m<10?'0':'')+m+':'+(x<10?'0':'')+x; }

  /* ---------- 元件 ---------- */
  function tile(p){
    return '<article class="tile"><div class="tile-img" style="'+grad(p.g)+'"><span class="cond c-like">'+T('附驗證照','Proof photos')+'</span>'+
      '<button class="save'+(saved[p.id]?' on':'')+'" data-save="'+p.id+'" aria-pressed="'+(saved[p.id]?'true':'false')+'" aria-label="'+T('收藏','Save')+'">'+icon('i-heart')+'</button><span aria-hidden="true">'+p.e+'</span></div>'+
      '<div class="tile-body"><h4>'+esc(L(p.n))+'</h4><span class="tile-meta">@'+esc(p.by)+'</span>'+
      '<div class="tile-foot"><span class="price">'+nt(p.p)+'</span><button class="add" data-add="'+p.id+'">'+T('加入購物車','Add to cart')+'</button></div></div></article>';
  }
  function aucCard(a){
    return '<article class="auc"><div class="auc-img" style="'+grad(a.g)+'"><span class="live"><i></i>'+T('競標中','LIVE')+'</span><span aria-hidden="true">'+a.e+'</span></div>'+
      '<div class="auc-b"><h4>'+esc(L(a.n))+'</h4><span class="tile-meta">@'+esc(a.by)+'</span>'+
      '<div class="auc-row"><span>'+T('目前最高','Top bid')+'</span><b>'+nt(top(a))+'</b></div>'+
      '<div class="auc-row"><span>'+T('剩餘','Ends in')+'</span><span class="cd" data-end="'+a.end+'">'+fmtLeft(a.end-Date.now())+'</span></div>'+
      '<button class="btn btn-dark" data-pickauc="'+a.id+'">'+T('查看並出價','View & bid')+'</button></div></article>';
  }
  function creatorCard(c){
    return '<article class="creator"><div class="creator-cover" style="background:linear-gradient(135deg,'+c.col+'55,'+c.col+'22)"></div>'+av(c.h)+
      '<h4>@'+esc(c.h)+'</h4><span class="sub">'+c.fol+T(' 追蹤 · ',' followers · ')+c.subs+T(' 訂閱',' subscribers')+'</span><span class="style-chip">'+esc(L(c.st))+'</span>'+
      '<div class="row-btns" style="justify-content:center"><button class="follow'+(followed[c.h]?' on':'')+'" data-follow="'+esc(c.h)+'">'+(followed[c.h]?T('已追蹤','Following'):T('追蹤','Follow'))+'</button><button class="btn btn-line" data-pickc="'+esc(c.h)+'">'+T('看頁面','View')+'</button></div></article>';
  }
  function lockMask(price,kind){
    var txt=kind==='subs'?T('僅訂閱者可見','Subscribers only'):T('付費解鎖','Paid unlock');
    var btn=kind==='subs'?T('訂閱 NT$'+price+' / 月','Subscribe NT$'+price+'/mo'):T('解鎖 NT$'+price,'Unlock NT$'+price);
    return '<div class="lock-mask"><span class="lock-ic">'+icon('i-lock')+'</span><b>'+txt+'</b><button class="btn btn-pink js-demo">'+btn+'</button></div>';
  }
  function postCard(po){
    var c=cr(po.by), vis='', media='', extra='';
    if(po.type==='subs'){ vis='<span class="vis">'+icon('i-lock')+T('僅訂閱者','Subscribers only')+'</span>'; }
    if(po.type==='unlock'){ vis='<span class="vis">'+icon('i-lock')+T('付費解鎖','Paid unlock')+'</span>'; }
    var locked=(po.type==='subs'||po.type==='unlock')&&!unlocked[po.id];
    media='<div class="post-media lockwrap" style="background:radial-gradient(circle at 70% 20%,'+po.bg[0]+',transparent 60%),'+po.bg[1]+'"><span aria-hidden="true" style="position:relative;z-index:1;opacity:.9">'+po.e+'</span>'+(locked?lockMask(po.price,po.type):'')+'</div>';
    if(po.type==='product'){ var p=byId(po.pid); extra='<div class="post-prods"><div class="mini"><div class="mini-img" style="'+grad(p.g)+'">'+p.e+'<b>'+nt(p.p)+'</b></div><div class="mini-b"><span>'+esc(L(p.n))+'</span><button data-add="'+p.id+'">'+T('購買','Buy')+'</button></div></div></div>'; }
    if(po.type==='auction'){ var a=auc(po.aid); extra='<div style="padding:0 16px 14px">'+aucCard(a)+'</div>'; }
    return '<article class="post"><div class="post-head">'+av(po.by)+'<div><div class="who-name">'+esc(po.by)+'</div><div class="who-sub">'+esc(L(c.st))+'</div></div>'+vis+
      '<button class="follow'+(followed[po.by]?' on':'')+'" data-follow="'+esc(po.by)+'">'+(followed[po.by]?T('已追蹤','Following'):T('追蹤','Follow'))+'</button></div>'+media+
      '<div class="post-actions"><button class="act'+(liked[po.id]?' on':'')+'" data-like="'+po.id+'">'+icon('i-heart')+po.lk+'</button><span class="act">'+icon('i-chat')+po.cm+'</span><button class="act js-demo">'+icon('i-gift')+T('打賞','Tip')+'</button></div>'+
      '<p class="post-cap"><b>'+esc(po.by)+'</b> '+esc(L(po.d))+'</p>'+extra+'</article>';
  }

  /* ---------- 還原畫面 ---------- */
  var SLIDES=[
    {k:'CREATOR COMMERCE',h:{zh:'私密、匿名、<br>安全的交易環境',en:'Private, anonymous<br>and safe to trade'},p:{zh:'把散落在社群與私訊裡的二手交易，搬進有驗證、有代收款的平台。',en:'Moving trades scattered across social feeds and DMs onto a platform with verification and held payments.'},a:[[{zh:'看創作者',en:'Meet creators'},'#/creators','primary'],[{zh:'逛市集',en:'Browse'},'#/marketplace','secondary']],label:{zh:'luna.closet · 蕾絲與睡衣',en:'luna.closet · Lace & sleepwear'},art:[['#3B1426','🎀'],['#2A1A33','🧦'],['#33200F','👚']]},
    {k:'FOR CREATORS',h:{zh:'訂閱、打賞、<br>拍賣，一站變現',en:'Subscriptions, tips,<br>auctions — one place'},p:{zh:'創作者頁整合訂閱方案、付費解鎖與即時競標，每月結算撥款。',en:'Creator pages bring subscription plans, paid unlocks and live auctions together, paid out monthly.'},a:[[{zh:'看拍賣',en:'See auctions'},'#/auctions','primary'],[{zh:'看訂閱方案',en:'See plans'},'#/creators','secondary']],label:{zh:'velvet.ivy · 拍賣倒數中',en:'velvet.ivy · auction closing'},art:[['#2E1420','🎁'],['#3A1830','🎀'],['#1F1A2E','🧦']]},
    {k:'TRUST',h:{zh:'出貨前後<br>都有驗證',en:'Verified before<br>and after shipping'},p:{zh:'賣家出貨前、買家收貨後都拍照或錄影上傳，確認沒問題才撥款。',en:'Sellers upload photos or video before shipping, buyers after delivery — funds release once both check out.'},a:[[{zh:'看信任機制',en:'How trust works'},'#/case/trust','primary'],[{zh:'看訂單流程',en:'See an order'},'#/orders','secondary']],label:{zh:'18+ · 實名驗證',en:'18+ · verified sellers'},art:[['#241B33','🛡'],['#3B1426','📦'],['#1A2A22','✅']]}
  ];
  function renderSlide(){
    var s=SLIDES[slide];
    var acts=s.a.map(function(b){ return '<a class="mh-btn '+b[2]+'" href="'+b[1]+'">'+esc(L(b[0]))+'</a>'; }).join('');
    var c=document.getElementById('mhCopy'); c.className=''; void c.offsetWidth; c.className='mh-slide';
    c.innerHTML='<div class="mh-kicker">'+s.k+'</div><h1>'+L(s.h)+'</h1><p>'+esc(L(s.p))+'</p><div class="mh-actions">'+acts+'</div>';
    document.getElementById('mhArt').innerHTML=s.art.map(function(a){ return '<div class="pc" style="background:linear-gradient(160deg,'+a[0]+',#0C080C)">'+a[1]+'</div>'; }).join('');
    document.getElementById('mhLabel').textContent=L(s.label);
    document.getElementById('mhDots').innerHTML=SLIDES.map(function(_,i){ return '<button role="tab" aria-current="'+(i===slide)+'" aria-label="'+(i+1)+'" data-slide="'+i+'"></button>'; }).join('');
  }
  function renderHome(){ renderSlide(); document.getElementById('homeCreators').innerHTML=C.slice(0,5).map(creatorCard).join(''); document.getElementById('homeAuctions').innerHTML=A.map(aucCard).join(''); document.getElementById('homeProducts').innerHTML=P.slice(0,4).map(tile).join(''); }
  function renderFeed(){ document.getElementById('feedList').innerHTML=POSTS.map(postCard).join(''); }
  function renderCreators(){
    var c=cr(pickC), sub=subscribed[c.h];
    var tiers=TIERS.map(function(t,i){ return '<div class="tier'+(t[4]?' hi':'')+'"><b>'+esc(L(t[0]))+'</b><span class="p">'+nt(t[1])+' <small>'+L(t[2])+'</small></span><ul class="list">'+t[3].map(function(x){ return '<li>'+esc(L(x))+'</li>'; }).join('')+'</ul><button class="btn '+(sub===i+1?'btn-line':'btn-dark')+'" data-sub="'+i+'">'+(sub===i+1?T('訂閱中','Subscribed'):T('訂閱','Subscribe'))+'</button></div>'; }).join('');
    var posts=POSTS.filter(function(p){ return p.by===c.h; });
    document.getElementById('creatorProfile').innerHTML='<div class="profile">'+av(c.h,84)+'<div><h2 style="font-size:1.5rem">@'+esc(c.h)+'</h2><span class="style-chip">'+esc(L(c.st))+'</span><div class="pstats"><span><b>'+c.fol+'</b> '+T('追蹤','followers')+'</span><span><b>'+c.subs+'</b> '+T('訂閱','subscribers')+'</span></div>'+
      '<div class="pacts"><button class="follow'+(followed[c.h]?' on':'')+'" data-follow="'+esc(c.h)+'">'+(followed[c.h]?T('已追蹤','Following'):T('追蹤','Follow'))+'</button><button class="btn btn-line js-demo">'+icon('i-gift')+T('打賞','Tip')+'</button><a class="btn btn-line" href="#/messages">'+icon('i-msg')+T('私訊','Message')+'</a><button class="btn btn-line js-demo">'+T('檢舉','Report')+'</button></div></div></div>'+
      '<div class="sec-head"><h2>'+T('訂閱方案（示意價格）','Subscription plans (sample prices)')+'</h2></div><div class="tiers">'+tiers+'</div>'+
      (posts.length?'<div class="feed">'+posts.map(postCard).join('')+'</div>':'');
    document.getElementById('creatorGrid').innerHTML=C.map(creatorCard).join('');
  }
  function renderMarket(){
    var bar=CATS.map(function(c){ return '<button class="fchip" data-cat="'+c.k+'" aria-pressed="'+(mktCat===c.k)+'">'+esc(L(c))+'</button>'; }).join('');
    if(mktQ) bar+='<button class="qchip" data-clearq="1">'+T('搜尋：','Search: ')+esc(mktQ)+' ✕</button>';
    document.getElementById('catBar').innerHTML=bar;
    var list=P.filter(function(p){ return (mktCat==='all'||p.cat===mktCat)&&(!mktQ||match(p,mktQ)); });
    document.getElementById('mktGrid').innerHTML=list.length?list.map(tile).join(''):'<div class="empty">'+T('這個條件下沒有商品。','No pieces match.')+'</div>';
  }
  function renderAuctions(){
    var a=auc(pickA), t=top(a), minNext=t+a.inc, ended=a.end<=Date.now();
    document.getElementById('aucDetail').innerHTML='<div class="bid-panel"><div class="auc"><div class="auc-img" style="'+grad(a.g)+';aspect-ratio:16/9"><span class="live"><i></i>'+T('競標中','LIVE')+'</span><span aria-hidden="true">'+a.e+'</span></div>'+
      '<div class="auc-b"><h4 style="font-size:1.2rem">'+esc(L(a.n))+'</h4><a class="tile-meta" href="#/creators" data-pickc="'+esc(a.by)+'">@'+esc(a.by)+'</a>'+
      '<div class="auc-row"><span>'+T('起標價','Starting price')+'</span><span>'+nt(a.start)+'</span></div><div class="auc-row"><span>'+T('每次最低加價','Minimum raise')+'</span><span>'+nt(a.inc)+'</span></div>'+
      '<div class="auc-row"><span>'+T('目前最高','Top bid')+'</span><b>'+nt(t)+'</b></div><div class="auc-row"><span>'+T('剩餘時間','Time left')+'</span><span class="cd" data-end="'+a.end+'">'+fmtLeft(a.end-Date.now())+'</span></div></div></div>'+
      '<div class="panel"><h3>'+T('出價','Place a bid')+'</h3><form class="bid-form" id="bidForm"><label class="sr" for="bidIn">bid</label><input id="bidIn" type="number" inputmode="numeric" min="'+minNext+'" step="'+a.inc+'" value="'+minNext+'"'+(ended?' disabled':'')+' /><button class="btn btn-dark" type="submit"'+(ended?' disabled':'')+'>'+T('出價','Bid')+'</button></form>'+
      '<p class="muted">'+T('最低可出價 ','Minimum bid ')+nt(minNext)+T('（目前最高價＋最低加價）。規格：未完成 KYC 不可出價、結標後自動建立訂單。','(top bid + minimum raise). Per the spec: no bidding without KYC; the winner\'s order is created automatically.')+'</p>'+
      '<h3>'+T('出價紀錄','Bid history')+'</h3><ul class="bids">'+a.bids.map(function(b){ return '<li'+(b[0]===T('你','You')||b[2]?' class="me"':'')+'><span>'+esc(b[2]?T('你','You'):b[0])+'</span><b>'+nt(b[1])+'</b></li>'; }).join('')+'</ul></div></div>';
    document.getElementById('aucGrid').innerHTML=A.map(aucCard).join('');
  }
  function renderCloset(){
    var sv=P.filter(function(p){ return saved[p.id]; });
    var subs=Object.keys(subscribed).filter(function(h){ return subscribed[h]; });
    document.getElementById('nSaved').textContent=sv.length;
    document.getElementById('nSubs').textContent=subs.length;
    document.getElementById('subList').innerHTML=subs.length?subs.map(function(h){ var t=TIERS[subscribed[h]-1]; return '<div class="split-row"><span>'+av(h,24)+' @'+esc(h)+' · '+esc(L(t[0]))+'</span><b>'+nt(t[1])+' '+L(t[2])+'</b></div>'; }).join('')+'<p class="muted">'+T('綁卡自動續訂，可隨時取消，到期後失效（規格 §16）。','Auto-renews on a saved card; cancel anytime, access ends at expiry (spec §16).')+'</p>':'<p class="muted">'+T('還沒有訂閱。到創作者頁選一個方案。','No subscriptions yet — pick a plan on a creator page.')+'</p>';
    document.getElementById('closetGrid').innerHTML=sv.length?sv.map(tile).join(''):'<div class="empty">'+T('還沒有收藏。','Nothing saved yet.')+'</div>';
  }
  function renderCart(){
    var n=cart.length, b=document.getElementById('cartBadge');
    if(b){ b.textContent=n; b.style.display=n?'':'none'; }
    document.getElementById('cartTitle').innerHTML=zh()?'購物車 <span>'+n+'</span> 件':'Cart <span>'+n+'</span> '+(n===1?'item':'items');
    var groups={}; cart.forEach(function(id){ var p=byId(id); (groups[p.by]=groups[p.by]||[]).push(p); });
    var sellers=Object.keys(groups);
    document.getElementById('cartList').innerHTML=sellers.length?sellers.map(function(h){
      return '<div class="cart-seller"><header>'+av(h)+'@'+esc(h)+'</header>'+groups[h].map(function(p){ return '<div class="cart-item"><div class="cart-thumb" style="'+grad(p.g)+'">'+p.e+'</div><div><h4>'+esc(L(p.n))+'</h4><span class="proof">✓ '+T('附出貨驗證照','Proof photos at shipping')+'</span><div class="price">'+nt(p.p)+'</div></div><button class="x" data-remove="'+p.id+'" aria-label="'+T('移除','Remove')+'">'+icon('i-x')+'</button></div>'; }).join('')+'</div>';
    }).join(''):'<div class="empty">'+T('購物車是空的。','Your cart is empty.')+' <a href="#/marketplace">'+T('去逛市集 →','Browse →')+'</a></div>';
    var sub=cart.reduce(function(s,id){ return s+byId(id).p; },0), ship=sellers.length*60, total=sub+ship;
    document.getElementById('cartSummary').innerHTML=
      '<div class="split"><span class="tile-meta">'+T('配送方式','Delivery')+'</span><b>'+T('超商寄件（參照賣貨便）','Convenience-store shipping')+'</b></div>'+
      '<div class="split"><span class="tile-meta">'+T('付款方式','Payment')+'</span><div class="chipbar"><button class="fchip" aria-pressed="true">'+T('信用卡','Card')+'</button><button class="fchip" aria-pressed="false">ATM</button><button class="fchip" aria-pressed="false">'+T('超商代收','Store pay')+'</button></div></div>'+
      '<div class="split"><span class="tile-meta">'+T('發票','Invoice')+'</span><div class="chipbar"><button class="fchip" aria-pressed="true">'+T('個人二聯','Personal')+'</button><button class="fchip" aria-pressed="false">'+T('公司三聯','Company')+'</button><button class="fchip" aria-pressed="false">'+T('捐贈','Donate')+'</button></div></div>'+
      '<div class="row"><span>'+T('商品金額','Items')+'</span><b>'+nt(sub)+'</b></div>'+
      '<div class="row"><span>'+T('運費（示意）','Shipping (sample)')+'</span><b>'+nt(ship)+'</b></div>'+
      '<div class="row"><span>'+T('優惠券折抵','Coupon')+'</span><b>NT$0</b></div>'+
      '<div class="row total"><span>'+T('應付總額','Total')+'</span><b>'+nt(total)+'</b></div>'+
      '<div class="countdown-note">'+T('款項先由平台代收；確認收貨或送達 7 天內無爭議後，才撥款給賣家。買家端不顯示平台抽成。','Payment is held by the platform and released after you confirm receipt or 7 days pass without a dispute. Buyers never see the platform commission.')+'</div>'+
      '<button class="btn-block js-demo"'+(n?'':' disabled')+'>'+T('送出訂單並付款','Place order and pay')+'</button>';
  }
  function renderOrders(){
    var labs=[{zh:'待付款',en:'Unpaid'},{zh:'已付款',en:'Paid'},{zh:'備貨中',en:'Preparing'},{zh:'已出貨',en:'Shipped'},{zh:'已送達',en:'Delivered'},{zh:'已完成',en:'Completed'}];
    function prog(cur){ return '<div class="prog">'+labs.map(function(l,i){ var cls=i<cur?'':(i===cur?'cur':'todo'); return '<div class="pstep '+cls+'"><div class="pdot">'+(cls===''?'✓':(i+1))+'</div><div class="plab">'+L(l)+'</div></div>'; }).join('')+'</div>'; }
    var p1=byId('p1'), p5=byId('p5'), a2=auc('a2');
    var gross=p5.p, fee=Math.round(gross*0.025), svc=Math.round(gross*0.075), net=gross-fee-svc;
    document.getElementById('orderList').innerHTML=
      '<article class="order"><div class="order-head"><span class="order-no">#OU-000123 · '+T('買家視角','Buyer view')+'</span><span class="st ship">'+T('已送達','Delivered')+'</span></div>'+
      '<div class="order-item"><div class="cart-thumb" style="'+grad(p1.g)+'">'+p1.e+'</div><div><h4>'+esc(L(p1.n))+'</h4><span class="tile-meta">@'+esc(p1.by)+' · '+T('信用卡（平台代收）','Card (held by platform)')+'</span></div><span class="price">'+nt(p1.p)+'</span></div>'+prog(4)+
      '<div class="countdown-note">'+T('5 天後自動完成。7 天內如有問題可發起爭議，完成前款項不會撥給賣家。','Auto-completes in 5 days. You can open a dispute within 7 days; the seller isn\'t paid until then.')+'</div>'+
      '<div class="row-btns"><button class="btn btn-dark js-demo">'+T('確認收貨','Confirm receipt')+'</button><button class="btn btn-line js-demo">'+T('上傳收貨驗證照','Upload receipt photos')+'</button><button class="btn btn-line js-demo">'+T('發起爭議','Open a dispute')+'</button></div></article>'+
      '<article class="order"><div class="order-head"><span class="order-no">#OU-000118 · '+T('賣家視角','Seller view')+'</span><span class="st ship">'+T('已完成','Completed')+'</span></div>'+
      '<div class="order-item"><div class="cart-thumb" style="'+grad(p5.g)+'">'+p5.e+'</div><div><h4>'+esc(L(p5.n))+'</h4><span class="tile-meta">@'+esc(p5.by)+'</span></div><span class="price">'+nt(gross)+'</span></div>'+
      '<div class="split"><div class="split-row"><span>'+T('買家付款總額','Buyer paid')+'</span><b>'+nt(gross)+'</b></div><div class="split-row"><span>'+T('金流手續費 2.5%','Payment fee 2.5%')+'</span><b>− '+nt(fee)+'</b></div><div class="split-row"><span>'+T('平台服務費 7.5%','Service fee 7.5%')+'</span><b>− '+nt(svc)+'</b></div><div class="split-row net"><span>'+T('賣家淨收款（併入月結撥款）','Seller net (paid in the monthly settlement)')+'</span><b>'+nt(net)+'</b></div></div>'+
      '<p class="muted">'+T('費率依 2026/06–07 台灣版：服務費 7.5%＋金流 2.5%，含稅。','Rates from the Jun–Jul 2026 Taiwan version: 7.5% service + 2.5% payment, tax included.')+'</p></article>'+
      '<article class="order"><div class="order-head"><span class="order-no">#OU-000131 · '+T('拍賣得標','Auction win')+'</span><span class="st pend">'+T('待付款','Unpaid')+'</span></div>'+
      '<div class="order-item"><div class="cart-thumb" style="'+grad(a2.g)+'">'+a2.e+'</div><div><h4>'+esc(L(a2.n))+'</h4><span class="tile-meta">@'+esc(a2.by)+' · '+T('結標後自動建立','Created automatically at close')+'</span></div><span class="price">'+nt(540)+'</span></div>'+prog(0)+
      '<div class="row-btns"><button class="btn btn-dark js-demo">'+T('前往付款','Pay now')+'</button></div></article>';
  }
  function renderMessages(){
    document.getElementById('threadList').innerHTML='<h2>'+T('訊息','Messages')+'</h2>'+THREADS.map(function(t,i){ var last=t.msgs[t.msgs.length-1]; return '<button class="thread'+(i===thread?' active':'')+'" data-thread="'+i+'">'+av(t.h)+'<span class="t"><b>@'+esc(t.h)+'</b><span>'+esc(last.f==='lock'?T('🔒 付費訊息','🔒 Paid message'):L(last.t))+'</span></span></button>'; }).join('');
    var t=THREADS[thread];
    document.getElementById('chatHead').innerHTML=av(t.h,32)+'@'+esc(t.h);
    document.getElementById('chatLog').innerHTML='<div class="sys">'+T('私訊由 AI 偵測站外聯絡方式；所有約定請留在站內。','Messages are scanned for off-platform contact details; keep every agreement here.')+'</div>'+t.msgs.map(function(m,i){
      if(m.f==='lock'){ var k=thread+'-'+i; return unlocked[k]?'<div class="bub them">'+esc(L(m.full))+'</div>':'<div class="bub locked"><span>🔒 '+esc(L(m.t))+'</span><button class="btn btn-pink" data-unlock="'+k+'">'+T('解鎖 NT$'+m.price,'Unlock NT$'+m.price)+'</button></div>'; }
      if(m.f==='warn') return '<div class="bub warn">⚠️ '+esc(L(m.t))+'</div>';
      if(m.f==='sys') return '<div class="sys">'+esc(L(m.t))+'</div>';
      return '<div class="bub '+m.f+'">'+esc(L(m.t))+'</div>';
    }).join('');
    var log=document.getElementById('chatLog'); log.scrollTop=log.scrollHeight;
  }

  /* ---------- 作品集渲染 ---------- */
  function renderCase(){
    document.getElementById('tlList').innerHTML=TL.map(function(r,i){ var tg=TLTAG[r[0]]; return '<li class="'+(r[0]==='v'?'p2':(r[0]==='e'?'end':''))+'"><span class="when">'+esc(L(r[1]))+'</span><span class="dot"></span>'+(i<TL.length-1?'<span class="rail"></span>':'')+'<div class="what"><h4>'+esc(L(r[2]))+'<span class="tag '+tg[0]+'">'+esc(L(tg[1]))+'</span></h4><p>'+esc(L(r[3]))+'</p></div></li>'; }).join('');
    document.getElementById('verList').innerHTML=VERS.map(function(v){ return '<article class="ver '+v[0]+'"><span class="when">'+esc(L(v[1]))+'</span><h3>'+esc(L(v[2]))+'</h3><dl>'+v[3].map(function(r){ return '<dt>'+esc(L(r[0]))+'</dt><dd>'+esc(L(r[1]))+'</dd>'; }).join('')+'</dl></article>'; }).join('');
    document.getElementById('painGrid').innerHTML=PAIN.map(function(p){ return '<div class="panel"><h3>'+esc(L(p[0]))+'</h3><p>'+esc(L(p[1]))+'</p></div>'; }).join('');
    document.getElementById('featGrid').innerHTML=FEAT.map(function(f){ return '<div class="panel"><h3 style="display:flex;gap:8px;align-items:center">'+icon(f[0])+esc(L(f[1]))+'</h3><p>'+esc(L(f[2]))+'</p></div>'; }).join('');
    document.getElementById('moneyFlow').innerHTML=FLOW.map(function(f){ return '<div class="fstep"><h4>'+esc(L(f[0]))+'</h4><p>'+esc(L(f[1]))+'</p></div>'; }).join('');
    document.getElementById('modelSteps').innerHTML=MODEL.map(function(m,i){ return '<div class="layer"><span class="no">0'+(i+1)+'</span><h4>'+esc(L(m[0]))+'</h4><p>'+esc(L(m[1]))+'</p><div class="risk"><span class="lv '+m[2]+'">'+esc(L(m[3]))+'</span></div></div>'; }).join('');
    document.getElementById('solveGrid').innerHTML=SOLVE.map(function(s){ return '<div class="panel"><h3>'+esc(L(s[0]))+'</h3><p>'+esc(L(s[1]))+'</p><span class="muted">'+T('2026/05 簡報第 4 頁','May 2026 deck, p.4')+'</span></div>'; }).join('');
    document.querySelector('#riskTable tbody').innerHTML=RISKS.map(function(r){ return '<tr><td>'+esc(L(r[0]))+'</td><td>'+esc(L(r[1]))+'</td><td>'+esc(L(r[2]))+'</td></tr>'; }).join('');
    document.getElementById('fearGrid').innerHTML=FEARS.map(function(f){ return '<div class="ff-card"><span class="who '+f[0]+'">'+(f[0]==='b'?T('買家怕','Buyers fear'):T('賣家怕','Sellers fear'))+'</span><span class="fear">'+esc(L(f[1]))+'</span><span class="arrow">→ '+T('功能','Feature')+'</span><span class="feat">'+esc(L(f[2]))+'</span></div>'; }).join('');
    document.getElementById('stack').innerHTML=LAYERS.map(function(l,i){ return '<div class="layer"><span class="no">'+(i<9?'0':'')+(i+1)+'</span><h4>'+esc(L(l[0]))+'</h4><p>'+esc(L(l[1]))+'</p><div class="risk"><span class="lv '+l[2]+'">'+esc(L(l[3]))+'</span><div class="risk-bar"><i style="width:'+l[4]+'%;background:'+RISKCOL[l[2]]+'"></i></div></div></div>'; }).join('');
    document.querySelector('#roles tbody').innerHTML=ROLES.map(function(r){ return '<tr><td>'+esc(L(r[0]))+'</td><td>'+esc(L(r[1]))+'</td><td>'+esc(L(r[2]))+'</td></tr>'; }).join('');
    var strip=''; for(var i=1;i<=10;i++){ strip+='<button data-open="pages/deck.html" data-title-zh="提案簡報（2026/05）" data-title-en="Pitch deck (May 2026)" aria-label="'+T('簡報第 ','Deck page ')+i+'"><img src="img/deck/p'+(i<10?'0':'')+i+'.jpg" alt="" loading="lazy" /></button>'; }
    document.getElementById('deckStrip').innerHTML=strip;
    document.getElementById('gFilters').innerHTML=GF.map(function(f){ return '<button class="filter" data-gf="'+f.k+'" aria-pressed="'+(gFilter===f.k)+'">'+esc(L(f))+'</button>'; }).join('');
    document.getElementById('gallery').innerHTML=PAGES.map(function(pg){ var cat=GF.filter(function(f){ return f.k===pg[0]; })[0];
      return '<article class="g-card"'+(gFilter==='all'||gFilter===pg[0]?'':' hidden')+'><div class="g-top"><span class="g-cat">'+esc(L(cat))+'</span>'+(pg[4]?'<span class="g-warn">'+T('規格範本・假資料','Spec template · mock data')+'</span>':(pg[5]?'<span class="g-warn" style="background:var(--pink-3);color:var(--hot)">'+T('台灣對外版本','Taiwan-facing')+'</span>':''))+'</div><h4>'+esc(L(pg[2]))+'</h4><p>'+esc(L(pg[3]))+'</p><div class="g-act"><button class="btn btn-dark" data-open="'+pg[1]+'" data-title-zh="'+esc(pg[2].zh)+'" data-title-en="'+esc(pg[2].en)+'">'+T('預覽','Preview')+'</button><a class="btn btn-line" href="'+pg[1]+'" target="_blank" rel="noopener">'+T('新分頁','New tab')+'</a></div></article>'; }).join('');
  }
  function mcard(href,ic,title,gist,extra){ return '<a class="mcard" href="'+href+'"><span class="mi">'+icon(ic)+'</span><div><b>'+esc(L(title))+'</b><span class="g">'+esc(L(gist))+'</span>'+(extra||'')+'</div></a>'; }
  function renderMap(){
    document.getElementById('mapCase').innerHTML=CASE_GROUPS.map(function(g){ return '<div class="cg"><h3>'+esc(L(g[0]))+'</h3>'+g[1].map(function(id){ var s=SEC[id]; return mcard('#/case/'+id,s[0],s[1],s[2]); }).join('')+'</div>'; }).join('');
    document.getElementById('mapSite').innerHTML=SITE.map(function(s){ return mcard('#/'+s[0],s[1],s[2],s[3],'<span class="fid '+s[4]+'">'+esc(L(FIDL[s[4]]))+'</span>'); }).join('');
    var order=['pitch','product','buyer','seller','policy','ops'];
    document.getElementById('mapFiles').innerHTML=order.map(function(k){ var list=PAGES.filter(function(pg){ return pg[0]===k; }), cat=GF.filter(function(f){ return f.k===k; })[0];
      return '<div class="fg'+(list.length>3||k==='pitch'?' wide':'')+'"><h3>'+esc(L(cat))+'<small>'+list.length+'</small></h3>'+list.map(function(pg){ return '<button class="frow" data-open="'+pg[1]+'" data-title-zh="'+esc(pg[2].zh)+'" data-title-en="'+esc(pg[2].en)+'"><span>'+esc(L(pg[2]))+'</span>'+(pg[4]?'<em>'+T('假資料','Mock data')+'</em>':'')+'<i>'+T('預覽','Preview')+' →</i></button>'; }).join('')+'</div>'; }).join('');
  }
  function renderNav(){
    function link(route,ic,label,badge){ return '<a class="nav-link" href="#/'+route+'" data-route="'+route+'"><span class="ic">'+icon(ic)+'</span><span class="nav-text"><span class="zh">'+esc(label.zh)+'</span><span class="en">'+esc(label.en)+'</span></span>'+(badge?'<span class="badge" id="cartBadge">0</span>':'')+'</a>'; }
    document.getElementById('siteNav').innerHTML='<div class="browse-label"><span class="zh">原站還原 · 瀏覽</span><span class="en">RESTORED SITE · BROWSE</span></div>'+SITE.map(function(s){ return link(s[0],s[1],s[2],s[0]==='cart'); }).join('');
    document.getElementById('caseNav').innerHTML='<div class="browse-label"><span class="zh">創辦人作品集</span><span class="en">FOUNDER CASE STUDY</span></div>'+CASE_ORDER.map(function(id){ var s=SEC[id]; return link('case/'+id,s[0],s[1]); }).join('');
    document.getElementById('mNav').innerHTML='<a href="#/map" data-route="map"><span class="zh">全覽</span><span class="en">Overview</span></a>'+SITE.map(function(s){ return '<a href="#/'+s[0]+'" data-route="'+s[0]+'"><span class="zh">'+esc(s[2].zh)+'</span><span class="en">'+esc(s[2].en)+'</span></a>'; }).join('')+'<a href="#/case/overview" data-route="case/overview"><span class="zh">創辦人作品集</span><span class="en">Case study</span></a>';
  }
  function renderAll(){ renderMap(); renderHome(); renderFeed(); renderCreators(); renderMarket(); renderAuctions(); renderCloset(); renderCart(); renderOrders(); renderMessages(); renderCase(); }

  /* ---------- 語言 ---------- */
  var current='map', curSec='overview';
  var SITEMAP={}; SITE.forEach(function(s){ SITEMAP[s[0]]=s; });
  function crumb(v,sec){
    var c=document.getElementById('crumb');
    if(v==='map'){ c.hidden=true; return; }
    c.hidden=false;
    var head='<a href="#/map">'+T('全覽','Overview')+'</a><span class="sep">›</span>';
    if(v==='case'){ var s=SEC[sec]||SEC.overview; c.innerHTML=head+'<span class="cat cat-case">'+T('創辦人作品集','Case study')+'</span><span class="sep">›</span><b>'+esc(L(s[1]))+'</b>'; }
    else { c.innerHTML=head+'<span class="cat cat-site">'+T('原站還原','Restored site')+'</span><span class="sep">›</span><b>'+esc(L(SITEMAP[v][2]))+'</b>'; }
  }
  function applyLang(){
    var root=document.documentElement;
    root.setAttribute('data-lang',lang); root.setAttribute('lang',zh()?'zh-Hant':'en');
    document.title=T('OnlyUsed 創辦人作品集','OnlyUsed | Founder Portfolio');
    var b=document.getElementById('langBtn'); b.textContent=zh()?'EN':'ZH'; b.setAttribute('aria-label',zh()?'Switch to English':'切換為中文');
    document.querySelectorAll('[data-ph-zh]').forEach(function(el){ el.placeholder=el.getAttribute('data-ph-'+lang); });
    document.querySelectorAll('[data-al-zh]').forEach(function(el){ el.setAttribute('aria-label',el.getAttribute('data-al-'+lang)); });
    document.querySelectorAll('[data-alt-zh]').forEach(function(el){ el.alt=el.getAttribute('data-alt-'+lang); });
    renderAll(); crumb(current,curSec);
  }
  document.getElementById('langBtn').addEventListener('click',function(){ lang=zh()?'en':'zh'; try{ localStorage.setItem('ou-lang',lang); }catch(e){} applyLang(); });

  /* ---------- 路由 ---------- */
  var VIEWS=['map','case'].concat(SITE.map(function(s){ return s[0]; }));
  var gate=document.getElementById('gate');
  function setActive(key){
    document.querySelectorAll('[data-route]').forEach(function(a){
      var on=a.getAttribute('data-route')===key||(key.indexOf('case/')===0&&a.parentElement.id==='mNav'&&a.getAttribute('data-route')==='case/overview');
      a.classList.toggle('active',on);
      if(on&&a.parentElement.id==='mNav'){ var p=a.parentElement,l=a.offsetLeft-16; if(l<p.scrollLeft||l+a.offsetWidth>p.scrollLeft+p.clientWidth){ p.scrollTo({left:l,behavior:'smooth'}); } }
    });
  }
  function route(){
    var parts=location.hash.replace(/^#\/?/,'').split('/'), v=parts[0], sec=parts[1];
    if(VIEWS.indexOf(v)<0) v='map';
    current=v;
    document.querySelectorAll('.view').forEach(function(el){ el.hidden=el.getAttribute('data-view')!==v; });
    document.querySelector('.column').toggleAttribute('data-compact',v!=='map');
    curSec=(v==='case'&&SEC[sec])?sec:'overview';
    crumb(v,curSec);
    if(v==='case'){ var tg=document.getElementById(curSec); setActive('case/'+curSec);
      if(tg&&sec&&sec!=='overview'){
        /* 用 instant 跳轉：頁面有 scroll-behavior:smooth，平滑捲動會和版面位移互相干擾 */
        tg.scrollIntoView({block:'start',behavior:'instant'});
        /* 延遲載入的圖片撐開版面後，再對準一次 */
        setTimeout(function(){ if(location.hash==='#/case/'+sec) tg.scrollIntoView({block:'start',behavior:'instant'}); },450);
      } else { window.scrollTo({top:0,behavior:'instant'}); } }
    else { setActive(v); window.scrollTo({top:0,behavior:'instant'}); }
    if(SITEMAP[v]&&v!=='terms'&&!ageOK&&typeof gate.showModal==='function'&&!gate.open){ gate.showModal(); }
  }
  window.addEventListener('hashchange',route);
  document.getElementById('gateYes').addEventListener('click',function(){ ageOK=true; gate.close(); });
  document.getElementById('gateNo').addEventListener('click',function(){ gate.close(); location.hash='#/map'; });
  gate.addEventListener('cancel',function(e){ e.preventDefault(); });

  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){ if(current!=='case') return; entries.forEach(function(en){ if(en.isIntersecting){ setActive('case/'+en.target.id); curSec=en.target.id; crumb('case',curSec); } }); },{rootMargin:'-35% 0px -60% 0px'});
    document.querySelectorAll('[data-view="case"] > section[id]').forEach(function(s){ io.observe(s); });
  }

  /* ---------- 互動 ---------- */
  var toast=document.getElementById('toast'), tt;
  function say(m){ toast.textContent=m; toast.classList.add('show'); clearTimeout(tt); tt=setTimeout(function(){ toast.classList.remove('show'); },2600); }
  function match(p,q){ var cat=CATS.filter(function(c){ return c.k===p.cat; })[0]; return (p.n.zh+' '+p.n.en+' '+p.by+' '+cat.zh+' '+cat.en).toLowerCase().indexOf(q)>-1; }
  document.addEventListener('click',function(e){
    var t, a=e.target.closest('a[href^="#/"]');
    if(a&&a.getAttribute('href')===location.hash){ e.preventDefault(); route(); }
    if((t=e.target.closest('[data-save]'))){ var id=t.getAttribute('data-save'); if(saved[id]) delete saved[id]; else saved[id]=1; renderAll(); say(saved[id]?T('已收藏','Saved'):T('已取消收藏','Removed')); return; }
    if((t=e.target.closest('[data-add]'))){ cart.push(t.getAttribute('data-add')); renderCart(); say(T('已加入購物車（展示版）','Added to cart (demo)')); return; }
    if((t=e.target.closest('[data-remove]'))){ var i=cart.indexOf(t.getAttribute('data-remove')); if(i>-1) cart.splice(i,1); renderCart(); return; }
    if((t=e.target.closest('[data-follow]'))){ var h=t.getAttribute('data-follow'); if(followed[h]) delete followed[h]; else followed[h]=1; renderAll(); return; }
    if((t=e.target.closest('[data-like]'))){ var k=t.getAttribute('data-like'); if(liked[k]) delete liked[k]; else liked[k]=1; renderFeed(); renderCreators(); return; }
    if((t=e.target.closest('[data-pickc]'))){ pickC=t.getAttribute('data-pickc'); renderCreators(); if(location.hash!=='#/creators'){ location.hash='#/creators'; } else { window.scrollTo(0,0); } return; }
    if((t=e.target.closest('[data-pickauc]'))){ pickA=t.getAttribute('data-pickauc'); renderAuctions(); if(location.hash!=='#/auctions'){ location.hash='#/auctions'; } else { window.scrollTo(0,0); } return; }
    if((t=e.target.closest('[data-sub]'))){ var n=+t.getAttribute('data-sub')+1; subscribed[pickC]=subscribed[pickC]===n?0:n; renderCreators(); renderCloset(); say(subscribed[pickC]?T('已訂閱（展示版，不會扣款）','Subscribed (demo — no charge)'):T('已取消訂閱','Unsubscribed')); return; }
    if((t=e.target.closest('[data-unlock]'))){ unlocked[t.getAttribute('data-unlock')]=1; renderMessages(); say(T('已解鎖（展示版，不會扣款）','Unlocked (demo — no charge)')); return; }
    if((t=e.target.closest('[data-cat]'))){ mktCat=t.getAttribute('data-cat'); renderMarket(); return; }
    if((t=e.target.closest('[data-clearq]'))){ mktQ=''; renderMarket(); return; }
    if((t=e.target.closest('[data-thread]'))){ thread=+t.getAttribute('data-thread'); renderMessages(); return; }
    if((t=e.target.closest('[data-slide]'))){ slide=+t.getAttribute('data-slide'); renderSlide(); return; }
    if((t=e.target.closest('[data-gf]'))){ gFilter=t.getAttribute('data-gf'); renderCase(); return; }
    if((t=e.target.closest('.js-tab'))){ document.querySelectorAll('.js-tab').forEach(function(b){ b.setAttribute('aria-pressed',String(b===t)); }); return; }
    if((t=e.target.closest('.js-demo'))){ say(T('這是還原展示版：不提供登入、付款或真實交易。','This is a restored demo — sign-in, payments and real transactions are disabled.')); return; }
    if((t=e.target.closest('[data-open]'))){ openViewer(t.getAttribute('data-open'),t.getAttribute('data-title-'+lang)||''); return; }
  });
  document.getElementById('mhPrev').addEventListener('click',function(){ slide=(slide+SLIDES.length-1)%SLIDES.length; renderSlide(); });
  document.getElementById('mhNext').addEventListener('click',function(){ slide=(slide+1)%SLIDES.length; renderSlide(); });
  document.getElementById('tipBtn').addEventListener('click',function(){ THREADS[thread].msgs.push({f:'sys',t:{zh:'你打賞了 NT$100（展示版，不會扣款）',en:'You tipped NT$100 (demo — no charge)'}}); renderMessages(); });
  document.getElementById('compose').addEventListener('submit',function(e){ e.preventDefault(); var inp=document.getElementById('msgIn'), v=inp.value.trim(); if(!v) return; THREADS[thread].msgs.push({f:'me',t:{zh:v,en:v}});
    if(/line|ig|instagram|telegram|whatsapp|wechat|微信|@|\d{8,}/i.test(v)){ THREADS[thread].msgs.push({f:'warn',t:THREADS[0].msgs[4].t}); }
    inp.value=''; renderMessages(); });
  document.addEventListener('submit',function(e){
    if(e.target.id!=='bidForm') return;
    e.preventDefault();
    var a=auc(pickA), v=parseInt(document.getElementById('bidIn').value,10), min=top(a)+a.inc;
    if(a.end<=Date.now()){ say(T('已結標，無法再出價。','This auction has ended.')); return; }
    if(!(v>=min)){ say(T('出價必須至少 ','Your bid must be at least ')+nt(min)+T('（目前最高價＋最低加價）。',' (top bid + minimum raise).')); return; }
    a.bids.unshift(['you',v,1]); renderAuctions(); renderHome(); say(T('出價成功（展示版）：目前最高 ','Bid placed (demo): top bid is now ')+nt(v));
  });
  document.querySelectorAll('.js-search').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var q=f.querySelector('input').value.trim().toLowerCase();
      if(!q){ say(T('輸入關鍵字，例如：絲襪、luna、拍賣、金流','Try a keyword, e.g. stockings, luna, auction, payments')); return; }
      var cHit=C.filter(function(c){ return c.h.indexOf(q)>-1; })[0];
      if(cHit){ pickC=cHit.h; renderCreators(); location.hash='#/creators'; return; }
      var aHit=A.filter(function(a){ return (a.n.zh+' '+a.n.en).toLowerCase().indexOf(q)>-1; })[0];
      if(aHit){ pickA=aHit.id; renderAuctions(); location.hash='#/auctions'; return; }
      if(P.some(function(p){ return match(p,q); })){ mktQ=q; mktCat='all'; renderMarket(); location.hash='#/marketplace'; return; }
      var hit=null; document.querySelectorAll('[data-view="case"] > section[id]').forEach(function(s){ if(!hit&&s.textContent.toLowerCase().indexOf(q)>-1) hit=s; });
      if(!hit){ say((zh()?'找不到「':'Nothing found for "')+q+(zh()?'」':'"')); return; }
      location.hash='#/case/'+hit.id;
      setTimeout(function(){ hit.classList.remove('flash'); void hit.offsetWidth; hit.classList.add('flash'); },60);
    });
  });
  var shell=document.getElementById('shell'), cb=document.getElementById('collapseBtn');
  cb.addEventListener('click',function(){ var c=shell.classList.toggle('collapsed'); cb.setAttribute('aria-expanded',String(!c)); });
  var dlg=document.getElementById('viewer'), frame=document.getElementById('viewerFrame');
  function openViewer(src,title){ document.getElementById('viewerTitle').textContent=title; frame.src=src; if(typeof dlg.showModal!=='function'){ window.open(src,'_blank'); } else if(!dlg.open){ dlg.showModal(); } }
  document.getElementById('viewerClose').addEventListener('click',function(){ dlg.close(); });
  dlg.addEventListener('close',function(){ frame.src='about:blank'; });

  /* 原始檔案裡的連結是原站路由（/sell、/feed…）：有留存的頁面就在預覽裡切換，對應到還原畫面就跳過去，其餘說明未保存 */
  var PAGEBYSLUG={}; PAGES.forEach(function(pg){ PAGEBYSLUG['/'+pg[1].replace(/^pages\/|\.html$/g,'')]=pg; });
  var OLDROUTES={'/':'home','/feed':'feed','/creators':'creators','/categories':'marketplace','/marketplace':'marketplace','/orders':'orders','/terms':'terms'};
  var note=document.getElementById('viewerNote'), noteHTML=note.innerHTML, nt2;
  function viewerSay(m){ note.textContent=m; note.style.color='var(--warn)'; clearTimeout(nt2); nt2=setTimeout(function(){ note.innerHTML=noteHTML; note.style.color=''; },3200); }
  frame.addEventListener('load',function(){
    var d; try{ d=frame.contentDocument; }catch(err){ return; }
    if(!d) return;
    d.addEventListener('click',function(e){
      var a=e.target.closest&&e.target.closest('a[href]'), h=a&&a.getAttribute('href');
      if(!h||h.charAt(0)!=='/') return;
      e.preventDefault();
      var i=h.indexOf('#'), path=i>-1?h.slice(0,i):h, hash=i>-1?h.slice(i):'';
      if(PAGEBYSLUG[path]){ var pg=PAGEBYSLUG[path]; openViewer(pg[1]+hash,pg[2][lang]); return; }
      if(OLDROUTES[path]){ dlg.close(); location.hash='#/'+OLDROUTES[path]; return; }
      viewerSay(T('原站的「'+path+'」頁面未於下架前保存。','The original "'+path+'" page wasn\'t preserved before the takedown.'));
    });
  });
  dlg.addEventListener('click',function(e){ if(e.target===dlg) dlg.close(); });

  /* 拍賣倒數：每秒更新畫面上所有倒數 */
  setInterval(function(){ var n=Date.now(); document.querySelectorAll('[data-end]').forEach(function(el){ el.textContent=fmtLeft(+el.getAttribute('data-end')-n); }); },1000);

  renderNav();
  applyLang();
  route();
})();
