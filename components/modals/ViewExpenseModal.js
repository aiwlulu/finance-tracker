import { useContext } from "react";
import { financeContext } from "@/lib/store/finance-context";
import Modal from "@/components/Modal";
import { currencyFormatter } from "@/lib/utils";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { format } from "date-fns-tz";

function ViewExpenseModal({ show, onClose, expense }) {
  const { deleteExpenseItem, deleteExpenseCategory } =
    useContext(financeContext);

  const deleteExpenseHandler = async () => {
    try {
      await deleteExpenseCategory(expense.id);
      toast.success("Expense category deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteExpenseItemHandler = async (item) => {
    try {
      //  Remove the item from the list
      const updatedItems = expense.items.filter((i) => i.id !== item.id);

      // Update the expense balance
      const updatedExpense = {
        items: [...updatedItems],
        total: expense.total - item.amount,
      };

      await deleteExpenseItem(updatedExpense, expense.id);
      toast.success("Expense item removed successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl">{expense.title}</h2>
        <button onClick={deleteExpenseHandler} className="btn btn-danger">
          Delete
        </button>
      </div>

      <div>
        <h3 className="my-4 text-2xl">Expense History</h3>
        {[...expense.items]
          .sort((a, b) => {
            const aDate = a.createdAt.toMillis
              ? a.createdAt.toMillis()
              : new Date(a.createdAt).getTime();
            const bDate = b.createdAt.toMillis
              ? b.createdAt.toMillis()
              : new Date(b.createdAt).getTime();
            return bDate - aDate;
          })
          .map((item) => {
            const taiwanDate = format(
              item.createdAt.toMillis
                ? new Date(item.createdAt.toMillis())
                : item.createdAt,
              "yyyy-MM-dd'T'HH:mm:ss.SSSXXX",
              { timeZone: "Asia/Taipei" }
            );

            return (
              <div key={item.id} className="flex items-center justify-between">
                <small>{taiwanDate}</small>
                <p className="flex items-center gap-2">
                  {currencyFormatter(item.amount)}
                  <button
                    onClick={() => {
                      deleteExpenseItemHandler(item);
                    }}
                  >
                    <FaRegTrashAlt />
                  </button>
                </p>
              </div>
            );
          })}
      </div>
    </Modal>
  );
}

export default ViewExpenseModal;
