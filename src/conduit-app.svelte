<script>
  import Router from "svelte-spa-router";
  import ConduitLayoutHeader from "./components/conduit-layout-header.svelte";
  import ConduitLayoutFooter from "./components/conduit-layout-footer.svelte";

  import ConduitAppService from "./conduit-app-service.js";

  let state;

  const setState = input => (state = Object.assign({}, input));

  ConduitAppService.init()
    .then(setState)
    .then(() => ConduitAppService.start(Object.assign({}, state)))
    .then(setState);
</script>

{#if state}
  <main>

    <ConduitLayoutHeader bind:links={state.header.links} bind:home={state.header.home} />
    <Router bind:routes={state.routes} />
    <ConduitLayoutFooter />
  </main>
{/if}
