import "./EmployeesList.scss";
import { tickets } from "../../../OperatorEntities/ConsoleLists/MainList/variables";

const EmployeesList = () => {
  return (
    <div className="employeesList">
      <div className="employeesList__headerr">
        <h2>Сотрудники</h2>
        <button>Добавить сотрудника</button>
      </div>
      <div className="employeesList__headers">
        <span>№</span>
        <span>Почта</span>
        <span>ФИО</span>
        <span>Позиция</span>
        <span>Права</span>
        <span>Редактировать</span>
      </div>
      {tickets?.map((ticket: any, index: any) => (
        <div
          key={ticket.id}
          className={
            index % 2
              ? "employeesList__item_even"
              : "employeesList__item_odd"
          }
        >
          <span>{index + 1}</span>
          <span>alibeksydygaliev18@gmail.com</span>
          <span className="item__service">Сыдыгалиев А.Ж</span>
          <div>
            <span>Оператор</span>
          </div>
          <div>
            <span>Оператор</span>
          </div>
          <button>Редактировать</button>
        </div>
      ))}
    </div>
  );
};

export default EmployeesList;
