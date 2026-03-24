import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { FetchFn, User, UserRepository, UserService } from "../service";

describe("UserService", () => {
  let userService: UserService;
  let repo: jest.Mocked<UserRepository>;
  let fetchFn: jest.MockedFunction<FetchFn>;

  beforeEach(() => {
    repo = {
      findById: jest.fn(),
      create: jest.fn(),
    };
    fetchFn = jest.fn();
    userService = new UserService(repo, fetchFn);
    jest.clearAllMocks();
  });

  describe("getUserById", () => {
    test("returns user when found", async () => {
      const mockUser = { id: 1, name: "Alice", email: "alice@exmaple.com" };
      repo.findById.mockResolvedValue(mockUser);

      const result = await userService.getUserById(1);

      expect(result).toEqual(mockUser);
      expect(repo.findById).toHaveBeenCalledWith(1);
    });

    test("returns null when user not found", async () => {
      repo.findById.mockResolvedValue(null);

      const result = await userService.getUserById(999);

      expect(result).toBeNull();
    });
  });

  describe("createUser", () => {
    test("creates user successfully", async () => {
      const mockUser = { id: 1, name: "Bob", email: "bob@example.com" };
      repo.create.mockResolvedValue(mockUser);

      const result = await userService.createUser("Bob", "bob@example.com");

      expect(result).toEqual(mockUser);
      expect(repo.create).toHaveBeenCalledWith({
        name: "Bob",
        email: "bob@example.com",
      });
    });
  });

  describe("fetchUserFromApi", () => {
    test("fetches user from API successfully", async () => {
      const mockUser = { id: 1, name: "Charlie", email: "charlie@example.com" };
      fetchFn.mockResolvedValue({
        ok: true,
        json: async () => mockUser,
      });

      const resullt = await userService.fetchUserFromAPI("1");

      expect(resullt).toEqual(mockUser);
      expect(fetchFn).toHaveBeenCalledWith("https://api.example.com/users/1");
    });

    test("throw error when API fails", async () => {
      fetchFn.mockResolvedValue({
        ok: false,
        json: jest.fn<() => Promise<User>>().mockResolvedValue({} as User),
      });

      await expect(userService.fetchUserFromAPI("1")).rejects.toThrow(
        "Failed to fetch user",
      );
    });
  });
});
