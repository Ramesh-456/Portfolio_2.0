const data = RESUME_DATA;

(function updateExperienceDynamically() {
  const startDate = new Date(2023, 1, 1); // Feb 2023
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // 15+ days reach aana adhuku next month ah round-up pannudhu
  if (days >= 15) {
    months += 1;
    if (months === 12) {
      months = 0;
      years += 1;
    }
  }

  const experienceText = `${years} Years ${months} Months`;

  document.title = `Ramesh S | Full Stack Developer – Angular & Spring Boot | ${experienceText} Experience`;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute(
      'content',
      `Portfolio of Ramesh S, a full stack developer with ${experienceText.toLowerCase()} of experience building secure, scalable finance-grade web platforms using Angular, Spring Boot, AWS, and PostgreSQL. Explore projects, experience, and core engineering strengths.`
    );
  }

  const eyebrow = document.querySelector('.hero-section .eyebrow');
  if (eyebrow) {
    eyebrow.textContent = `FULL STACK DEVELOPER · ${experienceText.toUpperCase()} EXPERIENCE`;
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  hydratePortfolio();
  syncHeroHeading();
  initRevealAnimations();
  initScrollStages();
  initHashNavigation();
  initHeroScene();
  initFloatingCards();
  initTechChips();
  window.addEventListener('resize', syncHeroHeading);
});

let activeSceneSection = 'hero';

function hydratePortfolio() {
  document.getElementById('hero-heading').textContent = data.hero.heading.desktop;
  document.getElementById('hero-summary').textContent = data.hero.summary;
  document.getElementById('profile-text').textContent = data.profile;
  document.getElementById('contact-title').textContent = `${data.personal.title} · ${data.personal.location}`;

  renderMetrics();
  renderEducation();
  renderCapabilities();
  renderSignals();
  renderExperience();
  renderProjects();
  renderWorkflow();
  renderLanguages();
  renderContacts();
}

function syncHeroHeading() {
  const heading = document.getElementById('hero-heading');

  if (!heading) {
    return;
  }

  heading.textContent = window.innerWidth <= 640 ? data.hero.heading.mobile : data.hero.heading.desktop;
}

function renderMetrics() {
  const container = document.getElementById('hero-metrics');
  container.innerHTML = data.hero.metrics
    .map(metric => `
      <article class="metric">
        <strong>${metric.value}</strong>
        <span>${metric.label}</span>
      </article>
    `)
    .join('');
}

function renderEducation() {
  const education = data.education;
  document.getElementById('education-block').innerHTML = `
    <div class="education-meta">
      <strong>${education.degree}</strong>
      <span>${education.college}</span>
      <span>${education.year}</span>
    </div>
  `;
}

function renderCapabilities() {
  const container = document.getElementById('capability-grid');
  const sections = [
    ['Frontend', data.skills.frontend],
    ['Backend', data.skills.backend],
    ['Cloud & Platform', data.skills.cloud],
    ['Data & Security', data.skills.data],
    ['Tools', data.skills.tools]
  ];

  container.innerHTML = sections
    .map(([title, tags]) => `
      <article class="capability-block">
        <h4>${title}</h4>
        <div class="tag-row">${tags.map(tag => `<span>${tag}</span>`).join('')}</div>
      </article>
    `)
    .join('');
}

function renderSignals() {
  document.getElementById('signal-strip').innerHTML = data.signals
    .map(signal => `
      <article class="signal-card">
        <strong>${signal.value}</strong>
        <span>${signal.label}</span>
      </article>
    `)
    .join('');
}

function renderExperience() {
  const container = document.getElementById('experience-timeline');

  container.innerHTML = data.experience
    .map(item => `
      <article class="timeline-card reveal">
        <div class="timeline-top">
          <div class="timeline-heading">
            <span class="company-logo-frame${item.logo.shape === 'circle' ? ' company-logo-frame--circle' : ''}">
              <img class="company-logo" src="${item.logo.src}" alt="${item.logo.alt}" loading="lazy" />
            </span>
            <div>
              <p class="timeline-meta">${item.duration}</p>
              <h3>${item.role}</h3>
              <p class="timeline-company">${item.company}</p>
            </div>
          </div>
          <p class="timeline-company">${item.project}</p>
        </div>
        <p class="timeline-description">${item.description}</p>
        <ul class="timeline-list">
          ${item.responsibilities.map(point => `<li>${point}</li>`).join('')}
        </ul>
        <div class="timeline-tags">
          ${item.techStack.map(tag => `<span>${tag}</span>`).join('')}
        </div>
      </article>
    `)
    .join('<div class="timeline-connector" aria-hidden="true"><span class="timeline-connector-pulse"></span></div>');
}

function renderProjects() {
  const container = document.getElementById('project-grid');

  container.innerHTML = data.experience
    .map(item => `
      <article class="project-card reveal">
        <div class="project-top">
          <div>
            <p class="project-kicker">${item.caseStudy.title}</p>
            <h3>${item.project}</h3>
          </div>
          <p class="timeline-company">${item.role}</p>
        </div>
        <p class="project-description">${item.caseStudy.summary}</p>
        <ul class="project-list">
          ${item.caseStudy.bullets.map(point => `<li>${point}</li>`).join('')}
        </ul>
        <div class="project-tags">
          ${item.techStack.slice(0, 6).map(tag => `<span>${tag}</span>`).join('')}
        </div>
      </article>
    `)
    .join('');
}

function renderWorkflow() {
  document.getElementById('workflow-list').innerHTML = data.workflow
    .map(item => `<li>${item}</li>`)
    .join('');
}

function renderLanguages() {
  document.getElementById('language-list').innerHTML = data.languages
    .map(language => `<span class="language-pill">${language}</span>`)
    .join('');
}

