export class User {
  id: string;
  name: string;
  username: string;
  password: string;
  profilePicture?: string;
  createdAt?: string;

  constructor(
    id: string = '',
    name: string = '',
    username: string = '',
    password: string = '',
    profilePicture: string = '',
    createdAt: string = ''
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.profilePicture = profilePicture;
    this.createdAt = createdAt;
  }
}
