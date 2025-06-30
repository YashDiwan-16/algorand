export const truncateAddress = (address: string, chars = 4): string => {
  if (!address) return '';
  const start = address.substring(0, chars + 2); // 0x + chars
  const end = address.substring(address.length - chars);
  return `${start}...${end}`;
}; 