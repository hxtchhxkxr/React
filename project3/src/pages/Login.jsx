import "./Login.css";
import { useState } from "react";
import Header from "../component/Header";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";
import { setTokens } from "../api/token";
import { login } from "../api/authApi";
import { getErrorMessage } from "../api/error";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력하세요");
      return;
    }

    try {
      const data = await login(email, password);
      setTokens(data.accessToken, data.refreshToken);
      navigate("/", { replace: true });
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  return (
    <div className="Login">
      <Header title={"로그인"} />
      <div className="login_section">
        <h4>이메일</h4>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="test@test.com"
        />
      </div>
      <div className="login_section">
        <h4>비밀번호</h4>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
      </div>
      <div className="login_section bottom_section">
        <Button text={"로그인"} type={"positive"} onClick={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
