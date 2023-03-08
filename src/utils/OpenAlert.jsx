import AlertModal from "../component/AlertModal";

const OpenAlert = (title, alert) => {
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

export default OpenAlert;
