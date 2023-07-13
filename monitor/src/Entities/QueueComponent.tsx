// import classes from "../../Pages/MonitorPage/MonitorComponents.module.scss";

// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../store/hooks";
// import { IQueueCallTicket } from "../../Entities/MonitorQueue/type";

// interface QueueComponentProps {
//   ticketsCalledFromQueue: IQueueCallTicket[];
// }

// const QueueComponent: React.FC<QueueComponentProps> = ({
//   ticketsCalledFromQueue,
// }) => {
//   const dispatch = useAppDispatch();
//   useEffect(() => {
//     console.log(ticketsCalledFromQueue);
//   }, [ticketsCalledFromQueue]);

//   console.log("тут должны быть билеты", ticketsCalledFromQueue);

//   useEffect(() => {
//     showTickets();
//   }, [ticketsCalledFromQueue]);

//   const showTickets = () => {
//     {
//       return (
//         ticketsCalledFromQueue &&
//         ticketsCalledFromQueue.map((ticket, index) => (
//           <div
//             key={ticket.id}
//             className={`${classes.queueColumn} ${
//               index % 2 === 0 ? classes.whiteBackground : classes.grayBackground
//             }`}
//           >
//             <div className={classes.client}>
//               <div>{ticket.ticket_number}</div>
//             </div>
//             <div className={classes.window}>
//               <div>{ticket.operator?.window_number}</div>
//             </div>
//           </div>
//         ))
//       );
//     }
//   };

//   return (
//     <div className={classes.queueBox}>
//       <div className={classes.textQueue}>
//         {showTickets()}
//         <span>Клиент</span>
//         <span>Окно</span>
//       </div>
//     </div>
//   );
// };

// export default QueueComponent;
