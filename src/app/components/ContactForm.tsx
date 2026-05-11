'use client';

import emailjs from '@emailjs/browser';
import { ArrowRight, Loader2 } from 'lucide-react';
import { type ReactNode, useState } from 'react';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY;
const TO_EMAIL = process.env.NEXT_PUBLIC_EMAIL_TO_EMAIL;

type Status = 'idle' | 'sending' | 'success' | 'error';

type ContactFormProps = {
  footerStart?: ReactNode;
};

export function ContactForm({ footerStart }: ContactFormProps) {
  const [form, setForm] = useState({ email: '', message: '', name: '' });
  const [status, setStatus] = useState<Status>('idle');

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_email: form.email,
          from_name: form.name,
          message: form.message,
          to_email: TO_EMAIL,
          to_name: 'Bruce',
        },
        PUBLIC_KEY,
      );
      setStatus('success');
      setForm({ email: '', message: '', name: '' });
    } catch {
      setStatus('error');
    }
  };

  const isSending = status === 'sending';

  return (
    <form
      className="contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <div className="form-row">
        <label>
          <span>Name</span>
          <input
            autoComplete="name"
            disabled={isSending}
            name="name"
            onChange={(event) => updateField('name', event.target.value)}
            placeholder="Your name"
            required
            type="text"
            value={form.name}
          />
        </label>

        <label>
          <span>Email</span>
          <input
            autoComplete="email"
            disabled={isSending}
            name="email"
            onChange={(event) => updateField('email', event.target.value)}
            placeholder="you@example.com"
            required
            type="email"
            value={form.email}
          />
        </label>
      </div>

      <label>
        <span>Message</span>
        <textarea
          disabled={isSending}
          name="message"
          onChange={(event) => updateField('message', event.target.value)}
          placeholder="Tell me about your project or idea..."
          required
          value={form.message}
        />
      </label>

      {status === 'success' && (
        <p className="contact-form-status is-success" role="status">
          Thanks — your message is on its way. I&apos;ll get back to you soon.
        </p>
      )}
      {status === 'error' && (
        <p className="contact-form-status is-error" role="alert">
          Something went wrong sending your message. Please try again or reach out via socials.
        </p>
      )}

      <div className="contact-form-footer">
        {footerStart}
        <button className="button button-primary" disabled={isSending} type="submit">
          {isSending ? (
            <>
              Sending
              <Loader2 aria-hidden="true" className="contact-form-spinner" />
            </>
          ) : (
            <>
              Send message
              <ArrowRight aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
