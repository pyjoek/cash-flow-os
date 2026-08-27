<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

use App\Http\Controllers\DashboardController;

Route::middleware(['auth', 'verified', 'business'])
    ->get('/dashboard', [DashboardController::class, 'index'])
    ->name('dashboard');

    
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

use App\Http\Controllers\AccountController;
use App\Http\Controllers\BusinessController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TransactionController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/business/create', [BusinessController::class, 'create'])->name('businesses.create');
    Route::post('/business', [BusinessController::class, 'store'])->name('businesses.store');
});

Route::middleware(['auth', 'verified', 'business'])->group(function () {
    Route::prefix('accounts')->group(function () {
        Route::get('/', [AccountController::class, 'index'])->name('accounts.index');
        Route::post('/', [AccountController::class, 'store'])->name('accounts.store');
        Route::patch('/{account}', [AccountController::class, 'update'])->name('accounts.update');
        Route::delete('/{account}', [AccountController::class, 'destroy'])->name('accounts.destroy');
    });

    Route::prefix('transactions')->group(function () {
        Route::get('/', [TransactionController::class, 'index'])->name('transactions.index');
        Route::post('/', [TransactionController::class, 'store'])->name('transactions.store');
        Route::delete('/{transaction}', [TransactionController::class, 'destroy'])->name('transactions.destroy');
    });

    Route::prefix('categories')->group(function () {
        Route::post('/', [CategoryController::class, 'store'])->name('categories.store');
        Route::delete('/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
    });
});