import React, { useState, useEffect } from "react";
import QrReader from "react-web-qr-reader";
import {
  Button,
  createStyles,
  SegmentedControl,
  Textarea,
  NumberInput,
} from "@mantine/core";
import Link from "next/link";
import Router from "next/router";
import { expense, addExpense } from "@/utils/expense.js";
import uuid from "react-uuid";
import { onAuthStateChanged } from "@/utils/auth";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]
    }`,
  },

  active: {
    background: theme.black,
  },

  control: {
    border: "0 !important",
  },

  labelActive: {
    color: `${theme.white} !important`,
  },
}));

const Scan = () => {
  const { classes } = useStyles();
  const [result, setResult] = useState("No result");
  const [category, setCategory] = useState("Shopping");
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  const [payee, setPayee] = useState({
    upi: false,
    name: false,
    amount: false,
    date: currentDate,
  });
  const [amount, setAmount] = useState(false);
  const [upiUrl, setUpiUrl] = useState(null);
  const [note, setNote] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged((user) => {
      setUser(user);
    });
    console.log(user);
  }, []);

  const delay = 500;
  const previewStyle = {
    height: 240,
    width: 320,
  };

  const handleScan = (result) => {
    if (result) {
      const url = new URL(result.data);
      setPayee({
        ...payee,
        upi: url.searchParams.get("pa"),
        name: url.searchParams.get("pn"),
        amount: false,
      });
      setUpiUrl(url);
      console.log(url.searchParams.get("pa"));
      setResult(JSON.stringify(result));
    }
  };

  const handleError = (error) => {
    console.log(error);
  };

  const handleSubmit = () => {
    let temp = payee.upiUrl;
    temp.searchParams.append("am", amount);
    if (note) {
      temp.searchParams.append("tn", note);
    }

    Router.push(temp.href);
    save();
  };

  async function save() {
    const { upiUrl, ...rest } = payee;
    const response = await addExpense(rest, user.uid);
    console.log(response);
    if (response) {
        Router.push("/");
      console.log("hey");
    }
  }
  return (
    <>
      <section className="w-full h-full items-center flex flex-col p-5 pt-0 gap-4 justify-between">
        <div className="w-full grow flex flex-col items-center py-4 pt-0 h-80">
          {payee.upi ? (
            <>
              <div className="grow flex flex-col gap-10 w-full items-center justify-center">
                <img
                  className="w-20 h-20 border rounded-full"
                  src="https://cdn.discordapp.com/avatars/720862118244515860/15460e9328036466028b68522ee422ab.png?size=1024"
                />
                <div className="inline-flex flex-col space-y-1 items-center text-center justify-end w-40 h-12">
                  <p className="text-lg font-semibold tracking-wide leading-relaxed text-gray-800">
                    {payee.name}
                  </p>
                  <p className="text-sm font-medium tracking-wide leading-snug text-gray-400">
                    {payee.upi}
                  </p>
                </div>
              </div>
              <NumberInput
                defaultValue={null}
                placeholder="100"
                label="Enter Amount"
                radius="md"
                size="lg"
                withAsterisk
                onChange={(value) => {
                  setAmount(value);
                  upiUrl.searchParams.append("am", value);
                  setPayee({
                    ...payee,
                    amount: value,
                    upiUrl: upiUrl,
                    category: category,
                  });
                }}
                value={amount}
              />
            </>
          ) : (
            <>
              <h1 className="text-lg font-semibold p-2">Scan the QR code</h1>
              <QrReader
                delay={delay}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
                className="h-64"
              />
            </>
          )}
        </div>
        <SegmentedControl
          radius="xl"
          size="xs"
          value={category}
          onChange={(value) => {
            setCategory(value);
            setPayee({ ...payee, category: value });
          }}
          data={["Shopping", "Food", "Travel", "Fun", "Medical", "Other"]}
          classNames={classes}
        />
        {/* <p>{result}</p> */}
        <Textarea
          placeholder="Some random restaruant"
          label="Add a Note"
          size="md"
          styles={{
            input: {
              "&:hover": { borderColor: "black" },
              "&:focus": { borderColor: "black" },
              background: "none",
              borderWidth: "2px",
            },
          }}
          className="w-full"
          value={note}
          onChange={(event) => {
            setNote(event.currentTarget.value);
          }}
        />
        <Link href="/" className="font-bold text-blue-500">
          Paid using cash ?
        </Link>
        <Button
          color="dark"
          size="lg"
          styles={{ root: { width: "100%" } }}
          disabled={!payee.amount}
          onClick={handleSubmit}
        >
          Pay {payee.amount && `₹${payee.amount}`}
        </Button>
      </section>
    </>
  );
};

export default Scan;
