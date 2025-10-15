'use server';

import { headers } from 'next/headers';

export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

export const initialState: ContactFormState = {
  status: 'idle',
  message: '',
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = (formData.get('name') as string | null)?.trim() ?? '';
  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const message = (formData.get('message') as string | null)?.trim() ?? '';
  const nickname = (formData.get('nickname') as string | null)?.trim() ?? '';

  if (nickname) {
    console.warn('Contact form spam attempt detected', {
      submittedAt: new Date().toISOString(),
      nickname,
      name,
      email,
    });

    return {
      status: 'success',
      message: 'Thank you. I will get back to you as soon as possible!',
    };
  }

  if (!name || !email || !message) {
    return {
      status: 'error',
      message: 'Please fill out all fields before submitting.',
    };
  }

  if (!emailRegex.test(email)) {
    return {
      status: 'error',
      message: 'Please enter a valid email address.',
    };
  }

  const headersList = headers();
  const userAgent = headersList.get('user-agent') ?? 'unknown';
  const ip = headersList.get('x-forwarded-for') ?? headersList.get('x-real-ip') ?? 'unknown';
  const referer = headersList.get('referer') ?? 'unknown';

  console.info('Contact form submission received', {
    submittedAt: new Date().toISOString(),
    name,
    email,
    message,
    metadata: {
      ip,
      userAgent,
      referer,
    },
  });

  return {
    status: 'success',
    message: 'Thank you. I will get back to you as soon as possible!',
  };
}
