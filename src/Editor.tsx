import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { lintGutter } from "@codemirror/lint";
import { sdl } from "./sdlLanguage";
import { sdlLinter } from "./sdlLinter";

const extensions = [sdl(), sdlLinter(), lintGutter()];

export function Editor() {
  const [value, setValue] = React.useState("console.log('hello world!');");
  const onChange = React.useCallback((val: string) => {
    console.log("val:", val);
    setValue(val);
  }, []);
  return (
    <CodeMirror
      value={value}
      theme="light"
      width="500px"
      height="500px"
      onChange={onChange}
      extensions={extensions}
    />
  );
}
