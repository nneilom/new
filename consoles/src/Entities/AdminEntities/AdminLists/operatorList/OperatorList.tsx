import { useEffect } from "react";
import "./OperatorList.scss";
import { useAppDispatch, useAppSelector } from "../../../../Shared/store/hooks";
import { getOperatorList } from "../../action/addOperatorAction";
import { useNavigate } from "react-router";
import { adminSlice } from "../../action/addOperatorSlice";

const OperatorList = () => {
  const dispatch = useAppDispatch();
  const { operatorList } = useAppSelector((state) => state.adminSlice);
  const { selectedIdOfoperators } = adminSlice.actions;
  const navigate = useNavigate();

  useEffect(() => {
    const getOperatorListsAndSet = async () => {
      await dispatch(getOperatorList());
    };
    getOperatorListsAndSet();
  }, []);

  console.log("all", operatorList);

  const operatorGet = operatorList.flatMap((user) => user.map((u) => u));
  console.log("operatorget", operatorGet);

  // const operatorsList = operatorList.flatMap((user) =>
  //   user.map((operatorInfo: any) => ({
  //     id: operatorInfo.user.id,
  //     name: operatorInfo.user.first_name,
  //     email: operatorInfo.user.email,
  //     position: operatorInfo.user.position,
  //   }))
  // );
  // console.log("operatorsList", operatorsList);

  const handleEditOperator = (operatorId: number) => {
    dispatch(selectedIdOfoperators(operatorId));
    navigate("edit-operator");
  };

  const targetPosition = "operator";

  const filteredOperator = operatorGet.filter(
    (operator) => operator.position === targetPosition
  );
  console.log("filteredOperator", filteredOperator);

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
      {filteredOperator?.map((operator: any, index: any) => (
        <div
          key={operator.id}
          className={
            index % 2 ? "employeesList__item_even" : "employeesList__item_odd"
          }
        >
          <span>{index + 1}</span>
          <span>{operator.email}</span>
          <span className="item__service">{operator.name}</span>
          <div>
            <span>{operator.position}</span>
          </div>
          <div>
            <span></span>
          </div>
          <button onClick={() => handleEditOperator(operator.id)}>
            Редактировать
          </button>
        </div>
      ))}
    </div>
  );
};

export default OperatorList;
