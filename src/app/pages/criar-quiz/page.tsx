"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Question } from "../../types/question";

export default function CriarQuiz() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      statement: "",
      options: [
        { id: "1", text: "", isCorrect: false },
        { id: "2", text: "", isCorrect: false },
        { id: "3", text: "", isCorrect: false },
      ],
    },
  ]);
  const [showDeadlineModal, setShowDeadlineModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [deadline, setDeadline] = useState(() => {
    const date = new Date();
    date.setHours(date.getHours() + 2);
    return date.toISOString().slice(0, 16);
  });

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now().toString(),
        statement: "",
        options: [
          { id: "1", text: "", isCorrect: false },
          { id: "2", text: "", isCorrect: false },
          { id: "3", text: "", isCorrect: false },
        ],
      },
    ]);
  };

  const removeQuestion = (questionId: string) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  const updateQuestionStatement = (questionId: string, statement: string) => {
    setQuestions(
      questions.map((q) => (q.id === questionId ? { ...q, statement } : q))
    );
  };

  const addOption = (questionId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [
                ...q.options,
                { id: Date.now().toString(), text: "", isCorrect: false },
              ],
            }
          : q
      )
    );
  };

  const removeOption = (questionId: string, optionId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.filter((o) => o.id !== optionId),
            }
          : q
      )
    );
  };

  const updateOptionText = (
    questionId: string,
    optionId: string,
    text: string
  ) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) =>
                o.id === optionId ? { ...o, text } : o
              ),
            }
          : q
      )
    );
  };

  const setCorrectOption = (questionId: string, optionId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) => ({
                ...o,
                isCorrect: o.id === optionId,
              })),
            }
          : q
      )
    );
  };

  const handleSubmit = () => {
    setShowDeadlineModal(true);
  };

  const handleConfirmSubmit = () => {
    // Aqui você implementará a lógica para salvar o quiz
    console.log("Quiz salvo com prazo:", deadline);
    console.log(questions);
    router.push("/");
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Criar Novo Quiz</h1>
          <div className="flex space-x-4">
            <button
              onClick={handleCancel}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Salvar Quiz
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  Questão {index + 1}
                </h2>
                <button
                  onClick={() => removeQuestion(question.id)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>

              <textarea
                value={question.statement}
                onChange={(e) =>
                  updateQuestionStatement(question.id, e.target.value)
                }
                placeholder="Digite o enunciado da questão"
                className="mb-4 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                rows={3}
              />

              <div className="space-y-4">
                {question.options.map((option, optionIndex) => (
                  <div key={option.id} className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={option.isCorrect}
                      onChange={() => setCorrectOption(question.id, option.id)}
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-lg font-medium text-gray-700">
                      {String.fromCharCode(65 + optionIndex)})
                    </span>
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) =>
                        updateOptionText(question.id, option.id, e.target.value)
                      }
                      placeholder="Digite a opção de resposta"
                      className="flex-1 rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                    />
                    {question.options.length > 3 && (
                      <button
                        onClick={() => removeOption(question.id, option.id)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => addOption(question.id)}
                className="mt-4 flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Adicionar opção</span>
              </button>
            </div>
          ))}

          <button
            onClick={addQuestion}
            className="flex w-full items-center justify-center space-x-2 rounded-lg border-2 border-dashed border-gray-300 p-4 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Adicionar questão</span>
          </button>
        </div>
      </div>

      {/* Modal de Prazo */}
      {showDeadlineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              Definir Prazo
            </h3>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="mb-4 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeadlineModal(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cancelamento */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              Cancelar Criação
            </h3>
            <p className="mb-4 text-gray-600">
              Tem certeza que deseja cancelar a criação do quiz? Todas as
              alterações serão perdidas.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Não
              </button>
              <button
                onClick={handleConfirmCancel}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Sim, Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
