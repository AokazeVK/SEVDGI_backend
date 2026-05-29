import { UserEntity } from '../entities/user.entity';

export const USERS_REPOSITORY = Symbol('USERS_REPOSITORY');

export interface CreateUserData {
  username: string;
  email: string;
  fullName: string;
  passwordHash: string;
  roleIds?: string[];
}

export interface UpdateUserData {
  username?: string;
  email?: string;
  fullName?: string;
  roleIds?: string[];
}

export interface UsersRepository {
  findAll(): Promise<UserEntity[]>;
  findById(id: string): Promise<UserEntity | null>;
  findByUsername(username: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;

  create(data: CreateUserData): Promise<UserEntity>;
  update(id: string, data: UpdateUserData): Promise<UserEntity>;
  toggle(id: string): Promise<UserEntity>;
}
