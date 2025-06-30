import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { lintGutter } from "@codemirror/lint";
import { sdl } from "../sdl/sdlLanguage";
import { sdlLinter } from "../sdl/sdlLinter";

const extensions = [sdl(), sdlLinter(), lintGutter()];

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  theme: "light" | "dark";
}

export function Editor({ value, onChange, theme }: EditorProps) {
  const onCodeMirrorChange = React.useCallback((val: string) => {
    onChange(val);
  }, [onChange]);

  return (
    <div className="h-full w-full">
      <CodeMirror
        value={value}
        theme={theme}
        width="100%"
        height="100%"
        className="h-full w-full border border-base-300 rounded-md"
        onChange={onCodeMirrorChange}
        extensions={extensions}
      />
    </div>
  );
}
