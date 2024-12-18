export default function Login() {
    return (
        <div class="flex min-h-full w-fit flex-col justify-center p-12 rounded-lg bg-white drop-shadow-xl">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">

                <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" action="#" method="POST">
                    <div>
                        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                        <div class="mt-2">
                            <input type="email" name="email" id="email" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary_2 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                            <div class="text-sm">
                                <a href="#" class="font-semibold text-primary_2 hover:text-primary_2_hover">Forgot password?</a>
                            </div>
                        </div>
                        <div class="mt-2">
                            <input type="password" name="password" id="password" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary_2 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" class="flex w-full justify-center rounded-md bg-primary_2 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-primary_2_hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary_2">Sign in</button>
                    </div>
                </form>

                <p class="flex flex-row gap-2 justify-center mt-10 text-center text-sm/6 text-gray-500">
                    Don't have account?
                    <a href="#" class="font-semibold text-primary_2 hover:primary_2_hover">Sign up</a>
                </p>
            </div>
        </div>);
}