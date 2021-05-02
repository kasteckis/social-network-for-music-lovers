<?php


namespace UnitTests;


use App\Entity\Post;
use App\Entity\PostComment;
use App\Entity\User;
use App\Service\FeedService;
use Doctrine\ORM\EntityManager;
use PHPUnit\Framework\TestCase;

class FeedServiceTest extends TestCase
{
    private FeedService $feedService;

    protected function setUp(): void
    {
        $em = $this->createMock(EntityManager::class);

        $this->feedService = new FeedService($em);
        parent::setUp();
    }

    public function testSortFeeds(): void
    {
        $feed1['sortBy'] = new \DateTime('2021-01-01');
        $feed2['sortBy'] = new \DateTime('2020-01-01');
        $feed3['sortBy'] = new \DateTime('2022-01-01');

        $feedArray = $this->feedService->sortFeeds([$feed1, $feed2, $feed3]);

        $this->assertTrue($feedArray[0]['sortBy'] > $feedArray[1]['sortBy']);
        $this->assertTrue($feedArray[1]['sortBy'] > $feedArray[2]['sortBy']);
    }

    public function testPostEntityToArray(): void
    {
        $user = new User();
        $user
            ->setName('user')
            ->setEmail('user@user.test')
        ;
        $post = new Post();
        $post
            ->setTitle('title')
            ->setText('text')
            ->setCreatedBy($user)
        ;

        $postArray = $this->feedService->postEntityToArray($post, null);

        $this->assertEquals('title', $postArray['title']);
        $this->assertEquals('text', $postArray['text']);
    }

    public function testPostEntityToArrayWithComments(): void
    {
        $user = new User();
        $user
            ->setName('user')
            ->setEmail('user@user.test')
        ;
        $post = new Post();
        $post
            ->setTitle('title')
            ->setText('text')
            ->setCreatedBy($user)
        ;

        $postComment = new PostComment();
        $postComment
            ->setText('commentText')
            ->setUser($user)
            ->setPost($post)
        ;

        $post->addComment($postComment);

        $postArray = $this->feedService->postEntityToArrayWithComments($post, null);

        $this->assertEquals('title', $postArray['title']);
        $this->assertEquals('text', $postArray['text']);

        $this->assertEquals('commentText', $postArray['commentsArray'][0]['text']);
    }
}
