import express from "express";

type User = { id: number; name: string; email: string };

const app = express();
app.use(express.json());

let users: User[] = [];
let nextId = 1;

app.get("/api/users", (_req, res) => {
  res.json({ success: true, data: users });
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body ?? {};
  if (!name || !email)
    return res.status(400).json({ success: false, error: "Invalid Input" });

  const user: User = { id: nextId++, name, email };
  users.push(user);
  res.status(201).json({ success: true, data: user });
});

app.post("/api/auth/login", (_req, res) => {
  res.json({ success: true, data: { token: "test-token" } });
});

app.get("/api/users/me", (req, res) => {
  const auth = String(req.header("Authorization") ?? "");
  if (!auth.startsWith("Bearer ")) return res.sendStatus(401);
  const token = auth.replace("Bearer ", "");
  if (token !== "test-token") return res.sendStatus(401);
  return res.json({
    success: true,
    data: { id: 1, email: "user@example.com", name: "User" },
  });
});

export function resetTestState() {
  users = [];
  nextId = 1;
}

export default app;
