export default {
  emojis: false,

  types: {
    feat: { title: "Features" },
    fix: { title: "Bug Fixes" },
    perf: { title: "Performance" },
    refactor: { title: "Refactoring" },
    test: { title: "Tests" },
    docs: { title: "Documentation" },
    chore: false,
    ci: false,
    build: false,
  },

  contributors: true,

  commitUrlFormat: "{{host}}/{{owner}}/{{repository}}/commit/{{hash}}",
  compareUrlFormat:
    "{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}",
};
