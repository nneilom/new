import banner from "../Shared/assets/banner.png";
import bannerSmall from "../Shared/assets/smallBanner.png";

const BannerComponent = () => {
  return (
    <>
      <img
        src={banner}
        alt="banner"
        style={{ paddingBottom: "30px" }}
      />
      <img src={bannerSmall} alt="small banner" />
    </>
  );
};

export default BannerComponent;
