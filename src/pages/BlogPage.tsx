import React from 'react';
import { Link } from 'react-router-dom';
import useMarkdownFilesList from '../hooks/useMarkdownFilesList';

const BlogPage: React.FC = () => {
  const { files, loading, error } = useMarkdownFilesList();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>My Blog</h1>
      <ul>
        {files.map((fileName) => (
          <li key={fileName}>
            {/* Remove .md from the link while displaying the name */}
            <Link to={`/post/${fileName.replace('.md', '')}`}>{fileName.replace('.md', '')}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
