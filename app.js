const skills = [
  { name: 'Laravel', level: 92, accent: 'from-rose-400/70 via-orange-300/70 to-yellow-200/70', stack: 'APIs, Queues, Blade/Livewire' },
  { name: 'Django', level: 88, accent: 'from-emerald-300/70 via-teal-300/70 to-cyan-200/70', stack: 'DRF, Auth, ORM tuning' },
  { name: 'TypeScript', level: 90, accent: 'from-sky-300/70 via-blue-300/70 to-indigo-200/70', stack: 'Patterns, DX, tooling' },
  { name: 'Tailwind CSS', level: 94, accent: 'from-indigo-300/70 via-violet-300/70 to-fuchsia-200/70', stack: 'Design systems, tokens' },
  { name: 'HTML & UX', level: 93, accent: 'from-amber-300/70 via-orange-300/70 to-pink-200/70', stack: 'A11y, semantic layouts' },
  { name: 'Motion & Micro-UX', level: 86, accent: 'from-cyan-300/70 via-sky-300/70 to-blue-200/70', stack: 'Motion One, easing' }
];
const projects = [
  {
    title: 'Project One · Django + Tailwind',
    description: 'Full-stack web app styled with Tailwind and powered by Django/DRF backend, featuring responsive UI, API-driven pages, and clean components.',
    stack: ['Django', 'Tailwind', 'TypeScript'],
    badge: 'Tailwind + Django',
    image: 'project%201.jpg',
    link: 'project%201.jpg'
  },
  {
    title: 'Laravel Service CRM',
    description: 'Client intake, ticket routing, and role-based dashboards built with Laravel, queues, and custom Blade components.',
    stack: ['Laravel', 'MySQL', 'Tailwind'],
    badge: 'Laravel',
    image: 'project%201.jpg',
    link: 'https://github.com/Leanyuuu/Luyahan_laravelProject'
  },
  {
    title: 'Django Logistics Tracker',
    description: 'Shipment status pipeline, webhook ingestion, and analytics with DRF plus a clean Tailwind UI.',
    stack: ['Django', 'DRF', 'PostgreSQL', 'Tailwind'],
    badge: 'Django',
    link: 'https://github.com/Leanyuuu'
  },
  {
    title: 'iOS-inspired Portfolio',
    description: 'Glassmorphic personal site with Motion micro-interactions, responsive Tailwind, and TS-driven content.',
    stack: ['TypeScript', 'Tailwind', 'Motion One'],
    badge: 'Frontend',
    link: 'https://github.com/Leanyuuu'
  }
];
const skillGrid = document.getElementById('skillGrid');
const projectList = document.getElementById('projectList');
const themeToggle = document.getElementById('themeToggle');
const motionIsAvailable = typeof window !== 'undefined' && window.motion;
const mountSkills = () => {
  if (!skillGrid)
    return;
  skills.forEach((skill, index) => {
    const card = document.createElement('div');
    card.className = 'glass rounded-3xl p-5 border border-white/10 shadow-ios-card flex flex-col gap-3';
    card.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-semibold text-white">${skill.name}</p>
          <p class="text-xs text-slate-300">${skill.stack}</p>
        </div>
        <span class="text-sm text-slate-200">${skill.level}%</span>
      </div>
      <div class="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div class="h-full w-[0%] rounded-full bg-gradient-to-r ${skill.accent} shadow-ios-top" data-skill-bar></div>
      </div>
    `;
    skillGrid.appendChild(card);
    if (motionIsAvailable) {
      const { animate, spring } = window.motion;
      const bar = card.querySelector('[data-skill-bar]');
      animate(card, { opacity: [0, 1], y: [12, 0] }, { delay: 0.05 * index, duration: 0.6, easing: 'ease-out' });
      animate(bar, { width: ['0%', `${skill.level}%`] }, { delay: 0.3 + 0.05 * index, duration: 0.8, easing: spring({ stiffness: 200, damping: 20 }) });
    }
  });
};
const mountProjects = () => {
  if (!projectList)
    return;
  projects.forEach((project, index) => {
    const card = document.createElement('article');
    card.className = 'glass rounded-3xl border border-white/10 shadow-ios-card hover:-translate-y-1 transition-transform duration-300 overflow-hidden flex flex-col';
    const stack = project.stack.map((item) => `<span class="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/15">${item}</span>`).join('');
    const media = project.image
        ? `<div class="relative h-48 overflow-hidden">
           <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
           <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent"></div>
         </div>`
        : '';
    card.innerHTML = `
      ${media}
      <div class="p-6 space-y-4 flex-1 flex flex-col">
        <div class="flex items-center justify-between gap-3">
          <h4 class="text-lg font-semibold text-white">${project.title}</h4>
          <span class="px-3 py-1 rounded-full text-xs bg-white/15 text-white border border-white/20 whitespace-nowrap">${project.badge}</span>
        </div>
        <p class="text-slate-200 flex-1">${project.description}</p>
        <div class="flex flex-wrap gap-2">${stack}</div>
        <div class="flex items-center gap-2 text-sm text-white">
          <span>${project.link ? 'View on GitHub' : 'View case study'}</span>
          <span class="h-6 w-6 rounded-full bg-white/20 grid place-items-center text-xs">→</span>
        </div>
      </div>
    `;
    if (project.link) {
      const anchor = document.createElement('a');
      anchor.href = project.link;
      anchor.target = '_blank';
      anchor.rel = 'noreferrer';
      anchor.className = 'no-underline';
      anchor.appendChild(card);
      projectList.appendChild(anchor);
    }
    else {
      projectList.appendChild(card);
    }
    if (motionIsAvailable) {
      const { animate } = window.motion;
      animate(card, { opacity: [0, 1], y: [14, 0] }, { delay: 0.08 * index, duration: 0.55, easing: 'ease-out' });
    }
  });
};
const setupThemeToggle = () => {
  if (!themeToggle)
    return;
  const body = document.body;
  const applyTheme = (mode) => {
    const prefersDark = mode === 'dark';
    body.classList.toggle('light', !prefersDark);
    themeToggle.textContent = prefersDark ? 'Light' : 'Dark';
  };
  themeToggle.addEventListener('click', () => {
    const isLight = body.classList.toggle('light');
    applyTheme(isLight ? 'light' : 'dark');
  });
};
document.addEventListener('DOMContentLoaded', () => {
  mountSkills();
  mountProjects();
  setupThemeToggle();
});

