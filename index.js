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

  addToken(type, value) {
    this.tokens.push(new Token(type, value));

    return this;
  }

  sliceCode(i) {
    return this.code.slice(i);
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
        case ' ':
          i += this.tokenizeSpace(i);
          break;
        case '#':
          i += this.tokenizeComment(i);
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

  tokenizeSpace(index) {
    // skip spaces
    return 1;
  }

  tokenizeComment(index) {
    const code = this.sliceCode(index);

    let i = 0;
    let char;

    let comment = '';

    while (char = code.charAt(i)) {
      if ('\n' === char) {
        break;
      }

      comment += char;

      i++;
    }

    this.addToken('COMMENT', comment);

    return i;
  }
}

class Parser {}

class Compiler {}


/** Code */
const code = `
# Hello, habr
## This is comment too
`;

console.log('=== code ===');
console.log(code);


/** Tokens */
const lexer = new Lexer(code);
const tokens = lexer.tokenize();

console.log('=== tokens ===');
console.log(tokens);
