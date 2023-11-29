import { Helmet } from "react-helmet-async";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import { Toaster } from "react-hot-toast";
import useAgentProperties from "../hooks/useAgentProperties";

const AgentAddedProperties = () => {
  // hooks
  const { agentPropertyInfo } = useAgentProperties();
  console.log(agentPropertyInfo);
  return (
    <div>
      <Helmet>
        <title>P P P | My Added Properties</title>
      </Helmet>

      <Toaster></Toaster>
      <div className="my-10 lg:my-20">
        <SectionTitle heading={"my added properties"}></SectionTitle>
      </div>
      <div></div>
    </div>
  );
};

export default AgentAddedProperties;
