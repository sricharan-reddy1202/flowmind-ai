const {
  generateAIResponse,
} = require("../services/aiService");

const executeWorkflow = async (req, res) => {
  try {
    const { input, workflowType } = req.body;

    if (!input || !workflowType) {
      return res.status(400).json({
        success: false,
        message: "Input and workflowType are required",
      });
    }

    let prompt = "";

    if (workflowType === "summarizer") {
      prompt = `
      Summarize the following content clearly:

      ${input}
      `;
    }

    else if (workflowType === "interview") {
      prompt = `
      Generate interview questions from:

      ${input}
      `;
    }

    else if (workflowType === "notes") {
      prompt = `
      Create structured study notes from:

      ${input}
      `;
    }

    const aiResponse =
      await generateAIResponse(prompt);

    res.status(200).json({
      success: true,
      response: aiResponse,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  executeWorkflow,
};