import { useState } from 'react';
import type { ContactFormValues, ContactFormErrors } from './contact.types';
import { validateContactForm } from './contactValidation';

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(field: keyof ContactFormValues, value: string) {
    setValues(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors = validateContactForm(values);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function reset() {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }

  return { values, errors, isSubmitting, setIsSubmitting, handleChange, validate, reset };
}
