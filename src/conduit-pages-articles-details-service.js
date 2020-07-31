const init = (articleId) =>
  Promise.all([fetchArticle(articleId), fetchComments(articleId)]).then(
    ([article, comments]) => ({
      article: article.article,
      comments: comments.comments,
    })
  );

const fetchArticle = (articleId) =>
  fetch(
    `https://conduit.productionready.io/api/articles/${articleId}`
  ).then((response) => response.json());

const fetchComments = (articleId) =>
  fetch(
    `https://conduit.productionready.io/api/articles/${articleId}/comments`
  ).then((response) => response.json());

export default {
  init,
};
