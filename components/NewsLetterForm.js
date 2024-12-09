"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AddContact, ChangeContactStatus } from "@/components/NewsLetter";

export default function NewsLetterForm() {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactId, setContactId] = useState(null);

  useEffect(() => {
    const contactId = localStorage.getItem("contact-id");
    if (contactId) {
      setContactId(localStorage.getItem("contact-id"));
    }
  }, []);

  useEffect(() => {
    if (contactId) {
      localStorage.setItem("contact-id", contactId);
    }
  }, [contactId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!firstName || !lastName || !email) {
      setLoading(false);
      return;
    }

    const data = await AddContact({ firstName, lastName, email });

    if (data.error) {
      toast.error("Something went wrong.", {
        description: data.error,
      });
    } else {
      if (data.alreadyExists) {
        setContactId(data.id);
        toast.warning("You are already subscribed!", {
          description:
            "This email is already been used. If you think this is an error, please contact me.",
        });
      } else {
        setContactId(data.data.id);
        toast.success("Thank you for subscribing!", {
          description:
            "You sign up for my newsletter. You will recive an email every time that's a new post.",
        });
      }
    }
    setLoading(false);
  };

  const handleUnSubscribe = async () => {
    setLoading(true);
    if (!contactId) {
      setLoading(false);
      return;
    }

    const data = await ChangeContactStatus(contactId);

    if (data.error) {
      setLoading(false);
      toast.error("Something went wrong.", {
        description: data.error,
      });
    } else {
      setContactId(null);
      localStorage.removeItem("contact-id");
      setLoading(false);
      toast.success("You have been unsubscribed!", {
        description:
          "You successfully unsubscribed from my newsletter. You will no longer recive emails.",
      });
    }
    setLoading(false);
  };

  if (contactId) {
    return (
      <div className="flex flex-col gap-4 mt-4 text-sm">
        <div className="flex flex-col gap-1 w-full">
          <label className="text-zinc-600 dark:text-zinc-400">
            You are already subscribed!
          </label>
          <button
            onClick={handleUnSubscribe}
            disabled={loading}
            className="w-min py-2 px-4 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 focus:ring-1 hover:ring-1 ring-zinc-500 rounded-md outline-none font-medium duration-75"
          >
            Unsubscribe
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mt-4 text-sm"
      >
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="first_name">First Name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={loading}
              name="first_name"
              required
              type="text"
              placeholder="John"
              autoComplete="given-name"
              className="w-full py-1.5 px-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 focus:ring-1 hover:ring-1 ring-zinc-500 placeholder:text-zinc-500/75 rounded-md outline-none duration-75"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="last_name">Last Name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={loading}
              name="last_name"
              required
              type="text"
              placeholder="Doe"
              autoComplete="family-name"
              className="w-full py-1.5 px-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 focus:ring-1 hover:ring-1 ring-zinc-500 placeholder:text-zinc-500/75 rounded-md outline-none duration-75"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="email">Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            name="email"
            required
            type="email"
            placeholder="jonhdoe@example.com"
            autoComplete="email"
            className="w-full py-1.5 px-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 focus:ring-1 hover:ring-1 ring-zinc-500 placeholder:text-zinc-500/75 rounded-md outline-none duration-75"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-min py-2 px-4 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 focus:ring-1 hover:ring-1 ring-zinc-500 rounded-md outline-none font-medium duration-75 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Subscribe"}
        </button>
      </form>
    );
  }
}
