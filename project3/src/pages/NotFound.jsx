import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import Button from "../component/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header title={"페이지를 찾을 수 없습니다"} />
      <p>주소가 올바른지 확인해주세요.</p>
      <Button
        text={"홈으로 가기"}
        type={"positive"}
        onClick={() => navigate("/", { replace: true })}
      />
    </div>
  );
};

export default NotFound;
