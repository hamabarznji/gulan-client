import React from "react";
import PurchasedOrdersTable from "../../../../src/components/items/purchasedOrders/purchasedOrdersTable";

import redirectUnauthorizedToLogin from "../../../../src/utils/Redirect";
export const getServerSideProps = redirectUnauthorizedToLogin;

const Purchased = () => {
  return (
    <>
    
      <PurchasedOrdersTable />
    </>
  );
};

export default Purchased;
