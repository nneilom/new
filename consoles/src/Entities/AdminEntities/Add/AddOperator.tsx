import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../Shared/store/hooks";
import {
  fecthCreateOperator,
  getBranchs,
  getEmployList,
} from "../action/addOperatorAction";
import { adminSlice } from "../action/addOperatorSlice";
import { IOperator, ITicketForGetIdBranch } from "../action/type";
import "./Add.scss";

const AddOperator = () => {
  const {
    employList,
    branchsID,
    success,
    selectedValueBranch,
    selectedValueUser,
  } = useAppSelector((state) => state.adminSlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const navigateToEmployList = () => navigate("/employees/list");

  useEffect(() => {
    console.log(success);
    if (success) {
      navigateToEmployList();
    }
  }, [success]);

  useEffect(() => {
    const getEmployListsAndSet = async () => {
      await dispatch(getEmployList());
    };
    const getBranchsListsAndSet = async () => {
      await dispatch(getBranchs());
    };
    getEmployListsAndSet();
    getBranchsListsAndSet();
  }, []);

  const { selectedValueBranchIdoforRole, selectedValueQueueIdForRole } =
    adminSlice.actions;

  const branchBank = branchsID.map((branch: ITicketForGetIdBranch) => ({
    id: branch.id,
    name: branch.name,
  }));

  const users = employList.flatMap((user) =>
    user.map((userInfo) => ({
      id: userInfo.id,
      name: userInfo.first_name,
      position: userInfo.position,
    }))
  );

  const filteredPosition = users.filter((user) => user.position !== "operator");
  // console.log("filteredPosition", filteredPosition);

  const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    dispatch(selectedValueBranchIdoforRole(selectedId));
    dispatch(selectedValueQueueIdForRole(null));
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    dispatch(selectedValueQueueIdForRole(selectedId));
    console.log("This is id:", selectedId);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedValueBranch && selectedValueUser) {
      // Создаю объект с данными для отправки на сервер
      const data: IOperator = {
        user_id: Number(selectedValueUser),
        branch_id: Number(selectedValueBranch),
        is_available: true,
      };
      dispatch(fecthCreateOperator(data))
        .then(() => {
          console.log("Успешно отправлен POST-запрос");
        })
        .catch((error) => {
          console.error("Ошибка при отправке POST-запроса", error);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="branchSelect">Выберите отделение:</label>
        <select id="branchSelect" onChange={handleBranchChange}>
          <option value="">Выберите отделение</option>
          {branchBank &&
            branchBank.map((branch, index) => (
              <option key={index} value={branch.id}>
                {branch.name}
              </option>
            ))}
        </select>

        <label htmlFor="queueSelect">Выберите Оператора</label>
        <select id="queueSelect" onChange={handleUserChange}>
          <option value="">Выберите очередь</option>
          {filteredPosition?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <button type="submit">Отправить POST-запрос</button>
      </form>
    </div>
  );
};

export default AddOperator;
