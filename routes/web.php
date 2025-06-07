<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\Auth\LoginController;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use Illuminate\Http\Request;
use App\Http\Controllers\ChatbotController;
Route::get('/', function () {

    return Inertia::render('Dashboard/DashboardFinanciero');
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

//Auth 
Route::get('/login', [LoginController::class, 'show'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
Route::get('/login/google', fn() => Socialite::driver('google')->redirect());
Route::get('/login/google/callback', [GoogleController::class, 'handleGoogleCallback']);
Route::inertia('/register', 'Register')->name('register');
Route::get('/forgot-password', function () {
    return Inertia::render('ForgotPassword');
})->name('password.request');


  
 
    Route::post('/api/password/reset-link', [ForgotPasswordController::class, 'sendResetLink']);
    
//CHATHPT
Route::get('/chat', function () {
    return Inertia::render('chat-longchain', [
        'csrf_token' => csrf_token(),
    ]);
});

Route::post('/chatbot', [ChatbotController::class, 'handle']);
Route::post('/reset', function () {
    session()->forget('prompt_count');
    return response()->json(['message' => 'Conversación reiniciada.']);
});


Route::prefix('api')->group(function () {
    require base_path('routes/api.php');
});

Route::get('/settings' , function () {
    return Inertia::render('user-settings', [
      'User_imagen' => 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcS7dzPejIO0qBsU5H9EyPloHi-x5MuT6r2GLR8vm7jsFP8AkihXc0L0jmKqY2zDRlfzsHxKnuBu6U3hcsk'
    ]);
});


