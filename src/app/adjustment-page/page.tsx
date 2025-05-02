"use client"; // Add this line to mark the file as a client component

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AdjustmentTemplate from "@/components/templates/AdjustmentTemplate";
import MainLayout from "@/components/layouts/MainLayout";

export default function AdjustmentPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AdjustmentContent />
    </Suspense>
  );
}

const AdjustmentContent = () => {
  return (
    <MainLayout>
      <AdjustmentTemplate />
    </MainLayout>
  );
};
