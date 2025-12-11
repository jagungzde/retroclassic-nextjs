import { Suspense } from "react";
import ResetPasswordComponent from "./resetPasswordComponent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading activation...</div>}>
      <ResetPasswordComponent />
    </Suspense>
  );
}