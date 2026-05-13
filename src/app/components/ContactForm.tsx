'use client';

import { ArrowRight, Loader2 } from 'lucide-react';
import { type ReactNode, useActionState, useEffect, useRef } from 'react';

import { initialContactFormState, submitContact } from './contact-actions';

type ContactFormProps = {
  footerStart?: ReactNode;
};

export function ContactForm({ footerStart }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(submitContact, initialContactFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form action={formAction} className="contact-form" ref={formRef}>
      <input
        aria-hidden="true"
        autoComplete="off"
        className="contact-form-honeypot"
        name="nickname"
        tabIndex={-1}
        type="text"
      />

      <div className="form-row">
        <label>
          <span>Name</span>
          <input
            autoComplete="name"
            disabled={isPending}
            name="name"
            placeholder="Your name"
            required
            type="text"
          />
        </label>

        <label>
          <span>Email</span>
          <input
            autoComplete="email"
            disabled={isPending}
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
        </label>
      </div>

      <label>
        <span>Message</span>
        <textarea
          disabled={isPending}
          name="message"
          placeholder="Tell me about your project or idea..."
          required
        />
      </label>

      {state.status === 'success' && (
        <p className="contact-form-status is-success" role="status">
          {state.message}
        </p>
      )}
      {state.status === 'error' && (
        <p className="contact-form-status is-error" role="alert">
          {state.message}
        </p>
      )}

      <div className="contact-form-footer">
        {footerStart}
        <button className="button button-primary" disabled={isPending} type="submit">
          {isPending ? (
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
