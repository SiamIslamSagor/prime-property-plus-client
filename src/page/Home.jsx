import SectionTitle from "../components/utilitiesComponets/SectionTitle/SectionTitle";

const Home = () => {
  return (
    <div className="bg-green-200">
      <div className="">
        <SectionTitle heading={"hero section"}></SectionTitle>
      </div>
      <button className="btn btn-primary">btn</button>
      <div className="min-h-screen "></div>
    </div>
  );
};

export default Home;
