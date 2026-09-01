"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { motion, useMotionValue } from "framer-motion";
import { Maximize2, Minus, Minimize2, X } from "lucide-react";
import type { ManagedWindow } from "@/hooks/useWindowManager";

type WindowProps = {
  window: ManagedWindow;
  constraintsRef: RefObject<HTMLDivElement | null>;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onMove: (id: string, position: { x: number; y: number }) => void;
  children: ReactNode;
};

export function Window({
  window,
  constraintsRef,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
  children,
}: WindowProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [viewportRevision, setViewportRevision] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(window.position.x);
  const y = useMotionValue(window.position.y);
  const windowRef = useRef<HTMLElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startPointerX: number;
    startPointerY: number;
    startX: number;
    startY: number;
  } | null>(null);

  const clampToCanvas = useCallback((nextX: number, nextY: number) => {
    const canvas = constraintsRef.current;
    const element = windowRef.current;
    if (!canvas || !element) return { x: nextX, y: nextY };
    const maxX = Math.max(0, canvas.clientWidth - element.offsetWidth);
    const maxY = Math.max(0, canvas.clientHeight - element.offsetHeight);
    return {
      x: Math.min(Math.max(0, nextX), maxX),
      y: Math.min(Math.max(0, nextY), maxY),
    };
  }, [constraintsRef]);

  useEffect(() => {
    const mediaQuery = globalThis.matchMedia("(max-width: 760px)");
    const updateMobile = () => setIsMobile(mediaQuery.matches);
    updateMobile();
    mediaQuery.addEventListener("change", updateMobile);
    const handleResize = () => setViewportRevision((revision) => revision + 1);
    globalThis.addEventListener("resize", handleResize);
    return () => {
      mediaQuery.removeEventListener("change", updateMobile);
      globalThis.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!dragRef.current) {
      x.set(window.position.x);
      y.set(window.position.y);
    }
  }, [window, window.position.x, window.position.y, x, y]);

  useEffect(() => {
    if (window.isMaximized || isMobile || dragRef.current) return;
    const next = clampToCanvas(window.position.x, window.position.y);
    if (next.x !== window.position.x || next.y !== window.position.y) {
      x.set(next.x);
      y.set(next.y);
      onMove(window.id, next);
    }
  }, [
    isMobile,
    onMove,
    viewportRevision,
    window.id,
    window.isMaximized,
    window.position.x,
    window.position.y,
    clampToCanvas,
    x,
    y,
  ]);

  const handleHeaderPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (window.isMaximized || isMobile || (event.target as HTMLElement).closest("button")) return;
    const element = windowRef.current;
    if (!element) return;
    dragRef.current = {
      pointerId: event.pointerId,
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startX: window.position.x,
      startY: window.position.y,
    };
    setIsDragging(true);
    try {
      element.setPointerCapture(event.pointerId);
    } catch {
      // Synthetic pointer events do not have a capturable browser pointer.
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const next = clampToCanvas(
      drag.startX + event.clientX - drag.startPointerX,
      drag.startY + event.clientY - drag.startPointerY,
    );
    x.set(next.x);
    y.set(next.y);
  };

  const finishPointerDrag = (event: React.PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const finalPosition = clampToCanvas(x.get(), y.get());
    x.set(finalPosition.x);
    y.set(finalPosition.y);
    onMove(window.id, finalPosition);
    dragRef.current = null;
    setIsDragging(false);
    try {
      if (windowRef.current?.hasPointerCapture(event.pointerId)) {
        windowRef.current.releasePointerCapture(event.pointerId);
      }
    } catch {
      // Synthetic pointer events do not have a capturable browser pointer.
    }
  };

  return (
    <motion.section
      ref={windowRef}
      className={`window-shell ${window.isMaximized ? "window-shell--maximized" : ""} ${isDragging ? "is-dragging" : ""}`}
      style={{
        zIndex: window.zIndex,
        ...(window.isMaximized || isMobile ? {} : { left: x, top: y }),
      }}
      initial={{ opacity: 0, scale: 0.92, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 18 }}
      transition={{ type: "spring", stiffness: 260, damping: 26, opacity: { duration: 0.22 } }}
      onPointerDown={onFocus}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointerDrag}
      onPointerCancel={finishPointerDrag}
      role="dialog"
      aria-modal="false"
      aria-labelledby={`${window.id}-title`}
    >
      <header
        className="window-header"
        onDoubleClick={onToggleMaximize}
        onPointerDown={handleHeaderPointerDown}
        title="Double-click to maximize"
      >
        <div className="window-controls" aria-label="Window controls">
          <button
            type="button"
            className="window-control window-control--close"
            onClick={onClose}
            onPointerDown={(event) => event.stopPropagation()}
            aria-label={`Close ${window.title}`}
          >
            <X size={11} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className="window-control window-control--minimize"
            onClick={onMinimize}
            onPointerDown={(event) => event.stopPropagation()}
            aria-label={`Minimize ${window.title}`}
          >
            <Minus size={11} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className="window-control window-control--maximize"
            onClick={onToggleMaximize}
            onPointerDown={(event) => event.stopPropagation()}
            aria-label={window.isMaximized ? `Restore ${window.title}` : `Maximize ${window.title}`}
          >
            {window.isMaximized ? <Minimize2 size={9} /> : <Maximize2 size={9} />}
          </button>
        </div>
        <div className="window-heading">
          <span className="window-kicker">ORIGIN4 / {window.kind}</span>
          <h2 id={`${window.id}-title`}>{window.title}</h2>
        </div>
        <span className="window-grip" aria-hidden="true">
          ::
        </span>
      </header>
      <div className="window-content">{children}</div>
    </motion.section>
  );
}
