import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";
import { createDiary } from "../api/diaryApi";
import { getErrorMessage } from "../api/error";

const New = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  // Editor 가 "작성 완료" 시 { date: "YYYY-MM-DD", content, emotionId } 를 넘겨준다 (기존과 동일)
  const onSubmit = async (data) => {
    const { date, content, emotionId } = data;
    try {
      await createDiary({
        date: new Date(date).getTime(), // "YYYY-MM-DD" 문자열 → 서버는 숫자(ms)
        content,
        emotionId,
      });
      navigate("/", { replace: true }); // 서버 성공 후에만 이동
    } catch (error) {
      alert(getErrorMessage(error)); // 400 이면 서버의 유효성 메시지가 그대로
    }
  };

  return (
    <>
      <div>
        <Header
          title={"새 일기 쓰기"}
          leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
        />
        <Editor onSubmit={onSubmit} />
      </div>
    </>
  );
};
export default New;
