import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Textarea } from "@mantine/core";

export default function Goal() {
  const [apiOutput, setApiOutput] = useState("");
  const [goal, setGoal] = useState("");
  const [time, setTime] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  function onUserChangedGoal(event) {
    setGoal(event.target.value);
  }
  function onUserChangedTime(event) {
    setTime(event.target.value);
  }
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

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

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  return (
    <div>
      <div>
        <Textarea
          placeholder="What is your goal?"
          value={goal}
          onChange={onUserChangedGoal}
        />
        <Textarea value={time} onChange={onUserChangedTime} />
        <Button onClick={callGenerateEndpoint} />
      </div>
      {apiOutput && (
        <div>
          <p>{apiOutput}</p>
        </div>
      )}
    </div>
  );
}
