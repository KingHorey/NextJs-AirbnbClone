import PaystackPop from "@paystack/inline-js";

import { useEffect, useState } from "react";

const PaymentPage = () => {
  useEffect(() => {
    let paystack = PaystackPop.setup({
      key: "pk_domain_xxxxxxxxxx",

      email: "example@email.com",

      amount: 10000,
    });

    paystack.openIframe();
  }, []);
  return <div></div>;
};

export default PaymentPage;
