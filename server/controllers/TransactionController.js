import Transaction from "../models/Transaction.js";

const index = async (req, res) => {
  // const transaction = await Transaction.find({ user_id: req.user._id }).sort({
  //   createdAt: -1,
  // });
  const demo = await Transaction.aggregate([
    {
      $match: { user_id: req.user._id },
    },
    {
      $group: {
        _id: { $month: "$date" },
        transactions: {
          $push: {
            amount: "$amount",
            description: "$description",
            date: "$date",
          },
        },
        totalExpenses: { $sum: "$amount" },
      },
    },
  ]);
  res.json({ data: demo });
};

const createTransaction = async (req, res) => {
  const { amount, description, date, category_id } = req.body;
  const transaction = new Transaction({
    amount,
    description,
    user_id: req.user._id,
    date,
    category_id,
  });

  await transaction.save();
  res.json({ message: "Success" });
};

const deleteTransaction = async (req, res) => {
  await Transaction.findOneAndDelete({ _id: req.params.id });
  res.json({ message: "Successfully Deleted" });
};

const updateTransaction = async (req, res) => {
  await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
  res.json({ message: "Updated Successfully" });
};

export { index, createTransaction, deleteTransaction, updateTransaction };
