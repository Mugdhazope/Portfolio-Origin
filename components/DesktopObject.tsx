"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { motion, useMotionValue } from "framer-motion";
import type { DesktopObjectId, DesktopPosition } from "@/hooks/useDesktopLayout";

type DesktopObjectProps = {
  id: DesktopObjectId;
  position: DesktopPosition;
  constraintsRef: RefObject<HTMLDivElement | null>;
  className?: string;
  draggable?: boolean;
  dragHandleOnly?: boolean;
  onFocus: () => void;
  onMove: (id: DesktopObjectId, x: number, y: number) => void;
  onOpen?: () => void;
  children: ReactNode;
};

export function DesktopObject({
  id,
  position,
  constraintsRef,
  className = "",
  draggable = true,
  dragHandleOnly = false,
  onFocus,
  onMove,
  onOpen,
  children,
}: DesktopObjectProps) {
  const x = useMotionValue(position.x);
  const y = useMotionValue(position.y);
  const dragRef = useRef<{
    pointerId: number;
    startPointerX: number;
    startPointerY: number;
    startX: number;
    startY: number;
    moved: boolean;
  } | null>(null);
  const draggedRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const mediaQuery = globalThis.matchMedia("(max-width: 760px)");
    const updateMobile = () => setIsMobile(mediaQuery.matches);
    updateMobile();
    mediaQuery.addEventListener("change", updateMobile);
    return () => mediaQuery.removeEventListener("change", updateMobile);
  }, []);

  useEffect(() => {
    if (!dragRef.current) {
      x.set(position.x);
      y.set(position.y);
    }
  }, [position.x, position.y, x, y]);

  const clampToCanvas = (nextX: number, nextY: number, element: HTMLElement) => {
    const canvas = constraintsRef.current;
    if (!canvas) return { x: nextX, y: nextY };
    const maxX = Math.max(0, canvas.clientWidth - element.offsetWidth);
    const maxY = Math.max(0, canvas.clientHeight - element.offsetHeight);
    return {
      x: Math.min(Math.max(0, nextX), maxX),
      y: Math.min(Math.max(0, nextY), maxY),
    };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    onFocus();
    const target = event.target as HTMLElement;
    if (!draggable || isMobile || target.closest("button, a, input, textarea, select")) return;
    if (dragHandleOnly && !target.closest(`[data-desktop-drag-handle="${id}"]`)) return;
    const element = event.currentTarget;
    dragRef.current = {
      pointerId: event.pointerId,
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startX: position.x,
      startY: position.y,
      moved: false,
    };
    draggedRef.current = false;
    setIsDragging(true);
    try {
      element.setPointerCapture(event.pointerId);
    } catch {
      // Synthetic pointer events do not have a capturable browser pointer.
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - drag.startPointerX;
    const deltaY = event.clientY - drag.startPointerY;
    if (!drag.moved && Math.hypot(deltaX, deltaY) < 3) return;
    drag.moved = true;
    draggedRef.current = true;
    const next = clampToCanvas(drag.startX + deltaX, drag.startY + deltaY, event.currentTarget);
    x.set(next.x);
    y.set(next.y);
  };

  const finishPointerDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const finalPosition = clampToCanvas(x.get(), y.get(), event.currentTarget);
    x.set(finalPosition.x);
    y.set(finalPosition.y);
    onMove(id, finalPosition.x, finalPosition.y);
    dragRef.current = null;
    setIsDragging(false);
    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    } catch {
      // Synthetic pointer events do not have a capturable browser pointer.
    }
    window.setTimeout(() => {
      draggedRef.current = false;
    }, 0);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!onOpen || draggedRef.current) {
      if (draggedRef.current) event.preventDefault();
      return;
    }
    const target = event.target as HTMLElement;
    if (target.closest("button, a, input, textarea, select")) return;
    onOpen();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onOpen || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    onOpen();
  };

  return (
    <motion.div
      className={`desktop-object ${className} ${isDragging ? "is-dragging" : ""}`}
      style={{ left: x, top: y, zIndex: position.zIndex }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointerDrag}
      onPointerCancel={finishPointerDrag}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      aria-label={onOpen ? `Open ${id.replaceAll("-", " ")}` : undefined}
    >
      {children}
    </motion.div>
  );
}
