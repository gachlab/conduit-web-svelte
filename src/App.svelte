<script>
  import ConduitLayoutHeader from "./conduit-layout-header.svelte";
  import ConduitLayoutFooter from "./conduit-layout-footer.svelte";
  import ConduitPagesHome from "./conduit-pages-home.svelte";
  import ConduitPagesArticlesDetails from "./conduit-pages-articles-details.svelte";

  import Router from "svelte-spa-router";
  const routes = {
    // Exact path
    "/": ConduitPagesHome,

    // Using named parameters, with last being optional
    "/articles/:slug": ConduitPagesArticlesDetails,

    // Catch-all
    // This is optional, but if present it must be the last
    "*": ConduitPagesHome
  };
</script>

<main>
  <ConduitLayoutHeader />
  <Router {routes} />
  <ConduitLayoutFooter />
</main>
