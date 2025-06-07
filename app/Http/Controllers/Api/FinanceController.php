<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FinanceController extends Controller
{
    public function monthlySummary(): JsonResponse
    {
        // Datos ficticios de ejemplo
        $data = [
            'total_gastos' => 1200,
            'total_ingresos' => 1500,
            'categoria_mayor_gasto' => 'Comida',
            'ahorro_mes' => 300,
            'detalle_categorias' => [
                'Comida' => 600,
                'Transporte' => 200,
                'Ocio' => 400,
            ],
        ];

        return response()->json($data);
    }
}
