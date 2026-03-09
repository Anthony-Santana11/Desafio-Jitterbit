interface UserProps {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
}

export class UserEntity {
  readonly id: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt: Date;

  private constructor(props: UserProps) {
    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt;
  }

  static create(props: Omit<UserProps, "createdAt"> & { createdAt?: Date }): UserEntity {
    return new UserEntity({
      id: props.id,
      email: props.email,
      password: props.password,
      createdAt: props.createdAt ?? new Date(),
    });
  }

  static reconstitute(props: UserProps): UserEntity {
    return new UserEntity(props);
  }
}
