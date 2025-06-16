<?php

namespace App\Http\Controllers\Auth;
use Inertia\Inertia;
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
                    'avatar' => $user->avatar,  
                    'email_verified_at' => now(), 
                ]
            );
            

            Auth::login($authUser, true);

          return redirect()->route('dashboard');

        } catch (\Exception $e) {
          
            return redirect('/login')->withErrors(['login' => 'Error autenticando con Google']);
        }
    }
}
