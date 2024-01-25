function CaptionComponent({ caption }: { caption: string }) {
  // Split the caption by line breaks to handle separate lines
  const lines = caption.split("\n");

  // Function to process each line to detect and bold hashtags
  const processLine = (line: any) => {
    // Split by spaces to check each word
    const words = line.split(" ");
    // Transform words into JSX, bolding if they are hashtags
    return words
      .map((word: any, index: number) =>
        word.startsWith("#") ? <strong key={index}>{word}</strong> : word
      )
      .reduce(
        (acc: any, word: any, index: number) =>
          index === 0 ? [...acc, word] : [...acc, " ", word],
        []
      );
  };

  return (
    <div>
      {lines.map((line, index) => (
        <p key={index}>{processLine(line)}</p>
      ))}
    </div>
  );
}

export default CaptionComponent;