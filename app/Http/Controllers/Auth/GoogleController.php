<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $user = Socialite::driver('google')->user();

            $authUser = User::updateOrCreate(
                ['google_id' => $user->id],
                [
                    'name' => $user->name,
                    'email' => $user->email,
                    // Puedes dejar la password null si solo quieres login por Google
                    'password' => bcrypt(Str::random(16)),
                ]
            );

            Auth::login($authUser, true);

            return redirect('/dashboard'); // Ajusta la ruta según tu app
        } catch (\Exception $e) {
            // Manejo de error, por ejemplo redirigir al login con mensaje
            return redirect('/login')->withErrors(['login' => 'Error autenticando con Google']);
        }
    }
}
