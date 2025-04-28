"use client";

import { useState } from "react";
import { ChartBarIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface QuizStats {
  id: string;
  title: string;
  totalAlunos: number;
  alunosEntregaram: number;
  questoes: {
    id: string;
    statement: string;
    taxaAcerto: number;
  }[];
  mediaAcertos: number;
}

export default function Quizzes() {
  const [selectedQuiz, setSelectedQuiz] = useState<QuizStats | null>(null);

  // Dados mockados para exemplo
  const quizzes: QuizStats[] = [
    {
      id: "1",
      title: "Quiz de Matemática",
      totalAlunos: 30,
      alunosEntregaram: 25,
      questoes: [
        {
          id: "1",
          statement: "Qual é a raiz quadrada de 16?",
          taxaAcerto: 0.8,
        },
        {
          id: "2",
          statement: "Resolva a equação: 2x + 5 = 15",
          taxaAcerto: 0.6,
        },
      ],
      mediaAcertos: 0.7,
    },
    {
      id: "2",
      title: "Quiz de História",
      totalAlunos: 30,
      alunosEntregaram: 28,
      questoes: [
        {
          id: "1",
          statement: "Em que ano começou a Primeira Guerra Mundial?",
          taxaAcerto: 0.9,
        },
        {
          id: "2",
          statement: "Quem foi o primeiro presidente do Brasil?",
          taxaAcerto: 0.75,
        },
      ],
      mediaAcertos: 0.825,
    },
  ];

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Meus Quizzes</h1>

      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            onClick={() => setSelectedQuiz(quiz)}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                {quiz.title}
              </h2>
              <ChartBarIcon className="h-6 w-6 text-gray-600" />
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Alunos que entregaram</span>
                <span>
                  {quiz.alunosEntregaram}/{quiz.totalAlunos}
                </span>
              </div>
              <div className="mt-2 h-4 w-full rounded-full bg-gray-200">
                <div
                  className="h-4 rounded-full bg-blue-600"
                  style={{
                    width: `${
                      (quiz.alunosEntregaram / quiz.totalAlunos) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Estatísticas */}
      {selectedQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">
                Estatísticas: {selectedQuiz.title}
              </h3>
              <button
                onClick={() => setSelectedQuiz(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="mb-2 text-lg font-medium text-gray-800">
                Média de Acertos da Turma
              </h4>
              <div className="flex items-center space-x-4">
                <div className="h-4 w-full rounded-full bg-gray-200">
                  <div
                    className="h-4 rounded-full bg-green-600"
                    style={{ width: `${selectedQuiz.mediaAcertos * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {(selectedQuiz.mediaAcertos * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-medium text-gray-800">
                Taxa de Acerto por Questão
              </h4>
              <div className="space-y-4">
                {selectedQuiz.questoes.map((questao) => (
                  <div key={questao.id}>
                    <p className="mb-2 text-sm text-gray-600">
                      {questao.statement}
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="h-4 w-full rounded-full bg-gray-200">
                        <div
                          className="h-4 rounded-full bg-blue-600"
                          style={{
                            width: `${questao.taxaAcerto * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {(questao.taxaAcerto * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
