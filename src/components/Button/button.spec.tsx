import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from 'vitest';
import { Button } from './button';

test(`[Button Component]: Should render`, async () => {
  const { screen, render } = await createDOM();
  await render(<Button text="Button works!" />);
  expect(screen.innerHTML).toContain('Button works!');
});
