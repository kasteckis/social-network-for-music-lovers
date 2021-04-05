<?php


namespace App\Service;


use App\Entity\Post;
use App\Entity\PostComment;
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

    public function fetchPosts(?User $user, int $offset): array
    {
        /** @var Post[] $posts */
        $posts = $this->entityManager->getRepository(Post::class)->findBy([
            'isThisPostNews' => false
        ], [
            'modifiedAt' => 'DESC'
        ], 5, $offset);

        $postsArray = [];

        foreach ($posts as $post) {
            $postsArray[] = $this->postEntityToArray($post, $user);
        }

        return $postsArray;
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

    public function fetchNews(?User $user, int $offset): array
    {
        /** @var Post[] $news */
        $news = $this->entityManager->getRepository(Post::class)->findBy([
            'isThisPostNews' => true
        ], [
            'modifiedAt' => 'DESC'
        ], 5, $offset);

        $newsArray = [];

        foreach ($news as $new) {
            $newsArray[] = $this->postEntityToArray($new, $user);
        }

        return $newsArray;
    }

    public function getNews(array $newsArray, ?User $user): array
    {
        /** @var Post[] $news */
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
            'sortBy' => $post->getModifiedAt(),
            'canEdit' => $post->getCreatedBy() === $user,
            'commentsArray' => []
        ];
    }

    public function postEntityToArrayWithComments(Post $post, ?User $user): array
    {
        $postEntityArray = $this->postEntityToArray($post, $user);

        /** @var PostComment[] $postComments */
        $postComments = $post->getComments()->toArray();

        usort($postComments, function ($a, $b) {
            if ($a->getCreatedAt() == $b->getCreatedAt()) {
                return 0;
            }
            return ($a->getCreatedAt() > $b->getCreatedAt()) ? -1 : 1;
        });

        $postCommentsArray = [];

        foreach ($postComments as $postComment) {
            $postCommentsArray[] = $this->postCommentEntityToArray($postComment, $user);
        }

        $postEntityArray['commentsArray'] = $postCommentsArray;

        return $postEntityArray;
    }

    private function postCommentEntityToArray(PostComment $postComment, ?User $user): array
    {
        return [
            'id' => $postComment->getId(),
            'createdBy' => $postComment->getUser() ? $postComment->getUser()->getName() : null,
            'createdByProfilePicture' => $postComment->getUser() ? $postComment->getUser()->getProfilePicture() : null,
            'text' => $postComment->getText(),
            'createdAt' => $postComment->getCreatedAt() ? $postComment->getCreatedAt()->format('Y-m-d H:i:s') : null,
            'modifiedAt' => $postComment->getModifiedAt() ? $postComment->getModifiedAt()->format('Y-m-d H:i:s') : null,
            'canEdit' => $user === $postComment->getUser()
        ];
    }
}
