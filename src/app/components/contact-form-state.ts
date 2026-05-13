export type ContactFormState = {
  message: string;
  status: 'idle' | 'success' | 'error';
};

export const initialContactFormState: ContactFormState = {
  message: '',
  status: 'idle',
};
