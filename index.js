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
        default:
          throw new Error(`Unknown char ${JSON.stringify(char)}`);
      }
    }

    return this.tokens;
  }
}

class Parser {}

class Compiler {}

