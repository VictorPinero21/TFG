<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use App\Models\Income;
use Inertia\Inertia;

class FinanceController extends Controller
{
    public function expenses()
    {
        return Inertia::render('Dashboard/DashboardFinanciero', [
            'expenses' => Expense::all(),
        ]);
        
    }
  

    public function incomes()
    {
        return Inertia::render('Dashboard/DashboardFinanciero', [
            'incomes' => Income::all(),
        ]);
    }
}
