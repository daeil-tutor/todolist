/**
 * ui.js — DOM 렌더 함수 (Figma-faithful TaskMaster layout)
 */

import { getState, PRIORITIES } from './store.js';
import { getFilteredTodos, groupByPriority } from './logic.js';

// ── SVG constants ────────────────────────────────────────────

const SVG_DELETE = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

const SVG_STAR = `<svg width="20" height="19" viewBox="0 0 20 19" fill="none" aria-hidden="true">
  <path d="M10 1l2.39 4.84L18 6.88l-4 3.9.94 5.5L10 13.77l-4.94 2.5.94-5.5-4-3.9 5.61-1.04L10 1z"
        stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>
</svg>`;

const SVG_STAR_FILLED = `<svg width="20" height="19" viewBox="0 0 20 19" fill="currentColor" aria-hidden="true">
  <path d="M10 1l2.39 4.84L18 6.88l-4 3.9.94 5.5L10 13.77l-4.94 2.5.94-5.5-4-3.9 5.61-1.04L10 1z"
        stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
</svg>`;

const SVG_CLOCK = `<svg class="task-card__time-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
  <circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1"/>
  <path d="M6 3v3l2 1" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
</svg>`;

const SVG_EDIT = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
  <path d="M9.5 1.5l3 3L4 13H1v-3L9.5 1.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
</svg>`;

const SVG_PRIORITY_HIGH = `<svg width="4" height="18" viewBox="0 0 4 18" aria-hidden="true">
  <rect width="4" height="18" rx="2" fill="#dc2626"/>
</svg>`;

const SVG_PRIORITY_MEDIUM = `<svg width="16" height="6" viewBox="0 0 16 6" aria-hidden="true">
  <path d="M0 3h6M10 3h6" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
</svg>`;

const SVG_PRIORITY_LOW = `<svg width="16" height="6" viewBox="0 0 16 6" aria-hidden="true">
  <path d="M3 3h10" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>
</svg>`;

const SVG_EMPTY_NO_TODOS = `<svg class="empty-state__icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
  <rect x="8" y="10" width="32" height="34" rx="4" stroke="currentColor" stroke-width="2"/>
  <path d="M16 20h16M16 27h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M16 6v8M32 6v8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;

const SVG_EMPTY_ALL_DONE = `<svg class="empty-state__icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
  <circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="2"/>
  <path d="M14 24l7 7 13-14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const SVG_FOLDER = `<svg class="sidebar__project-icon" width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
  <path d="M1 3a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2V3z"
        stroke="currentColor" stroke-width="1.5"/>
