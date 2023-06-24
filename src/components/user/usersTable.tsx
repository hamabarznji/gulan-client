import React from "react";
import { useQuery, QueryKey } from "@tanstack/react-query";
import UserServiceInstance from "../../../services/user";
import UsersTable from "../customComponents/Table";
import Modal from "../customComponents/Modal";

const columns = [
  { id: "id", label: "ID", align: "center" },
  { id: "name", label: "Name", align: "center" },
  { id: "role", label: "Role", align: "center" },
  { id: "actions", label: "Actions", align: "center" },
];

const queryKey: QueryKey = ["users"];

export default function CustomizedTables() {
  const fetchUsers = async () => {
    try {
      const response = await UserServiceInstance.getUsers();
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  };

  const { data } = useQuery(queryKey, fetchUsers);

  const transformedRows = data?.map((user: any, index: number) => ({
    id: index + 1,
    longId: user.id,
    name: user.name,
    role: user.role,
    actions: (
      <Modal
        processTitle="Update User"
        modalTitle="Update User"
        modalType={false}
      />
    ),
  }));

  return (
    <UsersTable
      isPagination={false}
      rows={transformedRows || []}
      columns={columns}
    />
  );
}
