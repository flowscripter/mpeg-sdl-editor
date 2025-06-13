import { syntaxTree } from "@codemirror/language";
import { type Diagnostic, linter } from "@codemirror/lint";
import { type SyntaxNodeRef } from "@lezer/common";

export function sdlLinter() {
  return linter((view) => {
    let diagnostics: Diagnostic[] = [];

    syntaxTree(view.state).cursor().iterate((node: SyntaxNodeRef) => {
      if (node.type.isError) {
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: "warning",
          message: "Parse error",
        });
      }
    });

    return diagnostics;
  });
}
