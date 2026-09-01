"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue } from "framer-motion";
import type { TabletObjectId, TabletPosition } from "@/hooks/useTabletLayout";

type TabletObjectProps = {
  id: TabletObjectId;
  position: TabletPosition;
  className?: string;
  onFocus: () => void;
  onMove: (id: TabletObjectId, x: number, y: number) => void;
  onOpen?: () => void;
  children: ReactNode;
};

export function TabletObject({ id, position, className = "", onFocus, onMove, onOpen, children }: TabletObjectProps) {
  const x = useMotionValue(position.x);
  const y = useMotionValue(position.y);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ pointerId: number; startX: number; startY: number; originX: number; originY: number; moved: boolean } | null>(null);
  const wasDragged = useRef(false);

  useEffect(() => {
    if (!drag.current) {
      x.set(position.x);
      y.set(position.y);
    }
  }, [position.x, position.y, x, y]);

  const finish = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return;
    onMove(id, x.get(), y.get());
    drag.current = null;
    setDragging(false);
    window.setTimeout(() => { wasDragged.current = false; }, 0);
    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Synthetic pointer events do not have a capturable browser pointer.
    }
  };

  return (
    <motion.div
      className={`tablet-object ${className} ${dragging ? "is-dragging" : ""}`}
      style={{ left: x, top: y, zIndex: position.zIndex }}
      onPointerDown={(event) => {
        onFocus();
        const target = event.target as HTMLElement;
        if (target.closest("button, a, input, textarea, select") && !target.closest(".tablet-folder-button")) return;
        drag.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, originX: position.x, originY: position.y, moved: false };
        wasDragged.current = false;
        setDragging(true);
        try {
          event.currentTarget.setPointerCapture(event.pointerId);
        } catch {
          // Synthetic pointer events do not have a capturable browser pointer.
        }
      }}
      onPointerMove={(event) => {
        if (!drag.current || drag.current.pointerId !== event.pointerId) return;
        const deltaX = event.clientX - drag.current.startX;
        const deltaY = event.clientY - drag.current.startY;
        if (!drag.current.moved && Math.hypot(deltaX, deltaY) < 3) return;
        drag.current.moved = true;
        wasDragged.current = true;
        x.set(drag.current.originX + deltaX);
        y.set(drag.current.originY + deltaY);
      }}
      onPointerUp={finish}
      onPointerCancel={finish}
      onClickCapture={(event) => {
        if (wasDragged.current) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      onClick={(event) => {
        if (wasDragged.current) {
          event.preventDefault();
          return;
        }
        if (onOpen && !(event.target as HTMLElement).closest("button, a")) onOpen();
      }}
    >
      {children}
    </motion.div>
  );
}
