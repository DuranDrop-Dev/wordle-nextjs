import Link from "next/link";

const Terms = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-950 px-4 py-12">
      <section className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-green-300">Terms</p>
        <h1 className="text-5xl font-black leading-tight sm:text-6xl">Terms & Conditions</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
          These terms describe the basic rules for using this Wordle-style game and account features.
        </p>

        <div className="mt-10 grid gap-5">
          <section className="rounded-md border border-gray-800 bg-gray-950 p-6">
            <h2 className="text-xl font-black text-white">Use Of The Game</h2>
            <p className="mt-3 leading-7 text-gray-300">
              You may use this app for personal entertainment. Do not attempt to disrupt the service, abuse API
              endpoints, interfere with other users, or use the app for unlawful activity.
            </p>
          </section>

          <section className="rounded-md border border-gray-800 bg-gray-950 p-6">
            <h2 className="text-xl font-black text-white">Accounts</h2>
            <p className="mt-3 leading-7 text-gray-300">
              Account access is provided through Firebase authentication. You are responsible for keeping your sign-in
              method secure. Stats are associated with your authenticated user account.
            </p>
          </section>

          <section className="rounded-md border border-gray-800 bg-gray-950 p-6">
            <h2 className="text-xl font-black text-white">Stats And Availability</h2>
            <p className="mt-3 leading-7 text-gray-300">
              The app saves win and loss totals when available, but no guarantee is made that stats will always be
              available, error-free, or preserved indefinitely.
            </p>
          </section>

          <section className="rounded-md border border-gray-800 bg-gray-950 p-6">
            <h2 className="text-xl font-black text-white">Wordle Reference</h2>
            <p className="mt-3 leading-7 text-gray-300">
              This is an independent Wordle-style project. It is not affiliated with, endorsed by, or sponsored by the
              original Wordle creators or owners.
            </p>
          </section>

          <section className="rounded-md border border-gray-800 bg-gray-950 p-6">
            <h2 className="text-xl font-black text-white">Changes</h2>
            <p className="mt-3 leading-7 text-gray-300">
              These terms may be updated as the app changes. Continued use of the app after updates means you accept the
              current terms.
            </p>
          </section>
        </div>

        <Link
          className="mt-10 inline-flex rounded-md border border-green-300 bg-green-400 px-7 py-3 text-base font-black text-black shadow-[0_10px_30px_rgba(74,222,128,0.18)] transition-all ease-in-out hover:-translate-y-0.5 hover:bg-white"
          href="/login"
        >
          Back to Login
        </Link>
      </section>
    </main>
  );
};

export default Terms;
