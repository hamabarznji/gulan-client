import * as React from "react";
import UsersTable from "../src/components/user/UsersTable";
import isCurrentUserAllowed from "../src/utils/Redirect";

export const getServerSideProps = isCurrentUserAllowed;

const Users = () => {
  return <UsersTable />;
};
export default Users;
