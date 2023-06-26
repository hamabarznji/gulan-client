import React from "react";
import { useQuery, QueryKey } from "@tanstack/react-query";
import UserServiceInstance from "../../../services/user";
import UsersTable from "../customComponents/Table";
import { Grid } from "@mui/material";
import UpdateUser from "./UpdateUser";
import AddUser from "./AddUser";

const queryKey: QueryKey = ["users"];

interface UserData {
  id: string;
  name: string;
  role: string;
  password: string;
  themeColor: boolean;
}
interface UserResponse {
  data: UserData[];
}

export default function CustomizedTables() {
  const fetchUsers = async () => {
    try {
      const response = await UserServiceInstance.getUsers();
      return (response as UserResponse).data;
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  };

  const { data, refetch } = useQuery(queryKey, fetchUsers);

  const transformedRows = data?.map((user: any, index: number) => ({
    id: index + 1,
    longId: user.id,
    username: user.name,
    role: user.role,
    actions: <UpdateUser user={user} reFetchUsers={refetch} />,
  }));

  return (
    <Grid container justifyContent="flex-start" spacing={3} direction="row">
      <Grid item container justifyContent="flex-start">
        <AddUser reFetchUsers={refetch} />
      </Grid>

      <Grid item container direction="row" justifyContent="center">
        <UsersTable
          isPagination={false}
          rows={transformedRows || []}
          columns={columns}
        />
      </Grid>
    </Grid>
  );
}
const columns = [
  { id: "id", label: "ID", align: "center" },
  { id: "username", label: "Name", align: "center" },
  { id: "role", label: "Role", align: "center" },
  { id: "actions", label: "Actions", align: "center" },
];
