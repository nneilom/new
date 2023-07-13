import classes from "./AuthPage.module.scss";
import logo from "../../Shared/assets/rskLogo.png";
import eye from "../../Shared/assets/eye.svg";
import visible from "../..//Shared/assets/visibility_off.svg";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { authSlice } from "../../Entities/Auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../Shared/store/hooks";
import { IRegister } from "../../Entities/Auth/type";
import { useNavigate } from "react-router";
import { fetchAuthRegister } from "../../Entities/Auth/ActionAuthCreator";

const RegisterPage = () => {
  const { registerRequest, isLoading, success } = useAppSelector(
    (state) => state.authReducer
  );
  const { setInputsRegister } = authSlice.actions;

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(success);
    if (success) {
      isSuccessNavigateToHome();
    }
  }, [success]);

  const [inputState, setInputState] = useState({
    showPassword: false,
    isInputFocused: false,
    isInputFilled: false,
  });

  const togglePasswordVisibility = () => {
    setInputState({ ...inputState, showPassword: !inputState.showPassword });
  };

  const handleInputChangeForField = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    // console.log(`Input "${name}" value: ${value}`);
    const payload: IRegister = {
      first_name:
        name === "first_name"
          ? value
          : registerRequest[registerRequest.length - 1]?.first_name ?? "",
      last_name:
        name === "last_name"
          ? value
          : registerRequest[registerRequest.length - 1]?.last_name ?? "",
      email:
        name === "email"
          ? value
          : registerRequest[registerRequest.length - 1]?.email ?? "",

      password:
        name === "password"
          ? value
          : registerRequest[registerRequest.length - 1]?.password ?? "",
      password_confirm:
        name === "password_confirm"
          ? value
          : registerRequest[registerRequest.length - 1]?.password_confirm ?? "",
    };
    dispatch(setInputsRegister(payload));
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const payload: IRegister = {
      last_name: registerRequest[registerRequest.length - 1]?.last_name ?? "",
      first_name: registerRequest[registerRequest.length - 1]?.first_name ?? "",
      email: registerRequest[registerRequest.length - 1]?.email ?? "",
      password: value,
      password_confirm: value,
    };
    dispatch(setInputsRegister(payload));
    setInputState({ ...inputState, isInputFilled: value !== "" });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(fetchAuthRegister());
  };

  const handleInputFocus = () => {
    setInputState({ ...inputState, isInputFocused: true });
  };

  const handleInputBlur = () => {
    setInputState({ ...inputState, isInputFocused: false });
  };

  const navigate = useNavigate();
  const navigateToLogIn = () => navigate("/auth-page");

  const isSuccessNavigateToHome = () => navigate("/");

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
              placeholder="Введите ваше имя"
              onBlur={handleInputBlur}
              onChange={handleInputChangeForField}
              name="first_name"
            />
            <input
              type="text"
              placeholder="Введите вашe фамилию "
              onBlur={handleInputBlur}
              onChange={handleInputChangeForField}
              name="last_name"
            />
            <input
              type="text"
              placeholder="Введите вашу почту"
              onBlur={handleInputBlur}
              onChange={handleInputChangeForField}
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
                  handleInputChangeForField(event);
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
            <div className={classes.inputPassword}>
              <input
                type={inputState.showPassword ? "text" : "password"}
                className={classes.passwordInput}
                placeholder="Подтвердите пароль"
                name="password_confirm"
                autoComplete="password_confirm"
                onChange={(event) => {
                  handlePasswordChange(event);
                  handleInputChangeForField(event);
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
          <p onClick={navigateToLogIn} className={classes.logInPageNavigate}>
            Вы уже зарегистрированы?
          </p>
          {!isLoading ? (
            <button
              type="submit"
              style={{
                backgroundColor: inputState.isInputFilled ? "" : "#9C9A9A",
              }}
            >
              Зарегистрироваться
            </button>
          ) : (
            "загрузка"
          )}
        </div>
      </form>
    </>
  );
};

export default RegisterPage;
