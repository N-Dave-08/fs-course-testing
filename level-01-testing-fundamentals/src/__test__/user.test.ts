import { beforeEach } from "@jest/globals";
import { afterEach } from "@jest/globals";
import { describe } from "@jest/globals";
import { clearUsers, createUser, getAllUsers, getUsersById } from "../user";
import { test } from "@jest/globals";
import { expect } from "@jest/globals";

describe("User Management", () => {
  (beforeEach(() => {
    clearUsers();
  }),
    afterEach(() => {}));

  describe("createUser", () => {
    test("creates a user with correct properties", () => {
      const name = "alice";
      const email = "alice@example.com";

      const user = createUser(name, email);

      expect(user).toHaveProperty("id");
      expect(user.name).toBe(name);
      expect(user.email).toBe(email);
      expect(typeof user.id).toBe("number");
    });

    test("assigns unique IDs to users", () => {
      const user1 = createUser("Alice", "alice@example.com");
      const user2 = createUser("Bob", "bob@example.com");

      expect(user1.id).not.toBe(user2.id);
      expect(user2.id).toBe(user1.id + 1);
    });
  });

  describe("getUsersById", () => {
    test("return user when found", () => {
      const createdUser = createUser("Alice", "alice@example.com");
      const foundUser = getUsersById(createdUser.id);

      expect(foundUser).toBeDefined();
      expect(foundUser?.id).toBe(createdUser.id);
      expect(foundUser?.name).toBe("Alice");
    });
    test("returns undefined when user not found", () => {
      const user = getUsersById(999);

      expect(user).toBeUndefined();
    });
  });

  describe("getAllUsers", () => {
    test("returns empty array when no users", () => {
      const users = getAllUsers();
      expect(users).toEqual([]);
    });

    test("returns all users", () => {
      createUser("Alice", "alice@example.com");
      createUser("Bob", "bob@example.com");

      const users = getAllUsers();

      expect(users).toHaveLength(2);
      expect(users[0].name).toBe("Alice");
      expect(users[1].name).toBe("Bob");
    });
  });
});
