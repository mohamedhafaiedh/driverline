// Anciennes URLs WordPress sans équivalent sur le nouveau site : réponse 410 (« supprimé définitivement »).
// Google les retire de l'index plus vite qu'avec une redirection vers l'accueil, qu'il traite en soft 404.
const JUNK_QUERY = /(^|&)(p|page_id|cat|attachment_id|author|feed)(=|&|$)/i;

export default async (request) => {
  const url = new URL(request.url);

  // Sur l'accueil, seules les anciennes URLs du type /?p=123 sont concernées
  if ((url.pathname === "/" || url.pathname === "/en/") && !JUNK_QUERY.test(url.search.slice(1))) return;

  return new Response("Gone", {
    status: 410,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400",
      "netlify-cdn-cache-control": "public, max-age=31536000",
    },
  });
};

export const config = {
  cache: "manual",
  pattern: [
    "^/$",
    "^/en/$",
    "^/(hello-world|category|author|tag|feed)(/.*)?$",
    "^/comments/feed(/.*)?$",
    "^/wp-(admin|content|includes|json|login).*",
    "^/xmlrpc\.php$",
    "^.*\.php(/.*)?$",
  ],
};
