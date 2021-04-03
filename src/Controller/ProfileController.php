<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\UserService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProfileController extends AbstractController
{
    private UserService $userService;

    /**
     * ProfileController constructor.
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/api/profile/bio", name="api_profile_change_bio", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function changeProfileBio(Request $request): Response
    {
        $data = json_decode($request->getContent());
        $bio = $data->bio;

        /** @var User|null $user */
        $user = $this->getUser();

        if ($user instanceof User) {
            $user->setBio($bio);

            $this->getDoctrine()->getManager()->flush();

            return $this->json($this->userService->userEntityToArray($user));
        }

        return $this->json([
            'error' => true
        ]);
    }
}
