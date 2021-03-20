<?php

namespace App\Controller;

use App\Entity\Post;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PostController extends AbstractController
{
    /**
     * @IsGranted("ROLE_USER")
     * @Route("/api/post", name="create_post", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function createPost(Request $request): Response
    {
        $postData = json_decode($request->getContent());

        $entityManager = $this->getDoctrine()->getManager();

        $post = new Post();
        $post
            ->setText($postData->text)
            ->setTitle($postData->title)
            ->setSpotifyIframeUrl($postData->spotifyIframeUrl)
        ;

        $entityManager->persist($post);
        $entityManager->flush();

        return $this->json(['success' => 'ok'], 201);
    }
}
