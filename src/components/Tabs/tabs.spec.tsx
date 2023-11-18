import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from 'vitest';

test(`[Tabs Component]: Should render`, async () => {
  const { screen, render } = await createDOM();
  await render(<p />);
  expect(screen.innerHTML).toContain('Tabs works!');
});
