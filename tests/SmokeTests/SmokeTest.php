<?php

namespace SmokeTests;

use GuzzleHttp\Client;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class SmokeTest extends KernelTestCase
{
    private Client $client;

    public function setUp(): void
    {
        $this->client = new Client([
            'base_uri' => $_ENV['LOCAL_WEB_DEV_IP'],
            'http_errors' => false
        ]);
    }

    public function testAdminPanelLoginPage(): void
    {
        $response = $this->client->request('GET', '/admin/login');

        $this->assertEquals(200, $response->getStatusCode());
    }

    public function testMainPage(): void
    {
        $response = $this->client->request('GET', '/');
        $this->assertEquals(200, $response->getStatusCode());
    }

    public function testPostsGetApi(): void
    {
        $response = $this->client->request('GET', '/api/posts');

        $data = json_decode($response->getBody()->getContents());

        $this->assertEquals(true, is_array($data));
    }

    public function testNewsGetApi(): void
    {
        $response = $this->client->request('GET', '/api/news');

        $data = json_decode($response->getBody()->getContents());

        $this->assertEquals(true, is_array($data));
    }

    public function testFeedGetApi(): void
    {
        $response = $this->client->request('GET', '/api/feed');

        $data = json_decode($response->getBody()->getContents());

        $this->assertEquals(true, property_exists($data, 'feedArray'));
        $this->assertEquals(true, property_exists($data, 'offsetNews'));
        $this->assertEquals(true, property_exists($data, 'offsetPosts'));
        $this->assertEquals(true, property_exists($data, 'offsetEvents'));
    }

    public function testEventsGetApi(): void
    {
        $response = $this->client->request('GET', '/api/events?from=2021-04-23T12:25:10.116Z&to=2021-05-22T21:00:00.000Z&filter=&type=all&pageNumber=1');

        $data = json_decode($response->getBody()->getContents());

        $this->assertEquals(true, property_exists($data, 'events'));
        $this->assertEquals(true, property_exists($data, 'eventsCount'));
    }

    public function testAlbumsGetApi(): void
    {
        $response = $this->client->request('GET', '/api/albums?offset=0&limit=10');

        $data = json_decode($response->getBody()->getContents());

        $this->assertEquals(true, property_exists($data, 'albums'));
        $this->assertEquals(true, property_exists($data, 'albumsCount'));
    }

    public function testGroupsGetApi(): void
    {
        $response = $this->client->request('GET', '/api/groups?offset=0&limit=10');

        $data = json_decode($response->getBody()->getContents());

        $this->assertEquals(true, property_exists($data, 'groups'));
        $this->assertEquals(true, property_exists($data, 'groupsCount'));
    }

    public function testSearchGetApi(): void
    {
        $response = $this->client->request('GET', '/api/search?search=text');

        $data = json_decode($response->getBody()->getContents());

        $this->assertEquals(true, is_array($data));
    }
}
