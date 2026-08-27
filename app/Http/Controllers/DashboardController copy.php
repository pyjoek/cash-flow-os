<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $businessId = $request->user()->business_id;

        $accounts = Account::where('business_id', $businessId)->get();
        $currentBalance = $accounts->sum('balance');

        $monthStart = Carbon::now()->startOfMonth();

        $cashIn = Transaction::where('business_id', $businessId)
            ->where('type', 'income')
            ->where('transaction_date', '>=', $monthStart)
            ->sum('amount');

        $cashOut = Transaction::where('business_id', $businessId)
            ->where('type', 'expense')
            ->where('transaction_date', '>=', $monthStart)
            ->sum('amount');

        $topCategories = Transaction::query()
            ->join('categories', 'categories.id', '=', 'transactions.category_id')
            ->where('transactions.business_id', $businessId)
            ->where('transactions.type', 'expense')
            ->where('transactions.transaction_date', '>=', $monthStart)
            ->select('categories.name', DB::raw('SUM(transactions.amount) as total'))
            ->groupBy('categories.name')
            ->orderByDesc('total')
            ->limit(5)
            ->get();

        $trend = collect(range(6, 0))->map(function ($daysAgo) use ($businessId) {
            $date = Carbon::now()->subDays($daysAgo);

            $income = Transaction::where('business_id', $businessId)
                ->where('type', 'income')
                ->whereDate('transaction_date', $date)
                ->sum('amount');

            $expense = Transaction::where('business_id', $businessId)
                ->where('type', 'expense')
                ->whereDate('transaction_date', $date)
                ->sum('amount');

            return [
                'date' => $date->format('D'),
                'net' => (float) $income - (float) $expense,
            ];
        });

        $recentTransactions = Transaction::where('business_id', $businessId)
            ->with(['account', 'category'])
            ->latest('transaction_date')
            ->latest('created_at')
            ->take(6)
            ->get();

        return Inertia::render('Dashboard', [
            'currentBalance' => (float) $currentBalance,
            'cashIn' => (float) $cashIn,
            'cashOut' => (float) $cashOut,
            'netCash' => (float) $cashIn - (float) $cashOut,
            'topCategories' => $topCategories,
            'trend' => $trend,
            'recentTransactions' => $recentTransactions,
            'accountCount' => $accounts->count(),
        ]);
    }
}