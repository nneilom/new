import comingSoon from "../../Shared/assets/work-in-progress.png";

const NotFoundPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <img
        style={{
          position: "fixed",
        }}
        src={comingSoon}
        alt="error"
      />
    </div>
  );
};

export default NotFoundPage;
