'use client';

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export function ContactForm() {
  const [form, setForm] = useState({
    email: '',
    message: '',
    name: '',
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = () => {
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || 'Bruce Zhu portfolio'}`);
    const body = encodeURIComponent(
      [`Name: ${form.name}`, `Email: ${form.email}`, '', form.message].filter(Boolean).join('\n'),
    );
    window.location.href = `mailto:brucezhu.dev@gmail.com?subject=${subject}&body=${body}`;
  };

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
            name="name"
            onChange={(event) => updateField('name', event.target.value)}
            placeholder="Your name"
            type="text"
            value={form.name}
          />
        </label>

        <label>
          <span>Email</span>
          <input
            autoComplete="email"
            name="email"
            onChange={(event) => updateField('email', event.target.value)}
            placeholder="you@example.com"
            type="email"
            value={form.email}
          />
        </label>
      </div>

      <label>
        <span>Message</span>
        <textarea
          name="message"
          onChange={(event) => updateField('message', event.target.value)}
          placeholder="Tell me about your project or idea..."
          value={form.message}
        />
      </label>

      <button className="button button-primary" type="submit">
        Send message
        <ArrowRight aria-hidden="true" />
      </button>
    </form>
  );
}
