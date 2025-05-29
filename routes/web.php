<?php

use Inertia\Inertia;
use App\Http\Controllers\Auth\GoogleController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\FinancialAssistantController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get( '/auth/google', [GoogleController::class, "redirectToGoogle"])->name("redirect.google");
Route::get('login/google/callback', [GoogleController::class, 'handleGoogleCallback']);

Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout'])->name('logout');


//RUTA PARA EL CONTROLADOR DE LA IA ASSISTANT
Route::post('/financial-assistant', [FinancialAssistantController::class, 'respond'])->name('financial.assistant');


Route::get('/asistente', fn () => Inertia::render('FinancialAssistant'))->name('assistant');


