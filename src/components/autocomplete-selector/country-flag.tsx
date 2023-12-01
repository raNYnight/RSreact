const FlagEmojiToPNG = ({ flag }: { flag: string }) => {
  const countryCode = Array.from(flag, (codeUnit) =>
    String.fromCodePoint(codeUnit.codePointAt(0)! - 127397).toLowerCase()
  ).join('');

  return (
    <img
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      alt="flag"
      width="24"
      height="18"
    />
  );
};

export default FlagEmojiToPNG;
