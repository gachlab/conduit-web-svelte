import ConduitAppService from "./conduit-app-service.js";

const init = (articleId) =>
  Promise.all([
    ConduitAppService.getUser(),
    fetchArticle(articleId),
    fetchComments(articleId),
  ]).then(([user, article, comments]) => ({
    article: article.article,
    comments: comments.comments,
    author: user,
  }));

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
