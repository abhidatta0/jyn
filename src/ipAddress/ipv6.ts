export default function generateRandomIPv6() {
  const segments = [];
  for (let i = 0; i < 8; i++) {
    const value = Math.floor(Math.random() * 0x10000);
    segments.push(value.toString(16));
  }
  return segments.join(':');
}
