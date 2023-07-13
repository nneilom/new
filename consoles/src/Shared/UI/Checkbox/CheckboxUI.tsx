import { GoCheck } from "react-icons/go";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import "./CheckboxUI.scss";


const CheckboxUI = () => {
  const [checkbox, setCheckbox] = useState<string>(
    "checkbox-default"
  );

  const checkboxFunc = () => {
    if (checkbox === "checkbox-default") {
      setCheckbox("checkbox-selected");
    } else if (checkbox === "checkbox-selected") {
      setCheckbox("checkbox-excluded");
    } else {
      setCheckbox("checkbox-default");
    }
  };

  return (
    <div
      onClick={checkboxFunc}
      className={["checkbox", checkbox].join(" ")}
    >
      {checkbox === "checkbox-selected" ? (
        <GoCheck style={{ color: "white" }} />
      ) : checkbox === "checkbox-excluded" ? (
        <GoPlus className="goplus" />
      ) : null}
    </div>
  );
};

export default CheckboxUI;