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

class Parser {
  constructor(tokens) {
    this.tokens = tokens;

    this.i = 0;
    this._currentToken = null;
  }

  peek() {
    if (this._currentToken) {
      return this._currentToken;
    }

    return this._currentToken = this.tokens[this.i];
  }

  next() {
    const token = this.peek();
    this.i++;
    this._currentToken = null;
    return token;
  }

  eof() {
    return !this.peek();
  }

  parse() {
    const nodes = [];

    while (!this.eof()) {
      const token = this.peek();

      switch (token.type) {
        case 'COMMENT':
          nodes.push(this.parseComment());
          break;
        default:
          throw new Error(`Unknown token type "${token.type}"`);
      }
    }

    return {
      type: 'ROOT',
      nodes: nodes
    };
  }

  parseComment() {
    const comment = this.next();

    return {
      type: 'COMMENT',
      value: comment.value.substring(1),
      raw:   comment.value
    };
  }
}

class Compiler {
  constructor(ast) {
    this.ast = ast;
  }

  compile() {
    let result = '';

    for (let node of this.ast.nodes) {
      switch (node.type) {
        case 'COMMENT':
          result += this.compileComment(node) + '\n';
          break;
        default:
          throw new Error(`Unknown node type "${node.type}"`);
      }
    }

    return result;
  }

  compileComment(node) {
    return `//${node.value}`;
  }
}


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


/** AST */
const parser = new Parser(tokens);
const ast = parser.parse();

console.log('=== ast ===');
console.log(ast);


/** Result */
const compiler = new Compiler(ast);
const result = compiler.compile();

console.log('=== result ===');
console.log(result);
