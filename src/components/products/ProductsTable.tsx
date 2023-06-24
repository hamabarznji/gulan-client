import React from 'react';
import Table from '../../components/customComponents/Table';



const rows = [
  { id: 1, name: 'T-Shirt', qty: 5, color: 'Red', size: 'Medium' },
  { id: 2, name: 'Jeans', qty: 10, color: 'Blue', size: 'Large' },
  { id: 3, name: 'Dress', qty: 3, color: 'Green', size: 'Small' },
  { id: 4, name: 'Hoodie', qty: 8, color: 'Black', size: 'Large' },
  { id: 5, name: 'Skirt', qty: 2, color: 'Pink', size: 'Medium' },
  { id: 6, name: 'Sweater', qty: 6, color: 'Gray', size: 'Small' },
  { id: 7, name: 'Jacket', qty: 4, color: 'Brown', size: 'Large' },
  { id: 8, name: 'Blouse', qty: 7, color: 'White', size: 'Small' },
  { id: 9, name: 'Shorts', qty: 3, color: 'Yellow', size: 'Medium' },
  { id: 10, name: 'Coat', qty: 9, color: 'Navy', size: 'Large' },
  { id: 11, name: 'Pants', qty: 6, color: 'Beige', size: 'Medium' },
  { id: 12, name: 'Sweatshirt', qty: 4, color: 'Purple', size: 'Small' },
  { id: 13, name: 'Shirt', qty: 8, color: 'Orange', size: 'Large' },
  { id: 14, name: 'Leggings', qty: 5, color: 'Black', size: 'Medium' },
  { id: 15, name: 'Blazer', qty: 2, color: 'Gray', size: 'Small' },
  { id: 16, name: 'Top', qty: 3, color: 'Pink', size: 'Medium' },
  { id: 17, name: 'Sweatpants', qty: 6, color: 'Blue', size: 'Large' },
  { id: 18, name: 'Cardigan', qty: 7, color: 'Green', size: 'Small' },
  { id: 19, name: 'Dungarees', qty: 4, color: 'Denim', size: 'Medium' },
  { id: 20, name: 'Jumpsuit', qty: 3, color: 'Black', size: 'Large' },
  // Add more objects as needed
];


  const columns = [
    { id: 'id', label: 'ID', align: 'center' },
    { id: 'name', label: 'Name', align: 'center' },
    { id: 'qty', label: 'Quantity', align: 'center' },
    { id: 'color', label: 'Color', align: 'center' },
    { id: 'size', label: 'Size', align: 'center' },
    { id: 'actions', label: 'Action', align: 'center' },
  ];

const InvoiceTable: React.FC = () => {
  // Your component logic here

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
