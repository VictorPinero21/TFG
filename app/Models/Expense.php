<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User; // IMPORTANTE

class Expense extends Model
{
    protected $fillable = ['user_id', 'amount', 'category', 'description', 'date'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
