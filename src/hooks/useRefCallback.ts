import { useRef, useCallback } from "react";

function useRefCallback<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  const refCallback = useCallback((node: T | null) => {
    ref.current = node;
  }, []);

  return [ref, refCallback] as const;
}

export default useRefCallback;
