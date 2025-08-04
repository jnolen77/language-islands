import LanguageIslandForm from "~/components/LanguageIslandForm";
import satzlingTransLogo from "/images/satzling-trans-logo.png"


export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-4 pb-4">
      <div className="flex-1 flex flex-col items-center gap-10 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img
              src={satzlingTransLogo}
              alt="React Router"
              className="block w-full dark:hidden"
            />
            <img
              src={satzlingTransLogo}
              alt="Satzling"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <div className="max-w-[600px] text-center w-full space-y-6 px-4">
          <div className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Generate Language Island</h2>
           <LanguageIslandForm />
          </div>
        </div>
      </div>
    </main>
  );
}

