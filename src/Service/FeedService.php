<?php


namespace App\Service;


use App\Entity\Post;
use App\Repository\FeedContentType;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;

class FeedService
{
    private EntityManagerInterface $entityManager;

    /**
     * FeedService constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getPosts(array $feedArray): array
    {
        /** @var Post[] $posts */
        $posts = $this->entityManager->getRepository(Post::class)->findAll();
        foreach ($posts as $post) {
            $feedArray[] = [
                'image' => $post->getImage(),
                'title' => $post->getTitle(),
                'text' => $post->getText(),
                'spotifyIframeUrl' => $post->getSpotifyIframeUrl(),
                'likes' => $post->getLikes()->count(),
                'comments' => $post->getComments()->count(),
                'type' => FeedContentType::POST
            ];
        }

        return $feedArray;
    }
}
