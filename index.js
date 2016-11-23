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
}

class Parser {}

class Compiler {}

