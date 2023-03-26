import useAlert from "../../hooks/useAlert";
import AlertModal from "../AlertModal";

const withAlert = (WrappedComponent) => (props) => {
  const alert = useAlert();

  const OpenAlert = (title) => {
    return new Promise((resolve) => {
      alert.open(({ isOpen, close }) => (
        <AlertModal
          isOpen={isOpen}
          onClose={() => {
            resolve(true);
            close();
          }}
          title={title}
        />
      ));
    });
  };

  return <WrappedComponent {...props} OpenAlert={OpenAlert} />;
};

export default withAlert;
