import Image from "next/image";
import Link from "next/link";
import SuccessButton from "./components/button";

export default function Home() {
  return (
    <div>
      This is E2E testing
      <Link href={"/about"}>Go to about page</Link>
      <SuccessButton />
    </div>
  );
}
