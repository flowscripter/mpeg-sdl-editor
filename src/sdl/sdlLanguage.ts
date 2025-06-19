import { createLenientSdlParser } from "@flowscripter/mpeg-sdl-parser";
import { LRParser as LezerParser } from "@lezer/lr";
import { styleTags, tags as t } from "@lezer/highlight";
import {
  foldInside,
  foldNodeProp,
  LanguageSupport,
  LRLanguage,
} from "@codemirror/language";

export function createParser(): LezerParser {
  const parser = createLenientSdlParser();

  return parser.configure({
    props: [
      styleTags({
        int: t.typeName,
        unsigned: t.typeName,
        float: t.typeName,
        bit: t.typeName,
        Comment: t.comment,
        Identifier: t.variableName,
        BinaryLiteral: t.literal,
        HexadecimalLiteral: t.literal,
        MultipleCharacterLiteral: t.literal,
        IntegerLiteral: t.number,
        DecimalLiteral: t.number,
        FloatingPointLiteral: t.number,
        Base64StringLiteral: t.string,
        UtfStringLiteral: t.string,
        _if: t.controlKeyword,
        _else: t.controlKeyword,
        _switch: t.controlKeyword,
        _case: t.controlKeyword,
        _break: t.controlKeyword,
        _do: t.controlKeyword,
        _while: t.controlKeyword,
        _class: t.keyword,
        _extends: t.keyword,
        _const: t.keyword,
        map: t.keyword,
        utf8string: t.keyword,
        utf8list: t.keyword,
        utfstring: t.keyword,
        utf16string: t.keyword,
        reserved: t.keyword,
        legacy: t.keyword,
        base64string: t.keyword,
        aligned: t.keyword,
        expandable: t.keyword,
        abstract: t.keyword,
        computed: t.keyword,
        OpenBrace: t.brace,
        CloseBrace: t.brace,
        CloseParenthesis: t.paren,
        OpenParenthesis: t.paren,
        OpenBracket: t.squareBracket,
        CloseBracket: t.squareBracket,
        PostfixIncrement: t.arithmeticOperator,
        PostfixDecrement: t.arithmeticOperator,
        UnaryPlus: t.arithmeticOperator,
        UnaryNegation: t.arithmeticOperator,
        Multiplication: t.arithmeticOperator,
        Division: t.arithmeticOperator,
        Modulus: t.arithmeticOperator,
        Addition: t.arithmeticOperator,
        Subtraction: t.arithmeticOperator,
        RelationalLessThan: t.compareOperator,
        RelationalLessThanOrEqual: t.compareOperator,
        RelationalGreaterThan: t.compareOperator,
        RelationalGreaterThanOrEqual: t.compareOperator,
        RelationalEqual: t.compareOperator,
        RelationalNotEqual: t.compareOperator,
        BitwiseShiftLeft: t.bitwiseOperator,
        BitwiseShiftRight: t.bitwiseOperator,
        BitwiseAnd: t.bitwiseOperator,
        BitwiseOr: t.bitwiseOperator,
        LogicalAnd: t.logicOperator,
        LogicalOr: t.logicOperator,
        lengthof: t.operatorKeyword,
        RangeOperator: t.operator,
        Assignment: t.operator,
        LookAhead: t.operator,
        Period: t.punctuation,
        UtfPrefix: t.punctuation,
        Colon: t.punctuation,
        Semicolon: t.punctuation,
        Comma: t.punctuation,
        SingleQuote: t.punctuation,
        DoubleQuote: t.punctuation,
      }),
      foldNodeProp.add({
        Application: foldInside,
      }),
    ],
  });
}

export const sdlLanguage = LRLanguage.define({
  parser: createParser(),
  languageData: {
    commentTokens: { line: "//" },
  },
});

export function sdl() {
  return new LanguageSupport(sdlLanguage); //, [exampleCompletion])
}
