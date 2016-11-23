'use strict';

class Token {
  constructor(type, value) {
    this.type   = type;
    this.value  = value;
  }

  inspect() {
    return `[${this.type}:${JSON.stringify(this.value)}]`;
  }
}

class Lexer {
  constructor(code) {
    this.code   = code;

    this.tokens = [];
  }

  reset() {
    this.tokens = [];

    return this;
  }

  tokenize() {
    this.reset();

    let char;
    let i = 0;
    while (char = this.code.charAt(i)) {
      switch (char) {
        case '\n':
          i += this.tokenizeNewline(i);
          break;
        default:
          throw new Error(`Unknown char ${JSON.stringify(char)}`);
      }
    }

    return this.tokens;
  }

  tokenizeNewline(index) {
    // skip newlines
    return 1;
  }
}

class Parser {}

class Compiler {}

