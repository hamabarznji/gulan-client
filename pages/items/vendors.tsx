import React from "react";
import VendorsTable from "../../src/components/items/vendor/VendorsTable";
import redirectUnauthorizedToLogin from "../../src/utils/Redirect";

export const getServerSideProps = redirectUnauthorizedToLogin;

const Vendors = () => {
  return (
    <VendorsTable />

  );
};

export default Vendors;
