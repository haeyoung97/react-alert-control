import withAlert from "../../component/withAlert";

const index = (props) => {
  const { OpenAlert } = props;
  return (
    <div>
      <button
        onClick={() => {
          OpenAlert("확인합니다.").then((res) => {
            console.log("res", res);
          });
        }}
      >
        alert call
      </button>
    </div>
  );
};

export default withAlert(index);
