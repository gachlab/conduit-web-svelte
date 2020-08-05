import ConduitPagesHome from "./conduit-pages-home.svelte";
import ConduitPagesArticlesDetails from "./conduit-pages-articles-details.svelte";

const init = () =>
  getUser().then((user) => ({
    header: {
      home: {
        title: "conduit",
        href: "#",
      },
      links: user
        ? [
            {
              text: "Home",
              href: "#",
              active: true,
              icon: undefined,
            },
            {
              text: "New Article",
              href: "#/signin",
              active: false,
              icon: "ion-compose",
            },
            {
              text: "Settings",
              href: "#/signup",
              active: false,
              icon: "ion-gear-a",
            },
            {
              text: `${user.username}`,
              href: `#/profile/${user.username}`,
              active: false,
              icon: undefined,
            },
          ]
        : [
            {
              text: "Home",
              href: "#",
              active: false,
              icon: undefined,
            },
            {
              text: "Sign in",
              href: "#/signin",
              active: false,
              icon: undefined,
            },
            {
              text: "Sign up",
              href: "#/signup",
              active: false,
              icon: undefined,
            },
          ],
    },
    routes: {
      "/": ConduitPagesHome,
      "/articles/:slug": ConduitPagesArticlesDetails,
      "*": ConduitPagesHome,
    },
  }));

const start = (state) => Promise.resolve(Object.assign(state));

const getUser = () =>
  Promise.resolve(
    {
      username: "gcarrillo",
      bio: null,
      image: "https://static.productionready.io/images/smiley-cyrus.jpg",
      following: false,
    } && false
  );

export default {
  init,
  start,
  getUser,
};
