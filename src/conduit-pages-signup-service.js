import ConduitAppService from "./conduit-app-service";

const state = {
  username: "",
  password: "",
  email: "",
  errors: undefined,
};

const init = () => Promise.resolve(Object.assign({}, state));

const signup = (input) =>
  fetch("https://conduit.productionready.io/api/users", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      user: {
        email: input.email,
        password: input.password,
        username: input.username,
      },
    }),
  }).then((response) =>
    !response.ok
      ? response.json().then((response) => console.log(response))
      : input
  );

export default {
  init,
  signup,
};
