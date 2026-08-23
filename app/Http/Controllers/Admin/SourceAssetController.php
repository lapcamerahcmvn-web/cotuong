<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SourceAsset;

// CHỈ admin (middleware 'admin'). Nguồn tài liệu bản quyền — không expose cho bien_tap/public.
class SourceAssetController extends Controller
{
    public function index()
    {
        $assets = SourceAsset::with('lesson')->latest()->paginate(30);
        return view('admin.source-assets.index', compact('assets'));
    }

    public function show(SourceAsset $sourceAsset)
    {
        $decoded = $sourceAsset->decodedMoves();
        return view('admin.source-assets.show', compact('sourceAsset', 'decoded'));
    }
}
