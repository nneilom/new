import { useEffect } from "react";
import "./RegistratorLists.scss";
import { useAppDispatch, useAppSelector } from "../../../../Shared/store/hooks";
import { getRegistratorList } from "../../action/addRegistrator/addRegistratorAction";
import { useNavigate } from "react-router";

const RegistratorList = () => {
  const dispatch = useAppDispatch();
  const { registeratorList } = useAppSelector(
    (state) => state.addRegistratorSlice
  );
  const navigate = useNavigate();
  console.log(registeratorList);

  useEffect(() => {
    const getRegistratorListsAndSet = async () => {
      await dispatch(getRegistratorList());
    };
    getRegistratorListsAndSet();
  }, []);

  const registratorsList = registeratorList.flatMap((registratorInfo) =>
    registratorInfo.map((registr) => ({
      id: registr.user.id,
      name: registr.user.first_name,
      email: registr.user.email,
      position: registr.user.position,
    }))
  );

  const targetPosition = "registrar"; // Замените на нужную вам позицию оператора

  const filteredRegistrator = registratorsList.filter(
    (registr) => registr.position === targetPosition
  );
  console.log("filteredOperator", filteredRegistrator);
  console.log("b nm", registratorsList);

  return (
    <div className="employeesList">
      <div className="employeesList__header">
        <span>№</span>
        <span>Почта</span>
        <span>ФИО</span>
        <span>Позиция</span>
        <span>Права</span>
        <span>Редактировать</span>
      </div>
      {filteredRegistrator.map((registrators: any, index: any) => (
        <div
          key={index}
          className={
            index % 2 ? "employeesList__item_even" : "employeesList__item_odd"
          }
        >
          <span>{index + 1}</span>
          <span>{registrators.email}</span>
          <span className="item__service">{registrators.name}</span>
          <div>
            <span>{registrators.position}</span>
          </div>
          <div>
            <span></span>
          </div>
          <button onClick={() => navigate("edit-registrator")}>
            Редактировать
          </button>
        </div>
      ))}
    </div>
  );
};

export default RegistratorList;
