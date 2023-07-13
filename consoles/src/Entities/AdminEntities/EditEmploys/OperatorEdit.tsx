import "./OperatorEdit.scss";
import removeBtn from "../../../Shared/assets/btn-delete.svg";

import { removeOperator } from "../action/addOperatorAction";
import { useAppSelector } from "../../../Shared/store/hooks";
import { adminSlice } from "../action/addOperatorSlice";
import { useEffect } from "react";

const OperatorEdit = () => {
  // Удаление рабоате но в базе данные непавильные
  const { selectedOperatorId, employList } = useAppSelector(
    (state) => state.adminSlice
  );
  // console.log(selectedOperatorId);
  // const { setInputsOperatorChanges } = adminSlice.actions;

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setInputsOperatorChanges({ ...employList, [name]: value });
  // };

  // const employ = employList.flatMap((user) => user.map((u) => u));

  // useEffect(() => {
  //   const getEmployList = async () => {
  //     getEmployList();
  //     setInputsOperatorChanges({
  //       name: employ.name,
  //       last_name: employ.last_name,
  //       email: employ.email,
  //       position: employ.position,
  //       id: employ.id,
  //       selectPosition:
  //     });
  //   };
  // });

  return (
    <div className="edit_container">
      <div className="edit_container-headliner">
        <div className="text-box">
          <h3>Редактировать профиль</h3>
          <div className="remove">
            <img src={removeBtn} alt="" />
            <button onClick={() => removeOperator(selectedOperatorId)}>
              Удалить сотрудника
            </button>
          </div>
        </div>
      </div>
      <div className="inputs">
        <div className="input">
          <p>Имя</p>
          <input placeholder="Имя" type="text" name="name" />
        </div>
        <div className="input">
          <p>Фамилия</p>
          <input placeholder="Фамилия" type="text" name="last_name" />
        </div>
        <div className="input">
          <p>Email</p>
          <input placeholder="email" type="text" name="email" />
        </div>
        <div className="input">
          <p>ID</p>
          <input placeholder="ID" type="text" name="id" />
        </div>
        <div className="input">
          <p>Должность</p>
          <input type="text" placeholder="position" name="position" />
        </div>
        <div className="select">
          <label htmlFor="queueSelect">Уровень доступа</label>
          <select id="queueSelect">
            <option value="">Выберите очередь</option>
            <option>operator</option>
            <option>registrar</option>
            <option>administrator</option>
          </select>
        </div>
      </div>
      <button>Сохранить</button>
    </div>
  );
};

export default OperatorEdit;
