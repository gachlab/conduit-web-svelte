<script>
  import ConduitArticlesListItem from "./conduit-articles-list-item.svelte";

  export let articles;
</script>

{#if !articles}
  <div>Loading articles...</div>
{/if}
{#if articles && articles.length === 0}
  <div>No articles are here... yet.</div>
{/if}

{#if articles && articles.length > 0}
  {#each articles as article (article.slug)}
    <ConduitArticlesListItem bind:article />
  {/each}
{/if}

<slot />
