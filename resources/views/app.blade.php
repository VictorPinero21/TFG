<!DOCTYPE html>
<html lang="en">
<head>
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @viteReactRefresh
   @vite('resources/js/app.jsx')
   @inertiaHead
</head>
<script>
    // Detecta el tema desde localStorage o usa el sistema si no hay preferencia
    const userTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const theme = userTheme || systemTheme;

    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
</script>

<body>
    @inertia
</body>
</html>