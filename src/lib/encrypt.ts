export const encrypt = function (text: string): string {
  return text
    .split('')
    .map((t) => String.fromCharCode(126 - t.codePointAt(0)! + 33))
    .reverse()
    .join('');
};

export const decrypt = encrypt;
