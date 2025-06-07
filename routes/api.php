<?php

use App\Http\Controllers\ChatbotController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;


Route::post('/chatbot', [ChatbotController::class, 'handle']);
Route::post('/reset', function () {
    session()->forget('prompt_count');
    return response()->json(['message' => 'Conversación reiniciada.']);
});
