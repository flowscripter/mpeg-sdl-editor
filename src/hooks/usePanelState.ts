import { useCallback, useRef, useState } from "react";

interface UsePanelStateProps {
  initialSplitPercentage: number;
  minRightWidth: number;
  onToggleDrawer?: (isOpen: boolean) => void;
}

export function usePanelState({
  initialSplitPercentage,
  minRightWidth,
  onToggleDrawer,
}: UsePanelStateProps) {
  const [splitPercentage, setSplitPercentage] = useState(
    initialSplitPercentage,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [lastVisiblePercentage, setLastVisiblePercentage] = useState(
    initialSplitPercentage,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleMobileDrawer = useCallback(() => {
    setIsDrawerOpen((prev) => {
      const newState = !prev;
      onToggleDrawer?.(newState);
      return newState;
    });
  }, [onToggleDrawer]);

  const toggleDesktopPanel = useCallback(() => {
    setIsPanelCollapsed((prev) => {
      const newCollapsed = !prev;
      if (newCollapsed) {
        // Collapsing: save current percentage and set to 100% (hide panel)
        setLastVisiblePercentage(splitPercentage);
        setSplitPercentage(100); // Editor takes full width
      } else {
        // Expanding: restore previous percentage with validation
        let restoredPercentage = lastVisiblePercentage;

        // Ensure the restored percentage gives the right panel at least minimum width
        const maxAllowedPercentage = 100 -
          ((minRightWidth /
            (containerRef.current?.getBoundingClientRect().width || 1000)) *
            100);

        if (
          restoredPercentage >= 95 || restoredPercentage < 50 ||
          restoredPercentage > maxAllowedPercentage
        ) {
          // Use initial percentage if stored value is invalid
          restoredPercentage = initialSplitPercentage;
          setLastVisiblePercentage(initialSplitPercentage);
        }

        setSplitPercentage(restoredPercentage);
      }
      // For desktop mode, "open" means panel is NOT collapsed
      onToggleDrawer?.(!newCollapsed);
      return newCollapsed;
    });
  }, [
    splitPercentage,
    lastVisiblePercentage,
    initialSplitPercentage,
    minRightWidth,
    onToggleDrawer,
  ]);

  const resetForMobile = useCallback(() => {
    setIsDrawerOpen(false);
    setIsPanelCollapsed(false);
    onToggleDrawer?.(false);
  }, [onToggleDrawer]);

  const resetForDesktop = useCallback(() => {
    // When switching to desktop, ensure split percentage is valid
    if (splitPercentage >= 95 || splitPercentage < 50) {
      setSplitPercentage(initialSplitPercentage);
      setLastVisiblePercentage(initialSplitPercentage);
    }
    // Notify parent about the current panel state in desktop mode
    onToggleDrawer?.(!isPanelCollapsed);
  }, [
    splitPercentage,
    initialSplitPercentage,
    isPanelCollapsed,
    onToggleDrawer,
  ]);

  return {
    splitPercentage,
    setSplitPercentage,
    isDrawerOpen,
    isPanelCollapsed,
    lastVisiblePercentage,
    setLastVisiblePercentage,
    containerRef,
    toggleMobileDrawer,
    toggleDesktopPanel,
    resetForMobile,
    resetForDesktop,
  };
}
