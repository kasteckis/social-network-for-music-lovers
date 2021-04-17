<?php


namespace App\Service;


use App\Entity\Album;
use App\Entity\Event;
use App\Entity\Performer;
use App\Entity\Post;
use App\Entity\Song;

class SearchConverterService
{
    /**
     * @param Post[] $posts
     * @return array
     */
    public function postsToSearchResultArray(array $posts): array
    {
        $resultArray = [];

        foreach ($posts as $post) {
            $resultArray[] = [
                'id' => 'post' . $post->getId(),
                'title' => $post->getTitle(),
                'type' => $post->getIsThisPostNews() ? 'Naujiena' : 'Įrašas',
                'link' => $post->getIsThisPostNews() ? '/naujienos/' . $post->getId() : '/irasai/' . $post->getId()
            ];
        }

        return $resultArray;
    }

    /**
     * @param Album[] $albums
     * @return array
     */
    public function albumsToSearchResultArray(array $albums): array
    {
        $resultArray = [];

        foreach ($albums as $album) {
            $resultArray[] = [
                'id' => 'album' . $album->getId(),
                'title' => $album->getTitle(),
                'type' => 'Albumas',
                'link' => '/albumas/' . $album->getTitle() . '/' . $album->getId()
            ];
        }

        return $resultArray;
    }

    /**
     * @param Song[] $songs
     * @return array
     */
    public function songsToSearchResultArray(array $songs): array
    {
        $resultArray = [];

        foreach ($songs as $song) {
            $resultArray[] = [
                'id' => 'song' . $song->getId(),
                'title' => $song->getTitle(),
                'type' => 'Daina',
                'link' => 'linkas' // todo add link to song
            ];
        }

        return $resultArray;
    }

    /**
     * @param Performer[] $performers
     * @return array
     */
    public function performersToSearchResultArray(array $performers): array
    {
        $resultArray = [];

        foreach ($performers as $performer) {
            $resultArray[] = [
                'id' => 'performer' . $performer->getId(),
                'title' => $performer->getTitle(),
                'type' => 'Grupė / Atlikėjas',
                'link' => '/grupe/' . $performer->getTitle() . '/' . $performer->getId()
            ];
        }

        return $resultArray;
    }

    /**
     * @param Event[] $events
     * @return array
     */
    public function eventsToSearchResultArray(array $events): array
    {
        $resultArray = [];

        foreach ($events as $event) {
            $resultArray[] = [
                'id' => 'event' . $event->getId(),
                'title' => $event->getTitle(),
                'type' => 'Renginys',
                'link' => '/renginiai/' . $event->getId()
            ];
        }

        return $resultArray;
    }
}
