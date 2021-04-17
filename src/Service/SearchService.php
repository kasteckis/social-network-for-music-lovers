<?php


namespace App\Service;


use App\Entity\Album;
use App\Entity\Event;
use App\Entity\Performer;
use App\Entity\Post;
use App\Entity\Song;
use App\Repository\AlbumRepository;
use App\Repository\EventRepository;
use App\Repository\PerformerRepository;
use App\Repository\PostRepository;
use App\Repository\SongRepository;
use Doctrine\ORM\EntityManagerInterface;

class SearchService
{
    private EntityManagerInterface $entityManager;

    /**
     * SearchService constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function searchByKeyword(string $keyword): array
    {
        /** @var PostRepository $postRepo */
        $postRepo = $this->entityManager->getRepository(Post::class);
        /** @var AlbumRepository $albumRepo */
        $albumRepo = $this->entityManager->getRepository(Album::class);
        /** @var SongRepository $songRepo */
        $songRepo = $this->entityManager->getRepository(Song::class);
        /** @var PerformerRepository $performerRepo */
        $performerRepo = $this->entityManager->getRepository(Performer::class);
        /** @var EventRepository $eventRepo */
        $eventRepo = $this->entityManager->getRepository(Event::class);

        return [];
    }
}
