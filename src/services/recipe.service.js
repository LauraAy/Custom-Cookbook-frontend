import http from "../http-common";

const getAll = () => {
  return http.get("/recipes");
};

const get = id => {
  return http.get(`/recipes/${id}`);
};

const getWithRegions = id => {
return http.get('recipes/regions/${id}');
}

const create = data => {
  return http.post("/recipes", data);
};

const update = (id, data) => {
  return http.put(`/recipes/${id}`, data);
};

const remove = id => {
  return http.delete(`/recipes/${id}`);
};

const removeAll = () => {
  return http.delete(`/recipes`);
};

const findByTitle = title => {
  return http.get(`/recipes?title=${title}`);
};

const getUserRecipes = (id) => {
  return http.get(`/users/recipes/${id}`);
}
const RecipeService = {
  getAll,
  get,
  getWithRegions,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  getUserRecipes
};

export default RecipeService;