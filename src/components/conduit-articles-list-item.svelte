<script>
  import ConduitArticlesPreview from "./conduit-articles-preview.svelte";
  import ConduitArticlesMeta from "./conduit-articles-meta.svelte";
  import ConduitButtonsFavorite from "./conduit-buttons-favorite.svelte";

  export let article;

  let onFavoritedArticle = console.log;
</script>

{#if article}
  <ConduitArticlesPreview bind:article>
    <ConduitArticlesMeta bind:article>
      <div class="pull-xs-right">
        <ConduitButtonsFavorite
          bind:article
          bind:onFavorite={onFavoritedArticle}>
          <span class="counter">{article.favoritesCount}</span>
        </ConduitButtonsFavorite>
      </div>
    </ConduitArticlesMeta>
  </ConduitArticlesPreview>
{/if}
