import React from "react";
import Table from "../../customComponents/Table";
import SellOrderServiceInstance from "../../../../services/SellOrderService";
import { useQuery, QueryKey } from "@tanstack/react-query";
import CustomButton from "../../customComponents/Button";
import { useRouter } from "next/router";
import moment from "moment";

const SELLORDERS: QueryKey = ["expenseCategories"];

const columns = [
  { id: "index", label: "#", align: "center" },
  { id: "createdBy", label: "Created By", align: "center" },
  { id: "createdAt", label: "Created At", align: "center" },
  { id: "updatedAt", label: "Updated At", align: "center" },
  { id: "actions", label: "Action", align: "center" },
];

const InvoiceTable: React.FC = () => {
  const router = useRouter();

  const getSellOrders = async () => {
    try {
      return SellOrderServiceInstance.getSellOrders();
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  };

  const { data } = useQuery(SELLORDERS, getSellOrders);
console.log(data);
  const rows = data?.map((row: any, index: number) => ({
    ...row,
    createdAt:moment(row.createdAt).format("DD/MM/YYYY HH:mm"),
    updatedAt:moment(row.updatedAt).format("DD/MM/YYYY HH:mm"),
    actions: (
      <CustomButton
        title="View"
        onClick={() => {
          router.push(`/invoices/sell/${row.id}`);
        }}
      />
    ),
  }));

  return (
      <Table rows={rows || []} columns={columns} />
  );
};

export default InvoiceTable;
