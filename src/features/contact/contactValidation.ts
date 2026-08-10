import type { ContactFormValues, ContactFormErrors } from './contact.types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 1000;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.message.trim()) {
    errors.message = 'Message is required';
  } else if (values.message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer`;
  }

  return errors;
}

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email);
}
