<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\User;
use App\Service\FeedService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class NewsController extends AbstractController
{
    private FeedService $feedService;

    /**
     * NewsController constructor.
     * @param FeedService $feedService
     */
    public function __construct(FeedService $feedService)
    {
        $this->feedService = $feedService;
    }

    /**
     * @Route("/api/news", name="get_some_news", methods={"GET"})
     * @param Request $request
     * @return Response
     */
    public function fetchSomeNews(Request $request): Response
    {
        $offset = $request->get('offset') ? (int)$request->get('offset') : 0;
        /** @var User|null $user */
        $user = $this->getUser();

        return $this->json($this->feedService->fetchNews($user, $offset));
    }

//$offset = $request->get('offset') ? (int)$request->get('offset') : 0;
//    /** @var User|null $user */
//$user = $this->getUser();
//
//return $this->json($this->feedService->fetchPosts($user, $offset));

    /**
     * @IsGranted("ROLE_MOD")
     * @Route("/api/news", name="create_news", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function createNews(Request $request): Response
    {
        $newsData = json_decode($request->getContent());
        /** @var User $user */
        $user = $this->getUser();

        $entityManager = $this->getDoctrine()->getManager();

        $post = new Post();
        $post
            ->setCreatedBy($user)
            ->setText($newsData->text)
            ->setTitle($newsData->title)
            ->setSpotifyIframeUrl($newsData->spotifyIframeUrl)
            ->setImage($newsData->image ? $newsData->image : null)
            ->setIsThisPostNews(true)
        ;

        $entityManager->persist($post);
        $entityManager->flush();

        return $this->json([
            'success' => 'ok',
            'newsId' => $post->getId()
        ], 201);
    }
}
