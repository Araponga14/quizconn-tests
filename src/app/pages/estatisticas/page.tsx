"use client";

import { useState } from "react";
import { ChartBarIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface AlunoStats {
  id: string;
  nome: string;
  quizzesEntregues: number;
  totalQuizzes: number;
  notas: {
    quizId: string;
    quizTitle: string;
    nota: number;
  }[];
}

export default function Estatisticas() {
  const [selectedAluno, setSelectedAluno] = useState<AlunoStats | null>(null);

  // Dados mockados para exemplo
  const alunos: AlunoStats[] = [
    {
      id: "1",
      nome: "João Silva",
      quizzesEntregues: 5,
      totalQuizzes: 6,
      notas: [
        {
          quizId: "1",
          quizTitle: "Quiz de Matemática",
          nota: 0.8,
        },
        {
          quizId: "2",
          quizTitle: "Quiz de História",
          nota: 0.9,
        },
      ],
    },
    {
      id: "2",
      nome: "Maria Santos",
      quizzesEntregues: 6,
      totalQuizzes: 6,
      notas: [
        {
          quizId: "1",
          quizTitle: "Quiz de Matemática",
          nota: 0.7,
        },
        {
          quizId: "2",
          quizTitle: "Quiz de História",
          nota: 0.85,
        },
      ],
    },
  ];

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        Estatísticas da Turma
      </h1>

      <div className="space-y-4">
        {alunos.map((aluno) => (
          <div
            key={aluno.id}
            className="cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            onClick={() => setSelectedAluno(aluno)}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                {aluno.nome}
              </h2>
              <ChartBarIcon className="h-6 w-6 text-gray-600" />
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Quizzes entregues</span>
                <span>
                  {aluno.quizzesEntregues}/{aluno.totalQuizzes}
                </span>
              </div>
              <div className="mt-2 h-4 w-full rounded-full bg-gray-200">
                <div
                  className="h-4 rounded-full bg-blue-600"
                  style={{
                    width: `${
                      (aluno.quizzesEntregues / aluno.totalQuizzes) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Estatísticas do Aluno */}
      {selectedAluno && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">
                Estatísticas: {selectedAluno.nome}
              </h3>
              <button
                onClick={() => setSelectedAluno(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="mb-2 text-lg font-medium text-gray-800">
                Quizzes Entregues
              </h4>
              <div className="flex items-center space-x-4">
                <div className="h-4 w-full rounded-full bg-gray-200">
                  <div
                    className="h-4 rounded-full bg-green-600"
                    style={{
                      width: `${
                        (selectedAluno.quizzesEntregues /
                          selectedAluno.totalQuizzes) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {(
                    (selectedAluno.quizzesEntregues /
                      selectedAluno.totalQuizzes) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-medium text-gray-800">
                Notas por Quiz
              </h4>
              <div className="space-y-4">
                {selectedAluno.notas.map((nota) => (
                  <div key={nota.quizId}>
                    <p className="mb-2 text-sm text-gray-600">
                      {nota.quizTitle}
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="h-4 w-full rounded-full bg-gray-200">
                        <div
                          className="h-4 rounded-full bg-blue-600"
                          style={{
                            width: `${nota.nota * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {(nota.nota * 100).toFixed(1)}%
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
