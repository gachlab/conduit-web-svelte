import ConduitPagesHome from "./conduit-pages-home.svelte";
import ConduitPagesArticlesArticlesCreate from "./conduit-pages-articles-create.svelte";
import ConduitPagesArticlesDetails from "./conduit-pages-articles-details.svelte";
import ConduitPagesLogin from "./conduit-pages-login.svelte";
import ConduitPagesSignup from "./conduit-pages-signup.svelte";
import ConduitPagesSettings from "./conduit-pages-settings.svelte";
import ConduitPagesProfileDetails from "./conduit-pages-profile-details.svelte";

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
              active: false,
              icon: undefined,
            },
            {
              text: "New Post",
              href: "#/articles/create",
              active: false,
              icon: "ion-compose",
            },
            {
              text: "Settings",
              href: "#/settings",
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
              href: "#/login",
              active: false,
              icon: undefined,
            },
            {
              text: "Sign up",
              href: "#/register",
              active: false,
              icon: undefined,
            },
          ],
    },
    routes: {
      "/": ConduitPagesHome,
      "/articles/create": ConduitPagesArticlesArticlesCreate,
      "/articles/:slug": ConduitPagesArticlesDetails,
      "/login": ConduitPagesLogin,
      "/register": ConduitPagesSignup,
      "/settings": ConduitPagesSettings,
      "/profile/:username": ConduitPagesProfileDetails,
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
