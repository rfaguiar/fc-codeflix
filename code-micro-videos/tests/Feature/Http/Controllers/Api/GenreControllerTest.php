<?php

namespace Tests\Feature\Http\Controllers\Api;

use App\Models\Genre;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\TestResponse;
use Tests\TestCase;

class GenreControllerTest extends TestCase
{
    use DatabaseMigrations;

    public function testIndex()
    {
        $genre = factory(Genre::class)->create();
        $response = $this->get(route('genres.index'));

        $response
            ->assertStatus(200)
            ->assertJson([$genre->toArray()]);
    }


    public function testShow()
    {
        /** @var Genre $genre */
        $genre = factory(Genre::class)->create();
        $response = $this->get(route('genres.show', ['genre' => $genre->id]));

        $response
            ->assertStatus(200)
            ->assertJson($genre->toArray());
    }

    public function testInvalidationData()
    {
        $response = $this->json('POST', route('genres.store'), []);
        $this->assertInvalidationRequired($response);

        $response = $this->json('POST', route('genres.store'), [
            'name' => str_repeat('a', 256),
            'is_active' => 'a'
        ]);
        $this->assertInvalidationMax($response);
        $this->assertInvalidationBoolean($response);

        /** @var Genre $genre */
        $genre = factory(Genre::class)->create();
        $response = $this->json('PUT', route('genres.update', ['genre' => $genre->id]), []);
        $this->assertInvalidationRequired($response);

        $response = $this->json('PUT', route('genres.update', ['genre' => $genre->id]), [
            'name' => str_repeat('a', 256),
            'is_active' => 'a'
        ]);
        $this->assertInvalidationMax($response);
        $this->assertInvalidationBoolean($response);
    }

    protected function assertInvalidationRequired(TestResponse $response)
    {
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(['name'])
            ->assertJsonMissingValidationErrors(['is_active'])
            ->assertJsonFragment([
                \Lang::get('validation.required', ['attribute' => 'name'])
            ]);
    }

    protected function assertInvalidationMax(TestResponse $response)
    {
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(['name'])
            ->assertJsonFragment([
                \Lang::get('validation.max.string', ['attribute' => 'name', 'max' => 255])
            ]);
    }

    protected function assertInvalidationBoolean(TestResponse $response)
    {
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(['is_active'])
            ->assertJsonFragment([
                \Lang::get('validation.boolean', ['attribute' => 'is active'])
            ]);
    }

    public function testStore()
    {
        $response = $this->json('POST', route('genres.store'), [
            'name'=>'test'
        ]);

        /** @var Genre $genre */
        $genre = Genre::find($response->json('id'));

        $response->assertStatus(201)
            ->assertJson($genre->toArray());

        $this->assertTrue($response->json('is_active'));

        $response = $this->json('POST', route('genres.store'), [
            'name'=>'test',
            'is_active'=>false
        ]);

        /** @var Genre $genre */
        $genre = Genre::find($response->json('id'));

        $response->assertStatus(201)
            ->assertJson($genre->toArray())
            ->assertJsonFragment([
                'is_active'=>false,
            ]);
    }

    public function testUpdate()
    {
        /** @var Genre $genre */
        $genre = factory(Genre::class)->create([
            'is_active'=>false
        ]);

        $response = $this->json('PUT', route('genres.update', ['genre'=>$genre->id]), [
            'name'=>'test',
            'is_active'=>true
        ]);

        /** @var Genre $genre */
        $genre = Genre::find($response->json('id'));

        $response->assertStatus(200)
            ->assertJson($genre->toArray())
            ->assertJsonFragment([
                'is_active'=>true
            ]);
    }


    public function testDestroy()
    {
        /** @var Genre $genre */
        $genre = factory(Genre::class)->create();
        $response = $this->delete(route('genres.destroy', ['genre'=>$genre->id]));

        $response->assertNoContent();

        /** @var Genre $genre */
        $genre = Genre::find($genre->id);
        $this->assertNull($genre);
    }
}
