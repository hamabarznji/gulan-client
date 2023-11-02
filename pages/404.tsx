import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Custom404: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <h1
      style={{
        fontSize: "2em",
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      404 - Page Not Found
    </h1>
  );
};

export default Custom404;
