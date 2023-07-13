import classes from "./AuthPage.module.scss";
import logo from "../../assets/rskLogo.png";
import eye from "../../assets/eye.svg";
import visible from "../../assets/visibility_off.svg";
import { useAppDispatch, useAppSelector } from "../../Shared/store/hooks";
import { authSlice } from "../../Entities/Auth/AuthSlice";
import { ChangeEvent, FormEvent, useState } from "react";
import { IAfterResetMakeNewPassword } from "../../Entities/Auth/type";
import { useNavigate } from "react-router";
import { afterResetCreateNewPassword } from "../../Entities/Auth/ActionAuthCreator";

const CreateNewPassword = () => {
  const { resetAndNewPassword, isLoading } = useAppSelector(
    (state) => state.authReducer
  );
  const { setMakeNewPassword } = authSlice.actions;

  const dispatch = useAppDispatch();

  const [inputState, setInputState] = useState({
    showPassword: false,
    isInputFocused: false,
    isInputFilled: false,
  });

  const togglePasswordVisibility = () => {
    setInputState({ ...inputState, showPassword: !inputState.showPassword });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // console.log(`Input "${name}" value: ${value}`);
    const payload: IAfterResetMakeNewPassword = {
      code:
        name === "code"
          ? value
          : resetAndNewPassword[resetAndNewPassword.length - 1]?.code ?? "",
      password:
        name === "password"
          ? value
          : resetAndNewPassword[resetAndNewPassword.length - 1]?.password ?? "",
      password_confirm:
        name === "password_confirm"
          ? value
          : resetAndNewPassword[resetAndNewPassword.length - 1]
              ?.password_confirm ?? "",
    };
    dispatch(setMakeNewPassword(payload));
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const payload: IAfterResetMakeNewPassword = {
      code: resetAndNewPassword[resetAndNewPassword.length - 1]?.code ?? "",
      password: value,
      password_confirm: value,
    };
    dispatch(setMakeNewPassword(payload));
    setInputState({ ...inputState, isInputFilled: value !== "" });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(afterResetCreateNewPassword());
    isSuccessNavigateToNextPage();
  };

  const handleInputFocus = () => {
    setInputState({ ...inputState, isInputFocused: true });
  };

  const handleInputBlur = () => {
    setInputState({ ...inputState, isInputFocused: false });
  };

  const navigate = useNavigate();
  const isSuccessNavigateToNextPage = () => navigate("/create-new-password");

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
              placeholder="Введите активационный код"
              onBlur={handleInputBlur}
              onChange={handleInputChange}
              name="code"
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
            <div className={classes.inputPassword}>
              <input
                type={inputState.showPassword ? "text" : "password"}
                className={classes.passwordInput}
                placeholder="Подтвердите пароль"
                name="password_confirm"
                autoComplete="password_confirm"
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
          {!isLoading ? (
            <button
              type="submit"
              style={{
                backgroundColor: inputState.isInputFilled ? "" : "#9C9A9A",
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

export default CreateNewPassword;
