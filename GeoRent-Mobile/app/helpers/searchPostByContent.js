import Fuse from 'fuse.js';

function verifyInputs(posts, searchValue) {

  if (!Array.isArray(posts) || typeof searchValue !== 'string' || !searchValue.trim()) return false;
  return true;
}

export default function searchPostByContent(posts, searchValue) {
  if (verifyInputs(posts, searchValue) === false) return posts;
  const fuseOptions = {
    ignoreLocation: true,
    findAllMatches: true,
    threshold: 0.35,
    keys: [
      'name',
      'description',
    ],
  };

  const fuse = new Fuse(posts, fuseOptions);
  const fuseResult = fuse.search(searchValue);
  return fuseResult.map((post) => post.item);
}
