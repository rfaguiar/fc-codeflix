<?php

namespace Tests\Feature\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;
use Tests\Traits\TestValidations;

class CategoryControllerTest extends TestCase
{
    use DatabaseMigrations, TestValidations;

    private $category;

    protected function setUp(): void
    {
        parent::setUp();

        /** @var Category $category */
        $this->category = factory(Category::class)->create();
    }

    public function testIndex()
    {
        $response = $this->get(route('categories.index'));

        $response
            ->assertStatus(200)
            ->assertJson([$this->category->toArray()]);
    }


    public function testShow()
    {
        $response = $this->get(route('categories.show', ['category' => $this->category->id]));

        $response
            ->assertStatus(200)
            ->assertJson($this->category->toArray());
    }

    public function testInvalidationData()
    {
        $data = [
            'name' => ''
        ];
        $this->assertInvalidationInStoreAction($data, 'required');
        $this->assertInvalidationInUpdateAction($data, 'required');

        $data = [
            'name' => str_repeat('a', 256)
        ];
        $this->assertInvalidationInStoreAction($data, 'max.string', ['max' => 255]);
        $this->assertInvalidationInUpdateAction($data, 'max.string', ['max' => 255]);

        $data = [
            'is_active' => 'a'
        ];
        $this->assertInvalidationInStoreAction($data, 'boolean');
        $this->assertInvalidationInUpdateAction($data, 'boolean');
    }

    public function testStore()
    {
        $response = $this->json('POST', route('categories.store'), [
            'name'=>'test'
        ]);

        /** @var Category $category */
        $category = Category::find($response->json('id'));

        $response->assertStatus(201)
            ->assertJson($category->toArray());

        $this->assertTrue($response->json('is_active'));
        $this->assertNull($response->json('description'));

        $response = $this->json('POST', route('categories.store'), [
            'name'=>'test',
            'description'=>'description',
            'is_active'=>false
        ]);

        /** @var Category $category */
        $category = Category::find($response->json('id'));

        $response->assertStatus(201)
            ->assertJson($category->toArray())
            ->assertJsonFragment([
                'is_active'=>false,
                'description'=>'description',
            ]);
    }

    public function testUpdate()
    {
        /** @var Category $category */
        $category = factory(Category::class)->create([
            'description'=>'description',
            'is_active'=>false
        ]);

        $response = $this->json('PUT', route('categories.update', ['category'=>$category->id]), [
            'name'=>'test',
            'description'=>'test',
            'is_active'=>true
        ]);

        /** @var Category $category */
        $category = Category::find($response->json('id'));

        $response->assertStatus(200)
            ->assertJson($category->toArray())
            ->assertJsonFragment([
                'description'=>'test',
                'is_active'=>true
            ]);

        $response = $this->json('PUT', route('categories.update', ['category'=>$category->id]), [
            'name'=>'test',
            'description'=>''
        ]);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'description'=>null
            ]);

        $category->description = 'test';
        $category->save();


        $response = $this->json('PUT', route('categories.update', ['category'=>$category->id]), [
            'name'=>'test',
            'description'=>null
        ]);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'description'=>null
            ]);
    }


    public function testDestroy()
    {
        $response = $this->delete(route('categories.destroy', ['category'=>$this->category->id]));

        $response->assertNoContent();

        $this->assertNull(Category::find($this->category->id));
        $this->assertNotNull(Category::withTrashed()->find($this->category->id));
    }

    protected function routeStore()
    {
        return route('categories.store');
    }

    protected function routeUpdate()
    {
        return route('categories.update', ['category' => $this->category->id]);
    }
}
