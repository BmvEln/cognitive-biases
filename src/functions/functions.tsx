export const ls = {
  get: function (key: string) {
    return JSON.parse(window.localStorage.getItem(key));
  },
  set: function (key: string, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  remove: function (key: string) {
    window.localStorage.removeItem(key);
  },
};
