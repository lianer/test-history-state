import { encrypt, decrypt } from './encrypt';

it('test encrypt', () => {
  expect(encrypt('abc')).toBe('<=>');
});

it('test decrypt', () => {
  expect(decrypt('<=>')).toBe('abc');
});
