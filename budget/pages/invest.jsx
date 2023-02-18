import React, { useEffect, useState } from "react";
import { db } from "@/utils/firebaseService";
import { Badge } from "@mantine/core";
import { getDocs, collection } from "firebase/firestore";

const invest = () => {
  const [investments, setInvestments] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const docSnap = await getDocs(collection(db, "Stocks"));

      let arr = [];
      docSnap.forEach((doc) => {
        arr.push(doc.data());
      });
      setInvestments(arr);
    };
    getData();
  }, []);
  return (
    <div className="h-full w-full flex flex-col gap-8">
      {investments &&
        investments.map((doc) => (
          <div className="inline-flex space-x-32 items-center justify-between w-full">
            <div className="flex space-x-3 items-center justify-start">
              <div className="inline-flex flex-col space-y-0.5 items-start justify-start">
                <p className="text-sm font-semibold tracking-wide leading-snug text-gray-800">
                  {doc.Name}
                </p>
                <p className="text-xs font-medium tracking-wide leading-tight text-gray-400">
                  <Badge
                    color={
                      doc.Val < 0.3 ? "green" : doc.Val < 0.6 ? "blue" : "red"
                    }
                  >
                    {doc.Val}
                  </Badge>
                </p>
              </div>
            </div>
            <p className="text-base font-semibold tracking-wide leading-normal text-gray-800">
              {doc.ROI}%
            </p>
            <hr className="w-full"/>
            
          </div>
          
        ))}
    </div>
  );
};

export default invest;
