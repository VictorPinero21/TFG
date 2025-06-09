<?php

use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Api\FinanceController;
use App\Http\Controllers\IA\ChatController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\SubscriptionPlanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\NewsletterController;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});







Route::get('/dashboard', [FinanceController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/expenses', [FinanceController::class, 'expenses'])->middleware(['auth', 'verified'])->name('expenses');
Route::get('/incomes', [FinanceController::class, 'incomes'])->middleware(['auth', 'verified'])->name('incomes');


Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/expenses', [FinanceController::class, 'expenses']);
Route::get('/incomes', [FinanceController::class, 'incomes']);

Route::get('/chatbot', function () {
    return Inertia::render('chat-longchain', [
        'csrf_token' => csrf_token()
    ]);
});

Route::middleware('auth')->post('/chatbot', [ChatController::class, 'query']);
Route::get('login/google', [GoogleController::class, 'redirectToGoogle']);
Route::get('login/google/callback', [GoogleController::class, 'handleGoogleCallback']);






Route::get('/subscription-plans', [SubscriptionPlanController::class, 'index'])->name('subscription-plans.index');

Route::get('/download-docs', function () {
    return Storage::download('public/docs/FinTrackDocs.pdf');
})->name('download.docs');



require __DIR__.'/auth.php';
