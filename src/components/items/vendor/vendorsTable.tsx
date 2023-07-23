import React, { useState } from 'react';
import Table from '../../customComponents/Table';
import VendorService from '../../../../services/VendorService';
import { useQuery, QueryKey } from "@tanstack/react-query";
const queryKey: QueryKey = ["items"];
  const columns = [
    { id: 'index', label: '#', align: 'center' },
    { id: 'name', label: 'Vendor Name', align: 'center' },
  
  ];

const InvoiceTable: React.FC = () => {

  const fetchItems = async () => {
    try {
      const response = await VendorService.getVendors();
      return response
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  };
  const { data, refetch } = useQuery(queryKey, fetchItems);
const rows=data?.map((item:any,index:any)=>{
  return {
    ...item,
    index:index+1,
    name:item.name,
  
  }
})
  return (
    <>
      <Table 
        rows={rows||[]}
        columns={columns}
      
      />
    </>
  );
}

export default InvoiceTable;
