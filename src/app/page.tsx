import Link from 'next/link';

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Gerencie suas tarefas com</span>
          <span className="block text-primary-600">IA Inteligente</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
          TaskFlow AI ajuda você a organizar, priorizar e concluir suas tarefas diárias de forma mais eficiente com o poder da inteligência artificial.
        </p>
        <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link
              href="/register"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-8 py-3 text-base font-medium text-white hover:bg-primary-700 md:py-4 md:px-10 md:text-lg"
            >
              Comece Grátis
            </Link>
          </div>
          <div className="mt-3 rounded-md shadow sm:ml-3 sm:mt-0">
            <Link
              href="/login"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-primary-600 hover:bg-gray-50 md:py-4 md:px-10 md:text-lg dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              Entrar
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary-100 text-primary-600 dark:bg-primary-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Priorização Inteligente</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Nossa IA analisa suas tarefas e sugere prioridades com base em prazos e contexto.
            </p>
          </div>

          <div className="card">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-green-100 text-green-600 dark:bg-green-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Interface Limpa</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Design minimalista que ajuda você a focar no que realmente importa: suas tarefas.
            </p>
          </div>

          <div className="card">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-purple-100 text-purple-600 dark:bg-purple-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Personalização</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Adapte o TaskFlow ao seu fluxo de trabalho com categorias e lembretes personalizados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
