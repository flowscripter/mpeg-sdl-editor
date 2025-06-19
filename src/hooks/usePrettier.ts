import { useCallback } from "react";
import prettier from "prettier";
import { prettierPluginSdl } from "@flowscripter/mpeg-sdl-parser";
import type { ShowToastFunction } from "./useToast";

interface UsePrettierProps {
  code: string;
  setCode: (code: string) => void;
  showToast: ShowToastFunction;
}

export function usePrettier({ code, setCode, showToast }: UsePrettierProps) {
  const handlePrettify = useCallback(async () => {
    const options: prettier.Options = {
      parser: "sdl",
      plugins: [prettierPluginSdl],
    };
    try {
      const formattedCode = await prettier.format(code, options);
      setCode(formattedCode);
      showToast("Code prettified!");
    } catch (error) {
      console.error("Error prettifying code:", error);
      showToast("Error prettifying SDL. See console.");
    }
  }, [code, setCode, showToast]);

  return { handlePrettify };
}
