import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const generateAction = async (req, res) => {
  // Run first prompt
  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Give me a json format file for ${req.body.goal} with the keys: name, amount, timeframe of ${req.body.time}, without any text or explanation before or after the code, with the amount in INR.\n`,
    temperature: 0.7,
    max_tokens: 500,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
