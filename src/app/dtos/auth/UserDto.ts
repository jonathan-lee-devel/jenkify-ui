export interface UserDto {
  email: string;
  firstName: string;
  lastName: string;
}

export const initialUserDto: UserDto = {
  email: '',
  firstName: '',
  lastName: '',
};
