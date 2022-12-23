import UserModel from "../models/UserModel.js";

const destroy = async (req, res) => {
  const categories = req.user.categories;
  const id = req.params.id;
  const newCategories = categories.filter((category) => category._id != id);

  const user = await UserModel.updateOne(
    { _id: req.user.id },
    { $set: { categories: newCategories } }
  );
  res.json({ user });
};

const createCategory = async (req, res) => {
  const { label, icon } = req.body;
  const user = await UserModel.updateOne(
    { _id: req.user.id },
    { $set: { categories: [...req.user.categories, { label, icon }] } }
  );

  res.json(user);
};

const editCategory = async (req, res) => {
  const { label, icon } = req.body;
  const user = await UserModel.updateOne(
    { _id: req.user.id },
    {
      $set: {
        categories: req.user.categories.map((cat) =>
          cat.id == req.params.id ? { label, icon } : cat
        ),
      },
    }
  );

  res.json(user);
};

export { destroy, createCategory, editCategory };
