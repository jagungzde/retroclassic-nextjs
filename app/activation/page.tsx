import { Suspense } from "react";
import ActivationComponent from "./components/ActivationComponent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading activation...</div>}>
      <ActivationComponent />
    </Suspense>
  );
}