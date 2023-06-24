import * as React from "react";

import { useQuery, QueryKey } from "@tanstack/react-query";
import UserServiceInstance from "../../../services/user";
import UsersTable from "../customComponents/Table";



const columns:any[] = [
  { id: "id", label: "ID", align: "center" },
  { id: "name", label: "Name", align: "center" },
  { id: "role", label: "Role", align: "center" },
];

const rows:any[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Admin",
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "User",
  },
];
const queryKey: QueryKey = ["users"];

export default function CustomizedTables() {
  const fetchUsers = async () => {
    try {
      return await UserServiceInstance.getUsers();
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  };

  const { data: users } = useQuery(queryKey, fetchUsers);

  return <UsersTable rows={rows} columns={columns} />;
}
