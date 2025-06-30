import React, { useCallback, useEffect } from "react";
import { useMobileDetection } from "../hooks/useMobileDetection";
import { usePanelState } from "../hooks/usePanelState";
import { useDragResize } from "../hooks/useDragResize";
import { MobileDrawer } from "./MobileDrawer";
import { DesktopPanels } from "./DesktopPanels";

interface ResizableLayoutProps {
  children: [React.ReactNode, React.ReactNode];
  initialSplitPercentage?: number;
  minLeftWidth?: number;
  minRightWidth?: number;
  onToggleInfo?: (isOpen: boolean) => void;
  onMobileStateChange?: (isMobile: boolean) => void;
}

export function ResizableLayout({
  children,
  initialSplitPercentage = 70,
  minLeftWidth = 300,
  minRightWidth = 200,
  onToggleInfo,
  onMobileStateChange,
}: ResizableLayoutProps) {
  const isMobile = useMobileDetection();

  const {
    splitPercentage,
    setSplitPercentage,
    isDrawerOpen,
    isPanelCollapsed,
    containerRef,
    toggleMobileDrawer,
    toggleDesktopPanel,
    resetForMobile,
    resetForDesktop,
  } = usePanelState({
    initialSplitPercentage,
    minRightWidth,
    onToggleInfo,
  });

  const { isDragging, handleMouseDown } = useDragResize({
    containerRef,
    minLeftWidth,
    minRightWidth,
    isMobile,
    isPanelCollapsed,
    onSplitPercentageChange: setSplitPercentage,
  });

  const toggleInfo = useCallback(() => {
    if (isMobile) {
      toggleInfoDrawer();
    }
    else {
      toggleInfoPanel();
    }
  }, [isMobile, toggleInfoDrawer, toggleInfoPanel]);

  // Handle mobile/desktop mode switching
  useEffect(() => {
    if (isMobile) {
      resetInfoDrawer();
    }
    else {
      resetInfoPanel();
    }
  }, [
    isMobile,
    resetForMobile,
    resetForDesktop,
    onMobileStateChange,
    toggleDrawer,
  ]);

  return (
    <div ref={containerRef} className="flex h-full w-full relative">
      {isMobile
        ? (
          <>
            <div className="flex flex-col w-full">
              {children[0]}
            </div>

            <MobileDrawer
              isOpen={isDrawerOpen}
              onToggleInfo={toggleInfo}
            >
              {children[1]}
            </MobileDrawer>
          </>
        )
        : (
          <DesktopPanels
            leftChild={children[0]}
            rightChild={children[1]}
            splitPercentage={splitPercentage}
            isPanelCollapsed={isPanelCollapsed}
            isDragging={isDragging}
            onMouseDown={handleMouseDown}
          />
        )}
    </div>
  );
}
