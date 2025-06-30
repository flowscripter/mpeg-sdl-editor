import React from "react";

interface DesktopPanelsProps {
  leftChild: React.ReactNode;
  rightChild: React.ReactNode;
  splitPercentage: number;
  isPanelCollapsed: boolean;
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
}

export function DesktopPanels({
  leftChild,
  rightChild,
  splitPercentage,
  isPanelCollapsed,
  isDragging,
  onMouseDown,
}: DesktopPanelsProps) {
  return (
    <>
      {/* Left panel */}
      <div
        className="flex flex-col"
        style={{ width: isPanelCollapsed ? "100%" : `${splitPercentage}%` }}
      >
        {leftChild}
      </div>

      {/* Divider - only show when panel is not collapsed */}
      {!isPanelCollapsed && (
        <div
          className={`w-1 bg-base-300 hover:bg-primary/50 cursor-col-resize transition-all duration-150 ${
            isDragging ? "bg-primary/70 w-1.5" : ""
          } relative group`}
          onMouseDown={onMouseDown}
          title="Drag to resize panels"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`w-0.5 h-12 bg-base-content/30 rounded-full transition-all ${
                isDragging
                  ? "bg-primary-content h-16"
                  : "group-hover:bg-base-content/50 group-hover:h-16"
              }`}
            >
            </div>
          </div>
        </div>
      )}

      {/* Right panel - only show when not collapsed */}
      {!isPanelCollapsed && (
        <div
          className="flex flex-col"
          style={{ width: `${Math.max(100 - splitPercentage, 5)}%` }}
        >
          {rightChild}
        </div>
      )}
    </>
  );
}
