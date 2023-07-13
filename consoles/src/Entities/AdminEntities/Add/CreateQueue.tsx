import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../Shared/store/hooks";
import "./Add.scss";
import { useEffect, useState } from "react";

import { addRegistratorSlice } from "../action/addRegistrator/addRegistratorSlice";
import { ITicketForGetIdBranch } from "../action/type";
import { ICreateQueue } from "../action/createQueue/type";
import { createQueueSlice } from "../action/createQueue/createQueueSlice";

import {
  adminCreateQueue,
  getBranchsAdmin,
} from "../action/createQueue/createQueueAction";

const CreateQueue = () => {
  const { queueCreate, branchsID, success, selectedValueBranch } =
    useAppSelector((state) => state.createQueueSlice);

  const { setInputsCreateQueue, selectedValueBranchAdmin } =
    createQueueSlice.actions;

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
    const getBranchsListsAndSet = async () => {
      await dispatch(getBranchsAdmin());
    };
    getBranchsListsAndSet();
  }, []);

  const branchBank = branchsID.map((branch: ITicketForGetIdBranch) => ({
    id: branch.id,
    name: branch.name,
  }));

  const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    dispatch(selectedValueBranchAdmin(selectedId));
  };
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedValueBranch) {
      const data: ICreateQueue = {
        branch: Number(selectedValueBranch),
        start_of_day: queueCreate[queueCreate.length - 1]?.start_of_day ?? "",
        end_of_day: queueCreate[queueCreate.length - 1]?.end_of_day ?? "",
        description: queueCreate[queueCreate.length - 1]?.description ?? "",
      };

      dispatch(setInputsCreateQueue(data));
      try {
        await dispatch(adminCreateQueue(data));
        console.log("Успешно отправлен POST-запрос");
      } catch (error) {
        console.error("Ошибка при отправке POST-запроса", error);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(`Input "${name}" value: ${value}`);
    const payload: ICreateQueue = {
      branch: Number(selectedValueBranch),
      start_of_day:
        name === "start_of_day"
          ? value
          : queueCreate[queueCreate.length - 1]?.start_of_day ?? "",
      end_of_day:
        name === "end_of_day"
          ? value
          : queueCreate[queueCreate.length - 1]?.end_of_day ?? "",
      description:
        name === "description"
          ? value
          : queueCreate[queueCreate.length - 1]?.description ?? "",
    };
    dispatch(setInputsCreateQueue(payload));
  };

  return (
    <div className="add-registrator">
      <form onSubmit={handleFormSubmit}>
        <div className="input_box">
          <input
            type="text"
            placeholder="Начало старта"
            name="start_of_day"
            onChange={handleInputChange}
          />

          <input
            placeholder="Введите конец"
            type="text"
            name="end_of_day"
            onChange={handleInputChange}
          />

          <input
            placeholder="Описание"
            name="description"
            onChange={handleInputChange}
          />
        </div>
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
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default CreateQueue;
