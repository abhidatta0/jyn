export default function generateRandomIPv4() {
  const octets = [];
  for (let i = 0; i < 4; i++) {
    octets.push(Math.floor(Math.random() * 256));
  }
  return octets.join('.');
}
