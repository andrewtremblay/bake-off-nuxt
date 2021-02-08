function getSafeAuthorKey(authorKey) {
  let safeAuthorKey = authorKey;
  if (safeAuthorKey.indexOf("/") === 0) {
    safeAuthorKey = safeAuthorKey.substring(1);
  }
  if (safeAuthorKey.indexOf("authors/") === 0) {
    safeAuthorKey = safeAuthorKey.substring(8);
  }
  return safeAuthorKey;
}

function endpointFailed(rawText) {
  return (
    rawText !== null &&
    rawText.indexOf("<head><title>404 Not Found</title></head>") !== -1
  );
}

// gets author data with fallback
export async function getAuthor(authorKey) {
  const safeAuthorKey = getSafeAuthorKey(authorKey);
  const authorResp = await fetch(
    `https://openlibrary.org/authors/${safeAuthorKey}.json`
  );
  let author = {};
  let authorText = await authorResp.text();
  const authorToParse = authorText;
  if (authorResp) {
    try {
      author = JSON.parse(authorToParse);
      authorText = null;
    } catch (e) {
      console.error(e);
    }
  }
  let mainPhoto = "https://placeimg.com/300/300/people";
  if (author.photos && author.photos.length) {
    mainPhoto = `http://covers.openlibrary.org/a/id/${author.photos[0]}-L.jpg`;
  }
  return {
    author,
    authorKey,
    mainPhoto,
    authorText,
    endpointFailed: endpointFailed(authorText)
  };
}

const fallbackJSON = `[{"type": {"key": "/type/work"}, "title": "Animal Crackers", "authors": [{"type": {"key": "/type/author_role"}, "author": {"key": "/authors/OL7752013A"}}, {"type": {"key": "/type/author_role"}, "author": {"key": "/authors/OL9101269A"}}], "covers": [10622362], "key": "/works/OL24191835W", "latest_revision": 1, "revision": 1, "created": {"type": "/type/datetime", "value": "2021-02-08T11:04:15.796052"}, "last_modified": {"type": "/type/datetime", "value": "2021-02-08T11:04:15.796052"}}]`;
export async function getAuthorBooks(authorKey) {
  const safeAuthorKey = getSafeAuthorKey(authorKey);
  const fetchedUrl = `https://openlibrary.org/authors/${safeAuthorKey}/works.json`;
  const authorResp = await fetch(fetchedUrl);
  let books = [];
  let rawText = await authorResp.text();
  const rawTextToParse = rawText;
  if (authorResp) {
    try {
      books = JSON.parse(fallbackJSON);
      // JSON.parse(rawTextToParse).entries;
      rawText = null;
    } catch (e) {
      console.error(e);
    }
  }
  return {
    authorKey,
    books,
    rawText,
    fetchedUrl,
    endpointFailed: endpointFailed(rawText)
  };
}