function renderContacts() {
  const contacts = [
    { label: 'Email', value: data.personal.email, href: `mailto:${data.personal.email}` },
    { label: 'Phone', value: data.personal.phone, href: `tel:${data.personal.phone.replace(/\s+/g, '')}` },
    { label: 'Location', value: data.personal.location, href: '#hero' }
  ];

  document.getElementById('contact-links').innerHTML = contacts
    .map(item => `
      <a class="contact-link" href="${item.href}">
        <span>${item.label}</span>
        <span>${item.value}</span>
      </a>
    `)
    .join('');
}

function initRevealAnimations() {
  const reveals = gsap.utils.toArray('.reveal');
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  if (!releasesSupported()) {
    reveals.forEach(element => {
      showReveal(element);
    });
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        showReveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  reveals.forEach(element => {
    observer.observe(element);

    const rect = element.getBoundingClientRect();
    if (rect.top < viewportHeight * 0.9 && rect.bottom > 0) {
      showReveal(element);
    }
  });
}

function showReveal(element) {
  if (!element || element.dataset.revealed === 'true') {
    return;
  }

  element.dataset.revealed = 'true';
  gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out'
  });
}

function initScrollStages() {
  const steps = Array.from(document.querySelectorAll('.story-step'));
  let pinnedStepId = window.location.hash ? window.location.hash.slice(1) : null;
  let pinnedUntil = pinnedStepId ? Date.now() + 900 : 0;

  if (!steps.length) {
    return;
  }

  let ticking = false;

  function applyStageState() {
    const viewportTarget = window.innerHeight * (window.innerWidth <= 1080 ? 0.28 : 0.34);
    let activeIndex = -1;
    const pinnedIndex = steps.findIndex(step => step.id === pinnedStepId);

    if (pinnedIndex >= 0 && Date.now() < pinnedUntil) {
      activeIndex = pinnedIndex;
    } else {
      pinnedStepId = null;
      pinnedUntil = 0;

      steps.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        if (rect.top <= viewportTarget) {
          activeIndex = index;
        }
      });
    }

    // short final sections may never cross viewportTarget, so force the last step active at page-bottom
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom && (!pinnedStepId || Date.now() >= pinnedUntil)) {
      activeIndex = steps.length - 1;
    }

    steps.forEach((step, index) => {
      step.classList.toggle('is-active', index === activeIndex);
      step.classList.toggle('is-past', index < activeIndex);

      if (index === activeIndex) {
        step.querySelectorAll('.reveal').forEach(showReveal);
      }
    });

    activeSceneSection = steps[activeIndex]?.id || 'hero';
    syncActiveNav(activeIndex >= 0 ? getActiveNavId(steps[activeIndex]?.id) : '');

    ticking = false;
  }

  function queueStageState() {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(applyStageState);
  }

  applyStageState();
  window.requestAnimationFrame(applyStageState);
  window.addEventListener('scroll', queueStageState, { passive: true });
  window.addEventListener('resize', queueStageState);
  window.addEventListener('hashchange', () => {
    pinnedStepId = window.location.hash ? window.location.hash.slice(1) : null;
    pinnedUntil = pinnedStepId ? Date.now() + 900 : 0;
    queueStageState();
  });
  window.addEventListener('load', () => {
    pinnedStepId = window.location.hash ? window.location.hash.slice(1) : pinnedStepId;
    pinnedUntil = pinnedStepId ? Date.now() + 900 : pinnedUntil;
    queueStageState();
  });
}

function getActiveNavId(stepId) {
  const navOrder = ['about', 'experience', 'projects', 'contact'];

  if (navOrder.includes(stepId)) {
    return stepId;
  }

  if (stepId === 'signals') {
    return 'about';
  }

  if (stepId === 'workflow') {
    return 'projects';
  }

  return '';
}

function syncActiveNav(activeId) {
  document.querySelectorAll('.top-nav a').forEach(link => {
    const linkId = link.getAttribute('href')?.replace('#', '') || '';
    link.classList.toggle('is-active', linkId === activeId);
  });
}

function initHashNavigation() {
  syncHashTargetScroll();

  window.addEventListener('hashchange', () => {
    window.requestAnimationFrame(syncHashTargetScroll);
  });

  window.addEventListener('load', () => {
    // only re-sync on load if a hash target is pending; otherwise this would yank scroll back to 0
    if (window.location.hash) {
      window.requestAnimationFrame(syncHashTargetScroll);
    }
  });
}

function syncHashTargetScroll() {
  const hash = window.location.hash;

  if (!hash) {
    syncActiveNav('');
    window.scrollTo({ top: 0, behavior: 'auto' });
    return;
  }

  const target = document.querySelector(hash);
  const header = document.querySelector('.site-header');

  if (!target) {
    return;
  }

  const headerOffset = header ? header.getBoundingClientRect().height + 26 : 100;
  const targetTop = window.scrollY + target.getBoundingClientRect().top - headerOffset;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: 'auto'
  });

  activeSceneSection = target.id || activeSceneSection;
  syncActiveNav(getActiveNavId(target.id));
}

function releasesSupported() {
  return 'IntersectionObserver' in window;
}

