import React, {
  createContext,
  forwardRef,
  PropsWithChildren,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { CreateAlertElement } from "../../type/AlertTypes";

export const AlertContext = createContext<{
  mount(id: string, element: ReactNode): void;
  unmount(id: string): void;
} | null>(null);

export const AlertProvider = ({ children }: PropsWithChildren) => {
  const [alertId, setAlertId] = useState<Map<string, ReactNode>>(new Map());

  const mount = useCallback((id: string, element: ReactNode) => {
    setAlertId((alertId) => {
      const cloned = new Map(alertId);
      cloned.set(id, element);
      return cloned;
    });
  }, []);

  const unmount = useCallback((id: string) => {
    setAlertId((alertId) => {
      const cloned = new Map(alertId);
      cloned.delete(id);
      return cloned;
    });
  }, []);

  const context = useMemo(() => ({ mount, unmount }), [mount, unmount]);

  return (
    <AlertContext.Provider value={context}>
      {children}
      {[...alertId.entries()].map(([id, element]) => (
        <React.Fragment key={id}>{element}</React.Fragment>
      ))}
    </AlertContext.Provider>
  );
};

interface Props {
  alertElement: CreateAlertElement;
  onExit: () => void;
}

export interface AlertControlRef {
  close: () => void;
}

export const AlertController = forwardRef(
  (
    { alertElement: AlertElement, onExit }: Props,
    ref: Ref<AlertControlRef>
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = useCallback(() => setIsOpen(false), []);

    useImperativeHandle(
      ref,
      () => {
        return { close: handleClose };
      },
      [handleClose]
    );

    useEffect(() => {
      requestAnimationFrame(() => {
        setIsOpen(true);
      });
    }, []);

    return <AlertElement isOpen={isOpen} close={handleClose} exit={onExit} />;
  }
);
