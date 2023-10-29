export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="rgba(136, 136, 136, 0.2)" offset="20%" />
      <stop stop-color="rgba(68, 68, 68, 0.2)" offset="50%" />
      <stop stop-color="rgba(136, 136, 136, 0.2)" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="none" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate attributeName="x" from="-${w}" to="${w}" dur="5s" repeatCount="indefinite" />
</svg>

`;

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
