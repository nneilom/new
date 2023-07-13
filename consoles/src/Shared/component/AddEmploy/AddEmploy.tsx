import { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { employRegisterSlice } from "../../../Entities/AdminEntities/action/EmployAction/EmploySlice";
import { IRegisterEmploy } from "../../../Entities/AdminEntities/action/EmployAction/type";
import { fetchRegisterForEmploy } from "../../../Entities/AdminEntities/action/EmployAction/EmployAction";
import classes from "../../../Pages/AuthPage/AuthPage.module.scss";

const AddEmploy = () => {
  const { registerEmployRequest, isLoading, error, success } = useAppSelector(
    (state) => state.employRegisterSlice
  );

  const { setInputsEmployRegister } = employRegisterSlice.actions;

  const dispatch = useAppDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(`Input "${name}" value: ${value}`);
    const payload: IRegisterEmploy = {
      last_name:
        name === "last_name"
          ? value
          : registerEmployRequest[registerEmployRequest.length - 1]
              ?.last_name ?? "",
      first_name:
        name === "first_name"
          ? value
          : registerEmployRequest[registerEmployRequest.length - 1]
              ?.first_name ?? "",
      email:
        name === "email"
          ? value
          : registerEmployRequest[registerEmployRequest.length - 1]?.email ??
            "",
      password:
        name === "password"
          ? value
          : registerEmployRequest[registerEmployRequest.length - 1]?.password ??
            "",
      password_confirm:
        name === "password_confirm"
          ? value
          : registerEmployRequest[registerEmployRequest.length - 1]
              ?.password_confirm ?? "",
    };
    dispatch(setInputsEmployRegister(payload));
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchRegisterForEmploy());
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className={classes.adminRegisterForm}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
          className={classes.input_box}
        >
          <input
            style={{ width: "50%", margin: 5 }}
            type="text"
            placeholder="ФАМИЛИЯ "
            name="last_name"
            onChange={handleInputChange}
          />
          <input
            style={{ width: "50%", margin: 5 }}
            type="text"
            placeholder="ИМЯ ПОЛЬЗОВАТЕЛЯ"
            name="first_name"
            onChange={handleInputChange}
          />
          <input
            style={{ width: "50%", margin: 5 }}
            type="text"
            placeholder="email"
            name="email"
            onChange={handleInputChange}
          />
          <input
            style={{ width: "50%", margin: 5 }}
            type="text"
            placeholder="ПАРОЛЬ"
            name="password"
            onChange={handleInputChange}
          />
          <input
            style={{ width: "50%", margin: 5 }}
            type="text"
            placeholder="ПОДТВЕРЖДЕНИЕ ПАРОЛЯ"
            name="password_confirm"
            onChange={handleInputChange}
          />
          <button style={{ width: "50%" }}>сохранить</button>
        </div>
      </form>
    </>
  );
};

export default AddEmploy;
