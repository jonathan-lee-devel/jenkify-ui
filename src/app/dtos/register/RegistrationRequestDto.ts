export interface RegistrationRequestDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  isAcceptTermsAndConditions: boolean;
}
