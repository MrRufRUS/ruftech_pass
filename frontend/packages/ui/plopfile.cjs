module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "Создание нового компонента из базового шаблона",
    prompts: [
      {
        type: "input",
        name: "component",
        message: "Введите название компонента (kebab-case/PascalCase):",
      },
    ],
    actions: (_data) => {
      const actions = [
        {
          type: "add",
          path: "src/components/{{kebabCase component}}/{{kebabCase component}}.module.css",
          templateFile: "_templates/components/styles.module.css.hbs",
        },
        {
          type: "add",
          path: "src/components/{{kebabCase component}}/{{kebabCase component}}.tsx",
          templateFile: "_templates/components/component.tsx.hbs",
        },
        {
          type: "add",
          path: "src/components/{{kebabCase component}}/index.ts",
          templateFile: "_templates/components/index.ts.hbs",
        },
        {
          type: "add",
          path: "src/components/{{kebabCase component}}/{{kebabCase component}}.stories.tsx",
          templateFile: "_templates/components/component.stories.tsx.hbs",
        },
      ];

      return actions;
    },
  });
};
