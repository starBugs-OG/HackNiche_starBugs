import React, { useEffect, useState } from "react";
import { RiShoppingCart2Fill, RiCoupon2Line, RiRestaurantLine, RiCarWashingFill, RiEmotionLaughLine, RiHospitalLine, RiRunLine } from "react-icons/ri";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "@/utils/auth";
import { db } from "@/utils/firebaseService";

const expenses = () => {
  const [user, setUser] = useState(null);
  const [expense, setExpenses] = useState(null);
  const data = {
    Shopping: <RiShoppingCart2Fill color="red" size={24} />,
    Food: <RiRestaurantLine color="orange" size={24} />,
    Travel: <RiCarWashingFill color="blue" size={24} />,
    Fun: <RiEmotionLaughLine color="yellow" size={24} />,
    Medical: <RiHospitalLine color="green" size={24} />,
    Other: <RiRunLine color="black" size={24} />,
  };
  useEffect(() => {
    (async () => {
      onAuthStateChanged(async (user) => {
        const docSnap = await getDocs(
          collection(db, "users", user.uid, "expenses")
        );

        let arr = [];
        docSnap.forEach((doc) => {
          arr.push(doc.data());
        });
        setExpenses(arr);
        setUser(user);
      });
    })();
  }, []);

  return (
    <section className="w-full grow flex flex-col gap-5">
      <div className="flex flex-col w-full gap-6">
        <p className="text-base font-semibold tracking-wide leading-normal pb-2 text-gray-800">
          Expense History
        </p>
        {expense &&
          expense.map((doc) => (
            <div className="inline-flex space-x-32 items-center justify-between w-full">
              <div className="flex space-x-3 items-center justify-start">
                <div className="flex w-12 h-12 items-center justify-center flex-1 p-3 bg-gray-200 rounded-xl">
                 {data[doc.category]}
                </div>
                <div className="inline-flex flex-col space-y-0.5 items-start justify-start">
                  <p className="text-sm font-semibold tracking-wide leading-snug text-gray-800">
                    {doc.category}
                  </p>
                  <p className="text-xs font-medium tracking-wide leading-tight text-gray-400">
                    {doc.name}
                  </p>
                </div>
              </div>
              <p className="text-base font-semibold tracking-wide leading-normal text-gray-800">
                ₹{doc.amount}
              </p>
            </div>
          ))}
      </div>
    </section>
  );
};

export default expenses;
