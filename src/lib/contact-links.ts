// Contact URL builders centralise validation for the only confirmed Phase One conversion path: telephone calls.
export function phoneHref(phone: string | null): string | null {
  if (!phone || !/^\+?[0-9 ()-]{8,20}$/.test(phone)) return null;
  return `tel:${phone.replace(/[^0-9+]/g, "")}`;
}

export function whatsappHref(phone: string | null): string | null {
  if (!phone || !/^\+?[0-9 ()-]{8,20}$/.test(phone)) return null;
  const digits = phone.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}

export function mapHref(url: string | null): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" ? parsed.toString() : null;
  } catch {
    return null;
  }
}

export function emailHref(email: string | null): string | null {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return `mailto:${email}`;
}
