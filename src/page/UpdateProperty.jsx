import { useParams } from "react-router-dom";

const UpdateProperty = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h1 className="text-4xl text-center font-bold">UpdateProperty</h1>
    </div>
  );
};

export default UpdateProperty;
