// ---- Page Loader ----
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) setTimeout(() => loader.classList.add('loaded'), 400);
});

document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const G = typeof gsap !== 'undefined';
  const S = typeof ScrollTrigger !== 'undefined';
  if (G && S) gsap.registerPlugin(ScrollTrigger);

  // ---- Hamburger ----
  const hb = document.querySelector('.hamburger'), mm = document.querySelector('.mobile-menu');
  if (hb && mm) {
    hb.onclick = () => { hb.classList.toggle('active'); mm.classList.toggle('active'); document.body.style.overflow = mm.classList.contains('active') ? 'hidden' : ''; };
    mm.querySelectorAll('a').forEach(a => a.onclick = () => { hb.classList.remove('active'); mm.classList.remove('active'); document.body.style.overflow = ''; });
  }

  // ---- Header ----
  const hdr = document.querySelector('.site-header');
  if (hdr) { const f = () => hdr.classList.toggle('scrolled', scrollY > 50); addEventListener('scroll', f, { passive: true }); f(); }

  // ---- Hero text ----
  if (G) {
    document.querySelectorAll('.hero-3d-full .anim-in').forEach(el => {
      gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: parseFloat(el.dataset.d || 0) });
    });
  }

  // ---- Scroll animations ----
  if (G && S) {
    document.querySelectorAll('.anim-up, .anim-fade-up').forEach(el => {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } });
    });
    document.querySelectorAll('.anim-fade-in').forEach(el => {
      gsap.to(el, { opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } });
    });
    document.querySelectorAll('.page-hero .anim-fade-up').forEach((el, i) => {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 + i * 0.12 });
    });
  } else {
    document.querySelectorAll('.anim-in,.anim-up,.anim-fade-up,.anim-fade-in').forEach(el => {
      el.style.opacity = '1'; el.style.transform = 'none';
    });
  }

  /* ===========================================================
     THREE.JS — PREMIUM 3D PRODUCT SHOWCASE
     Textured boat, holographic rings, floating labels,
     energy particle trails, glowing platform, dramatic lighting
     =========================================================== */
  const canvas = document.getElementById('boat-canvas');
  if (canvas && typeof THREE !== 'undefined') {

    // ---- SETUP ----
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0C1B3A, 0.025);
    const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.1, 1000);
    camera.position.set(0, 4, 12);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x0C1B3A);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // ---- GROUPS ----
    const boatGroup = new THREE.Group();
    const uiGroup = new THREE.Group();
    const platformGroup = new THREE.Group();
    scene.add(boatGroup, uiGroup, platformGroup);

    // ---- BOAT — Load actual PNG as textured plane ----
    const texLoader = new THREE.TextureLoader();
    texLoader.load('./assets/yali2.png', tex => {
      tex.encoding = THREE.sRGBEncoding;
      const aspect = tex.image.width / tex.image.height;
      const planeW = 7;
      const planeH = planeW / aspect;
      const geo = new THREE.PlaneGeometry(planeW, planeH);
      const mat = new THREE.MeshBasicMaterial({
        map: tex, transparent: true, side: THREE.DoubleSide,
        depthWrite: false
      });
      const boatPlane = new THREE.Mesh(geo, mat);
      boatPlane.position.set(0, 1.2, 0);
      boatGroup.add(boatPlane);

      // Reflection underneath (flipped, faded)
      const reflGeo = new THREE.PlaneGeometry(planeW, planeH);
      const reflMat = new THREE.MeshBasicMaterial({
        map: tex, transparent: true, opacity: 0.15,
        side: THREE.DoubleSide, depthWrite: false
      });
      const reflection = new THREE.Mesh(reflGeo, reflMat);
      reflection.position.set(0, -1.2, 0);
      reflection.scale.y = -1;
      boatGroup.add(reflection);
    });

    boatGroup.position.set(1.5, 0, 0);

    // ---- GLOWING PLATFORM — ring + grid ----
    // Main ring
    const ringGeo = new THREE.TorusGeometry(4.5, 0.02, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x2B5EA7, transparent: true, opacity: 0.5 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(1.5, -0.8, 0);
    platformGroup.add(ring);

    // Second ring (outer, fainter)
    const ring2Geo = new THREE.TorusGeometry(5.5, 0.015, 16, 150);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x2B5EA7, transparent: true, opacity: 0.15 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 2;
    ring2.position.set(1.5, -0.85, 0);
    platformGroup.add(ring2);

    // Inner ring (bright)
    const ring3Geo = new THREE.TorusGeometry(3, 0.025, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x2B5EA7, transparent: true, opacity: 0.35 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = -Math.PI / 2;
    ring3.position.set(1.5, -0.75, 0);
    platformGroup.add(ring3);

    // Grid plane — holographic floor
    const gridTex = (() => {
      const c = document.createElement('canvas');
      c.width = 512; c.height = 512;
      const ctx = c.getContext('2d');
      ctx.strokeStyle = 'rgba(255,102,0,0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 512; i += 32) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 512); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke();
      }
      return new THREE.CanvasTexture(c);
    })();
    gridTex.wrapS = gridTex.wrapT = THREE.RepeatWrapping;
    gridTex.repeat.set(4, 4);
    const gridGeo = new THREE.PlaneGeometry(30, 30);
    const gridMat = new THREE.MeshBasicMaterial({ map: gridTex, transparent: true, opacity: 0.4, depthWrite: false });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -0.9;
    platformGroup.add(grid);

    // ---- ORBITAL RINGS (holographic, different angles) ----
    function createOrbitRing(radius, tilt, color, opacity, speed) {
      const geo = new THREE.TorusGeometry(radius, 0.008, 8, 200);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = tilt;
      mesh.position.set(1.5, 1, 0);
      mesh.userData = { speed };
      uiGroup.add(mesh);
      return mesh;
    }
    const orbit1 = createOrbitRing(3.5, 1.2, 0x2B5EA7, 0.3, 0.3);
    const orbit2 = createOrbitRing(4.2, 0.8, 0x4488ff, 0.15, -0.2);
    const orbit3 = createOrbitRing(3.0, 1.5, 0x2B5EA7, 0.2, 0.15);

    // Small spheres orbiting (like data nodes)
    function createOrbiter(orbitRadius, tilt, color, size) {
      const geo = new THREE.SphereGeometry(size, 16, 16);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData = { orbitRadius, tilt, offset: Math.random() * Math.PI * 2 };
      uiGroup.add(mesh);

      // Glow around orbiter
      const glowGeo = new THREE.SphereGeometry(size * 3, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.1 });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      mesh.add(glow);

      return mesh;
    }
    const orb1 = createOrbiter(3.5, 1.2, 0x2B5EA7, 0.08);
    const orb2 = createOrbiter(4.2, 0.8, 0x4488ff, 0.06);
    const orb3 = createOrbiter(3.0, 1.5, 0x2B5EA7, 0.05);

    // (Labels removed — clean look)

    // ---- ENERGY PARTICLE TRAILS ----
    const trailCount = 500;
    const trailGeo = new THREE.BufferGeometry();
    const trailPos = new Float32Array(trailCount * 3);
    const trailVel = [];
    for (let i = 0; i < trailCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 3 + Math.random() * 3;
      trailPos[i * 3] = Math.cos(angle) * r + 1.5;
      trailPos[i * 3 + 1] = (Math.random() - 0.3) * 4;
      trailPos[i * 3 + 2] = Math.sin(angle) * r;
      trailVel.push({ angle, r, speed: 0.1 + Math.random() * 0.3, ySpeed: (Math.random() - 0.5) * 0.02 });
    }
    trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3));
    const trailMat = new THREE.PointsMaterial({ color: 0x2B5EA7, size: 0.025, transparent: true, opacity: 0.5, sizeAttenuation: true });
    const trails = new THREE.Points(trailGeo, trailMat);
    scene.add(trails);

    // Background stars
    const sGeo = new THREE.BufferGeometry();
    const sPos = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) { sPos[i*3]=(Math.random()-.5)*60; sPos[i*3+1]=Math.random()*20-2; sPos[i*3+2]=(Math.random()-.5)*40; }
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    scene.add(new THREE.Points(sGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0.12 })));

    // ---- LIGHTING ----
    scene.add(new THREE.AmbientLight(0x111122, 0.4));
    const spot = new THREE.SpotLight(0xffeedd, 2, 40, Math.PI / 5, 0.6, 1);
    spot.position.set(6, 14, 6);
    spot.castShadow = true;
    scene.add(spot);
    const rimLight = new THREE.PointLight(0x2B5EA7, 2, 20, 2);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);
    const fillLight = new THREE.PointLight(0x2244aa, 0.6, 25, 2);
    fillLight.position.set(-4, 5, 8);
    scene.add(fillLight);
    const underGlow = new THREE.PointLight(0x2B5EA7, 0.8, 12, 2);
    underGlow.position.set(1.5, -1, 0);
    scene.add(underGlow);

    // ---- MOUSE + SCROLL ----
    let mx = 0, my = 0, tmx = 0, tmy = 0;
    addEventListener('mousemove', e => { tmx = (e.clientX / innerWidth - 0.5) * 2; tmy = (e.clientY / innerHeight - 0.5) * 2; });

    let scrollProg = 0;
    const heroEl = document.getElementById('hero');
    if (heroEl && G && S) {
      ScrollTrigger.create({ trigger: heroEl, start: 'top top', end: 'bottom top',
        onUpdate: s => { scrollProg = s.progress; }
      });
    }

    // ---- RENDER LOOP ----
    const clock = new THREE.Clock();
    (function loop() {
      requestAnimationFrame(loop);
      const t = clock.getElapsedTime();

      // Smooth mouse
      mx += (tmx - mx) * 0.025;
      my += (tmy - my) * 0.025;

      // Boat group animation
      boatGroup.rotation.y = -0.2 + mx * 0.3;
      boatGroup.position.y = Math.sin(t * 0.6) * 0.1;

      // Camera
      camera.position.x = mx * 2;
      camera.position.y = 4 - my * 1.2 - scrollProg * 2;
      camera.position.z = 12 - scrollProg * 5;
      camera.lookAt(1.5, 0.5, 0);

      // Orbital rings rotate
      orbit1.rotation.y = t * orbit1.userData.speed;
      orbit2.rotation.y = t * orbit2.userData.speed;
      orbit3.rotation.y = t * orbit3.userData.speed;

      // Orbiters follow their ring paths
      [orb1, orb2, orb3].forEach((orb, i) => {
        const d = orb.userData;
        const angle = t * (0.3 + i * 0.1) + d.offset;
        orb.position.set(
          Math.cos(angle) * d.orbitRadius + 1.5,
          1 + Math.sin(angle * 0.5) * 0.3,
          Math.sin(angle) * d.orbitRadius
        );
      });

      // Platform rings pulse
      ring.material.opacity = 0.4 + Math.sin(t * 0.8) * 0.1;
      ring3.rotation.z = t * 0.1;

      // Energy trail particles orbit
      const tPos = trailGeo.attributes.position;
      for (let i = 0; i < trailCount; i++) {
        const v = trailVel[i];
        v.angle += v.speed * 0.01;
        tPos.setX(i, Math.cos(v.angle) * v.r + 1.5);
        tPos.setY(i, tPos.getY(i) + v.ySpeed);
        tPos.setZ(i, Math.sin(v.angle) * v.r);
        // Reset if too high/low
        if (tPos.getY(i) > 4 || tPos.getY(i) < -2) v.ySpeed *= -1;
      }
      tPos.needsUpdate = true;

      // Lights pulse
      rimLight.intensity = 1.5 + Math.sin(t * 0.7) * 0.5;
      underGlow.intensity = 0.6 + Math.sin(t * 1.1) * 0.2;

      renderer.render(scene, camera);
    })();

    addEventListener('resize', () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    });
  }

  // ---- Marquee ----
  document.querySelectorAll('.ticker__track,.bgtext__track').forEach(tr => {
    Array.from(tr.children).forEach(c => tr.appendChild(c.cloneNode(true)));
  });

  // ---- Gallery tabs ----
  document.querySelectorAll('.tab-btn').forEach(b => b.onclick = () => {
    document.querySelectorAll('.tab-btn').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    const t = document.getElementById(b.dataset.tab); if (t) t.classList.add('active');
  });

  // ---- Alumni ----
  const tb = document.getElementById('toggleAlumni'), tc = document.getElementById('alumniContent');
  if (tb && tc) tb.onclick = () => { tc.classList.toggle('hidden'); tb.textContent = tc.classList.contains('hidden') ? 'View Past Members' : 'Hide Past Members'; };
  document.querySelectorAll('.batch-tab').forEach(t => t.onclick = () => {
    document.querySelectorAll('.batch-tab').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.batch-content').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    const el = document.getElementById(t.dataset.batch); if (el) el.classList.add('active');
  });

  // ---- Hero Countdown (home page) ----
  const hd=document.getElementById('h-days'),hh=document.getElementById('h-hours'),hm=document.getElementById('h-mins'),hs=document.getElementById('h-secs');
  if(hd&&hh&&hm&&hs){const tgt=new Date('July 8,2026').getTime();const tick=()=>{const d=Math.max(0,tgt-Date.now());hd.textContent=String(Math.floor(d/864e5)).padStart(2,'0');hh.textContent=String(Math.floor(d%864e5/36e5)).padStart(2,'0');hm.textContent=String(Math.floor(d%36e5/6e4)).padStart(2,'0');hs.textContent=String(Math.floor(d%6e4/1e3)).padStart(2,'0')};tick();setInterval(tick,1e3)}

  // ---- Countdown (about page) ----
  const dE=document.getElementById('days'),hE=document.getElementById('hours'),mE=document.getElementById('minutes'),sE=document.getElementById('seconds');
  if(dE&&hE&&mE&&sE){const tgt=new Date('July 8,2026').getTime();const tick=()=>{const d=Math.max(0,tgt-Date.now());dE.textContent=String(Math.floor(d/864e5)).padStart(2,'0');hE.textContent=String(Math.floor(d%864e5/36e5)).padStart(2,'0');mE.textContent=String(Math.floor(d%36e5/6e4)).padStart(2,'0');sE.textContent=String(Math.floor(d%6e4/1e3)).padStart(2,'0')};tick();setInterval(tick,1e3)}

  // ---- Back to top ----
  const btt = document.querySelector('.back-to-top');
  if (btt) btt.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

  // ---- Edition slider ----
  const sliderTrack = document.querySelector('.edition-slider__track');
  const prevBtn = document.querySelector('.edition-slider__btn--prev');
  const nextBtn = document.querySelector('.edition-slider__btn--next');
  if (sliderTrack && prevBtn && nextBtn) {
    const getCardWidth = () => sliderTrack.querySelector('.edition-card').offsetWidth + 30;
    prevBtn.onclick = () => sliderTrack.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
    nextBtn.onclick = () => sliderTrack.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
    // Touch / trackpad swipe support
    let touchStartX = 0;
    sliderTrack.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    sliderTrack.addEventListener('touchend', e => {
      const dx = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 40) sliderTrack.scrollBy({ left: dx > 0 ? getCardWidth() : -getCardWidth(), behavior: 'smooth' });
    }, { passive: true });
  }

  // ---- Smooth anchor ----
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href'); if (id === '#') return;
    const el = document.querySelector(id); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
  }));
});
