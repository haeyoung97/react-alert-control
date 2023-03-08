import React, {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

export const AlertContext = createContext(null);

export const AlertProvider = (props) => {
  const { children } = props;
  const [alertId, setAlertId] = useState(new Map());

  const mount = useCallback((id, element) => {
    setAlertId((alertId) => {
      const cloned = new Map(alertId);
      cloned.set(id, element);
      return cloned;
    });
  }, []);

  const unmount = useCallback((id) => {
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

export const AlertController = forwardRef(
  ({ alertElement: AlertElement }, ref) => {
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

    return <AlertElement isOpen={isOpen} close={handleClose} />;
  }
);
