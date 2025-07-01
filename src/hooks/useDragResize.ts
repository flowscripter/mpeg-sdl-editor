import { useCallback, useEffect, useState } from "react";

interface UseDragResizeProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  minLeftWidth: number;
  minRightWidth: number;
  isInfoShown: boolean;
  onSplitPercentageChange: (percentage: number) => void;
}

export function useDragResize({
  containerRef,
  minLeftWidth,
  minRightWidth,
  isInfoShown,
  onSplitPercentageChange,
}: UseDragResizeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartPercentage, setDragStartPercentage] = useState(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isInfoShown) {
      return;
    }

    e.preventDefault();

    const container = containerRef.current;

    if (!container) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const currentPercentage = (mouseX / containerRect.width) * 100;

    setDragStartX(e.clientX);
    setDragStartPercentage(currentPercentage);
    setIsDragging(true);
  }, [isInfoShown, containerRef]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current || !isInfoShown) {
      return;
    }

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;

    // Calculate the delta from where the drag started
    const deltaX = e.clientX - dragStartX;
    const deltaPercentage = (deltaX / containerWidth) * 100;

    // Calculate new percentage based on drag start position + delta
    let newPercentage = dragStartPercentage + deltaPercentage;

    // Apply minimum width constraints
    const minLeftPercentage = (minLeftWidth / containerWidth) * 100;
    const minRightPercentage = (minRightWidth / containerWidth) * 100;

    // Clamp the percentage to valid bounds
    newPercentage = Math.max(minLeftPercentage, newPercentage);
    newPercentage = Math.min(100 - minRightPercentage, newPercentage);

    onSplitPercentageChange(newPercentage);
  }, [
    isDragging,
    dragStartX,
    dragStartPercentage,
    minLeftWidth,
    minRightWidth,
    isInfoShown,
    onSplitPercentageChange,
    containerRef,
  ]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging && isInfoShown) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, isInfoShown]);

  return {
    isDragging,
    handleMouseDown,
  };
}
