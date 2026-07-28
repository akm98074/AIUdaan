/* AIUdaan — minimal progressive enhancement
   Keep this light: the site works fully without JS. */
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    // Close menu after tapping a link
    links.addEventListener("click", function (e) {
      if (e.target.closest("a") && links.classList.contains("open")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  // Tabbed sections (hash-linked; without JS all panels stack as plain sections)
  var tabs = document.getElementById("tabs");
  if (tabs) {
    var tabLinks = tabs.querySelectorAll(".tab-link");
    var tabPanels = tabs.querySelectorAll(".tab-panel");
    var tabBar = tabs.querySelector(".tab-links");
    tabs.classList.add("js-tabs");

    var activate = function (id, scroll) {
      var found = false;
      tabPanels.forEach(function (p) {
        if (p.id === id) found = true;
      });
      if (!found) return;
      tabPanels.forEach(function (p) {
        p.classList.toggle("is-active", p.id === id);
      });
      tabLinks.forEach(function (l) {
        var active = l.getAttribute("aria-controls") === id;
        l.classList.toggle("is-active", active);
        l.setAttribute("aria-selected", active ? "true" : "false");
      });
      // Bring the tab bar into view when arriving from far away (footer, deep link)
      if (scroll && tabBar) {
        var r = tabBar.getBoundingClientRect();
        if (r.top < 0 || r.top > window.innerHeight - 160) tabBar.scrollIntoView();
      }
    };

    var syncFromHash = function (scroll) {
      activate(location.hash ? location.hash.slice(1) : "pitch", scroll);
    };

    window.addEventListener("hashchange", function () { syncFromHash(true); });
    syncFromHash(location.hash !== "");
    if (!location.hash) activate("pitch", false);

    // Arrow-key navigation on the tab bar
    if (tabBar) {
      tabBar.addEventListener("keydown", function (e) {
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
        var links = Array.prototype.slice.call(tabLinks);
        var i = links.indexOf(document.activeElement);
        if (i === -1) return;
        e.preventDefault();
        var next = links[(i + (e.key === "ArrowRight" ? 1 : links.length - 1)) % links.length];
        next.focus();
        next.click();
      });
    }
  }

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
