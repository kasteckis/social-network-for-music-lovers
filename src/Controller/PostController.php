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

class PostController extends AbstractController
{
    private FeedService $feedService;

    /**
     * PostController constructor.
     * @param FeedService $feedService
     */
    public function __construct(FeedService $feedService)
    {
        $this->feedService = $feedService;
    }

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/api/post", name="create_post", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function createPost(Request $request): Response
    {
        $postData = json_decode($request->getContent());
        /** @var User $user */
        $user = $this->getUser();

        $entityManager = $this->getDoctrine()->getManager();

        $post = new Post();
        $post
            ->setCreatedBy($user)
            ->setText($postData->text)
            ->setTitle($postData->title)
            ->setSpotifyIframeUrl($postData->spotifyIframeUrl)
            ->setImage($postData->image ? $postData->image : null)
        ;

        $entityManager->persist($post);
        $entityManager->flush();

        return $this->json([
            'success' => 'ok',
            'postId' => $post->getId()
        ], 201);
    }

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/api/post/{post}/like", name="like_post", methods={"PUT"})
     * @param Post|null $post
     * @return Response
     */
    public function likePost(?Post $post): Response
    {
        if ($post instanceof Post) {
            /** @var User $user */
            $user = $this->getUser();
            $post->addLike($user);

            $this->getDoctrine()->getManager()->flush();

            return $this->json($this->feedService->postEntityToArray($post));
        }

        return $this->json([
            'error' => 'Įrašas neegzistuoja'
        ], 404);
    }

    /**
     * @Route("/api/post/{post}", name="get_post", methods={"GET"})
     * @param ?Post $post
     * @return Response
     */
    public function getPost(?Post $post): Response
    {
        if ($post instanceof Post) {
            return $this->json($this->feedService->postEntityToArray($post));
        }

        return $this->json(['error' => 'Įrašas nerastas'], 404);
    }

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/api/post/image", name="create_image_post", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function uploadImage(Request $request): Response
    {
        $photo = $request->getContent();
        /** @var User $user */
        $user = $this->getUser();
        $photoName = time() . $user->getName() . '.png';

        file_put_contents('./images/posts/' . $photoName, $photo);

        return $this->json([
            'success' => 'ok',
            'fileName' => $photoName
        ], 201);
    }
}
