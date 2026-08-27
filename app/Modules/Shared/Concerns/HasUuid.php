<?php

namespace App\Modules\Shared\Concerns;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait HasUuid
{
    protected static function bootHasUuid(): void
    {
        static::creating(function (Model $model) {
            if (!empty($model->{$model->getKeyName()})) {
                return;
            }

            $model->{$model->getKeyName()} = (int) $model->newQuery()->max($model->getKeyName()) + 1;
        });
    }

    public function getIncrementing(): bool
    {
        return true;
    }

    public function getKeyType(): string
    {
        return 'int';
    }
}