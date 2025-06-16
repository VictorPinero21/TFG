<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use App\Models\Income;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Http\Request;

class FinanceController extends Controller
{
    // Dashboard general con gastos e ingresos para comparar
    public function dashboard(Request $request)
    {
        $month = $request->input('month'); 
    
        if ($month) {
            $start = Carbon::parse($month . '-01')->startOfMonth();
            $end = (clone $start)->endOfMonth();
        } else {
            $start = Carbon::now()->subMonth();
            $end = Carbon::now();
        }
    
        $expenses = Expense::whereBetween('date', [$start, $end])->orderBy('date', 'desc')->get();
        $incomes = Income::whereBetween('date', [$start, $end])->orderBy('date', 'desc')->get();
    
        return Inertia::render('Dashboard/Dashboard', [
            'expenses' => $expenses,
            'incomes' => $incomes,
            'selectedMonth' => $month ?? $start->format('Y-m'),
        ]);
    }
    

    // Vista solo gastos
    public function expenses(Request $request)
    {
        $category = $request->query('category', 'all');
        $range = $request->query('range', 'month');

        $query = Expense::query();

        if ($category !== 'all') {
            $query->where('category', $category);
        }

        $now = Carbon::now();
        if ($range === 'week') {
            $query->where('date', '>=', $now->copy()->subWeek());
        } elseif ($range === 'month') {
            $query->where('date', '>=', $now->copy()->subMonth());
        } elseif ($range === '3months') {
            $query->where('date', '>=', $now->copy()->subMonths(3));
        }

        $expenses = $query->orderBy('date', 'desc')->get();

        return Inertia::render('Dashboard/DashboardFinanciero', [
            'expenses' => $expenses,
            'incomes' => [],
            'view' => 'expenses',
        ]);
    }

    // Vista solo ingresos
    public function incomes(Request $request)
    {
        $category = $request->query('category', 'all');
        $range = $request->query('range', 'month');

        $query = Income::query();

        if ($category !== 'all') {
            $query->where('category', $category);
        }

        $now = Carbon::now();
        if ($range === 'week') {
            $query->where('date', '>=', $now->copy()->subWeek());
        } elseif ($range === 'month') {
            $query->where('date', '>=', $now->copy()->subMonth());
        } elseif ($range === '3months') {
            $query->where('date', '>=', $now->copy()->subMonths(3));
        }

        $incomes = $query->orderBy('date', 'desc')->get();

        return Inertia::render('Dashboard/DashboardFinanciero', [
            'incomes' => $incomes,
            'expenses' => [],
            'view' => 'incomes',
        ]);
    }
}
