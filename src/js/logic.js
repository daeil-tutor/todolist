/**
 * logic.js — 순수 로직 함수 (UI 의존성 없음)
 */

import { getState, setState, saveToStorage } from './store.js';

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// ── Activity logging ──────────────────────────────────────────

/** @param {string} text @param {'success'|'info'} type */
function addActivity(text, type) {
  const { activities } = getState();
  const item = { text, type, time: new Date().toISOString() };
  setState({ activities: [item, ...activities].slice(0, 20) });
}

// ── 할 일 CRUD ───────────────────────────────────────────────

/**
 * @param {string} text
 * @param {string} categoryId
 * @param {'high'|'medium'|'low'} [priority='high']
 * @returns {boolean}
 */
export function addTodo(text, categoryId, priority = 'high') {
  const trimmed = text.trim();
  if (!trimmed) return false;

  const now = new Date().toISOString();
  const todo = {
    id:         generateId(),
    text:       trimmed,
    categoryId: categoryId ?? '',
    priority:   priority,
    completed:  false,
    starred:    false,
    createdAt:  now,
    updatedAt:  now,
  };

  const { todos } = getState();
  setState({ todos: [todo, ...todos] });
  addActivity(`Added task "${trimmed}"`, 'info');
  saveToStorage();
  return true;
}

/** @param {string} id */
export function toggleTodo(id) {
  const { todos } = getState();
  let toggledText = '';
  let wasCompleted = false;
  const updated = todos.map((t) => {
    if (t.id === id) {
      toggledText = t.text;
      wasCompleted = t.completed;
      return { ...t, completed: !t.completed, updatedAt: new Date().toISOString() };
    }
    return t;
  });
  setState({ todos: updated });
  if (toggledText) {
    addActivity(
      wasCompleted ? `Reopened "${toggledText}"` : `Completed "${toggledText}"`,
      wasCompleted ? 'info' : 'success'
    );
  }
  saveToStorage();
}

/** @param {string} id */
export function deleteTodo(id) {
  const { todos } = getState();
  const target = todos.find((t) => t.id === id);
  setState({ todos: todos.filter((t) => t.id !== id) });
  if (target) {
    addActivity(`Deleted "${target.text}"`, 'info');
  }
  saveToStorage();
}

export function deleteCompleted() {
  const { todos } = getState();
  const count = todos.filter((t) => t.completed).length;
  setState({ todos: todos.filter((t) => !t.completed) });
  if (count > 0) {
    addActivity(`Cleared ${count} completed task(s)`, 'info');
  }
  saveToStorage();
}

/**
 * @param {string} id
 * @param {string} text
 * @returns {boolean}
 */
export function updateTodo(id, text) {
  const trimmed = text.trim();
  if (!trimmed) return false;

  const { todos } = getState();
  let originalText = '';
  const updated = todos.map((t) => {
    if (t.id === id) {
      originalText = t.text;
      return { ...t, text: trimmed, updatedAt: new Date().toISOString() };
    }
    return t;
  });
  setState({ todos: updated });
  if (originalText) {
    addActivity(`Edited "${originalText}" → "${trimmed}"`, 'info');
  }
  saveToStorage();
  return true;
}

/** @param {string} id */
export function toggleStar(id) {
  const { todos } = getState();
  const updated = todos.map((t) =>
    t.id === id ? { ...t, starred: !t.starred, updatedAt: new Date().toISOString() } : t
  );
  setState({ todos: updated });
  saveToStorage();
}

// ── 필터 ─────────────────────────────────────────────────────

/**
 * @param {import('./store.js').Todo[]} todos
 * @param {'today'|'upcoming'|'completed'} nav
 */
export function filterByNav(todos, nav) {
  if (nav === 'completed') return todos.filter((t) => t.completed);
  if (nav === 'upcoming')  return todos.filter((t) => !t.completed);
  return todos; // 'today' = all
}

/**
 * @param {import('./store.js').Todo[]} todos
 * @param {string} categoryId
 */
export function filterByCategory(todos, categoryId) {
  if (!categoryId) return todos;
  return todos.filter((t) => t.categoryId === categoryId);
}

/** 현재 필터 적용 결과 */
export function getFilteredTodos() {
  const { todos, navFilter, categoryFilter } = getState();
  return filterByCategory(filterByNav(todos, navFilter), categoryFilter);
}

/**
 * priority별 그룹핑
 * @param {import('./store.js').Todo[]} todos
 * @returns {Record<string, import('./store.js').Todo[]>}
 */
export function groupByPriority(todos) {
  const groups = { high: [], medium: [], low: [] };
  todos.forEach((t) => {
    const p = t.priority || 'medium';
    if (!groups[p]) groups[p] = [];
    groups[p].push(t);
  });
  return groups;
}

// ── 필터 상태 변경 ────────────────────────────────────────────

/** @param {'today'|'upcoming'|'completed'} nav */
export function setNavFilter(nav) {
  setState({ navFilter: nav });
}

/** @param {string} categoryId */
export function setCategoryFilter(categoryId) {
  setState({ categoryFilter: categoryId });
}
