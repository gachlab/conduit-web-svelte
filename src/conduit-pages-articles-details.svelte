<script>
  import service from "./conduit-pages-articles-details-service";
  import ConduitArticlesMeta from "./components/conduit-articles-meta.svelte";
  import ConduitButtonsFavorite from "./components/conduit-buttons-favorite.svelte";
  import ConduitButtonsFollow from "./components/conduit-buttons-follow.svelte";
  import ConduitArticlesCommentsList from "./components/conduit-articles-comments-list.svelte";
  import ConduitArticlesCommentsCreate from "./components/conduit-articles-comments-create.svelte";
  import ConduitTagsList from "./components/conduit-tags-list.svelte";

  export let params = {};
  let state;
  let isOutlined = true;
  const setState = (input) => (state = Object.assign({}, input));

  let onFavoritedArticle = console.log;
  let onSubmittedComment = console.log;

  service.init(params.slug).then((state) => setState(state));
</script>

{#if state}
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{state.article.title}</h1>
        <ConduitArticlesMeta bind:article={state.article}>
          {#if state.author}
            <ConduitButtonsFollow bind:profile={state.article.author} />
            <ConduitButtonsFavorite
              bind:article={state.article}
              bind:onFavorite={onFavoritedArticle}>
              {state.article.favorited ? 'Unfavorite' : 'Favorite'} Article
              <span class="counter">({state.article.favoritesCount})</span>
            </ConduitButtonsFavorite>
          {/if}
        </ConduitArticlesMeta>
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-xs-12">
          <div>
            <p>{state.article.body}</p>
          </div>
          <ConduitTagsList
            bind:tags={state.article.tagList}
            bind:outline={isOutlined} />
        </div>
      </div>
      <hr />
      {#if state.author}
        <div class="article-actions">
          <ConduitArticlesMeta bind:article={state.article}>
            <ConduitButtonsFollow bind:profile={state.article.author} />
            <ConduitButtonsFavorite
              bind:article={state.article}
              bind:onFavorite={onFavoritedArticle}>
              {state.article.favorited ? 'Unfavorite' : 'Favorite'} Article
              <span class="counter">({state.article.favoritesCount})</span>
            </ConduitButtonsFavorite>
          </ConduitArticlesMeta>
        </div>
      {/if}

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <ConduitArticlesCommentsCreate
            bind:onSubmit={onSubmittedComment}
            bind:author={state.author} />

          <ConduitArticlesCommentsList bind:comments={state.comments} />
        </div>
      </div>
    </div>
  </div>
{/if}