function initFloatingCards() {
  gsap.to('.card-primary', {
    y: -16,
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  gsap.to('.card-secondary', {
    y: 18,
    duration: 3.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}

function initTechChips() {
  gsap.to('.chip-1', { y: -12, duration: 3.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.chip-2', { y: 14, duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.3 });
  gsap.to('.chip-3', { y: -10, duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.6 });
  gsap.to('.chip-4', { y: 12, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.2 });
}

function initHeroScene() {
  const canvas = document.getElementById('scene-canvas');

  if (!canvas || typeof THREE === 'undefined') {
    return;
  }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 8);
  const scrollState = { current: 0, target: 0 };
  const sceneState = {
    pathProgress: 0,
    accent: new THREE.Color(0x67e8f9),
    fill: new THREE.Color(0x22c55e),
    ring: new THREE.Color(0x67e8f9),
    shapeFrom: 0,
    shapeTo: 0,
    shapeMix: 1
  };
  const isMobile = () => window.innerWidth <= 640;
  const isTablet = () => window.innerWidth <= 1080;

  const group = new THREE.Group();
  scene.add(group);

  function createOutlinePair(geometry) {
    const core = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry, 18),
      new THREE.LineBasicMaterial({
        color: 0xbffaff,
        transparent: true,
        opacity: 0.46
      })
    );
    const glow = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry, 18),
      new THREE.LineBasicMaterial({
        color: 0x9df3ff,
        transparent: true,
        opacity: 0.24,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );

    core.userData.glowRatio = 1;
    core.userData.scaleRatio = 1;
    glow.userData.glowRatio = 0.45;
    glow.userData.scaleRatio = 1.08;
    glow.scale.setScalar(1.08);

    return [core, glow];
  }

  function buildWireShape(geometry) {
    const holder = new THREE.Group();
    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshPhysicalMaterial({
        color: 0x67e8f9,
        emissive: 0x67e8f9,
        emissiveIntensity: 0.16,
        roughness: 0.18,
        metalness: 0.18,
        clearcoat: 0.42,
        transmission: 0.08,
        transparent: true,
        opacity: 0.18
      })
    );
    const [outline, glow] = createOutlinePair(geometry);

    holder.add(mesh);
    holder.add(outline);
    holder.add(glow);

    return {
      holder,
      mesh,
      outline,
      surfaces: [mesh],
      outlines: [outline, glow]
    };
  }

  function buildGearCoreShape() {
    const holder = new THREE.Group();
    const surfaces = [];
    const outlines = [];

    function addPart(geometry, position, rotation, scale = 1) {
      const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshPhysicalMaterial({
          color: 0x67e8f9,
          emissive: 0x67e8f9,
          emissiveIntensity: 0.14,
          roughness: 0.22,
          metalness: 0.22,
          clearcoat: 0.42,
          transmission: 0.06,
          transparent: true,
          opacity: 0.18
        })
      );
      const [outline, glow] = createOutlinePair(geometry);

      mesh.position.copy(position);
      mesh.rotation.set(rotation.x, rotation.y, rotation.z);
      mesh.scale.setScalar(scale);
      [outline, glow].forEach(line => {
        line.position.copy(position);
        line.rotation.set(rotation.x, rotation.y, rotation.z);
        line.scale.multiplyScalar(scale * 1.02);
      });

      holder.add(mesh);
      holder.add(outline);
      holder.add(glow);
      surfaces.push(mesh);
      outlines.push(outline, glow);
    }

    addPart(new THREE.TorusGeometry(1.3, 0.32, 8, 26), new THREE.Vector3(0, 0, 0), new THREE.Euler(Math.PI / 2, 0, 0), 1);
    addPart(new THREE.OctahedronGeometry(0.68, 0), new THREE.Vector3(0, 0, 0), new THREE.Euler(0.4, 0.2, 0), 1);

    for (let index = 0; index < 8; index += 1) {
      const angle = (index / 8) * Math.PI * 2;
      addPart(
        new THREE.BoxGeometry(0.34, 0.56, 0.24),
        new THREE.Vector3(Math.cos(angle) * 1.62, Math.sin(angle) * 1.62, 0),
        new THREE.Euler(0, 0, angle),
        1
      );
    }

    const mesh = surfaces[0];
    const outline = outlines[0];

    return { holder, mesh, outline, surfaces, outlines };
  }

  function buildLaptopShape() {
    const holder = new THREE.Group();
    const surfaces = [];
    const outlines = [];
    const screenObjects = [];

    function addPart(geometry, position, rotation, isScreen) {
      const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshPhysicalMaterial({
          color: 0x67e8f9,
          emissive: 0x67e8f9,
          emissiveIntensity: 0.16,
          roughness: 0.18,
          metalness: 0.18,
          clearcoat: 0.42,
          transmission: 0.08,
          transparent: true,
          opacity: 0.18
        })
      );
      const [outline, glow] = createOutlinePair(geometry);

      mesh.position.copy(position);
      mesh.rotation.set(rotation.x, rotation.y, rotation.z);
      [outline, glow].forEach(line => {
        line.position.copy(position);
        line.rotation.set(rotation.x, rotation.y, rotation.z);
      });

      holder.add(mesh);
      holder.add(outline);
      holder.add(glow);
      surfaces.push(mesh);
      outlines.push(outline, glow);

      if (isScreen) {
        screenObjects.push(mesh, outline, glow);
      }
    }

    const flat = new THREE.Euler(0, 0, 0);
    addPart(new THREE.BoxGeometry(1.5, 0.09, 1.05), new THREE.Vector3(0, -0.4, 0.22), flat, false);

    const screenHeight = 1.05;
    const screenGeometry = new THREE.BoxGeometry(1.5, screenHeight, 0.06);
    screenGeometry.translate(0, screenHeight / 2, 0);
    const hingePoint = new THREE.Vector3(0, -0.4, -0.31);
    addPart(screenGeometry, hingePoint, new THREE.Euler(-1.86, 0, 0), true);

    return {
      holder,
      mesh: surfaces[0],
      outline: outlines[0],
      surfaces,
      outlines,
      updateFold(elapsed) {
        const openAngle = -1.86;
        const closedAngle = -0.22;
        const t = (Math.sin(elapsed * 0.55) + 1) / 2;
        const angle = closedAngle + (openAngle - closedAngle) * t;
        screenObjects.forEach(part => {
          part.rotation.x = angle;
        });
      }
    };
  }

  function buildProfileCardShape() {
    const holder = new THREE.Group();
    const surfaces = [];
    const outlines = [];

    function addPart(geometry, position, rotation) {
      const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshPhysicalMaterial({
          color: 0x67e8f9,
          emissive: 0x67e8f9,
          emissiveIntensity: 0.16,
          roughness: 0.2,
          metalness: 0.2,
          clearcoat: 0.42,
          transmission: 0.08,
          transparent: true,
          opacity: 0.18
        })
      );
      const [outline, glow] = createOutlinePair(geometry);

      mesh.position.copy(position);
      mesh.rotation.set(rotation.x, rotation.y, rotation.z);
      [outline, glow].forEach(line => {
        line.position.copy(position);
        line.rotation.set(rotation.x, rotation.y, rotation.z);
      });

      holder.add(mesh);
      holder.add(outline);
      holder.add(glow);
      surfaces.push(mesh);
      outlines.push(outline, glow);
    }

    const flat = new THREE.Euler(0, 0, 0);
    const w = 1.3;
    const h = 0.95;
    const r = 0.16;
    const cardShape = new THREE.Shape();
    cardShape.moveTo(-w + r, -h);
    cardShape.lineTo(w - r, -h);
    cardShape.quadraticCurveTo(w, -h, w, -h + r);
    cardShape.lineTo(w, h - r);
    cardShape.quadraticCurveTo(w, h, w - r, h);
    cardShape.lineTo(-w + r, h);
    cardShape.quadraticCurveTo(-w, h, -w, h - r);
    cardShape.lineTo(-w, -h + r);
    cardShape.quadraticCurveTo(-w, -h, -w + r, -h);
    cardShape.closePath();

    // circular photo-slot cutout, top-left of the card
    const photoHole = new THREE.Path();
    photoHole.absarc(-0.62, 0.34, 0.4, 0, Math.PI * 2, false);
    cardShape.holes.push(photoHole);

    const cardGeometry = new THREE.ExtrudeGeometry(cardShape, {
      depth: 0.14,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 1
    });
    cardGeometry.translate(0, 0, -0.07);
    addPart(cardGeometry, new THREE.Vector3(0, 0, 0), flat);

    // name/title/bio line bars beside and below the photo slot
    addPart(new THREE.BoxGeometry(0.66, 0.1, 0.05), new THREE.Vector3(0.34, 0.46, 0.11), flat);
    addPart(new THREE.BoxGeometry(0.48, 0.07, 0.05), new THREE.Vector3(0.4, 0.24, 0.11), flat);
    addPart(new THREE.BoxGeometry(0.92, 0.06, 0.05), new THREE.Vector3(0, -0.32, 0.11), flat);
    addPart(new THREE.BoxGeometry(0.92, 0.06, 0.05), new THREE.Vector3(0, -0.5, 0.11), flat);
    addPart(new THREE.BoxGeometry(0.68, 0.06, 0.05), new THREE.Vector3(-0.12, -0.68, 0.11), flat);

    return { holder, mesh: surfaces[0], outline: outlines[0], surfaces, outlines };
  }

  function buildBrowserWindowShape() {
    const holder = new THREE.Group();
    const surfaces = [];
    const outlines = [];

    function addPart(geometry, position, rotation) {
      const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshPhysicalMaterial({
          color: 0x67e8f9,
          emissive: 0x67e8f9,
          emissiveIntensity: 0.16,
          roughness: 0.2,
          metalness: 0.2,
          clearcoat: 0.42,
          transmission: 0.08,
          transparent: true,
          opacity: 0.18
        })
      );
      const [outline, glow] = createOutlinePair(geometry);

      mesh.position.copy(position);
      mesh.rotation.set(rotation.x, rotation.y, rotation.z);
      [outline, glow].forEach(line => {
        line.position.copy(position);
        line.rotation.set(rotation.x, rotation.y, rotation.z);
      });

      holder.add(mesh);
      holder.add(outline);
      holder.add(glow);
      surfaces.push(mesh);
      outlines.push(outline, glow);
    }

    const flat = new THREE.Euler(0, 0, 0);

    addPart(new THREE.BoxGeometry(1.9, 1.3, 0.05), new THREE.Vector3(0, -0.1, 0), flat);
    addPart(new THREE.BoxGeometry(1.9, 0.26, 0.08), new THREE.Vector3(0, 0.68, 0.015), flat);

    // traffic-light window controls in the tab bar
    [-0.78, -0.64, -0.5].forEach(x => {
      addPart(new THREE.OctahedronGeometry(0.05, 0), new THREE.Vector3(x, 0.68, 0.07), flat);
    });

    addPart(new THREE.BoxGeometry(1.5, 0.08, 0.07), new THREE.Vector3(0, 0.28, 0.05), flat);
    addPart(new THREE.BoxGeometry(1.1, 0.08, 0.07), new THREE.Vector3(-0.2, 0.06, 0.05), flat);
    addPart(new THREE.BoxGeometry(1.5, 0.08, 0.07), new THREE.Vector3(0, -0.16, 0.05), flat);
    addPart(new THREE.BoxGeometry(0.85, 0.08, 0.07), new THREE.Vector3(-0.325, -0.38, 0.05), flat);

    return { holder, mesh: surfaces[0], outline: outlines[0], surfaces, outlines };
  }

  function buildSpringCoilShape() {
    class HelixCurve extends THREE.Curve {
      getPoint(t) {
        const turns = 4.5;
        const angle = t * Math.PI * 2 * turns;
        const radius = 0.5;
        const y = (t - 0.5) * 2.1;
        return new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      }
    }

    const curve = new HelixCurve();
    const geometry = new THREE.TubeGeometry(curve, 160, 0.1, 8, false);
    return buildWireShape(geometry);
  }

  function buildFlowShape() {
    const holder = new THREE.Group();
    const surfaces = [];
    const outlines = [];

    function addPart(geometry, position, rotation) {
      const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshPhysicalMaterial({
          color: 0x67e8f9,
          emissive: 0x67e8f9,
          emissiveIntensity: 0.14,
          roughness: 0.2,
          metalness: 0.2,
          clearcoat: 0.4,
          transmission: 0.06,
          transparent: true,
          opacity: 0.18
        })
      );
      const [outline, glow] = createOutlinePair(geometry);

      mesh.position.copy(position);
      mesh.rotation.set(rotation.x, rotation.y, rotation.z);
      [outline, glow].forEach(line => {
        line.position.copy(position);
        line.rotation.set(rotation.x, rotation.y, rotation.z);
      });

      holder.add(mesh);
      holder.add(outline);
      holder.add(glow);
      surfaces.push(mesh);
      outlines.push(outline, glow);
    }

    addPart(new THREE.CylinderGeometry(0.05, 0.05, 2.4, 6), new THREE.Vector3(0, 0, 0), new THREE.Euler(0, 0, 0));

    const nodeYs = [1.15, 0.4, -0.4, -1.15];
    nodeYs.forEach(y => {
      addPart(new THREE.OctahedronGeometry(0.16, 0), new THREE.Vector3(0, y, 0), new THREE.Euler(0.2, 0.3, 0));
    });

    const up = new THREE.Vector3(0, 1, 0);
    const branchSpecs = [
      { origin: new THREE.Vector3(0, 0.75, 0), angle: 0.7 },
      { origin: new THREE.Vector3(0, 0, 0), angle: -0.7 },
      { origin: new THREE.Vector3(0, -0.75, 0), angle: 0.7 }
    ];

    branchSpecs.forEach(({ origin, angle }) => {
      const length = 0.85;
      const direction = new THREE.Vector3(Math.sin(angle), Math.cos(angle) * 0.35, 0).normalize();
      const end = origin.clone().add(direction.clone().multiplyScalar(length));
      const midpoint = origin.clone().add(end).multiplyScalar(0.5);
      const rodEuler = new THREE.Euler().setFromQuaternion(new THREE.Quaternion().setFromUnitVectors(up, direction));
      addPart(new THREE.CylinderGeometry(0.035, 0.035, length, 5), midpoint, rodEuler);
      addPart(new THREE.IcosahedronGeometry(0.13, 0), end, new THREE.Euler(0, 0, 0));
    });

    return { holder, mesh: surfaces[0], outline: outlines[0], surfaces, outlines };
  }

  function buildEnvelopeShape() {
    const holder = new THREE.Group();
    const surfaces = [];
    const outlines = [];

    function addPart(geometry, position, rotation) {
      const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshPhysicalMaterial({
          color: 0x67e8f9,
          emissive: 0x67e8f9,
          emissiveIntensity: 0.16,
          roughness: 0.2,
          metalness: 0.2,
          clearcoat: 0.42,
          transmission: 0.08,
          transparent: true,
          opacity: 0.18
        })
      );
      const [outline, glow] = createOutlinePair(geometry);

      mesh.position.copy(position);
      mesh.rotation.set(rotation.x, rotation.y, rotation.z);
      [outline, glow].forEach(line => {
        line.position.copy(position);
        line.rotation.set(rotation.x, rotation.y, rotation.z);
      });

      holder.add(mesh);
      holder.add(outline);
      holder.add(glow);
      surfaces.push(mesh);
      outlines.push(outline, glow);
    }

    const flat = new THREE.Euler(0, 0, 0);

    // solid parcel body carries real depth so it reads as an envelope from any rotation, not just face-on
    addPart(new THREE.BoxGeometry(1.7, 1.05, 0.4), new THREE.Vector3(0, 0, 0), flat);

    // diagonal flap-seam ridges on the front face, meeting in a V
    addPart(new THREE.BoxGeometry(1.05, 0.1, 0.06), new THREE.Vector3(-0.425, 0.21, 0.23), new THREE.Euler(0, 0, -0.635));
    addPart(new THREE.BoxGeometry(1.05, 0.1, 0.06), new THREE.Vector3(0.425, 0.21, 0.23), new THREE.Euler(0, 0, 0.635));

    return { holder, mesh: surfaces[0], outline: outlines[0], surfaces, outlines };
  }

  const shapeConfigs = [
    { createObject: buildLaptopShape, speedX: 0.07, speedY: 0.1, bob: 0.12 },
    { createObject: buildProfileCardShape, speedX: 0.14, speedY: 0.2, bob: 0.14 },
    { createObject: buildEnvelopeShape, speedX: 0.24, speedY: 0.32, bob: 0.18 },
    { createObject: buildBrowserWindowShape, speedX: 0.16, speedY: 0.22, bob: 0.16 },
    { createObject: buildGearCoreShape, speedX: 0.24, speedY: 0.3, bob: 0.12 },
    { createObject: buildFlowShape, speedX: 0.2, speedY: 0.24, bob: 0.18 },
    { createObject: buildSpringCoilShape, speedX: 0.26, speedY: 0.31, bob: 0.22 }
  ];
  const shapeMeshes = shapeConfigs.map(config => {
    const shapeObject = config.createObject();
    group.add(shapeObject.holder);
    return shapeObject;
  });

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.72, 32, 32),
    new THREE.MeshPhysicalMaterial({
      color: 0x22c55e,
      transmission: 0.7,
      transparent: true,
      opacity: 0.42,
      roughness: 0.18,
      metalness: 0.08
    })
  );
  core.visible = false;
  group.add(core);

  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = 1200;
  const positions = new Float32Array(particleCount * 3);

  for (let index = 0; index < particleCount; index += 1) {
    const radius = 2.8 + Math.random() * 2.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[index * 3 + 2] = radius * Math.cos(phi);
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    particlesGeometry,
    new THREE.PointsMaterial({
      color: 0xbffaff,
      size: 0.042,
      transparent: true,
      opacity: 0.42
    })
  );
  scene.add(particles);

  const orbitRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.6, 0.016, 16, 160),
    new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.18
    })
  );
  orbitRing.rotation.x = Math.PI / 2.4;
  orbitRing.visible = false;
  scene.add(orbitRing);

  const trailLength = 24;
  const trailPositions = new Float32Array(trailLength * 3);
  const trailColors = new Float32Array(trailLength * 3);
  const trailGeometry = new THREE.BufferGeometry();
  trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
  trailGeometry.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));
  const webTrail = new THREE.Line(
    trailGeometry,
    new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  webTrail.frustumCulled = false;
  scene.add(webTrail);
  const trailHistory = [];

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  const keyLight = new THREE.PointLight(0x67e8f9, 2.2, 20);
  keyLight.position.set(3, 2, 4);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0xf59e0b, 1.5, 18);
  fillLight.position.set(-4, -2, 3);
  scene.add(fillLight);

  const sectionStates = {
    hero: {
      progress: 0,
      accent: 0x67e8f9,
      fill: 0x22c55e,
      ring: 0x67e8f9,
      shape: 0
    },
    about: {
      progress: 0.18,
      accent: 0x7dd3fc,
      fill: 0x0ea5e9,
      ring: 0xa5f3fc,
      shape: 1
    },
    signals: {
      progress: 0.3,
      accent: 0xf59e0b,
      fill: 0x22c55e,
      ring: 0xfcd34d,
      shape: 6
    },
    experience: {
      progress: 0.48,
      accent: 0x9ca3af,
      fill: 0x3b82f6,
      ring: 0x93c5fd,
      shape: 4
    },
    projects: {
      progress: 0.68,
      accent: 0xfcd34d,
      fill: 0x10b981,
      ring: 0x6ee7b7,
      shape: 3
    },
    workflow: {
      progress: 0.84,
      accent: 0x34d399,
      fill: 0x14b8a6,
      ring: 0x99f6e4,
      shape: 5
    },
    contact: {
      progress: 1,
      accent: 0xf59e0b,
      fill: 0xfb7185,
      ring: 0xfde68a,
      shape: 2
    }
  };
  const sectionTimeline = [
    sectionStates.hero,
    sectionStates.about,
    sectionStates.signals,
    sectionStates.experience,
    sectionStates.projects,
    sectionStates.workflow,
    sectionStates.contact
  ];
  const pathStops = [
    { progress: 0, x: 1.86, y: 0.5, z: 0.24, scale: 0.58, ringScale: 0.78, particleX: -0.12, particleY: 0.02 },
    { progress: 0.18, x: 1.02, y: 0.22, z: 0.3, scale: 0.5, ringScale: 0.56, particleX: -0.06, particleY: -0.02 },
    { progress: 0.3, x: -0.38, y: 0.62, z: 0.5, scale: 0.56, ringScale: 0.6, particleX: 0.05, particleY: -0.06 },
    { progress: 0.48, x: -1.9, y: -0.18, z: 0.32, scale: 0.52, ringScale: 0.56, particleX: 0.09, particleY: -0.04 },
    { progress: 0.68, x: 1.75, y: 0.08, z: 0.6, scale: 0.6, ringScale: 0.64, particleX: -0.04, particleY: -0.05 },
    { progress: 0.84, x: -1.28, y: 0.48, z: 0.34, scale: 0.5, ringScale: 0.54, particleX: 0.06, particleY: 0.03 },
    { progress: 1, x: 1.96, y: -0.52, z: 0.44, scale: 0.58, ringScale: 0.58, particleX: -0.08, particleY: 0.05 }
  ];

  const pointer = { x: 0, y: 0 };
  window.addEventListener('pointermove', event => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
  });

  function updateScrollTarget() {
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const nextTarget = window.scrollY / maxScroll;
    scrollState.velocityTarget = (nextTarget - scrollState.target) * 14;
    scrollState.target = nextTarget;
  }

  function getStageTheme() {
    return sectionStates[activeSceneSection] || sectionStates.hero;
  }

  function getInterpolatedTheme(progress) {
    const clamped = THREE.MathUtils.clamp(progress, 0, 1);
    let start = sectionTimeline[0];
    let end = sectionTimeline[sectionTimeline.length - 1];

    for (let index = 0; index < sectionTimeline.length - 1; index += 1) {
      const current = sectionTimeline[index];
      const next = sectionTimeline[index + 1];
      if (clamped >= current.progress && clamped <= next.progress) {
        start = current;
        end = next;
        break;
      }
    }

    const range = Math.max(end.progress - start.progress, 0.0001);
    const mix = (clamped - start.progress) / range;
    const accent = new THREE.Color(start.accent).lerp(new THREE.Color(end.accent), mix);
    const fill = new THREE.Color(start.fill).lerp(new THREE.Color(end.fill), mix);
    const ring = new THREE.Color(start.ring).lerp(new THREE.Color(end.ring), mix);

    return {
      accent,
      fill,
      ring,
      shape: THREE.MathUtils.lerp(start.shape, end.shape, mix)
    };
  }

  function getPathState(progress) {
    const clamped = THREE.MathUtils.clamp(progress, 0, 1);
    let start = pathStops[0];
    let end = pathStops[pathStops.length - 1];

    for (let index = 0; index < pathStops.length - 1; index += 1) {
      const current = pathStops[index];
      const next = pathStops[index + 1];
      if (clamped >= current.progress && clamped <= next.progress) {
        start = current;
        end = next;
        break;
      }
    }

    const range = Math.max(end.progress - start.progress, 0.0001);
    const mix = (clamped - start.progress) / range;

    return {
      x: THREE.MathUtils.lerp(start.x, end.x, mix),
      y: THREE.MathUtils.lerp(start.y, end.y, mix),
      z: THREE.MathUtils.lerp(start.z, end.z, mix),
      scale: THREE.MathUtils.lerp(start.scale, end.scale, mix),
      ringScale: THREE.MathUtils.lerp(start.ringScale, end.ringScale, mix),
      particleX: THREE.MathUtils.lerp(start.particleX, end.particleX, mix),
      particleY: THREE.MathUtils.lerp(start.particleY, end.particleY, mix)
    };
  }

  updateScrollTarget();
  window.addEventListener('scroll', updateScrollTarget, { passive: true });

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    updateScrollTarget();
  }

  resize();
  window.addEventListener('resize', resize);

  scrollState.velocityTarget = 0;
  scrollState.velocityCurrent = 0;
  const clock = new THREE.Clock();

  function render() {
    const elapsed = clock.getElapsedTime();
    const pathEase = isMobile() ? 0.035 : isTablet() ? 0.05 : 0.075;
    const shapeEase = isMobile() ? 0.05 : isTablet() ? 0.072 : 0.1;
    scrollState.current += (scrollState.target - scrollState.current) * pathEase;
    scrollState.velocityCurrent += (scrollState.velocityTarget - scrollState.velocityCurrent) * 0.12;
    scrollState.velocityTarget *= 0.9;
    const stageTheme = getStageTheme();
    const sectionPull = THREE.MathUtils.lerp(scrollState.current, stageTheme.progress, 0.12);
    const interpolatedTheme = getInterpolatedTheme(sectionPull);
    sceneState.pathProgress += (sectionPull - sceneState.pathProgress) * pathEase;
    sceneState.accent.lerp(interpolatedTheme.accent, 0.08);
    sceneState.fill.lerp(interpolatedTheme.fill, 0.08);
    sceneState.ring.lerp(interpolatedTheme.ring, 0.08);

    if (stageTheme.shape !== sceneState.shapeTo) {
      sceneState.shapeFrom = sceneState.shapeTo;
      sceneState.shapeTo = stageTheme.shape;
      sceneState.shapeMix = 0;
    }
    const shapeMixStep = isMobile() ? 0.014 : isTablet() ? 0.018 : 0.022;
    sceneState.shapeMix = Math.min(1, sceneState.shapeMix + shapeMixStep);
    const shapeMixEased = sceneState.shapeMix * sceneState.shapeMix * (3 - 2 * sceneState.shapeMix);

    const path = getPathState(sceneState.pathProgress);
    const scrollWave = sceneState.pathProgress * Math.PI * 2;
    const heroFocus = 1 - THREE.MathUtils.smoothstep(sceneState.pathProgress, 0.06, 0.22);
    const motionScale = isMobile() ? 0.68 : isTablet() ? 0.94 : 1.22;
    const xMotionScale = isMobile() ? 0.34 : isTablet() ? 0.62 : motionScale;
    const yMotionScale = isMobile() ? 0.2 : isTablet() ? 0.58 : motionScale;
    const pointerScale = isMobile() ? 0.03 : isTablet() ? 0.07 : 0.12;
    const groupScale = isMobile() ? 0.96 : isTablet() ? 1.06 : 1.04;
    const lateralBias = isMobile() ? 0.1 : isTablet() ? 0.08 : 0.12;
    const verticalBias = isMobile() ? -0.12 : isTablet() ? 0.02 : 0;
    const particleOpacity = isMobile() ? 0.08 : isTablet() ? 0.22 : 0.48;
    const isProjectsZone = Math.abs(sceneState.pathProgress - sectionStates.projects.progress) < 0.12;
    const ringOpacity = (isMobile() ? 0.02 : isTablet() ? 0.04 : 0.06) + (isProjectsZone ? (isMobile() ? 0.1 : 0.24) : 0);
    const coreOpacity = isMobile() ? 0.16 : isTablet() ? 0.34 : 0.5;
    const inertialLag = THREE.MathUtils.clamp(scrollState.velocityCurrent, -0.34, 0.34);

    core.material.color.copy(sceneState.fill);
    core.material.opacity = coreOpacity;
    orbitRing.material.color.copy(sceneState.ring);
    orbitRing.material.opacity = ringOpacity;
    particles.material.color.copy(sceneState.ring);
    particles.material.opacity = particleOpacity;
    keyLight.color.copy(sceneState.accent);
    fillLight.color.copy(sceneState.fill);

    shapeMeshes.forEach((shapeObject, index) => {
      let influence = 0;
      if (index === sceneState.shapeTo) {
        influence = shapeMixEased;
      } else if (index === sceneState.shapeFrom) {
        influence = 1 - shapeMixEased;
      }
      const presence = THREE.MathUtils.smoothstep(influence, 0.08, 0.94);
      const morphGrowth = Math.pow(presence, 0.72);
      const transitionSpin = (1 - Math.abs(influence * 2 - 1)) * 2.2;
      const shapeProfile = shapeConfigs[index];
      const shellOpacity = presence * (isMobile() ? 0.2 : 0.22) * (index === 0 ? 1 + heroFocus * 0.1 : 1);
      const outlineOpacity = presence * (isMobile() ? 0.36 : isTablet() ? 0.4 : 0.44) * (index === 0 ? 1 + heroFocus * 0.22 : 1);
      const scale = Math.max(0.05, 0.1 + morphGrowth * 1.06 - (index === 0 ? heroFocus * 0.12 : 0));

      shapeObject.surfaces.forEach(surface => {
        surface.material.color.copy(sceneState.accent);
        surface.material.emissive.copy(sceneState.accent);
        surface.material.opacity = shellOpacity;
        surface.material.emissiveIntensity = 0.04 + presence * 0.18;
      });

      shapeObject.outlines.forEach(outline => {
        outline.material.color.copy(sceneState.ring);
        const glowRatio = outline.userData.glowRatio ?? 1;
        const scaleRatio = outline.userData.scaleRatio ?? 1;
        outline.material.opacity = outlineOpacity * glowRatio;
        outline.scale.setScalar((1.02 + presence * 0.03) * scaleRatio);
      });

      shapeObject.holder.scale.setScalar(scale);
      shapeObject.holder.rotation.x = elapsed * shapeProfile.speedX + presence * 0.18 + inertialLag * 0.6 + transitionSpin * 0.5 + (index === 0 ? heroFocus * 0.42 : 0);
      shapeObject.holder.rotation.y = -elapsed * shapeProfile.speedY + sceneState.pathProgress * (1 + index * 0.14) + inertialLag * 1.6 + transitionSpin + (index === 0 ? heroFocus * 0.68 : 0);
      shapeObject.holder.rotation.z = Math.sin(elapsed * (0.3 + index * 0.06)) * shapeProfile.bob;
      shapeObject.holder.position.z = presence * 0.62;
      shapeObject.holder.visible = presence > 0.015;

      if (shapeObject.updateFold) {
        shapeObject.updateFold(elapsed);
      }
    });

    group.rotation.y = elapsed * 0.34 + pointer.x * pointerScale + sceneState.pathProgress * 1.28 + inertialLag * 1.4;
    group.rotation.x = elapsed * 0.16 + pointer.y * (pointerScale * 0.6) + Math.sin(scrollWave) * 0.1 - inertialLag * 0.5;
    core.rotation.y = -elapsed * 0.5 + sceneState.pathProgress * 2.2;
    particles.rotation.y = -elapsed * 0.04 - sceneState.pathProgress * 0.42;
    particles.rotation.x = elapsed * 0.02 + sceneState.pathProgress * 0.18;
    const projectPulse = isProjectsZone ? 1 + Math.sin(elapsed * 3.6 + scrollWave) * (isMobile() ? 0.08 : 0.18) : 1;
    orbitRing.rotation.z = elapsed * 0.18 + sceneState.pathProgress * 2.4;

    const heroShiftX = isMobile() ? 0.1 : isTablet() ? 0.62 : 0.85;
    const heroShiftY = isMobile() ? 0.16 : isTablet() ? 0.22 : 0.3;
    group.position.x = path.x * xMotionScale + lateralBias + pointer.x * pointerScale + inertialLag * (isMobile() ? 0.34 : 0.8) + heroFocus * heroShiftX;
    group.position.y = path.y * yMotionScale + verticalBias + Math.sin(elapsed * 0.85 + scrollWave) * (isMobile() ? 0.03 : 0.14) - Math.abs(inertialLag) * 0.12 + heroFocus * heroShiftY;
    group.position.z = path.z + (isMobile() ? 0.36 : isTablet() ? 0.28 : 0.1);
    group.scale.setScalar(path.scale * groupScale);
    orbitRing.scale.setScalar(path.ringScale * (isMobile() ? 0.78 : isTablet() ? 0.92 : 1.06) * projectPulse);
    orbitRing.position.x = group.position.x * 0.6;
    orbitRing.position.y = group.position.y * 0.3;
    particles.position.x = path.particleX * 10;
    particles.position.y = path.particleY * 10;

    const webZoneFactor = 1 - THREE.MathUtils.smoothstep(Math.abs(sceneState.pathProgress - sectionStates.workflow.progress), 0.04, 0.18);
    trailHistory.unshift(new THREE.Vector3(group.position.x, group.position.y, group.position.z));
    if (trailHistory.length > trailLength) {
      trailHistory.length = trailLength;
    }
    for (let i = 0; i < trailLength; i += 1) {
      const point = trailHistory[i] || trailHistory[trailHistory.length - 1] || group.position;
      trailPositions[i * 3] = point.x;
      trailPositions[i * 3 + 1] = point.y;
      trailPositions[i * 3 + 2] = point.z;
      const fade = webZoneFactor * Math.pow(1 - i / trailLength, 1.4) * (isMobile() ? 0.5 : 1);
      trailColors[i * 3] = sceneState.ring.r * fade;
      trailColors[i * 3 + 1] = sceneState.ring.g * fade;
      trailColors[i * 3 + 2] = sceneState.ring.b * fade;
    }
    trailGeometry.attributes.position.needsUpdate = true;
    trailGeometry.attributes.color.needsUpdate = true;
    webTrail.visible = webZoneFactor > 0.02;

    const pulse = 0.94 + Math.sin(elapsed * 1.4 + scrollWave) * (isMobile() ? 0.035 : 0.06);
    core.scale.setScalar(path.scale * pulse);

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  render();
}
