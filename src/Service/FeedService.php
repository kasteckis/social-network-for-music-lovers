<?php


namespace App\Service;


use App\Entity\Post;
use App\Entity\User;
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

    public function getPosts(array $feedArray, ?User $user): array
    {
        /** @var Post[] $posts */
        $posts = $this->entityManager->getRepository(Post::class)->findBy([
            'isThisPostNews' => false
        ], [
            'modifiedAt' => 'DESC'
        ]);
        foreach ($posts as $post) {
            $feedArray[] = $this->postEntityToArray($post, $user);
        }

        return $feedArray;
    }

    public function getNews(array $newsArray, ?User $user): array
    {
        /** @var Post[] $posts */
        $news = $this->entityManager->getRepository(Post::class)->findBy([
            'isThisPostNews' => true
        ], [
            'modifiedAt' => 'DESC'
        ]);
        foreach ($news as $new) {
            $newsArray[] = $this->postEntityToArray($new, $user);
        }

        return $newsArray;
    }

    public function sortFeeds(array $feedArray): array
    {
        usort($feedArray, function ($a, $b) {
            if ($a['sortBy'] == $b['sortBy']) {
                return 0;
            }
            return ($a['sortBy'] > $b['sortBy']) ? -1 : 1;
        });

        return $feedArray;
    }

    public function postEntityToArray(Post $post, ?User $user): array
    {
        return [
            'id' => $post->getId(),
            'type' => $post->getIsThisPostNews() ? FeedContentType::NEW : FeedContentType::POST,
            'image' => $post->getImage(),
            'title' => $post->getTitle(),
            'text' => $post->getText(),
            'spotifyIframeUrl' => $post->getSpotifyIframeUrl(),
            'likes' => $post->getLikes()->count(),
            'comments' => $post->getComments()->count(),
            'createdBy' => $post->getCreatedBy() ? $post->getCreatedBy()->getName() : null,
            'createdByProfilePicture' => $post->getCreatedBy() ? $post->getCreatedBy()->getProfilePicture() : null,
            'createdAt' => $post->getCreatedAt()->format('Y-m-d H:i:s'),
            'liked' => $post->getLikes()->contains($user),
            'modifiedAt' => $post->getModifiedAt(),
            'sortBy' => $post->getModifiedAt()
        ];
    }
}
