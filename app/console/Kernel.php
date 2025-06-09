<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define los comandos Artisan personalizados de tu aplicación.
     *
     * @var array<int, class-string|string>
     */
    protected $commands = [
        // Aquí puedes registrar comandos Artisan personalizados si los creas
        // Por ejemplo: Commands\EnviarNewsletter::class,
    ];

    /**
     * Define el schedule (programación) de comandos y jobs.
     */
    protected function schedule(Schedule $schedule): void
    {
       
        $schedule->job(new \App\Jobs\EnviarNewsletterSemanal)->weeklyOn(1, '08:00');
       

    }

    /**
     * Registra los comandos Artisan disponibles.
     */
    protected function commands(): void
    {
        // Carga automáticamente los comandos de la carpeta Commands
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
