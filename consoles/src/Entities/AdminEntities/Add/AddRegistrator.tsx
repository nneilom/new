import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../Shared/store/hooks";
import "./Add.scss";
import { useEffect } from "react";
import {
  fecthCreateRegistrator,
  getBranchsAll,
  getEmployListAll,
} from "../action/addRegistrator/addRegistratorAction";
import { addRegistratorSlice } from "../action/addRegistrator/addRegistratorSlice";
import { ITicketForGetIdBranch } from "../action/type";
import { IRegistrator } from "../action/addRegistrator/type";

const AddRegistrator = () => {
  const {
    employList,
    branchsID,
    success,
    selectedValueBranch,
    selectedValueUser,
  } = useAppSelector((state) => state.addRegistratorSlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const navigateToEmployList = () => navigate("/admin-page/registrator-list");

  useEffect(() => {
    console.log(success);
    if (success) {
      navigateToEmployList();
    }
  }, [success]);

  useEffect(() => {
    const getEmployListsAndSet = async () => {
      await dispatch(getEmployListAll());
    };
    const getBranchsListsAndSet = async () => {
      await dispatch(getBranchsAll());
    };
    getEmployListsAndSet();
    getBranchsListsAndSet();
  }, []);

  const { selectedValueBranchIdoforRole, selectedValueQueueIdForRole } =
    addRegistratorSlice.actions;

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

  const filteredPosition = users.filter(
    (user) => user.position !== "registrator"
  );
  console.log("ghjbk", filteredPosition);

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

  const handleFormSubmitRegistrator = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (selectedValueBranch && selectedValueUser) {
      // Создаю объект с данными для отправки на сервер
      const data: IRegistrator = {
        user_id: Number(selectedValueUser),
        branch_id: Number(selectedValueBranch),
        is_available: true,
      };
      dispatch(fecthCreateRegistrator(data))
        .then(() => {
          console.log("Успешно отправлен POST-запрос");
        })
        .catch((error) => {
          console.error("Ошибка при отправке POST-запроса", error);
        });
    }
  };

  return (
    <div className="add-registrator">
      <form onSubmit={handleFormSubmitRegistrator}>
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
        <label htmlFor="queueSelect">Выберите Регистратора</label>
        <select id="queueSelect" onChange={handleUserChange}>
          <option value="">Выберите очередь</option>
          {filteredPosition?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="submit">Добавить fhgjbkn</button>
      </form>
    </div>
  );
};

export default AddRegistrator;
