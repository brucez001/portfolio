'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      className='bg-tertiary py-3 px-10 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary active:bg-tertiaryLight disabled:opacity-60 disabled:cursor-not-allowed'
      disabled={pending}
    >
      {pending ? 'Sending...' : 'Send'}
    </button>
  );
};
