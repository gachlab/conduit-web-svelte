import ConduitPagesHome from "./conduit-pages-home.svelte";
import ConduitPagesArticlesDetails from "./conduit-pages-articles-details.svelte";

const init = () =>
  isLoggedIn().then((isLoggedIn) => ({
    header: {
      home: {
        title: "conduit",
        href: "#",
      },
      links: [
        {
          text: "Home",
          href: "#",
        },
      ].concat(
        isLoggedIn
          ? []
          : [
              {
                text: "Sign in",
                href: "#/signin",
              },
              {
                text: "Sign up",
                href: "#/signup",
              },
            ]
      ),
    },
    routes: {
      "/": ConduitPagesHome,
      "/articles/:slug": ConduitPagesArticlesDetails,
      "*": ConduitPagesHome,
    },
  }));

const start = (state) => Promise.resolve(Object.assign(state));

const isLoggedIn = () => Promise.resolve(false);

export default {
  init,
  start,
  isLoggedIn,
};
