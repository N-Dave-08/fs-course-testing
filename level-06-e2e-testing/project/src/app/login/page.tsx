"use client";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}
