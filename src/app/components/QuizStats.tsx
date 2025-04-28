import { ChartBarIcon } from "@heroicons/react/24/outline";

const QuizStats = () => {
  // Dados mockados para exemplo
  const stats = {
    totalAlunos: 30,
    alunosEntregaram: 25,
    tituloQuiz: "Quiz de Matemática",
  };

  const porcentagem = (stats.alunosEntregaram / stats.totalAlunos) * 100;

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Último Quiz</h3>
        <ChartBarIcon className="h-6 w-6 text-gray-600" />
      </div>
      <p className="mt-2 text-sm text-gray-600">{stats.tituloQuiz}</p>
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Alunos que entregaram</span>
          <span>
            {stats.alunosEntregaram}/{stats.totalAlunos}
          </span>
        </div>
        <div className="mt-2 h-4 w-full rounded-full bg-gray-200">
          <div
            className="h-4 rounded-full bg-blue-600"
            style={{ width: `${porcentagem}%` }}
          />
        </div>
        <p className="mt-2 text-right text-sm text-gray-600">
          {porcentagem.toFixed(1)}% de entrega
        </p>
      </div>
    </div>
  );
};

export default QuizStats;
