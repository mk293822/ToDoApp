<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version(), 'fuck' => 'you'];
});

require __DIR__.'/auth.php';
