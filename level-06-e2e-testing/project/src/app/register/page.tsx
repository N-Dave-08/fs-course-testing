"use client";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful registration
    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
}
