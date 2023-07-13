import { useNavigate } from "react-router";
import "./EntitiesPage.scss";
import { terminalSlice } from "../TerminalSlice";
import logo from "../../Shared/assets/rsk-logo.svg";
import lang from "../../Shared/assets/lang.svg";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Shared/hooks";
import ButtonUI from "../../Shared/UI/ButtonUI/ButtonUI";

const EntitiesPage = () => {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector(
    (state) => state.terminalReducer
  );
  const navigate = useNavigate();
  const [openLangModal, setOpenLangModal] = useState<boolean>(false);
  const whichLanguage = (ru: string, kg: string, en: string) => {
    if (language === "kg") {
      return kg;
    } else if (language === "en") {
      return en;
    } else {
      return ru;
    }
  };
  return (
    <div className="entitiesPage">
      <div className="entitiesPage__header">
        <img src={logo} alt="logo" />
        <div className="entitiesPage__language">
          <div
            onClick={() => setOpenLangModal(!openLangModal)}
            className="language__header"
          >
            <img src={lang} alt="lang" />
            <span>{whichLanguage("Рус", "Кырг", "Eng")}</span>
          </div>
          {openLangModal ? (
            <div className="language__wrapper">
              <span
                onClick={() => {
                  dispatch(terminalSlice.actions.setLanguage("ru"));
                  setOpenLangModal(false);
                }}
              >
                Русский
              </span>
              <span
                onClick={() => {
                  dispatch(terminalSlice.actions.setLanguage("kg"));
                  setOpenLangModal(false);
                }}
              >
                Кыргызча
              </span>
              <span
                onClick={() => {
                  dispatch(terminalSlice.actions.setLanguage("en"));
                  setOpenLangModal(false);
                }}
              >
                English
              </span>
            </div>
          ) : null}
        </div>
      </div>
      <div className="entitiesPage__container">
        <div className="entitiesPage__wrapper">
          <h2>
            {whichLanguage(
              "Добро пожаловать",
              "Кош келиңиздер",
              "Welcome"
            )}
          </h2>
          <ButtonUI
            onClick={() => {
              navigate("/services-jura-page");
            }}
          >
            {whichLanguage(
              "Юридическое лицо",
              "Юридикалык жак",
              "Juridical person"
            )}
          </ButtonUI>
          <ButtonUI
            onClick={() => {
              navigate("/services-physic-page");
            }}
          >
            {whichLanguage(
              "Физическое лицо",
              "Жеке жак",
              "Physical person"
            )}
          </ButtonUI>
          <ButtonUI
            onClick={() => {
              navigate("/pre-entry-page");
            }}
          >
            {whichLanguage(
              "Предварительня запись",
              "Алдын ала жазылуу",
              "Preregistration"
            )}
          </ButtonUI>
        </div>
      </div>
    </div>
  );
};

export default EntitiesPage;
