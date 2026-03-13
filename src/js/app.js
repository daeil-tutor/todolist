/**
 * app.js — 이벤트 바인딩 + 초기화 (TaskMaster)
 */

import { loadFromStorage, getState } from './store.js';
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodo,
  toggleStar,
  setNavFilter,
  setCategoryFilter,
} from './logic.js';
import {
  renderAll,
  renderCategorySelect,
} from './ui.js';

function init() {
  loadFromStorage();
  renderCategorySelect();
  renderAll();
  bindEvents();
}

function bindEvents() {
  bindAddTask();
  bindTodoListActions();
  bindSidebarNav();
  bindSidebarProjects();
  bindMobileMenu();
}

// ── Add Task (input + button + form) ─────────────────────────

function bindAddTask() {
  const input = document.getElementById('task-input');
  const addBtn = document.getElementById('btn-add');
  const form = document.getElementById('add-task-form');
  const catSelect = document.getElementById('category-select');
  const prioSelect = document.getElementById('priority-select');

  if (!input) return;

  function showForm() {
    if (form) form.classList.add('add-task-form--visible');
  }

  function hideForm() {
    if (form) form.classList.remove('add-task-form--visible');
  }

  function handleAdd() {
    const text = input.value.trim();
    if (!text) {
      input.classList.add('top-header__input--error');
      input.addEventListener(
        'animationend',
        () => input.classList.remove('top-header__input--error'),
        { once: true }
      );
      input.focus();
      return;
    }

    const categoryId = catSelect ? catSelect.value : '';
    const priority = prioSelect ? prioSelect.value : 'high';

    const success = addTodo(text, categoryId, priority);
    if (success) {
      input.value = '';
      if (catSelect) catSelect.value = '';
      if (prioSelect) prioSelect.value = 'high';
      hideForm();
      input.focus();
      renderAll();
    }
  }

  input.addEventListener('focus', showForm);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.isComposing) {
      e.preventDefault();
      handleAdd();
    }
    if (e.key === 'Escape') {
      hideForm();
      input.blur();
    }
  });

  if (addBtn) {
    addBtn.addEventListener('click', handleAdd);
  }

  document.addEventListener('click', (e) => {
    const isInsideInput = input.contains(e.target);
    const isInsideForm = form && form.contains(e.target);
    const isAddBtn = addBtn && addBtn.contains(e.target);
    if (!isInsideInput && !isInsideForm && !isAddBtn) {
      hideForm();
    }
  });
}

// ── Todo list actions (toggle, delete, star) ─────────────────

function bindTodoListActions() {
  const container = document.getElementById('todo-container');
  if (!container) return;

  container.addEventListener('change', (e) => {
    if (e.target.dataset.action === 'toggle') {
      toggleTodo(e.target.dataset.id);
      renderAll();
    }
  });

  container.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('[data-action="delete"]');
    if (deleteBtn) {
      deleteTodo(deleteBtn.dataset.id);
      renderAll();
      return;
    }

    const starBtn = e.target.closest('[data-action="star"]');
    if (starBtn) {
      toggleStar(starBtn.dataset.id);
      renderAll();
      return;
    }

    const editBtn = e.target.closest('[data-action="edit"]');
    if (editBtn) {
      activateInlineEdit(editBtn.dataset.id);
    }
  });
}

function activateInlineEdit(id) {
  const card = document.querySelector(`.task-card[data-id="${id}"]`);
  if (!card) return;

  const textSpan = card.querySelector('.task-card__text');
  if (!textSpan) return;

  const originalText = textSpan.textContent;

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'task-card__edit-input';
  input.value = originalText;
  input.setAttribute('aria-label', '태스크 텍스트 수정');

  textSpan.replaceWith(input);
  input.focus();
  input.select();

  card.classList.add('task-card--editing');

  let committed = false;

  function commit() {
    if (committed) return;
    committed = true;
    const newText = input.value.trim();
    if (newText && newText !== originalText) {
      updateTodo(id, newText);
    }
    renderAll();
  }

  function cancel() {
    if (committed) return;
    committed = true;
    renderAll();
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.isComposing) {
      e.preventDefault();
      commit();
    } else if (e.key === 'Escape') {
      cancel();
    }
  });

  input.addEventListener('blur', commit);
}

// ── Sidebar navigation ───────────────────────────────────────

function bindSidebarNav() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;

  nav.addEventListener('click', (e) => {
    const link = e.target.closest('[data-nav]');
    if (!link) return;

    setNavFilter(link.dataset.nav);
    setCategoryFilter('');
    renderAll();
    closeMobileMenu();
  });
}

// ── Sidebar projects (category filter) ───────────────────────

function bindSidebarProjects() {
  const container = document.getElementById('sidebar-projects');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const link = e.target.closest('[data-category-filter]');
    if (!link) return;

    const { categoryFilter } = getState();
    const newFilter = link.dataset.categoryFilter;

    setCategoryFilter(categoryFilter === newFilter ? '' : newFilter);
    renderAll();
    closeMobileMenu();
  });
}

// ── Mobile menu ──────────────────────────────────────────────

function bindMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const overlay = document.getElementById('sidebar-overlay');
  const sidebar = document.getElementById('sidebar');

  if (!btn || !overlay || !sidebar) return;

  btn.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar--open');
    overlay.classList.toggle('sidebar-overlay--visible');
  });

  overlay.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('sidebar--open');
  if (overlay) overlay.classList.remove('sidebar-overlay--visible');
}

// ── Entry point ──────────────────────────────────────────────

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
