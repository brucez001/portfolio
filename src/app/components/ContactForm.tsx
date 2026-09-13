'use client';

import { ArrowRight, Loader2, X } from 'lucide-react';
import { type ReactNode, useActionState, useEffect, useRef, useState } from 'react';

import { submitContact } from './contact-actions';
import { type ContactFormState, initialContactFormState } from './contact-form-state';

type ContactFormProps = {
  footerStart?: ReactNode;
};

export function ContactForm({ footerStart }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(submitContact, initialContactFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const [dismissedState, setDismissedState] = useState<ContactFormState | null>(null);

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset();
    }
  }, [state.status]);

  const isStatusVisible = state.status !== 'idle' && dismissedState !== state;

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
          autoComplete="off"
          disabled={isPending}
          name="message"
          placeholder="Tell me about your project or idea…"
          required
        />
      </label>

      {isStatusVisible && (
        <div
          className={`contact-form-status ${state.status === 'success' ? 'is-success' : 'is-error'}`}
          role={state.status === 'success' ? 'status' : 'alert'}
        >
          <p className="contact-form-status-message">{state.message}</p>
          <button
            aria-label="Dismiss message"
            className="contact-form-status-close"
            onClick={() => setDismissedState(state)}
            type="button"
          >
            <X aria-hidden="true" />
          </button>
        </div>
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
              Send Message
              <ArrowRight aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
