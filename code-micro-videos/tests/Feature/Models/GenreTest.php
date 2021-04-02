<?php

namespace Tests\Feature\Models;

use App\Models\Genre;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class GenreTest extends TestCase
{
    use DatabaseMigrations;

    public function testList()
    {
        factory(Genre::class, 1)->create();
        $genre = Genre::all();
        $this->assertCount(1, $genre);
        $genreKey = array_keys($genre->first()->getAttributes());
        $this->assertEqualsCanonicalizing(
            ['id', 'name', 'is_active', 'deleted_at', 'created_at', 'updated_at'],
            $genreKey
        );
    }

    public function testCreate()
    {
        $genre = Genre::create(['name' => 'test1']);
        $genre->refresh();
        $this->assertEquals('test1', $genre->name);
        $this->assertTrue((bool)$genre->is_active);

        $genre = Genre::create([
            'name' => 'test1',
            'is_active' => false
        ]);
        $this->assertFalse((bool)$genre->is_active);

        $genre = Genre::create([
            'name' => 'test1',
            'is_active' => true
        ]);
        $this->assertTrue((bool)$genre->is_active);

    }


    public function testUpdate()
    {
        /** @var Genre $genre */
        $genre = factory(Genre::class)->create([
            'is_active' => false
        ])->first();
        $data = [
            'name' => 'test_name_updated',
            'is_active' => true
        ];
        $genre = Genre::create($data);

        foreach ($data as $key => $value) {
            $this->assertEquals($value, $genre->{$key});
        }

    }
}