<script>
  export let tags;
  export let isOutlined;
  export let onSelect;
</script>

{#if !tags}
  <div>Loading tags...</div>
{/if}

{#if tags && tags.length > 0}
  <div class={`tag-list`}>
    {#each tags as tag (tag)}
      <a
        href="javascript:void(0)"
        class={`tag-default tag-pill ${isOutlined ? 'tag-outline' : ''}`}
        on:click={() => onSelect(tag)}>
        {tag}
      </a>
    {/each}
  </div>
{/if}
