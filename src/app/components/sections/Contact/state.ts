export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

export const initialState: ContactFormState = {
  status: 'idle',
  message: '',
};
