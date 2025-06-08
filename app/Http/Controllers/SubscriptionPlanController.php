<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SubscriptionPlan;
use Inertia\Inertia;

class SubscriptionPlanController extends Controller
{
    public function index()
    {
        $plans = SubscriptionPlan::all();

        return Inertia::render('SubscriptionPlans', [
            'plans' => $plans,
        ]);
    }
}
