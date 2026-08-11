/**
 * TypeForge Core Typing Engine
 * Sub-1ms keystroke processor with 60fps rAF statistics loop
 */
export class TypingEngine {
  constructor(text = "", options = {}) {
    this.text = text;
    this.mode = options.mode || "text"; // 'text', 'quote', 'code'
    this.language = options.language || "english";
    
    // Callbacks
    this.onCharacterInputCallback = null;
    this.onCompleteCallback = null;
    this.onErrorCallback = null;
    this.onTickCallback = null;

    this.reset(text, options);
  }

  reset(text = this.text, options = {}) {
    this.text = text;
    this.mode = options.mode || this.mode;
    this.language = options.language || this.language;

    this.status = "idle"; // 'idle', 'active', 'complete', 'paused'
    this.startTime = null;
    this.endTime = null;
    this.currentIndex = 0;

    // Characters array
    this.characters = text.split("").map((c, i) => ({
      index: i,
      char: c,
      status: "untyped", // 'untyped', 'correct', 'incorrect', 'skipped'
      typedChar: null,
      timestamp: null
    }));

    // Performance metrics
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.backspaceCount = 0;
    this.totalTyped = 0;

    // WPM sample history for consistency calculation
    this.wpmHistory = [];
    this.lastSampleTime = null;
    this.rafId = null;

    if (this.onTickCallback) {
      this.onTickCallback(this.getStats());
    }
  }

  start() {
    if (this.status === "active") return;
    this.status = "active";
    this.startTime = performance.now();
    this.lastSampleTime = this.startTime;
    this._startStatsLoop();
  }

  stop() {
    if (this.status !== "active") return;
    this.status = "complete";
    this.endTime = performance.now();
    this._stopStatsLoop();

    const finalStats = this.getStats();
    if (this.onCompleteCallback) {
      this.onCompleteCallback(finalStats);
    }
  }

  /**
   * Primary Keystroke Processor — High-speed, synchronous execution (< 1ms target)
   */
  handleInput(event) {
    if (this.status === "complete") return;

    // Prevent tab scrolling or browser defaults for typing control keys
    if (event.key === "Tab" || event.key === " ") {
      event.preventDefault();
    }

    // Auto start on first valid typing keypress
    if (this.status === "idle" && !this._isControlKey(event.key)) {
      this.start();
    }

    const key = event.key;

    // 1. Handle Backspace
    if (key === "Backspace") {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        const prevChar = this.characters[this.currentIndex];
        
        if (prevChar.status === "correct") {
          this.correctCount = Math.max(0, this.correctCount - 1);
        } else if (prevChar.status === "incorrect") {
          this.incorrectCount = Math.max(0, this.incorrectCount - 1);
        }

        prevChar.status = "untyped";
        prevChar.typedChar = null;
        prevChar.timestamp = null;
        this.backspaceCount++;

        this._emitCharEvent(prevChar, "backspace");
      }
      return;
    }

    // Ignore non-printable modifier keys (Ctrl, Shift, Alt, Meta, CapsLock, F1-F12, etc.)
    if (this._isControlKey(key)) return;

    // Prevent typing beyond challenge text length
    if (this.currentIndex >= this.characters.length) return;

    const expectedChar = this.characters[this.currentIndex].char;
    let actualInputChar = key;

    // 2. Tab & Enter key mapping for code mode
    if (key === "Tab") {
      actualInputChar = " "; // Match space indentation
    } else if (key === "Enter") {
      actualInputChar = "\n";
    }

    // 3. Compare Input Keystroke
    const isMatch = actualInputChar === expectedChar;
    const currentCharObj = this.characters[this.currentIndex];

    currentCharObj.typedChar = actualInputChar;
    currentCharObj.timestamp = performance.now();
    this.totalTyped++;

    if (isMatch) {
      currentCharObj.status = "correct";
      this.correctCount++;
    } else {
      currentCharObj.status = "incorrect";
      this.incorrectCount++;
    }

    const processedChar = currentCharObj;
    this.currentIndex++;

    this._emitCharEvent(processedChar, isMatch ? "correct" : "incorrect");

