<?php

namespace UnitTests;

use App\Entity\Album;
use App\Entity\Event;
use App\Entity\Performer;
use App\Entity\Post;
use App\Entity\Song;
use App\Service\SearchConverterService;
use PHPUnit\Framework\TestCase;

class SearchConverterServiceTest extends TestCase
{
    private SearchConverterService $searchConverterService;

    protected function setUp(): void
    {
        $this->searchConverterService = new SearchConverterService();
        parent::setUp();
    }

    public function testPostsToSearchResultArray(): void
    {
        $post = new Post();
        $post
            ->setTitle('postas')
            ->setIsThisPostNews(false);

        $new = new Post();
        $new
            ->setTitle('naujiena')
            ->setIsThisPostNews(true);

        $inputArray = [$post, $new];

        $resultArray = $this->searchConverterService->postsToSearchResultArray($inputArray);

        $this->assertEquals('postas', $resultArray[0]['title']);
        $this->assertEquals('naujiena', $resultArray[1]['title']);

        $this->assertEquals('Įrašas', $resultArray[0]['type']);
        $this->assertEquals('Naujiena', $resultArray[1]['type']);
    }

    public function testAlbumsToSearchResultArray(): void
    {
        $album = new Album();
        $album->setTitle('albumas')
            ->setYear('2011');

        $resultArray = $this->searchConverterService->albumsToSearchResultArray([$album]);

        $this->assertEquals('albumas', $resultArray[0]['title']);
        $this->assertEquals('Albumas', $resultArray[0]['type']);
    }

    public function testSongsToSearchResultArray(): void
    {
        $song = new Song();
        $song->setTitle('daina123');

        $resultArray = $this->searchConverterService->songsToSearchResultArray([$song]);

        $this->assertEquals('daina123', $resultArray[0]['title']);
        $this->assertEquals('Daina', $resultArray[0]['type']);
    }

    public function testPerformersToSearchResultArray(): void
    {
        $performer = new Performer();
        $performer->setTitle('atlikejas321');

        $resultArray = $this->searchConverterService->performersToSearchResultArray([$performer]);

        $this->assertEquals('atlikejas321', $resultArray[0]['title']);
        $this->assertEquals('Atlikėjas', $resultArray[0]['type']);
    }

    public function testEventsToSearchResultArray(): void
    {
        $event = new Event();
        $event->setTitle('renginys');

        $resultArray = $this->searchConverterService->eventsToSearchResultArray([$event]);

        $this->assertEquals('renginys', $resultArray[0]['title']);
        $this->assertEquals('Renginys', $resultArray[0]['type']);
    }
}
