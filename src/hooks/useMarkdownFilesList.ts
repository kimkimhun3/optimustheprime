import { useEffect, useState } from 'react';
import { GitHubFile } from '../types/githubTypes'; // Adjust the path as needed

const useMarkdownFilesList = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMarkdownFiles = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(import.meta.env.VITE_GITHUB_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch markdown files');
        }
        const data: GitHubFile[] = await response.json(); // Use the GitHubFile type
        // Filter out markdown files
        const markdownFiles = data
          .filter((file) => file.name.endsWith('.md'))
          .map((file) => file.name);
        setFiles(markdownFiles);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdownFiles();
  }, []);

  return { files, loading, error };
};

export default useMarkdownFilesList;
