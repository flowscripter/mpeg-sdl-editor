import { Editor } from "./components/Editor";
import { Navbar } from "./components/Navbar";
import { InfoArea } from "./components/InfoArea";
import { StatusBar } from "./components/StatusBar";
import { ResizableLayout } from "./components/ResizableLayout";
import { useToast } from "./hooks/useToast";
import { useFileOperations } from "./hooks/useFileOperations";
import { useTheme } from "./hooks/useTheme";
import { usePrettier } from "./hooks/usePrettier";
import { useCallback, useState } from "react";

export function App() {
  const [toastMessage, showToast] = useToast();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [_isMobile, setIsMobile] = useState(false);
  const [infoToggle, setInfoToggle] = useState<() => void>(() => {});
  const { theme, toggleTheme } = useTheme();
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
  const { handlePrettify } = usePrettier({ code, setCode, showToast });

  const lineCount = code.split("\n").length;
  const characterCount = code.length;

  const handleDrawerToggle = useCallback((isOpen: boolean) => {
    setIsDrawerOpen(isOpen);
  }, []);

  const handleMobileStateChange = useCallback(
    (mobile: boolean, toggleFn: () => void) => {
      setIsMobile(mobile);
      setDrawerToggle(() => toggleFn);
    },
    [],
  );

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
        isDrawerOpen={isDrawerOpen}
        onToggleInfo={infoToggle}
      />
      <div className="flex-grow overflow-hidden" data-testid="main-content">
        <ResizableLayout
          onToggleDrawer={handleDrawerToggle}
          onMobileStateChange={handleMobileStateChange}
        >
          {/* Left column: Editor with StatusBar */}
          <div className="flex flex-col h-full">
            <div className="flex-grow overflow-auto">
              <Editor
                value={code}
                onChange={setCode}
                theme={theme}
              />
            </div>
            <StatusBar
              lineCount={lineCount}
              characterCount={characterCount}
            />
          </div>

          {/* Right column: Info Area */}
          <div className="h-full md:p-2 md:pl-0">
            <InfoArea
              lineCount={lineCount}
              characterCount={characterCount}
            />
          </div>
        </ResizableLayout>
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
