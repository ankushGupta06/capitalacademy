<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Login</title>

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Inter Font -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <style>
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>

<body class="bg-gray-100">

    <div class="flex items-center justify-center min-h-screen">
        <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">

            <!-- Header -->
            <div class="text-center">
                <h1 class="text-3xl font-bold text-gray-900">AdminPanel</h1>
                <p class="mt-2 text-gray-600">Sign in to your account</p>
            </div>

            <!-- Login Form -->
            <form id="login-form" action="/auth/login" method="POST" class="space-y-6">

                <!-- Email -->
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <div class="mt-1">
                        <input id="email" name="email" type="email" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            autocomplete="email">
                    </div>
                </div>

                <!-- Password -->
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div class="mt-1">
                        <input id="password" name="password" type="password" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            autocomplete="current-password">
                    </div>
                </div>

                <!-- Forgot Password -->
                <div class="flex items-center justify-end">
                    <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                    </a>
                </div>

                <!-- Submit Button -->
                <button type="submit"
                    class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md
                           text-white font-medium bg-indigo-600 hover:bg-indigo-700
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                           transition-colors duration-200">
                    Sign In
                </button>

            </form>
        </div>
    </div>

    <!-- AJAX Login Handler -->
   <script>
        const form = document.getElementById('login-form');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/auth/login', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const result = await response.json();

                if (result.success) {
                    // Save token
                    localStorage.setItem("token", result.token);

                    // Redirect to dashboard
                    window.location.href = result.redirect;
                } else {
                    alert(result.message || "Invalid credentials");
                }

            } catch (error) {
                alert("Server error. Try again later.");
            }
        });
    </script>

</body>
</html>
