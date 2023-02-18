import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { Button, NumberInput, Textarea } from "@mantine/core";
import { StatsRingCard } from "@/components/StatsRingCard";
const Goal = () => {
  const [apiOutput, setApiOutput] = useState(null);
  const [goal, setGoal] = useState("");
  const [time, setTime] = useState(null);
  function onUserChangedGoal(event) {
    setGoal(event.target.value);
  }

  const callGenerateEndpoint = async (e) => {
    e.preventDefault();
    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ goal, time }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);
    console.log(output.text);

    setApiOutput(parseInt(output.text));
  };

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={callGenerateEndpoint} className="gap-4 flex flex-col">
        <Textarea
          placeholder="I want to buy an iphone"
          label="Your Goal"
          radius="lg"
          size="lg"
          withAsterisk
          value={goal}
          onChange={onUserChangedGoal}
          styles={{
            input: {
              "&:hover": { borderColor: "black" },
              "&:focus": { borderColor: "black" },
              background: "none",
              borderWidth: "2px",
            },
          }}
          required
        />
        <div className="flex items-end w-full gap-4">
          <NumberInput
            // defaultValue={2}
            placeholder="2 yrs"
            label="Time Period"
            radius="lg"
            size="lg"
            value={time}
            onChange={(value) => setTime(value)}
            withAsterisk
            styles={{
              input: {
                "&:hover": { borderColor: "black" },
                "&:focus": { borderColor: "black" },
                background: "none",
                borderWidth: "2px",
              },
            }}
            required
          />
          <Button
            color="dark"
            radius="md"
            size="lg"
            type="submit"
            styles={{ root: { width: "100%" } }}
          >
            Get Plan
          </Button>
        </div>
      </form>
      {apiOutput && (
        <div className="flex flex-col gap-4">
          <StatsRingCard
            goal="Fixed Deposit"
            totalCost={apiOutput}
            totalTime={time}
            monthly={Math.round(apiOutput / (1 + 0.06 * time))}
            ROI="6%"
          />
          <StatsRingCard
            goal="Recurring Deposit"
            totalCost={apiOutput}
            totalTime={time}
            monthly={Math.round(apiOutput /  (1 + (0.055))**(time * 4))}
            ROI="5.5%"
          />
        </div>
      )}
    </div>
  );
};
export default Goal;
