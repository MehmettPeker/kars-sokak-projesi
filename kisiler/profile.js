
(function () {
  // Sayfadaki mevcut profil yapısını yakala
  const profileCard = document.querySelector(".card.profile");
  if (!profileCard) return;

  // Soldaki ilk img (profil foto)
  const mainImg = profileCard.querySelector("img");
  // Metin kısmı (sağ taraf)
  const right = mainImg ? mainImg.nextElementSibling : null;
  if (!mainImg || !right) return;

  // Section içinde TR/EN başlıklarını ve içerikleri bul
  const section = right.querySelector("section.street-section");
  if (!section) return;

  const h2 = section.querySelector("h2");
  const trH3 = Array.from(section.querySelectorAll("h3")).find(x => x.textContent.trim().toLowerCase().includes("türkçe"));
  const enH3 = Array.from(section.querySelectorAll("h3")).find(x => x.textContent.trim().toLowerCase().includes("english"));

  if (!h2 || !trH3 || !enH3) return;

  // TR metin: trH3'ten enH3'e kadar olan <p>’leri al
  const nodes = Array.from(section.children);
  const trIndex = nodes.indexOf(trH3);
  const enIndex = nodes.indexOf(enH3);

  const trParas = [];
  const enParas = [];

  for (let i = trIndex + 1; i < enIndex; i++) {
    if (nodes[i].tagName === "P") trParas.push(nodes[i].outerHTML);
  }
  for (let i = enIndex + 1; i < nodes.length; i++) {
    if (nodes[i].tagName === "P") enParas.push(nodes[i].outerHTML);
  }

  // Başlıklar
  const trTitle = h2.textContent.trim();
  const enTitle = "English"; // panel içinde ayrıca h2 basacağız
  const pageTitle = (document.querySelector(".header h1")?.textContent || "").trim();

  // QR bloğunu sakla
  const qr = right.querySelector(".qr");

  // Street section içini yeniden inşa edeceğiz
  section.innerHTML = "";

  // Üst özet kartı (minimal otomatik)
  const summary = document.createElement("div");
  summary.className = "summary";
  summary.innerHTML = `
    <h2 style="margin:0">Kısa Özet</h2>
    <div class="kv">
      <strong>Yer</strong><span>${pageTitle || "—"}</span>
      <strong>Tür</strong><span>Profil</span>
      <strong>Dil</strong><span>TR / EN</span>
    </div>
    <div class="meta">
      <span class="badge">Biyografi</span>
      <span class="badge">Kars</span>
      <span class="badge">Harita</span>
    </div>
  `;

  // Tabs iskeleti
  const tabs = document.createElement("div");
  tabs.className = "tabs";
  tabs.innerHTML = `
    <div class="tab-buttons" role="tablist" aria-label="Dil seçimi">
      <button type="button" role="tab" aria-selected="true" aria-controls="panel-tr" id="tab-tr">Türkçe</button>
      <button type="button" role="tab" aria-selected="false" aria-controls="panel-en" id="tab-en">English</button>
    </div>

    <section id="panel-tr" class="tab-panel street-section" role="tabpanel" aria-labelledby="tab-tr">
      <h2>${trTitle}</h2>
      ${trParas.join("") || "<p>Türkçe içerik bulunamadı.</p>"}
    </section>

    <section id="panel-en" class="tab-panel street-section" role="tabpanel" aria-labelledby="tab-en" hidden>
      <h2>Who is this person?</h2>
      ${enParas.join("") || "<p>English content not found.</p>"}
    </section>
  `;

  section.appendChild(summary);
  section.appendChild(tabs);

  // Soldaki görseli arşiv kartına sar
  const archive = document.createElement("aside");
  archive.className = "archive";
  mainImg.classList.add("profile-resim");
  archive.appendChild(mainImg);

  const caption = document.createElement("div");
  caption.className = "caption";
  caption.innerHTML = `<span class="badge">Arşiv görseli</span><span>Kaynak: görsel</span>`;
  archive.appendChild(caption);

  // profileCard içini yeniden düzenle: [archive] [right]
  profileCard.innerHTML = "";
  profileCard.appendChild(archive);
  profileCard.appendChild(right);

  // Tabs çalıştır
  const tabTr = document.getElementById("tab-tr");
  const tabEn = document.getElementById("tab-en");
  const panelTr = document.getElementById("panel-tr");
  const panelEn = document.getElementById("panel-en");

  function select(lang) {
    const tr = lang === "tr";
    tabTr.setAttribute("aria-selected", tr);
    tabEn.setAttribute("aria-selected", !tr);
    panelTr.hidden = !tr;
    panelEn.hidden = tr;
  }

  tabTr.addEventListener("click", () => select("tr"));
  tabEn.addEventListener("click", () => select("en"));
})();
// === Tabs (TR/EN) ===
(function initTabs() {
  const root = document.querySelector('[data-tabs]');
  if (!root) return;

  const tabTr = document.getElementById('tab-tr');
  const tabEn = document.getElementById('tab-en');
  const panelTr = document.getElementById('panel-tr');
  const panelEn = document.getElementById('panel-en');

  if (!tabTr || !tabEn || !panelTr || !panelEn) return;

  function select(lang) {
    const tr = lang === 'tr';
    tabTr.setAttribute('aria-selected', String(tr));
    tabEn.setAttribute('aria-selected', String(!tr));
    panelTr.hidden = !tr;
    panelEn.hidden = tr;
  }

  tabTr.addEventListener('click', () => select('tr'));
  tabEn.addEventListener('click', () => select('en'));
})();
