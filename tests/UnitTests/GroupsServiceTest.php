<?php

namespace UnitTests;

use App\Entity\Album;
use App\Entity\Performer;
use App\Entity\Song;
use App\Service\GroupsService;
use Doctrine\ORM\EntityManager;
use PHPUnit\Framework\TestCase;

class GroupsServiceTest extends TestCase
{
    private GroupsService $groupsService;

    protected function setUp(): void
    {
        $em = $this->createMock(EntityManager::class);

        $this->groupsService = new GroupsService($em);
        parent::setUp();
    }

    public function testGroupEntityToPerformerSongsArray(): void
    {
        $performer = new Performer();
        $performer
            ->setTitle('title')
        ;

        $song = new Song();
        $song
            ->setTitle('song')
            ->setYear('2010')
        ;

        $performer->addSong($song);

        $songsArray = $this->groupsService->groupEntityToPerformerSongsArray($performer);

        $this->assertEquals('song', $songsArray[0]['title']);
        $this->assertEquals('2010', $songsArray[0]['year']);
    }

    public function testGroupEntityToPerformerAlbumsArray(): void
    {
        $performer = new Performer();
        $performer
            ->setTitle('title')
        ;

        $album = new Album();
        $album
            ->setTitle('album')
            ->setYear('2012')
        ;

        $performer->addAlbum($album);

        $albumArray = $this->groupsService->groupEntityToPerformerAlbumsArray($performer);

        $this->assertEquals('album', $albumArray[0]['title']);
        $this->assertEquals('2012', $albumArray[0]['year']);
    }

    public function testAlbumEntityToSongsArray(): void
    {
        $album = new Album();
        $album
            ->setTitle('album')
            ->setYear('2012')
        ;

        $song = new Song();
        $song
            ->setTitle('song')
            ->setYear('2010')
        ;

        $album->addSong($song);

        $songsArray = $this->groupsService->albumEntityToSongsArray($album);

        $this->assertEquals('song', $songsArray[0]['title']);
        $this->assertEquals('2010', $songsArray[0]['year']);
    }
}
