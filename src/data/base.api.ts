import { server$ } from '@builder.io/qwik-city';

export const get = server$(async function (url: string) {
  const baseURL = this.env.get('PUBLIC_API_URL');
  const r = await fetch(`${baseURL}${url}`, {
    headers: { Accept: 'application/json' },
  });
  const result = await r.json();
  return result;
});

export const post = server$(async function (url: string, data) {
  const baseURL = this.env.get('PUBLIC_API_URL');
  const r = await fetch(`${baseURL}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    method: 'POST',
  });
  const result = await r.json();
  return result;
});

export const patch = server$(async function (url: string, data) {
  const baseURL = this.env.get('PUBLIC_API_URL');
  const r = await fetch(`${baseURL}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    method: 'PATCH',
  });
  const result = await r.json();
  return result;
});
