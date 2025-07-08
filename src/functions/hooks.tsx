import { useEffect } from "react";

/**
 * @param eventType
 * @param cb
 * @param deps
 * @param {EventTarget} target
 * @param {boolean} [passive=false]
 */
export function useEvent(
  eventType,
  cb,
  deps = [],
  target = document,
  passive = false,
) {
  useEffect(
    () => {
      if (!target) return;
      const listener = cb;
      target.addEventListener(eventType, listener, { passive });
      return () => target.removeEventListener(eventType, listener, { passive });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  );
}
