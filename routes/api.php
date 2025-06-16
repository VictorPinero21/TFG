<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FinanceController;

//esto devuelve un array de objetos
Route::get('/expenses', [FinanceController::class, 'expenses']);
Route::get('/incomes', [FinanceController::class, 'incomes']);

Route::get('/test', function () {
    return response()->json(['message' => 'API funcionando']);
});
