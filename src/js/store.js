/**
 * store.js — 전역 상태 + localStorage 유틸리티
 */

const STORAGE_KEY = 'todo-app-v2';

export const DEFAULT_CATEGORIES = [
  { id: 'research',  name: '리서치',           pillClass: 'research'  },
  { id: 'wireframe', name: '와이어프레임',      pillClass: 'wireframe' },
  { id: 'design',    name: '디자인',            pillClass: 'design'    },
  { id: 'prototype', name: '프로토타입',        pillClass: 'prototype' },
  { id: 'review',    name: '디자인 리뷰',       pillClass: 'review'    },
  { id: 'collab',    name: '협업/커뮤니케이션', pillClass: 'collab'    },
];

export const PRIORITIES = [
  { id: 'high',   name: '높은 우선순위', icon: 'high'   },
  { id: 'medium', name: '중간 순위',     icon: 'medium' },
  { id: 'low',    name: '낮은 순위',     icon: 'low'    },
];

/**
 * @typedef {Object} Todo
 * @property {string}  id
 * @property {string}  text
 * @property {string}  categoryId   '' = 미지정
 * @property {'high'|'medium'|'low'} priority
 * @property {boolean} completed
 * @property {boolean} starred
 * @property {string}  createdAt    ISO 8601
 * @property {string}  updatedAt    ISO 8601
 */

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name
 * @property {string} pillClass
 */

/**
 * @typedef {Object} ActivityItem
 * @property {string} text
 * @property {'success'|'info'} type
 * @property {string} time    ISO 8601
 */

/**
 * @typedef {Object} AppState
 * @property {Todo[]}         todos
 * @property {Category[]}     categories
 * @property {'today'|'upcoming'|'completed'} navFilter
 * @property {string}         categoryFilter   '' = 전체
 * @property {ActivityItem[]} activities
 */

/** @type {AppState} */
let state = {
  todos: [],
  categories: DEFAULT_CATEGORIES,
  navFilter: 'today',
  categoryFilter: '',
  activities: [],
};

export function getState() {
  return { ...state };
}

/** @param {Partial<AppState>} partial */
export function setState(partial) {
  state = { ...state, ...partial };
}

// ── localStorage ────────────────────────────────────────────

export function saveToStorage() {
  try {
    const { todos, categories, activities } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ todos, categories, activities }));
  } catch (e) {
    console.warn('[store] localStorage 저장 실패:', e);
  }
}

export function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);

    state = {
      ...state,
      todos: Array.isArray(parsed.todos) ? parsed.todos : [],
      categories: Array.isArray(parsed.categories) && parsed.categories.length > 0
        ? parsed.categories
        : DEFAULT_CATEGORIES,
      activities: Array.isArray(parsed.activities) ? parsed.activities.slice(0, 20) : [],
    };
  } catch (e) {
    console.warn('[store] localStorage 복원 실패:', e);
  }
}
