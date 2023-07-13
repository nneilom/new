import { FC, useEffect } from "react";
import "./DropList.scss";
import { OperatorList } from "../../../Entities/OperatorEntities/TicketInfo/types";
import {
  operatorsListInBranch,
  ticketToAnotherOperator,
} from "../../../Entities/OperatorEntities/TicketInfo/ActionsWithTickets";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const DropList: FC<OperatorList> = ({ operatorList }) => {
  const dispatch = useAppDispatch();

  const { servingTicket } = useAppSelector(
    (state) => state.servingTicketReducer
  );

  useEffect(() => {
    dispatch(operatorsListInBranch());
  }, []);
  return (
    <div className="droplist">
      <div className="droplist__wrapper">
        {operatorList.map((operator) => (
          <span
            key={operator.operator_id}
            onClick={() =>
              dispatch(
                ticketToAnotherOperator(
                  servingTicket.id,
                  operator.operator_id,
                  operator.is_available,
                  operator.ticket_status
                )
              )
            }
          >
            {operator.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DropList;
