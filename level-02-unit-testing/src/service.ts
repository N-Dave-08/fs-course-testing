export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserRepository {
  findById: (id: number) => Promise<User | null>;
  create: (data: Omit<User, "id">) => Promise<User>;
}

export type FetchFn = (
  url: string,
) => Promise<{ ok: boolean; json: () => Promise<User> }>;

export class UserService {
  constructor(
    private repo: UserRepository,
    private fetchFn: FetchFn,
  ) {}

  async getUserById(id: number): Promise<User | null> {
    return this.repo.findById(id);
  }

  async createUser(name: string, email: string): Promise<User | null> {
    return this.repo.create({ name, email });
  }

  async fetchUserFromAPI(userId: string): Promise<User> {
    const response = await this.fetchFn(
      `https://api.example.com/users/${userId}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    return response.json();
  }
}
