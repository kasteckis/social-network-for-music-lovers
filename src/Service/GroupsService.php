<?php


namespace App\Service;


use App\Entity\Album;
use App\Entity\Performer;
use App\Entity\Song;
use App\Repository\AlbumRepository;
use App\Repository\PerformerRepository;
use Doctrine\ORM\EntityManagerInterface;

class GroupsService
{
    private EntityManagerInterface $entityManager;

    /**
     * GroupsService constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function fetchGroups(int $offset, int $limit, ?string $filter): array
    {
        /** @var PerformerRepository $performerRepo */
        $performerRepo = $this->entityManager->getRepository(Performer::class);

        /** @var Performer[] $groups */
        $groups = $performerRepo->getPerformersByFilter($offset, $limit, $filter);

        $groupsArray = [];

        foreach ($groups as $group) {
            $groupsArray[] = $this->groupEntityToArray($group);
        }

        return $groupsArray;
    }

    public function fetchAlbums(int $offset, int $limit, ?string $filter): array
    {
        /** @var AlbumRepository $performerRepo */
        $albumRepo = $this->entityManager->getRepository(Album::class);

        /** @var Album[] $albums */
        $albums = $albumRepo->getAlbumsByFilter($offset, $limit, $filter);

        $albumsArray = [];

        foreach ($albums as $album) {
            $albumsArray[] = $this->albumEntityToArray($album);
        }

        return $albumsArray;
    }

    public function groupEntityToPerformerSongsArray(Performer $performer): array
    {
        $songs = $performer->getSongs();
        $songsArray = [];

        foreach ($songs as $song) {
            $songsArray[] = $this->songEntityToArray($song);
        }

        return $songsArray;
    }

    public function groupEntityToPerformerAlbumsArray(Performer $performer): array
    {
        $albums = $performer->getAlbums();
        $albumsArray = [];

        foreach ($albums as $album) {
            $albumsArray[] = $this->albumEntityToArray($album);
        }

        return $albumsArray;
    }

    public function groupEntityToArray(Performer $performer): array
    {
        return [
            'id' => $performer->getId(),
            'title' => $performer->getTitle(),
            'songs' => $performer->getSongs()->count(),
            'albums' => $performer->getAlbums()->count(),
            'image' => $performer->getImage(),
            'bio' => $performer->getBio(),
            'country' => $performer->getCountry(),
            'startedCareer' => $performer->getStartedCareer(),
            'style' => $performer->getStyle()
        ];
    }

    public function songEntityToArray(Song $song): array
    {
        return [
            'id' => $song->getId(),
            'title' => $song->getTitle(),
            'spotifyLink' => $song->getSpotifyLink(),
            'year' => $song->getYear()
        ];
    }

    public function albumEntityToArray(Album $album): array
    {
        return [
            'id' => $album->getId(),
            'title' => $album->getTitle(),
            'songs' => $album->getSongs()->count(),
            'image' => $album->getImage()
        ];
    }
}
