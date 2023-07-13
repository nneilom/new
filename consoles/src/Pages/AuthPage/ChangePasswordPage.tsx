import classes from "./AuthPage.module.scss";
import logo from "../../Shared/assets/rskLogo.png";
import eye from "../../Shared/assets/eye.svg";
import visible from "../../Shared/assets/visibility_off.svg";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Shared/store/hooks";
import { authSlice } from "../../Entities/Auth/AuthSlice";
import { IChangePassword } from "../../Entities/Auth/type";
import { fetchChangePassword } from "../../Entities/Auth/ActionAuthCreator";

const ChangePasswordPage = () => {
  const { changePassword, isLoading, error } = useAppSelector(
    (state) => state.authReducer
  );
  const { setChangePassword } = authSlice.actions;

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
    const payload: IChangePassword = {
      old_password:
        name === "old_password"
          ? value
          : changePassword[changePassword.length - 1]?.old_password ?? "",
      new_password:
        name === "new_password"
          ? value
          : changePassword[changePassword.length - 1]?.new_password ?? "",
      new_password_confirm:
        name === "new_password_confirm"
          ? value
          : changePassword[changePassword.length - 1]?.new_password_confirm ??
            "",
    };
    dispatch(setChangePassword(payload));
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const payload: IChangePassword = {
      old_password: value,
      new_password: value,
      new_password_confirm: value,
    };
    dispatch(setChangePassword(payload));
    setInputState({ ...inputState, isInputFilled: value !== "" });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!error) {
      await dispatch(fetchChangePassword());
    }
  };

  const handleInputFocus = () => {
    setInputState({ ...inputState, isInputFocused: true });
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className={classes.mainContainer}>
          <img src={logo} alt="rsk logo" />
          <div className={classes.textBox}>
            <h1>Сменить пароль</h1>
            <span></span>
          </div>

          <div className={classes.input_box}>
            <div className={classes.inputPassword}>
              <input
                type={inputState.showPassword ? "text" : "password"}
                className={classes.passwordInput}
                placeholder="Введите свой пароль"
                name="old_password"
                autoComplete="old_password"
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
                placeholder="Введите новый пароль"
                name="new_password"
                autoComplete="new_password"
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
                placeholder="Введите подтвердите"
                name="new_password_confirm"
                autoComplete="new_password_confirm"
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

          <button
            type="submit"
            style={{
              backgroundColor: inputState.isInputFilled ? " " : "#9C9A9A",
            }}
          >
            Сменить пароль
          </button>
        </div>
      </form>
    </>
  );
};

export default ChangePasswordPage;
