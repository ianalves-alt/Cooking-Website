"use client";
import { useParams } from "next/navigation";
import Recepie from "@/comp/recepie";
export default function Recepiepage() {
  const params = useParams();
  const id = params.recepie;

  return (
    <>
      <Recepie id={id} />
    </>
  );
}
