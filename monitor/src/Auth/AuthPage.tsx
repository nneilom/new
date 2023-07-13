import { useNavigate } from "react-router-dom";
import classes from "./AuthPage.module.scss";
import logo from "../../Shared/assets/rsk-logo.svg";
import eye from "../../Shared/assets/eye.svg";
import visible from "../../Shared/assets/visibility_off.svg";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../Shared/store/hooks";
import { authSlice } from "../../Entities/Auth/AuthSlice";
import { ILogin } from "../../Entities/Auth/type";
import { fetchAuthLogIn } from "../../Entities/Auth/ActionAuthCreator";

const AuthPage = () => {
  const navigate = useNavigate();
  const navigateToResetPage = () => navigate("/reset-password");
  const navigatetoNewpage = () => navigate("/");
  const { loginRequest, isLoading, error, success } = useAppSelector(
    (state) => state.authReducer
  );

  const { setInputsLogIn } = authSlice.actions;

  useEffect(() => {
    if (success) {
      navigatetoNewpage();
    }
  }, [success]);

  const dispatch = useAppDispatch();

  const [inputState, setInputState] = useState({
    showPassword: false,
    isInputFocused: false,
    isInputFilled: false,
  });

  const togglePasswordVisibility = () => {
    setInputState({
      ...inputState,
      showPassword: !inputState.showPassword,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const payload: ILogin = {
      email:
        name === "email"
          ? value
          : loginRequest[loginRequest.length - 1]?.email ?? "",
      password:
        name === "password"
          ? value
          : loginRequest[loginRequest.length - 1]?.password ?? "",
    };
    dispatch(setInputsLogIn(payload));
  };

  const handlePasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const payload: ILogin = {
      email: loginRequest[loginRequest.length - 1]?.email ?? "",
      password: value,
    };
    dispatch(setInputsLogIn(payload));
    setInputState({ ...inputState, isInputFilled: value !== "" });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchAuthLogIn());
  };

  const handleInputFocus = () => {
    setInputState({ ...inputState, isInputFocused: true });
  };

  const handleInputBlur = () => {
    setInputState({ ...inputState, isInputFocused: false });
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className={classes.mainContainer}>
          <img src={logo} alt="rsk logo" />
          <div className={classes.textBox}>
            <h1>Добро пожаловать</h1>
            <span>Пройдите авторизацию</span>
          </div>
          <div className={classes.input_box}>
            <input
              type="text"
              placeholder="Введите вашу почту"
              onBlur={handleInputBlur}
              onChange={handleInputChange}
              name="email"
            />

            <div className={classes.inputPassword}>
              <input
                type={inputState.showPassword ? "text" : "password"}
                className={classes.passwordInput}
                placeholder="Введите пароль"
                name="password"
                autoComplete="password"
                onChange={(event) => {
                  handlePasswordChange(event);
                  handleInputChange(event);
                }}
                onFocus={handleInputFocus}
              />
              {inputState.isInputFocused && (
                <img
                  src={inputState.showPassword ? eye : visible}
                  alt=""
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>
          <div className={classes.infoContainer}>
            {error && (
              <p className={classes.error}>
                Неправильный пароль или электронная почта
              </p>
            )}
            <div>
              <p
                onClick={navigateToResetPage}
                className={classes.resetPageNavigate}
              >
                Забыли пароль?
              </p>
              <p
                onClick={() => navigate("/register")}
                className={classes.resetPageNavigate}
              >
                Нет аккаунта?
              </p>
            </div>
          </div>
          {!isLoading ? (
            <button
              type="submit"
              style={{
                backgroundColor: inputState.isInputFilled
                  ? ""
                  : "#9C9A9A",
              }}
            >
              Войти
            </button>
          ) : (
            "загрузка"
          )}
        </div>
      </form>
    </>
  );
};

export default AuthPage;
