import { UserEntity } from "../entity/userEntity";

export interface UserDTO {
  id: string;
  email: string;
  createdAt: Date;
}

export class UserMapper {
  static toDTO(entity: UserEntity): UserDTO {
    return {
      id: entity.id,
      email: entity.email,
      createdAt: entity.createdAt,
    };
  }
}
