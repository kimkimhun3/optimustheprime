import React from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import useMarkdownFile from '../hooks/useMarkdownFile';

interface RouteParams {
  fileName: string; // Define the expected route parameter type
}

const BlogPost: React.FC = () => {
  const { fileName } = useParams<RouteParams>(); // Get the file name from the URL
  const { content, loading, error } = useMarkdownFile(`${fileName}.md`); // Fetch with .md extension

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (error) {
    return <p>Error: {error}</p>; // Show error if fetching fails
  }

  return (
    <div className="prose mx-auto">
      <h1>{fileName}</h1> {/* Display the title without the .md extension */}
      <ReactMarkdown>{content}</ReactMarkdown> {/* Render the markdown content */}
    </div>
  );
};

export default BlogPost;
