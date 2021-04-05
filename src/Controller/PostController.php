<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\PostComment;
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
     * @Route("/api/post-comment", name="create_post_comment", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function createPostComment(Request $request): Response
    {
        $postCommentData = json_decode($request->getContent());
        $postId = $postCommentData->postId;
        $comment = $postCommentData->comment;

        /** @var User $user */
        $user = $this->getUser();
        $entityManager = $this->getDoctrine()->getManager();

        $post = $entityManager->getRepository(Post::class)->find($postId);

        if ($post instanceof Post) {
            $postComment = new PostComment();

            $postComment
                ->setUser($user)
                ->setText($comment)
                ->setPost($post)
            ;

            $post->setModifiedAt(new \DateTime());

            $entityManager->persist($postComment);
            $entityManager->flush();
        }

        return $this->json($this->feedService->postEntityToArrayWithComments($post, $user), 201);
    }

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/api/post-comment/{postComment}", name="delete_post_comment", methods={"DELETE"})
     * @param PostComment $postComment
     * @return Response
     */
    public function deletePostComment(PostComment $postComment): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        $em = $this->getDoctrine()->getManager();

        if ($user !== $postComment->getUser()) {
            return $this->json([
                'success' => false,
                'error' => 'Negalite ištrinti šio komentaro'
            ]);
        }

        $em->remove($postComment);
        $em->flush();

        return $this->json($this->feedService->postEntityToArrayWithComments($postComment->getPost(), $user));
    }

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/api/post-comment/{postComment}", name="update_post_comment", methods={"PUT"})
     * @param Request $request
     * @param PostComment $postComment
     * @return Response
     */
    public function updatePostComment(Request $request, PostComment $postComment): Response
    {
        $postCommentData = json_decode($request->getContent());
        /** @var User $user */
        $user = $this->getUser();
        $em = $this->getDoctrine()->getManager();

        if ($user !== $postComment->getUser()) {
            return $this->json([
                'success' => false,
                'error' => 'Negalite redaguoti šio komentaro'
            ]);
        }

        $postComment
            ->setModifiedAt(new \DateTime())
            ->setText($postCommentData->text)
        ;

        $em->flush();

        return $this->json($this->feedService->postEntityToArrayWithComments($postComment->getPost(), $user));
    }

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/api/post/{post}", name="modify_post_put", methods={"PUT"})
     * @param Request $request
     * @param Post $post
     * @return Response
     */
    public function modifyPostPut(Request $request, Post $post): Response
    {
        $postData = json_decode($request->getContent());

        $entityManager = $this->getDoctrine()->getManager();

        $post
            ->setText($postData->text)
            ->setTitle($postData->title)
            ->setSpotifyIframeUrl($postData->spotifyIframeUrl)
            ->setModifiedAt(new \DateTime())
        ;

        if (strlen($postData->image) > 0) {
            $post->setImage($postData->image);
        }

        $entityManager->flush();

        return $this->json([
            'success' => 'ok',
            'postId' => $post->getId()
        ]);
    }

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/api/post/{post}", name="delete_specific_post", methods={"DELETE"})
     * @param Post $post
     * @return Response
     */
    public function deleteSpecificPost(Post $post): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        /** @var User $user */
        $user = $this->getUser();

        if ($user !== $post->getCreatedBy()) {
            return $this->json([
                'success' => false,
                'error' => 'Neturite teisių ištrinti šio įrašo'
            ]);
        }

        $entityManager->remove($post);

        $entityManager->flush();

        return $this->json([
            'success' => true
        ]);
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

            if ($post->getLikes()->contains($user)) {
                $post->removeLike($user);
            } else {
                $post->addLike($user);
            }

            $this->getDoctrine()->getManager()->flush();

            return $this->json($this->feedService->postEntityToArrayWithComments($post, $user));
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
        /** @var User|null $user */
        $user = $this->getUser();

        if ($post instanceof Post) {
            return $this->json($this->feedService->postEntityToArrayWithComments($post, $user));
        }

        return $this->json(['error' => 'Įrašas nerastas'], 404);
    }

    /**
     * @Route("/api/posts", name="get_some_posts")
     * @param Request $request
     * @return Response
     */
    public function fetchPosts(Request $request): Response
    {
        $offset = $request->get('offset') ? (int)$request->get('offset') : 0;
        /** @var User|null $user */
        $user = $this->getUser();

        return $this->json($this->feedService->fetchPosts($user, $offset));
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

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/api/post/{post}/image", name="delete_post_image", methods={"DELETE"})
     * @param Post $post
     * @return Response
     */
    public function deletePostImage(Post $post): Response
    {
        unlink('./images/posts/' . $post->getImage());
        $post->setImage(null);
        $post->setModifiedAt(new \DateTime());
        $this->getDoctrine()->getManager()->flush();

        return $this->json([
            'success' => true
        ]);
    }
}
