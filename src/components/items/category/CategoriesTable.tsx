import React from 'react';
import Table from '../../customComponents/Table';
import ItemCategoryService from '../../../../services/ItemCategoryService';
import { useQuery, QueryKey } from "@tanstack/react-query";
import { Grid } from '@mui/material';
import AddCategory from './AddCategory';
import UpdateCategory from './UpdateCategory';
const queryKey: QueryKey = ["items"];
  const columns = [
    { id: 'index', label: '#', align: 'center' },
    { id: 'name', label: 'Category Name', align: 'center' },
    { id: "actions", label: "Actions", align: "center" },

  ];

const CategoriesTable: React.FC = () => {

  const fetchItems = async () => {
    try {
      const response = await ItemCategoryService.getItemCategories();
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
    actions: <UpdateCategory category={item} reFetchCategories={refetch} />,
    

  }
})
  return (
    <>
      


<Grid container justifyContent="flex-start" spacing={2} direction="row">
      <Grid item container justifyContent="flex-start">
      <AddCategory
      reFetchCategories={refetch}
       
    
      />
      </Grid>

      <Grid item container direction="row" justifyContent="center">
      <Table 
        rows={rows||[]}
        columns={columns}
      
      />      </Grid>
    </Grid>
    </>
  );
}

export default CategoriesTable;
