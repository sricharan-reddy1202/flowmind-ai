import { useState } from "react";
import axios from "axios";

import WorkflowCard from "../components/WorkflowCard";

function DashboardPage() {

  const [input, setInput] =
    useState("");

  const [response, setResponse] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const executeWorkflow = async (
    workflowType
  ) => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/workflow/execute",

        {
          input,
          workflowType,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResponse(res.data.response);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-10">
        FlowMind AI 🚀
      </h1>

      <textarea
        placeholder="Enter your content..."
        value={input}
        onChange={(e) =>
          setInput(e.target.value)
        }

        className="w-full h-40 bg-zinc-900 p-5 rounded-2xl"
      />

      <div className="grid grid-cols-3 gap-5 mt-8">

        <WorkflowCard
          title="AI Summarizer"
          onClick={() =>
            executeWorkflow(
              "summarizer"
            )
          }
        />

        <WorkflowCard
          title="Interview Generator"
          onClick={() =>
            executeWorkflow(
              "interview"
            )
          }
        />

        <WorkflowCard
          title="AI Notes Generator"
          onClick={() =>
            executeWorkflow(
              "notes"
            )
          }
        />

      </div>

      <div className="mt-10 bg-zinc-900 p-6 rounded-2xl">

        <h2 className="text-2xl font-semibold mb-4">
          AI Response
        </h2>

        {
          loading
            ? "Generating..."
            : response
        }

      </div>

    </div>
  );
}

export default DashboardPage;