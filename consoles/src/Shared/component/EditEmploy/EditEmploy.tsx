import "./EditEmploy.scss";

const EditEmploy = () => {
  const inputs = [
    {
      id: "name",
      label: "ФИО",
    },
    {
      id: "username",
      label: "Имя пользователя",
    },
    {
      id: "position",
      label: "Должность",
    },
    {
      id: "window",
      label: "Номер окна",
    },
    {
      id: "additional",
      label: "Примечание",
    },
    {
      id: "password",
      label: "Пароль",
    },
  ];
  return (
    <div className="editEmploy">
      <div className="editEmploy__wrapper">
        <div className="editEmploy__header">
          <h4>Редактировать профиль </h4>
        </div>
        <div className="editEmploy__form">
          <div>
            <label htmlFor="name">ФИО</label>
            <input id="name" type="text" />
          </div>

          {inputs.map((input) => (
            <div key={input.id}>
              <label htmlFor={input.id}>{input.label}</label>
              <input id={input.id} type="text" />
            </div>
          ))}

          <label htmlFor="permission">Уровеь доступа</label>
          <input id="permission" type="text" />

          <button>сохранить</button>
        </div>
      </div>
    </div>
  );
};

export default EditEmploy;
