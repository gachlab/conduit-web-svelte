<script>
  export let article;
  export let onFavorite;
</script>

  <button
    class="btn btn-sm btn-outline-primary"
    on:click={() => onFavorite(article)}>
    <i class="ion-heart" />
    <slot />
  </button>
