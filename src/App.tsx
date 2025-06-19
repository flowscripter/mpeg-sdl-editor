import { Editor } from "./components/Editor";
import { Navbar } from "./components/Navbar";
import { useToast } from "./hooks/useToast";
import { useFileOperations } from "./hooks/useFileOperations";
import { useTheme } from "./hooks/useTheme";
import { usePrettier } from "./hooks/usePrettier";

export function App() {
  const [toastMessage, showToast] = useToast();
  const {
    code,
    setCode,
    loadFileInputRef,
    handleSave,
    handleLoad,
    handleFileChange,
    handleCopy,
  } = useFileOperations({
    initialCode: "// Start typing your SDL here...\n",
    showToast,
  });

  const { theme, toggleTheme } = useTheme();
  const { handlePrettify } = usePrettier({ code, setCode, showToast });

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onPrettify={handlePrettify}
        onCopy={handleCopy}
        onSave={handleSave}
        onLoad={handleLoad}
        loadFileInputRef={loadFileInputRef}
        onFileChange={handleFileChange}
      />
      <div className="flex-grow overflow-auto" data-testid="editor-container">
        <Editor
          value={code}
          onChange={setCode}
          theme={theme}
        />
      </div>
      {toastMessage && (
        <div className="toast toast-bottom toast-center sm:toast-end">
          <div className="alert alert-success">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
