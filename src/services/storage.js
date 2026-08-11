/**
 * TypeForge Storage Service
 * Client-side IndexedDB & localStorage persistence for local progress, stats, and settings
 */

const DB_NAME = "typeforge_db";
const DB_VERSION = 1;

class StorageService {
  constructor() {
    this.db = null;
    this.initPromise = this._initDB();
  }

  _initDB() {
    return new Promise((resolve) => {
      if (!window.indexedDB) {
        console.warn("IndexedDB not available, falling back to localStorage.");
        resolve(null);
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("testHistory")) {
          const historyStore = db.createObjectStore("testHistory", { keyPath: "id", autoIncrement: true });
          historyStore.createIndex("timestamp", "timestamp", { unique: false });
          historyStore.createIndex("mode", "mode", { unique: false });
        }
        if (!db.objectStoreNames.contains("unlockedLevels")) {
          db.createObjectStore("unlockedLevels", { keyPath: "language" });
        }
      };

      request.onsuccess = (e) => {
        this.db = e.target.result;
        resolve(this.db);
      };

      request.onerror = () => {
        console.warn("IndexedDB failed to open.");
        resolve(null);
      };
    });
  }

  // --- Settings ---
  getSettings() {
    const defaultSettings = {
      theme: "dark",
      fontSize: "normal",
      caretStyle: "line",
      liveWpm: true,
      soundEnabled: false,
      keyboardLayout: "qwerty",
      showVirtualKeyboard: true
    };
    try {
      const saved = localStorage.getItem("tf_settings");
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch (e) {
      return defaultSettings;
    }
  }

  saveSettings(settings) {
    try {
      localStorage.setItem("tf_settings", JSON.stringify(settings));
    } catch (e) {
      console.error("Failed to save settings", e);
    }
  }

  // --- Test History ---
  async saveTestResult(result) {
    const record = {
      id: Date.now(),
      timestamp: Date.now(),
      mode: result.mode || "text",
      language: result.language || "english",
      wpm: result.wpm || 0,
      rawWpm: result.rawWpm || 0,
      accuracy: result.accuracy || 0,
      consistency: result.consistency || 0,
      elapsedSeconds: result.elapsedSeconds || 0
    };

    // Update Personal Best in localStorage
    this._updatePersonalBest(record);

    await this.initPromise;
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction("testHistory", "readwrite");
        const store = tx.objectStore("testHistory");
        store.add(record);
        tx.oncomplete = () => resolve(record);
      });
    } else {
      // Fallback
      const history = this.getTestHistoryLocal();
      history.unshift(record);
      localStorage.setItem("tf_history", JSON.stringify(history.slice(0, 50)));
      return record;
    }
  }

  getTestHistoryLocal() {
    try {
      const saved = localStorage.getItem("tf_history");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  async getTestHistory(limit = 20) {
    await this.initPromise;
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction("testHistory", "readonly");
        const store = tx.objectStore("testHistory");
        const index = store.index("timestamp");
        const request = index.openCursor(null, "prev");
        const results = [];

        request.onsuccess = (e) => {
          const cursor = e.target.result;
          if (cursor && results.length < limit) {
            results.push(cursor.value);
            cursor.continue();
          } else {
            resolve(results);
          }
        };
      });
    }
    return this.getTestHistoryLocal().slice(0, limit);
  }

  // --- Personal Bests ---
  _updatePersonalBest(record) {
    const key = `pb_${record.mode}_${record.language}`;
    const currentBest = this.getPersonalBest(record.mode, record.language);
    if (!currentBest || record.wpm > currentBest.wpm) {
      localStorage.setItem(key, JSON.stringify(record));
    }
  }

  getPersonalBest(mode, language) {
    try {
      const saved = localStorage.getItem(`pb_${mode}_${language}`);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  // --- Level Progress ---
  getUnlockedLevel(language) {
    try {
      const saved = localStorage.getItem(`unlocked_lvl_${language}`);
      return saved ? parseInt(saved, 10) : 1; // Level 1 default unlocked
    } catch (e) {
      return 1;
    }
  }

  unlockNextLevel(language, currentLevel) {
    const nextLevel = currentLevel + 1;
    const existing = this.getUnlockedLevel(language);
    if (nextLevel > existing) {
      localStorage.setItem(`unlocked_lvl_${language}`, nextLevel.toString());
    }
    return Math.max(existing, nextLevel);
  }
}

export const storage = new StorageService();
