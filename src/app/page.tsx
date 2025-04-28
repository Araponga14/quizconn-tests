import QuizStats from "./components/QuizStats";
import NotificationPopover from "./components/NotificationPopover";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          Bem-vindo, Professor!
        </h1>
        <NotificationPopover />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800">
            Criar Novo Quiz
          </h2>
          <p className="mt-2 text-gray-600">
            Crie um novo quiz para seus alunos responderem
          </p>
          <Link
            href="/pages/criar-quiz"
            className="mt-4 flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <PlusCircleIcon className="h-5 w-5" />
            <span>Criar Quiz</span>
          </Link>
        </div>

        <QuizStats />
      </div>
    </div>
  );
}
