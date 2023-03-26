import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertContext,
  AlertController,
  AlertControlRef,
} from "../context/AlertProvider";
import { CreateAlertElement } from "../types";

let elementId = 1;
export default function () {
  const context = useContext(AlertContext);

  if (context === null) {
    throw new Error("useOverlay is only available within OverlayProvider.");
  }

  const { mount, unmount } = context;
  const [id] = useState(() => String(elementId++));
  const alertRef = useRef<AlertControlRef | null>(null);

  useEffect(() => {
    return () => {
      unmount(id);
    };
  }, [id, unmount]);

  return useMemo(
    () => ({
      open: (alertElement: CreateAlertElement) => {
        mount(
          id,
          <AlertController
            key={Date.now()}
            ref={alertRef}
            alertElement={alertElement}
            onExit={() => {
              unmount(id);
            }}
          />
        );
      },
      close: () => {
        alertRef.current?.close();
      },
      exit: () => {
        unmount(id);
      },
    }),
    [id, mount, unmount]
  );
}
