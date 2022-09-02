import { TokenType } from 'src/lexer/token';

export enum NodeType {
  statement = 'statement',
  clause = 'clause',
  set_operation = 'set_operation',
  function_call = 'function_call',
  array_subscript = 'array_subscript',
  parenthesis = 'parenthesis',
  between_predicate = 'between_predicate',
  limit_clause = 'limit_clause',
  all_columns_asterisk = 'all_columns_asterisk',
  literal = 'literal',
  identifier = 'identifier',
  keyword = 'keyword',
  parameter = 'parameter',
  operator = 'operator',
  comma = 'comma',
  line_comment = 'line_comment',
  block_comment = 'block_comment',
}

export type StatementNode = {
  type: NodeType.statement;
  children: AstNode[];
  hasSemicolon: boolean;
};

export type ClauseNode = {
  type: NodeType.clause;
  name: KeywordNode;
  children: AstNode[];
};

export type SetOperationNode = {
  type: NodeType.set_operation;
  name: KeywordNode;
  children: AstNode[];
};

export type FunctionCallNode = {
  type: NodeType.function_call;
  name: KeywordNode;
  parenthesis: ParenthesisNode;
};

// <ident>[<expr>]
export type ArraySubscriptNode = {
  type: NodeType.array_subscript;
  array: IdentifierNode | KeywordNode;
  parenthesis: ParenthesisNode;
};

export type ParenthesisNode = {
  type: NodeType.parenthesis;
  children: AstNode[];
  openParen: string;
  closeParen: string;
};

// BETWEEN <expr1> AND <expr2>
export type BetweenPredicateNode = {
  type: NodeType.between_predicate;
  between: KeywordNode;
  expr1: AstNode[];
  and: KeywordNode;
  expr2: AstNode[];
};

// LIMIT <count>
// LIMIT <offset>, <count>
export type LimitClauseNode = {
  type: NodeType.limit_clause;
  name: KeywordNode;
  count: AstNode[];
  offset?: AstNode[];
};

// The "*" operator used in SELECT *
export type AllColumnsAsteriskNode = {
  type: NodeType.all_columns_asterisk;
};

export type LiteralNode = {
  type: NodeType.literal;
  text: string;
};

export type IdentifierNode = {
  type: NodeType.identifier;
  text: string;
};

export type KeywordNode = {
  type: NodeType.keyword;
  tokenType: TokenType;
  text: string;
  raw: string;
};

export type ParameterNode = {
  type: NodeType.parameter;
  key?: string;
  text: string;
};

export type OperatorNode = {
  type: NodeType.operator;
  text: string;
};

export type CommaNode = {
  type: NodeType.comma;
};

export type LineCommentNode = {
  type: NodeType.line_comment;
  text: string;
  precedingWhitespace: string;
};

export type BlockCommentNode = {
  type: NodeType.block_comment;
  text: string;
};

export type AstNode =
  | ClauseNode
  | SetOperationNode
  | FunctionCallNode
  | ArraySubscriptNode
  | ParenthesisNode
  | BetweenPredicateNode
  | LimitClauseNode
  | AllColumnsAsteriskNode
  | LiteralNode
  | IdentifierNode
  | KeywordNode
  | ParameterNode
  | OperatorNode
  | CommaNode
  | LineCommentNode
  | BlockCommentNode;
