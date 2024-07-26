"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function AddContact({ firstName, lastName, email }) {
  const contacts = await resend.contacts.list({
    audienceId: process.env.RESEND_AUDIENCE_ID,
  });

  const contact = contacts.data.data.find((contact) => contact.email === email);

  if (contact) {
    contact.alreadyExists = true;
    return contact;
  }

  const data = resend.contacts.create({
    email: email,
    firstName: firstName,
    lastName: lastName,
    unsubscribed: false,
    audienceId: process.env.RESEND_AUDIENCE_ID,
  });
  return data;
}

export async function ChangeContactStatus(contactId) {
  const contact = await resend.contacts.get({
    id: contactId,
    audienceId: process.env.RESEND_AUDIENCE_ID,
  });

  if (!contact.data) {
    return {
      error:
        "You are not subscribed to my newsletter. If you think this is an error, please contact us.",
    };
  }

  if (contact.data.unsubscribed) {
    return {
      error:
        "You are already unsubscribed. If you think this is an error, please contact us.",
    };
  }

  const data = resend.contacts.update({
    id: contactId,
    audienceId: process.env.RESEND_AUDIENCE_ID,
    unsubscribed: true,
  });

  return data;
}
