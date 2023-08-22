## Surveyor.ai - Surveys Powered by ChatGPT 🚀

![Surveyor Banner](./assets/banner.png)

> Unlock the full potential of conversational surveys with __surveyor.ai__. Collect insights through questions generated and analyzed by ChatGPT, all with a simple, user-friendly API and CLI. It's like having a skilled survey conductor at your fingertips!

### 🌟 Features

- Robust API: Quickly create customized surveys in just a few lines of code.
- CLI Support: Run the same survey from your command line and export the results as CSV.
- Context-Sensitive: Add a context for your survey for targeted questioning.
- Geo-Fenced: Target your survey to specific regions.
- Multiple Question Types: Support for single-choice, multi-choice, and open-ended questions.
- Built-in Demographics: Collect demographic data seamlessly.
- Powered by ChatGPT: Leverage the intelligence of ChatGPT for smarter, conversational surveys.
  
### ⚙️ Install

#### As a Library

```bash
npm install surveyor.ai
```

#### As a CLI Tool

```bash
npm install -g surveyor.ai
```

### 📚 How to Use

#### As a Library

Creating a survey is as simple as:

```ts
import { SurveyBuilder, QuestionTypes, SurveyRegions, use } from "surveyor.ai"

const survey = new SurveyBuilder()
    .context("Recently the covid pandemic has been spreading across the world.")
    .question("Who would you vote for in the next election?")
    .region(SurveyRegions.GERMANY)
    .type(QuestionTypes.SELECT)
    .demographics(true)
    .options(["Afd", "CDU", "SPD", "FDP", "Grüne", "Linke", "Piraten", "Sonstige"])
    .amount(10)
    .build();

for await (const answer of survey()) {
    // Do something with the answers
}
```

#### As a CLI Tool

Run your survey from the terminal:

```bash
AZURE_OPENAI_ENDPOINT=<YOUR-ENDPOINT> AZURE_OPENAI_KEY=<YOUR-KEY> surveyor --question 'Wenn am nächsten Sonntag Bundestagswahl wäre, wen würden Sie wählen?' select 'CDU/CSU, SPD, Grüne, FPD, Die Linke, AfD, Sonstige' --amount 10
```

You can also export the data to a specific place with --path:

```bash
AZURE_OPENAI_ENDPOINT=<YOUR-ENDPOINT> AZURE_OPENAI_KEY=<YOUR-KEY>  surveyor --question 'Wenn am nächsten Sonntag Bundestagswahl wäre, wen würden Sie wählen?' select 'CDU/CSU, SPD, Grüne, FPD, Die Linke, AfD, Sonstige' --amount 10 --path ./path/to/export.csv
```

### 📦 API Documentation

#### Common options

- SurveyBuilder
  - .context(string)
  - .question(string)
  - .region(enum)
  - .type(enum)
  - .aiChatServiceOptions(
    - type: enum(["AzureOpenAI", "OpenAI"]),<br>
    - temperature: number(0, 1),<br>
    - model: string,<br>
    - endpoint: string,<br>
    - key: string,<br>
    - deploymentName: string<br>
  )
  - .demographics(bool)
  - .amount(number)
  - .build()

#### *Select* (type=`QuestionTypes.SELECT`) survey

- SurveyBuilder
  - .options(array)

### 🤝 Contributing

Feel free to contribute to this project by opening issues or submitting a pull request.

### 📜 License

MIT

🚀 Ready to unleash the power of conversational surveys? Start using surveyor.ai today!
