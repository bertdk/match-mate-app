import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from 'vitest';
import { BasicInput } from './basic-input';

test(`[TextInput Component]: Should render`, async () => {
  const { screen, render } = await createDOM();
  await render(<BasicInput id="test" text="Test text" />);
  expect(screen.innerHTML).toContain('Test text');
});
