"use server";

import WelcomeEmail from "@/emails/WelcomeEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function AddContact({ firstName, lastName, email }) {
  const { data } = await resend.contacts.list({
    audienceId: process.env.RESEND_AUDIENCE_ID,
  });
  const existingContact = data.data.find((contact) => contact.email === email);

  if (existingContact) {
    return { ...existingContact, alreadyExists: true };
  }

  await resend.emails.send({
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: "Welcome to my newsletter",
    react: <WelcomeEmail fname={firstName} lname={lastName} email={email} />,
    headers: {
      "X-Entity-Ref-ID": crypto.randomUUID(),
    },
    tags: [
      {
        name: "category",
        value: "welcome_email",
      },
    ],
  });

  return await resend.contacts.create({
    email: email,
    firstName: firstName,
    lastName: lastName,
    unsubscribed: false,
    audienceId: process.env.RESEND_AUDIENCE_ID,
  });
}

export async function ChangeContactStatus(contactId) {
  const { data: contact } = await resend.contacts.get({
    id: contactId,
    audienceId: process.env.RESEND_AUDIENCE_ID,
  });

  if (!contact) {
    return {
      error:
        "You are not subscribed to my newsletter. If you think this is an error, please contact me.",
    };
  }

  if (contact.unsubscribed) {
    return {
      error:
        "You are already unsubscribed. If you think this is an error, please contact me.",
    };
  }

  return await resend.contacts.update({
    id: contactId,
    audienceId: process.env.RESEND_AUDIENCE_ID,
    unsubscribed: true,
  });
}
