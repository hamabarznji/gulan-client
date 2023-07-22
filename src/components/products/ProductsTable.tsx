import React, { useState } from 'react';
import Table from '../../components/customComponents/Table';
import ItemsServiceInstance from '../../../services/ItemService';
import { useQuery, QueryKey } from "@tanstack/react-query";
const queryKey: QueryKey = ["items"];
  const columns = [
    { id: 'index', label: '#', align: 'center' },
    { id: 'name', label: 'Name', align: 'center' },
    { id: 'qty', label: 'Quantity', align: 'center' },
    { id: 'price', label: 'Price', align: 'center' },
    { id: 'color', label: 'Color', align: 'center' },
    { id: 'size', label: 'Size', align: 'center' },
    { id: 'categoryName', label: 'Category', align: 'center' },
    { id: 'actions', label: 'Action', align: 'center' },
  ];

const InvoiceTable: React.FC = () => {

  const fetchItems = async () => {
    try {
      const response = await ItemsServiceInstance.getItems();
      return response
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  };
  const { data, refetch } = useQuery(queryKey, fetchItems);
const rows=data.map((item:any,index:any)=>{
  return {
    ...item,
    index:index+1,
    name:item.itemName,
    price:item.price,
    code:item.itemCode,
    color:item.itemColor,
    size:item.itemSize,
    categoryName:item.categoryName,

  }
})
  return (
    <>
      <Table 
        rows={rows}
        columns={columns}
      
      />
    </>
  );
}

export default InvoiceTable;
