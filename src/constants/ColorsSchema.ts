type baseTheme = Partial<typeof light>;

const light = {
  brancoOpaco: "#FFFFFF33",
};

const dark: baseTheme = {};

export default { light, dark: { ...light, ...dark } };
