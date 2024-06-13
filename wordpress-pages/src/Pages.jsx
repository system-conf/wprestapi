import React, { useEffect, useState } from 'react';
import "./App.css";
const loadCSS = (href) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
};

const Pages = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetch('https://luna.mangomedya.com/wp-json/wp/v2/pages')
      .then(response => response.json())
      .then(data => setPages(data))
      .catch(error => console.error('Error:', error));

    // CSS dosyalarını yükle
    loadCSS('https://luna.mangomedya.com/wp-content/themes/medcaline/style.css');
    loadCSS('https://luna.mangomedya.com/wp-content/plugins/elementor/assets/css/frontend.css');
  }, []);

  return (
    <div>
      <h1>Pages</h1>
      {pages.length > 0 ? (
        <ul>
          {pages.map(page => (
            <li key={page.id}>
              <h2>{page.title.rendered}</h2>
              <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Pages;
