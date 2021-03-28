<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\User;
use App\Service\FeedService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FeedController extends AbstractController
{
    private FeedService $feedService;

    public function __construct(FeedService $feedService)
    {
        $this->feedService = $feedService;
    }

    /**
     * @Route("/api/feed", name="content")
     */
    public function getFeed(): Response
    {
        // todo kada atsiras daugiau feed'o is visu paimt po kelis su offset'u, susortint pagal data ir returnint
        /** @var User|null $user */
        $user = $this->getUser();

        $feedArray = [];

        $feedArray = $this->feedService->getPosts($feedArray, $user);

        return $this->json($feedArray);
    }
}
