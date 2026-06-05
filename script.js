(function () {
  const transparentPlaceholder =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";

  const talents = window.CYRA_TALENTS || [];
  const talentSlots = window.CYRA_TALENT_SLOTS || [];
  const newsItems = window.CYRA_NEWS || [];
  const fallbackImages = new WeakSet();

  const selectors = {
    siteHeader: document.querySelector(".site-header"),
    navToggle: document.querySelector(".menu-button"),
    navLinks: document.querySelectorAll(".site-nav a"),
    talentList: document.querySelector("#talent-list"),
    homeNewsList: document.querySelector("#home-news-list"),
    newsList: document.querySelector("#news-list"),
    allNewsList: document.querySelector("#all-news-list"),
    newsDetail: document.querySelector("#news-detail"),
    newsDetailImage: document.querySelector("#news-detail-image"),
    newsDetailDate: document.querySelector("#news-detail-date"),
    newsDetailTag: document.querySelector("#news-detail-tag"),
    newsDetailTitle: document.querySelector("#news-detail-title"),
    newsDetailBody: document.querySelector("#news-detail-body"),
    newsDetailBack: document.querySelector("#news-detail-back"),
    currentYear: document.querySelector("#current-year"),
    lightbox: null,
    lightboxImage: null,
    lightboxClose: null,
    featuredImage: document.querySelector("#featured-talent-image"),
    featuredName: document.querySelector("#featured-talent-name"),
    featuredRomaji: document.querySelector("#featured-talent-romaji"),
    featuredProfile: document.querySelector("#featured-talent-profile"),
    featuredMediaId: document.querySelector(".profile-media figcaption span:first-child"),
    featuredPanelId: document.querySelector(".profile-id span"),
    featuredRole: document.querySelector(".profile-panel > .section-kicker"),
    profileDetails: document.querySelector("#profile-details"),
    snsList: document.querySelector("#sns-list"),
    galleryList: document.querySelector("#gallery-list"),
    voiceSample: document.querySelector(".voice-sample .waveform"),
  };

  const soundTalentSlugs = {
    "001": "reina",
    "002": "neo",
  };
  const profileTalentIds = {
    reina: "001",
    neo: "002",
  };

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }

  function createImage(src, alt, className) {
    const image = document.createElement("img");
    image.src = src;
    image.alt = alt;
    image.dataset.source = src;
    if (className) image.className = className;
    attachImageFallback(image);
    return image;
  }

  function createTalentCard(talent) {
    const article = createElement("article", "talent-card");

    if (talent.status === "coming-soon") {
      article.classList.add("is-coming-soon");
      article.append(
        createElement("p", "talent-id", talent.id),
        createElement("p", "coming-label", "COMING SOON"),
        createElement("div", "slot-mark"),
        createElement("h3", null, "COMING SOON"),
        createElement("span", "disabled-button", "PROFILE COMING SOON"),
      );
      return article;
    }

    const imageWrap = createElement("div", "talent-image");
    imageWrap.append(
      createImage(talent.cardImage || talent.image, `${talent.name}のビジュアル`),
    );

    const body = createElement("div", "talent-card-body");
    body.append(
      createElement("p", "talent-id", talent.id),
      createElement("span", "status-pill", talent.status.toUpperCase()),
      createElement("h3", null, talent.name),
      createElement("p", "romaji", talent.romaji),
    );

    const link = createElement("a", "outline-button");
    link.href = "#reina";
    link.dataset.talentId = talent.id;
    link.append(
      createElement("span", null, "VIEW PROFILE"),
      createElement("span", null, "→"),
    );
    body.append(link);
    article.append(imageWrap, body);

    return article;
  }

  function createHomeNewsItem(item) {
    const article = createElement("article", "home-news-item");
    const date = createElement("time", null, item.displayDate || item.date);
    date.dateTime = item.date;
    const title = createElement("p", null, item.title);
    const tag = createElement("span", "news-tag", item.tag || "NEW");
    article.append(date, title, tag);
    return article;
  }

  function createNewsCard(item) {
    const article = createElement("article", "news-card");
    const thumbnail = item.thumbnail || "./assets/images/news/placeholder.png";

    const imageWrap = createElement("div", "news-image");
    imageWrap.append(createImage(thumbnail, `${item.title}のサムネイル`));

    const content = createElement("div", "news-content");
    const meta = createElement("div", "news-meta");
    const date = createElement("time", null, item.displayDate || item.date);
    date.dateTime = item.date;
    meta.append(date, createElement("span", "news-tag", item.tag || "NEW"));

    const title = createElement("h3", null, item.title);
    const body = createElement("p", null, item.body);
    const readMore = createElement("a", "outline-button news-read-more");
    readMore.href = `./news-detail.html?id=${encodeURIComponent(item.id)}`;
    readMore.dataset.newsId = item.id;
    readMore.append(
      createElement("span", null, "READ MORE"),
      createElement("span", null, "→"),
    );

    content.append(meta, title, body, readMore);
    article.append(imageWrap, content);
    return article;
  }

  function renderTalents() {
    if (!selectors.talentList) return;
    const cards = [...talents, ...talentSlots].map(createTalentCard);
    selectors.talentList.replaceChildren(...cards);
  }

  function renderHomeNews() {
    if (!selectors.homeNewsList) return;
    selectors.homeNewsList.replaceChildren(
      ...newsItems.slice(0, 3).map(createHomeNewsItem),
    );
  }

  function renderNews() {
    if (!selectors.newsList) return;

    const viewAllLink = createElement("a", "outline-button news-more-link");
    viewAllLink.href = "./news.html";
    viewAllLink.append(
      createElement("span", null, "VIEW ALL NEWS"),
      createElement("span", null, "→"),
    );

    selectors.newsList.replaceChildren(
      ...newsItems.slice(0, 3).map(createNewsCard),
      viewAllLink,
    );
  }

  function renderAllNews() {
    if (!selectors.allNewsList) return;
    selectors.allNewsList.replaceChildren(...newsItems.map(createNewsCard));
  }

  function getNewsDetailIdFromUrl() {
    return new URLSearchParams(window.location.search).get("id");
  }

  function getProfileTalentIdFromUrl() {
    const talent = new URLSearchParams(window.location.search).get("talent");
    return profileTalentIds[talent] || "001";
  }

  function renderNewsDetail(newsId, shouldScroll = true) {
    if (!selectors.newsDetail) return;

    const selectedNews = newsItems.find((item) => item.id === newsId);
    if (!selectedNews) {
      renderNewsNotFound();
      return;
    }

    const thumbnail =
      selectedNews.thumbnail || "./assets/images/news/placeholder.png";

    setImageSource(
      selectors.newsDetailImage,
      thumbnail,
      `${selectedNews.title}のサムネイル`,
    );

    if (selectors.newsDetailDate) {
      selectors.newsDetailDate.textContent =
        selectedNews.displayDate || selectedNews.date;
      selectors.newsDetailDate.dateTime = selectedNews.date;
    }

    if (selectors.newsDetailTag) {
      selectors.newsDetailTag.textContent = selectedNews.tag || "NEW";
    }

    if (selectors.newsDetailTitle) {
      selectors.newsDetailTitle.textContent = selectedNews.title;
    }

    if (selectors.newsDetailBody) {
      selectors.newsDetailBody.textContent = selectedNews.body;
    }

    selectors.newsDetail.hidden = false;

    if (shouldScroll) {
      selectors.newsDetail.scrollIntoView({ behavior: "smooth" });
    }
  }

  function renderNewsNotFound() {
    if (!selectors.newsDetail) return;

    if (selectors.newsDetailImage) {
      selectors.newsDetailImage.removeAttribute("src");
      selectors.newsDetailImage.alt = "";
      selectors.newsDetailImage.classList.add("is-placeholder");
    }

    if (selectors.newsDetailDate) {
      selectors.newsDetailDate.textContent = "";
      selectors.newsDetailDate.removeAttribute("datetime");
    }

    if (selectors.newsDetailTag) {
      selectors.newsDetailTag.textContent = "ERROR";
    }

    if (selectors.newsDetailTitle) {
      selectors.newsDetailTitle.textContent = "NEWS NOT FOUND";
    }

    if (selectors.newsDetailBody) {
      selectors.newsDetailBody.textContent =
        "指定されたNEWS記事は見つかりませんでした。NEWS ARCHIVEから記事を選択してください。";
    }

    selectors.newsDetail.hidden = false;
  }

  function renderProfileDetails(talent) {
    if (!selectors.profileDetails) return;

    const rows = (talent.details || []).map((detail) => {
      const row = createElement("div");
      row.append(
        createElement("dt", null, detail.label),
        createElement("dd", null, detail.value),
      );
      return row;
    });

    selectors.profileDetails.replaceChildren(...rows);
  }

  function renderSns(talent) {
    if (!selectors.snsList) return;

    const links = (talent.sns || []).map((sns) => {
      const link = createElement("a", "sns-link");
      link.href = sns.url;
      link.append(
        createElement("span", "sns-icon", sns.icon),
        createElement("span", null, sns.name),
        createElement("span", null, "→"),
      );
      return link;
    });

    selectors.snsList.replaceChildren(...links);
  }

  function renderGallery(talent) {
    if (!selectors.galleryList) return;

    const gallery = (talent.gallery || []).map((src, index) => {
      const image = createImage(src, `${talent.name} ギャラリー ${index + 1}`);
      image.classList.add("gallery-zoom-image");
      image.tabIndex = 0;
      image.setAttribute("role", "button");
      image.setAttribute("aria-label", `${talent.name} ギャラリー ${index + 1}を拡大表示`);
      return image;
    });

    selectors.galleryList.replaceChildren(...gallery);
  }

  function renderSoundArchiveLink(talent) {
    if (!selectors.voiceSample) return;

    const soundTalentSlug = soundTalentSlugs[talent.id];
    if (!soundTalentSlug) {
      selectors.voiceSample.replaceChildren(createElement("p", null, "UNDER DEVELOPMENT"));
      return;
    }

    const link = createElement("a", "outline-button");
    link.href = `./sound.html?talent=${encodeURIComponent(soundTalentSlug)}`;
    link.append(
      createElement("span", null, "SOUND ARCHIVE"),
      createElement("span", null, "曲一覧を見る →"),
    );

    selectors.voiceSample.replaceChildren(link);
  }

  function setImageSource(image, src, alt) {
    if (!image || !src) return;

    image.classList.remove("is-placeholder");
    delete image.dataset.missingSource;
    image.dataset.source = src;
    image.src = src;
    image.alt = alt;
    attachImageFallback(image);
  }

  function renderFeaturedTalent(talentId) {
    if (!selectors.featuredName || !selectors.featuredRomaji || !selectors.featuredProfile) {
      return;
    }

    const selectedTalent =
      talents.find((talent) => talent.id === talentId) || talents[0];
    if (!selectedTalent) return;

    setImageSource(
      selectors.featuredImage,
      selectedTalent.image,
      `${selectedTalent.name}のキービジュアル`,
    );

    selectors.featuredName.textContent = selectedTalent.name;
    selectors.featuredRomaji.textContent = selectedTalent.romaji;
    selectors.featuredProfile.textContent =
      selectedTalent.intro || selectedTalent.profile;

    if (selectors.featuredMediaId) {
      selectors.featuredMediaId.textContent = selectedTalent.id;
    }

    if (selectors.featuredPanelId) {
      selectors.featuredPanelId.textContent = selectedTalent.id;
    }

    if (selectors.featuredRole) {
      selectors.featuredRole.textContent = selectedTalent.role;
    }

    renderProfileDetails(selectedTalent);
    renderSns(selectedTalent);
    renderGallery(selectedTalent);
    renderSoundArchiveLink(selectedTalent);
  }

  function showImagePlaceholder(image) {
    if (!image.dataset.missingSource) {
      image.dataset.missingSource = image.dataset.source || image.src;
    }
    image.src = transparentPlaceholder;
    image.classList.add("is-placeholder");
  }

  function attachImageFallback(image) {
    if (!image || fallbackImages.has(image)) return;

    fallbackImages.add(image);
    image.addEventListener("error", () => showImagePlaceholder(image));
  }

  function enableImageFallbacks() {
    document.querySelectorAll("img").forEach((image) => {
      attachImageFallback(image);

      if (image.complete && image.naturalWidth === 0) {
        showImagePlaceholder(image);
      }
    });
  }

  function bindTalentCards() {
    if (!selectors.talentList) return;

    selectors.talentList.addEventListener("click", (event) => {
      const profileLink = event.target.closest("[data-talent-id]");
      if (!profileLink) return;

      const selectedId = profileLink.dataset.talentId;
      if (!selectedId) return;

      event.preventDefault();
      renderFeaturedTalent(selectedId);
      document.querySelector("#reina")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  function bindNewsDetails() {
    if (!selectors.newsDetail) return;

    renderNewsDetail(getNewsDetailIdFromUrl(), false);
  }

  function createGalleryLightbox() {
    const lightbox = createElement("div", "gallery-lightbox");
    lightbox.hidden = true;
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Gallery image preview");

    const closeButton = createElement("button", "gallery-lightbox-close", "×");
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Close gallery preview");

    const image = document.createElement("img");
    image.className = "gallery-lightbox-image";
    attachImageFallback(image);

    lightbox.append(closeButton, image);
    document.body.append(lightbox);

    selectors.lightbox = lightbox;
    selectors.lightboxImage = image;
    selectors.lightboxClose = closeButton;
  }

  function openGalleryLightbox(image) {
    if (!selectors.lightbox || !selectors.lightboxImage) return;

    setImageSource(
      selectors.lightboxImage,
      image.dataset.source || image.src,
      image.alt,
    );

    selectors.lightbox.hidden = false;
    document.body.classList.add("is-lightbox-open");
    selectors.lightboxClose?.focus();
  }

  function closeGalleryLightbox() {
    if (!selectors.lightbox) return;

    selectors.lightbox.hidden = true;
    document.body.classList.remove("is-lightbox-open");
  }

  function bindGalleryLightbox() {
    createGalleryLightbox();

    selectors.galleryList?.addEventListener("click", (event) => {
      const image = event.target.closest(".gallery-zoom-image");
      if (!image) return;
      openGalleryLightbox(image);
    });

    selectors.galleryList?.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;

      const image = event.target.closest(".gallery-zoom-image");
      if (!image) return;

      event.preventDefault();
      openGalleryLightbox(image);
    });

    selectors.lightbox?.addEventListener("click", (event) => {
      if (event.target === selectors.lightbox || event.target === selectors.lightboxClose) {
        closeGalleryLightbox();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && selectors.lightbox && !selectors.lightbox.hidden) {
        closeGalleryLightbox();
      }
    });
  }

  function bindMobileNav() {
    if (!selectors.navToggle || !selectors.siteHeader) return;

    selectors.navToggle.addEventListener("click", () => {
      const isOpen = selectors.siteHeader.classList.toggle("is-nav-open");
      selectors.navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    selectors.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        selectors.siteHeader.classList.remove("is-nav-open");
        selectors.navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function setActiveNav() {
    const links = Array.from(selectors.navLinks);
    const currentUrl = new URL(window.location.href);
    const sections = links
      .map((link) => {
        const linkUrl = new URL(link.getAttribute("href"), window.location.href);
        if (linkUrl.pathname !== currentUrl.pathname) return null;
        if (!linkUrl.hash) return null;
        return document.querySelector(linkUrl.hash);
      })
      .filter(Boolean);

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === `#${entry.target.id}`,
            );
          });
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
  }

  function init() {
    if (selectors.currentYear) {
      selectors.currentYear.textContent = new Date().getFullYear();
    }

    renderTalents();
    renderHomeNews();
    renderFeaturedTalent(getProfileTalentIdFromUrl());
    renderNews();
    renderAllNews();
    enableImageFallbacks();
    bindTalentCards();
    bindNewsDetails();
    bindGalleryLightbox();
    bindMobileNav();
    setActiveNav();
  }

  init();
})();
