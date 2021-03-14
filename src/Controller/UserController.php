<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserController extends AbstractController
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @Route("/api/user", name="api_user_data")
     */
    public function getUserData(): Response
    {
        /** @var User|null $user */
        $user = $this->getUser();

        if ($user instanceof User) {
            $tokenExpiresAt = $this->userService->getTokenExpirationDateTime();

            return $this->json([
                'id' => $user->getId(),
                'username' => $user->getName(),
                'email' => $user->getEmail(),
                'tokenExpiresAt' => $tokenExpiresAt,
                'roles' => $user->getRoles(),
                'bio' => $user->getBio(),
                'role' => $this->userService->getRoleText($user->getRoles())
            ]);
        }

        return $this->json([
            'error' => 'User is not connected!'
        ], 401);
    }

    /**
     * @Route("/api/register", name="api_register_user")
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @return Response
     */
    public function registerUser(Request $request, UserPasswordEncoderInterface $passwordEncoder): Response
    {
        [$email, $username, $password] = $this->userService->getEmailUsernamePasswordFromJSON($request->getContent());

        if (!($email && $username && $password)) {
            return $this->json([
                'error' => 'Blogi duomenys!'
            ], 400);
        }

        if (!$this->userService->isEmailUnique($email)) {
            return $this->json([
                'error' => 'Email jau yra naudojamas!'
            ], 409);
        }

        if (!$this->userService->isUsernameUnique($username)) {
            return $this->json([
                'error' => 'Slapyvardis jau yra naudojamas!'
            ], 409);
        }

        $entityManager = $this->getDoctrine()->getManager();
        $user = new User();
        $user
            ->setRegistrationIp($request->getClientIp())
            ->setIp($request->getClientIp())
            ->setEmail($email)
            ->setName($username)
            ->setPassword(
                $passwordEncoder->encodePassword($user, $password)
            );

        $entityManager->persist($user);
        $entityManager->flush();

        $tokenExpiresAt = $this->userService->getTokenExpirationDateTime();

        return $this->json([
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'email' => $user->getEmail(),
            'tokenExpiresAt' => $tokenExpiresAt,
            'roles' => $user->getRoles()
        ], 201);
    }
}
