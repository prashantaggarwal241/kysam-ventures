export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;
