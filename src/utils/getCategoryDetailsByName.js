import categories from "../../assets/data/categories";

export const getCategoryDetailsByName = (themeName) => {
  const category = categories.find((cat) => cat.name === themeName);
  return category;
};
