import { useRef, useContext } from "react";
import { currencyFormatter } from "@/lib/utils";
import { financeContext } from "@/lib/store/finance-context";
import { authContext } from "@/lib/store/auth-context";
import { format } from "date-fns-tz";

// Icons
import { FaRegTrashAlt } from "react-icons/fa";

import Modal from "@/components/Modal";

import { toast } from "react-toastify";

function AddIncomeModal({ show, onClose }) {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const { income, addIncomeItem, removeIncomeItem } =
    useContext(financeContext);

  const { user } = useContext(authContext);

  // Handler Functions
  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
      uid: user.uid,
    };

    try {
      await addIncomeItem(newIncome);
      descriptionRef.current.value = "";
      amountRef.current.value = "";
      toast.success("Income added successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteIncomeEntryHandler = async (incomeId) => {
    try {
      await removeIncomeItem(incomeId);
      toast.success("Income deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <form onSubmit={addIncomeHandler} className="flex flex-col gap-4">
        <div className="input-group">
          <label htmlFor="amount">Income Amount</label>
          <input
            type="number"
            name="amount"
            ref={amountRef}
            min={1}
            placeholder="Enter income amount"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="description">Description</label>
          <input
            name="description"
            ref={descriptionRef}
            type="text"
            placeholder="Enter income description"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add entry
        </button>
      </form>

      <div className="flex flex-col gap-4 mt-6 max-h-[calc(30vh-1rem)] overflow-y-auto pr-2">
        <h3 className="text-2xl font-bold">Income History</h3>

        {[...income]
          .sort((a, b) => {
            const aTime = a.createdAt.toMillis
              ? a.createdAt.toMillis()
              : new Date(a.createdAt).getTime();
            const bTime = b.createdAt.toMillis
              ? b.createdAt.toMillis()
              : new Date(b.createdAt).getTime();
            return bTime - aTime;
          })
          .map((i) => {
            const taiwanDate = format(
              i.createdAt,
              "yyyy-MM-dd'T'HH:mm:ss.SSSXXX",
              { timeZone: "Asia/Taipei" }
            );
            return (
              <div className="flex justify-between item-center" key={i.id}>
                <div>
                  <p className="font-semibold">{i.description}</p>
                  <small className="text-xs">{taiwanDate}</small>{" "}
                </div>
                <p className="flex items-center gap-2">
                  {currencyFormatter(i.amount)}
                  <button
                    onClick={() => {
                      deleteIncomeEntryHandler(i.id);
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

export default AddIncomeModal;
