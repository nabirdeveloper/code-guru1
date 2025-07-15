"use client";
import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add your form submission logic here (e.g., API call)
    setSubmitted(true);
  };

  return (
    <section className="py-16 bg-gray-900 min-h-[70vh] flex items-center justify-center">
      <div className="bg-gray-800 rounded-xl shadow-md p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          Contact Me
        </h2>
        <p className="text-white/70 mb-8 text-center">
          Have a question or want to work together? Fill out the form below!
        </p>
        {submitted ? (
          <div className="text-green-400 text-center font-semibold">
            Thank you for reaching out! I will get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-white/80 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-emerald-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-white/80 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-emerald-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-white/80 mb-1">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                required
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-emerald-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;