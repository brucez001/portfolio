'use server';

import { headers } from 'next/headers';
import emailjs from '@emailjs/nodejs';
import type { ContactFormState } from './state';

const serviceId = process.env.EMAIL_SERVICE_ID;
const templateId = process.env.EMAIL_TEMPLATE_ID;
const publicKey = process.env.EMAIL_PUBLIC_KEY;
const privateKey = process.env.EMAIL_PRIVATE_KEY;

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
  const metadata = {
    ip,
    userAgent,
    referer,
  };

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    console.error('Contact form misconfiguration detected', {
      missing: {
        serviceId: Boolean(serviceId),
        templateId: Boolean(templateId),
        publicKey: Boolean(publicKey),
        privateKey: Boolean(privateKey),
      },
    });

    return {
      status: 'error',
      message: 'Contact form is temporarily unavailable. Please try again later.',
    };
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: name,
        to_name: 'Bruce',
        from_email: email,
        message,
        metadata_ip: metadata.ip,
        metadata_user_agent: metadata.userAgent,
        metadata_referer: metadata.referer,
      },
      {
        publicKey,
        privateKey,
      }
    );

    console.info('Contact form submission sent', {
      submittedAt: new Date().toISOString(),
      name,
      email,
      metadata,
    });

    return {
      status: 'success',
      message: 'Thank you. I will get back to you as soon as possible!',
    };
  } catch (error) {
    console.error('Contact form submission encountered an unexpected error', error);

    return {
      status: 'error',
      message: 'Something went wrong while sending your message. Please try again later.',
    };
  }
}
