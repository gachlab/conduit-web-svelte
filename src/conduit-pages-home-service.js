import ConduitAppService from "./conduit-app-service.js";

const init = () =>
  ConduitAppService.getUser().then((user) => ({
    banner: {
      title: "conduit",
      subtitle: "A place to share your knowledge.",
    },
    articles: { data: [], pages: [] },
    tags: { data: [], isOutlined: false },
    feeds: {
      data: [].concat(
        user
          ? [
              {
                id: "personal",
                name: "Your feed",
                isSelected: true,
              },
              { id: "all", name: "Global Feed", isSelected: false },
            ]
          : [{ id: "all", name: "Global Feed", isSelected: true }]
      ),
    },
    user,
  }));

const start = (state) =>
  Promise.all([
    fetchArticles({
      limit: 10,
      page: 1,
      feed: state.feeds.data.find((feed) => feed.isSelected),
    }),
    fetchTags(),
  ]).then(([articles, tags]) =>
    Object.assign(state, {
      articles: { data: articles.data, pages: articles.meta.pages },
      tags: { data: tags, isOutlined: false },
    })
  );

const onTagSelected = (input) =>
  selectFeed({
    feed: {
      id: input.tag.toLowerCase(),
      name: "#" + input.tag,
    },
    state: input.state,
  });

const onFeedSelected = (input) =>
  selectFeed({
    feed: input.feed,
    state: input.state,
  });

const onPageSelected = (input) =>
  changePage({ page: input.page, state: input.state });

const selectFeed = (input) =>
  Promise.resolve(
    !input.state.feeds.data.find((f) => f.id === input.feed.id)
      ? input.state.feeds.data.push(input.feed)
      : undefined
  ).then(() =>
    fetchArticles({
      limit: 10,
      page: 1,
      feed: input.feed,
    }).then((articles) =>
      Object.assign(input.state, {
        articles: { data: articles.data, pages: articles.meta.pages },
        feeds: {
          data: input.state.feeds.data.map((feed) =>
            Object.assign(feed, { isSelected: feed.id === input.feed.id })
          ),
        },
      })
    )
  );

const changePage = (input) =>
  fetchArticles({
    limit: 10,
    page: input.page,
    feed: input.state.feeds.data.find((feed) => feed.isSelected),
  }).then((response) =>
    Object.assign(input.state, {
      articles: { data: response.data, pages: response.meta.pages },
    })
  );

const fetchArticles = (filter) => {
  filter
    ? filter
    : (filter = {
        limit: 10,
        page: 1,
        feed: { id: "all", name: "Global Feed" },
      });
  filter = Object.assign(filter, {
    offset: filter.limit * (filter.page - 1),
  });
  const url = `https://conduit.productionready.io/api/articles${
    filter ? "?" : ""
  }${filter.limit ? "limit=" + filter.limit : ""}${
    "&offset=" + filter.offset || 0
  }${filter.feed.name.includes("#") ? "&tag=" + filter.feed.id : ""}`;

  return fetch(url)
    .then((response) => response.json())
    .then((response) => ({
      data: response.articles.map((article) =>
        addArticleDetailLink(addProfilePageLink(article))
      ),
      meta: {
        pages: Array.from(
          new Array(Math.ceil(response.articlesCount / filter.limit)),
          (val, index) => ({
            text: index + 1,
            value: index + 1,
            isSelected: index + 1 == filter.page,
          })
        ),
      },
    }));
};

const fetchTags = () =>
  fetch("https://conduit.productionready.io/api/tags")
    .then((response) => response.json())
    .then((tags) => tags.tags);

const addArticleDetailLink = (article) =>
  Object.assign({}, article, {
    href: window.location.href + "article/" + article.slug,
  });

const addProfilePageLink = (article) =>
  Object.assign({}, article, {
    authorHref: window.location.href + "profile/" + article.author.username,
  });

export default {
  init,
  start,
  onFeedSelected,
  onTagSelected,
  onPageSelected,
};
