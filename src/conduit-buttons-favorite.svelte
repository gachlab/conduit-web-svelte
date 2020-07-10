<script>
  export let article;
  export let onFavorite;
</script>

<div class="pull-xs-right">
  <button
    class="btn btn-sm btn-outline-primary"
    on:click={() => onFavorite(article)}>
    <i class="ion-heart" />
    {article.favoritesCount}
  </button>
</div>
