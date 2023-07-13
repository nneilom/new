import { useNavigate } from "react-router";
import "./ServicesJuraPage.scss";
import {
  generateTicketInTerminal,
  getJuraServices,
} from "../TerminalCreators";
import { useEffect } from "react";
import logo from "../../Shared/assets/rsk-logo.svg";
import { useAppDispatch, useAppSelector } from "../../Shared/hooks";
import ButtonUI from "../../Shared/UI/ButtonUI/ButtonUI";

const ServicesJuraPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { juraServices } = useAppSelector(
    (state) => state.terminalReducer
  );
  // const { language } = useAppSelector(
  //   (state) => state.terminalReducer
  // );

  useEffect(() => {
    dispatch(getJuraServices());
  }, []);

  return (
    <div className="servicesPage">
      <div className="servicesPage__header">
        <img src={logo} alt="logo" />
      </div>
      <div className="servicesPage__container">
        <div className="servicesPage__wrapper">
          <h2>Выберите интересующую вас услугу</h2>
          {juraServices.map((service) => (
            <ButtonUI
              onClick={() => {
                dispatch(generateTicketInTerminal(service.id));
                navigate("/show-ticket-page");
              }}
              key={service.id}
            >
              {service.name}
            </ButtonUI>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesJuraPage;
