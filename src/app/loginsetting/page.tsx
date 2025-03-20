import React, { Suspense } from "react";
import LoginSetting from "@/components/loginSetting";

const LoginSettingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginSetting />
    </Suspense>
  );
};

export default LoginSettingPage;

