import { useSearchParams } from "react-router-dom";

function Result() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("success"));
  return <></>;
}

export default Result;
