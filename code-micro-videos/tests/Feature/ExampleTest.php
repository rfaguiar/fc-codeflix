<?php

namespace Tests\Feature;

use App\Models\Category;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use DatabaseMigrations;

    public function testList()
    {
        factory(Category::class, 1)->create();
        $categories = Category::all();
        $this->assertCount(1, $categories);
        $categoryKey = array_keys($categories->first()->getAttributes());
        $this->assertEqualsCanonicalizing(
            ['id', 'name', 'description', 'is_active', 'deleted_at', 'created_at', 'updated_at'],
            $categoryKey
        );
    }

    public function testCreate()
    {
        $category = Category::create(['name' => 'test1']);
        $category->refresh();
        $this->assertEquals('test1', $category->name);
        $this->assertNull($category->description);
        $this->assertTrue((bool)$category->is_active);

        $category = Category::create([
            'name' => 'test1',
            'description' => null
        ]);
        $this->assertNull($category->description);

        $category = Category::create([
            'name' => 'test1',
            'description' => 'test_description'
        ]);
        $this->assertEquals('test_description', $category->description);


        $category = Category::create([
            'name' => 'test1',
            'is_active' => false
        ]);
        $this->assertFalse((bool)$category->is_active);

        $category = Category::create([
            'name' => 'test1',
            'is_active' => true
        ]);
        $this->assertTrue((bool)$category->is_active);

    }
}
