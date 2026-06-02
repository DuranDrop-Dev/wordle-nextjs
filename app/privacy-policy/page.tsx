import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-950 px-4 py-12">
      <section className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-green-300">Privacy</p>
        <h1 className="text-5xl font-black leading-tight sm:text-6xl">Privacy Policy</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
          This policy explains what information this app uses to provide login and saved game stats.
        </p>

        <div className="mt-10 grid gap-5">
          <section className="rounded-md border border-gray-800 bg-gray-950 p-6">
            <h2 className="text-xl font-black text-white">Information Collected</h2>
            <p className="mt-3 leading-7 text-gray-300">
              When you sign in, the app may use your Firebase user ID, email address, display name, and profile photo
              URL. The app also stores basic game stats such as total wins and total losses.
            </p>
          </section>

          <section className="rounded-md border border-gray-800 bg-gray-950 p-6">
            <h2 className="text-xl font-black text-white">How Information Is Used</h2>
            <p className="mt-3 leading-7 text-gray-300">
              Authentication data is used to identify your account. Game stats are used to show your record and update
              your saved wins and losses after games.
            </p>
          </section>

          <section className="rounded-md border border-gray-800 bg-gray-950 p-6">
            <h2 className="text-xl font-black text-white">Storage</h2>
            <p className="mt-3 leading-7 text-gray-300">
              Login is handled through Firebase. Saved stats are stored in MongoDB. This app does not intentionally sell
              or share your account stats with third-party advertisers.
            </p>
          </section>

          <section className="rounded-md border border-gray-800 bg-gray-950 p-6">
            <h2 className="text-xl font-black text-white">Your Choices</h2>
            <p className="mt-3 leading-7 text-gray-300">
              You can play without logging in, but saved stats require an account. You can sign out from the login page.
              Account deletion or stat removal requests should be handled by the app owner.
            </p>
          </section>

          <section className="rounded-md border border-gray-800 bg-gray-950 p-6">
            <h2 className="text-xl font-black text-white">Security</h2>
            <p className="mt-3 leading-7 text-gray-300">
              Reasonable care is taken to use established services for authentication and storage. No online service can
              guarantee absolute security.
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

export default PrivacyPolicy;
