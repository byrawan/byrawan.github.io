/* Rawan Hub — opening ribbon (shared by the profile page and the studio)
   ▸ To change the last day, edit END below (Riyadh time).
   ▸ Shows once per visitor; never for someone coming back with the Back button
     or opening a direct link to a section. Add ?ribbon=1 to the URL to preview it anytime.
   ▸ Images: /rib-band.webp, /rib-bow.webp, /rib-scissors.webp (site root). */
(function () {
  var END = "2026-11-24T23:59:59+03:00";      // ← آخر يوم للشريطة
  var KEY = "rh-ribbon-cut";

  var q = location.search, force = /[?&]ribbon=1/.test(q);
  var me = document.currentScript;
  var LOGO = (me && me.getAttribute("data-logo")) || "";
  var TARGET = (me && me.getAttribute("data-target")) || "";   // the site's header logo, where the big logo flies to
  try {
    if (!force) {
      if (Date.now() > Date.parse(END)) return;
      if (localStorage.getItem(KEY)) return;
      var nav = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
      if (nav && nav.type === "back_forward") return;
      if (/challenge/.test(q)) return;
      var h = location.hash;
      if (h && ["#hub", "#home", "#rawan", "#f-home"].indexOf(h) < 0) return;
    }
  } catch (e) {}

  var still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var css =
    "#rhRib{position:fixed;inset:0;z-index:2147483000;overflow:hidden;font-family:inherit}" +
    "#rhRib .rb-bg{position:absolute;inset:0;background:rgba(251,248,242,.98);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);transition:opacity 1.1s ease .15s}" +
    "#rhRib.fly .rb-bg{opacity:0}" +
    /* logo (with RAWAN HUB) is hidden until the cut, then pops in, pulses, and merges into the site logo */
    "#rhRib .rb-logo{position:absolute;left:50%;top:50%;height:110px;width:auto;opacity:0;transform:translate(-50%,-50%) scale(.2);transform-origin:50% 50%;pointer-events:none}" +
    "#rhRib.cut .rb-logo{opacity:1;transform:translate(-50%,-50%) scale(1.3);transition:transform .38s cubic-bezier(.2,1.7,.4,1),opacity .15s;animation:rbPulse 1s ease-in-out .4s 3}" +
    "@keyframes rbPulse{0%,100%{transform:translate(-50%,-50%) scale(1.3)}50%{transform:translate(-50%,-50%) scale(1.42)}}" +
    "#rhRib.fly .rb-logo{animation:none;transition:transform 1.3s cubic-bezier(.65,0,.3,1)}" +
    /* real satin strip: right half as is, left half mirrored so the gathered folds meet the bow */
    /* the strip starts exactly at the bow's edges, so the bow's own piece of ribbon joins it seamlessly */
    "#rhRib .rb-band{position:absolute;top:50%;left:0;right:0;height:64px;margin-top:-29.5px;cursor:pointer}" +
    "#rhRib .rb-half{position:absolute;top:0;bottom:0;background:url(/rib-band.webp) center/100% 100% no-repeat;transition:transform 1.4s cubic-bezier(.45,.05,.55,.95),opacity 1.4s}" +
    "#rhRib .rb-l{left:0;right:50%}#rhRib .rb-r{left:50%;right:0}" +
    /* both halves fade out where they meet under the bow, so no centre line shows */
    "#rhRib .rb-half{-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 70px);mask-image:linear-gradient(90deg,transparent 0,#000 70px)}" +
    "#rhRib .rb-l{transform:scaleX(-1)}" +
    "#rhRib.cut .rb-l{transform:translate(-8vw,70vh) rotate(-28deg) scaleX(-1);opacity:0}" +
    "#rhRib.cut .rb-r{transform:translate(8vw,70vh) rotate(28deg);opacity:0}" +
    "#rhRib .rb-bow{position:absolute;top:calc(50% - 49px);left:50%;width:285px;height:auto;margin-left:-142.5px;pointer-events:none;transition:transform 1.1s cubic-bezier(.45,.05,.55,.95),opacity 1s}" +
    "#rhRib.cut .rb-bow{transform:translateY(60vh) rotate(14deg);opacity:0}" +
    /* real gold scissors, smaller, blades pointing up at the ribbon; on tap they rise, snip, and cut */
    "#rhRib .rb-cut{position:absolute;top:calc(50% + 190px);left:50%;width:120px;margin:-31px 0 0 -60px;padding:0;border:0;background:none;cursor:pointer;transform:rotate(90deg);animation:rbHint 2s ease-in-out infinite}" +
    "#rhRib .rb-cut img{display:block;width:100%;height:auto;filter:drop-shadow(0 6px 8px rgba(80,55,10,.3))}" +
    "#rhRib .rb-cut:focus-visible{outline:2px solid #C9A25A;outline-offset:6px;border-radius:8px}" +
    "@keyframes rbHint{0%,100%{transform:translateY(0) rotate(90deg)}50%{transform:translateY(-8px) rotate(90deg)}}" +
    "#rhRib.snip .rb-cut{animation:rbSnip .62s cubic-bezier(.5,0,.3,1) forwards}" +
    "@keyframes rbSnip{0%{transform:translateY(0) rotate(90deg)}60%{transform:translateY(-158px) rotate(90deg)}75%{transform:translateY(-154px) rotate(90deg) scaleY(.55)}100%{transform:translateY(-158px) rotate(90deg) scaleY(1)}}" +
    "#rhRib.cut .rb-cut{animation:none;transform:translateY(-158px) rotate(90deg);opacity:0;transition:opacity .35s}" +
    "#rhRib .rb-skip{position:absolute;top:max(14px,env(safe-area-inset-top));inset-inline-end:14px;border:1px solid #E2E9E0;background:#fff;color:#4E5E53;font:600 12px/1 inherit;padding:8px 14px;border-radius:999px;cursor:pointer;opacity:.8}" +
    "#rhRib .rb-skip:hover{opacity:1}#rhRib.cut .rb-skip{opacity:0;pointer-events:none}" +
    "#rhRib canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}" +
    "@media(max-width:560px){#rhRib .rb-logo{height:86px}#rhRib .rb-band{height:50px;margin-top:-23px}#rhRib .rb-bow{width:220px;margin-left:-110px;top:calc(50% - 37.5px)}#rhRib .rb-cut{width:100px;margin:-26px 0 0 -50px;top:calc(50% + 178px)}" +
      "@keyframes rbSnip{0%{transform:translateY(0) rotate(90deg)}60%{transform:translateY(-152px) rotate(90deg)}75%{transform:translateY(-148px) rotate(90deg) scaleY(.55)}100%{transform:translateY(-152px) rotate(90deg) scaleY(1)}}#rhRib.cut .rb-cut{transform:translateY(-152px) rotate(90deg)}}" +
    (still ? "#rhRib *{transition-duration:.01s!important;animation:none!important}" : "");

  function build() {
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    var ldr = document.getElementById("loader"); if (ldr) ldr.hidden = true;   // the profile page's own intro is skipped while the ribbon shows
    var o = document.createElement("div"); o.id = "rhRib"; o.setAttribute("role", "dialog"); o.setAttribute("aria-label", "Rawan Hub");
    var ar = (document.documentElement.lang || "ar").indexOf("en") !== 0;
    o.innerHTML =
      '<div class="rb-bg"></div>' +
      '<div class="rb-band" aria-hidden="true"><span class="rb-half rb-l"></span><span class="rb-half rb-r"></span></div>' +
      '<img class="rb-bow" src="/rib-bow.webp" alt="" aria-hidden="true">' +
      (LOGO ? '<img class="rb-logo" src="' + LOGO + '" alt="Rawan Hub">' : "") +
      '<button type="button" class="rb-cut" aria-label="' + (ar ? "قص الشريطة" : "Cut the ribbon") + '"><img src="/rib-scissors.webp" alt=""></button>' +
      '<button type="button" class="rb-skip">' + (ar ? "تخطي" : "Skip") + "</button>";
    document.body.appendChild(o);
    // lock scrolling but keep the scrollbar's space, so the page (and its logo) doesn't shift when the ribbon closes
    var root = document.documentElement, ov = root.style.overflow, sg = root.style.scrollbarGutter;
    root.style.scrollbarGutter = "stable"; root.style.overflow = "hidden";
    var done = false;
    function finish() { root.style.overflow = ov; root.style.scrollbarGutter = sg; o.remove(); st.remove(); }
    function remember() { try { localStorage.setItem(KEY, "1"); } catch (e) {} }

    // after the celebration: the big logo glides into the header logo while the screen melts away
    function flyHome() {
      var logo = o.querySelector(".rb-logo"), t = TARGET && document.querySelector(TARGET);
      o.classList.add("fly");
      if (logo && t && t.getBoundingClientRect().width) {
        var a = logo.getBoundingClientRect(), b = t.getBoundingClientRect();
        var s = b.height / logo.offsetHeight;
        var dx = (b.left + b.width / 2) - (a.left + a.width / 2), dy = (b.top + b.height / 2) - (a.top + a.height / 2);
        logo.style.transform = "translate(" + dx + "px," + dy + "px) translate(-50%,-50%) scale(" + s + ")";
        setTimeout(finish, 1450);   // lands exactly on the page logo, then hands over to it (same image, so it looks like one logo)
      } else { if (logo) { logo.style.transition = "opacity .6s"; logo.style.opacity = "0"; } setTimeout(finish, 700); }
    }

    function cut() {
      if (done) return; done = true; remember(); unlockAudio();
      o.classList.add("snip");                                   // the scissors rise to the ribbon and snip
      setTimeout(function () {
        o.classList.add("cut"); confetti(o); applause();         // ribbon falls; the hidden logo pops in with the confetti + applause
        setTimeout(flyHome, still ? 300 : 3400);                 // logo stays and pulses for about 3 seconds, then glides into the site logo
      }, still ? 0 : 600);
    }
    o.querySelector(".rb-cut").addEventListener("click", cut);
    o.querySelector(".rb-band").addEventListener("click", cut);
    o.querySelector(".rb-skip").addEventListener("click", function () { if (done) return; done = true; remember(); o.style.transition = "opacity .4s"; o.style.opacity = "0"; setTimeout(finish, 420); });
    document.addEventListener("keydown", function k(e) { if (e.key === "Escape" && !done) { o.querySelector(".rb-skip").click(); document.removeEventListener("keydown", k); } });
  }

  function confetti(o) {
    if (still) return;
    var c = document.createElement("canvas"), x = c.getContext("2d"), dpr = Math.min(2, window.devicePixelRatio || 1);
    var W = innerWidth, H = innerHeight; c.width = W * dpr; c.height = H * dpr; x.scale(dpr, dpr); o.appendChild(c);
    var cols = ["#DFB072", "#F4D7A3", "#0E5544", "#8E1119", "#CAD7C5", "#EBC3B8", "#FFFFFF"], P = [];
    for (var i = 0; i < 180; i++) {
      var a = Math.random() * Math.PI * 2, v = 4 + Math.random() * 9;
      P.push({ x: W / 2, y: H / 2, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 6, w: 6 + Math.random() * 6, h: 8 + Math.random() * 8, r: Math.random() * 6, vr: (Math.random() - .5) * .35, c: cols[i % cols.length] });
    }
    var t0 = performance.now();
    (function f(t) {
      var k = (t - t0) / 1000; x.clearRect(0, 0, W, H);
      P.forEach(function (p) { p.vy += .3; p.vx *= .985; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.globalAlpha = Math.max(0, 1 - k / 2.6); x.fillStyle = p.c; x.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.r * 2))); x.restore(); });
      if (k < 2.7) requestAnimationFrame(f);
    })(t0);
  }

  // real applause + cheering (/rib-applause.mp3, Pixabay "Applause, cheer" by Driken5482), played gently:
  // starts quiet and builds up over ~1s (so nobody is startled), stays soft, then fades out after ~3s.
  var CLIP = null, AUD = null;
  try { CLIP = fetch("/rib-applause.mp3").then(function (r) { return r.ok ? r.arrayBuffer() : null; }).catch(function () { return null; }); } catch (e) {}
  // must run inside the click itself, otherwise phones (iPhone) keep the sound blocked
  function unlockAudio() {
    try { var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return; AUD = new AC(); if (AUD.resume) AUD.resume(); } catch (e) { AUD = null; }
  }
  function applause() {
    var ac = AUD; if (!ac) return;
    var done = function () { setTimeout(function () { try { ac.close(); } catch (e) {} }, 4600); };
    if (!CLIP) { synthApplause(ac); return done(); }
    CLIP.then(function (ab) {
      if (!ab) { synthApplause(ac); return done(); }
      ac.decodeAudioData(ab.slice(0), function (buf) {
        var src = ac.createBufferSource(), g = ac.createGain(), t = ac.currentTime + .02, VOL = .28;
        src.buffer = buf; src.connect(g); g.connect(ac.destination);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(VOL, t + 1.1);          // gentle build-up
        g.gain.setValueAtTime(VOL, t + 2.6);
        g.gain.linearRampToValueAtTime(0, t + 3.8);            // soft fade-out
        src.start(t, .45, 4); src.stop(t + 4);
        done();
      }, function () { synthApplause(ac); done(); });
    });
  }

  // fallback if the sound file can't load: soft synthesized claps
  function synthApplause(ac) {
    try {
      var sr = ac.sampleRate, len = Math.floor(sr * .04), buf = ac.createBuffer(1, len, sr), d = buf.getChannelData(0);
      for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
      var master = ac.createGain(), T = 2.3, now = ac.currentTime + .05; master.connect(ac.destination);
      master.gain.setValueAtTime(0, now); master.gain.linearRampToValueAtTime(.22, now + .8);
      for (var n = 0; n < 140; n++) {
        var at = now + Math.pow(Math.random(), 1.6) * T, s = ac.createBufferSource(), bp = ac.createBiquadFilter(), g = ac.createGain();
        s.buffer = buf; s.playbackRate.value = .8 + Math.random() * .6;
        bp.type = "bandpass"; bp.frequency.value = 900 + Math.random() * 1800; bp.Q.value = .9;
        g.gain.value = (.25 + Math.random() * .5) * (1 - (at - now) / (T + .4));
        s.connect(bp); bp.connect(g); g.connect(master); s.start(at);
      }
      master.gain.setValueAtTime(.22, now + T - .6); master.gain.linearRampToValueAtTime(0, now + T + .2);
    } catch (e) {}
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build); else build();
})();
