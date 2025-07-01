import { type Extension, Facet } from "@codemirror/state";
import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";

const baseTheme = EditorView.baseTheme({
  "&light .cm-ruler": { borderRight: "1px dotted black", opacity: 0.2 },
  "&dark .cm-ruler": { borderRight: "1px dotted white", opacity: 0.2 },
});

const rulerWidth = Facet.define<number, number>({
  combine: (values) => values.length ? Math.min(...values) : 10,
});

const showRuler = ViewPlugin.fromClass(
  class {
    rulerDiv: HTMLDivElement;

    constructor(view: EditorView) {
      const column = view.state.facet(rulerWidth);

      this.rulerDiv = view.dom.appendChild(document.createElement("div"));
      this.rulerDiv.classList.add("cm-ruler");
      this.rulerDiv.style.cssText =
        "position: absolute; top: 0; height: 100%; width: 1px; pointer-events: none; overflow: hidden;";

      this.updateRulePosition(view, column);
    }

    update(update: ViewUpdate) {
      if (update.geometryChanged && !update.docChanged) {
        const column = update.state.facet(rulerWidth);
        this.updateRulePosition(update.view, column);
      }
    }

    updateRulePosition(view: EditorView, column: number) {
      const defaultCharacterWidth = view.defaultCharacterWidth;
      const gutterWidth = view.contentDOM.getBoundingClientRect().x;

      this.rulerDiv.style.left = `${
        gutterWidth + (column * defaultCharacterWidth) + 6
      }px`;
    }

    destroy() {
      this.rulerDiv.remove();
    }
  },
);

export function ruler(column: number): Extension {
  return [
    baseTheme,
    rulerWidth.of(column),
    showRuler,
  ];
}
