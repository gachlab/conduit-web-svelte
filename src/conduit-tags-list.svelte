<script>
  export let tags;
  export let outline;
  export let onSelect;
</script>

{#if !tags}
  <div>Loading tags...</div>
{/if}
{#if tags && tags.length === 0}
  <div>No tags are here... yet.</div>
{/if}
{#if tags && tags.length > 0}
  <div class={`tag-list`}>
    {#each tags as tag}
      <a
        href=""
        class={`tag-default tag-pill ${outline ? 'tag-outline' : ''}`}
        on:click={() => onSelect(tag)}>
        {tag}
      </a>
    {/each}
  </div>
{/if}
