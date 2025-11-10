import React, { useContext, useEffect, useState } from "react";
import Container from "../Components/Container";
import useAxios from "../Hooks/useAxios";
import { AuthContext } from "../Provider/AuthContext";
import Table from "../Components/Table";

const MyContribution = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const [myContribution, setmyContribution] = useState([]);
  useEffect(() => {
    axiosInstance.get(`/contributions/?email=${user?.email}`).then((data) => {
      setmyContribution(data.data);
    });
  }, [user, axiosInstance]);
  console.log(myContribution);

  return (
    <Container>
      <h2 className="text-3xl font-bold my-8 px-2">
        My <span className="text-primary">Contributions</span>
      </h2>
      <Table myContribution={myContribution}></Table>
    </Container>
  );
};

export default MyContribution;
