import OpenAlert from "../../utils/OpenAlert";
import useAlert from "../../hooks/useAlert";

const index = () => {
  const alert = useAlert();
  return (
    <div>
      <button
        onClick={() => {
          OpenAlert("확인합니다.", alert).then((res) => {
            console.log("res", res);
          });
        }}
      >
        alert call
      </button>
    </div>
  );
};

export default index;
