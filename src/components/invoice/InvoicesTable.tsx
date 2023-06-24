import React from "react";
import Table from "../../components/customComponents/Table";

const rows = Array.from(Array(50), (_, index) => ({
  id: index + 1,
  name: `Person ${index + 1}`,
  age: Math.floor(Math.random() * 50) + 20,
  email: `person${index + 1}@example.com`,
}));

const columns = [
  { id: "id", label: "ID", align: "center" },
  { id: "name", label: "Name", align: "center" },
  { id: "age", label: "Age", align: "center" },
  { id: "email", label: "Email", align: "center" },
  { id: "actions", label: "Action", align: "center" },
];

const InvoiceTable: React.FC = () => {
  // Your component logic here

  return (
    <>
      <Table rows={rows} columns={columns} />
    </>
  );
};

export default InvoiceTable;