</svg>`;

const PRIORITY_ICONS = {
  high:   SVG_PRIORITY_HIGH,
  medium: SVG_PRIORITY_MEDIUM,
  low:    SVG_PRIORITY_LOW,
};

const $ = (id) => document.getElementById(id);

// ── Date formatting ──────────────────────────────────────────

function formatKoreanDate() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  return `${month}월 ${day}일 ${dayNames[now.getDay()]}`;
}

function formatTime(isoStr) {
  const d = new Date(isoStr);
  const h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 || 12;
  return `${hh}:${m} ${ampm}`;
}

function timeAgo(isoStr) {
  const diff = Date.now() - new Date(isoStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return '방금 전';
  if (mins < 60) return `${mins}분 전`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

// ── Single task card ─────────────────────────────────────────

export function createTaskCard(todo, categories) {
  const cat = categories.find((c) => c.id === todo.categoryId);
  const li = document.createElement('li');
  li.className = `task-card${todo.completed ? ' task-card--completed' : ''}`;
  li.dataset.id = todo.id;

  const pillHTML = cat
    ? `<span class="pill pill--${cat.pillClass}">${cat.name}</span>`
    : '';

  const starClass = todo.starred ? ' task-card__star--active' : '';

  li.innerHTML = `
    <label class="task-card__checkbox-wrap">
      <input type="checkbox" class="task-card__checkbox-input" data-action="toggle" data-id="${todo.id}"
             ${todo.completed ? 'checked' : ''} aria-label="${todo.completed ? '완료 취소' : '완료 처리'}" />
      <span class="task-card__checkbox"></span>
    </label>
    <div class="task-card__body">
      <span class="task-card__text">${escapeHtml(todo.text)}</span>
      <div class="task-card__meta">
        <span class="task-card__time">${SVG_CLOCK} ${formatTime(todo.createdAt)}</span>
        ${pillHTML}
      </div>
    </div>
    <button class="task-card__star${starClass}" type="button" data-action="star" data-id="${todo.id}" aria-label="즐겨찾기">
      ${todo.starred ? SVG_STAR_FILLED : SVG_STAR}
    </button>
    <button class="task-card__edit" type="button" data-action="edit" data-id="${todo.id}" aria-label="수정">
      ${SVG_EDIT}
    </button>
    <button class="task-card__delete" type="button" data-action="delete" data-id="${todo.id}" aria-label="삭제">
      ${SVG_DELETE}
    </button>`;

  return li;
}

// ── Priority section ─────────────────────────────────────────

function createPrioritySection(priorityId, todos, categories) {
  const priority = PRIORITIES.find((p) => p.id === priorityId);
  if (!priority || todos.length === 0) return null;

  const section = document.createElement('section');
  section.className = 'priority-section';

  const header = document.createElement('div');
  header.className = 'priority-header';
  header.innerHTML = `
    <span class="priority-header__icon">${PRIORITY_ICONS[priorityId] || ''}</span>
    <span class="priority-header__name">${priority.name}</span>
    <span class="priority-header__count">${todos.length}개의 작업</span>`;
  section.appendChild(header);

  const list = document.createElement('ul');
  list.className = 'task-list';
  todos.forEach((t) => list.appendChild(createTaskCard(t, categories)));
  section.appendChild(list);

  return section;
}

// ── Main renders ─────────────────────────────────────────────

export function renderTodoList() {
  const container = $('todo-container');
  if (!container) return;

  const { categories, todos } = getState();
  const filtered = getFilteredTodos();

  container.innerHTML = '';

  if (filtered.length === 0) {
    const allDone = todos.length > 0 && todos.every((t) => t.completed);
    renderEmptyState(allDone ? 'all-done' : 'no-todos', container);
    return;
  }

  const groups = groupByPriority(filtered);
  const order = ['high', 'medium', 'low'];

  order.forEach((p) => {
    const section = createPrioritySection(p, groups[p] || [], categories);
    if (section) container.appendChild(section);
  });

  // Tasks without a recognized priority (fallback)
  const uncategorized = filtered.filter((t) => !['high', 'medium', 'low'].includes(t.priority));
  if (uncategorized.length > 0) {
    const list = document.createElement('ul');
    list.className = 'task-list';
    uncategorized.forEach((t) => list.appendChild(createTaskCard(t, categories)));
    container.appendChild(list);
  }
}

export function renderEmptyState(type, container) {
  const el = document.createElement('div');
  el.className = 'empty-state';

  if (type === 'all-done') {
    el.innerHTML = `
      ${SVG_EMPTY_ALL_DONE}
      <p class="empty-state__title">모든 할 일을 완료했어요!</p>
      <p class="empty-state__sub">새로운 태스크를 추가해보세요</p>`;
  } else {
    el.innerHTML = `
      ${SVG_EMPTY_NO_TODOS}
      <p class="empty-state__title">아직 할 일이 없어요</p>
      <p class="empty-state__sub">위 입력창에서 첫 번째 태스크를 추가해보세요</p>`;
  }

  container.appendChild(el);
}

// ── Sidebar nav highlight ────────────────────────────────────

export function renderSidebarNav() {
  const { navFilter } = getState();
  const links = document.querySelectorAll('[data-nav]');
  links.forEach((link) => {
    const isActive = link.dataset.nav === navFilter;
    link.classList.toggle('sidebar__link--active', isActive);
  });
}

// ── Sidebar projects ─────────────────────────────────────────

export function renderSidebarProjects() {
  const container = $('sidebar-projects');
  if (!container) return;

  const { categories, categoryFilter } = getState();
  container.innerHTML = '';

  categories.forEach((cat) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `sidebar__project-link${categoryFilter === cat.id ? ' sidebar__project-link--active' : ''}`;
    btn.dataset.categoryFilter = cat.id;
    btn.innerHTML = `${SVG_FOLDER}<span>${cat.name}</span>`;
    container.appendChild(btn);
  });
}

// ── Category select (for adding) ─────────────────────────────

export function renderCategorySelect() {
  const select = $('category-select');
  if (!select) return;

  const { categories } = getState();
  select.innerHTML = '<option value="">카테고리</option>';
  categories.forEach((cat) => {
    const opt = document.createElement('option');
    opt.value = cat.id;
    opt.textContent = cat.name;
    select.appendChild(opt);
  });
}

// ── Content header date ──────────────────────────────────────

export function renderContentDate() {
  const el = $('content-date');
  if (el) el.textContent = formatKoreanDate();
}

// ── Content title based on nav ───────────────────────────────

export function renderContentTitle() {
  const { navFilter } = getState();
  const titleEl = document.querySelector('.content__title');
  if (!titleEl) return;

  const titles = {
    today:     "Today's Task",
    upcoming:  'Upcoming',
    completed: 'Completed',
  };
  titleEl.textContent = titles[navFilter] || "Today's Task";
}

// ── Right panel: progress bars ───────────────────────────────

export function renderProgressSection() {
  const container = $('progress-section');
  if (!container) return;

  const { todos } = getState();
  const total = todos.length;
  if (total === 0) {
    container.innerHTML = '';
    return;
  }

  const completedCount = todos.filter((t) => t.completed).length;
  const completedPct = Math.round((completedCount / total) * 100);

  const reviewTodos = todos.filter((t) => t.categoryId === 'review');
  const reviewCompleted = reviewTodos.filter((t) => t.completed).length;
  const reviewPct = reviewTodos.length > 0
    ? Math.round((reviewCompleted / reviewTodos.length) * 100)
    : 0;

  container.innerHTML = `
    <div class="progress-item">
      <div class="progress-item__header">
        <span class="progress-item__name">Development</span>
        <span class="progress-item__pct">${completedPct}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar__fill progress-bar__fill--accent" style="width: ${completedPct}%"></div>
      </div>
    </div>
    <div class="progress-item">
      <div class="progress-item__header">
        <span class="progress-item__name">Design Review</span>
        <span class="progress-item__pct">${reviewPct}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar__fill progress-bar__fill--purple" style="width: ${reviewPct}%"></div>
      </div>
    </div>`;
}

// ── Right panel: deadline card ───────────────────────────────

export function renderDeadlineCard() {
  const desc = $('deadline-desc');
  if (!desc) return;

  const { todos } = getState();
  const incomplete = todos.filter((t) => !t.completed);
  if (incomplete.length > 0) {
    desc.textContent = `${incomplete.length}개의 미완료 작업이 있습니다.`;
  } else {
    desc.textContent = '모든 작업이 완료되었습니다!';
  }
}

// ── Right panel: activity list ───────────────────────────────

export function renderActivityList() {
  const container = $('activity-list');
  if (!container) return;

  const { activities } = getState();
  container.innerHTML = '';

  if (activities.length === 0) {
    container.innerHTML = '<p style="font-size: var(--text-size-meta); color: var(--color-text-disabled);">아직 활동이 없습니다.</p>';
    return;
  }

  activities.slice(0, 5).forEach((act) => {
    const item = document.createElement('div');
    item.className = 'activity-item';
    item.innerHTML = `
      <div class="activity-item__dot activity-item__dot--${act.type}"></div>
      <div class="activity-item__content">
        <span class="activity-item__text">${escapeHtml(act.text)}</span>
        <span class="activity-item__time">${timeAgo(act.time)}</span>
      </div>`;
    container.appendChild(item);
  });
}

// ── Master render ────────────────────────────────────────────

export function renderAll() {
  renderSidebarNav();
  renderSidebarProjects();
  renderContentTitle();
  renderContentDate();
  renderTodoList();
  renderProgressSection();
  renderDeadlineCard();
  renderActivityList();
}

// ── Utility ──────────────────────────────────────────────────

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
