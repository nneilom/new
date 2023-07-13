import { Switch } from "@mui/material";
import "./EmployeesList.scss";
import { RxAvatar, RxCross1 } from "react-icons/rx";
import { BiPencil } from "react-icons/bi";
import { useNavigate } from "react-router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../Shared/store/hooks";
import { useEffect } from "react";
import { getOperatorList } from "../../Entities/AdminEntities/action/addOperatorAction";
import { IOperatorList } from "../../Entities/AdminEntities/action/type";

const EmployList = () => {
  const { operatorList, isLoading, error } = useAppSelector(
    (state) => state.adminSlice
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getOperatorListsAndSet = async () => {
      await dispatch(getOperatorList());
    };
    getOperatorListsAndSet();
  }, []);

  // console.log(operatorList);

  const operators = operatorList.flatMap((user) =>
    user.map((operatorInfo: IOperatorList) => ({
      id: operatorInfo.user?.id,
      name: operatorInfo.user?.first_name,
      window_number: operatorInfo.user?.window_number,
    }))
  );

  console.log("vghjk", operators);

  return (
    <div className="employeesList">
      <div className="employeesList__header">
        <h3>Список сотрудников</h3>
        <button onClick={() => navigate("add-employ")}>
          Добавить сотрудников
        </button>
      </div>
      {/* //!============================================================ */}
      {/* //* здесь я прописал блок для 'map'ания сотрудников */}
      <div className="employeesList__item">
        <div className="employeesList__item_left">
          <Switch defaultChecked />
          <RxAvatar className="item_avatar" />
          <span>Атай Аланов</span>
          <span>Окно №3</span>
        </div>
        <div className="employeesList__item_right">
          <BiPencil
            className="item_icon"
            onClick={() => navigate("edit-employ")}
          />
          <RxCross1 className="item_icon" />
        </div>
      </div>

      {operators.map((employe: any) => (
        <div className="employeesList__item" key={employe.id}>
          <div className="employeesList__item_left">
            <Switch defaultChecked />
            <RxAvatar />
            <span>{employe.name}</span>
            <span></span>
            <span>{employe.window_number}</span>
          </div>
          <div className="employeesList__item_right">
            <BiPencil
              onClick={() => navigate("edit-employ")}
              style={{ cursor: "pointer" }}
            />
            <RxCross1 style={{ cursor: "pointer" }} />
          </div>
        </div>
      ))}

      {/* //!============================================================ */}
    </div>
  );
};

export default EmployList;
