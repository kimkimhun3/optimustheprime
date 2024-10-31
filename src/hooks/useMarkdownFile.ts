import { useEffect, useState } from 'react';

const useMarkdownFile = (fileName: string) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMarkdown = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`https://raw.githubusercontent.com/kimkimhun3/OptimusMarkDown/main/${fileName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch markdown file');
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        // Type check for Error instance
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred'); // Handle any non-Error objects
        }
      } finally {
        setLoading(false);
      }
    };

    if (fileName) {
      fetchMarkdown();
    }
  }, [fileName]);

  return { content, loading, error };
};

export default useMarkdownFile;
