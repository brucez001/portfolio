'use server';

import { headers } from 'next/headers';
import emailjs from '@emailjs/nodejs';
import type { ContactFormState } from './state';

const serviceId = process.env.EMAIL_SERVICE_ID;
const templateId = process.env.EMAIL_TEMPLATE_ID;
const publicKey = process.env.EMAIL_PUBLIC_KEY;
const privateKey = process.env.EMAIL_PRIVATE_KEY;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const detectOperatingSystem = (userAgent: string): string => {
  const normalizedAgent = userAgent.toLowerCase();

  if (normalizedAgent.includes('windows nt 10')) {
    return 'Windows 10';
  }

  if (normalizedAgent.includes('windows nt 11')) {
    return 'Windows 11';
  }

  if (normalizedAgent.includes('mac os x')) {
    return 'macOS';
  }

  if (normalizedAgent.includes('android')) {
    return 'Android';
  }

  if (normalizedAgent.includes('iphone') || normalizedAgent.includes('ipad')) {
    return 'iOS';
  }

  if (normalizedAgent.includes('linux')) {
    return 'Linux';
  }

  return 'unknown';
};

const detectBrowser = (userAgent: string): { browser: string; version: string } => {
  const normalizedAgent = userAgent.toLowerCase();

  if (normalizedAgent.includes('edg/')) {
    const versionMatch = /edg\/(\d+(?:\.\d+)*)/i.exec(userAgent);
    return { browser: 'Edge', version: versionMatch?.[1] ?? 'unknown' };
  }

  if (normalizedAgent.includes('chrome/')) {
    const versionMatch = /chrome\/(\d+(?:\.\d+)*)/i.exec(userAgent);
    return { browser: 'Chrome', version: versionMatch?.[1] ?? 'unknown' };
  }

  if (normalizedAgent.includes('safari/') && normalizedAgent.includes('version/')) {
    const versionMatch = /version\/(\d+(?:\.\d+)*)/i.exec(userAgent);
    return { browser: 'Safari', version: versionMatch?.[1] ?? 'unknown' };
  }

  if (normalizedAgent.includes('firefox/')) {
    const versionMatch = /firefox\/(\d+(?:\.\d+)*)/i.exec(userAgent);
    return { browser: 'Firefox', version: versionMatch?.[1] ?? 'unknown' };
  }

  return { browser: 'unknown', version: 'unknown' };
};

let emailClientInitialized = false;

const ensureEmailClient = () => {
  if (emailClientInitialized) {
    return;
  }

  if (!publicKey || !privateKey) {
    throw new Error(
      'Missing EMAIL_PUBLIC_KEY or EMAIL_PRIVATE_KEY environment variable. Email client cannot be initialized.'
    );
  }

  emailjs.init({
    publicKey: publicKey,
    privateKey: privateKey,
  });

  emailClientInitialized = true;
};

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
  const platformHeader = headersList.get('sec-ch-ua-platform') ?? undefined;
  const userPlatform = platformHeader ? platformHeader.replace(/"/g, '') : 'unknown';
  const userCountry =
    headersList.get('x-vercel-ip-country') ??
    headersList.get('x-country') ??
    headersList.get('cloudfront-viewer-country') ??
    'unknown';
  const userOs = detectOperatingSystem(userAgent);
  const { browser: userBrowser, version: userVersion } = detectBrowser(userAgent);
  const metadata = {
    ip,
    userAgent,
    referer,
    user_os: userOs,
    user_platform: userPlatform,
    user_browser: userBrowser,
    user_version: userVersion,
    user_country: userCountry,
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

  ensureEmailClient();

  try {
    const response = await emailjs.send(serviceId, templateId, {
      from_name: name,
      to_name: 'Bruce',
      from_email: email,
      message,
      metadata_ip: metadata.ip,
      metadata_user_agent: metadata.userAgent,
      metadata_referer: metadata.referer,
      metadata_user_os: metadata.user_os,
      metadata_user_platform: metadata.user_platform,
      metadata_user_browser: metadata.user_browser,
      metadata_user_version: metadata.user_version,
      metadata_user_country: metadata.user_country,
    });

    if (response.status < 200 || response.status >= 300) {
      console.error('Contact form submission rejected by EmailJS', {
        status: response.status,
        text: response.text,
      });

      return {
        status: 'error',
        message: 'Contact form is temporarily unavailable. Please try again later.',
      };
    }

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
    if (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      'text' in error
    ) {
      const { status, text } = error as { status: number; text: string };
      console.error('Contact form submission rejected by EmailJS', { status, text });

      return {
        status: 'error',
        message: 'Contact form is temporarily unavailable. Please try again later.',
      };
    }

    console.error('Contact form submission encountered an unexpected error', error);

    return {
      status: 'error',
      message: 'Something went wrong while sending your message. Please try again later.',
    };
  }
}
