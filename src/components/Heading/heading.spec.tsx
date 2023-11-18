import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from 'vitest';
import { Heading } from './heading';

test(`[Heading Component]: Should render`, async () => {
  const { screen, render } = await createDOM();
  await render(<Heading text='Heading works!' />);
  expect(screen.innerHTML).toContain('Heading works!');
});
