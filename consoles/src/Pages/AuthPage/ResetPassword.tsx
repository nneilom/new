import { useNavigate } from "react-router";
import classes from "./AuthPage.module.scss";
import logo from "../../Shared/assets/rsk-logo.svg";
import { FormEvent, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../Shared/store/hooks";
import { authSlice } from "../../Entities/Auth/AuthSlice";
import { resetPasswordEmail } from "../../Entities/Auth/ActionAuthCreator";

const ResetPassword = () => {
  const [inputState, setInputState] = useState({
    showPassword: false,
    isInputFocused: false,
    isInputFilled: false,
  });
  const [isResetPasswordSent, setIsResetPasswordSent] = useState(false);

  const { isLoading } = useAppSelector((state) => state.authReducer);
  const { setResetPasswordEmail } = authSlice.actions;
  const dispatch = useAppDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(`Input "${name}" value: ${value}`);
    if (name === "email") {
      dispatch(setResetPasswordEmail(value));
    }
    setInputState({ ...inputState, isInputFilled: value !== "" });
  };

  const handleFormSubmitToResetPassword = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    await dispatch(resetPasswordEmail());
    setIsResetPasswordSent(true);
    isSuccessNavigateToNextPage();
  };

  const navigate = useNavigate();
  const navigateToLogInPage = () => navigate("/auth-page");
  const isSuccessNavigateToNextPage = () => navigate("/create-new-password");

  return (
    <>
      <form onSubmit={handleFormSubmitToResetPassword}>
        <div className={classes.resetContainer}>
          <img src={logo} alt="rsk logo" />
          {!isResetPasswordSent ? (
            <div className={classes.resetTextBox}>
              <h2 className={classes.resetPassword}>Сброс пароля</h2>
              <span>
                Введите вашу электронную почту, и мы отправим вам инструкцию по
                восстановлению пароля
              </span>
              <div className={classes.inputReset_box}>
                <input
                  type="text"
                  placeholder="Эл. почта"
                  onChange={handleInputChange}
                  name="email"
                />
              </div>
              <p
                className={classes.navigateToLogIn}
                onClick={navigateToLogInPage}
              >
                Вернуться к входу?
              </p>
              <button
                type="submit"
                style={{
                  backgroundColor: inputState.isInputFilled ? "" : "#9C9A9A",
                }}
              >
                Сбросить пароль
              </button>
            </div>
          ) : (
            <>
              <h2 className={classes.resetPasswordSend}>
                Проверьте вашу почту
              </h2>
              <span>
                Пожалуйста, проверьте адрес электронной почты example@gmail.com
                для получения инструкций по сбросу вашего пароля.
              </span>
              <button type="submit" className={classes.resendEmail}>
                Далее
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
