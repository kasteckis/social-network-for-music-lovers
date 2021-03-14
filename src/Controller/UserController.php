<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    /**
     * @Route("/api/user", name="api_user_data")
     */
    public function getUserData(): Response
    {
        /** @var User|null $user */
        $user = $this->getUser();

        if ($user instanceof User) {
            $tokenExpiresAt = new \DateTime();
            $tokenExpiresAt->modify('+15 mins'); // lexik_jwt_authentication.yaml

            return $this->json([
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'email' => $user->getEmail(),
                'tokenExpiresAt' => $tokenExpiresAt,
                'roles' => $user->getRoles()
            ]);
        }

        return $this->json([
            'error' => 'User is not connected!'
        ], 401);
    }

    /**
     * @Route("/api/register", name="api_register_user")
     * @param Request $request
     * @return Response
     */
    public function registerUser(Request $request): Response
    {
        $user = new User();
        $user
            ->setRegistrationIp($request->getClientIp())
            ->setIp($request->getClientIp())
            ->setEmail('emi')
            ->setName('name')
            ->setPassword('pakeistpsw');

        return $this->json([
            'created' => 'ok'
        ], 201);
    }
}
