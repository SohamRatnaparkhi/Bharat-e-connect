import React from "react";
import PrivateMeet from "../meeting/components/meet_type/PrivateMeet";
import PublicMeet from "../meeting/components/meet_type/PublicMeet";

const Page = () => {
  return <div>
    <PrivateMeet />
    <hr />
    <br />
    <PublicMeet />
  </div>;
};

export default Page;
