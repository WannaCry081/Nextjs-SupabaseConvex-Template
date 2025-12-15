export default function AuthCodeError() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Authentication Error</h2>
          <p className="mt-4 text-gray-600">
            There was an error authenticating your account. Please try again.
          </p>
          <div className="mt-6">
            <a
              href="/auth/login"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
