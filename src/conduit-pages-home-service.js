const init = () =>
  Promise.all([fetchArticles(), fetchTags()])
    .then(([articles, tags]) => ({
      articles: articles,
      tags: tags.tags,
    }))
    .then((state) => ({
      articles: state.articles.data,
      pages: state.articles.meta.pages,
      tags: state.tags,
      selectedFeed: "all",
      feeds: [
        { id: "personal", name: "Your feed" },
        { id: "all", name: "Global Feed" },
      ],
      selectedPage: 1,
    }));

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
    !input.state.feeds.find((f) => f.id === input.feed.id)
      ? (input.state.feeds[2] = input.feed)
      : undefined
  ).then(() =>
    fetchArticles({
      limit: 10,
      page: 1,
      feed: input.feed,
    }).then((articles) =>
      Object.assign(input.state, {
        articles: articles.data,
        pages: articles.meta.pages,
        selectedPage: 1,
      })
    )
  );

const changePage = (input) =>
  fetchArticles({
    limit: 10,
    page: input.page,
    feed: input.state.feeds.find(
      (feed) => feed.id === input.state.selectedFeed
    ),
  }).then((response) =>
    Object.assign(input.state, {
      articles: response.data,
      pages: response.meta.pages,
      selectedPage: input.page,
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
          (val, index) => index + 1
        ),
      },
    }));
};

const fetchTags = () =>
  fetch("https://conduit.productionready.io/api/tags").then((response) =>
    response.json()
  );

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
  onFeedSelected,
  onTagSelected,
  onPageSelected,
};
