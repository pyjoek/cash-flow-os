<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Category;
use App\Models\Transaction;
use App\Services\CategorySuggestionService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request, CategorySuggestionService $suggester): Response
    {
        $currency = $request->user()->business->currency ?? 'TZS';
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

        // --- AI suggestions: uncategorized transactions with a keyword match ---
        $businessCategories = Category::where('business_id', $businessId)
            ->get()
            ->keyBy(fn ($c) => strtolower($c->name));

        $suggestions = Transaction::where('business_id', $businessId)
            ->whereNull('category_id')
            ->latest('transaction_date')
            ->take(20)
            ->get()
            ->map(function ($transaction) use ($suggester, $businessCategories) {
                $suggestedName = $suggester->suggestCategoryName($transaction->description);

                if (! $suggestedName) {
                    return null;
                }

                $match = $businessCategories->get(strtolower($suggestedName));

                if (! $match) {
                    return null;
                }

                return [
                    'transaction_id' => $transaction->id,
                    'description' => $transaction->description ?? $transaction->type,
                    'suggested_category_id' => $match->id,
                    'suggested_category_name' => $match->name,
                ];
            })
            ->filter()
            ->take(5)
            ->values();

        // --- Forecast: project 30 days forward using the last 30 days' actual net cash ---
        $last30Start = Carbon::now()->subDays(30);

        $income30 = Transaction::where('business_id', $businessId)
            ->where('type', 'income')
            ->where('transaction_date', '>=', $last30Start)
            ->sum('amount');

        $expense30 = Transaction::where('business_id', $businessId)
            ->where('type', 'expense')
            ->where('transaction_date', '>=', $last30Start)
            ->sum('amount');

        $net30 = (float) $income30 - (float) $expense30;
        $projectedBalance30 = (float) $currentBalance + $net30;

        // return Inertia::render('Dashboard', [
        //     'currentBalance' => (float) $currentBalance,
        //     'cashIn' => (float) $cashIn,
        //     'cashOut' => (float) $cashOut,
        //     'netCash' => (float) $cashIn - (float) $cashOut,
        //     'topCategories' => $topCategories,
        //     'trend' => $trend,
        //     'recentTransactions' => $recentTransactions,
        //     'accountCount' => $accounts->count(),
        //     'suggestions' => $suggestions,
        //     'net30' => $net30,
        //     'projectedBalance30' => $projectedBalance30,
        // ]);

        return Inertia::render('Dashboard', [
            'currentBalance' => (float) $currentBalance,
            'cashIn' => (float) $cashIn,
            'cashOut' => (float) $cashOut,
            'netCash' => (float) $cashIn - (float) $cashOut,
            'topCategories' => $topCategories,
            'trend' => $trend,
            'recentTransactions' => $recentTransactions,
            'accountCount' => $accounts->count(),
            'suggestions' => $suggestions,
            'net30' => $net30,
            'projectedBalance30' => $projectedBalance30,
            'currency' => $currency,
        ]);
    }
}