    // Check completion condition
    if (this.currentIndex >= this.characters.length) {
      this.stop();
    }
  }

  _isControlKey(key) {
    return (
      key === "Shift" ||
      key === "Control" ||
      key === "Alt" ||
      key === "Meta" ||
      key === "CapsLock" ||
      key === "Escape" ||
      key === "ArrowLeft" ||
      key === "ArrowRight" ||
      key === "ArrowUp" ||
      key === "ArrowDown" ||
      /^F\d{1,2}$/.test(key)
    );
  }

  _emitCharEvent(charObj, action) {
    if (this.onCharacterInputCallback) {
      this.onCharacterInputCallback({
        character: charObj,
        currentIndex: this.currentIndex,
        action,
        stats: this.getStats()
      });
    }
  }

  _startStatsLoop() {
    const loop = () => {
      if (this.status !== "active") return;
      const now = performance.now();
      const elapsed = now - this.startTime;

      // Sample WPM every 2 seconds for consistency calculation
      if (now - this.lastSampleTime >= 2000) {
        const currentWpm = this._calculateWPM(this.correctCount, elapsed);
        this.wpmHistory.push(currentWpm);
        this.lastSampleTime = now;
      }

      if (this.onTickCallback) {
        this.onTickCallback(this.getStats());
      }

      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  _stopStatsLoop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  // Mathematics: WPM, Raw WPM, Accuracy, Consistency
  _calculateWPM(correctChars, elapsedMs) {
    if (!elapsedMs || elapsedMs <= 0) return 0;
    const minutes = elapsedMs / 60000;
    return Math.round((correctChars / 5) / minutes);
  }

  _calculateRawWPM(totalTyped, elapsedMs) {
    if (!elapsedMs || elapsedMs <= 0) return 0;
    const minutes = elapsedMs / 60000;
    return Math.round((totalTyped / 5) / minutes);
  }

  _calculateAccuracy(correctChars, totalTyped) {
    if (!totalTyped || totalTyped <= 0) return 100;
    return Math.min(100, Math.round((correctChars / totalTyped) * 100));
  }

  _calculateConsistency(wpmHistory) {
    if (!wpmHistory || wpmHistory.length < 2) return 100;
    const mean = wpmHistory.reduce((a, b) => a + b, 0) / wpmHistory.length;
    if (mean === 0) return 100;
    const variance = wpmHistory.reduce((sum, wpm) => sum + Math.pow(wpm - mean, 2), 0) / wpmHistory.length;
    const stdDev = Math.sqrt(variance);
    const cv = stdDev / mean;
    return Math.max(0, Math.round((1 - cv) * 100));
  }

  getStats() {
    const elapsedMs = this.startTime
      ? (this.endTime ? this.endTime - this.startTime : performance.now() - this.startTime)
      : 0;

    const wpm = this._calculateWPM(this.correctCount, elapsedMs);
    const rawWpm = this._calculateRawWPM(this.totalTyped, elapsedMs);
    const accuracy = this._calculateAccuracy(this.correctCount, this.totalTyped);
    const consistency = this._calculateConsistency(this.wpmHistory);

    return {
      wpm,
      rawWpm,
      accuracy,
      consistency,
      elapsedSeconds: Math.floor(elapsedMs / 1000),
      elapsedMs,
      correctCount: this.correctCount,
      incorrectCount: this.incorrectCount,
      totalTyped: this.totalTyped,
      backspaceCount: this.backspaceCount,
      currentIndex: this.currentIndex,
      totalLength: this.characters.length,
      isComplete: this.currentIndex >= this.characters.length
    };
  }

  getState() {
    return {
      status: this.status,
      characters: this.characters,
      currentIndex: this.currentIndex,
      mode: this.mode,
      language: this.language
    };
  }

  // Event Listeners
  onCharacterInput(fn) { this.onCharacterInputCallback = fn; }
  onComplete(fn) { this.onCompleteCallback = fn; }
  onError(fn) { this.onErrorCallback = fn; }
  onTick(fn) { this.onTickCallback = fn; }
}
